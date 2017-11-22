const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },
  /*
  ** Add axios globally
  */
  build: {
    vendor: [
      'axios',
      // 'bootstrap-vue/dist/bootstrap-vue.common',
      'vue-awesome-swiper'
    ],
    plugins: [
     new webpack.ProvidePlugin({
       '_': 'lodash'
      }) 
    ],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      } else {
        config.externals = [ nodeExternals({
          whitelist: ['vue-sortable-tree']
        })]
      }
    }
  },
  plugins: [
    // { src: '~/plugins/bootstrap-vue', ssr: false },
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
    '~/plugins/lodash'
  ],
  modules: ['bootstrap-vue/nuxt'],
  /*
  ** Global CSS
  */
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'font-awesome/css/font-awesome.min.css',
    'swiper/dist/css/swiper.css',
    '~/assets/css/main.css',
    '~/assets/css/colors.css'
  ]
}
