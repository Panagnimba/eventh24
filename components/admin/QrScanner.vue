<template>
  <div class="h-screen flex justify-center items-center scanwrapper">
    <div class="flex flex-col gap-2">
      <div class="scan w-72 h-72">
        <div class="qrcode w-full h-full">
          <video ref="video" class="w-full h-full"></video>
        </div>
        <h3>Qr Code Scanning...</h3>
        <div class="scanborder"></div>
      </div>
      <div class="flex justify-between">
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
      <div class="border h-8 text-white">{{ this.result }}</div>
    </div>
  </div>
</template>
<script>
import QrScanner from "qr-scanner";
export default {
  data() {
    return {
      qrScanner: null,
      result: "",
    };
  },
  mounted() {
    this.qrScanner = new QrScanner(this.$refs.video, (result) => {
      this.result = result;
      document.querySelector(".scannerbar").classList.remove("scannerbarA");
    });
  },
  methods: {
    startScanner() {
      this.result = "";
      this.qrScanner.start();
      // document.querySelector(".scannerbar").classList.add("scannerbarA");
    },
    stopScanner() {
      this.qrScanner.stop();
      // document.querySelector(".scannerbar").classList.remove("scannerbarA");
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