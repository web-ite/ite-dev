<template>
  <div class="siteSection container">
    <header-component />
    <main class="mainSection container">
      <div class="page-header siteSection__page-header">
        Page not found
      </div>
      <h1 class="title text-center">
      {{ error.statusCode }}
      </h1>
      <h2 class="info text-center">
        {{ error.message }}
      </h2>
      <nuxt-link class="btn btn-primary" to="/" v-if="error.statusCode === 404">
        Homepage
      </nuxt-link>
    </main>
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
  },
  head () {
    return {
      title: 'Page not found'
    }
  },
  props: ['error'],
  layout: 'site_first_level.vue'
}
</script>

<style lang="scss">
@import "assets/css/colors.scss";

.siteSection__page-header
{
  padding: 10px 15px;
  background-color: $primary-color;
  font-size: 24px;
  color: #fff;
}
</style>