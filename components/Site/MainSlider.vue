<template>
  <div class="mainSliderContainer" v-bind:class="{ 'd-relative': $store.state.admin }">
    
    <div id="mainSlider" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" v-for="slide in mainSlider" :key="slide.order" v-bind:class="{ 'active': slide.order === 1}">
          <img class="d-block w-100" :src="`images/slider/${slide.slideImg}`">
          <div class="carousel-caption d-none d-md-block">
            <h3>{{ slide.slideTitle }}</h3>
            <p>{{ slide.slideText }}</p>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#mainSlider" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#mainSlider" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
    
    <div v-if="$store.state.admin" class="d-modal">
      <button class="btn btn-primary btn-edit-mode" @click="mainSliderModal = true">Edit</button>
      <b-modal hide-header-close v-model="mainSliderModal" title="Edit main slider">
        <div class="p-3 bg-info text-white header-title">
          <div class="header-left">
            Slides
          </div>
          <div class="header-right">
            <i class="fa fa-plus" @click="addSlide"></i>
          </div>
        </div>
        <div class="p-3 bg-dark text-white header-title" v-for="slide in mainSlider" :key="slide.order">
          <div class="header-left">{{ slide.slideTitle }}</div>
          <div class="header-right">
            <i class="fa fa-edit" @click="editSlide(slide)"></i>
            <i class="fa fa-arrow-down" @click="changeOrderDown(slide)"></i>
            <i class="fa fa-arrow-up" @click="changeOrderUp(slide)"></i>
          </div>
        </div>
        <template slot="modal-footer">
          <b-button variant="primary">Submit</b-button>
        </template>
      </b-modal>
      
      <b-modal ref="slideModelModal" hide-header-close :title="slideModel.title">
        <b-row>
          <b-col cols="12">
            <div class="dropbox">
              <b-form-file v-show="slideModel.isInitial" id="inputNewLogotype" v-model="slideModel.slideImg" @change="slideModel__onNewLogotypeChange"></b-form-file>
              <p v-if="slideModel.isInitial">Drag your file(s) here to begin or click to browse</p>
              <img v-if="!slideModel.isInitial && slideModel.mode == 'add'" :src="slideModel.slideImgPreview" class="logotype-preview"/>
              <img v-if="!slideModel.isInitial && slideModel.slideImg ==='' && slideModel.mode == 'edit'" :src="`images/slider/${slideModel.slideImgPreview}`" class="logotype-preview"/>
              <img v-if="!slideModel.isInitial && slideModel.slideImg !=='' && slideModel.mode == 'edit'" :src="slideModel.slideImgPreview" class="logotype-preview"/>
              <a v-if="!slideModel.isInitial" @click="slideModel__removeNewLogotype" class="remove-btn"><i class="fa fa-trash"></i></a>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group id="input-slide-title-group" label="Slide title:" label-for="input-slide-title">
              <b-form-input id="input-slide-title" type="text" v-model="slideModel.slideTitle"></b-form-input>
            </b-form-group>
            <b-form-group id="input-slide-text-group" label="Slide text:" label-for="input-slide-text">
              <b-form-textarea id="input-slide-text" :rows="5" v-model="slideModel.slideText"></b-form-textarea>
            </b-form-group>
            <b-form-group id="input-slide-link-group" label="Slide link:" label-for="input-slide-link">
              <b-form-input id="input-slide-link" type="text" v-model="slideModel.slideLink"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <template slot="modal-footer">
          <b-button @click="slideModel__save" variant="primary">{{ slideModel.action }}</b-button>
        </template>
      </b-modal>
    </div>
    
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import _ from 'lodash'
  
  export default {
    data: function () {
      return {
        mainSliderModal: false,
        mainSlider: {},
        slideModel: {}
      }
    },
    methods: {
      addSlide: function () {
        let self = this
        self.$refs.slideModelModal.show()
        self.slideModel = {
          mode: 'add',
          title: 'Add new slide',
          isInitial: true,
          slideImg: '',
          slideImgPreview: '',
          slideTitle: '',
          slideText: '',
          slideLink: '',
          order: '0',
          action: 'Add'
        }
      },
      slideModel__onNewLogotypeChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.slideModel__createNewLogotype(files[0])
      },
      slideModel__createNewLogotype: function (file) {
        let self = this
        let reader = new FileReader()
        self.slideModel.isInitial = false
        reader.onload = (e) => {
          self.slideModel.slideImgPreview = e.target.result
        }
        reader.readAsDataURL(file)
      },
      slideModel__removeNewLogotype: function () {
        let self = this
        self.slideModel.slideImg = ''
        self.slideModel.slideImgPreview = ''
        self.slideModel.isInitial = true
      },
      slideModel__save: function () {
        let self = this
        let data = new FormData()
        console.log(self.slideModel)
        if ((self.slideModel.slideImg !== null) && (self.slideModel.slideImg !== undefined) && (self.slideModel.slideImg !== '')) {
          data.append('image', self.slideModel.slideImg)
        }
        data.append('title', self.slideModel.slideTitle)
        data.append('text', self.slideModel.slideText)
        data.append('link', self.slideModel.slideLink)
        data.append('id', self.slideModel.id)
        data.append('order', self.slideModel.order)
        console.log(data)
        if (self.slideModel.mode === 'add') {
          axios({
            method: 'post',
            url: '/api/components/slider',
            data: data,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
            console.log(response)
            self.fetchData()
            self.$refs.slideModelModal.hide()
          }).catch((error) => {
            console.log(error)
          })
        } else if (self.slideModel.mode === 'edit') {
          console.log(data)
          axios({
            method: 'put',
            url: '/api/components/slider',
            data: data,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((response) => {
            console.log(response)
            self.fetchData()
            self.$refs.slideModelModal.hide()
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      editSlide: function (slide) {
        let self = this
        self.$refs.slideModelModal.show()
        self.slideModel = {
          mode: 'edit',
          title: 'Edit slide',
          isInitial: false,
          id: slide.id,
          slideImg: '',
          slideImgPreview: slide.slideImg === undefined ? '' : slide.slideImg,
          slideTitle: slide.slideTitle,
          slideText: slide.slideText,
          slideLink: slide.slideLink,
          order: slide.order,
          action: 'Save'
        }
      },
      changeOrderUp: function (object) {
        let self = this
        let data = {
          typeOfAction: 'incremention',
          typeOfObject: 'mainSlider',
          section: 'mainPage',
          object: object
        }
        console.log(data)
        axios({
          method: 'put',
          url: '/api/content/slider/order',
          data: data
        }).then((response) => {
          console.log(response)
          self.fetchData()
        })
      },
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/components/slider'
        }).then((response) => {
          let data = _.orderBy(response.data, 'order', 'asc')
          self.mainSlider = data
        }, (error) => {
          console.log(error)
        })
      },
      onSlideStart: function (slide) {
        this.sliding = true
      },
      onSlideEnd: function (slide) {
        this.sliding = false
      }
    },
    created: function () {
      let self = this
      self.fetchData()
    }
  }
</script>

<style>
  .mainSliderContainer
  {
    margin-left: -15px;
    margin-right: -15px;
  }
  #mainSlider
  {
    padding-left: 15px;
    padding-right: 15px;
  }
  .carousel-caption
  {
    position: absolute;
    right: 30%;
    bottom: 100px;
    left: 0;
    z-index: 10;
    padding: 20px;
    color: #fff;
    text-align: left;
    background-color: rgba(52, 155, 29, .7);
  }
  .carousel-control-next,
  .carousel-control-prev
  {
    bottom: 25px;
    align-items: flex-end;
  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon
  {
    width: 50px;
    height: 50px;
    border: 2px solid #fff;
    border-radius: 50%;
    background-size: 50% 50%;
  }
</style>