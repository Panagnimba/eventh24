<template>
  <div class="w-full h-full overflow-hidden">
    <!-- partner header -->
    <div
      class="flex justify-between items-center bg-primary text-white px-4 py-1"
    >
      <nuxt-link to="/" class="font-bold text-xl">
        Vino<span class="text-third">Ticket</span>
        <!-- <img src="/logo.png" class="w-12" /> -->
      </nuxt-link>
      <div
        @click="deconnexion"
        class="flex flex-col items-center gap-1 cursor-pointer"
      >
        <i class="fa-solid fa-power-off"></i>
        <span class="text-xs">Deconnexion</span>
      </div>
    </div>
    <!-- Partner content -->
    <div class="w-full flex">
      <!-- left side menu -->
      <div
        :class="`w-${this.rightSideWidth}`"
        class="
          duration-300
          h-screen
          bg-second
          text-white
          py-2
          flex flex-col
          gap-4
          items-center
          justify-between
          overflow-auto
          no-scrollbar
        "
      >
        <!-- Menu -->
        <div class="w-full flex flex-col gap-6 justify-evenly text-lg">
          <p class="text-sm px-4">
            <i class="fa-solid fa-bars" @click="toggleRightSideWidth()"></i>
          </p>
          <div @click="selectMenu" class="menuItem selected" title="Scanner">
            <span></span>
            <span></span>
            <i class="fa-solid fa-camera text-xl"></i>
            <div v-if="this.rightSideWidth > 16">Scanner</div>
          </div>

          <div @click="selectMenu" class="menuItem" title="Vente">
            <span></span>
            <span></span>
            <i class="fa-solid fa-chart-pie text-xl"></i>
            <div v-if="this.rightSideWidth > 16">Vente</div>
          </div>
          <div @click="selectMenu" class="menuItem" title="Scannage">
            <span></span>
            <span></span>
            <i class="fa-solid fa-chart-simple text-xl"></i>
            <div v-if="this.rightSideWidth > 16">Scannage</div>
          </div>
        </div>

        <!-- Settings -->
        <div @click="selectMenu" class="menuItem">
          <span></span>
          <span></span>
          <i class="fa-solid fa-gear"></i>
          <div v-if="this.rightSideWidth > 16">Settings</div>
        </div>
      </div>
      <!-- Main content -->
      <div class="w-full h-screen bg-white overflow-auto no-scrollbar">
        <component :is="this.mainComponent" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightSideWidth: 16,
      mainComponent: "partner-scanner",
    };
  },
  computed: {
    requestHeader() {
      return {
        Authorization: `Bearer ${this.$store.state.partner.token}`,
        "Content-Type": "application/json",
      };
    },
  },
  mounted() {
    setTimeout(async () => {
      let resp1 = await this.$axios.get("/partner/getAuthenticate", {
        headers: this.requestHeader,
      });
      if (resp1.data.isNotAuth) {
        this.$router.push("/partner/login");
      }
    }, 2000);
  },
  methods: {
    deconnexion() {
      let auth = {
        isAuthenticated: false,
        token: null,
      };
      //commit state to logout admin
      this.$store.commit("authenticatePartner", auth);
      this.$router.push("/partner/login");
    },
    selectMenu(e) {
      let clickedMenu;
      if (e.target.classList.contains("menuItem")) clickedMenu = e.target;
      else clickedMenu = e.target.parentNode;
      //
      let menus = document.querySelectorAll(".menuItem");
      menus.forEach((item) => {
        if (item == clickedMenu) {
          clickedMenu.classList.add("selected");
          this.displayMainComponent(clickedMenu);
        } else item.classList.remove("selected");
      });
    },
    displayMainComponent(item) {
      if (item.title.toLowerCase().includes("scanner"))
        this.mainComponent = "partner-scanner";
      else if (item.title.toLowerCase().includes("vente"))
        this.mainComponent = "partner-graphics-pie";
      else if (item.title.toLowerCase().includes("scannage"))
        this.mainComponent = "partner-graphics-column";
      else this.mainComponent = "";
    },
    toggleRightSideWidth() {
      if (this.rightSideWidth == 16) this.rightSideWidth = 52;
      else this.rightSideWidth = 16;
    },
  },
};
</script>

<style scoped>
.menuItem {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px 15px;
  padding-top: 5px;
  padding-right: 15px;
  font-weight: 550;
  cursor: pointer;
  border-radius: 15px 0px 0px 15px;
  /*  */
  position: relative;
}

/* menu hover curved style */
.menuItem span:nth-child(1) {
  width: 20px;
  height: 15px;
  position: absolute;
  top: -15px;
  right: 0;
}
.menuItem span:nth-child(2) {
  width: 20px;
  height: 15px;
  position: absolute;
  bottom: -15px;
  right: 0;
}

.menuItem span:nth-child(1)::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  border-bottom-right-radius: 20px;
  right: 0;
  background-color: var(--second);
}

.menuItem span:nth-child(2)::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  border-top-right-radius: 30px;
  right: 0;
  background-color: var(--second);
}
/* Hover and selected menu item */
.menuItem:hover {
  color: black;
  background-color: white;
}
.selected {
  background-color: white;
  color: black;
}
.menuItem:hover span:nth-child(1),
.menuItem:hover span:nth-child(2) {
  background-color: white;
}
.selected span:nth-child(1),
.selected span:nth-child(2) {
  background-color: white;
}
</style>