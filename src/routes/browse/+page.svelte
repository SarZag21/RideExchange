<script>
    // Get cars, brands, and filters from the server.
    let { data } = $props();

    // Controls whether the filter section is visible.
    let filtersOpen = $state(true);

    // Build a URL for switching views while keeping the current filters.
    function buildViewUrl(view) {
        const params = new URLSearchParams();

        // Add all non-empty filters to the URL.
        for (const [key, value] of Object.entries(data.filters)) {
            if (value !== '' && value !== null && value !== undefined) {
                params.set(key, value);
            }
        }

        // Set the selected view and return the complete URL.
        params.set('view', view);
        return `/browse?${params.toString()}`;
    }

    // Choose the map location based on the search or the first car.
    const mapLocation = $derived(
        data.filters.location || data.cars[0]?.location || 'Albania'
    );

    // Generate the Google Maps embed URL for the selected location.
    const mapUrl = $derived(
        `https://maps.google.com/maps?q=${encodeURIComponent(
            mapLocation + ', Albania'
        )}&output=embed`
    );
</script>

<!-- Set the browser tab title and page description. -->
<svelte:head>
    <title>Find a car | RideExchange</title>
    <meta
        name="description"
        content="Search available rental cars across Albania."
    />
</svelte:head>

<!-- Main page container. -->
<div class="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
    <div class="mx-auto max-w-7xl">

        <!-- Page heading and view selection. -->
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p class="text-sm font-semibold uppercase tracking-wider text-red-700">
                    RideExchange
                </p>

                <h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Find your car
                </h1>

                <p class="mt-2 text-gray-600">
                    Search available cars across Albania.
                </p>
            </div>

            <!-- Switch between grid and map views while preserving filters. -->
            <div class="flex items-center gap-2 rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200">
                <a
                    href={buildViewUrl('grid')}
                    class={`rounded-lg px-4 py-2 text-sm font-semibold ${
                        data.filters.view === 'grid'
                            ? 'bg-red-700 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    Grid view
                </a>

                <a
                    href={buildViewUrl('map')}
                    class={`rounded-lg px-4 py-2 text-sm font-semibold ${
                        data.filters.view === 'map'
                            ? 'bg-red-700 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    Map view
                </a>
            </div>
        </div>

        <!-- Search form for filtering cars. -->
        <form
            method="GET"
            class="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
            <div class="flex items-center justify-between gap-3">
                <div>
                    <h2 class="text-lg font-semibold text-gray-900">
                        Filters
                    </h2>
                    <p class="mt-1 text-sm text-gray-500">
                        Narrow down the available cars.
                    </p>
                </div>

                <!-- Show or hide the filter inputs. -->
                <button
                    type="button"
                    onclick={() => filtersOpen = !filtersOpen}
                    class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    {filtersOpen ? 'Hide filters' : 'Show filters'}
                </button>
            </div>

            {#if filtersOpen}
                <!-- Filter fields arranged in a responsive grid. -->
                <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <!-- Filter by location. -->
                    <div>
                        <label for="location" class="mb-1 block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            id="location"
                            name="location"
                            value={data.filters.location}
                            placeholder="e.g. Shkoder"
                            class="w-full rounded-lg border-gray-300"
                        />
                    </div>

                    <!-- Filter by car brand. -->
                    <div>
                        <label for="brand" class="mb-1 block text-sm font-medium text-gray-700">
                            Brand
                        </label>
                        <!-- List the available car brands. -->
                        <select
                            id="brand"
                            name="brand"
                            class="w-full rounded-lg border-gray-300"
                        >
                            <option value="">All brands</option>
                            {#each data.brands as brand}
                                <option
            value={brand}
                                    selected={data.filters.brand === brand}
                                >
                                    {brand}
                                </option>
                            {/each}
                        </select>
                    </div>

                    <!-- Set the minimum daily rental price. -->
                    <div>
                        <label for="minPrice" class="mb-1 block text-sm font-medium text-gray-700">
                            Minimum price (€ / day)
                        </label>
                        <input
                            id="minPrice"
                            name="minPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.filters.minPrice}
                            placeholder="No minimum"
                            class="w-full rounded-lg border-gray-300"
                        />
                    </div>

                    <!-- Set the maximum daily rental price. -->
                    <div>
                        <label for="maxPrice" class="mb-1 block text-sm font-medium text-gray-700">
                            Maximum price (€ / day)
                        </label>
                        <input
                            id="maxPrice"
                            name="maxPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.filters.maxPrice}
                            placeholder="No maximum"
                            class="w-full rounded-lg border-gray-300"
                        />
                    </div>

                    <!-- Filter by minimum number of seats. -->
                    <div>
                        <label for="seats" class="mb-1 block text-sm font-medium text-gray-700">
                            Minimum seats
                        </label>
                        <!-- Offer common minimum seat-count filters. -->
                        <select
                            id="seats"
                            name="seats"
                            class="w-full rounded-lg border-gray-300"
                        >
                            <option value="">Any number</option>

                            {#each [2, 4, 5, 7, 8] as seatCount}
                                <option
                                    value={seatCount}
                                    selected={data.filters.seats === String(seatCount)}
                                >
                                    {seatCount}+ seats
                                </option>
                            {/each}
                        </select>
                    </div>

                    <!-- Filter by production year. -->
                    <div>
                        <label for="year" class="mb-1 block text-sm font-medium text-gray-700">
                            From year
                        </label>
                        <input
                            id="year"
                            name="year"
                            type="number"
                            min="1900"
                            max="2155"
                            value={data.filters.year}
                            placeholder="e.g. 2018"
                            class="w-full rounded-lg border-gray-300"
                        />
                    </div>

                    <!-- Choose how the results are sorted. -->
                    <div>
                        <label for="sort" class="mb-1 block text-sm font-medium text-gray-700">
                            Sort by
                        </label>
                        <select
                            id="sort"
                            name="sort"
                            class="w-full rounded-lg border-gray-300"
                        >
                            <option value="recommended" selected={data.filters.sort === 'recommended'}>
                                Recommended
                            </option>
                            <option value="price_asc" selected={data.filters.sort === 'price_asc'}>
                                Price: low to high
                            </option>
                            <option value="price_desc" selected={data.filters.sort === 'price_desc'}>
                                Price: high to low
                            </option>
                            <option value="year_desc" selected={data.filters.sort === 'year_desc'}>
                                Newest year
                            </option>
                        </select>
                    </div>

                    <!-- Keep the selected view when submitting the filters. -->
                    <input
                        type="hidden"
                        name="view"
                        value={data.filters.view}
                    />
                </div>

                <!-- Apply the selected filters or reset the search. -->
                <div class="mt-5 flex flex-wrap gap-3">
                    <button
                        type="submit"
                        class="rounded-lg bg-red-700 px-5 py-2.5 font-semibold text-white hover:bg-red-800"
                    >
                        Apply filters
                    </button>

                    <a href="browse" 
                    class="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Reset
                    </a>
                </div>
            {/if}
        </form>

        <!-- Display the number of matching cars. -->
        <div class="mt-7 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">
                Available cars
            </h2>

            <p class="text-sm text-gray-500">
                {data.cars.length}
                {data.cars.length === 1 ? 'car' : 'cars'} found
            </p>
        </div>

        <!-- Show a message when no cars match the filters. -->
        {#if data.cars.length === 0}
            <div class="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <h3 class="text-lg font-semibold text-gray-900">
                    No cars found
                </h3>

                <p class="mt-2 text-gray-500">
                    Try changing or clearing your filters.
                </p>

                <a
                    href="/browse"
                    class="mt-5 inline-block rounded-lg bg-red-700 px-5 py-2.5 font-semibold text-white hover:bg-red-800"
                >
                    Clear filters
                </a>
            </div>

        <!-- Map view: display Google Maps beside the matching cars. -->
        {:else if data.filters.view === 'map'}
            <div class="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">

                <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <!-- Embed the map centered on the selected location. -->
                    <iframe
                        title="Map showing the searched car location"
                        src={mapUrl}
                        class="h-[480px] w-full border-0"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <div class="border-t border-gray-200 p-4 text-sm text-gray-500">
                        Map centered on {mapLocation}.
                    </div>
                </div>

                <!-- Display matching cars next to the map. -->
                <div class="space-y-3">
                    {#each data.cars as car (car.id)}
                        <article class="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

                            <!-- Show the car image or a placeholder. -->
                            {#if car.url_image}
                                <img
                                    src={car.url_image}
                                    alt={`${car.brand_name} ${car.type}`}
                                    class="h-24 w-28 rounded-lg object-cover"
                                />
                            {:else}
                                <div class="flex h-24 w-28 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                    No image
                                </div>
                            {/if}

                            <!-- Display basic car details and a link to its location. -->
                            <div class="min-w-0 flex-1">
                                <h3 class="font-semibold text-gray-900">
                                    {car.brand_name} {car.type}
                                </h3>

                                <p class="mt-1 text-sm text-gray-500">
                                    {car.location} · {car.production_year}
                                </p>

                                <p class="mt-2 font-bold text-red-700">
                                    €{car.price_per_day} / day
                                </p>

                                <!-- Open the car's location in Google Maps. -->
                                <a
                                    class="mt-2 inline-block text-sm font-semibold text-red-700 hover:underline"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.location + ', Albania')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Open location ↗
                                </a>
                            </div>
                        </article>
                    {/each}
                </div>
            </div>

        <!-- Grid view: display matching cars as individual cards. -->
        {:else} 
            <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {#each data.cars as car (car.id)}
                    <article class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

                        <!-- Show the car image or a placeholder if no image exists. -->
                        {#if car.url_image}
                            <img
                                src={car.url_image}
                                alt={`${car.brand_name} ${car.type}`}
                                class="h-52 w-full object-cover"
                            />
                        {:else}
                            <div class="flex h-52 items-center justify-center bg-gray-100 text-sm text-gray-400">
                                No image available
                            </div>
                        {/if}

                        <!-- Car information displayed inside the card. -->
                        <div class="p-5">
                            <div class="flex items-start justify-between gap-3">
                                <h3 class="text-xl font-semibold text-gray-900">
                                    {car.brand_name} {car.type}
                                </h3>

                                <!-- Display the availability status. -->
                                <span class="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                    Available
                                </span>
                            </div>

                            <p class="mt-2 text-sm text-gray-500">
                                {car.location}
                            </p>

                            <!-- Display the car's year, seat count, and color. -->
                            <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                                <span>{car.production_year}</span>
                                <span>{car.number_of_seats} seats</span>
                                <span>{car.color}</span>
                            </div>

                            <!-- Display the daily price and Google Maps link. -->
                            <div class="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                <p class="text-lg font-bold text-red-700">
                                    €{car.price_per_day}
                                    <span class="text-sm font-normal text-gray-500">
                                        / day
                                    </span>
                                </p>

                                <a
                                    class="text-sm font-semibold text-red-700 hover:underline"
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.location + ', Albania')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View location ↗
                                </a>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}
    </div>
</div>