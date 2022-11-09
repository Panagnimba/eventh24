<template>
  <div class="w-full overflow-hidden h-full">
    <header-top></header-top>
    <menu-items></menu-items>
    <!--  -->
    <div class="h-screen" v-show="this.isPending">
      <loader></loader>
    </div>
    <!--  -->
    <div v-show="!this.isPending && !this.notFound" class="w-full">
      <h1 class="text-2xl text-second text-center m-6 font-bold">
        {{ this.event.intitule }}
      </h1>
      <div
        class="
          w-full
          h-full
          flex flex-col
          justify-center
          gap-6
          bg-general
          p-6
          sm:flex-row
        "
      >
        <!-- Left part -->
        <div class="w-full gap-2 flex flex-col gap-3">
          <div class="w-full">
            <img
              :src="this.event.img"
              alt=""
              class="w-full h-full rounded-xl"
            />
          </div>
          <!-- Artistes invités or Parrains-->
          <div class="flex flex-col gap-2">
            <h3 class="text-second font-semibold">
              Artistes invités / Parrains
            </h3>
            <div class="w-full flex gap-4 overflow-auto">
              <div class="w-16 h-16">
                <img src="/concert2.png" alt="" class="w-full h-full" />
              </div>
              <div class="w-16 h-16">
                <img src="/concert2.png" alt="" class="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
        <!-- Right part -->
        <div
          class="
            w-full
            flex flex-col
            gap-4
            justify-between
            bg-second
            text-white
            p-4
            overflow-auto
            rounded-xl
          "
        >
          <!--  -->
          <div>
            <h3 class="text-xl text-center font-bold m-2">
              {{ this.event.lieu }}
            </h3>
            <div class="flex justify-between m-2 text-xs sm:text-md">
              <span>{{ this.event.dateC }}</span>
              <span>Ouverture des portes à {{ this.event.openTime }}mn</span>
            </div>
          </div>
          <!--  -->
          <form action="" class="text-black my-4">
            <div class="flex rounded-xl">
              <span
                class="
                  bg-white
                  p-1.5
                  px-3
                  font-bold
                  w-full
                  rounded-tl-xl rounded-bl-xl
                "
              >
                {{ this.type }}
              </span>
              <span class="bg-white p-1.5 font-bold w-full text-center">
                {{ this.getTotal }} fcfa
              </span>
              <select
                name="type"
                v-model="type"
                class="
                  bg-third
                  text-white
                  outline-none
                  rounded-tr-xl rounded-br-xl
                  px-2
                  cursor-pointer
                  font-bold
                "
              >
                <option
                  class="bg-general text-black"
                  selected
                  disabled
                  value="Normal"
                >
                  Type
                </option>
                <option
                  class="bg-general text-black"
                  v-for="(price, i) in this.event.prices"
                  :key="i"
                  :value="price.type"
                >
                  {{ price.type }}
                </option>
              </select>
            </div>
            <div class="flex mt-6 gap-4">
              <div class="w-1/3 relative">
                <input
                  type="number"
                  min="1"
                  v-model="qte"
                  @change="qte = qte <= 0 ? 1 : qte"
                  class="w-full h-full px-4 rounded-xl outline-none font-bold"
                />
                <span class="flex flex-col absolute right-2 top-0.5">
                  <i
                    class="fa-solid fa-caret-up text-md cursor-pointer"
                    @click="increaseQte"
                  ></i>
                  <i
                    class="fa-solid fa-caret-down text-md cursor-pointer"
                    @click="decreaseQte"
                  ></i>
                </span>
              </div>
              <!-- Buy now -->
              <!-- Event always available (time not pass) -->
              <div
                v-if="!this.isTimePass"
                class="
                  w-full
                  bg-third
                  text-white
                  font-bold
                  px-3
                  py-1.5
                  rounded-xl
                  text-center
                  cursor-pointer
                "
                @click="buyNow"
              >
                Acheter maintenant
              </div>
              <!-- Event not available (time pass) -->
              <div
                v-else
                class="
                  w-full
                  bg-gray-500
                  text-white
                  font-bold
                  px-3
                  py-1.5
                  rounded-xl
                  text-center
                  cursor-pointer
                "
              >
                Guichet Fermé
              </div>
            </div>
          </form>
          <!--  -->
          <div>
            <h3 class="text-xl text-center font-bold mt-6">Temps restant</h3>
            <div class="flex gap-2 justify-evenly mt-8">
              <div class="flex flex-col gap-2 justify-center items-center">
                <canvas ref="daysCanvas" width="60" height="60"> </canvas>
                <span>jours</span>
              </div>
              <div class="flex flex-col gap-2 justify-center items-center">
                <canvas ref="hoursCanvas" width="60" height="60"> </canvas>
                <span>Heures</span>
              </div>
              <div class="flex flex-col gap-2 justify-center items-center">
                <canvas ref="minutesCanvas" width="60" height="60"> </canvas>
                <span>minutes</span>
              </div>
              <div class="flex flex-col gap-2 justify-center items-center">
                <canvas ref="secondesCanvas" width="60" height="60"> </canvas>
                <span>Secondes</span>
              </div>
            </div>
          </div>
          <!--  -->
          <div>
            <h3 class="text-lg text-center font-bold mt-6">
              Partager cet evenement
            </h3>
            <div class="flex gap-4 justify-center mt-6">
              <div
                class="
                  w-8
                  h-8
                  border
                  p-2
                  rounded-full
                  flex
                  justify-center
                  items-center
                  cursor-pointer
                  bg-primary
                "
              >
                <i class="fa-brands fa-facebook"></i>
              </div>
              <div
                class="
                  w-8
                  h-8
                  border
                  p-2
                  rounded-full
                  flex
                  justify-center
                  items-center
                  cursor-pointer
                  bg-primary
                "
              >
                <i class="fa-brands fa-facebook"></i>
              </div>
              <div
                class="
                  w-8
                  h-8
                  border
                  p-2
                  rounded-full
                  flex
                  justify-center
                  items-center
                  cursor-pointer
                  bg-primary
                "
              >
                <i class="fa-brands fa-facebook"></i>
              </div>
              <div
                class="
                  w-8
                  h-8
                  border
                  p-2
                  rounded-full
                  flex
                  justify-center
                  items-center
                  cursor-pointer
                  bg-primary
                "
              >
                <i class="fa-brands fa-facebook"></i>
              </div>
              <div
                class="
                  w-8
                  h-8
                  border
                  p-2
                  rounded-full
                  flex
                  justify-center
                  items-center
                  cursor-pointer
                  bg-primary
                "
              >
                <i class="fa-brands fa-facebook"></i>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="text-center text-xs mt-12">
            Publié le {{ this.event.publishDate }}
          </div>
        </div>
      </div>
      <!-- Description part -->
      <div class="h-48 border m-6 p-5 overflow-auto">
        <div v-html="this.event.description"></div>
      </div>
    </div>
    <!-- Event not found -->
    <div
      v-if="this.notFound"
      class="w-full h-screen mt-8 flex justify-center items-center"
    >
      <div>
        <p class="text-xl text-third font-bold">
          Aucun résultat ne correspond à votre requête
        </p>
        <div class="text-center text-second mt-4">Merci de rééssayer</div>
      </div>
    </div>
    <!-- Related events -->
    <h1 class="text-2xl text-second text-center m-6 font-bold">
      Evenements similaires
    </h1>
    <div
      class="
        container
        grid grid-cols-2
        gap-6
        justify-items-center
        pt-8
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      <event-item
        v-for="(related, k) in this.relatedEvent"
        :key="k"
        :event="related"
      ></event-item>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPending: false,
      event: {},
      notFound: false, //
      isTimePass: false, // to know if the event is still evailable or already pass
      type: "Normal",
      qte: 1,
      price: 100,
      //
      time: {
        days: "00",
        hours: "00",
        minutes: "00",
        secondes: "00",
      },
      //
      showEventPopup: false,
      setInterval: null, // will be used for clearInterval
    };
  },
  async fetch() {
    let idEvent = this.$route.params.slug;
    if (idEvent == undefined || idEvent == null) {
      this.notFound = true;
    } else {
      this.isPending = true;
      let resp = await this.$axios.get(`/getEvent/${idEvent}`);
      this.isPending = false;
      if (resp.data.success) {
        this.event = resp.data.result;
        //
        this.type = this.event.prices[0].type;
        this.price = this.event.prices[0].price;
        //concert date to be lisible
        this.event.dateC = new Date(this.event.date).toLocaleString();
        this.event.publishDate = new Date(
          this.event.publishDate
        ).toLocaleString();
      }
      // When error occurs or event indisponible
      else {
        this.notFound = true;
        console.log("errrrrrrrrrorrr-----------", resp.data.message);
      }
    }
  },
  watch: {
    "time.secondes": {
      handler(newVal) {
        this.drawTimeCircle(this.$refs.secondesCanvas, this.time.secondes, 60);
      },
      deep: true,
    },
    "time.minutes": {
      handler(newVal) {
        this.drawTimeCircle(this.$refs.minutesCanvas, this.time.minutes, 60);
      },
      deep: true,
    },
    "time.hours": {
      handler(newVal) {
        this.drawTimeCircle(this.$refs.hoursCanvas, this.time.hours, 24);
      },
      deep: true,
    },
    "time.days": {
      handler(newVal) {
        this.drawTimeCircle(this.$refs.daysCanvas, this.time.days, 30);
      },
      deep: true,
    },
  },
  computed: {
    getTotal() {
      if (this.event.prices) {
        let prix = this.event.prices.filter((prix) => prix.type == this.type);
        this.price = prix[0] && prix[0].price;
        return this.qte * this.price;
      }
    },
    relatedEvent() {
      return this.$store.state.eventList.filter(
        (item) => item.categorie == this.event.categorie
      );
    },
  },
  mounted() {
    this.setInterval = setInterval(() => {
      let eventDate = new Date(this.event.date).getTime();
      let actualDate = new Date(this.event.gmtDate).getTime(); //gmtDate is get from the server
      let gap = eventDate - actualDate;
      if (gap > 0) {
        this.countDown(gap); // function call to countdown
        this.event.gmtDate += 1000; // moins 1 seconde à chaque seconde
      } else {
        this.isTimePass = true;
        window.clearInterval(this.setInterval);
      }
    }, 1000);
  },
  methods: {
    increaseQte() {
      this.qte++;
    },
    decreaseQte() {
      if (this.qte >= 2) this.qte--;
    },
    countDown(gap) {
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
    drawTimeCircle(canvas, time, completeCircleValue) {
      const ctx = canvas.getContext("2d");
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2 - 2;
      ctx.lineWidth = 4;
      // Draw time circle
      // clear before rerendering
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw  background circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "white";
      ctx.stroke();

      // draw time circle
      let timePercent = (time * 100) / completeCircleValue;
      if (timePercent >= 80) ctx.strokeStyle = "green";
      if (timePercent > 50 && timePercent < 80) ctx.strokeStyle = "orange";
      if (timePercent >= 30 && timePercent <= 50) ctx.strokeStyle = "blue";
      if (timePercent < 30) ctx.strokeStyle = "red";
      //
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        0,
        (time * 2 * Math.PI) / completeCircleValue
      );
      ctx.stroke();
      // write content
      ctx.font = "bold 20px Roboto";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(time, centerX, centerY);
    },
    // ACHETER MAINTENANT
    buyNow() {
      // push to the cart if not exist will be pushed
      let panierItem = {
        _id: this.event._id,
        img: this.event.img,
        intitule: this.event.intitule,
        qte: this.qte,
        price: this.price,
        type: this.type,
        //
        beneficiairesNames: [],
        useSameNameInfo: false,
      };
      //
      this.$store.commit("fillEPanier", panierItem);
      this.$router.push("/panier");
    },
    toggleEventPopup() {
      this.$store.commit("toggleEventPopup", true);
    },
  },
};
</script>