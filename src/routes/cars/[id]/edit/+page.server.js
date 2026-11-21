import { error, fail, redirect } from '@sveltejs/kit';
import pool from '$lib/server/database.js';
import { put,del } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';


// Lädt das Auto, das der Benutzer bearbeiten möchte.
export async function load({ params, locals }) {
    // Prüft, ob der Benutzer angemeldet ist.
    if (!locals.user) {
        redirect(303, '/login');
    }

    // Sucht das Auto anhand der ID und des Besitzers.
    const [cars] = await pool.execute(
        `SELECT autos.*, brands.name AS brand_name
         FROM autos
         JOIN brands ON autos.brand_id = brands.id
         WHERE autos.id = ? AND autos.user_id = ?`,
        [params.id, locals.user.id]
    );

    // Verhindert den Zugriff auf fremde oder unbekannte Autos.
    if (cars.length === 0) {
        error(404, 'Car not found');
    }

    // Lädt alle Bilder des Fahrzeugs aus der Datenbank.
    const [images] = await pool.execute(
    `SELECT id, image_url
    FROM auto_images
    WHERE auto_id = ?
    ORDER BY id ASC`,
    [params.id]    
    );

    // Übergibt die Fahrzeugdaten an die Bearbeitungsseite.
    return { 
        car: cars[0],
        images

    };
}

export const actions = {
    addPhotos: async ({ request, locals, params }) => {
        // Prüft, ob der Benutzer angemeldet ist.
        if (!locals.user) redirect(303, '/login');

        // Liest die ausgewählten Bilder.
        const formData = await request.formData();
        const images = formData.getAll('images').filter(
            (file) => file instanceof File && file.size > 0
        );

        // Prüft, ob neue Bilder ausgewählt wurden.
        if (images.length === 0) {
            return fail(400, { message: 'Please select photos.' });
        }

        // Prüft, ob das Auto dem Benutzer gehört.
        const [cars] = await pool.execute(
            'SELECT id FROM autos WHERE id = ? AND user_id = ?',
            [params.id, locals.user.id]
        );

        if (cars.length === 0) error(404, 'Car not found');

        // Zählt die bereits gespeicherten Bilder.
        const [rows] = await pool.execute(
            'SELECT COUNT(*) AS total FROM auto_images WHERE auto_id = ?',
            [params.id]
        );

        // Erlaubt insgesamt maximal sieben Bilder.
        if (rows[0].total + images.length > 7) {
            return fail(400, { message: 'Maximum 7 photos allowed.' });
        }

        // Prüft jedes ausgewählte Bild.
        for (const image of images) {

            // Erlaubt nur JPG- und PNG-Bilder.
            if (!['image/jpeg', 'image/png'].includes(image.type)) {
                return fail(400, {
                    message: 'Only JPG and PNG are allowed.'
                });
            }

            // Erlaubt maximal 2 MB pro Bild.
            if (image.size > 2 * 1024 * 1024) {
                return fail(400, {
                    message: 'Maximum image size is 2 MB.'
                });
            }
        }
        // Speichert die URLs der hochgeladenen Bilder.
        const uploadedUrls = [];

        // Bereitet das Hochladen der Bilder vor.
        try {
            // Geht alle ausgewählten Bilder durch.
            for (const image of images) {
                // Bestimmt die Dateiendung.
                const extension = image.type === 'image/png' ? 'png' : 'jpg';
                // Lädt das Bild in Vercel Blob hoch.
                const blob = await put(
                    `cars/${params.id}/${crypto.randomUUID()}.${extension}`,
                    image,
                    {
                        access: 'public',
                        token: BLOB_READ_WRITE_TOKEN
                    }
                );

                // Merkt sich die URL für die spätere Speicherung.
                uploadedUrls.push(blob.url);

                // Speichert die Bild-URL in der Datenbank.
                await pool.execute(
                    `INSERT INTO auto_images (auto_id, image_url)
                     VALUES (?, ?)`,
                    [params.id, blob.url]
                );


            }
        } catch (err) {
            // Zeigt einen Fehler beim Hochladen an.
            console.error('Photo upload failed:', err);
            return fail(500, { message: 'Photo upload failed.' });
        }
    },

    saveCar: async ({ request, locals, params }) => {
        // Prüft, ob der Benutzer angemeldet ist.
        if (!locals.user) {
            redirect(303, '/login');
        }

        // Liest die bearbeiteten Fahrzeugdaten aus dem Formular.
        const formData = await request.formData();
        const brand = String(formData.get('brand') ?? '').trim();
        const type = String(formData.get('type') ?? '').trim();
        const productionYear = Number(formData.get('production_year'));
        const color = String(formData.get('color') ?? '').trim();
        const seats = Number(formData.get('number_of_seats'));
        const location = String(formData.get('location') ?? '').trim();
        const price = Number(formData.get('price_per_day'));

        // Prüft, ob alle Eingaben gültig sind.
        if (!brand || !type || !color || !location ||
            !Number.isInteger(productionYear) ||
            productionYear < 1900 ||
            !Number.isInteger(seats) || seats < 1 ||
            !Number.isFinite(price) || price <= 0) {
            return fail(400, { message: 'Invalid car details' });
        }
        // Prüft, ob das Fahrzeug dem angemeldeten Benutzer gehört.
        const [cars] = await pool.execute(
            `SELECT id FROM autos
            WHERE id = ? AND user_id = ?`,
            [params.id, locals.user.id]
        );

        // Verhindert Änderungen an fremden Fahrzeugen.
        if (cars.length === 0) {
            error(404, 'Car not found');
        }

        // Sucht die Fahrzeugmarke oder erstellt sie bei Bedarf.
        const [brandResult] = await pool.execute(
            `INSERT INTO brands (name) VALUES (?)
            ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
            [brand]
        );

        // Speichert die ID der ausgewählten Marke.
        const brandId = brandResult.insertId;

        // Aktualisiert die Fahrzeugdaten in der Datenbank.
        await pool.execute(
            `UPDATE autos
             SET brand_id = ?, type = ?, production_year = ?,
                 color = ?, number_of_seats = ?, location = ?,
                 price_per_day = ?
             WHERE id = ? AND user_id = ?`,
            [
                brandId, type, productionYear, color,
                seats, location, price, params.id, locals.user.id
            ]
        );
        
        // Leitet nach dem Speichern zur Fahrzeugübersicht weiter.
        redirect(303, '/cars');


    },
    deletePhoto: async ({ request, locals, params }) => {
        // Prüft, ob der Benutzer angemeldet ist.
        if (!locals.user) {
            redirect(303, '/login');
        }

        // Liest die ID des zu löschenden Bildes.
        const formData = await request.formData();
        const imageId = Number(formData.get('imageId'));

        // Prüft, ob die Bild-ID gültig ist.
        if (!Number.isSafeInteger(imageId) || imageId <= 0) {
            return fail(400, { message: 'Invalid photo ID' });
        }

        // Prüft, ob das Bild zum Fahrzeug des Benutzers gehört.
        const [images] = await pool.execute(
            `SELECT auto_images.id, auto_images.image_url
             FROM auto_images
             JOIN autos ON auto_images.auto_id = autos.id
             WHERE auto_images.id = ?
               AND autos.id = ?
               AND autos.user_id = ?`,
            [imageId, params.id, locals.user.id]
        );

        // Verhindert das Löschen fremder Bilder.
        if (images.length === 0) {
            error(404, 'Photo not found');
        }

        // Löscht die Bilddatei zuerst aus Vercel Blob.
        try {
            await del(images[0].image_url, {
            token: BLOB_READ_WRITE_TOKEN
            });
        } catch (err) {
            // Behält den Datenbankeintrag bei einem Blob-Fehler.
            console.error('Failed to delete car photo:', err);
            return fail(500, {
                message: 'Photo could not be deleted'
            });
        }

        // Löscht den Bildeintrag nur für das eigene Fahrzeug.
        await pool.execute(
            `DELETE auto_images FROM auto_images
             JOIN autos ON auto_images.auto_id = autos.id
             WHERE auto_images.id = ?
               AND autos.id = ?
               AND autos.user_id = ?`,
            [imageId, params.id, locals.user.id]
        );

        // Die Datei in Vercel Blob wird später entfernt.
        redirect(303, `/cars/${params.id}/edit`);

    }

};
