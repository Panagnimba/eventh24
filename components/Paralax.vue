<template>
  <div
    class="
      container
      paralax-wrapper
      w-full
      h-96
      text-white text-3xl text-center
      font-bold
      flex
      justify-center
      items-center
    "
  >
    <div id="typed" class="w-full h-2/3 flex flex-col"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isTypedLodded: false,
      paralax: {
        bgImage: null,
        textContent: "",
      },
    };
  },
  async fetch() {
    let resp = await this.$axios.get("/getParalax");
    //
    if (resp.data.success) {
      if (resp.data.result != null) this.paralax = resp.data.result;
    }
  },
  head() {
    return {
      script: [
        {
          hid: "Typed.js",
          src: "https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.8/typed.min.js",
          callback: () => {
            this.isTypedLodded = true;
          },
        },
      ],
    };
  },
  watch: {
    isTypedLodded(newv, oldv) {
      if (newv) {
        new Typed("#typed", {
          strings: [this.paralax.textContent],
          typeSpeed: 40,
          delaySpeed: 90,
          loop: true,
          showCursor: false,
        });
      }
    },
    "paralax.bgImage"() {
      //

      document.querySelector(
        ".paralax-wrapper"
      ).style.backgroundImage = `url(${this.paralax.bgImage})`;

      if (this.isTypedLodded) {
        new Typed("#typed", {
          strings: [this.paralax.textContent],
          typeSpeed: 40,
          delaySpeed: 90,
          loop: true,
          showCursor: false,
        });
      }

      //
    },
  },
};
</script>
<style scoped>
.paralax-wrapper {
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>