<template>
  <div class="hotLinksContainer" v-bind:class="{ 'd-relative': $store.state.admin }">
    <div class="hotLink" v-for="hotLink in hotLinks" :key="hotLink.id">
      <a :href="hotLink.hotLinkLink">
        <img class="hotLinkIcon" :src="`images/${hotLink.hotLinkIcon}`">
        <span class="hotLinkTitle">{{ hotLink.hotLinkTitle}}</span>
      </a>
    </div>
    
    <div v-if="$store.state.admin" class="d-modal">
      <button class="btn btn-primary btn-edit-mode" @click="hotLinksModal = true">Edit</button>
      <b-modal v-model="hotLinksModal" hide-header-close title="Edit hot links">
        <b-alert :show="hotLinksAlert" :variant="hotLinksAlertType">{{ hotLinksAlertText }}</b-alert>
        <b-row v-for="hotlink in hotLinks" :key="hotlink.order">
          <b-col cols-12>
            <b-form-group id="input-hotlink-title-group" label="Hotlink title:" label-for="input-hotlink-title">
              <b-form-input id="input-hotlink-title" type="text" v-model="hotlink.hotLinkTitle"></b-form-input>
            </b-form-group>
            <b-form-group id="input-hotlink-link-group" label="Hotlink link:" label-for="input-hotlink-link">
              <b-form-input id="input-hotlink-link" type="text" v-model="hotlink.hotLinkLink"></b-form-input>
            </b-form-group>
            <hr>
          </b-col>
        </b-row>
        <template slot="modal-footer">
          <b-button @click="saveHotlinks" variant="primary">Submit</b-button>
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
          url: '/api/components/hotlinks',
          data: self.hotlinks
        }).then((response) => {
          console.log(response)
          self.fetchData()
          self.hotLinksModal = false
        }).catch((error) => {
          console.log(error)
        })
      },
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/components/hotLinks'
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