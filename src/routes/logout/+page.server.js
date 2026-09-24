import { redirect } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth.js';

export async function POST({ cookies }) {
    const sessionId = cookies.get('session');

    if (sessionId) {
        await invalidateSession(sessionId);
    }
}