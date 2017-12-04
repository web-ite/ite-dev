<template>
  <div class="siteSection container">
    <header-component />

          <nuxt />
 

    </main>
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