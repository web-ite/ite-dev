<template>
  <div class="siteSection">
    <nuxt />
    <footer-component />
  </div>
</template>

<script>
import FooterComponent from '~/components/Admin/Footer.vue'

export default {
  components: {
    FooterComponent
  }
}
</script>