<template>
  <div class="bg-genera overflow-hidden">
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
          CREER MON COMPTE
        </h1>
        <form
          action=""
          class="lg:w-80 xl:w-96 flex flex-col items-center gap-4 my-4 px-6"
        >
          <div class="w-full flex gap-3">
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
            <input
              type="text"
              name="prenom"
              placeholder="Votre prenom"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="email"
              name="email"
              placeholder="Votre adresse email"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
          </div>
          <div class="w-full flex gap-3">
            <input
              type="tel"
              name="phone"
              placeholder="Telephone"
              class="w-full p-1.5 rounded-md outline-none border-2"
            />
            <input
              type="password"
              name="password"
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
    </div>
    <footer-comp></footer-comp>
  </div>
</template>