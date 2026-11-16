
<script>
    import { enhance } from '$app/forms';

    let { data, form } = $props();

    let startDate = $state('');
    let endDate = $state('');

    const today = new Date().toISOString().slice(0, 10);

    let days = $derived(
        startDate && endDate && endDate > startDate
            ? (Date.parse(endDate) - Date.parse(startDate)) / 86400000
            : 0
    );

    let totalPrice = $derived(
        days * Number(data.auto?.price_per_day || 0)
    );
</script>

<div class="min-h-screen bg-gray-50 px-6 py-12">
    <div class="mx-auto max-w-3xl">

        <a href="/" class="text-sm font-medium text-red-700 hover:underline">
            ← Back to Home
        </a>

        <h1 class="mt-6 text-3xl font-bold text-gray-900">
            Book a Car
        </h1>

        <p class="mt-2 text-gray-600">
            Select your rental dates to reserve your vehicle.
        </p>

        {#if !data.auto}

            <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-8">
                <h2 class="text-xl font-bold text-gray-900">
                    Car not found
                </h2>

                <p class="mt-2 text-gray-600">
                    Please select a vehicle from our available cars.
                </p>

                <a href="/"
                    class="mt-5 inline-block rounded-lg bg-red-700 px-6 py-3 text-white hover:bg-red-800">
                    Browse cars
                </a>
            </div>

        {:else if data.isOwner}

            <div class="mt-8 rounded-xl border border-red-200 bg-white p-6">
                You cannot book your own vehicle.
            </div>

        {:else if !data.loggedIn}

            <div class="mt-8 rounded-xl border border-gray-200 bg-white p-6">
                Please log in before booking this vehicle.

                <a href="/login"
                    class="ml-2 font-medium text-red-700 hover:underline">
                    Log in
                </a>
            </div>

        {:else}

            <!-- Selected car -->

            <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                {#if data.auto.url_image}
                    <img
                        src={data.auto.url_image}
                        alt={data.auto.brand_name}
                        class="h-56 w-full rounded-xl object-cover"
                    />
                {/if}

                <h2 class="mt-4 text-xl font-bold text-gray-900">
                    {data.auto.brand_name} {data.auto.type}
                </h2>

                <p class="mt-2 text-gray-600">
                    {data.auto.color} · {data.auto.location}
                </p>

                <p class="mt-3 font-semibold text-red-700">
                    €{data.auto.price_per_day} / day
                </p>

            </div>

            {#if data.auto.status !== 'available'}

                <div class="mt-6 rounded-xl border border-red-200 bg-white p-6 text-red-700">
                    This vehicle is currently unavailable.
                </div>

            {:else}

                <!-- Booking form -->

                <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                    <h2 class="text-xl font-bold text-gray-900">
                        Rental details
                    </h2>

                    {#if form?.error}
                        <div class="mt-5 rounded-lg bg-red-50 p-4 text-red-700">
                            {form.error}
                        </div>
                    {/if}

                    {#if form?.success}
                        <div class="mt-5 rounded-lg bg-green-50 p-4 text-green-700">
                            <h3 class="font-bold">
                                Booking successful!
                            </h3>

                            <p class="mt-1">
                                {form.message}
                            </p>
                        </div>
                    {/if}

                    <form
                        method="POST"
                        action="?/create"
                        use:enhance
                        class="mt-6"
                    >

                        <input
                            type="hidden"
                            name="auto_id"
                            value={data.auto.id}
                        />

                        <label for="start_date"
                            class="block font-medium text-gray-700">
                            Start date
                        </label>

                        <input
                            id="start_date"
                            name="start_date"
                            type="date"
                            min={today}
                            bind:value={startDate}
                            required
                            class="mt-2 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-700"
                        />

                        <label for="end_date"
                            class="mt-6 block font-medium text-gray-700">
                            End date
                        </label>

                        <input
                            id="end_date"
                            name="end_date"
                            type="date"
                            min={startDate || today}
                            bind:value={endDate}
                            required
                            class="mt-2 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-700"
                        />

                        {#if days > 0}

                            <div class="mt-8 rounded-xl bg-gray-50 p-5">

                                <div class="flex justify-between text-gray-600">
                                    <span>Price per day</span>
                                    <span>€{data.auto.price_per_day}</span>
                                </div>

                                <div class="mt-3 flex justify-between text-gray-600">
                                    <span>Rental days</span>
                                    <span>{days}</span>
                                </div>

                                <div class="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
                                    <span>Total price</span>
                                    <span class="text-red-700">
                                        €{totalPrice.toFixed(2)}
                                    </span>
                                </div>

                            </div>

                        {:else if startDate && endDate}

                            <p class="mt-4 text-sm text-red-700">
                                The end date must be after the start date.
                            </p>

                        {/if}

                        <button
                            type="submit"
                            disabled={days <= 0}
                            class="mt-6 w-full rounded-lg bg-red-700 px-6 py-3 font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            Confirm booking
                        </button>

                    </form>

                </div>

            {/if}

        {/if}

    </div>
</div>
