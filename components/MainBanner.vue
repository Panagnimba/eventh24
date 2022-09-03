<template>
  <div class="container banner-wrapper p-8 overflow-hidden">
    <div class="swiper mySwiper h-24 sm:h-36 md:h-48 xl:h-72">
      <div class="swiper-wrapper h-full">
        <div class="swiper-slide h-full">
          <img src="/concert1.png" alt="" class="h-full w-full" />
          <div class="details">
            <span>Détails</span>
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>
        <div class="swiper-slide h-full">
          <img src="/concert2.png" alt="" class="h-full w-full" />
          <div class="details">
            <span>Détails</span>
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>
        <div class="swiper-slide h-full">
          <img src="/concert3.png" alt="" class="h-full w-full" />
          <div class="details">
            <span>Détails</span>
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>
        <div class="swiper-slide h-full">
          <img src="/concert2.png" alt="" class="h-full w-full" />
          <div class="details">
            <span>Détails</span>
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>
        <div class="swiper-slide h-full">
          <img src="/concert1.png" alt="" class="h-full w-full" />
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
    };
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
    },
  },
};
</script>

<style scoped>
.banner-wrapper {
  background-image: url("/paralax.jpg");
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