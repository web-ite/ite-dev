<template>
  <b-navbar class="primaryNavigationContainer">
    <b-navbar-nav class="mt-2 mt-md-0 primaryNavigation">
      <b-nav-item-dropdown class="primaryNavigation__item" v-for="page in pages" :key="page.id" :text="page.name" :href="`/ru/${page.alias}`">
        <b-dropdown-item class="primaryNavigation__item-dropdown" v-for="child in page.children" :key="child.id" :href="`/ru/${page.alias}/${child.alias}`">{{ child.name }}</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import axios from '~/plugins/axios'
  
  export default {
    data: function () {
      return {
        pages: []
      }
    },
    methods: {
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/pages'
        }).then((response) => {
          self.pages = response.data.children
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

<style lang="scss">
</style>