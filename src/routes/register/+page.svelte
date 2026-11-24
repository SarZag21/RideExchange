<script>
     import * as m from '$lib/paraglide/messages.js';
     import { setLocale, getLocale } from '$lib/paraglide/runtime.js';
     import { Globe } from 'lucide-svelte';
    // $props() enthält die vom Server zurückgegebenen Daten.
    // form enthält mögliche Fehlermeldungen aus +page.server.js.
    let { form } = $props();
</script>

<div class="flex justify-end px-6 py-4">
    <div class="flex items-center gap-1 rounded-lg border
                border-gray-200 bg-white p-1 shadow-sm">

        <Globe size={18} class="mx-2 text-gray-500" />

        {#each ['en', 'de', 'sq'] as lang}
            <button
                type="button"
                onclick={() => setLocale(lang)}
                class="rounded-md px-3 py-1.5 text-sm
                       font-medium transition-colors
                       {getLocale() === lang
                           ? 'bg-red-600 text-white'
                           : 'text-gray-600 hover:bg-red-50 hover:text-red-600'}"
            >
                {lang.toUpperCase()}
            </button>
        {/each}

    </div>
</div>

<!-- Erstellt den Hintergrund und zentriert den Registrierungsbereich. -->
<div class="min-h-screen bg-grey-50 flex items-center justify-center p-6"> 

<!-- Erstellt eine weiße Karte mit abgerundeten Ecken und Schatten. -->
<!-- md:grid-cols-2 zeigt ab mittlerer Bildschirmgröße zwei Spalten an. -->
<div class="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

<!-- Erstellt die linke Seite mit einem Hintergrundbild. -->
<div class="relative p-10 flex flex-col bg-cover bg-center"
    style="background-image: url('/images/car-bg.png');">

<!-- Fügt eine halbtransparente weiße Schicht über dem Hintergrundbild hinzu. -->
    <div class="absolute inset-0 bg-white/75"></div>   

<!-- Zeigt den Inhalt über der weißen Schicht an. -->
<!-- z-10 sorgt dafür, dass der Inhalt im Vordergrund liegt. -->
    <div class="relative z-10 flex flex-col h-full">

      <!-- Link zur Startseite -->
    <a href="/" class="text-gray-700 hover:text-[#BF0030]">
       {m.register_home()}
    </a>

    <!-- Zentriert das Logo, die Texte und den Login-Button. -->
    <div class="flex flex-col items-center justify-center flex-1 text-center">

        <img
            src="/images/RideExchange_logo_clean_transparent.png"
            alt="RideExchange Logo"
            class="w-30 mb-5"
        />
        <h1 class="text-5xl font-bold text-gray-900">
           {m.register_get_started()}
        </h1>

        <p class="text-gray-500 text-lg mt-4">
            {m.register_welcome()}
        </p>

        <p class="text-gray-700 mt-10">
           {m.register_existing_account()}
        </p>
        <a
            href="/login"
            class="mt-3 border-2 border-[#BF0030] text-[#BF0030]
                   px-12 py-3 rounded-xl hover:bg-[#BF0030]
                   hover:text-white"
        >
          {m.register_login()}
        </a>
    </div>
</div>
</div>

<!-- Erstellt die rechte Seite mit dem Registrierungsformular. -->
<!-- md:p-14 vergrößert den Innenabstand auf mittleren und größeren Bildschirmen. -->
<div class="p-10 md:p-14">

        <h1 class="text-3xl font-bold text-[#D62828] text-center mb-2">
          {m.register_title()}
        </h1>

        <p class="text-gray-500 text-center mb-6">
        {m.register_subtitle()}
        </p>
<!-- Zeigt eine Fehlermeldung an, wenn form.error existiert -->
        {#if form?.error}
            <p class="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {form.error}
            </p>
        {/if}

        <!-- Erstellt das Registrierungsformular. -->
        <!-- POST sendet die eingegebenen Daten an +page.server.js. -->
        <form method="POST">
            <label for="username" class="block mb-1">
            {m.register_username()}
            </label>

            <input
                id="username"
                name="username"
                type="text"
                required
                class="w-full border p-3 rounded-lg mb-4"
            />

            <label for="email" class="block mb-1">
            {m.register_email()}
            </label>

            <input
                id="email"
                name="email"
                type="email"
                required
                class="w-full border p-3 rounded-lg mb-4"
            />

            <label for="phone_number" class="block mb-1">
            {m.register_phone()}
            </label>

            <input
                id="phone_number"
                name="phone_number"
                type="tel"
                class="w-full border p-3 rounded-lg mb-4"
            />

            <label for="password" class="block mb-1">
            {m.register_password()}
            </label>

            <input
                id="password"
                name="password"
                type="password"
                minlength="8"
                required
                class="w-full border p-3 rounded-lg mb-5"
            />
            <button
                type="submit"
                class="w-full bg-[#D62828] text-white p-3 rounded-lg hover:bg-[#D62828]"
            >
            {m.register_button()}
            </button>

        </form>
    </div>
</div>
</div>