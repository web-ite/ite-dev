<template>
  <div class="siteSection container">
    <header-component />
    <div class="page-header siteSection__page-header">
      Page not found
    </div>
    <main class="mainSection container">
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

<style scoped>
  .mainSection {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
</style>