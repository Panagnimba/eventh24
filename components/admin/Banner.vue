<template>
  <div class="w-full h-screen">
    <form
      v-if="!this.isPending"
      @submit.prevent="saveBanner"
      method="post"
      enctype="multipart/form-data"
      class="h-full items-center gap-6 p-6 overflow-auto no-scrollbar"
    >
      <!-- Manage Background -->
      <div
        class="
          w-full
          h-96
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
            @click="uploadBtnClicked('background')"
          >
            Or select file to upload
          </span>
        </div>
      </div>
      <!--  -->
      <!-- Manage Carousel Image -->
      <div class="w-full mt-8" id="items-container">
        <div
          v-for="(item, idx) in this.banner.items"
          class="border grid grid-cols-4 items-center pr-2 mb-6 slide-item"
          :key="idx"
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
              name="itemOrders"
              min="1"
              max="100"
              v-model="item.order"
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
            @click="uploadBtnClicked(idx)"
          >
            <img :src="banner.items[idx].img" alt="" class="w-20 h-16" />
          </div>
          <!-- title -->
          <input
            type="text"
            name="itemtitles"
            placeholder="Le Titre ici"
            required
            v-model="item.title"
            class="h-full outline-none"
          />
          <!-- Save and Remove btns -->
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
              @click="deleteItem(idx)"
              >&times;</i
            >
          </p>
        </div>
      </div>
      <!-- Add New Caroussel Item Btn && Save all changes-->
      <div class="flex justify-end gap-4">
        <div
          @click="addItem"
          class="
            bg-second
            text-white
            font-bold
            rounded-md
            flex
            items-center
            gap-2
            p-2
            px-4
          "
        >
          <i class="fa-solid fa-plus text-xl"></i>
          <span>Ajouter</span>
        </div>
        <!--  -->
        <input
          type="submit"
          class="bg-fourth text-white font-bold p-2 px-4 rounded-md"
          value="Enregistrer"
        />
      </div>
      <!-- File choose input global for all input file -->
      <!-- when clicked to the specifique element that  -->
      <!-- have the uploadBtnClicked method, will be openned -->
      <input
        type="file"
        id="fileChooser"
        accept="image/*"
        hidden
        @change="uploadImage($event)"
      />
    </form>
    <!-- Loader -->
    <loader v-if="this.isPending"></loader>
    <!--  -->
    <!-- Notification component -->
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      :notif="this.notif"
    ></notification-notif>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: {
        bgImage: null,
        items: [
          {
            order: 1,
            img: null,
            title: "",
          },
        ],
      },
      requestHeader: {
        Authorization: `Bearer ${this.$store.state.admin.token}`,
        "Content-Type": "application/json",
      },
      notif: {
        show: false,
        type: "",
        message: "",
      },
      isPending: false,
    };
  },
  async fetch() {
    this.isPending = true;
    //
    let resp = await this.$axios.get("/eventh24/getBanner", {
      headers: this.requestHeader,
    });
    this.isPending = false;
    //
    if (resp.data.success) {
      if (resp.data.result != null) this.banner = resp.data.result;
      else
        this.banner = {
          bgImage: null,
          items: [],
        };

      setTimeout(() => {
        document.querySelector(
          ".banner-wrapper"
        ).style.backgroundImage = `url(${this.banner.bgImage})`;
      }, 0);
      //
    } else {
      this.notif.show = true;
      this.notif.type = "error";
      this.notif.message = resp.data.message;
    }
  },

  methods: {
    // ---------- Gestion upload image -------------//
    uploadBtnClicked(idOfClickedButton) {
      let input = document.querySelector("#fileChooser");
      input.setAttribute("clicked-btn-idx", idOfClickedButton);
      input.click();
    },
    async uploadImage(e) {
      let base64 = await this.generateImageDataUrl(e);
      let btnIdx = e.target.getAttribute("clicked-btn-idx");
      if (btnIdx == "background") {
        document.querySelector(
          ".banner-wrapper"
        ).style.backgroundImage = `url(${base64})`;
        this.banner.bgImage = base64;
      } else {
        this.banner.items[btnIdx].img = base64;
      }
    },
    //------------------------------------------------------//

    deleteItem(id) {
      this.banner.items = this.banner.items.filter(
        (item) => item !== this.banner.items[id]
      );
    },
    async saveBanner() {
      this.isPending = true;
      //
      let resp = await this.$axios.post("/eventh24/saveBanner", this.banner, {
        headers: this.requestHeader,
      });
      this.isPending = false;
      //
      if (resp.data.success) {
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
        //
        setTimeout(() => {
          document.querySelector(
            ".banner-wrapper"
          ).style.backgroundImage = `url(${this.banner.bgImage})`;
        }, 0);
        //
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    },
    // ---------------------------------------------------------//
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

<style scoped>
.banner-wrapper,
.item-upload {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
