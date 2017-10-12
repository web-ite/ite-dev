<template>
  <section class="mainSection introContainer">
    <component-logo class="mb-2" />
    <h1>
      VTF CMS Admin Panel
    </h1>
    <p class="text-note mb-3">Please enter username and password.</p>
    <div class="alert text-center" v-bind:class="{'alert-info': showAlert === 'info', 'alert-warning': showAlert === 'warning', 'alert-success': showAlert === 'success'}">
      {{ alertText }}
    </div>
    <form class="form" @submit.prevent="validateUser">
      <div class="formGroup formGroup-column">
        <label class="formGroup__label formGroup__label-column">Username</label>
        <input type="text" name="username" class="formGroup__input" v-model="user.email" required/> 
      </div>
      <div class="formGroup formGroup-column">
        <label class="formGroup__label formGroup__label-column">Password</label>
        <input type="password" name="password" class="formGroup__input"  v-model="user.password" required/> 
      </div>
      <div class="formButtons formButtons-column">
        <button type="submit" class="button btn-block button-grey">Sign In</button>
        <a class="link">Forgot password?</a>
      </div>
    </form>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import ComponentLogo from '~/components/Admin/Logo.vue'

export default {
  components: {
    ComponentLogo
  },
  layout: 'admin',
  head () {
    return {
      title: 'CMS Sign In'
    }
  },
  data: function () {
    return {
      user: {},
      showAlert: 'info',
      alertText: 'Please enter email and password'
    }
  },
  methods: {
    validateUser: function () {
      let self = this
      if ((self.user.email === '') || (self.user.email === undefined) || (self.user.email === null)) {
        self.showAlert = 'warning'
        self.alertText = 'Please enter email'
      } else if ((self.user.password === '') || (self.user.password === undefined) || (self.user.password === null)) {
        self.showAlert = 'warning'
        self.alertText = 'Please enter password'
      } else {
        self.showAlert = 'success'
        self.alertText = 'Welcome'
        self.signInUser(self.user)
      }
    },
    signInUser: function (user) {
      axios({
        method: 'post',
        url: '/login',
        data: user
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

.introContainer
{
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.link
{
  cursor: pointer;
  text-decoration: none;
  color: #da510d;
  padding-bottom: 5px;
  border-bottom: 1px solid #da510d;
}

.link:hover, .link:focus
{
  text-decoration: none;
  color: inherit;
}

</style>