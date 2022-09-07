<template>
  <div class="w-full h-full">
    <form action="" class="h-full flex flex-col items-center gap-6 p-6">
      <!-- Manage Background -->
      <div
        class="
          w-full
          h-1/2
          flex flex-wrap
          justify-center
          items-center
          sm:flex-nowrap
          gap-2
          px-2
          border-4 border-dashed border-gray-300
          bg-general
          overflow-auto
        "
      >
        <div
          class="banner-wrapper p-2"
          :class="this.banner.bgImage != null ? 'w-full h-full' : 'w-0 h-0'"
        ></div>
        <!-- upload form -->
        <div class="w-full sm:w-1/3 h-full col gap-6">
          <i class="fa-solid fa-cloud-arrow-up text-6xl text-primary"></i>
          <p class="text-center text-sm">Drag and Drop here to upload</p>
          <span
            class="
              px-2
              py-1
              border-2 border-gray-300 border-dashed
              cursor-pointer
              hover:bg-gray-200
              text-center text-sm
            "
            @click="uploadBtnClicked"
          >
            Or select file to upload
            <input
              type="file"
              accept="image/*"
              hidden
              @change="uploadBgImage($event)"
            />
          </span>
        </div>
        <!--  -->
      </div>
      <!--  -->
      <!-- Manage Carousel Image -->
      <div class="w-full h-1/2 overflow-auto" id="items-container">
        <div
          class="border grid grid-cols-4 items-center pr-2 mb-6 slide-item"
          v-for="(item, i) in this.banner.items"
          :key="i"
        >
          <span
            class="
              h-full
              bg-general
              p-2
              font-bold
              justify-self-start
              flex
              items-center
              gap-1
              text-xs text-center
            "
          >
            Element
            <input
              type="number"
              min="1"
              max="100"
              v-model="item.order"
              @change="chang"
              class="w-8 outline-none bg-transparent text-center"
            />
          </span>
          <div
            class="
              w-20
              h-16
              border-2 border-dashed border-gray-300
              cursor-pointer
              item-upload
            "
            @click="uploadBtnClicked"
          >
            <input
              type="file"
              accept="image/*"
              hidden
              required
              @change="uploadItemImage($event)"
            />
          </div>
          <!-- title -->
          <input
            type="text"
            placeholder="Le Titre ici"
            required
            v-model="item.title"
            @change="chang"
            class="h-full outline-none"
          />
          <p class="justify-self-end flex items-center gap-2">
            <!-- save -->
            <i
              class="
                fa-regular fa-circle-check
                text-xl text-fourth
                p-1
                cursor-pointer
              "
            ></i>
            <!-- delete -->
            <i
              class="text-4xl text-third p-1 cursor-pointer"
              @click="deleteItem(i)"
              >&times;</i
            >
          </p>
        </div>
      </div>
      <!-- Add New Caroussel Item Btn -->
      <div
        @click="addItem"
        class="
          w-full
          border
          flex
          gap-4
          justify-center
          items-center
          bg-second
          text-white
          rounded-xl
          font-bold
          cursor-pointer
        "
      >
        <i class="fa-solid fa-plus text-2xl"></i>
        <span class="text-lg">Ajouter</span>
      </div>
    </form>
  </div>
</template>
<style scoped>
.banner-wrapper,
.item-upload {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
<script>
export default {
  data() {
    return {
      img: null,
      itemsCounter: 1,
      banner: {
        bgImage: null,
        items: [
          {
            order: 1,
            img: null,
            title: "",
          },
          {
            order: 2,
            img: null,
            title: "",
          },
        ],
      },
    };
  },
  methods: {
    chang() {
      console.log(this.banner.items);
    },
    deleteItem(id) {
      console.log(id);
      this.banner.items = this.banner.items.filter(
        (item) => item != this.banner.items[id]
      );
    },
    uploadBtnClicked(e) {
      let input = e.target.querySelector("input[type='file']");
      setTimeout(() => input.click(), 0);
    },
    async uploadBgImage(e) {
      this.banner.bgImage = await this.generateImageDataUrl(e);
      document.querySelector(
        ".banner-wrapper"
      ).style.backgroundImage = `url(${this.banner.bgImage})`;
    },
    async uploadItemImage(fileInput) {
      let img = await this.generateImageDataUrl(fileInput);
      fileInput.target.parentNode.style.backgroundImage = `url(${img})`;
    },

    async generateImageDataUrl(e) {
      let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(e.target.files[0]);
      });

      return result_base64;
    },
    //
    addItem() {
      let newItem = {
        order: this.banner.items.length + 1,
        img: null,
        title: "",
      };
      this.banner.items.push(newItem);
      //
    },
  },
};
</script>


