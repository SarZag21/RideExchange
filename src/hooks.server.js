import { validateSession } from '$lib/server/auth.js';

export async function handle({ event, resolve }) {
    const sessionId = event.cookies.get('session');
    const user = await validateSession(sessionId)
    event.locals.user = user;
    return resolve(event);
}