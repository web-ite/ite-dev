<template>
  <div class="hotLinksContainer" v-bind:class="{ 'd-relative': $store.state.admin }">
    <div class="hotLink" v-for="hotLink in hotLinks" :key="hotLink.id">
      <a :href="hotLink.hotLinkLink">
        <img class="hotLinkIcon" :src="`/images/${hotLink.hotLinkIcon}`">
        <span class="hotLinkTitle">{{ hotLink.hotLinkTitle}}</span>
      </a>
    </div>
    
    <div v-if="$store.state.admin" class="d-modal">
      <button class="btn btn-primary btn-edit-mode" @click="hotLinksModal = true">Edit</button>
      <b-modal v-model="hotLinksModal" hide-header-close title="Edit hot links">
        <b-alert :show="hotLinksAlert" :variant="hotLinksAlertType">{{ hotLinksAlertText }}</b-alert>
        
        <b-card no-body v-for="hotlink in hotLinks" :key="hotlink.order" class="mb-2">
          <div class="p-3 bg-info text-white header-title">
            <div class="header-left">
              {{ hotlink.hotLinkTitle }}
            </div>
            <div class="header-right">
              <i class="fa fa-edit" role="tab" v-b-toggle="`hotlink-${hotlink.id}`"></i>
              <i class="fa fa-arrow-down" @click="changeOrderDown(hotlink)"></i>
              <i class="fa fa-arrow-up" @click="changeOrderUp(hotlink)"></i>
            </div>
          </div>
          <b-collapse :id="`hotlink-${hotlink.id}`" visible accordion="my-accordion" role="tabpanel" class="p-3">
            <b-form-group id="input-hotlink-title-group" label="Hotlink title:" label-for="input-hotlink-title">
              <b-form-input id="input-hotlink-title" type="text" v-model="hotlink.hotLinkTitle"></b-form-input>
            </b-form-group>
            <b-form-group id="input-hotlink-link-group" label="Hotlink link:" label-for="input-hotlink-link">
              <b-form-input id="input-hotlink-link" type="text" v-model="hotlink.hotLinkLink"></b-form-input>
            </b-form-group>
          </b-collapse>
        </b-card>
        
        <template slot="modal-footer">
          <b-button @click="saveHotlinks" variant="primary">Submit</b-button>
        </template>
      </b-modal>
    </div>
    
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import _ from '~/plugins/lodash'
  
  export default {
    data: function () {
      return {
        hotLinks: [],
        hotLinksModal: false,
        hotLinksAlert: false,
        hotLinksAlertType: '',
        hotLinksAlertText: ''
      }
    },
    methods: {
      saveHotlinks: function () {
        let self = this
        axios({
          method: 'put',
          url: '/api/components/hotlink',
          data: self.hotLinks
        }).then((response) => {
          console.log(response)
          self.fetchData()
          self.hotLinksModal = false
        }).catch((error) => {
          console.log(error)
        })
      },
      changeOrderUp: function (object) {
        let self = this
        let data = {
          typeOfAction: 'incremention',
          object: object
        }
        axios({
          method: 'put',
          url: '/api/components/hotlink/order',
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
        axios({
          method: 'put',
          url: '/api/components/hotlink/order',
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
          url: '/api/components/hotlink'
        }).then((response) => {
          let data = _.orderBy(response.data, 'order', 'asc')
          self.hotLinks = data
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
  .hotLinksContainer
  {
    display: flex;
    flex-direction: column;
    height: 50%;
    max-height: 270px;
    margin-left: -15px;
    margin-right: -15px;
  }
  .hotLink
  {
    background-color: #349b1d;
    height: 25%;
    margin-left: 15px;
    margin-right: 15px;
    padding-left: 10px;
  }
  .hotLink:not(:last-child)
  {
    border-bottom: 1px solid #fff;
  }
  .hotLink a
  {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .hotLinkTitle
  {
    color: #fff;
    font-size: 16px;
  }
</style>