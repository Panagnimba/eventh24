<template>
  <div class="container bg-second flex gap-2 justify-between items-center py-1">
    <div class="w-1/4 flex justify-start gap-2 items-center text-white">
      <nuxt-link to="/">
        <h1 class="font-bold text-md xl:text-xl">
          Event<span class="text-third">H24</span>
        </h1>
      </nuxt-link>
    </div>
    <!--  -->
    <form
      action=""
      method="post"
      @submit.prevent="searchHandle"
      class="flex h-8 rounded-xl duration-300"
      :class="this.showSearchBox ? 'w-full border' : 'w-0'"
    >
      <div
        v-if="this.showSearchBox"
        class="
          p-4
          relative
          overflow-hidden
          bg-gray-200
          hover:bg-gray-300
          cursor-pointer
          flex
          justify-center
          items-center
          gap-2
          rounded-tl-xl rounded-bl-xl
        "
      >
        <span id="span">{{ categorie }} </span>
        <span><i class="fa-solid fa-caret-down text-sm"></i></span>
        <select
          name="categorie"
          class="
            absolute
            left-0
            bg-transparent
            text-transparent
            outline-none
            cursor-pointer
          "
          v-model="categorie"
        >
          <!-- default option -->
          <option class="text-black" value="All">All</option>
          <!--  -->
          <option
            class="text-black"
            v-for="(elmt, k) in this.menuList"
            :key="k"
            :value="elmt.name"
          >
            {{ elmt.name }}
          </option>
        </select>
      </div>

      <div class="w-full" v-if="this.showSearchBox">
        <input
          type="search"
          name="searchInput"
          required
          placeholder="Rechercher un évènement"
          class="px-2 border w-full h-full outline-none"
          id="searchInput"
          v-model="searchText"
        />
      </div>

      <div
        @click="displaySearchBox"
        class="
          w-8
          bg-third
          text-white
          flex
          justify-center
          items-center
          p-1.5
          cursor-pointer
          rounded-tr-xl rounded-br-xl
        "
        :class="!this.showSearchBox ? 'rounded-xl' : ''"
      >
        <i class="fa-solid fa-magnifying-glass text-xl"></i>
      </div>
    </form>
    <!--  -->
    <div class="w-1/4 flex justify-end text-white">
      <nuxt-link to="/login">
        <div class="flex flex-col items-center">
          <i class="fa-solid fa-user text-xl"></i>
          <span class="text-xs">Connexion</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categorie: "All",
      searchText: "",
      menuList: [],
      showSearchBox: true,
    };
  },
  mounted() {
    if (window.innerWidth >= 200 && window.innerWidth <= 600) {
      this.showSearchBox = false;
    }
  },
  async fetch() {
    let resp = await this.$axios.get("/getMenus");
    if (resp.data.success) this.menuList = resp.data.result;
  },
  methods: {
    displaySearchBox() {
      let searchInput = document.querySelector("#searchInput");
      if (this.showSearchBox && searchInput.value != "") {
        // Filter based on the search input
        this.searchHandle();
      }
      this.showSearchBox = !this.showSearchBox;
    },
    searchHandle() {
      this.$emit("filter", {
        categorie: this.categorie,
        searchText: this.searchText,
      });
      this.searchText = "";
      this.$router.push("/");
    },
  },
};
</script>
