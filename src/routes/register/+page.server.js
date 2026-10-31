// Importiert fail für Fehlermeldungen und redirect für Weiterleitungen.
import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
// Importiert die Funktion zum sicheren Hashen von Passwörtern.
import { hashPassword } from '$lib/server/auth.js';

export const actions = {
    // Die default-Aktion verarbeitet das Registrierungsformular.
    // request enthält die gesendeten Formulardaten vom Benutzer .
    default: async ({ request }) => {
        // Liest die eingegebenen Daten aus dem Formular.
        const formData = await request.formData();

        // Holt Benutzername, E-Mail, Passwort und Telefonnummer aus dem Formular.
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const phoneNumber = formData.get('phone_number');

        // Prüft, ob Benutzername, E-Mail oder Passwort fehlen.
        // fail(400, {...}) sendet einen HTTP-Fehlercode 400 (Bad Request, client side error) und eine Fehlermeldung zurück.
        if (!username || !email || !password) {
            return fail(400, {
                error: 'Please fill all the required fields.'
            });
        }
        // Überprüft die Länge des Benutzernamens.
        if (username.length < 3) {
            return fail(400, {
                error: 'Username must have at least 3 characters.'
            });
        }

        // Prüft, ob die E-Mail-Adresse ein gültiges Format hat.
        if (!email.includes('@') || !email.includes('.')) {
        return fail(400, {
            error: 'Please enter a valid email.'
        });
        }

        // Prüft, ob das Passwort mindestens 8 Zeichen lang ist.
        // password.length gibt die Anzahl der Zeichen zurück.
        if (password.length < 8) {
            return fail(400, {
                error: 'Password must be at least 8 characters long.'
            });
        }

        // Sucht in der Datenbank nach einem bestehenden Benutzernamen oder einer E-Mail.
        // SELECT id liest die Benutzer-ID aus der Tabelle users.
        const [existingUsers] = await pool.execute(
            `SELECT id
             FROM users
             WHERE username = ? OR email = ?`,
            [username, email]
        );

         // Prüft, ob bereits ein Benutzer mit diesem Namen oder dieser E-Mail existiert.
        // length > 0 bedeutet, dass mindestens ein Benutzer gefunden wurde.
        if (existingUsers.length > 0) {
            return fail(400, {
                error: 'Username or email already exists.'
            });
        }
        // Erstellt mit bcrypt einen sicheren Hash aus dem Passwort.
        // Das originale Passwort wird nicht direkt in der Datenbank gespeichert.
        const hashedPassword = await hashPassword(password);

        // Speichert den neuen Benutzer in der Datenbank.
        // INSERT INTO fügt einen neuen Datensatz in die Tabelle users ein.
        // VALUES enthält die Werte für die angegebenen Spalten.
        await pool.execute(
            `INSERT INTO users
             (username, hash_password, email, phone_number)
             VALUES (?, ?, ?, ?)`,
            [
                username,
                hashedPassword,
                email,
                // Wenn keine Telefonnummer eingegeben wurde, wird NULL gespeichert.
                phoneNumber || null
            ]
        );

        // Leitet den Benutzer nach erfolgreicher Registrierung zur Login-Seite weiter.
        // 303 (see other) bedeutet, dass der Browser eine neue GET-Anfrage ausführt
        redirect(303, '/login');
    }
};