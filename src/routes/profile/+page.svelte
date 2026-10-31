<script>
    // Importiert die Sidebar für die Navigation im Benutzerkonto
    import Sidebar from '$lib/components/sidebar.svelte';
   
    // data enthält die Benutzerdaten aus +page.server.js.
    // form enthält mögliche Fehlermeldungen nach dem Speichern
    let { data, form } = $props();

    // Speichert das ausgewählte Foto.
    let photoInput = $state(null);

    // Öffnet die Dateiauswahl.
    function selectPhoto() {
        photoInput?.click();
    }
</script>

<!-- Legt den Titel des Browser-Tabs fest. -->
<svelte:head>
    <title>My Profile</title>
</svelte:head>

<!-- Erstellt das Layout für die Profilseite mit Sidebar und Hauptinhalt. -->
<div class="flex min-h-screen bg-gray-50">
 <!-- Zeigt die Sidebar mit den Navigationslinks an. -->
    <Sidebar />
  <!-- Erstellt den Hauptbereich neben der Sidebar. -->
    <main class="flex-1 px-8 py-10">
        <div class="mx-auto max-w-4xl">

        <h1 class="text-3xl font-bold text-gray-900">
            My Profile
        </h1>

        <p class="mt-2 text-gray-600">
            Manage your personal information
        </p>


    <!-- Erstellt eine weiße Karte mit abgerundeten Ecken und Schatten. -->
    <div class="mt-8 rounded-2xl bg-white p-8 shadow-lg">
    
        <!-- Ordnet den Profilbildbereich und die Benutzerdaten nebeneinander an. -->    
        <div class="flex gap-8">
        <!-- Erstellt den Bereich für das Profilbild. --> 
        <div class="w-48  pr-8 text-center">
           
            <!--
            Zeigt den ersten Buchstaben des Benutzernamens als Profilbild.
            charAt(0) nimmt den ersten Buchstaben.
            toUpperCase() wandelt ihn in einen Großbuchstaben um.
            ?. prüft, ob der Benutzername existiert, bevor charAt() aufgerufen wird.
            -->
           <div class="mx-auto flex h-24 w-24 items-center justify-center
                        rounded-full bg-red-100 text-3xl font-medium text-red-800">
                {data.user.username?.charAt(0).toUpperCase()}
            </div>


           <!--
            type="file": Erlaubt die Auswahl einer Datei.
            accept: Erlaubt nur JPG- und PNG-Bilder.
            bind:this: Speichert das Input-Element in photoInput.
            class="hidden": Versteckt das Input-Feld.
            -->
            <input
                type="file"
                accept="image/jpeg,image/png"
                bind:this={photoInput}
                class="hidden"
            />
            
            <button
            type="button"
            onclick={selectPhoto}
            class="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Change Photo
            </button>
            
            <p class="mt-2 text-xs text-gray-500">
            JPG or PNG (max 2MB)
            </p>

        </div>

    <!-- Erstellt den Bereich für die persönlichen Informationen. -->
        <div class="flex-1">

        <h2 class="text-xl font-semibold text-gray-900">
        Personal Information
        </h2>

        <p class="mt-1 text-sm text-gray-500">
        View and update your account details
        </p>


        <!-- Zeigt eine Meldung nach erfolgreichem Speichern. -->
        {#if form?.success}
            <p class="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                Profile updated successfully!
            </p>
        {/if}
        
    <!--
    Erstellt das Formular zum Bearbeiten der Profildaten.
    POST sendet die Daten an den Server.
    ?/update ruft die update-Aktion in +page.server.js auf.
    -->
    <form method="POST" action="?/update">
        <div class="mt-6">
    <label for="username" class="block text-sm font-medium text-gray-700">
        Username
    </label>

    <!--
    value zeigt den aktuellen Benutzernamen an.
    name="username" bestimmt den Namen in den Formulardaten.
    focus ändert die Rahmenfarbe und den Schatten, wenn das Feld aktiv ist.
    -->
    <input
        id="username"
        name="username"
        type="text"
        value={data.user.username}
        class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
    />
</div>


    <div class="mt-4">
     <label for="email" class="block text-sm font-medium text-gray-700">
        Email
     </label>

     <input
        id="email"
        name="email"
        type="email"
        value={data.user.email}
        class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
     />
    </div>



<div class="mt-4">
    <label for="phone_number" class="block text-sm font-medium text-gray-700">
        Phone Number
    </label>

    <!--
    type="tel" ist für Telefonnummern vorgesehen.
    value zeigt die gespeicherte Telefonnummer an.
    ?? '' verwendet einen leeren Text, wenn keine Telefonnummer vorhanden ist.
    -->
    <input
        id="phone_number"
        name="phone_number"
        type="tel"
        value={data.user.phone_number ?? ''}
        class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-red-700 focus:ring-2 focus:ring-red-100"
    />
</div>

<button
    type="submit"
    class="mt-6 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800"
>
    Save Changes
</button>

</form>

</div>
</div>

</div>
</div>

</main>
</div>