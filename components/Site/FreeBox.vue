<template>
  <div class="freeboxContainer">
    <div class="card freebox" v-for="freebox in freeboxes" :key="freebox.id" v-bind:class="freebox.freeboxBg">
      <div class="card-body">
        <h4 class="card-title">
          <span>→</span>
          {{ freebox.freeboxTitle }}
        </h4>
        <p class="card-text">{{ freebox.freeboxText }}</p>
      </div>
      <img class="card-img-bottom width-full" :src="`images/freebox/${freebox.freeboxImg}`">
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  
  export default {
    data: function () {
      return {
        freeboxes: []
      }
    },
    methods: {
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/components/freeboxes'
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
  .ec
  {
    background-color: #ececec;
  }
  .f9
  {
    background-color: #f9f9f9;
  }
</style>