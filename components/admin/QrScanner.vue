<template>
  <div class="h-screen flex flex-col scanwrapper sm:flex-row">
    <div class="w-full h-full flex flex-col gap-2 justify-center items-center">
      <!-- scanner -->
      <div class="scan w-72 h-72">
        <div class="qrcode w-full h-full">
          <video ref="video" class="w-full h-full"></video>
        </div>
        <h3>Qr Code Scanning...</h3>
        <div class="scanborder"></div>
      </div>
      <!--  -->
      <div class="w-72 flex justify-between">
        <button
          @click="startScanner"
          class="bg-fourth text-white px-8 font-semibold p-1 rounded-xl"
        >
          Start
        </button>
        <button
          @click="stopScanner"
          class="bg-third text-white px-8 font-semibold p-1 rounded-xl"
        >
          Stop
        </button>
      </div>
      <!--  -->

      <audio id="success_audio" src="/Scanner/beep_success.wav" />
    </div>
    <!-- result -->
    <div class="bg-general h-1/2 w-full p-2">
      <div class="flex gap-1">
        <span class="font-bold text-second text-sm">Result of scan:</span>
        <div class="text-third">{{ this.result }}</div>
      </div>
      <!-- loader -->
      <div class="h-full" v-if="this.isPending">
        <loader></loader>
      </div>
      <!--  -->
      <notification-notif
        v-if="this.notif.show"
        @closeNotif="notif.show = false"
        :notif="this.notif"
      ></notification-notif>
    </div>
  </div>
</template>
<script>
import QrScanner from "qr-scanner";
export default {
  data() {
    return {
      isPending: false, //loader
      qrScanner: null,
      result: "",
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
  mounted() {
    this.qrScanner = new QrScanner(this.$refs.video, async (result) => {
      this.result = result;
      this.qrScanner.stop();
      //
      this.isPending = true;
      let resp = await this.$axios.post(
        `/eventh24/deleteCommandes/${this.result}`,
        {
          headers: this.requestHeader,
        }
      );
      this.isPending = false;
      if (resp.data.success) {
        // restart scannning process
        document.querySelector("#success_audio").play();
        this.result = "";
        this.qrScanner.start();
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    });
  },
  methods: {
    startScanner() {
      this.result = "";
      this.qrScanner.start();
    },
    stopScanner() {
      this.qrScanner.stop();
    },
  },
};
</script>
<style scoped>
.scanwrapper {
  background-color: #111;
}
.scan {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.scan .qrcode {
  position: relative;

  background: url("/Scanner/QR_Code01.png");
  background-size: 100%;
  border: 1px solid white;
}
.scan .qrcode::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  background: url("/Scanner/QR_Code02.png");
  background-size: 100%;
  animation: animate 4s linear infinite;
}
.scan .qrcode::after {
  content: "";
  position: absolute;
  inset: 20px;
  width: calc(100% - 40px);
  height: 2px;
  background-color: #35fd5c;
  filter: drop-shadow(0 0 20px #35fd5c) drop-shadow(0 0 60px #35fd5c);
  animation: animateLine 4s linear infinite;
}
@keyframes animateLine {
  0%,
  100% {
    top: 0%;
  }
  50% {
    top: 100%;
  }
}
@keyframes animate {
  0%,
  100% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
}
.scanborder {
  position: absolute;
  inset: 0;
  background: url("/Scanner/border.png");
  background-size: 100%;
  background-repeat: no-repeat;
  animation: animateText 1.2s linear infinite;
}
.scan h3 {
  text-transform: uppercase;
  color: white;
  filter: drop-shadow(0 0 20px #fff) drop-shadow(0 0 60px #fff);
  animation: animateText 0.5s steps(1) infinite;
}
@keyframes animateText {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>