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
      <!-- Left -->
      <div class="w-full bg-white border flex flex-col px-4">
        <h3 class="text-xl font-bold text-second py-2">Mon panier</h3>
        <!-- <panier-item
          v-for="(panierItem, k) in this.panierList"
          :panierItemProp="panierItem"
          :key="k"
          @removeToCart="removeToCartHandle"
        ></panier-item> -->
        <div
          v-for="(panierItem, k) in this.panierList"
          :key="k"
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
            {{ panierItem.intitule }}
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
              :value="panierItem.qte"
              @change="qteInputHandle($event, panierItem._id)"
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
            <span>{{ panierItem.qte }} x {{ panierItem.price }} fcfa</span>
            <span>{{ panierItem.qte * panierItem.price }} fcfa</span>
          </div>
        </div>
      </div>
      <!-- RIGHT -->
      <div class="w-full flex flex-col gap-4">
        <panier-total-panier></panier-total-panier>
        <panier-payment-method></panier-payment-method>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
export default {
  data() {
    return {
      panierList: this.$store.state.panier,
    };
  },
  methods: {
    decreaseQte(itemId) {
      this.$store.commit("decreaseQte", itemId);
    },
    increaseQte(itemId) {
      this.$store.commit("increaseQte", itemId);
    },
    qteInputHandle(e, itemId) {
      this.$store.commit("modifyQte", {
        id: itemId,
        qte: e.target.value,
      });
    },
    removeToCart(itemId) {
      this.$store.commit("removeToCart", itemId);
    },
  },
};
</script>