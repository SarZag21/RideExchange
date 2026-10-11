 // Importiert fail für Fehlermeldungen und redirect für Weiterleitungen.
import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';

// Die load-Funktion lädt die Benutzerdaten für die Profilseite.
export function load({ locals }) {
    // Prüft, ob der Benutzer angemeldet ist.
    // Wenn kein Benutzer existiert, wird er zur Login-Seite weitergeleitet.
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    // Gibt die Benutzerdaten an die Profilseite weiter.
    // locals.user enthält die Daten des angemeldeten Benutzers.
    return {
    user: {
        id: locals.user.id,
        username: locals.user.username,
        email: locals.user.email,
        phone_number: locals.user.phone_number,
        role: locals.user.role
    }
};
}

export const actions = {
    // Die update-Aktion verarbeitet das Formular zum Aktualisieren des Profils.
    // request enthält die Formulardaten, locals enthält den angemeldeten Benutzer.
    update: async ({ request, locals }) => {
        // Liest die eingegebenen Daten aus dem Formular.
        const formData = await request.formData();
        
        // Holt Benutzername, E-Mail und Telefonnummer aus dem Formular.
        const username = formData.get('username');
        const email = formData.get('email');
        const phoneNumber = formData.get('phone_number');

        // Prüft, ob Benutzername oder E-Mail fehlen.
        // fail(400, {...}) sendet einen HTTP-Fehlercode 400 (Bad Request, client side error) und eine Fehlermeldung zurück.
        if (!username || !email) {
            return fail(400, {
            error: 'Username and email are required.'
            });
        }


        // Aktualisiert die Benutzerdaten in der Datenbank.
        // SET legt fest, welche Spalten geändert werden.
        // WHERE id = ? sorgt dafür, dass nur der angemeldete Benutzer aktualisiert wird.
        await pool.execute(
        `UPDATE users
        SET username = ?, email = ?, phone_number = ?
        WHERE id = ?`,
        [username, email, phoneNumber, locals.user.id]
        );

        // Leitet den Benutzer nach dem Speichern zurück zur Profilseite.
        // 303 (see other) bedeutet, dass der Browser eine neue GET-Anfrage ausführt.
       throw redirect(303, '/profile');
    }
};