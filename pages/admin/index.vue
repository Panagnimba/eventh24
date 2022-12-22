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
          ADMINISTRATEUR
        </h1>
        <form
          @submit.prevent="adminLogin"
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
        username: "josue",
        password: "josuee",
      },
      isPending: false,
    };
  },
  methods: {
    async adminLogin() {
      this.isPending = true;
      setTimeout(() => {
        this.isPending = false;
      }, 3000);
    },
  },
};
</script>