
<script>
    // Empfängt die Fahrzeugdaten und Filter vom Server.
    let { data } = $props();

    // Steuert, ob die Kartenansicht angezeigt wird.
    let showMap = $state(false);

    // Verwendet den gewählten Standort oder ganz Albanien.
    let mapLocation = $derived(
        data.filters.location || 'Albania'
    );

    // Erstellt die Google-Maps-Adresse für den ausgewählten Standort.
    let mapUrl = $derived(
        `https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&output=embed`
    );
</script>

<svelte:head>
    <!-- Setzt den Seitentitel im Browser. -->
    <title>Browse Cars | RideExchange</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
    <div class="mx-auto max-w-7xl">

        <!-- Überschrift der Seite. -->
        <h1 class="text-4xl font-bold text-gray-900">
            Browse Cars
        </h1>

        <p class="mt-3 text-gray-500">
            Find your perfect rental car in Albania.
        </p>

        <!-- Bereich für die Suche und Filter. -->
        <section class="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 class="text-xl font-semibold text-gray-900">
                Search and filter
            </h2>

            <!-- GET überträgt die Filter über die URL an den Server. -->
            <form
                method="GET"
                action="/browse"
                class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4"
            >
                <!-- Suchfeld für Marke, Modell und Standort. -->
                <div>
                    <label
                        for="search"
                        class="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Search
                    </label>

                    <input
                        id="search"
                        name="search"
                        type="search"
                        value={data.filters.search}
                        placeholder="Brand, model or location"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>

                <!-- Auswahl eines Standorts aus der Datenbank. -->
                <div>
                    <label
                        for="location"
                        class="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Location
                    </label>

                    <select
                        id="location"
                        name="location"
                        value={data.filters.location}
                        class="w-full rounded-lg border border-gray-300 px-3 py-2"
                    >
                        <option value="">All locations</option>

                        {#each data.locations as place}
                            <option value={place}>{place}</option>
                        {/each}
                    </select>
                </div>

                <!-- Filter für den maximalen Tagespreis. -->
                <div>
                    <label
                        for="maxPrice"
                        class="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Maximum price per day (€)
                    </label>

                    <input
                        id="maxPrice"
                        name="maxPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={data.filters.maxPrice}
                        placeholder="e.g. 50"
                        class="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                </div>

                <!-- Startet die Suche oder setzt alle Filter zurück. -->
                <div class="flex items-end gap-2">
                    <button
                        type="submit"
                        class="flex-1 rounded-lg bg-red-700 px-4 py-2 font-medium text-white hover:bg-red-800"
                    >
                        Search
                    </button>

                    <a
                        href="/browse"
                        class="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Reset
                    </a>
                </div>
            </form>
        </section>

        <!-- Überschrift und Anzahl der Suchergebnisse. -->
        <section class="mt-8">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 class="text-2xl font-semibold text-gray-900">
                        Available Cars
                    </h2>

                    <p class="mt-1 text-sm text-gray-500">
                        {data.cars.length} cars found
                    </p>
                </div>

                <!-- Öffnet oder schließt die Kartenansicht. -->
                <button
                    type="button"
                    onclick={() => (showMap = !showMap)}
                    class="rounded-lg bg-gray-900 px-5 py-2 font-medium text-white hover:bg-gray-700"
                >
                    {showMap ? 'Hide Map' : 'Show Map'}
                </button>
            </div>

            <!-- Zeigt die Karte für den gewählten Standort. -->
            {#if showMap}
                <div class="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-900">
                            Map of {mapLocation}
                        </h3>

                        <p class="mt-1 text-sm text-gray-500">
                            Explore the selected area on the map.
                        </p>
                    </div>

                    <iframe
                        title="Map of selected car location"
                        src={mapUrl}
                        class="h-96 w-full border-0"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            {/if}

            <!-- Erstellt ein Raster mit den gefundenen Fahrzeugen. -->
            <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {#if data.cars.length === 0}
                    <!-- Meldung, wenn keine Fahrzeuge gefunden wurden. -->
                    <div class="col-span-full rounded-xl border border-gray-200 bg-white p-8 text-center">
                        <h3 class="text-lg font-semibold text-gray-900">
                            No cars found
                        </h3>

                        <p class="mt-2 text-gray-500">
                            Try changing your search or filters.
                        </p>

                        <a
                            href="/browse"
                            class="mt-4 inline-block font-medium text-red-700 hover:underline"
                        >
                            Clear all filters
                        </a>
                    </div>
                {:else}
                    <!-- Erstellt für jedes gefundene Auto eine Karte. -->
                    {#each data.cars as car (car.id)}
                        <article class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">

                            <!-- Zeigt das Fahrzeugbild oder einen Platzhalter. -->
                            {#if car.url_image}
                                <img
                                    src={car.url_image}
                                    alt={`${car.brand_name} ${car.type}`}
                                    class="h-48 w-full object-cover"
                                />
                            {:else}
                                <div class="flex h-48 items-center justify-center bg-gray-100 text-gray-400">
                                    No image available
                                </div>
                            {/if}

                            <div class="p-5">
                                <!-- Zeigt Marke und Modell. -->
                                <h3 class="text-xl font-semibold text-gray-900">
                                    {car.brand_name} {car.type}
                                </h3>

                                <!-- Zeigt den Standort. -->
                                <p class="mt-2 text-sm text-gray-500">
                                    Location: {car.location || 'Not specified'}
                                </p>

                                <!-- Zeigt den Preis pro Tag. -->
                                <p class="mt-4 text-lg font-bold text-red-700">
                                    €{car.price_per_day} / day
                                </p>

                                <!-- Öffnet den Standort des Autos in Google Maps. -->
                                {#if car.location}
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mt-4 inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                    >
                                        View location on map
                                    </a>
                                {/if}
                            </div>
                        </article>
                    {/each}
                {/if}
            </div>
        </section>
    </div>
</div>
