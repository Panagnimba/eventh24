<template>
  <div class="h-full p-5 flex flex-col justify-start">
    <div id="chartContainer" style="height: 95%; width: 100%"></div>
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
      isCanvasLoaded: false,
      isCanvasLoaded: false,
      dataPoints: [],
      //
      notif: {
        show: false,
        type: "",
        message: "",
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
  watch: {
    isCanvasLoaded: function () {
      if (CanvasJS) this.drawChart();
    },
    dataPoints: function () {
      if (this.isCanvasLoaded) {
        this.chart.options.data[0].dataPoints = this.dataPoints;
        this.chart.render();
      }
    },
  },
  async fetch() {
    let resp = await this.$axios.get("/eventh24/graphicData", {
      headers: this.requestHeader,
    });
    if (resp.data.success) {
      this.dataPoints = resp.data.result;
    } else {
      this.notif.show = true;
      this.notif.type = "error";
      this.notif.message = resp.data.message;
    }
  },
  methods: {
    drawChart() {
      this.chart = new CanvasJS.Chart("chartContainer", {
        title: {
          text: "Tickets / Evenement",
        },
        animationEnabled: true,
        zoomEnabled: true,
        zoomType: "x",
        exportEnabled: true,
        axisX: {
          labelMaxWidth: 100,
          labelWrap: false, // change it to false
          labelAutoFit: true,
          interval: 1,
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        data: [
          {
            type: "column",
            color: "#47acb1",

            dataPoints: this.dataPoints,
          },
        ],
      });
      this.chart.render();
    },
  },
  head() {
    return {
      script: [
        {
          hid: "chartjs",
          src: "https://canvasjs.com/assets/script/canvasjs.min.js",
          defer: true,
          // Changed after script load
          callback: () => {
            this.isCanvasLoaded = true;
          },
        },
      ],
    };
  },
};
</script>