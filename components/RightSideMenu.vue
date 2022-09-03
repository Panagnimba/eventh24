<template>
  <div
    @click="this.toggleRightSideMenu"
    v-if="this.showRightSideMenu"
    class="h-full w-full fixed top-0 rightSideMenuWrapper"
  >
    <div
      class="
        w-64
        h-screen
        bg-white
        flex flex-col
        gap-2
        pb-4
        rightSideMenu
        overflow-auto
      "
    >
      <!--  -->
      <div
        class="flex justify-between items-center gap-2 bg-second sticky top-0"
      >
        <nuxt-link to="/login">
          <p class="flex gap-3 justify-center items-center m-2">
            <span
              class="
                bg-white
                w-6
                h-6
                p-1
                rounded-full
                flex
                justify-center
                items-center
              "
            >
              <i class="fa-solid fa-user"></i>
            </span>
            <span class="text-white text-sm font-semibold text-center">
              Bonjour, Identifiez-vous
            </span>
          </p>
        </nuxt-link>
        <span
          @click="this.toggleRightSideMenu"
          class="text-white px-0.5 text-3xl bg-third cursor-pointer"
        >
          &times;
        </span>
      </div>
      <!--  -->
      <h2 class="font-bold px-4">Menu</h2>
      <!--  -->
      <ul class="text-md text-black">
        <nuxt-link to="">
          <li class="px-4 py-2 hover:bg-gray-100">Concerts</li>
        </nuxt-link>
        <nuxt-link to="">
          <li class="px-4 py-2 hover:bg-gray-100">Festivals</li>
        </nuxt-link>
        <nuxt-link to="">
          <li class="px-4 py-2 hover:bg-gray-100">Musiques</li>
        </nuxt-link>
        <nuxt-link to="">
          <li class="px-4 py-2 hover:bg-gray-100">Sports</li>
        </nuxt-link>
      </ul>
      <!--  -->
      <h2 class="font-bold px-4">Magazine</h2>
      <!--  -->
      <ul class="text-md text-black">
        <nuxt-link to="">
          <li class="px-4 py-2 hover:bg-gray-100">Concerts</li>
        </nuxt-link>
        <nuxt-link to="">
          <li class="px-4 py-2 hover:bg-gray-100">Festivals</li>
        </nuxt-link>
        <nuxt-link to="">
          <li class="px-4 py-2 hover:bg-gray-100">Musiques</li>
        </nuxt-link>
        <nuxt-link to="">
          <li class="px-4 py-2 hover:bg-gray-100">Sports</li>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showRightSideMenu() {
      return this.$store.state.showRightSideMenu;
    },
  },
  methods: {
    toggleRightSideMenu() {
      this.$store.commit("toggleRightSideMenu");
    },
  },
};
</script>

<style scoped>
.rightSideMenuWrapper {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  transition: all 2s;
}
.rightSideMenu {
  animation: slide 0.15s ease-in-out forwards;
  transform: translateX(-200px);
}
@keyframes slide {
  0% {
    transform: translateX(-200px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>