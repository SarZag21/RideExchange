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

        // Prüft, ob der Benutzer angemeldet ist.
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        // Liest die eingegebenen Daten aus dem Formular.
        const formData = await request.formData();
        
        // Bereitet die Eingaben für die Speicherung vor.
        const username = String(formData.get('username') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim().toLowerCase();
        const phoneNumber = String(formData.get('phone_number') ?? '').trim();
    
        // Prüft den Benutzernamen.
        if (username.length < 3 || username.includes(' ')) {
            return fail(400, { error: 'Invalid username.' });
        }

        // Prüft die E-Mail-Adresse.
        if (!email.includes('@') || !email.includes('.')) {
            return fail(400, { error: 'Invalid email.' });
        }

        // Prüft die Telefonnummer.
        if (phoneNumber.length > 25) {
            return fail(400, { error: 'Phone number is too long.' });
        }

        // Prüft, ob Benutzername oder E-Mail fehlen.
        // fail(400, {...}) sendet einen HTTP-Fehlercode 400 (Bad Request, client side error) und eine Fehlermeldung zurück.
        if (!username || !email) {
            return fail(400, {
            error: 'Username and email are required.'
            });
        }


        // Prüft, ob Benutzername oder E-Mail schon existieren.
        const [existingUsers] = await pool.execute(
            `SELECT id FROM users
            WHERE (username = ? OR email = ?) AND id != ?`,
            [username, email, locals.user.id]
        );

        // Verhindert doppelte Daten.
        if (existingUsers.length > 0) {
            return fail(400, { error: 'Username or email already exists.' });
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

        // Gibt eine Erfolgsmeldung nach dem Speichern zurück.
        return { success: true };
    }
};