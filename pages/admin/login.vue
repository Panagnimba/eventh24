<template>
  <div class="overflow-hidden">
    <div class="w-full h-screen p-6 flex justify-center items-center">
      <div class="border rounded-xl">
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
          ADMINISTRATEUR
        </h1>
        <form
          @submit.prevent="adminLogin"
          action=""
          class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
        >
          <div class="w-full">
            <input
              type="text"
              name="username"
              v-model="admin.username"
              required
              placeholder="Votre Identifiant"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="password"
              name="password"
              v-model="admin.password"
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
    </div>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async adminLogin() {
      let resp = await this.$axios.post("/adminLoggin", this.admin);
      this.admin = {};
      if (resp.data.success) {
        alert(resp.data.message);
        this.setCookie("x-auth-token", resp.data.token, 1);
        this.$router.push("/admin");
      }
    },
    setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires;
    },
  },
};
</script>