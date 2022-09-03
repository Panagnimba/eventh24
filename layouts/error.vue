<template>
  <div class="overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full h-screen p-6 flex justify-center items-center">
      <div class="flex flex-col gap-6 justify-center items-center">
        <h3 class="text-8xl text-third font-bold">
          {{ this.error.statusCode }}
        </h3>
        <div class="text-second text-center">{{ this.error.message }}</div>
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
<script>
export default {
  props: ["error"],
};
</script>