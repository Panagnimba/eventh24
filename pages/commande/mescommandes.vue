<template>
  <div class="w-screen h-full">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full min-h-screen table-entire-wrapper">
      <div class="h-full border flex flex-col px-4">
        <h3 class="text-xl font-bold text-second text-center p-4">
          Mes commandes
        </h3>
        <!-- loader -->
        <div class="h-screen" v-if="this.isPending">
          <loader></loader>
        </div>
        <!-- liste des commandes -->
        <div
          v-if="!this.isPending && this.rows.length > 0"
          class="w-full flex justify-center overflow-hidden"
        >
          <vue-good-table
            class="w-full"
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
      </div>
      <notification-notif
        v-if="this.notif.show"
        @closeNotif="notif.show = false"
        :notif="this.notif"
      ></notification-notif>
      <!--  popup de telechargement -->
      <div
        v-if="isDownloading"
        class="
          w-full
          h-full
          flex flex-col
          justify-center
          items-center
          gap-4
          fixed
          top-0
          z-50
          text-white
          eventPopup
        "
      >
        <i class="fa-solid fa-spinner text-5xl animate-spin"></i>
        <div class="text-xl">Téléchargement en cours...</div>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPending: false,
      isDownloading: false,
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
          label: "Catégorie",
          field: "catégorie",
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
          label: "Télécharger",
          field: "print",
          html: true,

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

  async mounted() {
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
          prix: cmmde.price + " fcfa",
          catégorie: cmmde.type,
          beneficiaire: cmmde.beneficiaireName,
          ticket: `<img src=${cmmde.qrcode} alt="Ticket"/>`,
          print: `<div class="text-center"><i class="fa-solid fa-print text-fourth printIcon cursor-pointer" 
          data-url=${cmmde.qrcode} 
          data-name=${cmmde.intitule.replace(/\s/g, "_")}></i>
          </div>`,
        };
        this.rows.push(item);
      });
      // vider le panier
      this.$store.commit("viderPanier");
      //
    } else if (resp.data.isNotAuth) {
      // set redirect_url cookie
      var date = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10mn
      let expires = "; expires=" + date.toUTCString();
      document.cookie =
        "redirect_url" +
        "=" +
        ("/commande/mescommandes" || "/") +
        expires +
        "; path=/";
      //
      this.$router.push("/login");
      // this.$store.commit("toggleLoginPopup", true);
    } else {
      this.notif.show = true;
      this.notif.type = "error";
      this.notif.message = resp.data.message;
    }
    //
    document
      .querySelector(".table-entire-wrapper")
      .addEventListener("click", async (e) => {
        if (e.target.classList.contains("printIcon")) {
          let url = e.target.getAttribute("data-url");
          let ticketName = e.target.getAttribute("data-name");
          //
          this.isDownloading = true;
          await fetch(url)
            .then((resp) => resp.blob())
            .then((blobobject) => {
              const blob = window.URL.createObjectURL(blobobject);
              const anchor = document.createElement("a");
              anchor.style.display = "none";
              anchor.href = blob;
              anchor.download = ticketName;
              document.body.appendChild(anchor);
              anchor.click();
              window.URL.revokeObjectURL(blob);
              this.isDownloading = false;
            })
            .catch(() => console.log("An error in downloading the file sorry"));
          this.isDownloading = false;
        }
      });
  },
};
</script>
<style scoped>
.eventPopup {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
}
</style>