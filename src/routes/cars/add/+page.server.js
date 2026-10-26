import { redirect } from '@sveltejs/kit';

// Verarbeitet das Formular zum Hinzufügen eines Autos.
export const actions = {
    default: async ({ request, locals }) => {

        // Prüft, ob der Benutzer angemeldet ist.
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        return { success: true };
    }
};