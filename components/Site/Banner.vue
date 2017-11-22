<template>
  <div class="bannerContainer row">
    <div class="col-12 col-sm-4" v-for="banner in banners" :key="banner.id">
      <a :href="banner.bannerLink">
        <img :src="`/images/banner/${banner.bannerImg}`">
      </a>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  
  export default {
    data: function () {
      return {
        banners: []
      }
    },
    methods: {
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/components/banner/'
        }).then((response) => {
          self.banners = response.data
        })
      }
    },
    created: function () {
      let self = this
      self.fetchData()
    }
  }
</script>