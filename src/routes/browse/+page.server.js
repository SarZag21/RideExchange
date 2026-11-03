import pool from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

// Load the cars from the database and apply the selected search filters
export async function load({ url }) {

    // Read the selected filters from the URL
    const location = (url.searchParams.get('location') ?? '').trim();
    const brand = (url.searchParams.get('brand') ?? '').trim();

    const minPriceRaw = url.searchParams.get('minPrice') ?? '';
    const maxPriceRaw = url.searchParams.get('maxPrice') ?? '';
    const seatsRaw = url.searchParams.get('seats') ?? '';
    const yearRaw = url.searchParams.get('year') ?? '';

    // Read the selected sorting option and display mode
    const sort = url.searchParams.get('sort') ?? 'recommended';
    const view = url.searchParams.get('view') === 'map' ? 'map' : 'grid';

    // Convert the price, seats and year filters into numbers
    const minPrice = minPriceRaw === '' ? null : Number(minPriceRaw);
    const maxPrice = maxPriceRaw === '' ? null : Number(maxPriceRaw);
    const seats = seatsRaw === '' ? null : Number(seatsRaw);
    const year = yearRaw === '' ? null : Number(yearRaw);

    // Check if all entered filter values are valid
    if (
        (minPrice !== null && (!Number.isFinite(minPrice) || minPrice < 0)) ||
        (maxPrice !== null && (!Number.isFinite(maxPrice) || maxPrice < 0)) ||
        (minPrice !== null && maxPrice !== null && minPrice > maxPrice) ||
        (seats !== null && (!Number.isInteger(seats) || seats < 1)) ||
        (year !== null && (!Number.isInteger(year) || year < 1900 || year > 2155))
    ) {
        // Return an error if a filter contains an invalid value
        throw error(400, 'Invalid filter values');
    }

    // Only show cars that are currently available
    const conditions = ["autos.status = 'available'"];
    const values = [];

    // Search for cars in the entered location
    if (location) {
        conditions.push('autos.location LIKE ?');
        values.push(`%${location}%`);
    }

    // Show only cars from the selected brand
    if (brand) {
        conditions.push('brands.name = ?');
        values.push(brand);
    }

    // Show cars that match the minimum daily price
    if (minPrice !== null) {
        conditions.push('autos.price_per_day >= ?');
        values.push(minPrice);
    }

    // Show cars that match the maximum daily price
    if (maxPrice !== null) {
        conditions.push('autos.price_per_day <= ?');
        values.push(maxPrice);
    }

    // Show cars with at least the selected number of seats
    if (seats !== null) {
        conditions.push('autos.number_of_seats >= ?');
        values.push(seats);
    }

    // Show cars from the selected year or newer
    if (year !== null) {
        conditions.push('autos.production_year >= ?');
        values.push(year);
    }

    // Define how the search results can be sorted
    const sortOptions = {
        recommended: 'autos.id DESC',
        price_asc: 'autos.price_per_day ASC',
        price_desc: 'autos.price_per_day DESC',
        year_desc: 'autos.production_year DESC'
    };

    // Use the selected sorting option or the default order
    const orderBy = sortOptions[sort] ?? sortOptions.recommended;

    // Get all cars that match the selected filters
    const [cars] = await pool.execute(
        `SELECT autos.*, brands.name AS brand_name
         FROM autos
         JOIN brands ON autos.brand_id = brands.id
         WHERE ${conditions.join(' AND ')}
         ORDER BY ${orderBy}`,
        values
    );

    // Get all available car brands for the brand filter
    const [brandRows] = await pool.execute(
        `SELECT DISTINCT brands.name
         FROM brands
         JOIN autos ON autos.brand_id = brands.id
         WHERE autos.status = 'available'
         ORDER BY brands.name`
    );

    // Send the search results and filter settings back to the page
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