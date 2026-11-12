<script>
    let { data } = $props();

    let description = $state('');
    let submitted = $state(false);
    let selectedBooking = $state('');
</script>

<div class="min-h-screen bg-gray-50 px-6 py-12">
    <div class="mx-auto max-w-3xl">
        <a href="/" class="text-sm font-medium text-red-700 hover:underline">
            ← Back to Home
        </a>

        <h1 class="mt-6 text-3xl font-bold text-gray-900">
            Report Damage
        </h1>

        <p class="mt-2 text-gray-600">
            Let us know if you noticed any damage to a rented vehicle.
        </p>

        <div class="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            {#if submitted}
                <h2 class="text-xl font-bold text-green-700">
                    Report submitted!
                </h2>
                <p class="mt-2 text-gray-600">
                    Your damage report has been recorded.
                </p>
            {:else}
                <form onsubmit={(event) => {
                    event.preventDefault();
                    submitted = true;
                }}>
                    <label for="booking" class="block font-medium text-gray-700">
                        Booking ID
                    </label>
                    <input
                        id="booking"
                        type="number"
                        required
                        class="mt-2 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-700"
                        placeholder="Enter your booking ID"
                    />

                    <label for="description" class="mt-6 block font-medium text-gray-700">
                        Damage description
                    </label>
                    <textarea
                        id="description"
                        bind:value={description}
                        required
                        rows="5"
                        class="mt-2 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-700"
                        placeholder="Describe the damage you noticed..."
                    ></textarea>

                    <button
                        type="submit"
                        class="mt-6 rounded-lg bg-red-700 px-6 py-3 font-medium text-white transition hover:bg-red-800"
                    >
                        Submit report
                    </button>
                </form>
            {/if}
        </div>
    </div>
</div>