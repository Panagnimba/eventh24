<template>
  <client-only>
    <div
      v-show="this.isSwiperReady"
      class="banner-wrapper overflow-hidden p-5 py-8"
      ref="bannerWrapper"
    >
      <div class="swiper mySwiper h-36 sm:h-48 md:h-48 xl:h-96" ref="swiper">
        <div class="swiper-wrapper h-full">
          <div
            class="swiper-slide h-full w-full"
            v-for="(item, i) in this.banner.items"
            :key="i"
          >
            <img :src="item.img" alt="" class="h-full w-full object-cover" />
            <nuxt-link :to="`/event/${item.title}`" class="details">
              <span>Détails</span>
              <i class="fa-solid fa-angles-right"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";

export default {
  data() {
    return {
      banner: {
        bgImage: null,
        items: [],
      },
      slidesPerView: 3,
      setInterval: null, // will clear when swiper carousel is operationnel
      isSwiperReady: false,
    };
  },
  mounted() {
    if (window.innerWidth >= 200 && window.innerWidth <= 600) {
      this.slidesPerView = 2;
    }
    //
    this.setInterval = setInterval(() => {
      if (this.$refs.swiper && this.banner.bgImage) {
        // Create nuxt instance
        new Swiper(this.$refs.swiper, {
          slidesPerView: this.slidesPerView,
          spaceBetween: 40,
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
        this.$refs.bannerWrapper.style.backgroundImage = `url(${this.banner.bgImage})`;
        this.isSwiperReady = true;
        window.clearInterval(this.setInterval);
      }
    }, 1000);
  },
  async fetch() {
    let resp = await this.$axios.get("/getBanner");
    if (resp.data.success) {
      this.banner = resp.data.result;
      // await this.$nextTick();
      // Create nuxt instance
      new Swiper(this.$refs.swiper, {
        slidesPerView: this.slidesPerView,
        spaceBetween: 40,
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
    }
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
