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
            <span>{{ this.panierList.length }} </span>
          </div>
          <hr class="w-full" />
          <div class="flex justify-between gap-2">
            <span>Total des articles</span>
            <span>{{ this.getTotal }} fcfa</span>
          </div>
          <div class="flex justify-between gap-2">
            <span>Frais</span>
            <span>00 fcfa</span>
          </div>
          <hr class="w-full" />
          <div class="flex justify-between gap-2 font-semibold">
            <span>Total à payer</span>
            <span>{{ this.getTotal }} fcfa</span>
          </div>
        </div>
        <!-- methodes de payement -->
        <div
          v-if="this.panierList.length > 0"
          class="w-full h-full border flex flex-col gap-4 p-4 bg-white"
        >
          <div class="font-bold text-second">Mode de payement</div>
          <hr class="w-full" />
          <div class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              @change="getPaymentMethod"
              checked
              id="bank"
              class="w-4 h-4"
            />
            <label for="bank">Carte Bancaire</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              @change="getPaymentMethod"
              id="orange"
              class="w-4 h-4"
            />
            <label for="orange">Orange Money</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              name="paymentMethod"
              @change="getPaymentMethod"
              id="sank"
              class="w-4 h-4"
            />
            <label for="sank">Sank Pay</label>
          </div>
          <hr class="w-full" />
          <p class="text-xs text-second">
            Payement sécuriser via l'API
            <span class="font-semibold">{{ this.paymentMethod }}</span> d'une
            somme de
            <span class="font-semibold">{{ this.getTotal }} fcfa</span>
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

      panierList: this.$store.state.panier,
      paymentMethod: "bank",
    };
  },
  methods: {
    getPaymentMethod(e) {
      this.paymentMethod = e.target.id;
    },
  },
  computed: {
    getTotal() {
      let total = 0;
      this.panierList.forEach((elmt) => {
        total += elmt.qte * elmt.price;
      });
      return total;
    },
  },
  mounted() {
    if (!this.$store.state.user.lastName) this.redirect = "/login";
    else this.redirect = "/commande";
  },
};
</script>