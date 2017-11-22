import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper/ssr'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

if (process.BROWSER_BUILD) {
  Vue.use(VueAwesomeSwiper)
}

Vue.use(VueAwesomeSwiper)

export default {
  components: {
    swiper,
    swiperSlide
  }
}
