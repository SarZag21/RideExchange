
<script>
    let { form } = $props();
</script>

<!-- Legt den Titel "Login" für den Browser-Tab fest. -->
<svelte:head>
    <title>Login</title>
</svelte:head>

<!-- Erstellt einen Container für das Login-Formular mit einem Hintergrundbild. -->
<div   
class="relative min-h-screen flex items-center justify-center bg-cover bg-center p-6"
style="background-image: url('/images/car-bg.png');"
>
<!-- Fügt eine halbtransparente weiße Schicht über dem Hintergrundbild hinzu. -->
   <div class="absolute inset-0 bg-white/35"></div>

 <!-- Erstellt eine weiße Login-Karte mit abgerundeten Ecken und Schatten. -->
    <div class=" relative w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <!-- Zentriert das Logo, die Überschrift und den Beschreibungstext. -->
        <div class="text-center mb-8">
            <img
                src="/images/RideExchange_logo_clean_transparent.png"
                alt="RideExchange Logo"
                class="w-40 mx-auto mb-5"
            />

            <h1 class="text-3xl font-bold text-gray-900">
                Welcome back
            </h1>

            <p class="mt-2 text-gray-600">
                Log in to your account
            </p>
        </div>

   <!--
    Prüft, ob vom Server eine Fehlermeldung zurückgegeben wurde.
    Wenn form.error existiert, wird die Meldung in einem roten Feld angezeigt.
    -->
    {#if form?.error}
       <div class="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        {form.error}
      </div>
    {/if}

<!--
    Erstellt das Login-Formular.
    method="POST" sendet die eingegebenen Daten an die Server-Aktion.
-->
    <form method="POST">
      <!-- Erstellt den Bereich für die E-Mail-Adresse und Username. -->
    <div class="mb-5">
     <!-- Beschriftet das Eingabefeld für die E-Mail-Adresse und Username. -->
        <label for="identifier"class="mb-1 block text-sm font-medium text-gray-900" >
            Email address or username
        </label>

    <!--
    id verbindet das Feld mit dem Label.
    name bestimmt den Namen des Feldes in den Formulardaten.
    type="text" erlaubt den User sowohl email als auch username zu schreiben
    required macht die Eingabe verpflichtend.
    focus ändert die Rahmenfarbe und den Schatten, wenn das Feld aktiv ist.
    -->
        <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="Enter your email or username"
            required
            class="w-full rounded-lg border border-gray-300
               bg-white px-4 py-3 text-gray-900
               outline-none transition
               focus:border-red-700 focus:ring-2 focus:ring-red-100"
        />
    </div>

    
    <div class="mb-6">
        <label for="password" class="mb-1 block text-sm font-medium text-gray-900">
            Password
        </label>

        <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            class="w-full rounded-lg border border-gray-300
               bg-white px-4 py-3 text-gray-900
               outline-none transition
               focus:border-red-700 focus:ring-2 focus:ring-red-100"
        />
    </div>

    <!--
    Erstellt den Login-Button.
    type="submit" sendet das Formular an den Server.
   mit hover beim Darüberfahren mit der Maus wird der Button dunkler.
    -->
    <button
    type="submit"
    class="w-full rounded-lg bg-red-700 py-3
           font-semibold text-white transition
           hover:bg-red-800">
           Log in
    </button>

</form>


<p class="mt-6 text-center text-sm text-gray-600">
    Don't have an account?

    <a
        href="/register"
        class="font-semibold text-red-700 hover:text-red-800 hover:underline"
    >
        Create an account
    </a>
</p>
</div>

</div>