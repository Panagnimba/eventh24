<template>
  <client-only>
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
          <!-- Panier items -->

          <form action="" method="post" @submit.prevent="commander">
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
                class="sm:h-24 sm:w-24 w-full h-36 object-cover"
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
              <!-- Beneficiaires form goes here-->
              <div class="w-full flex flex-col gap-2 mt-2 pt-2">
                <!-- useSameNameInfo Selector-->
                <div v-if="panierItem.qte > 1" class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="w-4 h-4"
                    :id="`sameNameInfo- ${k}`"
                    :checked="panierItem.useSameNameInfo"
                    @change="useSameNameInfoHandle($event)"
                    :itemid="panierItem._id"
                  />
                  <label
                    :for="`sameNameInfo- ${k}`"
                    class="text-sm text-second"
                  >
                    Utiliser le même nom
                  </label>
                </div>
                <!-- useSameNameInfo unique form -->
                <div
                  v-if="panierItem.useSameNameInfo"
                  class="flex flex-col gap-1"
                >
                  <label class="text-sm text-second font-semibold">
                    Bénéficiaire
                  </label>
                  <input
                    type="text"
                    required
                    :value="panierItem.beneficiairesNames[0]"
                    @change="beneficiaireNamesHandle($event)"
                    :itemid="panierItem._id"
                    :rang="0"
                    placeholder="Nom du Bénéficiaire"
                    class="w-full outline-none border px-2 py-1"
                  />
                </div>
                <!-- else loop for all the bénéficiaires -->
                <div
                  v-else
                  v-for="(benef, k) in parseInt(panierItem.qte)"
                  :key="k"
                  class="flex flex-col gap-1"
                >
                  <label class="text-sm text-second font-semibold">
                    Bénéficiaire {{ k + 1 }}
                  </label>
                  <input
                    type="text"
                    required
                    :value="
                      panierItem.beneficiairesNames &&
                      panierItem.beneficiairesNames[k]
                    "
                    @change="beneficiaireNamesHandle($event)"
                    :itemid="panierItem._id"
                    :rang="k"
                    :placeholder="`Nom du Bénéficiaire ${k + 1}`"
                    class="w-full outline-none border px-2 py-1"
                  />
                </div>
              </div>
              <!-- end  -->
            </div>
            <input type="submit" id="submitButton" hidden />
          </form>
        </div>
        <!-- RIGHT -->
        <div class="w-full flex flex-col gap-4">
          <panier-total-panier></panier-total-panier>
          <panier-payment-method
            @commandeBtnClicked="commandeBtnClicked"
          ></panier-payment-method>
        </div>
      </div>

      <footer-comp></footer-comp>
    </div>
  </client-only>
</template>
<script>
export default {
  computed: {
    panierList() {
      let list = [...this.$store.state.panier];
      return list.reverse();
    },
  },
  methods: {
    commandeBtnClicked() {
      document.querySelector("#submitButton").click();
    },
    // on form submit
    commander() {
      // set redirect_url cookie
      var date = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10mn
      let expires = "; expires=" + date.toUTCString();
      document.cookie =
        "redirect_url" + "=" + ("/commande" || "/") + expires + "; path=/";
      //
      if (this.$store.state.user._id && this.$store.state.user.token) {
        this.$router.push("/commande");
      } else {
        // this.$router.push("/login");
        this.$store.commit("toggleLoginPopup", true);
      }
    },
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
    //
    useSameNameInfoHandle(e) {
      this.$store.commit("useSameNameInfoHandle", {
        _id: e.target.getAttribute("itemId"),
        valueOfuseSameNameInfo: e.target.checked,
      });
    },
    beneficiaireNamesHandle(e) {
      console.log(
        e.target.getAttribute("itemId"),
        "rang--->",
        e.target.getAttribute("rang"),
        "---->",
        e.target.value
      );
      this.$store.commit("setPanierBeneficiairesNames", {
        _id: e.target.getAttribute("itemId"),
        rang: e.target.getAttribute("rang"),
        value: e.target.value,
      });
    },
  },
};
</script>