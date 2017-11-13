<template>
  <nav class="navbar navbar-light row">
    <ul class="navbar-nav mt-2 mt-lg-0 col-sm-8 offset-sm-4">
      <li v-for="page in pages" :key="page.id" class="nav-item dropdown">
        <a class="nav-link" :href="`/${page.alias}`" :id="`navlink-${page.id}`" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ page.name }}</a>
        <div v-if="page.children && page.children.length > 0" class="dropdown-menu" :aria-labelledby="`navlink-${page.id}`">
          <a v-for="child in page.children" :key="child.id" class="dropdown-item" :href="`/${page.alias}/${child.alias}`">{{ child.name }}</a>
        </div>
      </li>
    </ul>
  </nav>
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

<style>
  .navbar
  {
    padding: 0;
  }
  .navbar-nav
  {
    display: flex;
    flex-direction: row;
    padding-left: 15px;
    margin-left: 33.33333%;
  }
  .dropdown:hover > .dropdown-menu
  {
    display: block;
  }
</style>