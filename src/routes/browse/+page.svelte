<script>
    let { data } = $props();
    let filtersOpen = $state(true);

    function buildViewUrl(view) {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(data.filters)) {
            if (value !== '' && value !== null && value !== undefined) params.set(key, value);
        }
        params.set('view', view);
        return `/browse?${params.toString()}`;
    }

    const mapLocation = $derived(data.filters.location || data.cars[0]?.location || 'Albania');
    const mapUrl = $derived(`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation + ', Albania')}&output=embed`);
</script>

<svelte:head>
    <title>Find a car | RideExchange</title>
    <meta name="description" content="Search available rental cars across Albania." />
</svelte:head>

<div class="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
    <div class="mx-auto max-w-7xl">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p class="text-sm font-semibold uppercase tracking-wider text-red-700">RideExchange</p>
                <h1 class="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Find your car</h1>
                <p class="mt-2 text-gray-600">Search available cars across Albania.</p>
            </div>
            <div class="flex items-center gap-2 rounded-xl bg-white p-1 shadow-sm ring-1 ring-gray-200">
                <a href={buildViewUrl('grid')} class={`rounded-lg px-4 py-2 text-sm font-semibold ${data.filters.view === 'grid' ? 'bg-red-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Grid view</a>
                <a href={buildViewUrl('map')} class={`rounded-lg px-4 py-2 text-sm font-semibold ${data.filters.view === 'map' ? 'bg-red-700 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Map view</a>
            </div>
        </div>

        <form method="GET" class="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div class="flex items-center justify-between gap-3">
                <div>
                    <h2 class="text-lg font-semibold text-gray-900">Filters</h2>
                    <p class="mt-1 text-sm text-gray-500">Narrow down the available cars.</p>
                </div>
                <button type="button" onclick={() => filtersOpen = !filtersOpen} class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">{filtersOpen ? 'Hide filters' : 'Show filters'}</button>
            </div>
            {#if filtersOpen}
                <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <label for="location" class="mb-1 block text-sm font-medium text-gray-700">Location</label>
                        <input id="location" name="location" value={data.filters.location} placeholder="e.g. Shkoder" class="w-full rounded-lg border-gray-300" />
                    </div>
                    <div>
                        <label for="brand" class="mb-1 block text-sm font-medium text-gray-700">Brand</label>
                        <select id="brand" name="brand" class="w-full rounded-lg border-gray-300">
                            <option value="">All brands</option>
                            {#each data.brands as brand}
                                <option value={brand} selected={data.filters.brand === brand}>{brand}</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label for="minPrice" class="mb-1 block text-sm font-medium text-gray-700">Minimum price (€ / day)</label>
                        <input id="minPrice" name="minPrice" type="number" min="0" step="0.01" value={data.filters.minPrice} placeholder="No minimum" class="w-full rounded-lg border-gray-300" />
                    </div>
                    <div>
                        <label for="maxPrice" class="mb-1 block text-sm font-medium text-gray-700">Maximum price (€ / day)</label>
                        <input id="maxPrice" name="maxPrice" type="number" min="0" step="0.01" value={data.filters.maxPrice} placeholder="No maximum" class="w-full rounded-lg border-gray-300" />
                    </div>
                    <div>
                        <label for="seats" class="mb-1 block text-sm font-medium text-gray-700">Minimum seats</label>
                        <select id="seats" name="seats" class="w-full rounded-lg border-gray-300">
                            <option value="">Any number</option>
                            {#each [2, 4, 5, 7, 8] as seatCount}
                                <option value={seatCount} selected={data.filters.seats === String(seatCount)}>{seatCount}+ seats</option>
                            {/each}
                        </select>
                    </div>
                    <div>
                        <label for="year" class="mb-1 block text-sm font-medium text-gray-700">From year</label>
                        <input id="year" name="year" type="number" min="1900" max="2155" value={data.filters.year} placeholder="e.g. 2018" class="w-full rounded-lg border-gray-300" />
                    </div>
                    <div>
                        <label for="sort" class="mb-1 block text-sm font-medium text-gray-700">Sort by</label>
                        <select id="sort" name="sort" class="w-full rounded-lg border-gray-300">
                            <option value="recommended" selected={data.filters.sort === 'recommended'}>Recommended</option>
                            <option value="price_asc" selected={data.filters.sort === 'price_asc'}>Price: low to high</option>
                            <option value="price_desc" selected={data.filters.sort === 'price_desc'}>Price: high to low</option>
                            <option value="year_desc" selected={data.filters.sort === 'year_desc'}>Newest year</option>
                        </select>
                    </div>
                    <input type="hidden" name="view" value={data.filters.view} />
                </div>
                <div class="mt-5 flex flex-wrap gap-3">
                    <button type="submit" class="rounded-lg bg-red-700 px-5 py-2.5 font-semibold text-white hover:bg-red-800">Apply filters</button>
                    <a href="/browse" class="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50">Reset</a>
                </div>
            {/if}
        </form>

        <div class="mt-7 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Available cars</h2>
            <p class="text-sm text-gray-500">{data.cars.length} {data.cars.length === 1 ? 'car' : 'cars'} found</p>
        </div>

        {#if data.cars.length === 0}
            <div class="mt-5 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                <h3 class="text-lg font-semibold text-gray-900">No cars found</h3>
                <p class="mt-2 text-gray-500">Try changing or clearing your filters.</p>
                <a href="/browse" class="mt-5 inline-block rounded-lg bg-red-700 px-5 py-2.5 font-semibold text-white hover:bg-red-800">Clear filters</a>
            </div>
        {:else if data.filters.view === 'map'}
            <div class="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(300px,1fr)]">
                <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <iframe title="Map showing the searched car location" src={mapUrl} class="h-[480px] w-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <div class="border-t border-gray-200 p-4 text-sm text-gray-500">Map centered on {mapLocation}. Use a car's location link to open its position in Google Maps.</div>
                </div>
                <div class="space-y-3">
                    {#each data.cars as car (car.id)}
                        <article class="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            {#if car.url_image}
                                <img src={car.url_image} alt={`${car.brand_name} ${car.type}`} class="h-24 w-28 rounded-lg object-cover" />
                            {:else}
                                <div class="flex h-24 w-28 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">No image</div>
                            {/if}
                            <div class="min-w-0 flex-1">
                                <h3 class="font-semibold text-gray-900">{car.brand_name} {car.type}</h3>
                                <p class="mt-1 text-sm text-gray-500">{car.location} · {car.production_year}</p>
                                <p class="mt-2 font-bold text-red-700">€{car.price_per_day} / day</p>
                                <a class="mt-2 inline-block text-sm font-semibold text-red-700 hover:underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.location + ', Albania')}`} target="_blank" rel="noreferrer">Open location ↗</a>
                            </div>
                        </article>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {#each data.cars as car (car.id)}
                    <article class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                        {#if car.url_image}
                            <img src={car.url_image} alt={`${car.brand_name} ${car.type}`} class="h-52 w-full object-cover" />
                        {:else}
                            <div class="flex h-52 items-center justify-center bg-gray-100 text-sm text-gray-400">No image available</div>
                        {/if}
                        <div class="p-5">
                            <div class="flex items-start justify-between gap-3">
                                <h3 class="text-xl font-semibold text-gray-900">{car.brand_name} {car.type}</h3>
                                <span class="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">Available</span>
                            </div>
                            <p class="mt-2 text-sm text-gray-500">{car.location}</p>
                            <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                                <span>{car.production_year}</span><span>{car.number_of_seats} seats</span><span>{car.color}</span>
                            </div>
                            <div class="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                <p class="text-lg font-bold text-red-700">€{car.price_per_day}<span class="text-sm font-normal text-gray-500"> / day</span></p>
                                <a class="text-sm font-semibold text-red-700 hover:underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(car.location + ', Albania')}`} target="_blank" rel="noreferrer">View location ↗</a>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}
    </div>
</div>
