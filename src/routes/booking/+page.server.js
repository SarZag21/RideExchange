
import pool from '$lib/server/database.js';
import { fail } from '@sveltejs/kit';

export async function load({ url, locals }) {
    const autoId = url.searchParams.get('auto_id');

    if (!autoId || !/^\d+$/.test(autoId)) {
        return {
            auto: null,
            loggedIn: !!locals.user
        };
    }

    const [autos] = await pool.execute(`
        SELECT
            autos.id,
            autos.type,
            autos.color,
            autos.location,
            autos.price_per_day,
            autos.url_image,
            autos.status,
            autos.user_id AS owner_id,
            brands.name AS brand_name
        FROM autos
        JOIN brands ON autos.brand_id = brands.id
        WHERE autos.id = ?
    `, [autoId]);

    const auto = autos[0] || null;

    return {
        auto,
        loggedIn: !!locals.user,
        isOwner: auto && locals.user
            ? Number(auto.owner_id) === Number(locals.user.id)
            : false
    };
}

export const actions = {
    create: async ({ request, locals }) => {
        if (!locals.user) {
            return fail(401, {
                error: 'You must log in before booking a car.'
            });
        }

        const formData = await request.formData();

        const autoId = Number(formData.get('auto_id'));
        const startDate = formData.get('start_date');
        const endDate = formData.get('end_date');

        if (!Number.isSafeInteger(autoId) || autoId <= 0) {
            return fail(400, {
                error: 'Invalid vehicle.'
            });
        }

        function validDate(date) {
            if (typeof date !== 'string' ||
                !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                return false;
            }

            const parsed = new Date(date + 'T00:00:00.000Z');

            return !isNaN(parsed.getTime()) &&
                parsed.toISOString().slice(0, 10) === date;
        }

        if (!validDate(startDate) || !validDate(endDate)) {
            return fail(400, {
                error: 'Please select valid rental dates.'
            });
        }

        const today = new Date();
        const todayString = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, '0'),
            String(today.getDate()).padStart(2, '0')
        ].join('-');

        if (startDate < todayString || endDate <= startDate) {
            return fail(400, {
                error: 'Please select valid future rental dates.'
            });
        }

        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            // Retrieve the car and lock it during booking.
            const [autos] = await connection.execute(`
                SELECT id, user_id, price_per_day, status
                FROM autos
                WHERE id = ?
                FOR UPDATE
            `, [autoId]);

            if (autos.length === 0) {
                await connection.rollback();

                return fail(404, {
                    error: 'Car not found.'
                });
            }

            const auto = autos[0];

            // Owners cannot book their own cars.
            if (Number(auto.user_id) === Number(locals.user.id)) {
                await connection.rollback();

                return fail(400, {
                    error: 'You cannot book your own car.'
                });
            }

            if (auto.status !== 'available') {
                await connection.rollback();

                return fail(400, {
                    error: 'This car is currently unavailable.'
                });
            }

            // Check for overlapping reservations.
            const [existingBookings] = await connection.execute(`
                SELECT id
                FROM bookings
                WHERE auto_id = ?
                AND start_date < ?
                AND end_date > ?
                LIMIT 1
            `, [autoId, endDate, startDate]);

            if (existingBookings.length > 0) {
                await connection.rollback();

                return fail(400, {
                    error: 'This car is already booked for these dates.'
                });
            }

            // Calculate rental price.
            const days = (
                Date.parse(endDate + 'T00:00:00Z') -
                Date.parse(startDate + 'T00:00:00Z')
            ) / 86400000;

            const totalPrice = days * Number(auto.price_per_day);

            // Save the booking.
            await connection.execute(`
                INSERT INTO bookings (
                    renter_id,
                    auto_id,
                    start_date,
                    end_date,
                    rentee_id,
                    total_price
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `, [
                locals.user.id,
                autoId,
                startDate,
                endDate,
                auto.user_id,
                totalPrice
            ]);

            await connection.commit();

            return {
                success: true,
                message: 'Your booking has been submitted successfully!'
            };

        } catch (error) {
            await connection.rollback();

            console.error('Booking error:', error);

            return fail(500, {
                error: 'Something went wrong while creating your booking.'
            });

        } finally {
            connection.release();
        }
    }
};
