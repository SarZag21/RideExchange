<script>
    // Speichert die verfügbaren Fahrzeuge.
    let cars = $state([]);
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
            {#if cars.length === 0}
                <!-- Zeigt eine Meldung, wenn keine Fahrzeuge vorhanden sind. -->
                <p class="text-gray-500">
                    No available cars found.
                </p>
            {:else}
                <!-- Hier werden später die Fahrzeugkarten angezeigt. -->
            {/if}
        </div>
    </div>
    </div>
</div>
