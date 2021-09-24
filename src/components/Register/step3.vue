<template>
  <!-- step 3 -->
  <div class="register-step3">
    <h3 class="welcome">Chào mừng bạn!</h3>
    <p >Hãy cập nhật thông tin để mọi người kết nối với bạn dễ dàng hơn nhé 💔💙</p>
    <h5>Tên hiển thị </h5>
    <div class="info-form">
      <i class="far fa-user-circle"></i>
      <input type="text" placeholder="Tên hiển thị" v-model="userName">
    </div>
    <h5>Ngày sinh</h5>
    <div class="info-form">
      <i class="far fa-calendar-alt"></i>
      <input type="text" placeholder="08/09/2002" v-model="dateOfBirth">
    </div>
    <h5>Giới tính</h5>
    <div class="gender">
      <div @click="() => {this.gender = 'Nam'}"  class="gender-image">
        <img src="../../assets/gender/Male.png" :style="[this.gender == 'Nam' ? {opacity : 1} : '' ]" alt="">
        <span>Nam</span>
      </div>
      <div @click="() => {this.gender = 'Nữ'}" class="gender-image">
        <img src="../../assets/gender/Female.png" :style="[this.gender == 'Nữ' ? {opacity : 1} : '' ]" alt="">
        <span>Nữ</span>
      </div>
      <div @click="() => {this.gender = 'LGBT'}" class="gender-image">
        <img src="../../assets/gender/LGBT.png" :style="[this.gender == 'LGBT' ? {opacity : 1} : '' ]" alt="">
        <span>LGBT</span>
      </div>
    </div>
    <span class="wrongMsg">{{ this.wrongInfo }}</span>
    <button @click="registerInfo" class="btn" style="backgroundColor:#6FBE49">Tiếp tục</button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth"
import db from '../../firebase/index'
export default {
  name: 'Register',
  data () {
    return {
      wrongInfo : '',
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
    userName: {
      get() {
        return this.$store.state.userName;
      },
      set(payload) {
        this.$store.commit("setUserName", payload);
      },
    },
    dateOfBirth: {
      get() {
        return this.$store.state.dateOfBirth;
      },
      set(payload) {
        this.$store.commit("setDateOfBirth", payload);
      },
    },
    gender: {
      get() {
        return this.$store.state.gender;
      },
      set(payload) {
        this.$store.commit("setGender", payload);
      },
    },
    phoneNumber: {
      get() {
        return this.$store.state.phoneNumber;
      },
      set(payload) {
        this.$store.commit("setPhoneNumber", payload);
      },
    },
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
    async registerInfo () {
      if(this.userName == '' && this.dateOfBirth == '' && this.gender == '') {
        this.wrongInfo = "Vui lòng điền đầy đủ thông tin!"
      } else {
        const dataBase = db.collection("users").doc(firebase.auth().currentUser.uid);
        await dataBase.set({
          userUID: this.userUID,
          userName: this.userName,
          phoneNumber : this.phoneNumber,
          passWord : this.passWord,
          dateOfBirth: this.dateOfBirth,
          gender: this.gender,
        });  
        this.$router.push('/home')
      }
    }
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

.register-step3 {
  margin-top: 30px;

  .welcome {
    font-size: 25px;
    font-weight: 400;
  }

  .info-form {
    display: flex;
    align-items: center;
    position: relative;

    i {
      position: absolute;
      left: 15px;
    }

    input {
    @include input;
  }
  }

  p {
    font-size: 15px;
    margin: 20px 0 ;
  }

  h5 {
    margin: 10px 0;
    font-size: 15px
  }

  button {
    margin-top: 8px;
    font-size: 17px;
    color: #fff;
    background-color: #d5edca;
    padding: 15px;
    border-radius: 5px;
  }

  .gender {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .gender-image {
      width: 30%;
      cursor: pointer;
      text-align: center;

      img {
        width: 100%;
        opacity: 0.5;
      }

      span {
        font-size: 14px;
      }
    }
  }
}
</style>