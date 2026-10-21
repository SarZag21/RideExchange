<script>
    // Empfängt die Fahrzeugdaten vom Server.
    let { data } = $props();
</script>

<div class="min-h-screen bg-gray-50 px-8 py-10">

    <!-- Begrenzt die Breite und zentriert den Seiteninhalt. -->
    <div class="mx-auto max-w-7xl">
    <h1 class="text-4xl font-bold text-gray-900">
        Browse Cars
    </h1>

    <p class="mt-3 text-gray-500">
        Find your perfect rental car in Albania.
    </p>

    <div class="mt-10">
        <h2 class="text-2xl font-semibold text-gray-900">
            Available Cars
        </h2>

        <!-- Erstellt ein Raster für die Fahrzeugkarten. -->
        <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {#if data.cars.length === 0}
                <!-- Zeigt eine Meldung, wenn keine Fahrzeuge vorhanden sind. -->
                <p class="text-gray-500">
                    No available cars found.
                </p>
            {:else}
            <!-- Durchläuft alle verfügbaren Fahrzeuge. -->
            {#each data.cars as car (car.id)}

                <!-- Erstellt eine Karte für jedes Fahrzeug. -->
                <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

                <!-- Zeigt das Fahrzeugbild, wenn eines vorhanden ist. -->
                {#if car.url_image}
                    <img
                        src={car.url_image}
                        alt={`${car.brand_name} ${car.type}`}
                        class="mb-4 h-48 w-full rounded-lg object-cover"
                    />
                {:else}
                    <!-- Zeigt einen Platzhalter, wenn kein Bild vorhanden ist. -->
                    <div class="mb-4 flex h-48 items-center justify-center rounded-lg bg-gray-100">
                        <p class="text-gray-400">
                            No image available
                        </p>
                    </div>
                {/if}

                    <!-- Zeigt die Marke und das Modell an. -->
                    <h3 class="text-xl font-semibold text-gray-900">
                        {car.brand_name} {car.type}
                    </h3>

                    <!-- Zeigt den Standort des Fahrzeugs an. -->
                    <p class="mt-2 text-sm text-gray-500">
                        {car.location}
                    </p>

                    <!-- Zeigt den Mietpreis pro Tag an. -->
                    <p class="mt-4 text-lg font-bold text-red-700">
                        €{car.price_per_day} / day
                    </p>

                </div>
            {/each}
            {/if}
        </div>
    </div>
    </div>
</div>
