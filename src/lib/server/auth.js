// Importiert die Datenbankverbindung.
import pool from "./database.js";
// Importiert bcrypt zum sicheren Hashen und Überprüfen von Passwörtern.
import bcrypt from 'bcrypt';
// Importiert randomUUID (Universally Unique Identifier) zur Erstellung eindeutiger Session-IDs.
import { randomUUID } from 'crypto';

// Eine Session bleibt 30 Tage gültig.
const SESSION_DURATION_DAYS = 30;

// Erstellt mit bcrypt einen sicheren Passwort-Hash.
// await wartet auf die Berechnung, return gibt den Hash zurück.
// Ein Salt ist ein zufälliger Wert, durch den gleiche Passwörter unterschiedliche Hashes bekommen.
// bcrypt erzeugt den Salt automatisch.
// Die Zahl 10 ist der Kostenfaktor: bcrypt verwendet ungefähr 2^10 = 1024 interne Berechnungsschritte.
// Je höher die Zahl, desto länger dauert das Hashen und desto schwieriger werden Passwortangriffe.
// Der fertige bcrypt-Hash hat normalerweise 60 Zeichen.
export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

// Vergleicht das eingegebene Passwort mit dem gespeicherten Hash.
export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Erstellt eine neue Session für einen Benutzer.
export async function createSession(userId){
     // Generiert eine zufällige und eindeutige Session-ID.
    const sessionId = randomUUID();

// Berechnet das Ablaufdatum der Session (30 Tage ab jetzt)
    const expires = new Date(
        Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
    );

 // Speichert die Session mit Benutzer-ID und Ablaufdatum in der Datenbank.
    await pool.execute(
    `INSERT INTO sessions (id, user_id, expires)
         VALUES (?, ?, ?)`,
        [sessionId, userId, expires]
    );

    // Gibt die Session-ID zurück, die als Cookie im Browser gespeichert werden kann.
    return sessionId;
}
// Überprüft, ob eine Session-ID gültig ist und gibt die zugehörigen Benutzerdaten zurück.
export async function validateSession(sessionId) {
//Ohne Session-ID kann keine Session überprüft werden
if(!sessionId) return null;

// Holt die Benutzerdaten aus der Datenbank, wenn die Session-ID existiert und noch nicht abgelaufen ist.
const [rows] = await pool.execute(
      `SELECT
            u.id,
            u.username,
            u.email,
            u.role,
            u.phone_number,
            u.is_owner
         FROM sessions s
         JOIN users u ON u.id = s.user_id
         WHERE s.id = ?
         AND s.expires > NOW()`,
         [sessionId]
);

// Gibt die Benutzerdaten zurück, oder null, wenn die Session ungültig ist.
return rows[0] || null;
}
// Beendet eine Session, indem sie aus der Datenbank gelöscht wird.
export async function invalidateSession(sessionId) {
    // Bricht die Funktion ab, wenn keine Session-ID vorhanden ist.
    if(!sessionId) return;

    // Löscht die Session anhand ihrer ID aus der Datenbank 
    await pool.execute(
         `DELETE FROM sessions
         WHERE id = ?`,
        [sessionId]
    );
}

// Entfernt alle abgelaufenen Sessions aus der Datenbank 
export async function deleteExpiredSessions() {
     // Löscht Sessions, deren Ablaufdatum erreicht oder überschritten wurde.
    await pool.execute(
        `DELETE FROM sessions
         WHERE expires <= NOW()`
    );
}