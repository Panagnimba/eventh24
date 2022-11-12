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
          NOUVEAU ADMINISTRATEUR
        </h1>
        <form
          @submit.prevent="createNewAdmin"
          action=""
          method="post"
          class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
        >
          <div class="w-full">
            <input
              type="text"
              name="username"
              v-model="admin.username"
              required
              placeholder="Username"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <select
              name=""
              class="w-full p-1.5 rounded-md outline-none border-2"
              v-model="admin.role"
            >
              <option disabled value="">Sélectionner un role</option>
              <option value="Admin">Admin</option>
              <option value="Gérant">Gérant</option>
              <option value="Associé">Associé</option>
            </select>
          </div>
          <div class="w-full">
            <input
              type="password"
              name="password"
              v-model="admin.password"
              required
              placeholder="Mot de passe"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="submit"
              value="CREER"
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
    <!--  -->
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      :notif="this.notif"
    ></notification-notif>
    <footer-comp></footer-comp>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPending: false,
      admin: {
        username: "",
        password: "",
        role: "",
      },
      notif: {
        show: false,
        type: "",
        message: "",
      },
      //
      requestHeader: {
        Authorization: `Bearer ${this.$store.state.admin.token}`,
        "Content-Type": "application/json",
      },
    };
  },
  methods: {
    async createNewAdmin() {
      this.isPending = true;
      let resp = await this.$axios.post(
        "/eventh24/createNewAdmin",
        this.admin,
        {
          headers: this.requestHeader,
        }
      );
      this.isPending = false;
      if (resp.data.success) {
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
        //remettre les form input a vide
        this.admin = { username: "", password: "", role: "" };
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    },
  },
};
</script>