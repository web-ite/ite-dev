<template>
  <main class="mainSection">
    <div class="page-header siteSection__page-header">
      Разделы выставки
    </div>
    <section class="layer container">
      <div class="w-66">
        <main-slider-component />
      </div>
      <div class="w-33 d-flex flex-column">
        <main-banner-component />
        <hot-links-component />
      </div>
    </section>
    <section class="layer container">
      <div class="w-66">
        <freebox-component />
      </div>
    </section>
    <nuxt />
  </main>
</template>
<script>
  import MainSliderComponent from '~/components/Site/MainSlider.vue'
  import MainBannerComponent from '~/components/Site/MainBanner.vue'
  import HotLinksComponent from '~/components/Site/HotLinks.vue'
  export default {
    layout: 'site_second_level',
    head () {
      return {
        title: 'Sport World Moscow - Разделы выставки'
      }
    },
    components: {
      MainSliderComponent,
      MainBannerComponent,
      HotLinksComponent
    }
  }
</script>