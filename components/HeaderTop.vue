<template>
  <div class="container bg-second flex gap-2 justify-between py-1">
    <div class="w-1/3 flex justify-center gap-2 items-center text-white">
      <nuxt-link to="/">
        <h1 class="font-bold text-xl">
          Event<span class="text-third">H24</span>
        </h1>
      </nuxt-link>
    </div>
    <!--  -->
    <form action="" class="flex w-2/3 h-10 border rounded-xl">
      <div
        class="
          relative
          overflow-hidden
          bg-gray-200
          hover:bg-gray-300
          p-4
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
            h-full
            left-0
            bg-transparent
            text-transparent
            outline-none
            cursor-pointer
          "
          @change="chooseCategorie"
        >
          <option value="All" id="select" class="text-black">All</option>
          <option value="Music" class="text-black">Music</option>
          <option value="Musicoppp" class="text-black">Music oppp</option>
          <option value="Musicopppoppphhh" class="text-black">
            Music oppp oppp hhh
          </option>
        </select>
      </div>

      <div class="w-full">
        <input
          type="search"
          name="searchInput"
          placeholder="Rechercher un évènement"
          class="px-2 border w-full h-full outline-none"
        />
      </div>

      <div
        class="
          w-12
          bg-third
          text-white
          flex
          justify-center
          items-center
          p-1.5
          cursor-pointer
          rounded-tr-xl rounded-br-xl
        "
      >
        <i class="fa-solid fa-magnifying-glass text-xl"></i>
      </div>
    </form>
    <!--  -->
    <div class="w-1/3 flex justify-end text-white">
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
    };
  },
  methods: {
    chooseCategorie(e) {
      this.categorie = e.target.value;
    },
  },
};
</script>
