<template>
  <!-- step 1-->
  <div>
    <div class="register-step1">
      <h2 class="welcome">Đăng kí tài khoản mới</h2>
      <p>Nhập mã xác thực gồm 6 chữ số gửi về số điện thoại {{this.$store.state.phoneNumber}} của bạn</p>
      <input placeholder="------" maxlength="6"  type="text" v-model="optNumber" class="optInput">
      <span class="wrongMsg">{{ this.wrongCode }}</span>
      <button @click="verifyCode" class="btn continue-btn" :style="[ this.optNumber !== '' ? {backgroundColor:'#6FBE49'} : '']">Xác nhận</button>
      <div class="more" ><span> Dùng số điện thoại khác</span></div>    
    </div>
    <slot></slot>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import "firebase/auth"
// import db from '../../firebase/index'
export default {
  name: 'Register',
  data () {
    return {
      optNumber : '',
      wrongCode: '',
      visibleEye : true,
      visibleEye1 : true,
    }
  },
  computed : {
     userUID: {
      get() {
        return this.$store.state.userUID;
      },
      set(payload) {
        this.$store.commit("setUserUID", payload);
      },
    },
  },
  methods : {
    verifyCode()
    {       
      window.confirmationResult.confirm(this.optNumber)
      .then(()=>{
        console.log(firebase.auth().currentUser.uid);
        this.userUID = firebase.auth().currentUser.uid
        this.$router.push({ name: 'Register', params: { step: '2' } })     
      })
      .catch((error)=>{
          this.wrongCode = error.message
          console.log(error)
      })
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

.register-step1{
  margin-top: 30px;

  .welcome {
    font-size: 32px;
    margin: 60px 0 30px;
  }

  p {
    font-size: 14px;
  }

  .optInput {
    margin-top: 10px;
    letter-spacing: 30px;
    text-align: center;
    @include input
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