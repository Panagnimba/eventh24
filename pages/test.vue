<template>
  <div>
    <button
      @click="sendRequest"
      class="bg-second text-white px-6 py-2 font-bold"
    >
      Send Request
    </button>
    <button
      @click="sendRequest2"
      class="bg-second text-white px-6 py-2 font-bold"
    >
      Send Request2
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
    async sendRequest2() {
      let xmlBodyStr = `<?xml version="1.0" encoding="UTF-8"?>
                              <COMMAND>
                              <TYPE>OMPREQ</TYPE>
                              <customer_msisdn>67802226</customer_msisdn>
                              <merchant_msisdn>74722501</merchant_msisdn>
                              <api_username>VINOTICKET</api_username>
                              <api_password>Orange@123</api_password>
                              <amount>500</amount>
                              <PROVIDER>101</PROVIDER>
                              <PROVIDER2>101</PROVIDER2>
                              <PAYID>12</PAYID>
                              <PAYID2>12</PAYID2>
                              <otp>541848</otp>
                              <reference_number>789233</reference_number>
                              <ext_txn_id>2015000685</ext_txn_id>
                              </COMMAND>
                      `;
      let resp = await this.$axios.post(
        "https://testom.orange.bf:9008/payment",
        xmlBodyStr,
        {
          headers: { "Content-Type": "text/xml" },
        }
      );
      this.notif.show = true;
      this.notif.type = "warning";
      this.notif.message = resp.data.message;
    },
  },
};
</script>