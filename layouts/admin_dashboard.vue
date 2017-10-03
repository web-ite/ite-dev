<template>
  <div class="siteSection">
    <header-component />
    <div class="mainSection adminContainer">
      <sidebar-component />
      <nuxt />
    </div>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '~/components/Admin/Header.vue'
import FooterComponent from '~/components/Admin/Footer.vue'
import SidebarComponent from '~/components/Admin/Sidebar.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  }
}
</script>