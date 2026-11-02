import { fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
// Importiert Funktionen zum Hochladen und Löschen von Bildern.
import { put, del } from '@vercel/blob';
// Liest den Blob-Token auf dem Server.
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Verarbeitet das Formular zum Hinzufügen eines Autos.
export const actions = {
    default: async ({ request, locals }) => {

        // Prüft, ob der Benutzer angemeldet ist.
        if (!locals.user) {
            throw redirect(303, '/login');
        }

        // Liest die Daten aus dem Formular.
        const formData = await request.formData();

        const brand = formData.get('brand');
        const type = formData.get('type');
        const production_year = formData.get('production_year');
        const color = formData.get('color');
        const number_of_seats = formData.get('number_of_seats');
        const location = formData.get('location');
        const price_per_day = formData.get('price_per_day');

        // Liest alle ausgewählten Autobilder aus dem Formular.
        const images = formData.getAll('car_images').filter(
            (file) => file instanceof File && file.size > 0
        );


        // Prüft Dateityp und Dateigröße der Bilder.
        for (const image of images) {

            // Erlaubt nur JPG- und PNG-Bilder.
            if (!['image/jpeg', 'image/png'].includes(image.type)) {
                return fail(400, {
                    error: 'Only JPG and PNG are allowed.'
                });
            }

            // Prüft die maximale Bildgröße von 2 MB.
            if (image.size > 2 * 1024 * 1024) {
                return fail(400, {
                    error: 'Maximum image size is 2 MB.'
                });
            }
        }

        // Prüft die maximale Anzahl der Bilder.
        if (images.length > 7) {
            return fail(400, { error: 'Maximum 7 pictures allowed.' });
        }

        // Prüft, ob alle Felder ausgefüllt sind.
        if (
            !brand ||
            !type ||
            !production_year ||
            !color ||
            !number_of_seats ||
            !location ||
            !price_per_day
        ) {
            return fail(400, {
                error: 'Please fill in all fields.'
            });
        }

        // Wandelt die Zahlen aus dem Formular um.
        const year = Number(production_year);
        const seats = Number(number_of_seats);
        const price = Number(price_per_day);

        const validYear = Number.isInteger(year) && year >= 1901 && year <= 2155;
        const validSeats = Number.isInteger(seats) && seats >= 1 && seats <= 100;
        const validPrice = Number.isFinite(price) && price >= 5.01 && price <= 999999.99;

        // Prüft, ob die Zahlen gültig sind.
        if (!validYear || !validSeats || !validPrice) {
            return fail(400, {
                error: 'Please enter valid car details.'
            });
        }

        // Entfernt Leerzeichen am Anfang und Ende.
        const brandName = String(brand).trim();
        const modelName = String(type).trim();
        const carColor = String(color).trim();
        const carLocation = String(location).trim();

        // Prüft die Länge der Texte.
        if (
            brandName.length < 1 || brandName.length > 100 ||
            modelName.length < 1 || modelName.length > 50 ||
            carColor.length < 1 || carColor.length > 30 ||
            carLocation.length < 1 || carLocation.length > 100
        ) {
            return fail(400, {
                error: 'Please enter valid text details.'
            });
        }

        // Fügt die Automarke hinzu oder verwendet die vorhandene Marke.
        const [result] = await pool.execute(
            `INSERT INTO brands (name)
            VALUES (?)
            ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
            [brandName]
        );

        // Speichert die ID der Automarke.
        const brandId = result.insertId;

        // Speichert das Auto in der Datenbank.
        const [carResult] = await pool.execute(
            `INSERT INTO autos
            (color, production_year, type, number_of_seats, user_id, price_per_day, location, brand_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
             [
                carColor,
                year,
                modelName,
                seats,
                locals.user.id,
                price,
                carLocation,
                brandId

            ]
        );
        // Speichert die ID des neu hinzugefügten Autos.
        const carId = carResult.insertId;


        // Speichert die URLs der hochgeladenen Bilder.
const uploadedUrls = [];

try {
    // Lädt die Autobilder in Vercel Blob hoch.
    for (const image of images) {
        // Bestimmt die Dateiendung.
        const extension = image.type === 'image/png' ? 'png' : 'jpg';

        // Lädt das Bild hoch.
        const blob = await put(
            `cars/${carId}/${crypto.randomUUID()}.${extension}`,
            image,
            {
                access: 'public',
                token: BLOB_READ_WRITE_TOKEN
            }
        );

        // Merkt sich die hochgeladene Bild-URL.
        uploadedUrls.push(blob.url);

        // Speichert die Bild-URL in MySQL.
        await pool.execute(
            'INSERT INTO auto_images (auto_id, image_url) VALUES (?, ?)',
            [carId, blob.url]
        );
    }
} catch (error) {
    // Versucht, das unvollständige Auto zu entfernen.
    try {
        await pool.execute('DELETE FROM autos WHERE id = ?', [carId]);
    } catch (cleanupError) {
        console.error('Car cleanup failed:', cleanupError);
    }

    // Versucht, bereits hochgeladene Bilder zu löschen.
    try {
        if (uploadedUrls.length > 0) {
            await del(uploadedUrls, { token: BLOB_READ_WRITE_TOKEN });
        }
    } catch (cleanupError) {
        console.error('Image cleanup failed:', cleanupError);
    }

    // Meldet den fehlgeschlagenen Upload.
    console.error('Car image upload failed:', error);
    return fail(500, {
        error: 'Car images could not be saved. Please try again.'
    });
}

            return { success: true };
        }


};