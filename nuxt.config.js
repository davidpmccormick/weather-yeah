export default {
  loading: false,
  /*
   ** Rendering mode
   ** Doc: https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",

  /*
   ** Headers of the page
   ** Doc: https://vue-meta.nuxtjs.org/api/#metainfo-properties
   */
  head: {
    title: "Weather, yeah?",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Weather"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Global CSS
   ** Doc: https://nuxtjs.org/api/configuration-css
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   ** Doc: https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/common-methods"],

  /*
   ** Nuxt.js modules
   ** Doc: https://nuxtjs.org/guide/modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    // TODO: Remove it if you want to eject from codeSandbox
    "./codesandbox"
  ],

  axios: {
    proxy: true
  },

  proxy: {
    "/darksky": {
      target:
        "https://api.darksky.net/forecast/203ec53f5d7b4be890fa89eb808cf55f",
      pathRewrite: { "^/darksky": "" }
    }
  },

  /*
   ** Build configuration
   ** Doc: https://nuxtjs.org/api/configuration-build
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
