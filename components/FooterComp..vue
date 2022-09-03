<template>
  <div class="bg-second p-4 mt-8">
    <div
      class="
        grid grid-cols-1
        content-between
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      <!--  col 1-->
      <div class="flex flex-col gap-3 items-center">
        <h1 class="text-xl font-bold text-gray-300">EVENT H24</h1>
        <p class="text-justify text-gray-500">
          Un site de billetterie nouvelle génération vous offrant la possibilité
          d’acheter en ligne des tickets pour les événements de votre choix. Sa
          vocation est de vous proposer l’offre de concerts, sports, spectacles,
          cinéma, festivals, théâtre, humour, voyages et evasions la plus large
          du Maroc en collaboration avec les organisateurs d’événements.
        </p>
      </div>
      <!-- col 2 -->
      <div class="flex flex-col gap-3 items-center">
        <h3 class="text-xl font-bold text-gray-300">LIENS UTILS</h3>
        <div
          class="
            grid grid-cols-2
            content-evenly
            justify-items-center
            gap-4
            w-full
            h-full
            text-gray-500
          "
        >
          <nuxt-link to="">SIAO</nuxt-link>
          <nuxt-link to="">NAK</nuxt-link>
          <nuxt-link to="">SNC</nuxt-link>
          <nuxt-link to="">SIAO</nuxt-link>
          <nuxt-link to="">NAK</nuxt-link>
          <nuxt-link to="">SNC</nuxt-link>
        </div>
      </div>
      <!-- col 3 -->
      <div class="flex flex-col gap-3 items-center">
        <h3 class="text-xl font-bold text-gray-300">LIENS UTILS</h3>
        <div
          class="
            grid grid-cols-2
            content-evenly
            justify-items-center
            gap-4
            w-full
            h-full
            text-gray-500
          "
        >
          <nuxt-link to="">Histoire</nuxt-link>
          <nuxt-link to="">Nous contacter</nuxt-link>
          <nuxt-link to="">H24 Magasine</nuxt-link>
          <nuxt-link to="">Mentions legales</nuxt-link>
        </div>
      </div>

      <!-- col 4-->
      <div class="flex flex-col gap-3 items-center">
        <h3 class="text-xl font-bold text-gray-300">Newsletters</h3>
        <div class="flex flex-col justify-evenly gap-4 h-full text-gray-500">
          <p class="text-gray-500 text-justify">
            Vous serez alertez en amount des meilleurs plans, spectacles,
            concerts,...
          </p>
          <form action="" class="w-full h-12 flex bg-gray-600 p-1 rounded">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Adresse email"
              class="w-2/3 px-4 outline-none"
            />
            <input
              type="submit"
              value="S'inscrire"
              class="
                w-1/3
                bg-gray-600
                hover:bg-gray-700
                text-white
                font-bold
                cursor-pointer
              "
            />
          </form>
        </div>
      </div>
    </div>
    <div class="text-xs text-center pt-8 text-gray-400">
      &copy; Tous droits reservés EventH24 2022
    </div>
  </div>
</template>