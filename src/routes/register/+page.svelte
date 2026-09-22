<script>
    let { form } = $props();
</script>

<div class="min-h-screen bg-grey-50 flex items-center justify-center p-6"> 

<div class="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

<div class="relative p-10 flex flex-col bg-cover bg-center"
    style="background-image: url('/images/car-bg.png');">

    <div class="absolute inset-0 bg-white/75"></div>   
    <div class="relative z-10 flex flex-col h-full">

    <a href="/" class="text-gray-700 hover:text-[#BF0030]">
        ← Home Page
    </a>

    <div class="flex flex-col items-center justify-center flex-1 text-center">

        <img
            src="/images/RideExchange_logo_clean_transparent.png"
            alt="RideExchange Logo"
            class="w-30 mb-5"
        />
        <h1 class="text-5xl font-bold text-gray-900">
            Get Started
        </h1>

        <p class="text-gray-500 text-lg mt-4">
            Join RideExchange and hit the road together!
        </p>

        <p class="text-gray-700 mt-10">
            Already have an account?
        </p>
        <a
            href="/login"
            class="mt-3 border-2 border-[#BF0030] text-[#BF0030]
                   px-12 py-3 rounded-xl hover:bg-[#BF0030]
                   hover:text-white"
        >
            Log in
        </a>
    </div>
</div>
</div>

<div class="p-10 md:p-14">

        <h1 class="text-3xl font-bold text-[#D62828] text-center mb-2">
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
                class="w-full bg-[#D62828] text-white p-3 rounded-lg hover:bg-[#D62828]"
            >
                Register
            </button>

        </form>
    </div>
</div>
</div>