<template>
  <div class="login">

    <div class="login-main">
      <div class="login-logo">
        <img src="../assets/logo.svg" alt="" srcset="">
      </div>
      <router-view></router-view>
      <div v-show="this.currentStep != 3">
        <h4 class="login-company-name">Công ty Cổ phần Công nghệ Gapo</h4>
        <div class="login-company-more">
          <p >Địa chỉ: 204B, Tòa N01B, Tòa nhà Golden Land, 275 Nguyễn Trãi, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam</p>
          <p>SĐT: 024 73 066 222 Email: hotro@gapo.vn </p>
          <p> Người chịu trách nhiệm quản lý nội dung: Hà Trung Kiên</p>
          <p>Giấy phép số 222/GP-BTTTT do Bộ TT&TT cấp ngày 27/5/2020</p>
        </div>
        <hr>

        <div class="login-support">
          <span>Chính sách & Điều khoản</span>
          <span>Câu hỏi thường gặp</span>
          <span>Trợ giúp</span>
        </div>
      
      </div>
    </div>
    <div class="login-background"></div>
  </div>
</template>

<script>
export default {
  name:'Login',
  data() {
    return {
    }
  },
  computed: {
    currentStep() {
      return this.$route.params.step
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 100vh;

  &-main {
    width: 35%;
    padding: 50px 68px;

    .login-logo {
      width: 130px;
      height: 45px;

      img {
        width: 100%;
        object-fit: contain;
      }
    }

    .login-company-name {
        margin-top: 30px;
        font-size: 14px;
      }

      .login-company-more {
        margin: 15px 0;
        font-size: 14px;
      }

      .login-support {
        margin: 15px 0;
        font-size: 14px;
      }
  }

  &-background {
    width: 65%;
    background-image: url('../assets/right-cover.jpg');
  }
}
</style>