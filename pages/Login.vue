<template>
  <div class="overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full h-screen p-6 flex justify-center items-center">
      <button
        @click="sendRequest"
        class="bg-second text-white px-6 py-2 font-bold"
      >
        Send Request
      </button>
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
          CONNEXION
        </h1>
        <form
          @submit.prevent="userLoggin"
          method="post"
          class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
        >
          <div class="w-full">
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
          <nuxt-link to="account/reset" class="text-sm">
            Mot de passe noublié ?
          </nuxt-link>
          <nuxt-link to="/register" class="text-sm text-blue-800"
            >Créer un compte</nuxt-link
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
        tel: "",
        password: "",
      },
    };
  },
  methods: {
    async sendRequest() {
      let resp = await this.$axios.get("/sendRequest");
      this.notif.show = true;
      this.notif.type = "warning";
      this.notif.message = resp.data.message;
    },
    async userLoggin() {
      this.isPending = true;
      let pattern = /^[0-9]{8}$/;
      if (pattern.test(this.user.tel)) {
        let resp = await this.$axios.post("/userLoggin", this.user);
        if (resp.data.success) {
          // Remise à zero des champs
          this.user = {
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