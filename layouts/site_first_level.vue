<template>
  <div class="siteSection container">
    <header-component />
    <section class="layer">
      <div class="w-66">
        <main-slider-component />
      </div>
      <div class="w-33 d-flex flex-column">
        <main-banner-component />
        <hot-links-component />
      </div>
    </section>
    <section class="layer">
      <div class="w-66">
        <freebox-component />
      </div>
    </section>
    <nuxt />
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '~/components/Site/Header.vue'
import MainSliderComponent from '~/components/Site/MainSlider.vue'
import MainBannerComponent from '~/components/Site/MainBanner.vue'
import HotLinksComponent from '~/components/Site/HotLinks.vue'
import FreeboxComponent from '~/components/Site/FreeBox.vue'
import BannerComponent from '~/components/Site/Banner.vue'
import FooterComponent from '~/components/Site/Footer.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    MainSliderComponent,
    MainBannerComponent,
    HotLinksComponent,
    FreeboxComponent,
    BannerComponent
  }
}
</script>
