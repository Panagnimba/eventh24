<template>
  <div class="overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full h-screen px-6 flex flex-col justify-center items-center">
      <h2 class="text-center text-xl text-second m-5">
        RECUPERATION DE COMPTE
      </h2>
      <form
        @submit.prevent="resetPassword"
        class="w-80 xl:w-1/3 flex flex-col items-center gap-4 my-4"
      >
        <h1
          class="
            bg-second
            text-white
            w-full
            text-center
            p-2
            text-xl
            font-bold
            rounded-tl-xl rounded-tr-xl
          "
        >
          MON COMPTE
        </h1>
        <!-- Nom & Prenom -->
        <div class="w-full flex gap-3">
          <input
            type="text"
            v-model="myCompte.nom"
            required
            autofocus
            placeholder="Votre nom"
            class="w-full p-1.5 rounded-md outline-none border-2"
          />
          <input
            type="text"
            v-model="myCompte.prenom"
            required
            placeholder="Votre prenom"
            class="w-full p-1.5 rounded-md outline-none border-2"
          />
        </div>
        <!-- tel -->
        <div class="w-full">
          <input
            type="tel"
            v-model="myCompte.tel"
            autofocus
            placeholder="Numéro de téléphone"
            required="true"
            pattern="^[0-9]{8}$"
            class="w-full p-1.5 rounded-md outline-none border-2"
          />
        </div>
        <!-- new pass -->
        <div class="w-full">
          <input
            type="password"
            required
            autofocus
            v-model="myCompte.password"
            placeholder="Nouveau mot de passe"
            class="w-full p-1.5 rounded-md outline-none border-2"
          />
        </div>
        <!-- submit -->
        <div class="w-full bg-second rounded-md text-white">
          <div v-if="isPending" class="flex justify-center">
            <i class="fa-solid fa-spinner text-2xl animate-spin"></i>
          </div>
          <input
            v-else
            type="submit"
            value="RECUPERER"
            class="bg-second w-full text-center p-2 font-bold rounded-md"
          />
        </div>
      </form>
      <!--  -->
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
      notif: {
        show: false,
        type: "",
        message: "",
      },
      myCompte: {
        nom: "",
        prenom: "",
        tel: "",
        password: "",
      },
    };
  },
  methods: {
    async resetPassword() {
      this.isPending = true;
      let pattern = /^[0-9]{8}$/;
      if (pattern.test(this.myCompte.tel)) {
        let resp = await this.$axios.post("/resetPassword", this.myCompte);
        if (resp.data.success) {
          this.myCompte = { nom: "", prenom: "", tel: "", password: "" };
          //
          this.notif.show = true;
          this.notif.type = "success";
          this.notif.message = resp.data.message;
          setTimeout(() => {
            this.$router.push("/");
          }, 800);
          //
        } else {
          this.notif.show = true;
          this.notif.type = "warning";
          this.notif.message = resp.data.message;
          //
        }
      } else {
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = "Numéro de téléphone incorrect";
      }
      this.isPending = false;
    },
  },
};
</script>