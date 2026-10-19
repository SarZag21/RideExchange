<script>
    // Importiert die Sidebar für die Navigation.
    import Sidebar from '$lib/components/sidebar.svelte';

    
    // Speichert die Fehlermeldung bei zu vielen Bildern.
    let imageError = $state('');

    // Speichert die Vorschau-URLs der ausgewählten Bilder.
    let imagePreviews = $state([]);

    // Prüft, ob höchstens sieben Bilder ausgewählt wurden.
    function checkImages(event) {
        const files = event.currentTarget.files;

        // Entfernt die bisherigen Vorschau-URLs.
        imagePreviews.forEach((url) => URL.revokeObjectURL(url));
        imagePreviews = [];

        if (files.length > 7) {
            imageError = 'You can upload a maximum of 7 pictures.';
            event.currentTarget.value = '';
        } else {
    imageError = '';

    // Erstellt eine Vorschau für jedes ausgewählte Bild.
    imagePreviews = Array.from(files, (file) => URL.createObjectURL(file));
    }
}


</script>

<svelte:head>
    <title>Add Car</title>
</svelte:head>

<!-- Erstellt das Layout mit Sidebar und Hauptbereich. -->
<div class="flex min-h-screen bg-gray-50">
    <Sidebar />

    <main class="flex-1 px-8 py-10">
        <div class="mx-auto max-w-4xl">

            <!-- Zeigt die Überschrift der Seite an. -->
            <h1 class="text-3xl font-bold text-gray-900">
                Add Car
            </h1>

            <p class="mt-2 text-gray-600">
                List a new vehicle on RideExchange
            </p>


<!-- Formular zum Hinzufügen eines Autos. -->
    <form class="mt-10 space-y-6 rounded-2xl bg-white p-8 shadow-sm">

    <!-- Eingabefeld für die Automarke. -->
    <div>
        <label for="brand" class="block font-medium text-gray-700">
            Brand
        </label>
        <input
            id="brand"
            name="brand"
            type="text"
            placeholder="e.g. BMW"
            required
            class="mt-2 w-full rounded-xl border border-gray-300 p-3"
        />
    </div>

    <!-- Eingabefeld für das Automodell. -->
    <div>
        <label for="type" class="block font-medium text-gray-700">
            Model
        </label>
        <input
            id="type"
            name="type"
            type="text"
            placeholder="e.g. 320d"
            required
            class="mt-2 w-full rounded-xl border border-gray-300 p-3"
        />
    </div>

    <!-- Eingabefeld für das Baujahr. -->
    <div>
        <label for="production_year" class="block font-medium text-gray-700">
            Production Year
        </label>
        <input
            id="production_year"
            name="production_year"
            type="number"
            min="1900"
            max="2155"
            required
            class="mt-2 w-full rounded-xl border border-gray-300 p-3"
        />
    </div>

    <!-- Eingabefeld für die Autofarbe. -->
    <div>
        <label for="color" class="block font-medium text-gray-700">
            Color
        </label>
        <input
            id="color"
            name="color"
            type="text"
            placeholder="e.g. Black"
            required
            class="mt-2 w-full rounded-xl border border-gray-300 p-3"
        />
    </div>


<!-- Eingabefeld für die Anzahl der Sitzplätze. -->
<div>
    <label for="number_of_seats" class="block font-medium text-gray-700">
        Number of Seats
    </label>
    <input
        id="number_of_seats"
        name="number_of_seats"
        type="number"
        min="1"
        max="100"
        required
        class="mt-2 w-full rounded-xl border border-gray-300 p-3"
    />
</div>

<!-- Eingabefeld für den Standort. -->
<div>
    <label for="location" class="block font-medium text-gray-700">
        Location
    </label>
    <input
        id="location"
        name="location"
        type="text"
        placeholder="e.g. Shkoder"
        required
        class="mt-2 w-full rounded-xl border border-gray-300 p-3"
    />
</div>

<!-- Eingabefeld für den Tagespreis. -->
<div>
    <label for="price_per_day" class="block font-medium text-gray-700">
        Price per Day (€)
    </label>
    <!-- Erlaubt Tagespreise ab 5,01 € mit zwei Dezimalstellen. -->
    <input
        id="price_per_day"
        name="price_per_day"
        type="number"
        min="5.01"
        step="0.01"
        required
        class="mt-2 w-full rounded-xl border border-gray-300 p-3"
    />
</div>


<!-- Ermöglicht das Hochladen von bis zu sieben Autobildern. -->
<div>
    <label for="car_images" class="block font-medium text-gray-700">
        Car Pictures (max. 7)
    </label>

   <!-- Erlaubt mehrere Bilder und prüft ihre Anzahl bei der Auswahl. -->
    <input
        id="car_images"
        name="car_images"
        type="file"
        accept="image/*"
        multiple
        onchange={checkImages}
        class="mt-2 w-full rounded-xl border border-gray-300 p-3"
    />

    <p class="mt-2 text-sm text-gray-500">
        You can select up to 7 pictures of your car.
    </p>
    
<!-- Zeigt eine Fehlermeldung bei mehr als sieben Bildern an. -->
{#if imageError}
    <p class="mt-2 text-sm text-red-600">
        {imageError}
    </p>
{/if}

<!-- Zeigt die ausgewählten Autobilder als Vorschau an. -->
{#if imagePreviews.length > 0}
    <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {#each imagePreviews as image}
            <img
                src={image}
                alt="Car preview"
                class="h-32 w-full rounded-xl object-cover"
            />
        {/each}
    </div>
{/if}



</div>


<!-- Button zum späteren Speichern des Autos. -->
<button
    type="button"
    class="w-full rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
>
    Save Car
</button>



</form>
</div>
</main>
</div>