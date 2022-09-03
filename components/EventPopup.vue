<template>
  <div
    v-if="this.showEventPopup"
    class="
      w-full
      h-screen
      fixed
      top-0
      z-50
      flex
      justify-center
      items-center
      eventPopup
      overflow-auto
    "
  >
    <div class="w-full sm:w-2/3 bg-white relative flex items-center p-6 mx-4">
      <!-- close btn -->
      <span
        @click="this.toggleEventPopup"
        class="
          text-3xl text-white
          bg-third
          absolute
          top-0
          right-0
          px-2
          cursor-pointer
        "
      >
        &times;
      </span>
      <!--  -->
      <div class="w-full grid grid-cols-1 gap-4 lg:grid-cols-2 mt-6">
        <div class="w-full h-60">
          <img src="/concert1.png" alt="Event Image" class="w-full h-full" />
        </div>
        <div class="w-full h-full flex flex-col gap-4 justify-between">
          <h1 class="text-xl text-second text-center font-bold">
            Kundé des artistes Burkinabè
          </h1>
          <table class="border h-24">
            <thead class="bg-gray-100">
              <tr>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody class="font-bold text-center">
              <tr>
                <td>200 fcfa</td>
                <td>1</td>
                <td>400 fcfa</td>
              </tr>
            </tbody>
          </table>
          <!-- Les deux buttons -->
          <div class="flex gap-4">
            <div
              @click="this.toggleEventPopup"
              class="
                w-full
                text-center text-white text-xs
                sm:text-sm
                bg-second
                font-semibold
                px-2
                py-1
                rounded-xl
                flex
                justify-center
                items-center
              "
            >
              <nuxt-link to="/" class="w-full">
                Poursuivre mes achats
              </nuxt-link>
            </div>
            <div
              @click="this.toggleEventPopup"
              class="
                w-full
                text-center text-white text-xs
                sm:text-sm
                bg-third
                font-semibold
                px-2
                py-1
                rounded-xl
                flex
                justify-center
                items-center
              "
            >
              <nuxt-link to="/commande" class="w-full">
                Finaliser mon achat
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showEventPopup() {
      return this.$store.state.showEventPopup;
    },
  },
  methods: {
    toggleEventPopup() {
      this.$store.commit("toggleEventPopup", false);
    },
  },
};
</script>

<style scoped>
.eventPopup {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
}
</style>