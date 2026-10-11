 // Importiert redirect, um den Benutzer auf eine andere Seite weiterzuleiten.
import { redirect } from '@sveltejs/kit';
// Importiert die Funktion zum Löschen einer Session aus der Datenbank.
import { invalidateSession } from '$lib/server/auth.js';

export const actions ={
    // Die default-Aktion wird beim Absenden des Formulars ausgeführt.
    // cookies ermöglicht das Lesen und Löschen von Cookies.
    default: async ({ cookies }) => {
    // Liest die Session-ID aus dem Cookie namens "session".
    const sessionId = cookies.get('session');

    // Prüft, ob eine Session-ID existiert
    if (sessionId) {
    // Löscht die Session aus der Datenbank.
    // await wartet, bis die Session gelöscht wurde.   
        await invalidateSession(sessionId);
    }

// Löscht das Session-Cookie aus dem Browser.
cookies.delete('session', {
    // Das Cookie gilt für die gesamte Webseite 
    path: '/'
});

// Leitet den Benutzer nach dem Logout zur Login-Seite weiter.
// 303 (see other) bedeutet, dass der Browser eine neue GET-Anfrage ausführt.
throw redirect(303, '/login');
}
};