<template>
  <div class="overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full h-screen p-6 flex justify-center items-center">
      {{ $route.params }}
      {{ this.event }}
    </div>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {},
    };
  },
  async fetch() {
    let idEvent = this.$route.params.slug;
    this.event = this.$store.state.panier.filter((item) => item._id == idEvent);
  },
};
</script>