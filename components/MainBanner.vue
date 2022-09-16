<template>
  <div class="container banner-wrapper p-8 overflow-hidden">
    <div class="swiper mySwiper h-24 sm:h-36 md:h-48 xl:h-80">
      <div class="swiper-wrapper h-full">
        <div
          class="swiper-slide h-full"
          v-for="(item, i) in this.banner.items"
          :key="i"
        >
          <img :src="item.img" alt="" class="h-full w-full" />
          <div class="details">
            <span>Détails</span>
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSwiperLoaded: false,
      nbre: 4,
      swiper: {},
      banner: {
        bgImage: null,
        items: [],
      },
    };
  },
  async fetch() {
    let resp = await this.$axios.get("/getBanner");
    if (resp.data.success) this.banner = resp.data.result;
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/swiper@8/swiper-bundle.min.css",
        },
      ],
      script: [
        {
          hid: "swiper",
          src: "https://unpkg.com/swiper/swiper-bundle.min.js",
          defer: true,
          // Changed after script load
          callback: () => {
            this.isSwiperLoaded = true;
          },
        },
      ],
    };
  },
  mounted() {
    this.createSwiperInstance();
  },
  watch: {
    isSwiperLoaded(newValue) {
      if (newValue) this.createSwiperInstance();
    },
  },
  methods: {
    // methods for create the swiper instance
    createSwiperInstance() {
      if (this.isSwiperLoaded)
        var swiper = new Swiper(".mySwiper", {
          slidesPerView: this.nbre,
          spaceBetween: 30,
          slidesPerGroup: 1,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: true,
          },
          on: {
            init() {
              this.el.addEventListener("mouseenter", () => {
                this.autoplay.stop();
              });

              this.el.addEventListener("mouseleave", () => {
                this.autoplay.start();
              });
            },
          },
        });
      // Set the banner background image
      document.querySelector(
        ".banner-wrapper"
      ).style.backgroundImage = `url(${this.banner.bgImage})`;
    },
  },
};
</script>

<style scoped>
.banner-wrapper {
  background-repeat: no-repeat;
  background-size: cover;
}
.swiper-slide {
  position: relative;
  overflow: hidden;
}
.details {
  width: 100%;
  position: absolute;
  bottom: 0px;
  right: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: var(--third);
  font-weight: bold;
  font-size: 12px;
  padding: 10px 5px;
  cursor: pointer;
  transition: all 0.3s;
}
.swiper-slide:hover .details {
  bottom: 0px;
  right: 0%;
}
</style>