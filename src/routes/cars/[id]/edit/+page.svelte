<script>
    import { Trash2, MapPin, Upload, CalendarDays } from 'lucide-svelte';
    // Empfängt die Fahrzeugdaten vom Server.
    let { data, form } = $props();
</script>

<svelte:head>
    <title>Edit Car</title>
</svelte:head>

<!-- Erstellt den Hauptbereich der Bearbeitungsseite. -->
<div class="mx-auto max-w-7xl px-6 py-10">
    <h1 class="mb-6 text-3xl font-bold">Edit Car</h1>

    <!-- Erstellt ein responsives Layout mit zwei Spalten. -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">

        <!-- Linke Spalte für die Fahrzeugvorschau. -->
        <aside class="lg:col-span-1">
            <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
               
            <!-- Zeigt das erste Fahrzeugbild als Vorschau an. -->
            {#if data.images.length > 0}
                <img
                    src={data.images[0].image_url}
                    alt="Vehicle preview"
                    class="h-64 w-full rounded-xl object-cover"
                />
            {:else}
                <!-- Zeigt einen Hinweis, wenn kein Bild vorhanden ist. -->
                <div class="flex h-64 items-center justify-center rounded-xl bg-gray-100">
                    <p class="text-sm text-gray-500">No photo available</p>
                </div>
            {/if}
            <!-- Zeigt den Namen des Fahrzeugs an. -->
            <h2 class="mt-5 text-2xl font-bold text-gray-900">
                {data.car.brand_name} {data.car.type}
            </h2>

            <!-- Zeigt Baujahr und Sitzplätze an. -->
            <p class="mt-2 text-sm text-gray-600">
                {data.car.production_year} · {data.car.number_of_seats} Seats
            </p>
            <!-- Zeigt den Standort mit einem Symbol an. -->
            <p class="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={18} strokeWidth={2} class="text-red-600" />
                {data.car.location}
            </p>
            <!-- Zeigt den Mietpreis pro Tag an. -->
            <div class="mt-5 rounded-xl bg-red-50 px-4 py-3 text-center">
                <span class="text-2xl font-bold text-red-700">
                    € {Number(data.car.price_per_day).toFixed(2)}
                </span>
                <span class="text-sm text-gray-600"> / day</span>
            </div>

            </div>
        </aside>

        <!-- Rechte Spalte für Formular und Bilder. -->
        <div class="lg:col-span-2 space-y-8">
        <!-- Erstellt eine Karte für die Fahrzeugdaten. -->
        <section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <!-- Zeigt die Überschrift der Fahrzeugdaten an. -->
            <h2 class="mb-6 border-b border-gray-200 pb-4 text-xl font-bold text-gray-900">
                Vehicle Information
            </h2>

      
    <!-- Ordnet die Eingabefelder in zwei Spalten an. -->
    <form method="POST" action="?/saveCar" class="grid grid-cols-1 gap-5 md:grid-cols-2">
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

       <!-- Zeigt den Mietpreis über beide Spalten an. -->
        <div class="md:col-span-2">
            <label for="price_per_day">Price per Day (€)</label>
            <input id="price_per_day" name="price_per_day"
                type="number" min="0.01" step="0.01"
                value={data.car.price_per_day}
                class="w-full rounded-lg border p-3" />
        </div>

        <!-- Zeigt den Verfügbarkeitszeitraum des Autos an. -->
        <div class="rounded-2xl bg-orange-50 p-5 md:col-span-2">
            <div class="mb-4 flex items-center gap-3">
                <CalendarDays class="h-6 w-6 text-red-700" />
                <div>
                    <h3 class="font-semibold text-gray-900">
                        Availability Period
                    </h3>
                    <p class="text-sm text-gray-600">
                        Select the dates when your car is available for rent.
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                {#each [
                    { id: 'available_from', label: 'Available From' },
                    { id: 'available_until', label: 'Available Until' }
                ] as field}
                    <div>
                        <label for={field.id} class="block font-medium text-gray-700">
                            {field.label}
                        </label>
                        <input
                            id={field.id}
                            name={field.id}
                            type="date"
                            required
                            class="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3"
                        />
                    </div>
                {/each}
            </div>
        </div>

        <!-- Speichert die Änderungen oder bricht die Bearbeitung ab. -->
        <div class="flex gap-4 pt-4 md:col-span-2">
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
  </section>

<!-- Zeigt die Fahrzeugbilder in einer eigenen Karte an. -->
<section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <!-- Zeigt den Titel und die Anzahl der Bilder an. -->
    <div class="mb-4 flex items-center justify-between gap-4">
        <h2 class="text-xl font-bold text-gray-900">Car Photos</h2>
        <span class="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            {data.images.length} / 7 Photos
        </span>
    </div>
        <p class="mb-5 text-sm text-gray-600">
            Manage the photos of your car.
        </p>

        {#if data.images.length > 0}
           <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {#each data.images as image (image.id)}
           <!-- Gestaltet jedes Fahrzeugbild als moderne Karte. -->
           <div class="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
                <!-- Zeigt das Fahrzeugbild an. -->
                <img
                    src={image.image_url}
                    alt="Car photo"
                    class="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
                />

                <!-- Sendet die Bild-ID an die Löschaktion. -->
                <form
                    method="POST"
                    action="?/deletePhoto"
                    class="absolute right-2 top-2 z-10"
                >
                    <input type="hidden" name="imageId" value={image.id} />

                    <button
                        type="submit"
                        aria-label="Delete photo"
                        class="group rounded-full bg-white/90 p-2
                            text-red-600 shadow-md transition-all
                            duration-200 hover:scale-110
                            hover:bg-red-600 hover:text-white"
                    >
                        <Trash2
                            size={18}
                            strokeWidth={2}
                            class="transition-transform duration-200"
                        />
                    </button>
                </form>
            </div>
        {/each}
        </div>
        {:else}
            <p class="text-gray-500">No photos available.</p>
        {/if}
    </section>


<!-- Erstellt eine Karte zum Hochladen neuer Bilder. -->
<section class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
   <!-- Ordnet Titel und Bildanzahl auf kleinen Bildschirmen an. -->
<div class="mb-5 flex flex-wrap items-center gap-3 border-b border-gray-200 pb-4">
        <Upload size={22} class="text-red-700" />
        <h2 class="text-lg font-bold text-gray-900 sm:text-xl">
            Add New Photos
        </h2>
        <!-- Zeigt die Anzahl der freien Bildplätze an. -->
        <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 sm:ml-auto">
        {7 - data.images.length}
        {7 - data.images.length === 1 ? 'photo' : 'photos'} remaining
        </span>
    </div>
    <!-- Sendet die ausgewählten Bilder an den Server. -->
    <form method="POST" action="?/addPhotos" enctype="multipart/form-data">

        <!-- Zeigt Fehlermeldungen beim Hochladen an. -->
        {#if form?.message}
            <p class="mb-3 text-sm text-red-600">
                {form.message}
            </p>
        {/if}

        <!-- Ermöglicht die Auswahl mehrerer Bilder. -->
        <input
            type="file"
            name="images"
            accept="image/jpeg,image/png"
            multiple
            class="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600 transition-colors hover:border-red-300 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-red-50 file:px-4 file:py-2 file:font-semibold file:text-red-700 hover:file:bg-red-100"
        />

        <!-- Zeigt die Regeln für die Bilder an. -->
        <p class="mt-2 text-sm text-gray-500">
            Maximum 7 photos per car. JPG or PNG, up to 2 MB each.
        </p>

        <!-- Erstellt den Button zum Hochladen. -->
        <button
        type="submit"
        class="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-800"
        >
        <!-- Zeigt ein Symbol im Upload-Button an. -->
        <Upload size={18} />
            Upload Photos
        </button>
    </form>
</section>
</div>
</div>
</div>
