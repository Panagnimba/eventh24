<template>
  <div class="h-full overflow-auto bg-general">
    <header-top></header-top>
    <menu-items></menu-items>
    <div>
      <loader v-if="isPending"></loader>
      <div v-else class="w-full p-6 flex justify-evenly items-center">
        <!-- <payments-bank-method
          v-if="this.panierContent[0].paymentMethod == 'bank'"
        ></payments-bank-method> -->
        <payments-orange-method></payments-orange-method>
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
  // if no products in the cart or products exists in the cart
  // user not authenticated
  middleware({ store, redirect }) {
    if (
      store.state.panier.length <= 0 ||
      store.state.user.token == null ||
      store.state.user.prenom.length == 0
    )
      return redirect("/panier");
  },
};
</script>
<style scoped>
.bg {
  background: url("/background.png");
}
</style>