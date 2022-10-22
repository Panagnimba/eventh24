<template>
  <div class="container relative overflow-hidden">
    <img
      :src="this.paralax.bgImage"
      alt=""
      class="w-full Paralax-image object-cover"
    />
    <div id="typed" class="h-1/3 w-full text-white sm:text-3xl p-4"></div>
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
  height: 50vh;
}
.Paralax-image {
  max-height: 90vh;
}
#typed {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
}
</style>