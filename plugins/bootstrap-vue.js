import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.common'

if (process.BROWSER_BUILD) {
  Vue.use(BootstrapVue)
}
