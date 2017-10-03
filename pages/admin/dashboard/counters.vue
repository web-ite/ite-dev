<template>
  <div class="adminContentSection w-80 p-4">
    <div class="row w-100">
      <div class="col-12">
        <h4 class="page-header">Counters</h4>
      </div>
    </div>
    <form class="form-horizontal w-100">
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-yandex-counter">Yandex counter</label>
        <div class="col-12 col-sm-8">
          <textarea name="input-ya-counter" class="form-control" rows="5"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-g">Google counter</label>
        <div class="col-12 col-sm-8">
          <textarea name="input-seo-keywords" class="form-control" rows="5"></textarea>
        </div>
      </div>
      <div class="form-buttons">
        <button class="btn btn-primary float-right">Add counters</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  layout: 'admin_dashboard',
  head () {
    return {
      title: 'Counters'
    }
  }
}
</script>