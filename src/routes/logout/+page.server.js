import { redirect } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth.js';

export const actions ={
    default: async ({ cookies }) => {
    const sessionId = cookies.get('session');

    if (sessionId) {
        await invalidateSession(sessionId);
    }


cookies.delete('session', {
    path: '/'
});

throw redirect(303, '/login');
}
};