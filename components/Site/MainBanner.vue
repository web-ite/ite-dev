<template>
  <div class="mainBannerContainer" v-bind:class="{ 'd-relative': $store.state.admin }">
    <div v-if="mainBanner.bannerType === 'image'" class="mainBanner card bg-dark text-white">
      <a :href="mainBanner.bannerLink">
      <img class="card-img" :src="`images/banners/${mainBanner.bannerImg}`">
        <div class="card-img-overlay">
          <h4 class="card-title">{{ mainBanner.bannerTitle }}</h4>
          <p class="card-text">{{ mainBanner.bannerText }}</p>
        </div>
      </a>
    </div>
    <div v-if="mainBanner.bannerType === 'video'" class="mainBanner embed-responsive embed-responsive-4by3">
      <iframe class="embed-responsive-item" :src="mainBanner.bannerVideo" frameborder="0" allowfullscreen></iframe>
    </div>
    
    <div v-if="$store.state.admin" class="d-modal">
      <button class="btn btn-primary btn-edit-mode" @click="mainBannerModel = true">Edit</button>
      <b-modal ref="mainBannerModelRef" hide-header-close title="Edit main banner">

        <template slot="modal-footer">
          <b-button variant="primary">Submit</b-button>
        </template>
      </b-modal>
    </div>
    
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  
  export default {
    data: function () {
      return {
        mainBanner: {}
      }
    },
    methods: {
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/components/mainbanner'
        }).then((response) => {
          self.mainBanner = response.data
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
  .mainBannerContainer
  {
    height: 50%;
    margin-left:-15px;
    margin-right: -15px;
  }
  .mainBanner
  {
    height: 100%;
    padding-left: 15px;
    padding-left: 15px;
  }
  .mainBanner iframe
  {
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }
</style>