import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';

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

export const actions = {
    update: async ({ request, locals }) => {
        const formData = await request.formData();
        
        const username = formData.get('username');
        const email = formData.get('email');
        const phoneNumber = formData.get('phone_number');

        if (!username || !email) {
            return fail(400, {
            error: 'Username and email are required.'
            });
        }


        await pool.execute(
        `UPDATE users
        SET username = ?, email = ?, phone_number = ?
        WHERE id = ?`,
        [username, email, phoneNumber, locals.user.id]
        );

        return {
        success: true
        };
    }
};