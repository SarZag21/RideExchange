<script>
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';

    let { children, data } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<header class="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-5 shadow-sm">
    <a href="/" class="text-2xl font-bold tracking-tight text-red-700 flex items-center gap-2">
    <img
        src="/images/RideExchange_logo_clean_transparent.png"
        alt="RideExchange logo"
        class="h-10 w-10 object-contain"
    />
        RideExchange
    </a>

    <nav class="flex items-center gap-8">
        
        <a href="/profile" class="font-medium transition hover:text-red-700">
            Profile
        </a>
        <a href="/guide" class="font-medium transition hover:text-red-700">
            Guide
        </a>

        {#if data.user}
            <form method="POST" action="/logout">
                <button
                    type="submit"
                    class="rounded-lg border border-gray-200 px-5 py-2 font-medium transition hover:border-red-700 hover:text-red-700"
                >
                    Log out
                </button>
            </form>
        {:else}
            <a
                href="/login"
                class="rounded-lg border border-gray-200 px-5 py-2 font-medium transition hover:border-red-700 hover:text-red-700"
            >
                Log in
            </a>

            <a
                href="/register"
                class="rounded-lg bg-red-700 px-5 py-2 font-medium text-white transition hover:bg-red-800"
            >
                Register
            </a>
        {/if}
    </nav>
</header>
{@render children()}