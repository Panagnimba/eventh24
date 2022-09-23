<template>
  <div class="overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full h-screen p-6 flex justify-center items-center">
      <div v-for="(ct, i) in this.panierContent" :key="i">
        <br />
        <div>{{ ct }}</div>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panierContent: {},
    };
  },
  async fetch() {
    this.panierContent = this.$store.state.panier;
  },
};
</script>