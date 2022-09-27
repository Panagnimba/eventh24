<template>
  <!-- methodes de payement -->
  <div
    v-show="this.panierList.length > 0"
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
        id="coris"
        class="w-4 h-4"
      />
      <label for="coris">Coris Money</label>
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
      <span class="font-semibold">{{ this.paymentMethod }}</span> d'une somme de
      <span class="font-semibold">{{ this.getTotal }} fcfa</span>
    </p>
    <hr class="w-full" />
    <div
      @click="$emit('commandeBtnClicked')"
      class="bg-third text-white font-bold p-2 text-center rounded-md"
    >
      Passer la commande
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      panierList: this.$store.state.panier,
      paymentMethod: "bank",
    };
  },
  mounted() {
    this.$store.commit("setPaymentMethod", this.paymentMethod);
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
  methods: {
    getPaymentMethod(e) {
      this.paymentMethod = e.target.id;
      this.$store.commit("setPaymentMethod", this.paymentMethod);
    },
  },
};
</script>