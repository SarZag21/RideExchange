<script> 
// Importiert die aktuelle Seite.
import { page } from '$app/state';

//Lucide Svelte ist eine Bibliothek mit fertigen Icons für Svelte-Anwendungen.
//Mit "import" werden die benötigten Icons aus dieser Bibliothek geladen.
    import {
        User,
        Car,
        CalendarDays,
        MessageSquare,
        LogOut
    } from 'lucide-svelte';
</script>

<!-- Erstellt die Sidebar mit den Navigationslinks für das Benutzerkonto. -->
<aside class="min-h-screen w-64 border-r border-gray-200 bg-white px-5 py-8 shadow-sm">

   <h2 class="mb-6 px-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
        Account
    </h2>

 <!-- Enthält die Navigationslinks mit den zugehörigen Icons -->
    <nav class="space-y-2">
   
<!-- Markiert My Profile, wenn diese Seite geöffnet ist. -->
<a
    href="/profile"
    class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition hover:bg-gray-50"
    class:bg-red-50={page.url.pathname === '/profile'}
    class:text-red-700={page.url.pathname === '/profile'}
    class:text-gray-600={page.url.pathname !== '/profile'}
>
    <User size={20} />
    My Profile
</a>

    <!-- Markiert My Cars, wenn diese Seite geöffnet ist. -->
    <a
    href="/cars"
    class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition hover:bg-gray-50"
    class:bg-red-50={page.url.pathname === '/cars'}
    class:text-red-700={page.url.pathname === '/cars'}
    class:text-gray-600={page.url.pathname !== '/cars'}
    >
    <Car size={20} />
    My Cars
</a>

     <!-- Markiert My Bookings, wenn diese Seite geöffnet ist. -->
<a
    href="/bookings"
    class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition hover:bg-gray-50"
    class:bg-red-50={page.url.pathname === '/bookings'}
    class:text-red-700={page.url.pathname === '/bookings'}
    class:text-gray-600={page.url.pathname !== '/bookings'}
>
    <CalendarDays size={20} />
    My Bookings
</a>

<!-- Markiert Messages, wenn diese Seite geöffnet ist. -->
<a
    href="/messages"
    class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition hover:bg-gray-50"
    class:bg-red-50={page.url.pathname === '/messages'}
    class:text-red-700={page.url.pathname === '/messages'}
    class:text-gray-600={page.url.pathname !== '/messages'}
>
    <MessageSquare size={20} />
    Messages
</a>

    </nav>


    <!-- Trennt den Logout-Bereich durch Abstand und eine obere Linie ab. -->
<div class="mt-8 border-t border-gray-200 pt-4">
    <!-- Sendet eine POST-Anfrage zum Abmelden. -->
    <form method="POST" action="/logout">
        <button
            type="submit"
            class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-700"
        >
            <LogOut size={20} />
            Logout
        </button>
    </form>
</div>

</aside>