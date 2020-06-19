/* eslint-disable no-unused-vars */

import es from './locales/es';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

export default {
  mode: 'universal',
  env: {
    apiUrl: process.env.VUE_APP_API_URL,
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'es',
    },
    title: 'ANHQV STATS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Información y estadísticas Aquí No Hay Quien Viva: personajes, actores, capítulos... y mucho más. ✅ Disponible API REST documentada.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swagger-ui/dist/swagger-ui.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/nuxt-anhqv-client.js',
    '@/plugins/nuxt-social-sharing.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    [
      'nuxt-i18n',
      {
        locales: ['es'],
        defaultLocale: 'es',
        vueI18n: {
          fallbackLocale: 'es',
          messages: {
            es,
          },
        },
      },
    ],
    ['nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas'],
        }, {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab'],
        },
      ],
    }],
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-2309187828170787',
    }],
  ],

  styleResources: {
    scss: [
      './assets/styles/_variables.scss',
      './assets/styles/_global.scss',
    ],
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/, /^vue-adblock-detect/],
    /*
    ** You can extend webpack config here
    */
    extend(config) { },
  },
  router: {
    middleware: ['scroll-top'],
  },
};
