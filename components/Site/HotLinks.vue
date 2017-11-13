<template>
  <div class="hotLinksContainer" v-bind:class="{ 'd-relative': $store.state.admin }">
    <div class="hotLink" v-for="hotLink in hotLinks" :key="hotLink.id">
      <a :href="hotLink.hotLinkLink">
        <img class="hotLinkIcon" :src="`images/${hotLink.hotLinkIcon}`">
        <span class="hotLinkTitle">{{ hotLink.hotLinkTitle}}</span>
      </a>
    </div>
    
    <div v-if="$store.state.admin" class="d-modal">
      <button class="btn btn-primary btn-edit-mode" @click="hotLinksModel = true">Edit</button>
      <b-modal ref="hotLinksModelRef" hide-header-close title="Edit hot links">

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
        hotLinks: []
      }
    },
    methods: {
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/components/hotLinks'
        }).then((response) => {
          self.hotLinks = response.data
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