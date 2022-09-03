<template>
  <div class="w-full h-full overflow-hidden">
    <!-- admin header -->
    <div
      class="flex justify-between items-center bg-primary text-white px-4 py-1"
    >
      <h1 class="font-bold text-xl">
        Event<span class="text-third">H24</span>
      </h1>
      <div class="flex flex-col items-center gap-1">
        <i class="fa-solid fa-power-off"></i>
        <span class="text-xs">Deconnexion</span>
      </div>
    </div>
    <!-- Admin content -->
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
          <div @click="selectMenu" class="menuItem selected" title="Home">
            <span></span>
            <span></span>
            <i class="fa-solid fa-house text-xl"></i>
            <div v-if="this.rightSideWidth > 16">Home</div>
          </div>
          <div @click="selectMenu" class="menuItem" title="Menu">
            <span></span>
            <span></span>
            <i class="fa-solid fa-bars text-xl"></i>
            <div v-if="this.rightSideWidth > 16">Menu</div>
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
      <div class="w-full bg-white">
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
      mainComponent: "",
    };
  },
  methods: {
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
      if (item.title.toLowerCase().includes("menu"))
        this.mainComponent = "admin-menu";
      else this.mainComponent = "";
    },
    toggleRightSideWidth() {
      if (this.rightSideWidth == 16) this.rightSideWidth = 36;
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