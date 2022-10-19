<template>
  <div class="overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="h-screen">
      <loader v-if="isPending"></loader>
      <div v-else class="w-full h-screen p-6 flex justify-evenly items-center">
        <div v-for="(ct, i) in this.panierContent" :key="i">
          <br />
          <div>{{ ct }}</div>
        </div>
        <div
          @click="sendCommande"
          class="bg-third text-white font-bold p-2 text-center rounded-md"
        >
          Passer la commande
        </div>
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
      //
      isPending: false,
      notif: {
        show: false,
        type: "",
        message: "",
      },
    };
  },
  computed: {
    panierContent() {
      return this.$store.state.panier;
    },
    requestHeader() {
      return {
        Authorization: `Bearer ${this.$store.state.user.token}`,
        "Content-Type": "application/json",
      };
    },
  },
  middleware({ store, redirect }) {
    // if no products in the cart or products exists in the cart
    // user not authenticated
    // if (
    //   store.state.panier.length == 0 ||
    //   store.state.user.token == null ||
    //   store.state.user.prenom.length == 0
    // )
    //   return redirect("/");
  },

  methods: {
    async sendCommande() {
      let panier = this.$store.state.panier;
      let commande = {
        paymentMethod: panier[0].paymentMethod,
        client: this.$store.state.user,
        items: [...panier],
      };
      this.isPending = true;
      let resp = await this.$axios.post("/user/saveCommande", commande, {
        headers: this.requestHeader,
      });
      this.isPending = false;
      //
      if (resp.data.success) {
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
        //
        this.$router.push("/commande/mescommandes");
        //
      } else if (resp.data.isNotAuth) {
        // set redirect_url cookie
        var date = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10mn
        let expires = "; expires=" + date.toUTCString();
        document.cookie =
          "redirect_url" + "=" + ("/commande" || "/") + expires + "; path=/";
        //
        // this.$router.push("/login");
        this.$store.commit("toggleLoginPopup", true);
      } else if (resp.data.eventNonDispo) {
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = resp.data.message;
        // remove the inexistant or unavaible event to the cart
        this.$store.commit("removeToCart", resp.data.eventId);
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    },
  },
};
</script>
