// Importiert redirect von SvelteKit, um Benutzer weiterzuleiten.
import { redirect } from '@sveltejs/kit';

// Die load-Funktion wird aufgerufen, wenn die Seite geladen wird.
export async function load({ locals }) {

    // Prüft, ob der Benutzer angemeldet ist.
    // Wenn nicht, wird er zur Login-Seite weitergeleitet.
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    return {};
}
