<script>
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';
     import { Menu, X } from 'lucide-svelte';

    let { children, data } = $props();
    // Speichert, ob das mobile Menü geöffnet ist.
    let menuOpen = $state(false);
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<!-- Hält Logo und Menü in einer Zeile. -->
<header class="flex items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-8">
    <a href="/" class="text-2xl font-bold tracking-tight text-red-700 flex items-center gap-2">
    <img
        src="/images/RideExchange_logo_clean_transparent.png"
        alt="RideExchange logo"
        class="h-9 w-9 shrink-0 object-contain"
    />
        RideExchange
    </a>

    <!-- Öffnet und schließt das Menü auf mobilen Geräten. -->
    <button
        type="button"
        class="rounded-lg border border-gray-200 p-2 lg:hidden"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onclick={() => menuOpen = !menuOpen}
    >
        {#if menuOpen}
            <X size={24} />
        {:else}
            <Menu size={24} />
        {/if}
    </button>

<!-- Zeigt das Menü mobil unter dem Header an. -->
<nav class={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col items-start gap-4 border-t border-gray-100 pt-4 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-8 lg:border-0 lg:pt-0`}>
        
        <a href="/profile"  onclick={() => menuOpen = false} class="font-medium transition hover:text-red-700">
            Profile
        </a>
        <a href="/guide"  onclick={() => menuOpen = false} class="font-medium transition hover:text-red-700">
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