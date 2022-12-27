<template>
  <div class="w-full min-h-screen bg-general overflow-hidden">
    <!--// Filter based on the search input -->
    <header-top></header-top>
    <!--// Filter based on the event categorie -->
    <menu-items></menu-items>
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
    <!--  -->
    <footer-comp></footer-comp>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPending: false,
      eventList: [], //this.$store.state.eventList,
    };
  },
  async fetch() {
    let slug = this.$route.params.slug;
    if (slug) {
      this.isPending = true;
      let resp = await this.$axios.get(`/getEventbyslug/${slug}`);
      this.eventList = resp.data.result.reverse();
      this.isPending = false;
    }
  },
  //
  //
  head() {
    return {
      title: this.$route.params.slug,
    };
  },
};
</script>