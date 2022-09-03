<template>
  <div
    class="
      w-full
      flex flex-wrap
      justify-between
      items-center
      gap-2
      relative
      py-6
      pr-6
      border-t
    "
  >
    <!-- close btn -->
    <span class="text-xl absolute top-0 right-0 px-2 cursor-pointer">
      &times;
    </span>
    <!--  -->
    <img
      src="/concert1.png"
      alt="Event Image"
      class="sm:h-24 sm:w-24 w-full h-36"
    />
    <h1 class="text-md text-second text-center font-bold">
      Kundé des artistes Burkinabè
    </h1>

    <!-- qte -->
    <div class="flex">
      <span
        class="
          w-6
          bg-third
          text-white text-center
          font-bold
          flex
          justify-center
          items-center
        "
        >-</span
      >
      <input
        type="numbre"
        value="1"
        min="1"
        class="w-16 outline-none border px-2 py-1 text-center"
      />
      <span
        class="
          w-6
          bg-third
          text-white
          font-bold
          flex
          justify-center
          items-center
        "
        >+</span
      >
    </div>
    <!-- price -->
    <div class="flex flex-col gap-2">
      <span>2 x 200 fcfa</span>
      <span>400 fcfa</span>
    </div>
  </div>
</template>