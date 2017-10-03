<template>
  <div class="siteSection">
    <header-component />
    <nuxt />
    <footer-component />
  </div>
</template>

<script>
  import FooterComponent from '~/components/Site/Footer.vue'
  import HeaderComponent from '~/components/Site/Header.vue'
  
  export default {
    components: {
      FooterComponent,
      HeaderComponent
    }
  }
</script>