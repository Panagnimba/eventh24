<template>
  <div class="w-full h-full overflow-auto no-scrollbar py-4">
    <loader v-show="this.isPending"></loader>
    <div v-show="!this.isPending">
      <h3 class="text-second font-bold text-center">
        {{ this.conf.titleText }}
      </h3>
      <form
        method="post"
        @submit.prevent="saveNewEvent"
        class="m-6 flex flex-col gap-6"
      >
        <!-- Manage Event image -->
        <fieldset
          class="
            w-full
            h-96
            flex flex-wrap
            justify-center
            items-center
            sm:flex-nowrap
            gap-2
            p-2
            border-4 border-dashed border-gray-300
            bg-general
            overflow-auto
            text-center
          "
        >
          <div
            class="image-wrapper p-2 object-cover"
            :class="this.event.img != null ? 'w-full h-full' : 'w-0 h-0 hidden'"
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
        </fieldset>
        <!-- Globals Categorie,Artiste,Intitulé -->
        <fieldset class="w-full border border-gray-300 p-2 pb-4">
          <legend class="text-second font-bold text-center">Globals</legend>
          <div class="w-full h-full col gap-2">
            <div class="row gap-2 h-14">
              <!-- categorie et nom de l'artiste -->
              <!-- categorie -->
              <div class="col w-full">
                <span class="text-xs text-gray-400 self-start p-1"
                  >Categorie</span
                >
                <select
                  name="categorie"
                  v-model="event.categorie"
                  required
                  class="w-full h-full border outline-none px-2 rounded-md"
                >
                  <option value="Concerts" disabled>Catégorie</option>
                  <option
                    :value="catg.name"
                    v-for="(catg, i) in this.categories"
                    :key="i"
                  >
                    {{ catg.name }}
                  </option>
                </select>
              </div>
              <!-- Artiste -->
              <div class="col w-full">
                <span class="text-xs self-start text-gray-400 p-1"
                  >Artiste</span
                >
                <input
                  type="text"
                  v-model="event.artiste"
                  required
                  name="artiste"
                  placeholder="Nom de l'artiste"
                  class="w-full h-full outline-none border px-2 rounded-md"
                />
              </div>
            </div>
            <!-- intitulé et lieu de l'évènement -->
            <div class="row gap-2 h-14">
              <!-- intitule -->
              <div class="col w-full">
                <span class="text-xs self-start text-gray-400 p-1"
                  >Intitulé</span
                >
                <input
                  type="text"
                  v-model="event.intitule"
                  required
                  name="intitule"
                  placeholder="Intitulé de l'évènement"
                  class="w-full h-full outline-none border px-2 rounded-md"
                />
              </div>
              <!-- lieu -->
              <div class="col w-full">
                <span class="text-xs text-gray-400 self-start p-1">Lieu</span>
                <input
                  type="text"
                  name="lieu"
                  required
                  v-model="event.lieu"
                  placeholder="Lieu de l'évènement"
                  class="w-full h-full outline-none border px-2 rounded-md"
                />
              </div>
            </div>
          </div>
        </fieldset>
        <!-- Dates -->
        <fieldset class="w-full border border-gray-300 p-2">
          <legend class="text-second font-bold text-center">Dates</legend>
          <div class="w-full row gap-2 flex-wrap sm:flex-nowrap">
            <div class="col w-full">
              <span class="text-xs text-gray-400 self-start p-1"
                >Date de l'évènement</span
              >
              <input
                type="datetime-local"
                v-model="event.date"
                required
                name="intitule"
                placeholder="Date de l'évènement"
                class="w-full h-full outline-none border px-2 rounded-md"
              />
            </div>
            <div class="col w-full">
              <span class="text-xs text-gray-400 self-start p-1"
                >Ouvertures des portes</span
              >
              <input
                type="time"
                v-model="event.openTime"
                required
                name="intitule"
                placeholder="Date de l'évènement"
                class="w-full h-full outline-none border px-2 rounded-md"
              />
            </div>
          </div>
        </fieldset>
        <!-- Types et Prix -->
        <fieldset class="w-full border border-gray-300 p-2">
          <legend class="text-second font-bold text-center">Prix</legend>
          <div class="w-full col gap-3">
            <div
              class="row gap-2 h-10"
              v-for="(item, idx) in this.event.prices"
              :key="idx"
            >
              <!-- types -->
              <select
                name="type"
                v-model="item.type"
                required
                class="w-full h-full border outline-none px-2 rounded-md"
              >
                <option value="Normal" selected>Normal</option>
                <option value="Moyen">Moyen</option>
                <option value="Couple">Couple</option>
                <option value="VIP">VIP</option>
              </select>
              <!-- prix -->
              <input
                type="number"
                v-model="item.price"
                required
                min="100"
                step="100"
                name="prix"
                placeholder="Prix de l'évènement"
                class="w-full h-full outline-none border px-2 rounded-md"
              />
              <!-- Remove Prix item btn -->
              <p class="">
                <i
                  class="text-4xl text-third p-1 cursor-pointer"
                  @click="deletePrix(idx)"
                  >&times;</i
                >
              </p>
            </div>
            <div class="row h-10">
              <div
                @click="addPrix"
                class="
                  bg-second
                  text-white
                  font-bold
                  rounded-md
                  px-4
                  text-sm
                  cursor-pointer
                "
              >
                <i class="fa-solid fa-plus"></i>
                <span>Ajouter</span>
              </div>
            </div>
          </div>
        </fieldset>
        <!-- Description of event -->
        <fieldset class="w-full border border-gray-300 p-2 overflow-hidden">
          <legend class="text-second font-bold text-center">Description</legend>
          <Editor
            v-model="event.description"
            class="w-full"
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
        </fieldset>
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
        <!--  -->
        <!--  -->
        <input
          type="submit"
          class="
            bg-second
            text-white
            font-bold
            p-2
            px-4
            rounded-md
            cursor-pointer
          "
          :value="this.conf.submitText"
        />
      </form>
    </div>
    <!--  -->
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      :notif="this.notif"
    >
    </notification-notif>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: { Editor },
  props: {
    confProp: Object,
    eventProp: Object,
  },
  watch: {
    eventProp(propChange, old) {
      this.event = propChange;
    },
  },
  data() {
    return {
      //
      isPending: false, // loader controller
      // // affectation du props a event data
      event: this.eventProp,
      conf: this.confProp,
      //
      notif: {
        show: false,
        type: "",
        message: "",
      },

      categories: [], // get the list of all menus
      requestHeader: {
        Authorization: `Bearer ${this.$store.state.admin.token}`,
        "Content-Type": "application/json",
      },
    };
  },
  async fetch() {
    this.isPending = true;
    let resp = await this.$axios.get("/eventh24/getMenus", {
      headers: this.requestHeader,
    });
    this.isPending = false;
    if (resp.data.success) this.categories = resp.data.result;
    else {
      this.notif.show = true;
      this.notif.type = "error";
      this.notif.message = resp.data.message;
    }
  },
  mounted() {
    // // affectation du props a event data
    // this.event = this.eventProp;

    document.querySelector(
      ".image-wrapper"
    ).style.backgroundImage = `url(${this.event.img})`;
  },
  methods: {
    addPrix() {
      let newPrix = {
        type: "Normal",
        price: 100,
      };
      this.event.prices.push(newPrix);
    },
    deletePrix(id) {
      if (this.event.prices.length > 1) {
        this.event.prices = this.event.prices.filter(
          (item) => item !== this.event.prices[id]
        );
      }
    },
    // ---------- Gestion upload image -------------//
    uploadBtnClicked(ClickedButton) {
      let input = document.querySelector("#fileChooser");
      input.setAttribute("clicked-btn", ClickedButton);
      input.click();
    },
    async uploadImage(e) {
      let base64 = await this.generateImageDataUrl(e);
      let btnIdx = e.target.getAttribute("clicked-btn");
      if (btnIdx == "background") {
        document.querySelector(
          ".image-wrapper"
        ).style.backgroundImage = `url(${base64})`;
        this.event.img = base64;
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
    async saveNewEvent() {
      this.isPending = true;
      //
      let resp = await this.$axios.post("/eventh24/saveNewEvent", this.event, {
        headers: this.requestHeader,
      });
      this.isPending = false;
      //
      this.event = {
        img: null,
        categorie: "Concerts",
        intitule: "",
        artiste: "",
        date: "",
        openTime: "",
        lieu: "",
        description: "",
        prices: [
          {
            type: "Normal",
            price: 100,
          },
        ],
      };
      this.conf = {
        titleText: "Ajouter un nouveau évènement",
        submitText: "Ajouter",
      };
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
  },
};
</script>
<style scoped>
.image-wrapper {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>