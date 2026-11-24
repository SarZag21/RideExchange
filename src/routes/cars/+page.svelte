<script>
    // Importiert die Sidebar für die Navigation.
    import Sidebar from '$lib/components/sidebar.svelte';
    import * as m from '$lib/paraglide/messages.js';

    // Erhält die Daten aus +page.server.js.
    let { data } = $props();
</script>

<svelte:head>
    <title>{m.cars_title()}</title>
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
                     	{m.cars_title()}
                    </h1>

                    <p class="mt-2 text-gray-600">
                       {m.cars_subtitle()}
                    </p>
                </div>

                <!--  Öffnet die Seite zum Hinzufügen eines Autos. -->
                <a
                    href="/cars/add"
                    class="flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
                >	
                + {m.cars_add()}
                </a>

            </div>

        <!-- Prüft, ob der Benutzer bereits Autos hat. -->
        {#if data.cars.length === 0}
            <!-- Zeigt eine Nachricht, wenn noch keine Autos vorhanden sind. -->
            <div class="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
                <h2 class="text-xl font-semibold text-gray-900">
                    {m.cars_empty_title()}
                </h2>
                <p class="mt-2 text-gray-500">
              	{m.cars_empty_description()}
                </p>
            </div>
        {:else}
            <!-- Zeigt alle Autos des angemeldeten Benutzers an. -->
            <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <!-- Erstellt eine Karte für jedes Auto. -->
                {#each data.cars as car (car.id)}
                    <div class="overflow-hidden rounded-2xl bg-white shadow-sm">
                       
                <!-- Zeigt das erste gespeicherte Autobild an. -->
                {#if car.first_image}
                    <img
                        src={car.first_image}
                        alt={m.cars_image()}
                        class="h-48 w-full object-cover"
                />
                    {:else}
                        <div class="flex h-48 items-center justify-center bg-gray-100 text-gray-400">
                        {m.cars_no_image()}
                        </div>
                    {/if}    

                    <div class="p-5">
                    <!-- Zeigt die Marke und das Baujahr an. -->
                    <h2 class="text-xl font-semibold text-gray-900">
                        {car.brand_name} {car.production_year}
                    </h2>

                    <!-- Zeigt den Status des Autos an. -->
                    <p class="mt-2 text-sm text-gray-500">
                       {m.cars_status()}: {car.status}
                    </p>

                    <!-- Zeigt den Standort an. -->
                    <p class="mt-2 text-gray-500">
                        {m.cars_location()}: {car.location}
                    </p>

                    <!-- Zeigt die Farbe und die Sitzplätze an. -->
                    <p class="mt-2 text-gray-500">
                     {m.cars_color()}: {car.color}
                    </p>

                     <p class="mt-2 text-gray-500">
                      {m.cars_seats()}: {car.number_of_seats}
                    </p>

                    <!-- Zeigt den Tagespreis an. -->
                    <p class="mt-4 text-lg font-bold text-red-700">
                      €{car.price_per_day} {m.cars_per_day()}
                    </p>

                    <!-- Öffnet die Bearbeitungsseite des eigenen Fahrzeugs. -->
                    <a
                        href={`/cars/${car.id}/edit`}
                        class="mt-4 inline-block rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
                    >
                       	{m.cars_edit()}
                    </a>
                </div>
            </div>
            {/each}
           </div> 
        {/if}
        </div>
   </main>
</div>
