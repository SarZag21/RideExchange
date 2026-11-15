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

    </form>
</div>
