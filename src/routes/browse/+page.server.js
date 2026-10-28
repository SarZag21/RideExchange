
import pool from '$lib/server/database.js';

// Lädt die Fahrzeuge und verarbeitet die Suchfilter.
export async function load({ url }) {
    // Liest die Suchbegriffe aus der URL.
    const search = url.searchParams.get('search')?.trim() || '';
    const location = url.searchParams.get('location')?.trim() || '';
    const maxPriceInput = url.searchParams.get('maxPrice') || '';

    // Prüft, ob ein gültiger maximaler Tagespreis angegeben wurde.
    const maxPrice =
        maxPriceInput !== '' &&
        Number.isFinite(Number(maxPriceInput)) &&
        Number(maxPriceInput) >= 0
            ? Number(maxPriceInput)
            : null;

    // Die SQL-Abfrage lädt nur verfügbare Fahrzeuge.
    let sql = `
        SELECT autos.*, brands.name AS brand_name
        FROM autos
        JOIN brands ON autos.brand_id = brands.id
        WHERE autos.status = 'available'
    `;

    // Speichert die Werte für die SQL-Platzhalter.
    const params = [];

    // Sucht nach Marke, Modell oder Standort.
    if (search) {
        sql += `
            AND (
                brands.name LIKE ?
                OR autos.type LIKE ?
                OR autos.location LIKE ?
            )
        `;

        // Sucht auch nach einem Teil des eingegebenen Begriffs.
        const searchValue = `%${search}%`;
        params.push(searchValue, searchValue, searchValue);
    }

    // Filtert die Fahrzeuge nach dem ausgewählten Standort.
    if (location) {
        sql += ' AND autos.location LIKE ?';
        params.push(`%${location}%`);
    }

    // Zeigt nur Fahrzeuge bis zum angegebenen Tagespreis.
    if (maxPrice !== null) {
        sql += ' AND autos.price_per_day <= ?';
        params.push(maxPrice);
    }

    // Sortiert die Ergebnisse vom günstigsten zum teuersten Auto.
    sql += ' ORDER BY autos.price_per_day ASC';

    // Führt die Suchabfrage mit sicheren SQL-Parametern aus.
    const [cars] = await pool.execute(sql, params);

    // Lädt die vorhandenen Standorte für das Auswahlmenü.
    const [locationRows] = await pool.execute(`
        SELECT DISTINCT location
        FROM autos
        WHERE status = 'available'
          AND location IS NOT NULL
          AND location != ''
        ORDER BY location ASC
    `);

    // Übergibt die Fahrzeuge, Standorte und Filter an die Seite.
    return {
        cars,
        locations: locationRows.map((row) => row.location),
        filters: {
            search,
            location,
            maxPrice: maxPriceInput
        }
    };
}


