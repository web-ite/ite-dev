<template>
  <div class="siteSection container">
    <header-component />
    <nuxt />
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '~/components/Site/Header.vue'
import FooterComponent from '~/components/Site/Footer.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>