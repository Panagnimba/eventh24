<template>
  <nav
    class="
      container
      bg-primary
      text-white
      flex
      gap-3
      justify-between
      items-center
      px-2
    "
  >
    <!-- Menu icon -->
    <div
      @click="toggleRightSideMenu"
      class="flex flex-col items-center cursor-pointer"
    >
      <i class="fa-solid fa-bars text-xl"></i>
      <span class="text-xs">Menu</span>
    </div>
    <!-- menu items -->
    <ul
      class="w-full flex flex-wra justify-evenly gap-4 py-2 px-2 overflow-auto"
    >
      <li v-for="(menu, id) in this.menuList" :key="id" @click="selectMenu">
        <nuxt-link to="" class="menu-items">{{ menu.name }}</nuxt-link>
      </li>
    </ul>
    <!-- cart -->
    <nuxt-link
      to="/panier"
      class="relative flex items-center gap-2 p-1 border rounded cursor-pointer"
    >
      <i class="fa-solid fa-cart-shopping"></i>
      <span>Panier</span>
      <span
        class="
          absolute
          -right-2
          -top-2.5
          bg-third
          text-white
          p-2
          rounded-full
          w-5
          h-5
          flex
          justify-center
          items-center
        "
        >3</span
      >
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
    };
  },
  async fetch() {
    let resp = await this.$axios.get("/getMenus");
    if (resp.data.success) this.menuList = resp.data.result;
  },
  methods: {
    toggleRightSideMenu() {
      this.$store.commit("toggleRightSideMenu");
    },

    selectMenu(e) {
      let clickedMenu;
      if (e.target.classList.contains("menu-items")) clickedMenu = e.target;
      else clickedMenu = e.target.parentNode;
      //
      let menus = document.querySelectorAll(".menu-items");
      menus.forEach((item) => {
        if (item == clickedMenu) {
          clickedMenu.classList.add("current-menu");
        } else item.classList.remove("current-menu");
      });
    },
  },
};
</script>

<style scoped>
.current-menu {
  border-bottom: 2px solid red;
}
</style>