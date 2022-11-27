<template>
  <div class="bg-genera overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full h-screen p-6 flex justify-center items-center">
      <loader v-if="this.isPending"></loader>
      <!--  -->
      <div v-else class="border rounded-xl">
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
          CREER MON COMPTE
        </h1>
        <form
          @submit.prevent="registerUser"
          method="post"
          class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
        >
          <div class="w-full flex gap-3">
            <input
              type="text"
              v-model="user.nom"
              required
              autofocus
              placeholder="Votre nom"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
            <input
              type="text"
              v-model="user.prenom"
              required
              placeholder="Votre prenom"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <!-- <input
              type="email"
              v-model="user.email"
              placeholder="Votre adresse email"
              class="w-full p-1.5 rounded-md outline-none border-2"
            /> -->
            <input
              type="tel"
              v-model="user.tel"
              autofocus
              placeholder="Numéro de téléphone"
              required="true"
              pattern="^[0-9]{8}$"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full flex gap-3">
            <!-- <input
              type="tel"
              required
              v-model="user.tel"
              placeholder="Telephone"
              class="w-full p-1.5 rounded-md outline-none border-2"
            /> -->
            <input
              type="password"
              required
              v-model="user.password"
              placeholder="Mot de passe"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="submit"
              value="ENVOYER"
              class="
                bg-second
                text-white
                w-full
                text-center
                p-2
                font-bold
                rounded-md
              "
            />
          </div>
          <hr class="w-full" />
          <nuxt-link to="" class="text-sm"
            >Vous avez déjà un compte ?</nuxt-link
          >
          <nuxt-link to="/login" class="text-sm text-blue-800"
            >Connectez-vous ici</nuxt-link
          >
        </form>
      </div>
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
      isPending: false, // loader controller
      notif: {
        show: false,
        type: "",
        message: "",
      },
      user: {
        nom: "",
        prenom: "",
        email: "",
        tel: "",
        password: "",
      },
    };
  },
  methods: {
    async registerUser() {
      this.isPending = true;
      let pattern = /^[0-9]{8}$/;
      if (pattern.test(this.user.tel)) {
        let resp = await this.$axios.post("/userRegister", this.user);
        if (resp.data.success) {
          // Remise à zero des champs
          this.user = {
            nom: "",
            prenom: "",
            email: "",
            tel: "",
            password: "",
          };
          //
          this.notif.show = true;
          this.notif.type = "success";
          this.notif.message = resp.data.message;
          //
          let authUser = {
            _id: resp.data.user._id,
            prenom: resp.data.user.prenom,
            tel: resp.data.user.tel,
            token: resp.data.token,
          };
          this.$store.commit("authenticateUser", authUser);
          //
          // Reading cookie and goes to the redirect url
          setTimeout(() => {
            // reading redirect_url cookie to determine the next page to show
            document.cookie.split(";").forEach((e) => {
              if (e.includes("redirect_url")) {
                let url = e.split("=")[1];
                this.$router.push(url);
              } else {
                this.$router.push("/");
              }
            });
          }, 300);
        } else {
          this.notif.show = true;
          this.notif.type = "warning";
          this.notif.message = resp.data.message;
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