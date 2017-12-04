<template>
  <div class="siteSection container">
    <header-component />
    <main class="mainSection container">
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
        <div class="w-33">
          <news-component />
        </div>
      </section>
      <section class="layer">
        <banner-component />
      </section>
      <nuxt />
    </main>
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
import NewsComponent from '~/components/Site/News.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    MainSliderComponent,
    MainBannerComponent,
    HotLinksComponent,
    FreeboxComponent,
    BannerComponent,
    NewsComponent
  }
}
</script>
