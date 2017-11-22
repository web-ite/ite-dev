<template>
  <b-navbar type="light">
    <b-navbar-nav class="mt-2 mt-lg-0">
      <b-nav-item-dropdown v-for="page in pages" :key="page.id" :text="page.name" :href="`/${page.alias}`">
        <b-dropdown-item v-for="child in page.children" :key="child.id" :href="`/${page.alias}/${child.alias}`">{{ child.name }}</b-dropdown-item>
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

<style>
  .navbar
  {
    padding: 0;
  }
  .navbar-nav
  {
    list-style: none;
    display: flex;
    flex-direction: row;
    padding-left: 15px;
    margin-left: 33.33333%;
    width: calc(66.66666% - 15px);
  }
  .nav-item
  {
    border-left: 1px solid #349b1d;
  }
  .nav-link
  {
    color: #349b1d;
    font-weight: 600;
  }
  .nav-item:hover,
  .nav-item:focus
  {
    background-color: #349b1d;
  }
  .nav-item:hover .nav-link,
  .nav-item:focus .nav-link
  {
    color: #fff;
  }
</style>