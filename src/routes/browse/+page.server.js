import pool from '$lib/server/database.js';

// Lädt alle verfügbaren Fahrzeuge aus der Datenbank.
export async function load() {
    const [cars] = await pool.execute(
        `SELECT autos.*, brands.name AS brand_name
         FROM autos
         JOIN brands ON autos.brand_id = brands.id
         WHERE autos.status = 'available'`
    );

    // Übergibt die Fahrzeuge an die Browse-Seite.
    return { cars };
}
