<template>
  <div class="border rounded-xl bg-white overflow-hidden">
    <div class="h-32 overflow-hidden">
      <nuxt-link to="/event/2">
        <img
          src="/concert3.png"
          alt=""
          class="
            h-full
            w-full
            rounded-tl-xl rounded-tr-xl
            transform
            hover:scale-110
            duration-500
          "
        />
      </nuxt-link>
    </div>
    <h2 class="bg-second text-white text-center m-2 rounded-xl font-bold">
      Concert Live
    </h2>
    <h3 class="text-sm m-2 font-semibold text-second">
      Concert Live des artistes Burkinabè
    </h3>
    <!-- lieu -->
    <div class="flex m-2 items-center gap-2">
      <i class="fa-solid fa-location-dot text-lg text-second"></i>
      <h6 class="text-sm italic">Ouagadougou , Stade municipal</h6>
    </div>
    <!-- time -->
    <div class="flex m-2 items-center gap-2">
      <i class="fa-solid fa-clock text-lg text-second"></i>
      <div class="text-sm font-semibold">
        {{ this.time.days }} <span class="text-third">jrs</span>
        {{ this.time.hours }} <span class="text-third">hrs</span>
        {{ this.time.minutes }} <span class="text-third">mn</span>
        {{ this.time.secondes }}
        <span class="text-third">sec</span>
      </div>
    </div>
    <!-- price -->
    <div class="flex m-2 mt-4 justify-between items-center">
      <div class="flex flex-col gap-1 font-bold">
        <span>A partir de :</span>
        <span class="text-third text-lg">200 <sup>fcfa</sup></span>
      </div>
      <nuxt-link
        to="/event/2"
        class="
          bg-third
          text-white text-sm
          font-bold
          py-1
          px-3
          rounded-xl
          cursor-pointer
        "
      >
        Acheter
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: {
        days: "00",
        hours: "00",
        minutes: "00",
        secondes: "00",
      },
    };
  },
  mounted() {
    setInterval(() => {
      this.countDown("2022/08/31 10:10:10");
    }, 1000);
  },
  methods: {
    countDown(date) {
      let eventDate = new Date(date).getTime();
      let actualDate = new Date().getTime();
      let gap = eventDate - actualDate;
      //
      let sec = 1000;
      let mn = sec * 60;
      let hour = mn * 60;
      let day = hour * 24;
      //
      this.time.days = Math.floor(gap / day);
      this.time.hours = Math.floor((gap % day) / hour);
      this.time.minutes = Math.floor((gap % hour) / mn);
      this.time.secondes = Math.floor((gap % mn) / sec);
      //
      this.time.days =
        this.time.days < 10 ? "0" + this.time.days : this.time.days;
      this.time.hours =
        this.time.hours < 10 ? "0" + this.time.hours : this.time.hours;
      this.time.minutes =
        this.time.minutes < 10 ? "0" + this.time.minutes : this.time.minutes;
      this.time.secondes =
        this.time.secondes < 10 ? "0" + this.time.secondes : this.time.secondes;
    },
  },
};
</script>