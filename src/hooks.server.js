import { validateSession } from '$lib/server/auth.js';

// Diese Funktion wird bei jeder Anfrage an den Server ausgeführt.
// event enthält die Daten der Anfrage.
// resolve sorgt dafür, dass die Anfrage weiterbearbeitet wird.
export async function handle({ event, resolve }) {
     // Holt die Session-ID aus dem Cookie im Browser.
    const sessionId = event.cookies.get('session');

    // Prüft mit der Session-ID, ob der Benutzer angemeldet ist.
    // Wenn die Session gültig ist, bekommt man die Benutzerdaten.
    // Sonst ist das Ergebnis null.
    const user = await validateSession(sessionId)
    // Speichert die Benutzerdaten in event.locals.user.
    // Andere Server-Dateien können diese Daten dann verwenden.
    event.locals.user = user;
    // Lässt den Server die Anfrage weiterbearbeiten.
    // return gibt die Antwort zurück.
    return resolve(event);
}