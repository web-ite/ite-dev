<template>
  <section class="mainSection introContainer">
    <component-logo class="mb-2" />
    <h1>
      VTF CMS Admin Panel
    </h1>
    <p class="text-note mb-3">Please enter username and password.</p>
    <div class="form">
      <div class="formGroup formGroup-column">
        <label class="formGroup__label formGroup__label-column">Username</label>
        <input type="text" name="username" class="formGroup__input" /> 
      </div>
      <div class="formGroup formGroup-column">
        <label class="formGroup__label formGroup__label-column">Password</label>
        <input type="password" name="password" class="formGroup__input" /> 
      </div>
      <div class="formButtons formButtons-column">
        <a href="/admin/dashboard" class="button button-grey">Sign In</a>
      </div>
    </div>
  </section>
</template>

<script>
import ComponentLogo from '~/components/Admin/Logo.vue'

export default {
  components: {
    ComponentLogo
  },
  layout: 'admin',
  head () {
    return {
      title: 'Интерфейс администратора'
    }
  }
}
</script>

<style>

.introContainer{
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>