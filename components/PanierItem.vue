<template>
  <div
    class="
      w-full
      flex flex-wrap
      justify-between
      items-center
      gap-2
      relative
      py-6
      pr-6
      border-t
    "
  >
    <!-- remove from cart btn -->
    <span
      class="text-xl absolute top-0 right-0 px-2 cursor-pointer"
      @click="removeToCart(panierItem._id)"
    >
      &times;
    </span>
    <!--  -->
    <img
      :src="panierItem.img"
      alt="Event Image"
      class="sm:h-24 sm:w-24 w-full h-36"
    />
    <h1 class="text-md text-second text-center font-bold">
      {{ this.panierItem.intitule }}
    </h1>

    <!-- qte -->
    <div class="flex">
      <span
        class="
          w-6
          bg-third
          text-white text-center
          font-bold
          flex
          justify-center
          items-center
          cursor-pointer
        "
        @click="decreaseQte(panierItem._id)"
        >-</span
      >
      <input
        type="numbre"
        v-model="qte"
        @change="qteInputHandle(panierItem._id)"
        min="1"
        class="w-16 outline-none border px-2 py-1 text-center"
      />
      <span
        class="
          w-6
          bg-third
          text-white
          font-bold
          flex
          justify-center
          items-center
          cursor-pointer
        "
        @click="increaseQte(panierItem._id)"
        >+</span
      >
    </div>
    <!-- price -->
    <div class="flex flex-col gap-2">
      <span>{{ this.qte }} x {{ this.price }} fcfa</span>
      <span>{{ this.qte * this.price }} fcfa</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    panierItemProp: { Object },
  },
  data() {
    return {
      panierItem: this.panierItemProp,
      qte: this.panierItemProp.qte,
      price: this.panierItemProp.price,
    };
  },
  methods: {
    decreaseQte(itemId) {
      if (this.qte >= 2) {
        this.qte--;
        this.$store.commit("ModifyQte", {
          id: itemId,
          qte: this.qte,
        });
      }
    },
    increaseQte(itemId) {
      this.qte++;
      this.$store.commit("ModifyQte", {
        id: itemId,
        qte: this.qte,
      });
    },
    qteInputHandle(itemId) {
      this.qte = this.qte <= 0 ? 1 : this.qte;
      //
      this.$store.commit("ModifyQte", {
        id: itemId,
        qte: this.qte,
      });
    },
    removeToCart(itemId) {
      // this.$store.commit("removeToCart", itemId);
      this.$emit("removeToCart", itemId);
      // console.log(this.$store.state.panier);
    },
  },
};
</script>