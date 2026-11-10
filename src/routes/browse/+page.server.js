import pool from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

// Load cars, brands, and search filters from the database.
export async function load({ url }) {

    // Read the search parameters from the URL.
    const location = (url.searchParams.get('location') ?? '').trim();
    const brand = (url.searchParams.get('brand') ?? '').trim();

    const minPriceRaw = url.searchParams.get('minPrice') ?? '';
    const maxPriceRaw = url.searchParams.get('maxPrice') ?? '';
    const seatsRaw = url.searchParams.get('seats') ?? '';
    const yearRaw = url.searchParams.get('year') ?? '';

    // Set the default sorting and view options.
    const sort = url.searchParams.get('sort') ?? 'recommended';
    const view = url.searchParams.get('view') === 'map' ? 'map' : 'grid';

    // Convert numeric filter values into numbers.
    const minPrice = minPriceRaw === '' ? null : Number(minPriceRaw);
    const maxPrice = maxPriceRaw === '' ? null : Number(maxPriceRaw);
    const seats = seatsRaw === '' ? null : Number(seatsRaw);
    const year = yearRaw === '' ? null : Number(yearRaw);

    // Check whether the entered filter values are valid.
    if (
        (minPrice !== null && (!Number.isFinite(minPrice) || minPrice < 0)) ||
        (maxPrice !== null && (!Number.isFinite(maxPrice) || maxPrice < 0)) ||
        (minPrice !== null && maxPrice !== null && minPrice > maxPrice) ||
        (seats !== null && (!Number.isInteger(seats) || seats < 1)) ||
        (year !== null && (!Number.isInteger(year) || year < 1900 || year > 2155))
    ) {
        throw error(400, 'Invalid filter values');
    }

    // Start with available cars and prepare the SQL filter values.
    const conditions = ["autos.status = 'available'"];
    const values = [];

    // Filter cars by location.
    if (location) {
        conditions.push('autos.location LIKE ?');
        values.push(`%${location}%`);
    }

    // Filter by the selected brand.
    if (brand) {
        conditions.push('brands.name = ?');
        values.push(brand);
    }

    // Apply the minimum and maximum daily prices.
    if (minPrice !== null) {
        conditions.push('autos.price_per_day >= ?');
        values.push(minPrice);
    }

    if (maxPrice !== null) {
        conditions.push('autos.price_per_day <= ?');
        values.push(maxPrice);
    }

    // Find cars with at least the selected number of seats.
    if (seats !== null) {
        conditions.push('autos.number_of_seats >= ?');
        values.push(seats);
    }

    // Find cars from the selected production year or newer.
    if (year !== null) {
        conditions.push('autos.production_year >= ?');
        values.push(year);
    }

    // Define the available sorting options.
    const sortOptions = {
        recommended: 'autos.id DESC',
        price_asc: 'autos.price_per_day ASC',
        price_desc: 'autos.price_per_day DESC',
        year_desc: 'autos.production_year DESC'
    };

    // Use the selected sorting option or the default order.
    const orderBy = sortOptions[sort] ?? sortOptions.recommended;

    // Retrieve matching cars and include their brand names.
    const [cars] = await pool.execute(
        `SELECT autos.*, brands.name AS brand_name,
        (SELECT image_url
         FROM auto_images
         WHERE auto_id = autos.id
         ORDER BY id ASC
         LIMIT 1) AS first_image
         FROM autos
         JOIN brands ON autos.brand_id = brands.id
         WHERE ${conditions.join(' AND ')}
         ORDER BY ${orderBy}`,
        values
    );

    // Retrieve brands that have at least one available car.
    const [brandRows] = await pool.execute(
        `SELECT DISTINCT brands.name
         FROM brands
         JOIN autos ON autos.brand_id = brands.id
         WHERE autos.status = 'available'
         ORDER BY brands.name`
    );

    // Return the search results and filter values to the page.
    return {
        cars,
        brands: brandRows.map((row) => row.name),
        filters: {
            location,
            brand,
            minPrice: minPriceRaw,
            maxPrice: maxPriceRaw,
            seats: seatsRaw,
            year: yearRaw,
            sort,
            view
        }
    };
}


