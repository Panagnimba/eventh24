<template>
  <!-- total -->
  <div class="w-full h-full border flex flex-col gap-4 p-4 bg-white">
    <div class="font-bold text-second">TOTAL</div>
    <hr class="w-full" />
    <div class="flex justify-between gap-2">
      <span>Nombre d'articles</span>
      <span>{{ this.nbreArticle }} </span>
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
</template>
<script>
export default {
  data() {
    return {
      panierList: this.$store.state.panier,
      nbreArticle: 0,
    };
  },
  computed: {
    getTotal() {
      let total = 0;
      this.nbreArticle = 0;
      this.panierList.forEach((elmt) => {
        total += elmt.qte * elmt.price;
        this.nbreArticle += parseInt(elmt.qte);
      });
      return total;
    },
  },
};
</script>