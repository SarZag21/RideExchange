<script>
    let { form } = $props();
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">

    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

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
                Sign in to your account
            </p>
        </div>



    <form method="POST">
    <div>
        <label for="email"  class="mb-1 block text-sm font-medium text-gray-900" >
            Email address
        </label>

        <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            class="w-full rounded-lg border border-gray-300
               bg-white px-4 py-3 text-gray-900
               outline-none transition
               focus:border-red-700 focus:ring-2 focus:ring-red-100"
        />
    </div>

    
    <div>
        <label for="password">
            Password
        </label>

        <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
        />
    </div>

</form>
</div>

</div>