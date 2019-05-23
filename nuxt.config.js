const pkg = require('./package');

module.exports = {
  mode: 'spa',

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/antd-ui'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  generate: {
    routes: ['404']
  },

  router: {
    base: '/',
    parseQuery(query) {
      // 转换路径参数为json格式
      const qs = require('qs');
      return JSON.parse(
        JSON.stringify(qs.parse(query), (key, value) => {
          if (typeof value === 'string' && !isNaN(value)) {
            return parseInt(value);
          } else {
            return value;
          }
        }),
      );
    },
  },

  proxy: [
    [
      '/api',
      {
        target: 'http://127.0.0.1:3001',
      },
    ],
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
