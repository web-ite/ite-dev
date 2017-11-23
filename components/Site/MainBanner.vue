<template>
  <div class="mainBannerContainer" v-bind:class="{ 'd-relative': $store.state.admin }">
    <div v-if="mainBanner.bannerType === 'image'" class="mainBanner card bg-dark text-white">
      <a :href="mainBanner.bannerLink">
      <img class="card-img" :src="`/images/banner/${mainBanner.bannerImg}`">
        <div class="card-img-overlay">
          <h4 class="card-title">{{ mainBanner.bannerTitle }}</h4>
          <p class="card-text">{{ mainBanner.bannerText }}</p>
          <span class="mainBanner-link"></span>
        </div>
      </a>
    </div>
    <div v-if="mainBanner.bannerType === 'video'" class="mainBanner embed-responsive embed-responsive-4by3">
      <iframe class="embed-responsive-item" :src="mainBanner.bannerVideo" frameborder="0" allowfullscreen></iframe>
    </div>
    
    <div v-if="$store.state.admin" class="d-modal">
      <button class="btn btn-primary btn-edit-mode" @click="mainBannerModal = true">Edit</button>
      <b-modal v-model="mainBannerModal" hide-header-close title="Edit main banner">
        <b-alert :show="mainBannerAlert" :variant="mainBannerAlertType">{{ mainBannerAlertText }}</b-alert>
        <b-form-radio-group id="mainBannerType" v-model="mainBanner.bannerType">
          <b-form-radio value="image">Image</b-form-radio>
          <b-form-radio value="video">Video</b-form-radio>
        </b-form-radio-group>
        <div v-if="mainBanner.bannerType === 'image'">
          <b-row>
            <b-col cols="12">
              <div class="dropbox">
                <b-form-file v-show="mainBanner.isInitial" id="inputNewMainBanner" v-model="mainBanner.bannerImg" @change="mainBanner__onNewImgChange"></b-form-file>
                <p v-if="mainBanner.isInitial">Drag your file(s) here to begin or click to browse</p>
                <img v-if="!mainBanner.isInitial && mainBanner.bannerImg !== ''" :src="mainBanner.bannerImgPreview" class="logotype-preview"/>
                <a v-if="!mainBanner.isInitial" @click="mainBanner__removeNewImg" class="remove-btn"><i class="fa fa-trash"></i></a>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols-12>
              <b-form-group id="input-banner-title-group" label="Main banner title:" label-for="input-banner-title">
                <b-form-input id="input-banner-title" type="text" v-model="mainBanner.bannerTitle"></b-form-input>
              </b-form-group>
              <b-form-group id="input-banner-text-group" label="Main banner text:" label-for="input-banner-text">
                <b-form-input id="input-banner-text" type="text" v-model="mainBanner.bannerText"></b-form-input>
              </b-form-group>
              <b-form-group id="input-banner-link-group" label="Main banner link:" label-for="input-banner-link">
                <b-form-input id="input-banner-link" type="text" v-model="mainBanner.bannerLink"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <div v-if="mainBanner.bannerType === 'video'">
          <b-row>
            <b-col cols-12>
              <b-form-group id="input-banner-video-group" label="Banner video url:" label-for="input-banner-video">
                <b-form-input id="input-banner-video" type="text" v-model="mainBanner.bannerVideo"></b-form-input>
              </b-form-group>
              <b-form-group id="input-banner-link-group" label="Banner link:" label-for="input-banner-link">
                <b-form-input id="input-banner-link" type="text" v-model="mainBanner.bannerLink"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <template slot="modal-footer">
          <b-button @click="saveMainBanner" variant="primary">Submit</b-button>
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
        mainBanner: {},
        mainBannerModal: false,
        mainBannerAlert: false,
        mainBannerAlertType: '',
        mainBannerAlertText: ''
      }
    },
    methods: {
      mainBanner__onNewImgChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.mainBanner__createNewImg(files[0])
      },
      mainBanner__createNewImg: function (file) {
        let self = this
        let reader = new FileReader()
        self.mainBanner.isInitial = false
        reader.onload = (e) => {
          self.mainBanner.bannerImgPreview = e.target.result
        }
        reader.readAsDataURL(file)
      },
      mainBanner__removeNewImg: function () {
        let self = this
        self.mainBanner.bannerImg = ''
        self.mainBanner.bannerImgPreview = ''
        self.mainBanner.isInitial = true
      },
      saveMainBanner: function () {
        let self = this
        axios({
          method: 'put',
          url: '/api/components/mainbanner',
          data: self.mainBanner
        }).then((response) => {
          console.log(response)
          self.fetchData()
          self.mainBannerModal = false
        }).catch((error) => {
          console.log(error)
        })
      },
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/components/mainbanner'
        }).then((response) => {
          self.mainBanner = response.data
          if ((self.mainBanner.bannerImg === undefined) || (self.mainBanner.bannerImg === null) || (self.mainBanner.bannerImg === '')) {
            self.mainBanner.isInitial = true
            self.mainBanner.bannerImgPreview = ''
            self.mainBanner.bannerImg = ''
          } else {
            self.mainBanner.isInitial = false
          }
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
    padding-right: 15px;
  }
  .mainBanner iframe
  {
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
  }
  .mainBanner.card
  {
    margin: 0 15px;
    border: none;
    border-radius: 0;
  }
  .mainBanner .card-title
  {
    font-size: 16px;
    color: #fff;
    padding-bottom: 0;
    border-bottom: 0;
  }
  .mainBanner .card-text
  {
    font-size: 12px;
  }
  .mainBanner:hover a,
  .mainBanner:focus a
  {
    cursor: pointer;
    color: #fff;  
  }
  .mainBanner-link
  {
    content: "";
    position: absolute;
    background-image: url('/static/images/arrow_next_big.png');
    width: 45px;
    background-repeat: no-repeat;
    height: 45px;
    bottom: 15px;
    right: 15px;
  }
</style>