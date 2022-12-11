<template>
  <div class="w-full h-full overflow-auto no-scrollbar py-4">
    <loader v-show="this.isPending"></loader>
    <h4 class="font-bold text-primary text-center text-lg m-5">
      Listes des évènements
    </h4>

    <div
      v-show="!this.isPending && this.rows.length > 0"
      class="w-full flex justify-center overflow-hidden"
    >
      <vue-good-table
        class="w-full table-entire-wrapper"
        max-height="600px"
        :columns="columns"
        :rows="rows"
        :fixed-header="true"
        :line-numbers="true"
        :search-options="{
          enabled: true,
          skipDiacritics: true, // desactiver la recherche avec accent
          placeholder: 'Rechercher un évènement',
        }"
        :sort-options="{
          enabled: true,
        }"
        :pagination-options="{
          enabled: true,
          perPageDropdown: [100, 150, 200, 300],
        }"
        compactMode
      >
      </vue-good-table>
    </div>
    <!--  -->
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      @confirm_delete_btn="deleteEvent"
      :notif="this.notif"
    >
    </notification-notif>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
      isPending: false, // loader controller

      columns: [
        {
          label: "Publié",
          field: "createAt",
          type: "String",
        },
        {
          label: "Image",
          field: "image",
          html: true,
          width: "80px",
          height: "50px",
        },
        {
          label: "Intitule",
          field: "intitule",
          type: "String",
        },
        {
          label: "Artiste",
          field: "artiste",
          type: "String",
        },
        {
          label: "Lieu",
          field: "lieu",
          type: "String",
        },
        {
          label: "Date",
          field: "dateC",
          type: "String",
        },
        {
          label: "Action",
          field: "action",
          html: true,
          width: "100px",
          height: "50px",
          sortable: false,
        },
      ],
      rows: [],
      //
      notif: {
        show: false,
        type: "",
        message: "",
      },
      requestHeader: {
        Authorization: `Bearer ${this.$store.state.admin.token}`,
        "Content-Type": "application/json",
      },
    };
  },

  async fetch() {
    this.isPending = true;
    let resp1 = await this.$axios.get("/eventh24/getEvents", {
      headers: this.requestHeader,
    });
    this.isPending = false;
    if (resp1.data.success) {
      let actualDate = new Date(resp1.data.gmtDate).getTime(); //gmtDate is get from the server
      resp1.data.result.reverse().forEach((event) => {
        let eventDate = new Date(event.date).getTime();
        let actionBtn = "";
        if (actualDate > eventDate + 24 * 60 * 60 * 1000) {
          // 1 jour apres la date de l'event on pourra le supp
          actionBtn = `<p class="flex justify-between">
                        <i class="fa-solid fa-pen-to-square cursor-pointer text-fourth updateBtn" data-id=${event._id} ></i>
                        <i class="fa-solid fa-trash-can cursor-pointer text-third deleteBtn" data-id=${event._id}></i>
                       </p>
                     `;
        } else {
          actionBtn = `<p class="flex justify-between">
                        <i class="fa-solid fa-pen-to-square cursor-pointer text-fourth updateBtn" data-id=${event._id} ></i>
                       </p>
                     `;
        }
        let item = {
          createAt: new Date(event.publishDate).toLocaleString(),
          image: `<img src=${event.img} alt="Image"/>`,
          intitule: event.intitule,
          artiste: event.artiste,
          lieu: event.lieu,
          dateC: new Date(event.date).toLocaleString(),
          action: actionBtn,
          // identifiant mise à la fin
          // qui ne va pas s'afficher
          //mais permet de se referer
          _id: event._id,
          categorie: event.categorie,
          openTime: event.openTime,
          prices: event.prices,
          description: event.description,
          img: event.img,
          date: event.date,
          organisateurId: event.organisateurId,
          organisateurName: event.organisateurName,
          organisateurTel: event.organisateurTel,
        };
        this.rows.push(item);
      });
    }
  },
  mounted() {
    document
      .querySelector(".table-entire-wrapper")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("updateBtn")) {
          let id = e.target.getAttribute("data-id");
          let row = this.rows.filter((item) => item._id == id)[0];
          //   emit event to the parent with a specific clicked event
          this.$emit("updateBtnClick", row);
        }
        if (e.target.classList.contains("deleteBtn")) {
          this.notif.type = "confirm";
          this.notif.show = true;
          this.notif.id = e.target.getAttribute("data-id");
        }
      });
  },
  methods: {
    async deleteEvent(id) {
      this.isPending = true;
      let resp = await this.$axios.post(
        "/eventh24/deleteEvent",
        { id: id },
        {
          headers: this.requestHeader,
        }
      );
      this.isPending = false;
      // setup notification
      if (resp.data.success) {
        this.rows = this.rows.filter((item) => item._id != id);
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