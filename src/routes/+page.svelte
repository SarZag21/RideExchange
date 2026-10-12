
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
     <section class="grid items-center gap-12 md:grid-cols-2">
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

<img
  src="/images/hp_car.jpg"
  alt="Black and white car"
  class="block w-full max-w-md justify-self-center"
/>  
  </section>
  <div class="mt-20">
  <div class="relative mx-auto max-w-3xl border-t-2 border-dotted border-gray-300">
    <div class="driving-car">🚗</div>
  </div>
</div>
  </main>
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