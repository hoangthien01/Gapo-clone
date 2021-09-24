<template>
  <!-- step 2 -->
  <div class="register-step2">
    <h2 class="welcome">Đăng kí tài khoản mới</h2>
    <p>Tạo mật khẩu mới tối thiểu 8 ký tự, bao gồm cả chữ và số</p>
    <div class="password-form">
        <input placeholder="Tạo mật khẩu mới" :type="[this.visibleEye ? 'password' : 'text']" v-model="passWord" class="password-input">
        <i class="fal fa-eye eye-icon" @click="() => {this.visibleEye = !this.visibleEye}" v-show="visibleEye"></i>
        <i class="fal fa-eye-slash eye-icon"  @click="() => {this.visibleEye = !this.visibleEye}" v-show="!visibleEye"></i>
    </div>
      <div class="password-form">
        <i class="fas fa-check-circle check-icon" :style="[passWord === passWordConfirme && passWord != ''? { color:'#6FBE49' }: { color:'#ccc' }]"></i>
        <input placeholder="Xác nhận mật khẩu" :type="[this.visibleEye1 ? 'password' : 'text']" v-model="passWordConfirme" class="password-input">
        <i class="fal fa-eye eye-icon" @click="() => {this.visibleEye1 = !this.visibleEye1}" v-show="visibleEye1"></i>
        <i class="fal fa-eye-slash eye-icon"  @click="() => {this.visibleEye1 = !this.visibleEye1}" v-show="!visibleEye1"></i>
    </div>
    <span class="wrongMsg">{{ this.wrongPassWord }}</span>
    <button @click="confirmPassWord" class="btn continue-btn" style="backgroundColor:#6FBE49">Tiếp tục</button>
    <div class="more" >Bằng việc tiếp tục, bạn đồng ý với <span> Chính sách bảo mật </span> và <span> Điều khoản sử dụng</span></div>   
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      passWordConfirme : '',
      wrongPassWord : '',
      visibleEye : true,
      visibleEye1 : true,
    }
  },
  computed : {
    passWord: {
      get() {
        return this.$store.state.passWord;
      },
      set(payload) {
        this.$store.commit("setPassWord", payload);
      },
    },
  },
  methods : {
    confirmPassWord () {
      if(this.passWord == '' && this.passWordConfirme == '' ) {
        this.wrongPassWord = "Mật khẩu không được để trống"
      }
      else if (this.passWord == this.passWordConfirme) {
        this.$router.push({ name: 'Register', params: { step: '3' } })     
      } else {
        this.wrongPassWord = "Mật khẩu không khớp"
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@mixin input {
  font-size: 18px;
  width: 100%;
  padding: 15px 45px ;
  outline: none;
  border-radius: 5px;
  border: none;
  border: 1px solid rgb(231, 231, 231);
}

.wrongMsg {
  color: red;
  font-size: 13px;
}

.register-step2 {
  margin-top: 30px;

  .welcome {
    font-size: 32px;
    margin: 60px 0 30px;
  }

  p {
    font-size: 14px;
  }

  .password-form {
    margin-top: 10px;
    position: relative;
    display: flex;
    align-items: center;

    .password-input {
      @include input
    }

    .eye-icon {
      position: absolute;
      right: 15px;
      cursor: pointer;
    }

    .check-icon {
      position: absolute;
      left: 15px;
      color: #ccc;
    }
  }

  .continue-btn {
    margin-top: 8px;
    font-size: 17px;
    color: #fff;
    background-color: #d5edca;
    padding: 15px;
    border-radius: 5px;
  }

  .more {
    margin-top: 10px;

    span {
      cursor: pointer;
      color: #6fbe44;
    }
  }
}
</style>