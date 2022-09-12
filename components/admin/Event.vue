<template>
  <div class="h-screen flex flex-col gap-4 sm:flex-row">
    <!-- Left menu -->
    <div class="w-56 flex flex-col gap-2 p-4">
      <div class="font-bold text-second">Evènement</div>
      <hr class="w-full" />
      <div @click="selectMenu" class="small-menu-item selected" title="Manage">
        <i class="fa-solid fa-pen-to-square"></i>
        <span>Personnaliser</span>
      </div>
      <hr class="w-full" />
      <div @click="selectMenu" class="small-menu-item" title="Add">
        <i class="fa-solid fa-plus"></i>
        <span for="bank">Nouveau</span>
      </div>
      <hr class="w-full" />
    </div>
    <!-- Main part -->
    <div class="w-full h-full flex justify-center items-center border">
      <!--  -->
      <admin-fragments-eventList
        v-if="this.manageEvent"
        @updateBtnClick="updateHandle"
      >
      </admin-fragments-eventList>
      <!--  -->
      <admin-fragments-newEventForm
        v-else
        :conf="this.config"
        :eventProp="this.eventContent"
      ></admin-fragments-newEventForm>
      <!--  -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      manageEvent: true,

      config: {
        titleText: "Ajouter un nouveau évènement",
        submitText: "Ajouter",
      },
      eventContent: {
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
      },
      requestHeader: {
        Authorization: `Bearer ${this.$store.state.admin.token}`,
        "Content-Type": "application/json",
      },
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
      if (item.title.toLowerCase().includes("manage")) {
        this.manageEvent = true;
      } else {
        this.manageEvent = false;
        this.config = {
          titleText: "Ajout d'un nouveau évènement",
          submitText: "Ajouter",
        };
        // remettre a la configuration initiale
        this.eventContent = {
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
      }
    },
    updateHandle(payload) {
      this.manageEvent = false;
      this.eventContent = payload; //payload receive from event data table
      //
      this.config = {
        titleText: "Modifier l'évènement",
        submitText: "Modifier",
      };
    },
    //------------------------------------------------------//
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