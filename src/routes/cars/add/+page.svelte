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

        </div>
    </main>
</div>
