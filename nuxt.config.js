let server_url =  process.env.NODE_ENV !== 'production' ? 'http://localhost:9000' : 'https://api.vinoticket.com';
import redirectSSL from 'redirect-ssl'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'VINOTICKET SARL',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { hid: 'author', name: 'author', content: 'VINOTICKET SARL' },
      { hid: 'description', name: 'description', content: 'VINOTICKET SARL Est une plateforme de billetterie nouvelle génération vous offrant la possibilité d’acheter depuis votre téléphone vos tickets d’évènements.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // fontawesome link
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css', integrity: "sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==", crossorigin: "anonymous" },

    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: '~/plugins/persistedState.client.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
 
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],
 
  axios: {
    baseURL: server_url, // Used as fallback if no runtime config is provided
    credentials: true
  },
  // 
    serverMiddleware: [
      redirectSSL.create({
        enabled: process.env.NODE_ENV === 'production'
      }),
    ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
