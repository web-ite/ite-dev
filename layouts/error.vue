<template>
  <div class="siteSection container">
    <header-component />
    <main class="mainSection text-center">
      <h1 class="title">
      {{ error.statusCode }}
      </h1>
      <h2 class="info">
        {{ error.message }}
      </h2>
      <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
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
  props: ['error'],
  layout: 'site_first_level.vue'
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
