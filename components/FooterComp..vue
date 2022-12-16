<template>
  <div class="bg-second p-4 mt-8 relative">
    <div
      class="
        grid grid-cols-1
        content-between
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <!--  col 1-->
      <div class="flex flex-col gap-3 items-center">
        <h1 class="text-xl font-bold text-gray-300">VINOTICKET SARL</h1>
        <p class="text-justify text-gray-500">
          Est une plateforme de billetterie nouvelle génération vous offrant la
          possibilité d’acheter depuis votre téléphone vos tickets d’évènements.
          Sa vocation est de vous faciliter la vie en vous évitant les
          déplacements et les longues files d’attente. La plateforme vous propose
          des ticket d’évènement de votre choix allant du sport, du cinéma, dès
          concerts à l’humour et aux festival... VINOTICKET SARL, Révolutionner
          l’événementiel!
        </p>
      </div>
      <!-- col 2 -->
      <div class="flex flex-col gap-3 items-center">
        <h3 class="text-xl font-bold text-gray-300">LIENS UTILES</h3>
        <div
          class="
            grid grid-cols-2
            content-evenly
            justify-items-center
            gap-4
            w-full
            h-full
            text-gray-500
          "
        >
          <a href="https://siao.bf/" target="_blank">SIAO</a>
          <a href="https://www.ontb.bf/evenements/nak" target="_blank">NAK</a>
          <a href="https://www.ontb.bf/evenements/snc" target="_blank">SNC</a>

          <a href="https://www.burkina24.com/" target="_blank">Burkina24</a>
        </div>
      </div>
      <!-- col 3 -->
      <div class="flex flex-col gap-3 items-center">
        <h3 class="text-xl font-bold text-gray-300">LIENS UTILES</h3>
        <div
          class="
            grid grid-cols-2
            content-evenly
            justify-items-center
            gap-4
            w-full
            h-full
            text-gray-500
          "
        >
          <nuxt-link to="">Histoire</nuxt-link>
          <nuxt-link to="">Nous contacter</nuxt-link>
          <nuxt-link to="">Magasine</nuxt-link>
          <nuxt-link to="">Mentions légales</nuxt-link>
        </div>
      </div>

      <!-- col 4-->
      <div class="flex flex-col gap-3 items-center">
        <h3 class="text-xl font-bold text-gray-300">Newsletter</h3>
        <div class="flex flex-col justify-evenly gap-4 h-full text-gray-500">
          <p class="text-gray-500 text-justify">
            Inscrivez-vous à notre newsletter pour ne rien rater des meilleurs
            plans, spectacles, concerts,...
          </p>
          <form
            @submit.prevent="subscribeTonewsletter"
            class="w-full h-12 flex bg-gray-600 p-1 rounded"
          >
            <input
              type="email"
              name="email"
              v-model="email"
              required
              placeholder="Adresse email"
              class="w-2/3 px-4 outline-none"
            />
            <div class="w-1/3 bg-gray-600 text-white font-bold">
              <input
                v-if="!this.isPending"
                type="submit"
                value="S'inscrire"
                class="
                  w-full
                  h-full
                  bg-gray-600
                  hover:bg-gray-700
                  text-white
                  font-bold
                  cursor-pointer
                "
              />
              <div
                v-else
                class="w-full h-full flex justify-center items-center"
              >
                <i class="fa-solid fa-spinner text-2xl text-white animate-spin">
                </i>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="text-xs text-center pt-8 text-gray-400">
      &copy; Tous droits reservés VinoTicket 2022
    </div>
    <!-- small popup to display when user fill newsletter form-->
    <div class="Popup" v-if="this.pop.show">
      <div class="PopupContent rounded-xl">
        <span class="closeBtn rounded-tr-xl" @click="closePop">&times;</span>
        <span :class="this.pop.success ? 'success' : 'error'">{{
          this.pop.text
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPending: false,
      pop: {
        show: false,
        text: "",
        success: true,
      },
      email: "",
    };
  },
  methods: {
    async subscribeTonewsletter() {
      this.isPending = true;
      let resp = await this.$axios.post("/saveNewsletter", {
        email: this.email,
      });
      this.email = "";
      this.pop.text = resp.data.message;
      this.pop.success = resp.data.success;
      this.pop.show = true;
      this.isPending = false;
      setTimeout(() => {
        this.pop.show = false;
      }, 2000);
    },
    closePop() {
      this.showPop = false;
    },
  },
};
</script>

<style scoped>
.Popup {
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 200px;
  height: 100px;
  z-index: 100;
  transition: all 2s;
}
.PopupContent {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  animation: slide 0.15s ease-in-out forwards;
}
@keyframes slide {
  0% {
    transform: translateY(200px);
    width: 10px;
    height: 10px;
  }
  100% {
    transform: translateY(-20px);
    width: 200px;
    height: 100px;
  }
}
.closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--third);
  color: white;
  padding: 0px 8px;
  cursor: pointer;
}
.success {
  color: green;
  font-size: 16px;
  font: bold;
}
.error {
  color: red;
  font-size: 16px;
  font: bold;
}
</style>