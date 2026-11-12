
import pool from '$lib/server/database.js';

export async function load({ locals }) {
    if (!locals.user) {
        return { bookings: [] };
    }

    const [bookings] = await pool.execute(`
        SELECT
            bookings.id AS booking_id,
            bookings.end_date,
            autos.id AS auto_id,
            autos.type,
            brands.name AS brand_name
        FROM bookings
        JOIN autos ON bookings.auto_id = autos.id
        JOIN brands ON autos.brand_id = brands.id
        WHERE autos.user_id = ?
          AND bookings.end_date < CURDATE()
        ORDER BY bookings.end_date DESC
    `, [locals.user.id]);

    return { bookings };
}