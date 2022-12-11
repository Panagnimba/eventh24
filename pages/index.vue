<template>
  <div class="w-full h-screen bg-general overflow-hidden">
    <!--// Filter based on the search input -->
    <header-top @filter="filterSearchHandle"></header-top>
    <!--// Filter based on the event categorie -->
    <menu-items @filter="filterHandle"></menu-items>
    <!--  -->
    <main-banner></main-banner>
    <div class="w-full h-full mt-8">
      <loader v-if="this.isPending"></loader>
      <div
        v-else
        class="
          container
          grid
          sm:grid-cols-2
          gap-6
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        <event-item
          v-for="eventItem in this.eventList"
          :key="eventItem._id"
          :event="eventItem"
        ></event-item>
      </div>
    </div>
    <div class="pt-8">
      <paralax></paralax>
    </div>
    <div
      class="
        container
        grid
        sm:grid-cols-2
        gap-4
        pt-8
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
      "
    >
      <event-item
        v-for="(eventItem, i) in this.relatedEvent"
        :key="i"
        :event="eventItem"
      ></event-item>
    </div>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //
      isPending: false,
      eventList: [], //this.$store.state.eventList,
    };
  },
  async fetch() {
    this.isPending = true;
    let resp = await this.$axios.get("/getEvents");
    if (resp.data.success) {
      this.eventList = resp.data.result.reverse();
      this.$store.commit("fillEventList", resp.data.result);
      // console.log(resp.data.result);
    }
    this.isPending = false;
  },
  methods: {
    filterHandle(filterText) {
      this.isPending = true;
      if (filterText == "Accueil") this.eventList = this.$store.state.eventList;
      else
        this.eventList = this.$store.state.eventList.filter((evt) => {
          return evt.categorie.includes(filterText);
        });
      console.log("Search Text ---->", filterText);
      setTimeout(() => (this.isPending = false), 100);
    },

    filterSearchHandle(filterObjt) {
      this.isPending = true;
      //
      if (filterObjt.categorie == "All") {
        this.eventList = this.$store.state.eventList.filter((evt) => {
          return (
            evt.intitule
              .toLowerCase()
              .includes(filterObjt.searchText.toLowerCase()) ||
            evt.artiste
              .toLowerCase()
              .includes(filterObjt.searchText.toLowerCase()) ||
            evt.lieu
              .toLowerCase()
              .includes(filterObjt.searchText.toLowerCase()) ||
            evt.prices[0].price
              .toString()
              .toLowerCase()
              .includes(filterObjt.searchText.toLowerCase())
          );
        });
      } else
        this.eventList = this.$store.state.eventList.filter((evt) => {
          return (
            evt.categorie.includes(filterObjt.categorie) &&
            (evt.intitule
              .toLowerCase()
              .includes(filterObjt.searchText.toLowerCase()) ||
              evt.artiste
                .toLowerCase()
                .includes(filterObjt.searchText.toLowerCase()) ||
              evt.lieu
                .toLowerCase()
                .includes(filterObjt.searchText.toLowerCase()) ||
              evt.prices[0].price
                .toString()
                .toLowerCase()
                .includes(filterObjt.searchText.toLowerCase()))
          );
        });
      //
      setTimeout(() => (this.isPending = false), 100);
      console.log(filterObjt);
    },
  },
  computed: {
    relatedEvent() {
      return this.eventList.slice(0, 5);
    },
  },
};
</script>