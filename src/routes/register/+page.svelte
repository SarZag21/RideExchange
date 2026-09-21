<script>
    let { form } = $props();
</script>

<div class="min-h-screen bg-purple-100 flex items-center justify-center">

    <div class="bg-white p-8 rounded-2xl shadow-lg w-96">

        <h1 class="text-3xl font-bold text-purple-800 text-center mb-2">
            Register
        </h1>

        <p class="text-gray-500 text-center mb-6">
            Create your account
        </p>

        {#if form?.error}
            <p class="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                {form.error}
            </p>
        {/if}

        <form method="POST">
            <label for="username" class="block mb-1">
                Username
            </label>

            <input
                id="username"
                name="username"
                type="text"
                required
                class="w-full border p-3 rounded-lg mb-4"
            />

            <label for="email" class="block mb-1">
                Email
            </label>

            <input
                id="email"
                name="email"
                type="email"
                required
                class="w-full border p-3 rounded-lg mb-4"
            />

            <label for="phone_number" class="block mb-1">
                Phone Number
            </label>

            <input
                id="phone_number"
                name="phone_number"
                type="tel"
                class="w-full border p-3 rounded-lg mb-4"
            />

            <label for="password" class="block mb-1">
                Password
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
                class="w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800"
            >
                Register
            </button>

        </form>


        <p class="text-center mt-5">
            Already have an account?

            <a
                href="/login"
                class="text-purple-700 font-bold"
            >
                Login
            </a>
        </p>

    </div>

</div>