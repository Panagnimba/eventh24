<template>
  <div class="bg-genera overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full p-6 flex justify-center items-center">
      <div class="flex flex-col gap-4 justify-center items-center">
        <h3 class="text-8xl text-second font-bold">500</h3>
        <div class="text-second text-center">
          Erreur survenue lors de l'analyse
        </div>
        <nuxt-link
          to="/"
          class="bg-second text-white p-2 px-4 text-xl font-bold text-center"
        >
          Retour à l'accueil
        </nuxt-link>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>