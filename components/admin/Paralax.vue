<template>
  <div class="w-full h-full">
    <div v-if="!this.isPending">
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
          class="paralax-wrapper p-2"
          :class="this.paralax.bgImage != null ? 'w-full h-full' : 'w-0 h-0'"
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
      </div>
      <!--  -->
      <Editor
        v-model="paralax.textContent"
        api-key="kcjxbyyy3jp0zijxy5or1619nxx6le3lnlblhcba7lio3nnz"
        :init="{
          height: 300,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
        }"
      />
      <!-- Save button -->
      <div class="text-right">
        <button
          @click="saveParalax"
          class="bg-second text-white font-bold p-2 px-5 rounded-md m-5"
        >
          Enregistrer
        </button>
      </div>
    </div>
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
import Editor from "@tinymce/tinymce-vue";
export default {
  components: { Editor },
  data() {
    return {
      isPending: false, // Loader
      paralax: {
        bgImage: null,
        textContent: "",
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
    };
  },

  async fetch() {
    this.isPending = true;
    let resp = await this.$axios.get("/eventh24/getParalax", {
      headers: this.requestHeader,
    });
    this.isPending = false;
    //
    if (resp.data.success) {
      if (resp.data.result != null) this.paralax = resp.data.result;
      //
      setTimeout(() => {
        document.querySelector(
          ".paralax-wrapper"
        ).style.backgroundImage = `url(${this.paralax.bgImage})`;
      }, 0);
      //
    } else {
      this.notif.show = true;
      this.notif.type = "error";
      this.notif.message = resp.data.message;
    }
    //
  },
  methods: {
    async saveParalax() {
      this.isPending = true;
      //
      let resp = await this.$axios.post("/eventh24/saveParalax", this.paralax, {
        headers: this.requestHeader,
      });
      this.isPending = false;
      //
      //
      setTimeout(() => {
        document.querySelector(
          ".paralax-wrapper"
        ).style.backgroundImage = `url(${this.paralax.bgImage})`;
      }, 0);
      //
      if (resp.data.success) {
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    },
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
          ".paralax-wrapper"
        ).style.backgroundImage = `url(${base64})`;
        this.paralax.bgImage = base64;
      }
    },
    //------------------------------------------------------//
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
  },
};
</script>

<style scoped>
.paralax-wrapper {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>