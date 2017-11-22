<template>
  <div class="mainSliderContainer" v-bind:class="{ 'd-relative': $store.state.admin }">

    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide in mainSlider" :key="slide.order">
          <img class="slide-img" :src="`/images/slider/${mainSlider[0].slideImg}`">
          <div class="slide-caption">
            <h1>{{ slide.slideTitle }}</h1>
            <p>{{ slide.slideText }}</p>
          </div>
        </div>
      </div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
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
        </template>
      </b-modal>
      
      <b-modal ref="slideModelModal" hide-header-close :title="slideModel.title">
        <b-alert :show="slideAlert" :variant="slideAlertType">{{ slideAlertText }}</b-alert>
        <b-row>
          <b-col cols="12">
            <div class="dropbox">
              <b-form-file v-show="slideModel.isInitial" id="inputNewLogotype" v-model="slideModel.slideImg" @change="slideModel__onNewLogotypeChange"></b-form-file>
              <p v-if="slideModel.isInitial">Drag your file(s) here to begin or click to browse</p>
              <img v-if="!slideModel.isInitial && slideModel.mode == 'add'" :src="slideModel.slideImgPreview" class="logotype-preview"/>
              <img v-if="!slideModel.isInitial && slideModel.slideImg ==='' && slideModel.mode == 'edit'" :src="`/images/slider/${slideModel.slideImgPreview}`" class="logotype-preview"/>
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
          <b-button @click="slideModel__save(slideModel)" variant="primary">{{ slideModel.action }}</b-button>
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
        mainSlider: [],
        slideModel: {},
        slideAlert: false,
        slideAlertType: '',
        slideAlertText: '',
        swiperOption: {
          autoplay: 6000,
          setWrapperSize: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: false,
          observeParents: true,
          // loop: true,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next'
        }
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
      editSlide: function (slide) {
        let self = this
        self.$refs.slideModelModal.show()
        self.slideModel = {
          mode: 'edit',
          title: 'Edit slide',
          isInitial: false,
          id: slide.id,
          slideImg: '',
          slideImgPreview: slide.slideImg === '' ? '' : slide.slideImg,
          slideTitle: slide.slideTitle,
          slideText: slide.slideText,
          slideLink: slide.slideLink,
          order: slide.order,
          action: 'Save'
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
      slideModel__save: function (slide) {
        let self = this
        if (((slide.slideImgPreview !== null) && (slide.slideImgPreview !== undefined) && (slide.slideImgPreview !== '')) || ((slide.slideImg !== null) && (slide.slideImg !== undefined) && (slide.slideImg !== ''))) {
          let formData
          if ((slide.slideImg !== null) && (slide.slideImg !== undefined) && (slide.slideImg !== '')) {
            console.log('Image already set')
            formData = new FormData()
            formData.append('image', slide.slideImg)
            formData.append('title', slide.slideTitle)
            formData.append('text', slide.slideText)
            formData.append('link', slide.slideLink)
            if (slide.mode === 'edit') {
              formData.append('id', slide.id)
              formData.append('order', slide.order)
            }
          } else {
            formData = {
              title: slide.slideTitle,
              text: slide.slideText,
              link: slide.slideLink
            }
            if (slide.mode === 'edit') {
              formData.id = slide.id
              formData.order = slide.order
            }
          }
          console.log(formData)
          if (slide.mode === 'add') {
            axios({
              method: 'post',
              url: '/api/components/slider',
              data: formData
            }).then((response) => {
              console.log(response)
              self.fetchData()
              self.$refs.slideModelModal.hide()
            }).catch((error) => {
              console.log(error)
            })
          } else if (slide.mode === 'edit') {
            console.log(formData)
            axios({
              method: 'put',
              url: '/api/components/slider',
              data: formData
            }).then((response) => {
              console.log(response)
              self.fetchData()
              self.$refs.slideModelModal.hide()
            }).catch((error) => {
              console.log(error)
            })
          }
        } else {
          self.slideAlert = true
          self.slideAlertType = 'danger'
          self.slideAlertText = 'Please insert image in slide!'
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
      changeOrderDown: function (object) {
        let self = this
        let data = {
          typeOfAction: 'decremention',
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
          let data = _.orderBy(response.data, 'order')
          self.mainSlider = data
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
  .mainSliderContainer
  {
    margin-left: -15px;
    margin-right: -15px;
  }
  .swiper-container
  {
    padding-left: 15px;
    padding-right: 15px;
  }
  .slide-img
  {
    display: block;
    width: 100%;
    height: 100%;
  }
  .slide-caption
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
  .my-swiper
  {
    height: 100%;
    width: 100%;
  }
  .my-swiper .swiper-slide
  {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .my-swiper .swiper-pagination > .swiper-pagination-bullet
  {
    background-color: red;
  }
  .swiper-slide
  {
    opacity: 0;
  }
  .swiper-slide.swiper-slide-active
  {
    opacity: 1;
  }
  .swiper-button-prev,
  .swiper-button-next
  {
    background-size: contain;
    width: 43px;
    height: 43px;
    top: auto;
    bottom: 15px;
  }
  .swiper-button-prev,
  .swiper-container-rtl .swiper-button-next
  {
    background-image: url("~/images/arrow_prev_big.png");
    left: 30px;
  }
  .swiper-button-next,
  .swiper-container-rtl .swiper-button-prev
  {
    background-image: url("~/images/arrow_next_big.png");
    right: 30px;
  }
  .swiper-pagination-bullet-active
  {
    background: #fff;
  }
</style>