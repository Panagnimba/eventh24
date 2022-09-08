<template>
  <div class="h-screen flex flex-col gap-4 sm:flex-row">
    <div class="w-56 flex flex-col gap-2 p-4">
      <div class="font-bold text-second">Menu</div>
      <hr class="w-full" />
      <div @click="selectMenu" class="small-menu-item selected" title="Manage">
        <i class="fa-solid fa-pen-to-square"></i>
        <span>Manage Menu</span>
      </div>
      <hr class="w-full" />
      <div @click="selectMenu" class="small-menu-item" title="Add">
        <i class="fa-solid fa-plus"></i>
        <span for="bank">Add Menu</span>
      </div>
      <hr class="w-full" />
    </div>
    <div class="w-full flex justify-center items-center border">
      <!--  -->
      <loader v-if="this.isPending"></loader>
      <!--  -->
      <table
        v-else-if="this.manageMenu"
        class="w-full text-center border p-2 sm:w-2/3 overflow-auto"
      >
        <thead class="bg-second text-white">
          <tr>
            <th class="p-2">Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border" v-for="(menu, id) in this.menuList" :key="id">
            <td class="p-2">{{ menu.name }}</td>
            <td class="text-fourth">
              <i
                @click="updateBtn(menu._id)"
                :data-id="menu._id"
                class="fa-solid fa-pen-to-square cursor-pointer"
              ></i>
            </td>
            <td class="text-third">
              <i
                @click="
                  notif.type = 'confirm';
                  notif.show = true;
                  notif.id = menu._id;
                "
                class="fa-solid fa-trash-can cursor-pointer"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <div class="border rounded-xl">
          <h1
            class="
              bg-second
              text-white
              w-full
              text-center
              p-2
              text-md
              font-semibold
              rounded-tl-xl rounded-tr-xl
            "
          >
            {{ this.conf.titleText }}
          </h1>
          <form
            @submit.prevent="createNewMenu"
            action=""
            class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
          >
            <div class="w-full">
              <input
                type="text"
                name="name"
                v-model="menu.name"
                required
                placeholder="Nom du menu"
                class="w-full p-1.5 rounded-md outline-none border-2"
              />
            </div>
            <div class="w-full">
              <input
                type="text"
                name="url"
                v-model="menu.url"
                placeholder="Url du menu"
                class="w-full p-1.5 rounded-md outline-none border-2"
              />
            </div>

            <div class="w-full">
              <input
                type="submit"
                :value="this.conf.submitText"
                class="
                  bg-second
                  text-white
                  w-full
                  text-center
                  p-2
                  font-bold
                  rounded-md
                  cursor-pointer
                "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      @confirm_delete_btn="deleteMenu"
      :notif="this.notif"
    ></notification-notif>
  </div>
</template>
<script>
import Loader from "../Loader.vue";
export default {
  components: { Loader },
  data() {
    return {
      isPending: false, // loader controller
      manageMenu: true,
      notif: {
        show: false,
        type: "",
        message: "",
      },
      menuList: [],
      menu: {
        name: "",
        url: "",
      },
      conf: {
        titleText: "Nouveau Menu",
        submitText: "Ajouter",
      },
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
    if (resp.data.success) this.menuList = resp.data.result;
    else {
      this.notif.show = true;
      this.notif.type = "error";
      this.notif.message = resp.data.message;
    }
  },
  methods: {
    selectMenu(e) {
      let clickedMenu;
      if (e.target.classList.contains("small-menu-item"))
        clickedMenu = e.target;
      else clickedMenu = e.target.parentNode;
      //
      let menus = document.querySelectorAll(".small-menu-item");
      menus.forEach((item) => {
        if (item == clickedMenu) {
          clickedMenu.classList.add("selected");
          this.displayMainComponent(clickedMenu);
        } else item.classList.remove("selected");
      });
    },
    displayMainComponent(item) {
      if (item.title.toLowerCase().includes("manage")) {
        this.manageMenu = true;
      } else {
        this.manageMenu = false;
        //
        this.conf.titleText = "Nouveau menu";
        this.conf.submitText = "Ajouter";
        // reinitialise form input
        this.menu = {
          name: "",
          url: "",
        };
      }
    },
    async createNewMenu() {
      this.isPending = true;
      let resp = await this.$axios.post("/eventh24/newMenu", this.menu, {
        headers: this.requestHeader,
      });
      this.menu = {};
      this.isPending = false;
      // setup notification
      if (resp.data.success) {
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
        //
        this.conf.titleText = "Nouveau menu";
        this.conf.submitText = "Ajouter";
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    },

    async deleteMenu(id) {
      this.isPending = true;
      let resp = await this.$axios.post(
        "/eventh24/deleteMenu",
        { id: id },
        {
          headers: this.requestHeader,
        }
      );
      this.isPending = false;
      // setup notification
      if (resp.data.success) {
        this.menuList = this.menuList.filter((item) => item._id != id);
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    },
    updateBtn(id) {
      this.manageMenu = false; //
      this.menu = this.menuList.filter((item) => item._id == id)[0];
      //
      this.conf.titleText = "Modifier menu";
      this.conf.submitText = "Modifier";
    },
  },
};
</script>
<style scoped>
/* Menu component */
.small-menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 2px 8px;
  cursor: pointer;
  font-weight: 500;
}
.small-menu-item:hover {
  background-color: var(--general);
}
.selected {
  background-color: var(--general);
}
tbody tr:hover {
  background-color: var(--general);
  /* background-color: white; */
}
</style>