
<script>
  let { data } = $props();
</script>

 

<div class="min-h-screen bg-white text-slate-900">

<header class="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-5 shadow-sm">
    <a href="/" class="text-2xl font-bold tracking-tight text-red-700">
        RideExchange
    </a>

    <nav class="flex items-center gap-8">
        

        <a href="/guide" class="font-medium transition hover:text-red-700">
            Guide
        </a>

        {#if data.user}
            <form method="POST" action="/logout">
                <button
                    type="submit"
                    class="rounded-lg border border-gray-200 px-5 py-2 font-medium transition hover:border-red-700 hover:text-red-700"
                >
                    Log out
                </button>
            </form>
        {:else}
            <a
                href="/login"
                class="rounded-lg border border-gray-200 px-5 py-2 font-medium transition hover:border-red-700 hover:text-red-700"
            >
                Log in
            </a>

            <a
                href="/register"
                class="rounded-lg bg-red-700 px-5 py-2 font-medium text-white transition hover:bg-red-800"
            >
                Register
            </a>
        {/if}
    </nav>
</header>

  
  <main class="mx-auto max-w-6xl px-8 py-24">
     <section class="grid items-center gap-8 md:grid-cols-2">
      <div>
        <p class="mb-4 font-medium text-red-700">
          YOUR JOURNEY STARTS HERE
        </p>

        <h1 class="mb-6 text-5xl font-bold leading-tight">
          Find your next ride.
          Discover the freedom.
        </h1>

        <p class="mb-8 text-lg text-gray-500">
          Rent cars directly from their owners and find the right
          ride for your next journey.
        </p>

        <a href="/cars" class="inline-block rounded-lg bg-red-700 px-6 py-3 text-white hover:bg-red-800">
          Explore cars →
        </a>
      </div>


<div class="h-80 w-full max-w-xl justify-self-center overflow-hidden rounded-2xl">
  <img
    src="/images/hp_car.jpg"
    alt="Black and white car"
    class="h-full w-full object-cover object-[center_70%]"
  />
</div>
  </section>
  
<section class="mt-16 rounded-xl border border-gray-200 bg-gray-50 p-6">
  <h2 class="mb-4 text-xl font-bold">Find your next ride</h2>


<section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-6">
        <h2 class="text-3xl font-bold text-gray-900">
            Find your perfect car
        </h2>
        <p class="mt-2 text-gray-600">
            Choose your location and travel dates to find available cars.
        </p>
    </div>

    <form action="/browse" method="GET" class="grid gap-4 rounded-2xl bg-white p-6 shadow-lg md:grid-cols-3">

        <button
            type="submit"
            class="rounded-lg bg-red-700 px-6 py-3 font-medium text-white hover:bg-red-800 md:col-span-3"
        >
            Search cars
        </button>
    </form>
</section>

<div class="mt-20">
    <div class="relative mx-auto max-w-3xl border-t-2 border-dotted border-gray-300">
        <div class="driving-car">🚗</div>
    </div>
</div>

  

<section class="mx-auto mt-20 max-w-6xl px-8">
    <div class="text-center">
        <p class="mb-3 text-sm font-semibold tracking-widest text-red-700">
            WHY RIDEEXCHANGE?
        </p>

        <h2 class="text-3xl font-bold tracking-tight text-slate-900">
            A better way to get around.
        </h2>

        <p class="mx-auto mt-4 max-w-xl text-gray-500">
            Everything you need for a simple, safe and flexible journey.
        </p>
    </div>

    <div class="mt-10 grid gap-6 md:grid-cols-3">
        <div class="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
                💰
            </div>

            <h3 class="mt-6 text-xl font-bold text-slate-900">
                Affordable prices
            </h3>

            <p class="mt-3 leading-relaxed text-gray-500">
                Find cars at prices that fit your budget and your travel plans.
            </p>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
                🤝
            </div>

            <h3 class="mt-6 text-xl font-bold text-slate-900">
                Trusted owners
            </h3>

            <p class="mt-3 leading-relaxed text-gray-500">
                Connect directly with local car owners and enjoy a simple booking experience.
            </p>
        </div>

        <div class="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
                🗺️
            </div>

            <h3 class="mt-6 text-xl font-bold text-slate-900">
                Flexible journeys
            </h3>

            <p class="mt-3 leading-relaxed text-gray-500">
                Choose a car that suits your destination, schedule and needs.
            </p>
        </div>
    </div>
</section>




<section class="mx-auto mt-14 max-w-6xl px-8">
    <div class="rounded-2xl bg-red-700 px-8 py-12 text-center text-white">
        <h2 class="text-3xl font-bold">
            Have a car? Let it earn.
        </h2>

        <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-red-100">
            Share your car with others and earn money while helping
            people find their perfect ride.
        </p>

        {#if data.user}
            <a
                href="/cars/new"
                class="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-red-700 transition hover:bg-gray-100"
            >
                List your car →
            </a>
        {:else}
            <a
                href="/register"
                class="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-red-700 transition hover:bg-gray-100"
            >
                Become an owner →
            </a>
        {/if}
    </div>
</section>


  

<footer class="mt-20 border-t border-gray-200 bg-gray-50">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-8 py-10 md:flex-row">

        <a href="/" class="text-2xl font-bold tracking-tight text-red-700">
            RideExchange
        </a>

        <nav class="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-600">
            <a href="/guide" class="transition hover:text-red-700">
                Guide
            </a>

            <a href="/cars" class="transition hover:text-red-700">
                Explore cars
            </a>

            <a href="/login" class="transition hover:text-red-700">
                Log in
            </a>
        </nav>

        <p class="text-sm text-gray-400">
            © 2026 RideExchange. All rights reserved.
        </p>

    </div>
</footer>

</div>



<style>
  .driving-car {
    position: absolute;
    top: -22px;
    left: 0;
    animation: drive 10s linear infinite;
  }

  @keyframes drive {
  from {
    left: calc(100% - 28px);
  }
  to {
    left: 0;
  }
}
</style>