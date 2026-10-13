// Importiert redirect von SvelteKit, um Benutzer weiterzuleiten.
import { redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';

// Die load-Funktion wird aufgerufen, wenn die Seite geladen wird.
export async function load({ locals }) {

    // Prüft, ob der Benutzer angemeldet ist.
    // Wenn nicht, wird er zur Login-Seite weitergeleitet.
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    // Holt alle Autos des angemeldeten Benutzers aus der Datenbank.
    // WHERE zeigt nur Autos an, die diesem Benutzer gehören.
    const [cars] = await pool.execute(
        `SELECT autos.*, brands.name AS brand_name
        FROM autos
        JOIN brands ON autos.brand_id = brands.id
        WHERE autos.user_id = ?`,
        [locals.user.id]
    );

    // Führt eine SQL-Abfrage aus, um alle Autos aus der Datenbank abzurufen.
    return { cars };
}
