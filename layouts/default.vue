<template>
  <div>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
      rel="stylesheet"
    />

    <Header />
    <div class="mb-6 w-full" />
    <div
      class="flex md:overflow-hidden overflow-y-auto flex-col md:flex-row flex-1 p-4 md:p-6 space-y-6 md:space-y-0 md:space-x-6 min-h-full md:min-h-0 flex-1"
    >
      <WelcomeArea />
      <Nuxt />
    </div>
  </div>
</template>
<style>
body {
  background: #ebe9e4;
}
</style>
