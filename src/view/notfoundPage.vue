<template>
  <div class="notfound">
    <div class="content">
      <h1 class="title">Trang không tồn tại</h1>
      <p class="description">Liên kết bạn truy cập có thể bị hỏng hoặc trang có thể đã bị gỡ.</p>
      <img src="../assets/notfound.svg" alt="" srcset="">
      <div class="action">
        <button class="foward">Quay về trang trước</button>
        <button class="back-home">Quay về trang chủ</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notfoundPage'
}
</script>

<style lang="scss" scoped>
.notfound {
   min-height: 100%;
  padding-top: 72px;
  position: relative;

  .content {
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    text-align: center;

  }
}
</style>