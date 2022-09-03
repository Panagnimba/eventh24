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
      <li>Accueil</li>
      <li>Concerts</li>
      <li>Festivals</li>
      <li>Cérémonies</li>
      <li>Concerts</li>
      <li>Festivals</li>
      <li>Cérémonies</li>
      <li>Concerts</li>
      <li>Festivals</li>
      <li>Cérémonies</li>
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
  methods: {
    toggleRightSideMenu() {
      this.$store.commit("toggleRightSideMenu");
    },
  },
};
</script>