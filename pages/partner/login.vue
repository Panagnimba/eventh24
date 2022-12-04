<template>
  <div class="overflow-hidden">
    <div class="w-full h-screen p-6 flex justify-center items-center">
      <!--  -->
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
          PARTENAIRE
        </h1>
        <form
          @submit.prevent="partnerLogin"
          action=""
          method="post"
          class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
        >
          <div class="w-full">
            <input
              type="text"
              name="username"
              v-model="partner.username"
              required
              autofocus
              placeholder="Votre Identifiant"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="tel"
              v-model="partner.tel"
              placeholder="Numéro de téléphone"
              required="true"
              pattern="^[0-9]{8}$"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="password"
              name="password"
              v-model="partner.password"
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
      isPending: false,
      notif: {
        show: false,
        type: "",
        message: "",
      },
      partner: {
        username: "",
        tel: "",
        password: "",
      },
    };
  },
  methods: {
    async partnerLogin() {
      this.isPending = true;
      let pattern = /^[0-9]{8}$/;
      if (pattern.test(this.partner.tel)) {
        let resp = await this.$axios.post("/partnerLoggin", this.partner);
        if (resp.data.success) {
          this.partner = { username: "", tel: "", password: "" }; //remettre les form input a vide
          let auth = { isAuthenticated: true, token: resp.data.token };
          //commit state to authenticate partner
          this.$store.commit("authenticatePartner", auth);
          this.$router.push("/partner");
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