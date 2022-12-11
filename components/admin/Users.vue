<template>
  <div class="h-screen flex flex-col gap-4 sm:flex-row">
    <!-- Rightside menu chooser -->
    <div>
      <!-- partner -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Partenaires</div>
        <hr class="w-full" />
        <div
          @click="selectMenu"
          class="small-menu-item selected"
          title="Manage Partner"
        >
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Personnaliser</span>
        </div>
        <hr class="w-full" />
        <div @click="selectMenu" class="small-menu-item" title="New Partner">
          <i class="fa-solid fa-plus"></i>
          <span>Nouveau</span>
        </div>
        <hr class="w-full" />
      </div>
      <!-- admin -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Administrateur</div>
        <hr class="w-full" />
        <div @click="selectMenu" class="small-menu-item" title="Manage Admin">
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Personnaliser</span>
        </div>
        <hr class="w-full" />
        <div @click="selectMenu" class="small-menu-item" title="New Admin">
          <i class="fa-solid fa-plus"></i>
          <span>Nouveau</span>
        </div>
        <hr class="w-full" />
      </div>
      <!-- users -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Utilisateurs</div>
        <hr class="w-full" />
        <div @click="selectMenu" class="small-menu-item" title="Manage user">
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Personnaliser</span>
        </div>
        <hr class="w-full" />
        <div @click="selectMenu" class="small-menu-item" title="New user">
          <i class="fa-solid fa-plus"></i>
          <span>Nouveau</span>
        </div>
        <hr class="w-full" />
      </div>
      <!-- Newsletters -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Newsletters</div>
        <hr class="w-full" />
        <div
          @click="selectMenu"
          class="small-menu-item"
          title="Manage newsletter"
        >
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Personnaliser</span>
        </div>
        <hr class="w-full" />
        <div @click="selectMenu" class="small-menu-item" title="New newsletter">
          <i class="fa-solid fa-plus"></i>
          <span>Nouveau</span>
        </div>
        <hr class="w-full" />
      </div>
    </div>
    <!-- Main content display -->
    <div class="w-full h-full flex justify-center items-center border">
      <component :is="this.mainContent" class="w-full h-full"></component>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainContent: "admin-fragments-partnerList",
    };
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
      if (item.title.toLowerCase().includes("manage partner")) {
        this.mainContent = "admin-fragments-partnerList";
      } else if (item.title.toLowerCase().includes("new partner")) {
        this.mainContent = "admin-fragments-partnerForm";
      } else if (item.title.toLowerCase().includes("manage admin")) {
        this.mainContent = "admin-fragments-zadminList";
      } else if (item.title.toLowerCase().includes("new admin")) {
        this.mainContent = "admin-fragments-zadminForm";
      } else if (item.title.toLowerCase().includes("manage user")) {
        this.mainContent = "admin-fragments-userList";
      } else if (item.title.toLowerCase().includes("new user")) {
        this.mainContent = "admin-fragments-userForm";
      } else if (item.title.toLowerCase().includes("manage newsletter")) {
        this.mainContent = "admin-fragments-newsletterList";
      } else if (item.title.toLowerCase().includes("new newsletter")) {
        this.mainContent = "admin-fragments-newsletterForm";
      }
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