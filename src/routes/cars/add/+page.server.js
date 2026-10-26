import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';

// Verarbeitet das Formular zum Hinzufügen eines Autos.
export const actions = {
    default: async ({ request, locals }) => {

        // Prüft, ob der Benutzer angemeldet ist.
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        // Liest die Daten aus dem Formular.
        const formData = await request.formData();

        const brand = formData.get('brand');
        const type = formData.get('type');
        const production_year = formData.get('production_year');
        const color = formData.get('color');
        const number_of_seats = formData.get('number_of_seats');
        const location = formData.get('location');
        const price_per_day = formData.get('price_per_day');

        // Prüft, ob alle Felder ausgefüllt sind.
        if (
            !brand ||
            !type ||
            !production_year ||
            !color ||
            !number_of_seats ||
            !location ||
            !price_per_day
        ) {
            return fail(400, {
                error: 'Please fill in all fields.'
            });
        }


        // Prüft, ob die Automarke bereits existiert.
            const [brands] = await pool.execute(
                'SELECT id FROM brands WHERE name = ?',
                [brand]
            );

        // Speichert die ID der Automarke.
        let brandId;

        // Prüft, ob die Marke gefunden wurde.
        if (brands.length > 0) {
            brandId = brands[0].id;
        } else {

            // Fügt eine neue Marke in die Datenbank ein.
            const [result] = await pool.execute(
                'INSERT INTO brands (name) VALUES (?)',
                [brand]
            );

            // Speichert die ID der neuen Marke.
            brandId = result.insertId;
        }

            return { success: true };
        }


};