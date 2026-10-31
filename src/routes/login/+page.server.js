import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
// Importiert Funktionen zur Passwortprüfung und Session-Erstellung 
import { verifyPassword, createSession } from '$lib/server/auth.js';

export const actions = {
    // Die default-Aktion verarbeitet das Login-Formular.
    // request enthält die Formulardaten, cookies verwaltet die Browser-Cookies.
    default: async ({ request, cookies }) => {
        // Liest die eingegebenen Daten aus dem Formular.
        const formData = await request.formData();

        // Holt die E-Mail-Adresse oder Username und das Passwort aus den Formulardaten.
        const identifier = formData.get('identifier');
        const password = formData.get('password');

        // Prüft, ob E-Mail/Username oder Passwort fehlen.
        // fail(400, {...}) sendet einen HTTP-Fehlercode 400 (Bad Request, client side error) und eine Fehlermeldung zurück.
        if (!identifier || !password) {
            return fail(400, {
                error: 'Please fill all the required fields.'
            });
        }

        // Sucht den Benutzer anhand seiner E-Mail-Adresse oder Username in der Datenbank
         const [users] = await pool.execute(
            `SELECT id, username, email, hash_password, role
             FROM users
             WHERE email = ? or username = ?
             LIMIT 1`,
            [identifier, identifier]
        );

        // Nimmt den ersten gefundenen Benutzer aus dem Ergebnis.
        const user = users[0];
         // Gibt eine Fehlermeldung zurück, wenn kein Benutzer gefunden wurde.
        if (!user) {
            return fail(400, {
                error: 'Invalid email or password.'
            });
        }

        // Vergleicht das eingegebene Passwort mit dem gespeicherten Passwort-Hash
         const validPassword = await verifyPassword(
            password,
            user.hash_password
        );

       // Gibt eine allgemeine Fehlermeldung zurück, wenn das Passwort falsch ist.
        if (!validPassword) {
            return fail(400, {
                error: 'Invalid username, email or password.'
            });
        }


        // Erstellt eine neue Session für den angemeldeten Benutzer
        const sessionId = await createSession(user.id);
        // Speichert die Session-ID in einem Cookie im Browser.
        cookies.set('session', sessionId, {
            // Das Cookie gilt für alle Seiten der Webseite.
            path: '/',
            // Das Cookie kann nicht direkt mit JavaScript im Browser gelesen werden.
            httpOnly: true,
            // Schränkt das Mitsenden des Cookies bei fremden Webseiten ein.
            sameSite: 'lax',
            // Erlaubt das Cookie auch ohne HTTPS (für die lokale Entwicklung).
            secure: false,
            // Das Cookie bleibt 30 Tage gültig.
            maxAge: 60 * 60 * 24 * 30
        });

        // Leitet den Benutzer nach erfolgreichem Login zur Startseite weiter.
        // 303 (see other) bedeutet, dass der Browser danach eine GET-Anfrage ausführen soll.
        throw redirect(303, '/');
    }
};