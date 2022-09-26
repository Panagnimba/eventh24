<template>
  <div
    v-if="this.showLoginPopup"
    class="
      w-full
      h-screen
      fixed
      top-0
      z-50
      flex
      justify-center
      items-center
      eventPopup
      overflow-hidden
    "
  >
    <!-- close btn -->
    <span
      @click="this.toggleLoginPopup"
      class="
        text-3xl text-white
        bg-third
        absolute
        top-0
        right-0
        px-2
        cursor-pointer
      "
    >
      &times;
    </span>
    <!--  -->
    <div class="w-full p-6 flex justify-center items-center">
      <loader v-if="this.isPending"></loader>
      <!--  Loggin -->
      <div
        v-if="!toogleToRegisterForm && !this.isPending"
        class="border rounded-xl bg-white duration-200"
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
          CONNEXION
        </h1>
        <form
          @submit.prevent="userLoggin"
          method="post"
          class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
        >
          <div class="w-full">
            <input
              type="text"
              v-model="user.tel"
              required
              placeholder="Numéro de téléphone"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="password"
              v-model="user.password"
              required
              placeholder="Votre mot de passe"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="submit"
              value="SE CONNECTER"
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
            >Vous ne disposez pas d'un compte ?</nuxt-link
          >
          <div
            @click="toogleToRegisterForm = true"
            class="text-sm text-blue-800 cursor-pointer"
          >
            Créer un compte
          </div>
        </form>
      </div>
      <!--  Register -->
      <div
        v-if="toogleToRegisterForm && !this.isPending"
        class="border rounded-xl bg-white duration-200"
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
              v-model="RegUser.nom"
              required
              placeholder="Votre nom"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
            <input
              type="text"
              v-model="RegUser.prenom"
              required
              placeholder="Votre prenom"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="email"
              v-model="RegUser.email"
              placeholder="Votre adresse email"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full flex gap-3">
            <input
              type="tel"
              required
              v-model="RegUser.tel"
              placeholder="Telephone"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
            <input
              type="password"
              required
              v-model="RegUser.password"
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
          <div
            class="text-sm text-blue-800 cursor-pointer"
            @click="toogleToRegisterForm = false"
          >
            Connectez-vous ici
          </div>
        </form>
      </div>
      <!--  -->
      <notification-notif
        v-if="this.notif.show"
        @closeNotif="notif.show = false"
        :notif="this.notif"
      ></notification-notif>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toogleToRegisterForm: false, //
      isPending: false, // loader controller
      notif: {
        show: false,
        type: "",
        message: "",
      },
      //   User loggin
      user: {
        tel: "",
        password: "",
      },
      //   Register User
      RegUser: {
        nom: "",
        prenom: "",
        email: "",
        tel: "",
        password: "",
      },
    };
  },
  computed: {
    showLoginPopup() {
      return this.$store.state.showLoginPopup;
    },
  },

  methods: {
    toggleLoginPopup() {
      this.$store.commit("toggleLoginPopup", false);
    },
    // Logged in user
    async userLoggin() {
      this.isPending = true;

      let resp = await this.$axios.post("/userLoggin", this.user);
      this.isPending = false;

      // setup notification
      if (resp.data.success) {
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
        // Remise à zero des champs
        this.user = {
          tel: "",
          password: "",
        };
        //
        let authUser = {
          _id: resp.data.user._id,
          prenom: resp.data.user.prenom,
          tel: resp.data.user.tel,
          token: resp.data.token,
        };
        this.$store.commit("authenticateUser", authUser);
        //
        this.$store.commit("toggleLoginPopup", false);

        //
        // Reading cookie and goes to the redirect url
        setTimeout(() => {
          this.notif.show = false;
          // reading redirect_url cookie to determine the next page to show
          document.cookie.split(";").forEach((e) => {
            if (e.includes("redirect_url")) {
              let url = e.split("=")[1];
              this.$router.push(url);
            } else {
              this.$router.push("/");
            }
          });
        }, 700);
      } else {
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = resp.data.message;
      }
    },
    // Register user
    async registerUser() {
      this.isPending = true;
      let resp = await this.$axios.post("/userRegister", this.RegUser);
      this.isPending = false;

      // setup notification
      if (resp.data.success) {
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
        // Remise à zero des champs
        this.RegUser = {
          nom: "",
          prenom: "",
          email: "",
          tel: "",
          password: "",
        };
        //
        let authUser = {
          _id: resp.data.user._id,
          prenom: resp.data.user.prenom,
          tel: resp.data.user.tel,
          token: resp.data.token,
        };

        this.toogleToRegisterForm = false;
        this.$store.commit("authenticateUser", authUser);
        //
        this.$store.commit("toggleLoginPopup", false);
        //
        // Reading cookie and goes to the redirect url
        setTimeout(() => {
          this.notif.show = false;
          // reading redirect_url cookie to determine the next page to show
          document.cookie.split(";").forEach((e) => {
            if (e.includes("redirect_url")) {
              let url = e.split("=")[1];
              this.$router.push(url);
            } else {
              this.$router.push("/");
            }
          });
        }, 700);
      } else {
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = resp.data.message;
      }
    },
  },
};
</script>

<style scoped>
.eventPopup {
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
}
</style>