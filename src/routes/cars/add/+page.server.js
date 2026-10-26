import { redirect } from '@sveltejs/kit';

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

        return { success: true };
    }


};