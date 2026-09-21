import pool from "./database.js";
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const SESSION_DURATION_DAYS = 30;

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}


export async function createSession(userId){
    const sessionId = randomUUID();

    const expires = new Date(
        Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
    );

    await pool.execute(
    `INSERT INTO sessions (id, user_id, expires)
         VALUES (?, ?, ?)`,
        [sessionId, userId, expires]
    );

    return sessionId;
}

export async function validateSession(sessionId) {

if(!sessionId) return null;

const [rows] = await pool.execute(
      `SELECT
            u.id,
            u.username,
            u.email,
            u.role
            u.phone_number,
            u.is_owner
         FROM sessions s
         JOIN users u ON u.id = s.user_id
         WHERE s.id = ?
         AND s.expires > NOW()`,
         [sessionId]
);

return rows[0] || null;
}

export async function invalidateSession(sessionId) {
    if(!sessionId) return;

    await pool.execute(
         `DELETE FROM sessions
         WHERE id = ?`,
        [sessionId]
    );
}

export async function deleteExpiredSessions() {
    await pool.execute(
        `DELETE FROM sessions
         WHERE expires <= NOW()`
    );
}