<template>
  <div>
      <!-- account form -->
      <div class="login-form-account" v-show="!isPassWordForm">
        <h2 class="login-welcome">Xin chào Gapoer!</h2>
        <p>Số điện thoại</p>
        <vue-tel-input v-model="phoneNumber" v-bind="bindProps"></vue-tel-input>
        <p class="wrongMsg">{{ this.wrongMsg }}</p>
        <button class="btn continue-btn" id="log-in" @click="signInWithPhoneNumber" :style="[ this.phoneNumber !== '' ? {backgroundColor:'#6FBE49'} : '']">Tiếp tục</button>
        <button class="btn facebook-btn" @click="signInWithFacebook">Đăng nhập với Facebook</button>
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
        <p class="wrongMsg">{{ this.wrongPassWord }}</p>
        <button class="btn signIn-btn" @click="signIn">Đăng nhập</button>
        <div class="more">
          <span @click="visibleAccountForm">Dùng số điện thoại khác</span>
          <span>Quên mật khẩu</span>
        </div>
      </div>
</div>
</template>

<script>
import firebase from 'firebase/app'
import "firebase/auth";
import { VueTelInput } from 'vue-tel-input';
import db from '../firebase/index'
export default {
  name:'Login',
  components: {
      VueTelInput,
  },
  data() {
    return {
      visibleEye: true,
      passWord: '',
      isPassWordForm : false,
      bindProps: {
        mode: "international",
        defaultCountry: "VN",
        maxLen: 15,
      },
      user: null,
      wrongMsg : '',
      wrongPassWord : '',
      length : null,
    }
  },
   computed: {
    phoneNumber: {
      get() {
        return this.$store.state.phoneNumber;
      },
      set(payload) {
        this.$store.commit("setPhoneNumber", payload);
      },
    },
    userPhotoURL: {
      get() {
        return this.$store.state.userPhotoURL;
      },
      set(payload) {
        this.$store.commit("setUserPhotoURL", payload);
      },
    }
  },
  methods: {
    visibleAccountForm () {
      this.isPassWordForm = false
    },
    async signInWithPhoneNumber() {
      firebase.auth().useDeviceLanguage()         
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('log-in',{
        'size':'invisible',
        'callback':(response) => {
          console.log(response)
        }
      })   

      console.log(this.phoneNumber)
      await db.collection("users").where("phoneNumber","==",this.phoneNumber).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            this.$store.commit("updateUser",doc.data())
            this.$store.commit("setProfileInfo",doc)
            console.log(doc.data())
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
      if (this.$store.state.user != null) {
        var testVerificationCode = "123456";
        firebase.auth().settings.appVerificationDisabledForTesting = true;
        await firebase.auth().signInWithPhoneNumber(this.phoneNumber, window.recaptchaVerifier)
          .then(function (confirmationResult) {
            return confirmationResult.confirm(testVerificationCode)
          }).catch(function () {
          });
          console.log(firebase.auth().currentUser.uid)
        this.isPassWordForm = true
      } else {           
        firebase.auth().signInWithPhoneNumber(this.phoneNumber,window.recaptchaVerifier)
        .then((confirmationResult)=>{        
            window.confirmationResult = confirmationResult
            console.log("Sms Sent!")
            this.$router.push({ name: 'Register', params: { step: '1' } })   
        })
        .catch((error)=>{
          this.wrongMsg = error.message
        })
      }
    },
    async signInWithFacebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_birthday, email,user_photos')
      firebase.auth().useDeviceLanguage();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          // var credential = result.credential;
          var user = result.user;
          var additionalUserInfo = result.additionalUserInfo.profile
          console.log(user)
          console.log(result)
          // var accessToken = credential.accessToken;
          // this.userPhotoURL = user.photoURL + "?height=500&access_token=" + accessToken ;
          this.userPhotoURL = additionalUserInfo.picture.data.url
          const dataBase = db.collection("users").doc(firebase.auth().currentUser.uid);
          if(dataBase.get().userUID == ''){
            dataBase.set({
              userUID: user.uid,
              userName: user.displayName,
              userEmail : user.email,
              dateOfBirth : additionalUserInfo.birthday,
              userPhotoURL: this.userPhotoURL,
              coverImageURL: require('../assets/default-cover.jpg')
            });  
          }
          this.$router.push('/home')
        })
        .catch((error) => {
          console.log(error.message)
        });
    },
    signIn() {
      if(this.passWord == this.$store.state.passWord) {
        this.$router.push('/home')
      } else {
        this.wrongPassWord = "Mật khẩu không chính xác!!!"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrongMsg {
  color: red;
  font-size: 13px;
}

.login-form-account, .login-form-password{
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
}
</style>