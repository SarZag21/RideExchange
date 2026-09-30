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
        <div class="w-48  pr-8 text-center">
            <div class="mx-auto flex h-24 w-24 items-center justify-center
                        rounded-full bg-red-100 text-3xl font-medium text-red-800">
                {data.user.username?.charAt(0).toUpperCase()}
            </div>


            <button
            type="button"
            class="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Change Photo
            </button>

            <p class="mt-2 text-xs text-gray-500">
            JPG or PNG (max 2MB)
            </p>

        </div>

        <div class="flex-1">

        <h2 class="text-xl font-semibold text-gray-900">
        Personal Information
        </h2>

        <p class="mt-1 text-sm text-gray-500">
        View and update your account details
        </p>

        <div class="mt-6">
    <label for="username" class="block text-sm font-medium text-gray-700">
        Username
    </label>

    <input
        id="username"
        name="username"
        type="text"
        value={data.user.username}
        class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
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
        class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
     />
    </div>



<div class="mt-4">
    <label for="phone_number" class="block text-sm font-medium text-gray-700">
        Phone Number
    </label>

    <input
        id="phone_number"
        name="phone_number"
        type="tel"
        value={data.user.phone_number ?? ''}
        class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
    />
</div>

</div>
</div>

</div>
</div>
</div>