<template>
  <div class="w-full h-full">
    <form action="" class="h-full flex flex-col items-center gap-6 p-6">
      <!-- Manage Background -->
      <div
        class="
          w-full
          h-1/2
          flex
          justify-center
          items-center
          gap-2
          px-2
          border-4 border-dashed border-gray-300
          bg-general
          overflow-auto
        "
      >
        <div
          class="h-full banner-wrapper p-2"
          :class="this.img != null ? 'w-full' : 'w-0'"
        ></div>
        <!-- upload form -->
        <div class="h-full flex flex-col justify-center items-center gap-6">
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
        <div class="border grid grid-cols-4 items-center pr-2 mb-4 slide-item">
          <span
            class="
              h-full
              bg-general
              p-2
              font-bold
              justify-self-start
              flex
              items-center
            "
          >
            Element {{ this.itemsCounter }}
          </span>
          <div
            class="
              w-24
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
              @change="alert('jjjj')"
            />
          </div>
          <h4>Concert de floby</h4>
          <i
            class="
              fa-regular fa-circle-check
              text-xl text-fourth
              justify-self-end
            "
          ></i>
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
    };
  },
  methods: {
    uploadBtnClicked(e) {
      let input = e.target.querySelector("input[type='file']");
      setTimeout(() => input.click(), 0);
    },
    async uploadBgImage(e) {
      this.img = await this.generateImageDataUrl(e);
      document.querySelector(
        ".banner-wrapper"
      ).style.backgroundImage = `url(${this.img})`;
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
      this.itemsCounter++;
      let wrapper = document.querySelector("#items-container");
      let div = document.createElement("div");
      div.innerHTML = `<div class="border grid grid-cols-4 items-center pr-2 mb-4 slide-item">
          <span
            class="
              h-full
              bg-general
              p-2
              font-bold
              justify-self-start
              flex
              items-center
            "
          >
            Element ${this.itemsCounter}
          </span>
          <div class="w-24 h-16  border-dashed border-gray-300 border-2 cursor-pointer item-upload">
          </div>
          <h4>Concert de floby</h4>
          <i
            class="
              fa-regular fa-circle-check
              text-xl text-fourth
              justify-self-end
            "
          ></i>
        </div>`;
      wrapper.appendChild(div);
      //

      let items = Array.from(document.querySelectorAll(".slide-item"));
    },
  },
};
</script>


