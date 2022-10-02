<template>
  <div class="h-screen flex justify-center items-center">
    <div class="flex flex-col gap-2">
      <div class="w-56 relative">
        <video class="border w-full" ref="video"></video>
        <div class="w-full absolute top-0 scannerbar"></div>
      </div>
      <div class="flex justify-between">
        <button @click="startScanner" class="bg-fourth px-5 font-bold p-1">
          Start
        </button>
        <button @click="stopScanner" class="bg-third px-5 font-bold p-1">
          Stop
        </button>
      </div>
      <div class="border h-8">{{ this.result }}</div>
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
      document.querySelector(".scannerbar").classList.add("scannerbarA");
    },
    stopScanner() {
      this.qrScanner.stop();
      document.querySelector(".scannerbar").classList.remove("scannerbarA");
    },
  },
};
</script>
<style scoped>
.scannerbarA {
  animation: scannerBar 1s infinite;
  background-color: green;
  height: 2px;
  filter: drop-shadow(1px 1px 1px green);
}
@keyframes scannerBar {
  0% {
    top: 0%;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0.5;
  }
}
</style>