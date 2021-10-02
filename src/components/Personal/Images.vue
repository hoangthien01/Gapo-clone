<template>
  <div class="images-wrapper">
    <button class="btn-add-images">+ Thêm ảnh</button>
    <div class="images">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Images',
}
</script>

<style lang="scss" scoped>
.images-wrapper {
  padding-bottom: 40px;
  text-align: right;

  .btn-add-images {
    border: none;
    background-color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    margin: 20px 0;
    cursor: pointer;
  }

  .images {
    padding: 12px;
    background-color: #fff;
    border-radius: 3px;
    height: 300px;

  }
}
</style>