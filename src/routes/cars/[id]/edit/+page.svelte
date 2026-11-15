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
    </form>
</div>
