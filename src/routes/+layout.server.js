// Lädt den angemeldeten Benutzer.
export function load({ locals }) {

    // Übergibt den Benutzer an die Seiten.
    return {
        user: locals.user
    };
}