<template>
  <div class="notfound">
    <div class="content">
      <img src="../assets/empty-group.png" alt="" srcset="">
      <p class="title">Không tải được trang cá nhân</p>
      <p class="description">Tài khoản này đã bị chặn hoặc bị xóa</p>
      <button class="btn-return" @click="$router.push('/home')">Trở về trang chủ</button>
    </div>
  </div>
</template>

<script>
export default {
  name: '404'
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

    img {
      filter: grayscale(100%);
    }

    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;
      margin: 0px 0px 8px;
      padding: 0px;
      text-align: center;
    }

    .description {
      font-style: normal;
      line-height: 20px;
      padding: 0px;
      text-align: center;
      margin-bottom: 12px;
      font-size: 12px;
      color: grey;
    }

    .btn-return {
      border-radius: 8px;
      height: 36px;
      padding: 0 20px;
      color: rgb(255, 255, 255);
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      background-color: rgb(111, 190, 73);
      font-weight: 600;
      margin: auto;
    }
  }
}
</style>