<script>
    let { data, form } = $props();
</script>

<svelte:head>
    <title>My Profile</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-6">
    <div class="mx-auto max-w-4xl">

        <h1 class="text-3xl font-bold text-gray-900">
            My Profile
        </h1>

        <p class="mt-2 text-gray-600">
            Manage your personal information
        </p>



    <div class="mt-8 rounded-2xl bg-white p-8 shadow-lg">

        <div class="flex gap-8">
        <div class="w-48 border-r border-gray-200 pr-8 text-center">
            <div class="mx-auto flex h-24 w-24 items-center justify-center
                        rounded-full bg-red-100 text-3xl font-medium text-red-800">
                {data.user.username?.charAt(0).toUpperCase()}
            </div>

        </div>

        <div class="flex-1">

        <h2 class="text-xl font-semibold text-gray-900">
        Personal Information
        </h2>

        <p class="mt-1 text-sm text-gray-500">
        View and update your account details
        </p>
</div>
    </div>

    </div>
</div>
</div>