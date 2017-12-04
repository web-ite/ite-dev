<template>
  <main class="mainSection">
    <div class="page-header siteSection__page-header">
      {{ article.Title }}
    </div>
    <section class="layer container">
      <div class="w-66">
        
      </div>
      <div class="w-33">
        <hot-links-component />
      </div>
    </section>
  </main>
</template>

<script>
  import axios from '~/plugins/axios'
  import HotLinksComponent from '~/components/Site/HotLinks.vue'
  export default {
    layout: 'site_service_template',
    head: {
      title: 'Some Title'
    },
    components: {
      HotLinksComponent
    },
    data: function () {
      return {
        article: {},
        articleGallery: []
      }
    },
    methods: {
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/services/article'
        }).then((response) => {
          self.article = response.data.data
          self.articleGallery = response.data.gallery
        }, (error) => {
          console.log(error)
        })
      }
    },
    created: function () {
      let self = this
      self.fetchData()
    }
  }
</script>

<style>
  
</style>