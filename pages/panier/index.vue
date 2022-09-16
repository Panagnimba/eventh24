<template>
  <div class="overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div
      class="
        h-full
        flex flex-col
        justify-evenly
        gap-4
        bg-general
        p-6
        sm:flex-row
      "
    >
      <div class="w-full bg-white border flex flex-col px-4">
        <h3 class="text-xl font-bold text-second py-2">Mon panier</h3>
        <panier-item
          v-for="(panierItem, k) in this.panierList"
          :panierItemProp="panierItem"
          :key="k"
        ></panier-item>
      </div>
      <!-- RIGHT -->
      <div class="w-full flex flex-col gap-4">
        <!-- total -->
        <div class="w-full h-full border flex flex-col gap-4 p-4 bg-white">
          <div class="font-bold text-second">TOTAL</div>
          <hr class="w-full" />
          <div class="flex justify-between gap-2">
            <span>Nombre d'articles</span>
            <span>03</span>
          </div>
          <hr class="w-full" />
          <div class="flex justify-between gap-2">
            <span>Total des articles</span>
            <span>200 fcfa</span>
          </div>
          <div class="flex justify-between gap-2">
            <span>Frais</span>
            <span>200 fcfa</span>
          </div>
          <hr class="w-full" />
          <div class="flex justify-between gap-2 font-semibold">
            <span>Total à payer</span>
            <span>200 fcfa</span>
          </div>
        </div>
        <!-- methodes de payement -->
        <div class="w-full h-full border flex flex-col gap-4 p-4 bg-white">
          <div class="font-bold text-second">Mode de payement</div>
          <hr class="w-full" />
          <div class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              id="bank"
              class="w-4 h-4"
            />
            <label for="bank">Carte Bancaire</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              id="orange"
              class="w-4 h-4"
            />
            <label for="orange">Orange Money</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              id="sank"
              class="w-4 h-4"
            />
            <label for="sank">Sank Pay</label>
          </div>
          <hr class="w-full" />
          <p class="text-xs text-second">
            Payement sécuriser via l'
            <span class="font-semibold">API Sank</span> d'une somme de
            <span class="font-semibold">200 fcfa</span>
          </p>
          <hr class="w-full" />
          <nuxt-link
            :to="this.redirect"
            class="bg-third text-white font-bold p-2 text-center rounded-md"
          >
            Passer la commande
          </nuxt-link>
        </div>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
export default {
  data() {
    return {
      redirect: "", // redirect eather to login or to final commande page
      //depending on the login status
    };
  },
  computed: {
    panierList() {
      return this.$store.state.panier;
    },
  },
  mounted() {
    if (!this.$store.state.user.lastName) this.redirect = "/login";
    else this.redirect = "/commande";
  },
};
</script>