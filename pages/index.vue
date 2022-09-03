<template>
  <div class="h-full w-full bg-general overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <main-banner></main-banner>
    <!-- <loader></loader> -->
    <div
      class="
        container
        grid grid-cols-2
        gap-6
        justify-items-ceter
        pt-8
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      <event-item v-for="i in 10" :key="i"></event-item>
    </div>
    <div class="pt-8">
      <paralax></paralax>
    </div>
    <div
      class="
        container
        grid grid-cols-2
        gap-4
        pt-8
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      <event-item v-for="i in 5" :key="i"></event-item>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>