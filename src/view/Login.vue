<template>
  <div class="login">
    <div class="login-main">
      <div class="login-logo">
        <img src="../assets/logo.svg" alt="" srcset="">
      </div>

      <!-- account form -->
      <div class="login-form-account" v-show="!isVerifyForm && !isPassWordForm">
        <h2 class="login-welcome">Xin chào Gapoer!</h2>
        <p>Số điện thoại</p>
        <vue-tel-input v-model="phoneNumber" v-bind="bindProps"></vue-tel-input>
        <button class="btn continue-btn" id="log-in" @click="sendCaptcha" :style="[ this.phoneNumber !== '' ? {backgroundColor:'#6FBE49'} : '']">Tiếp tục</button>
        <button class="btn facebook-btn">Đăng nhập với Facebook</button>
      </div>

      <!-- verify form -->
      <div class="login-form-verify" v-show="isVerifyForm">
        <h2 class="login-welcome">Đăng kí tài khoản mới</h2>
        <p>Nhập mã xác thực gồm 6 chữ số gửi về số điện thoại {{this.phoneNumber}} của bạn</p>
        <input placeholder="------" maxlength="6"  type="text" v-model="optNumber" class="optInput">
        <button @click="verifyCode" class="btn continue-btn" :style="[ this.optNumber !== '' ? {backgroundColor:'#6FBE49'} : '']">Xác nhận</button>
        <div class="more" @click="visibleAccountForm"><span> Dùng số điện thoại khác</span></div>    
      </div>

      <!-- password form -->
      <div class="login-form-password" v-show="isPassWordForm" >
        <div class="avatar">
          <img src="../assets/default-user-avatar-2.png" alt="" srcset="">
        </div>
        <h2 class="login-password-welcome">Chào mừng bạn trở lại</h2>
        <div class="passWordInput">
          <i class="far fa-lock-alt lock-icon"></i>
          <input placeholder="Mật khẩu của bạn" :type="[this.visibleEye ? 'password' : 'text']" v-model="passWord" class="passWord">
          <i class="fal fa-eye eye-icon" @click="() => {this.visibleEye = !this.visibleEye}" v-show="visibleEye"></i>
          <i class="fal fa-eye-slash eye-icon"  @click="() => {this.visibleEye = !this.visibleEye}" v-show="!visibleEye"></i>
        </div>
        <button class="btn signIn-btn">Đăng nhập</button>
        <div class="more">
          <span @click="visibleAccountForm">Dùng số điện thoại khác</span>
          <span>Quên mật khẩu</span>
        </div>
      </div>

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
    <div class="login-background"></div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import "firebase/auth";
import { VueTelInput } from 'vue-tel-input';

export default {
  name:'Login',
  components: {
      VueTelInput,
  },
  data() {
    return {
      visibleEye: true,
      phoneNumber : '',
      optNumber : '',
      passWord: '',
      isVerifyForm: false,
      isPassWordForm : false,
      confirmationResult:null,
      recaptchaVerifier:null,
      confirmResult:null,
      bindProps: {
        mode: "international",
        defaultCountry: "VN",
        maxLen: 15,
      }
    }
  },

  methods: {
    visibleAccountForm () {
      this.isVerifyForm = false
      this.isPassWordForm = false
    },
    sendCaptcha() {
      firebase.auth().useDeviceLanguage()         
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('log-in',{
        'size':'invisible',
        'callback':(response) => {
          console.log(response)
        }
      })            
      var number = this.phoneNumber            
      firebase.auth().signInWithPhoneNumber(number,this.recaptchaVerifier)
      .then((confirmationResult)=>{                
          this.confirmResult = confirmationResult
          console.log(this.confirmResult)
          console.log("Sms Sent!")
          this.isVerifyForm = true
          this.isPassWordForm = false
      })
      .catch((error)=>{
          console.log("Sms not sent",error.message)
      })
    },
    verifyCode()
    {            
      this.confirmResult.confirm(this.optNumber)
      .then((result)=>{
          alert("Registeration Successfull!",result)
          var user = result.user
          console.log(user)                
      })
      .catch((error)=>{
          console.log(error)
      })
    },
  }
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

    .login-form-account, .login-form-password, .login-form-verify {
      margin-top: 30px;

      .login-welcome {
        font-size: 35px;
        margin: 60px 0 30px;
      }

      .login-password-welcome {
        margin: 30px 0 ;
      }


      .vue-tel-input {
        padding: 5px ;
        margin-top: 10px;
        height: 50px;
      }

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        overflow: hidden;

        img {
          width: 100%;
          object-fit: contain;
        }
      }

      .optInput {
        margin-top: 10px;
        font-size: 18px;
        width: 100%;
        padding: 15px ;
        outline: none;
        border-radius: 5px;
        border: none;
        border: 1px solid rgb(231, 231, 231);
        letter-spacing: 30px;
        text-align: center;
      }

      .passWordInput {
        margin-top: 10px;
        display: flex;
        position: relative;
        align-items: center;

        .passWord  {
          @extend .optInput;
          letter-spacing: unset;
          text-align: left;
          margin-top: 0;
          padding: 15px 40px;
        }

        .lock-icon {
          position: absolute;
          left: 15px;
        }

        .eye-icon {
          position: absolute;
          right: 15px;
          cursor: pointer;
        }
      }

      .continue-btn {
        width: 100%;
        margin-top: 8px;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 17px;
        color: #fff;
        background-color: #d5edca;
        padding: 15px;
        border-radius: 5px;
      }

      .signIn-btn {
        @extend .continue-btn;
        background-color: #6FBE49;
      }

      .facebook-btn {
        width: 100%;
        margin-top: 25px;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 17px;
        color: #fff;
        background-color: #235ca8;
        padding: 15px;
        border-radius: 5px;
      }

      .more {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        color: #6fbe44;

        span {
          cursor: pointer;
        }
      }
    }

    .login-company-name {
        margin-top: 30px;
      }

      .login-company-more {
        margin: 15px 0;
      }

      .login-support {
        margin: 15px 0;
      }
  }

  &-background {
    width: 65%;
    background-image: url('../assets/right-cover.jpg');
  }
}
</style>