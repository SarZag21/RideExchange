import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();

        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return fail(400, {
                error: 'Please fill all the required fields.'
            });
        }
    }
};