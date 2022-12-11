<template>
  <div class="w-full h-full overflow-auto no-scrollbar p-4">
    <loader v-show="this.isPending"></loader>
    <h4 class="font-bold text-primary text-center text-lg m-5">
      Récapitulatif des transactions
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
          placeholder: 'Rechercher',
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
          label: "Methode",
          field: "methode",
          type: "String",
        },
        {
          label: "Téléphone",
          field: "telephone",
          type: "String",
        },
        {
          label: "Montant",
          field: "montant",
          type: "String",
        },

        {
          label: "OTP",
          field: "OTP",
          type: "String",
        },

        {
          label: "Message",
          field: "message",
          type: "String",
        },

        {
          label: "Status",
          field: "status",
          type: "String",
        },
        {
          label: "Date",
          field: "date",
          type: "String",
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
    let resp = await this.$axios.get("/eventh24/getPayments", {
      headers: this.requestHeader,
    });
    this.isPending = false;
    if (resp.data.success) {
      resp.data.result.reverse().forEach((transaction) => {
        let item = {
          methode: transaction.paymentMethod,
          telephone: transaction.telephone,
          montant: transaction.montant,
          OTP: transaction.OTP,
          message: transaction.responseMessage,
          status: transaction.responseStatus,
          date: transaction.paymentDate,
        };
        this.rows.push(item);
      });
    }
  },
};
</script>