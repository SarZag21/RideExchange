import { error, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';

// Lädt das Auto, das der Benutzer bearbeiten möchte.
export async function load({ params, locals }) {
    // Prüft, ob der Benutzer angemeldet ist.
    if (!locals.user) {
        redirect(303, '/login');
    }

    // Sucht das Auto anhand der ID und des Besitzers.
    const [cars] = await pool.execute(
        `SELECT autos.*, brands.name AS brand_name
         FROM autos
         JOIN brands ON autos.brand_id = brands.id
         WHERE autos.id = ? AND autos.user_id = ?`,
        [params.id, locals.user.id]
    );

    // Verhindert den Zugriff auf fremde oder unbekannte Autos.
    if (cars.length === 0) {
        error(404, 'Car not found');
    }

    // Übergibt die Fahrzeugdaten an die Bearbeitungsseite.
    return { car: cars[0] };
}
