<template>
  <div class="h-screen flex flex-col gap-4 sm:flex-row">
    <!-- Rightside menu chooser -->
    <div class="overflow-auto no-scrollbar">
      <!-- event filter chooser -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Filtrer par évènement</div>
        <hr class="w-full" />
        <select
          @change="handleEventChooserChange"
          class="small-menu-item h-full border outline-none px-1"
        >
          <option selected value="all">Tous les évènements</option>
          <option v-for="(evt, i) in eventList" :key="i" :value="evt._id">
            {{ evt.intitule }}
          </option>
        </select>
        <hr class="w-full" />
      </div>
      <!-- Tickets or price amount -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Ticket ou recette</div>
        <hr class="w-full" />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="ticketOrPrice"
              checked
              @change="handleticketOrPriceChange"
              id="ticket"
              class="w-4 h-4"
            />
            <label for="ticket">Ticket</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="ticketOrPrice"
              @change="handleticketOrPriceChange"
              id="money"
              class="w-4 h-4"
            />
            <label for="money">Money</label>
          </div>
        </div>
        <hr class="w-full" />
      </div>
      <!-- frequence chooser (date, periode) -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Filtrer par date</div>
        <hr class="w-full" />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="periode"
              checked
              @change="handlePeriodChange"
              id="hour"
              class="w-4 h-4"
            />
            <label for="hour">Hour</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="periode"
              @change="handlePeriodChange"
              id="day"
              class="w-4 h-4"
            />
            <label for="day">Day</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="periode"
              @change="handlePeriodChange"
              id="week"
              class="w-4 h-4"
            />
            <label for="week">Week</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="periode"
              @change="handlePeriodChange"
              id="month"
              class="w-4 h-4"
            />
            <label for="month">Month</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="periode"
              @change="handlePeriodChange"
              id="year"
              class="w-4 h-4"
            />
            <label for="year">Year</label>
          </div>
        </div>
        <hr class="w-full" />
      </div>
      <!-- payment method chooser -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Filtrer par methode de paiement</div>
        <hr class="w-full" />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="method"
              checked
              @change="handlePaymentMethodChange"
              id="both"
              class="w-4 h-4"
            />
            <label for="both">Both</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="method"
              @change="handlePaymentMethodChange"
              id="orange"
              class="w-4 h-4"
            />
            <label for="orange">Orange</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="method"
              @change="handlePaymentMethodChange"
              id="coris"
              class="w-4 h-4"
            />
            <label for="coris">Coris</label>
          </div>
        </div>
        <hr class="w-full" />
      </div>
      <!-- Choix de la categorie (normal,VIP,couple) -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Filtrer par categorie</div>
        <hr class="w-full" />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="categorie"
              checked
              @change="handleCategorieChange"
              id="tout"
              class="w-4 h-4"
            />
            <label for="tout">Tout</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="categorie"
              @change="handleCategorieChange"
              id="Normal"
              class="w-4 h-4"
            />
            <label for="Normal">Normal</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="categorie"
              @change="handleCategorieChange"
              id="Moyen"
              class="w-4 h-4"
            />
            <label for="Moyen">Moyen</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="categorie"
              @change="handleCategorieChange"
              id="Couple"
              class="w-4 h-4"
            />
            <label for="Couple">Couple</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="categorie"
              @change="handleCategorieChange"
              id="VIP"
              class="w-4 h-4"
            />
            <label for="VIP">VIP</label>
          </div>
        </div>
        <hr class="w-full" />
      </div>
      <!-- Graphic type chooser -->
      <div class="w-56 flex flex-col gap-2 p-4">
        <div class="font-bold text-second">Type de graphique</div>
        <hr class="w-full" />
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="graphicType"
              checked
              @change="handleGraphicTypeChange"
              id="line"
              class="w-4 h-4"
            />
            <label for="line">Line</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="graphicType"
              @change="handleGraphicTypeChange"
              id="pie"
              class="w-4 h-4"
            />
            <label for="pie">Pie</label>
          </div>
          <div class="flex items-center gap-1">
            <input
              type="radio"
              name="graphicType"
              @change="handleGraphicTypeChange"
              id="column"
              class="w-4 h-4"
            />
            <label for="column">column</label>
          </div>
        </div>
        <hr class="w-full" />
      </div>
    </div>
    <!-- Main content display -->
    <div class="w-full h-full flex justify-center items-center border">
      <admin-graphics-recette
        :filter="this.filter"
        class="w-full h-full"
      ></admin-graphics-recette>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      eventList: [],
      filter: {
        choosenEventId: "all",
        ticketOrMoney: "ticket",
        periode: "hour",
        paymentMethod: "both",
        categorie: "tout",
        graphicType: "line",
      },
    };
  },
  computed: {
    requestHeader() {
      return {
        Authorization: `Bearer ${this.$store.state.admin.token}`,
        "Content-Type": "application/json",
      };
    },
  },
  async fetch() {
    // list of event to link in details button
    let resp = await this.$axios.get("/eventh24/getEvents", {
      headers: this.requestHeader,
    });
    if (resp.data.success) {
      this.eventList = resp.data.result;
    }
  },
  methods: {
    handleEventChooserChange(e) {
      this.filter.choosenEventId = e.target.value;
    },
    handlePeriodChange(e) {
      this.filter.periode = e.target.id;
    },
    handlePaymentMethodChange(e) {
      this.filter.paymentMethod = e.target.id;
    },
    handleCategorieChange(e) {
      this.filter.categorie = e.target.id;
    },
    handleGraphicTypeChange(e) {
      this.filter.graphicType = e.target.id;
    },
    handleticketOrPriceChange(e) {
      this.filter.ticketOrMoney = e.target.id;
    },
  },
};
</script>
