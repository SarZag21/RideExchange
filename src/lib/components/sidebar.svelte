<script>
    import {
        User,
        Car,
        CalendarDays,
        MessageSquare,
        LogOut
    } from 'lucide-svelte';
</script>
<aside class="min-h-screen w-64 border-r border-gray-200 bg-white px-5 py-8 shadow-sm">

   <h2 class="mb-6 px-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
        Account
    </h2>

    <nav class="space-y-2">
       <a
            href="/profile"
            class="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-700"
        >
            <User size={20} />
            My Profile
        </a>

        <a
            href="/cars"
            class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
            <Car size={20} />
            My Cars
        </a>

        <a
            href="/bookings"
            class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
            <CalendarDays size={20} />
            My Bookings
        </a>

        <a
            href="/messages"
            class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
            <MessageSquare size={20} />
            Messages
        </a>

    </nav>

    <div class="mt-8 border-t border-gray-200 pt-4">
        <a
        href="/logout"
        class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-700"
        >
        <LogOut size={20} />
        Logout
        </a>
    </div>

</aside>