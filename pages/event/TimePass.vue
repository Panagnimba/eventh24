<template>
  <div class="h-full w-full bg-general overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full h-screen mt-8 flex justify-center items-center">
      <loader v-if="this.isPending"></loader>
      <div v-else>
        <p class="text-xl text-third font-bold">
          Cet évènement n'est plus disponible
        </p>
        <div class="text-center text-second mt-4">Guichet fermé</div>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPending: true,
    };
  },
  mounted() {
    setTimeout(() => (this.isPending = false), 100);
  },
};
</script>