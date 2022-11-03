<template>
  <div
    @click="this.toggleRightSideMenu"
    v-if="this.showRightSideMenu"
    class="h-full w-full fixed top-0 rightSideMenuWrapper"
  >
    <div
      class="
        w-60
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
              Bonjour,
              {{
                this.$store.state.user.prenom.length > 0
                  ? this.$store.state.user.prenom
                  : "Identifiez-vous"
              }}
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
        <nuxt-link to="" v-for="(menu, id) in this.menuList" :key="id">
          <li class="px-4 py-2 hover:bg-gray-100">{{ menu.name }}</li>
        </nuxt-link>
      </ul>
      <!--  -->
      <h2 class="font-bold px-4">Magazine</h2>
      <!--  -->
      <ul class="text-md text-black">
        <nuxt-link to="" v-for="(menu, id) in this.menuList" :key="id">
          <li class="px-4 py-2 hover:bg-gray-100">{{ menu.name }}</li>
        </nuxt-link>
      </ul>
      <!--  -->
      <h2 class="font-bold px-4">Mon compte</h2>
      <div
        @click="getMyCommandes"
        class="
          px-4
          py-2
          flex
          items-center
          gap-4
          text-md
          cursor-pointer
          hover:bg-gray-100
        "
      >
        <i class="fa-solid fa-file-invoice"></i>
        <span>Mes commandes</span>
      </div>
      <div
        class="
          px-4
          py-2
          flex
          items-center
          gap-4
          text-md
          cursor-pointer
          hover:bg-gray-100
        "
        @click="deconnexion"
      >
        <i class="fa-solid fa-power-off"></i>
        <span>Deconnexion</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  date() {
    return {
      menuList: [],
    };
  },
  computed: {
    showRightSideMenu() {
      return this.$store.state.showRightSideMenu;
    },
  },
  methods: {
    toggleRightSideMenu() {
      this.$store.commit("toggleRightSideMenu");
    },
    deconnexion() {
      let notAuthUser = {
        _id: "",
        prenom: "",
        tel: "",
        token: null,
      };
      this.$store.commit("authenticateUser", notAuthUser);
      // set redirect_url cookie
      var date = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10mn
      let expires = "; expires=" + date.toUTCString();
      document.cookie =
        "redirect_url" + "=" + ("/" || "/") + expires + "; path=/";
      //
      this.$router.push("/login");
    },
    getMyCommandes() {
      if (this.$store.state.user.token) {
        this.$router.push("/commande/mescommandes");
      } else {
        // set redirect_url cookie
        var date = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10mn
        let expires = "; expires=" + date.toUTCString();
        document.cookie =
          "redirect_url" +
          "=" +
          ("/commande/mescommandes" || "/") +
          expires +
          "; path=/";
        //
        this.$store.commit("toggleLoginPopup", true);
      }
    },
  },
  async fetch() {
    let resp = await this.$axios.get("/getMenus");
    if (resp.data.success) this.menuList = resp.data.result;
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