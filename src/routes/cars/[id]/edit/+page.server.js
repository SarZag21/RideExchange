import { error, fail, redirect } from '@sveltejs/kit';
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

export const actions = {
    default: async ({ request, locals, params }) => {
        // Prüft, ob der Benutzer angemeldet ist.
        if (!locals.user) {
            redirect(303, '/login');
        }

        // Liest die bearbeiteten Fahrzeugdaten aus dem Formular.
        const formData = await request.formData();
        const brand = String(formData.get('brand') ?? '').trim();
        const type = String(formData.get('type') ?? '').trim();
        const productionYear = Number(formData.get('production_year'));
        const color = String(formData.get('color') ?? '').trim();
        const seats = Number(formData.get('number_of_seats'));
        const location = String(formData.get('location') ?? '').trim();
        const price = Number(formData.get('price_per_day'));

        // Prüft, ob alle Eingaben gültig sind.
        if (!brand || !type || !color || !location ||
            !Number.isInteger(productionYear) ||
            productionYear < 1900 ||
            !Number.isInteger(seats) || seats < 1 ||
            !Number.isFinite(price) || price <= 0) {
            return fail(400, { message: 'Invalid car details' });
        }
        // Prüft, ob das Fahrzeug dem angemeldeten Benutzer gehört.
        const [cars] = await pool.execute(
            `SELECT id FROM autos
            WHERE id = ? AND user_id = ?`,
            [params.id, locals.user.id]
        );

        // Verhindert Änderungen an fremden Fahrzeugen.
        if (cars.length === 0) {
            error(404, 'Car not found');
        }

        // Die Datenbankaktualisierung folgt im nächsten Schritt.
        return fail(501, { message: 'Saving is not implemented yet' });

    }
};
