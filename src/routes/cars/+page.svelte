<script>
    // Importiert die Sidebar für die Navigation.
    import Sidebar from '$lib/components/sidebar.svelte';

    // Erhält die Daten aus +page.server.js.
    let { data } = $props();
</script>

<svelte:head>
    <title>My Cars</title>
</svelte:head>

<!-- Erstellt das Layout mit Sidebar und Hauptbereich. -->
<div class="flex min-h-screen bg-gray-50">

    <!-- Zeigt die Sidebar an. -->
    <Sidebar />

    <!-- Erstellt den Hauptbereich der Seite. -->
    <main class="flex-1 px-8 py-10">

        <div class="mx-auto max-w-6xl">

            <!-- Zeigt die Überschrift und den Button nebeneinander an. -->
            <div class="flex items-center justify-between">

                <div>
                    <h1 class="text-3xl font-bold text-gray-900">
                        My Cars
                    </h1>

                    <p class="mt-2 text-gray-600">
                        Manage your listed vehicles
                    </p>
                </div>

                <!-- Button für das spätere Hinzufügen eines Autos. -->
                <button
                    type="button"
                    class="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
                >
                    + Add Car
                </button>

            </div>

        </div>
    </main>
</div>
