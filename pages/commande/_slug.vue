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
      panierContent: this.$store.state.panier,
    };
  },
  middleware({ store, redirect }) {
    // if no products in the cart or products exists in the cart
    // user not authenticated
    if (
      store.state.panier.length == 0 ||
      store.state.user.token == null ||
      store.state.user.prenom.length == 0
    )
      return redirect("/");
  },
  async fetch() {
    this.panierContent = this.$store.state.panier;
  },
};
</script>