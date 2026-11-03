import pool from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const location = (url.searchParams.get('location') ?? '').trim();
    const brand = (url.searchParams.get('brand') ?? '').trim();
    const minPriceRaw = url.searchParams.get('minPrice') ?? '';
    const maxPriceRaw = url.searchParams.get('maxPrice') ?? '';
    const seatsRaw = url.searchParams.get('seats') ?? '';
    const yearRaw = url.searchParams.get('year') ?? '';
    const sort = url.searchParams.get('sort') ?? 'recommended';
    const view = url.searchParams.get('view') === 'map' ? 'map' : 'grid';

    const minPrice = minPriceRaw !== '' ? Number(minPriceRaw) : null;
    const maxPrice = maxPriceRaw !== '' ? Number(maxPriceRaw) : null;
    const seats = seatsRaw !== '' ? Number(seatsRaw) : null;
    const year = yearRaw !== '' ? Number(yearRaw) : null;

    if ((minPrice !== null && (!Number.isFinite(minPrice) || minPrice < 0)) ||
        (maxPrice !== null && (!Number.isFinite(maxPrice) || maxPrice < 0)) ||
        (seats !== null && (!Number.isInteger(seats) || seats < 1)) ||
        (year !== null && (!Number.isInteger(year) || year < 1900 || year > 2155))) {
        throw error(400, 'Invalid filter values');
    }

    const conditions = ["autos.status = 'available'"];
    const values = [];

    if (location) { conditions.push('autos.location LIKE ?'); values.push(`%${location}%`); }
    if (brand) { conditions.push('brands.name = ?'); values.push(brand); }
    if (minPrice !== null) { conditions.push('autos.price_per_day >= ?'); values.push(minPrice); }
    if (maxPrice !== null) { conditions.push('autos.price_per_day <= ?'); values.push(maxPrice); }
    if (seats !== null) { conditions.push('autos.number_of_seats >= ?'); values.push(seats); }
    if (year !== null) { conditions.push('autos.production_year >= ?'); values.push(year); }

    const orderBy = {
        recommended: 'autos.id DESC',
        price_asc: 'autos.price_per_day ASC',
        price_desc: 'autos.price_per_day DESC',
        year_desc: 'autos.production_year DESC'
    }[sort] ?? 'autos.id DESC';

    const [cars] = await pool.execute(
        `SELECT autos.*, brands.name AS brand_name
         FROM autos JOIN brands ON autos.brand_id = brands.id
         WHERE ${conditions.join(' AND ')}
         ORDER BY ${orderBy}`,
        values
    );

    const [brandRows] = await pool.execute(
        `SELECT DISTINCT brands.name FROM brands
         JOIN autos ON autos.brand_id = brands.id
         WHERE autos.status = 'available' ORDER BY brands.name`
    );

    return {
        cars,
        brands: brandRows.map((item) => item.name),
        filters: { location, brand, minPrice: minPriceRaw, maxPrice: maxPriceRaw, seats: seatsRaw, year: yearRaw, sort, view }
    };
}