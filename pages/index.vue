<template>
  <div class="h-full w-full bg-general overflow-hidden">
    <header-top></header-top>
    <menu-items></menu-items>
    <main-banner></main-banner>
    <!-- <loader></loader> -->
    <div
      class="
        container
        grid
        sm:grid-cols-2
        gap-6
        justify-items-center
        pt-8
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
      eventList: [],
    };
  },
  async fetch() {
    let resp = await this.$axios.get("/getEvents");
    if (resp.data.success) {
      this.eventList = resp.data.result;
      console.log(this.eventList);
    }
  },
  computed: {
    relatedEvent() {
      return this.eventList.slice(0, 5);
    },
  },
};
</script>