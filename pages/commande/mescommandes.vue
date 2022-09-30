<template>
  <div class="w-screen h-full">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full min-h-screen">
      <div class="h-full border flex flex-col px-4">
        <h3 class="text-xl font-bold text-second text-center pt-4">
          Mes commandes
        </h3>
        <!-- loader -->
        <div class="h-screen" v-if="this.isPending">
          <loader></loader>
        </div>
        <!-- liste des commandes -->
        <vue-good-table
          v-show="!this.isPending"
          class="w-full p-6 table-entire-wrapper"
          :columns="columns"
          :rows="rows"
          :fixed-header="true"
          :line-numbers="true"
          :search-options="{
            enabled: true,
            skipDiacritics: true, // desactiver la recherche avec accent
            placeholder: 'Rechercher un ticket',
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

      <notification-notif
        v-if="this.notif.show"
        @closeNotif="notif.show = false"
        :notif="this.notif"
      ></notification-notif>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPending: false,
      columns: [
        {
          label: "Date",
          field: "date",
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
          label: "Prix",
          field: "prix",
          type: "String",
        },
        {
          label: "Beneficiaire",
          field: "beneficiaire",
          type: "String",
        },
        {
          label: "Ticket",
          field: "ticket",
          html: true,
          width: "80px",
          height: "50px",
        },
        {
          label: "Imprimer",
          field: "print",
          html: true,
          width: "100px",
          height: "50px",
          sortable: false,
        },
      ],
      rows: [],
      notif: {
        show: false,
        type: "",
        message: "",
      },
    };
  },
  computed: {
    requestHeader() {
      return {
        Authorization: `Bearer ${this.$store.state.user.token}`,
        "Content-Type": "application/json",
      };
    },
  },
  async fetch() {
    this.isPending = true;
    let clientId = this.$store.state.user._id;
    let resp = await this.$axios.get(`user/mesCommandes/${clientId}`, {
      headers: this.requestHeader,
    });
    this.isPending = false;
    //
    if (resp.data.success) {
      resp.data.result.reverse().forEach((cmmde) => {
        let item = {
          date: new Date(cmmde.commandeDate).toLocaleString(),
          image: `<img src=${cmmde.img} alt="Image"/>`,
          intitule: cmmde.intitule,
          prix: cmmde.price,
          beneficiaire: cmmde.beneficiaireName,
          ticket: `<img src=${cmmde.qrcode} alt="Ticket"/>`,
          print: `<div class="text-center"><a href=${cmmde.qrcode} download=${cmmde.intitule}><i class="fa-solid fa-print text-fourth"></i></a></div>`,
        };
        this.rows.push(item);
      });
    } else {
      this.notif.show = true;
      this.notif.type = "error";
      this.notif.message = resp.data.message;
    }
  },
};
</script>