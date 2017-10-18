<template>
  <p class="exhibitionTitle text-center text-sm-left primary-text">
    {{ title }}
  </p>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    data: function () {
      return {
        title: ''
      }
    },
    methods: {
      getTitle: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/content/header/title'
        }).then((response) => {
          console.log(response)
          self.title = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created: function () {
      let self = this
      self.getTitle()
    }
  }
</script>

<style>
  .exhibitionTitle
  {
    font-size: 16px;
  }
</style>