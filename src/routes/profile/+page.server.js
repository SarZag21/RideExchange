import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
    if (!locals.user) {
        throw redirect(303, '/login');
    }

    return {
    user: {
        id: locals.user.id,
        username: locals.user.username,
        email: locals.user.email,
        phone_number: locals.user.phone_number,
        role: locals.user.role
    }
};
}