<template>
  <div class="h-full">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="h-full">
      <loader v-if="isPending"></loader>
      <div v-else class="w-full h-full p-6 flex justify-evenly items-center">
        <payments-bank-method></payments-bank-method>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      isPending: false,
      notif: {
        show: false,
        type: "",
        message: "",
      },
    };
  },
  computed: {
    panierContent() {
      return this.$store.state.panier;
    },
  },
  middleware({ store, redirect }) {
    // if no products in the cart or products exists in the cart
    // user not authenticated
    // if (
    //   store.state.panier.length == 0 ||
    //   store.state.user.token == null ||
    //   store.state.user.prenom.length == 0
    // )
    //   return redirect("/");
  },
};
</script>
