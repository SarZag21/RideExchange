import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { hashPassword } from '$lib/server/auth.js';

export const actions = {

    default: async ({ request }) => {

        const formData = await request.formData();

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const phoneNumber = formData.get('phone_number');


        if (!username || !email || !password) {
            return fail(400, {
                error: 'Please fill all the required fields.'
            });
        }

        if (password.length < 8) {
            return fail(400, {
                error: 'Password must be at least 8 characters long.'
            });
        }

        const [existingUsers] = await pool.execute(
            `SELECT id
             FROM users
             WHERE username = ? OR email = ?`,
            [username, email]
        );

        if (existingUsers.length > 0) {
            return fail(400, {
                error: 'Username or email already exists.'
            });
        }

        const hashedPassword = await hashPassword(password);

        await pool.execute(
            `INSERT INTO users
             (username, hash_password, email, phone_number)
             VALUES (?, ?, ?, ?)`,
            [
                username,
                hashedPassword,
                email,
                phoneNumber || null
            ]
        );

        redirect(303, '/login');
    }
};