
<div class="min-h-screen bg-white text-slate-900">
  <header class="flex items-center justify-between border-b border-gray-100 px-8 py-5">
    <a href="/" class="text-2xl font-bold text-red-700">
      RideExchange
    </a>

    <nav class="flex items-center gap-6">
      <a href="/" class="hover:text-red-700">Home</a>
      <a href="/guide" class="hover:text-red-700">Guide</a>
      <a href="/login" class="rounded-lg border border-gray-200 px-4 py-2 hover:border-red-700">
        Log in
      </a>
      <a href="/register" class="rounded-lg bg-red-700 px-4 py-2 text-white hover:bg-red-800">
        Register
      </a>
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

  <form class="grid gap-4 md:grid-cols-3">
    <div>
      <label for="location" class="mb-2 block text-sm font-medium">
        Pickup location
      </label>
      <input
        id="location"
        type="text"
        placeholder="Where do you need a car?"
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
      />
    </div>

    <div>
      <label for="start-date" class="mb-2 block text-sm font-medium">
        Start date
      </label>
      <input
        id="start-date"
        type="date"
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
      />
    </div>

    <div>
      <label for="end-date" class="mb-2 block text-sm font-medium">
        End date
      </label>
      <input
        id="end-date"
        type="date"
        class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
      />
    </div>

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
  </main>
  
<footer class="border-t border-gray-200 px-8 py-8">
  <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
    <a href="/" class="text-xl font-bold text-red-700">
      RideExchange
    </a>

    <nav class="flex gap-6 text-sm text-gray-500">
      <a href="/" class="hover:text-red-700">Home</a>
      <a href="/guide" class="hover:text-red-700">Guide</a>
      <a href="/login" class="hover:text-red-700">Log in</a>
    </nav>

    <p class="text-sm text-gray-400">
      © 2026 RideExchange
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