<template>
  <div class="h-full p-5 fle flex-col justify-start">
    <loader v-if="this.isPending"></loader>
    <div class="w-full h-full">
      <div id="chartContainer" style="height: 100%; width: 100%"></div>
    </div>
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      :notif="this.notif"
    ></notification-notif>
  </div>
</template>
<script>
export default {
  props: ["filter"],
  data() {
    return {
      isPending: false,
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
    filter: {
      immediate: true,
      deep: true,
      handler() {
        //  if the props receive change
        this.getGraphicsData();
      },
    },
  },

  methods: {
    drawChart() {
      this.chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text:
            this.filter.ticketOrMoney == "ticket"
              ? "Bilan des tickets vendus"
              : "Revenu de l'activité",
        },
        axisX: {
          title: this.filter.periode + " ⟶",
          intervalType: this.filter.periode, // hour day week month year
          labelMaxWidth: 100,
          labelAngle: 0,
          labelWrap: false, // change it to false
          labelAutoFit: true,
          crosshair: {
            enabled: true,
            snapToDataPoint: false,
          },
        },
        axisY: {
          title:
            this.filter.ticketOrMoney == "ticket" ? "Tickets ⟶" : "Revenu ⟶",
          suffix: "",
        },
        toolTip: {
          shared: true,
          contentFormatter: function (e) {
            return (
              e.entries[0].dataPoint.label + ": " + e.entries[0].dataPoint.y
            );
          },
        },
        data: [
          {
            type: this.filter.graphicType,
            xValueFormatString: this.filter.periode,
            yValueFormatString: "###",
            dataPoints: this.dataPoints,
          },
        ],
      });
      this.chart.render();
    },
    //
    async getGraphicsData() {
      this.isPending = true;
      let resp = await this.$axios.post(
        "/eventh24/getGraphicsData",
        this.filter,
        {
          headers: this.requestHeader,
        }
      );
      this.isPending = false;
      if (resp.data.success) {
        this.dataPoints = [];
        resp.data.result.forEach((element) => {
          let item = {
            x: new Date(element.x),
            y: element.y,
            label: element.intitule,
          };
          this.dataPoints.push(item);
        });
        this.drawChart();
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
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