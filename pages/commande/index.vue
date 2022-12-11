<template>
  <div class="h-screen overflow-auto bg-general">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="min-h-full">
      <loader v-if="isPending"></loader>
      <div v-else class="w-full p-6 flex justify-center">
        <!-- orange -->
        <client-only v-if="this.panier.length > 0">
          <payments-orange-method
            v-if="this.panier[0].paymentMethod == 'orange'"
          >
          </payments-orange-method>
        </client-only>
        <!-- coris -->
        <client-only v-if="this.panier.length > 0">
          <payments-coris-method v-if="this.panier[0].paymentMethod == 'coris'">
          </payments-coris-method>
        </client-only>
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
    panier() {
      return this.$store.state.panier;
    },
  },
  // if no products in the cart or products exists in the cart
  // user not authenticated
  middleware({ store, redirect }) {
    // if (
    //   store.state.panier.length <= 0 ||
    //   store.state.user.token == null ||
    //   store.state.user._id == ""
    // )
    //   return redirect("/panier");
  },
};
</script>
<style scoped>
.bg {
  background: url("/background.png");
}
</style>