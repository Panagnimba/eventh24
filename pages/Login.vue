<template>
  <div class="overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <div class="w-full p-6 flex justify-center items-center">
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
          CONNEXION
        </h1>
        <form
          action=""
          class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
        >
          <div class="w-full">
            <input
              type="text"
              name="username"
              required
              placeholder="Votre Identifiant"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="password"
              name="password"
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
          <nuxt-link to="" class="text-sm">Mot de passe noublié ?</nuxt-link>
          <nuxt-link to="/register" class="text-sm text-blue-800"
            >Créer un compte</nuxt-link
          >
        </form>
      </div>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>