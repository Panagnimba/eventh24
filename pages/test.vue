<template>
  <div>
    <button
      @click="sendRequest"
      class="bg-second text-white px-6 py-2 font-bold"
    >
      Send Request
    </button>
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      :notif="this.notif"
    ></notification-notif>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notif: {
        show: false,
        type: "",
        message: "",
      },
    };
  },
  methods: {
    async sendRequest() {
      let resp = await this.$axios.get("/sendRequest");
      this.notif.show = true;
      this.notif.type = "warning";
      this.notif.message = resp.data.message;
    },
  },
};
</script>