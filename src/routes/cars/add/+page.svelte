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

</form>
</div>
</main>
</div>
