<template>
  <div class="freeboxContainer" v-bind:class="{ 'd-relative': $store.state.admin }">
    
    <div class="card freebox" v-for="freebox in freeboxes" :key="freebox.id" v-bind:class="freebox.freeboxBg">
      <div class="card-body">
        <h2 class="card-title">
          <span>→</span>
          {{ freebox.freeboxTitle }}
        </h2>
        <p class="card-text">{{ freebox.freeboxText }}</p>
      </div>
      <img class="card-img-bottom width-full" :src="`/images/freebox/${freebox.freeboxImg}`">
    </div>
    
    <div v-if="$store.state.admin" class="d-modal d-modal-full">
      <button class="btn btn-primary btn-edit-mode" @click="freeboxModal = true">Edit</button>
      <b-modal hide-header-close v-model="freeboxModal" title="Edit freeboxes">
        <div class="p-3 bg-info text-white header-title">
          <div class="header-left">
            Freeboxes
          </div>
          <div class="header-right">
            <i class="fa fa-plus" @click="addFreebox"></i>
          </div>
        </div>
        <div class="p-3 bg-dark text-white header-title" v-for="freebox in freeboxes" :key="freebox.order">
          <div class="header-left">{{ freebox.freeboxTitle }}</div>
          <div class="header-right">
            <i class="fa fa-edit" @click="editFreebox(freebox)"></i>
            <i class="fa fa-arrow-down" @click="changeOrderDown(freebox)"></i>
            <i class="fa fa-arrow-up" @click="changeOrderUp(freebox)"></i>
          </div>
        </div>
        <template slot="modal-footer">
        </template>
      </b-modal>
      
      <b-modal ref="freeboxModelModal" hide-header-close :title="freeboxModel.title">
        <b-alert :show="freeboxAlert" :variant="freeboxAlertType">{{ freeboxAlertText }}</b-alert>
        <b-row>
          <b-col cols="12">
            <div class="dropbox">
              <b-form-file v-show="freeboxModel.isInitial" id="inputNewLogotype" v-model="freeboxModel.freeboxImg" @change="freeboxModel__onNewLogotypeChange"></b-form-file>
              <p v-if="freeboxModel.isInitial">Drag your file(s) here to begin or click to browse</p>
              <img v-if="!freeboxModel.isInitial && freeboxModel.mode == 'add'" :src="freeboxModel.freeboxImgPreview" class="logotype-preview"/>
              <img v-if="!freeboxModel.isInitial && freeboxModel.freeboxImg ==='' && freeboxModel.mode == 'edit'" :src="`/images/freebox/${freeboxModel.freeboxImgPreview}`" class="logotype-preview"/>
              <img v-if="!freeboxModel.isInitial && freeboxModel.freeboxImg !=='' && freeboxModel.mode == 'edit'" :src="freeboxModel.freeboxImgPreview" class="logotype-preview"/>
              <a v-if="!freeboxModel.isInitial" @click="freeboxModel__removeNewLogotype" class="remove-btn"><i class="fa fa-trash"></i></a>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-group id="input-freebox-title-group" label="Freebox title:" label-for="input-freebox-title">
              <b-form-input id="input-freebox-title" type="text" v-model="freeboxModel.freeboxTitle"></b-form-input>
            </b-form-group>
            <b-form-group id="input-freebox-text-group" label="Freebox text:" label-for="input-freebox-text">
              <b-form-textarea id="input-freebox-text" :rows="5" v-model="freeboxModel.freeboxText"></b-form-textarea>
            </b-form-group>
            <b-form-group id="input-freebox-link-group" label="Freebox link:" label-for="input-freebox-link">
              <b-form-input id="input-freebox-link" type="text" v-model="freeboxModel.freeboxLink"></b-form-input>
            </b-form-group>
            <b-form-group id="input-freebox-bg-group" label="Freebox background:" label-for="input-freebox-bg">
              <b-form-input id="input-freebox-link" type="text" v-model="freeboxModel.freeboxBg"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <template slot="modal-footer">
          <b-button @click="freeboxModel__save(freeboxModel)" variant="primary">{{ freeboxModel.action }}</b-button>
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
        freeboxes: [],
        freeboxModal: false,
        freeboxModel: {},
        freeboxAlert: false,
        freeboxAlertType: '',
        freeboxAlertText: ''
      }
    },
    methods: {
      addFreebox: function () {
        let self = this
        self.$refs.freeboxModelModal.show()
        self.freeboxModel = {
          mode: 'add',
          title: 'Add new freebox',
          isInitial: true,
          freeboxImg: '',
          freeboxImgPreview: '',
          freeboxTitle: '',
          freeboxText: '',
          freeboxLink: '',
          freeboxBg: '',
          order: '0',
          action: 'Add'
        }
      },
      editFreebox: function (freebox) {
        let self = this
        self.$refs.freeboxModelModal.show()
        self.freeboxModel = {
          mode: 'edit',
          title: 'Edit freebox',
          isInitial: false,
          id: freebox.id,
          freeboxImg: '',
          freeboxImgPreview: freebox.freeboxImg === '' ? '' : freebox.freeboxImg,
          freeboxTitle: freebox.freeboxTitle,
          freeboxText: freebox.freeboxText,
          freeboxLink: freebox.freeboxLink,
          freeboxBg: freebox.freeboxBg,
          order: freebox.order,
          action: 'Save'
        }
      },
      freeboxModel__onNewLogotypeChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.freeboxModel__createNewLogotype(files[0])
      },
      freeboxModel__createNewLogotype: function (file) {
        let self = this
        let reader = new FileReader()
        self.freeboxModel.isInitial = false
        reader.onload = (e) => {
          self.freeboxModel.freeboxImgPreview = e.target.result
        }
        reader.readAsDataURL(file)
      },
      freeboxModel__removeNewLogotype: function () {
        let self = this
        self.freeboxModel.freeboxImg = ''
        self.freeboxModel.freeboxImgPreview = ''
        self.freeboxModel.isInitial = true
      },
      freeboxModel__save: function (freebox) {
        let self = this
        if (((freebox.freeboxImgPreview !== null) && (freebox.freeboxImgPreview !== undefined) && (freebox.freeboxImgPreview !== '')) || ((freebox.freeboxImg !== null) && (freebox.freeboxImg !== undefined) && (freebox.freeboxImg !== ''))) {
          let formData
          if ((freebox.freeboxImg !== null) && (freebox.freeboxImg !== undefined) && (freebox.freeboxImg !== '')) {
            formData = new FormData()
            formData.append('image', freebox.freeboxImg)
            formData.append('title', freebox.freeboxTitle)
            formData.append('text', freebox.freeboxText)
            formData.append('link', freebox.freeboxLink)
            formData.append('bg', freebox.freeboxBg)
            if (freebox.mode === 'edit') {
              formData.append('id', freebox.id)
              formData.append('order', freebox.order)
            }
          } else {
            console.log('Image already set')
            formData = {
              title: freebox.freeboxTitle,
              text: freebox.freeboxText,
              link: freebox.freeboxLink,
              bg: freebox.freeboxBg
            }
            if (freebox.mode === 'edit') {
              formData.id = freebox.id
              formData.order = freebox.order
            }
          }
          console.log(formData)
          if (freebox.mode === 'add') {
            axios({
              method: 'post',
              url: '/api/components/freebox',
              data: formData
            }).then((response) => {
              console.log(response)
              self.fetchData()
              self.$refs.freeboxModelModal.hide()
            }).catch((error) => {
              console.log(error)
            })
          } else if (freebox.mode === 'edit') {
            console.log(formData)
            axios({
              method: 'put',
              url: '/api/components/freebox',
              data: formData
            }).then((response) => {
              console.log(response)
              self.fetchData()
              self.$refs.freeboxModelModal.hide()
            }).catch((error) => {
              console.log(error)
            })
          }
        } else {
          self.freeboxAlert = true
          self.freeboxAlertType = 'danger'
          self.freeboxAlertText = 'Please insert image in freebox!'
        }
      },
      changeOrderUp: function (object) {
        let self = this
        let data = {
          typeOfAction: 'incremention',
          object: object
        }
        console.log(data)
        axios({
          method: 'put',
          url: '/api/components/freebox/order',
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
          object: object
        }
        console.log(data)
        axios({
          method: 'put',
          url: '/api/components/freebox/order',
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
          url: '/api/components/freebox'
        }).then((response) => {
          self.freeboxes = response.data
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
  .freeboxContainer
  {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .freebox
  {
    width: 50%;
    border: none;
    border-radius: 0;
  }
  .card-title
  {
    color: #349b1d;
    padding-bottom: 10px;
    border-bottom: 1px solid #349b1d;
  }
  .card-title span
  {
    float: right;
  }
  .card-img-bottom
  {
    border-radius: 0;
  }
  .ec
  {
    background-color: #ececec;
  }
  .f9
  {
    background-color: #f9f9f9;
  }
</style>