<script>
    // Empfängt die Fahrzeugdaten vom Server.
    let { data } = $props();
</script>

<svelte:head>
    <title>Edit Car | RideExchange</title>
</svelte:head>

<!-- Zeigt das Formular zur Fahrzeugbearbeitung an. -->
<div class="mx-auto max-w-2xl px-6 py-10">
    <h1 class="mb-6 text-3xl font-bold">Edit Car</h1>

    <form method="POST" class="space-y-5">
        <!-- Zeigt die aktuelle Fahrzeugmarke an. -->
        <div>
            <label for="brand">Brand</label>
            <input id="brand" name="brand"
                value={data.car.brand_name}
                class="w-full rounded-lg border p-3" />
        </div>
        <!-- Zeigt das aktuelle Fahrzeugmodell an. -->
        <div>
            <label for="type">Model</label>
            <input id="type" name="type"
                value={data.car.type}
                class="w-full rounded-lg border p-3" />
        </div>

        <!-- Zeigt das aktuelle Baujahr an. -->
        <div>
            <label for="production_year">Production Year</label>
            <input id="production_year" name="production_year"
                type="number" value={data.car.production_year}
                class="w-full rounded-lg border p-3" />
        </div>
        <!-- Zeigt die aktuelle Fahrzeugfarbe an. -->
        <div>
            <label for="color">Color</label>
            <input id="color" name="color"
                value={data.car.color}
                class="w-full rounded-lg border p-3" />
        </div>

        <!-- Zeigt die aktuelle Anzahl der Sitzplätze an. -->
        <div>
            <label for="number_of_seats">Number of Seats</label>
            <input id="number_of_seats" name="number_of_seats"
                type="number" min="1"
                value={data.car.number_of_seats}
                class="w-full rounded-lg border p-3" />
        </div>
        <!-- Zeigt den aktuellen Standort des Fahrzeugs an. -->
        <div>
            <label for="location">Location</label>
            <input id="location" name="location"
                value={data.car.location}
                class="w-full rounded-lg border p-3" />
        </div>

        <!-- Zeigt den aktuellen Mietpreis pro Tag an. -->
        <div>
            <label for="price_per_day">Price per Day (€)</label>
            <input id="price_per_day" name="price_per_day"
                type="number" min="0.01" step="0.01"
                value={data.car.price_per_day}
                class="w-full rounded-lg border p-3" />
        </div>
        <!-- Speichert die Änderungen oder bricht die Bearbeitung ab. -->
        <div class="flex gap-4 pt-6">
            <button
                type="submit"
                class="rounded-lg bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"
            >
                Save Changes
            </button>
            <a
                href="/cars"
                class="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
            >
                Cancel
            </a>
        </div>
    </form>

    <!-- Zeigt die vorhandenen Fahrzeugbilder an. -->
    <section class="mt-10">
        <h2 class="mb-2 text-2xl font-bold">Car Photos</h2>
        <p class="mb-5 text-sm text-gray-600">
            Manage the photos of your car.
        </p>

        {#if data.images.length > 0}
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {#each data.images as image (image.id)}
                    <div class="overflow-hidden rounded-lg border">
                        <img
                            src={image.image_url}
                            alt="Car photo"
                            class="h-36 w-full object-cover"
                        />
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-gray-500">No photos available.</p>
        {/if}
    </section>

</div>
