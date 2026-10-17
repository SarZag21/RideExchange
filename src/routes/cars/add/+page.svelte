<script>
    // Importiert die Sidebar für die Navigation.
    import Sidebar from '$lib/components/sidebar.svelte';
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
    <input
        id="price_per_day"
        name="price_per_day"
        type="number"
        min="5.01"
        // Legen die Schrittweite für Dezimalstellen fest – wenn wir z.B Preise wie 10,50, 20,75 usw. zulassen möchten.
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

    <input
        id="car_images"
        name="car_images"
        type="file"
        //Erlaubt alle Bildformate.
        accept="image/*"
        multiple
        class="mt-2 w-full rounded-xl border border-gray-300 p-3"
    />

    <p class="mt-2 text-sm text-gray-500">
        You can select up to 7 pictures of your car.
    </p>
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
