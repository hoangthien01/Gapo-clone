<template>
  <div class="wrapper">
    <user-photo-preview></user-photo-preview>
    <div class="personal-page">
      <div class="profile-head">
        <div class="cover-image">
          <img :src="coverImage()" alt="">
          <div class="camera-icon" @click="$refs.fileInput.click()">
            <input type="file" ref="fileInput" style="display:none" @change="fileSelected">
            <i class="fal fa-camera"></i>
            <span>Cập nhật ảnh bìa</span>
          </div>
          <div class="user-image">
            <input type="file" ref="userPhotoInput" style="display:none" @change="userPhotoSelected">
            <img :src="user.userPhotoURL" alt="" srcset="">
          </div>
          <div class="avatar-mask">
              <div class="view-avatar" @click="$store.commit('setUserPhotoPreview')">
                <img src="../assets/eye-icon.svg" alt="" srcset="">
                <p>Xem ảnh</p>
              </div>
              <div class="edit-avatar" @click="$refs.userPhotoInput.click()">
                <img src="../assets/photo-icon.svg" alt="" srcset="">
                <p>Thay ảnh</p>
              </div>
          </div>
          <div class="list-btn" v-show="previewImage">
            <button class="cancel-btn" @click="cancelCoverImage">Hủy</button>
            <button class="save-btn" @click="saveCoverImage">Lưu</button>
          </div>
        </div>
        <div class="profile-head-content">
          <h1 class="profile-user-name">{{user.userName}}</h1>
          <div class="profile-user-bow">
            <img src="../assets/bow/bachduong.svg" alt="" srcset="">
            Bạch Dương
          </div>
          <p class="profile-user-description">Mô tả ngắn về bản thân của bạn. <span>Thêm mô tả</span></p>
        </div>

        <div class="profile-head-nav">
          <ul class="list-nav" >
            <li class="profile-head-item" @click="changeActiveNav(' ')" :class="{ 'nav-item-active' : activeNav === ' '}">Dòng thời gian</li>
            <li class="profile-head-item" @click="changeActiveNav('about')" :class="{ 'nav-item-active' : activeNav === 'about'}">Giới thiệu</li>
            <li class="profile-head-item" @click="changeActiveNav('friends')" :class="{ 'nav-item-active' : activeNav === 'friends'}">Bạn bè</li>
            <li class="profile-head-item" @click="changeActiveNav('images')" :class="{ 'nav-item-active' : activeNav === 'images'}">Ảnh</li>
          </ul>
          <div class="list-action">
            <div v-show="user.userUID != this.$store.state.userUID">
              <button class="btn btn-follow">
                <i class="fas fa-wifi"></i>
                <span>Theo dõi</span>
              </button>
              <button class="btn btn-follow" @click="newMessage(user)">
                <i class="fas fa-comment"></i>
                <span>Nhắn tin</span>
              </button>
              <button class="btn btn-follow">
                <i class="fas fa-user-plus"></i>
                <span>Kết bạn</span>
              </button>
            </div>
            <button class="btn-settings" @click="() => {this.activeSettings = !this.activeSettings}">
              <i class="fas fa-cog" ></i>
              <ul class="list-settings" v-show="activeSettings">
                <li class="setting-item">
                  <i class="fas fa-cog" ></i>
                  Cài đặt
                </li>
                <li class="setting-item">
                  <i class="fas fa-edit"></i>
                  Chỉnh sửa thông tin
                </li>
                <li class="setting-item">
                  <i class="fad fa-lock-alt"></i>
                  Thay đổi mật khẩu
                </li>
              </ul>
            </button>
          </div>
        </div>
      </div>

      <time-line :user="this.user" v-show="activeNav == ' '"></time-line>
      <intro :user="this.user" v-show="activeNav == 'about'"></intro>
      <friends v-show="activeNav == 'friends'"></friends>
      <images v-show="activeNav == 'images'"></images>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import db from '../firebase/index'
import "firebase/storage"
import TimeLine from '../components/Personal/TimeLine.vue'
import Intro from '../components/Personal/Intro.vue'
import Friends from '../components/Personal/Friends.vue'
import Images from '../components/Personal/Images.vue'
import userPhotoPreview from '../components/Personal/userPhotoPreview.vue'
export default {
  name: 'Personal',
  components : {
    TimeLine,Intro,Friends,Images,userPhotoPreview
  },
  computed : {
    coverImageURL: {
      get() {
        return this.$store.state.coverImageURL;
      },
      set(payload) {
        this.$store.commit("setCoverImageURL", payload);
      },
    },
  },
  data () {
    return {
      activeNav : ' ',
      previewImage : '',
      fileCoverImage: '',
      fileAvatar : '',
      userPhoto : '',
      activeSettings: false,
      user : {}
    }
  },
  async created () {
    const userUID = this.$route.params.userId
    await db.collection("users").where("userUID","==",userUID)
      .onSnapshot(
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.user = doc.data()
            console.log(doc.data())
          });
      })
    if(this.user ==  null) this.$router.push('404/notfound-user')
  },
  methods: {
    changeActiveNav (name) {
      this.activeNav = name
      this.$router.push("/" + this.$store.state.userUID+ "/"+ name)
    },
    fileSelected (e) {
      //get file upload
      this.fileCoverImage = e.target.files[0];
      // preview file uploaded in screen
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.previewImage = e.target.result;
      }
    },
    async userPhotoSelected (e){
      //get file avatar
      this.fileAvatar =  e.target.files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(this.fileAvatar );
      // reader.onload = e =>{
      //   this.userPhoto = e.target.result;
      // }
      // push it up storage
      const imageName = this.fileAvatar.name
      const storageRef = firebase.storage().ref();
      var imagesRef = storageRef.child(`avatar/${imageName}`);
      await imagesRef.put(this.fileAvatar).then(() => {
        console.log('Uploaded a blob or file!');
        this.fileAvatar = ''
      });
      // update userPhotoURL in currentUser
      const downloadURL = await imagesRef.getDownloadURL();
      db.collection("users").doc(this.user.userUID).update({
        userPhotoURL : downloadURL
      }); 
      // update userPhotoURl in all posts of currentUser
      db.collection("posts").where('userUID', '==', this.user.userUID)
      .get()
      .then(snapshots => {
        if (snapshots.size > 0) {
          snapshots.forEach(orderItem => {
            db.collection("posts").doc(orderItem.id).update ({ 
              userPhotoURL : downloadURL
            })
          })
        }
      })
    },
    coverImage () {
      if(this.previewImage == '') {
        return this.user.coverImageURL
      }
        else return this.previewImage
    },
    cancelCoverImage () {
      this.previewImage = ''
    },
    async saveCoverImage () {
      // push coverIamge up storage
      // this.coverImageURL = this.previewImage
      const imageName = this.fileCoverImage.name
      const storageRef = firebase.storage().ref();
      var imagesRef = storageRef.child(`coverImages/${imageName}`);
      await imagesRef.put(this.fileCoverImage).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot)
      });
      const downloadURL = await imagesRef.getDownloadURL();
      // update coverImage of currentUser in firestore
      const dataBase = db.collection("users").doc(this.user.userUID);
      await dataBase.update({
        coverImageURL : downloadURL
      }); 
      this.previewImage = ''
      this.fileCoverImage = ''
    },
    async newMessage (user) {
      const database = db.collection("messages").doc()
      await database.set({
        messageId : database.id,
        user1 : user ,
        user2 : this.$store.state.user,
        messages: [
          {
            userPhotoURL : this.$store.state.userPhotoURL,
            text : 'hellow',
            userUID : this.$store.state.userUID
          }
        ],
      })
      this.$store.dispatch("getAllMessages")
      this.$router.push('/chat')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100%;
  padding-top: 80px;
  background-color: #F2F2F2;

  .personal-page {
    width: 872px;
    margin: auto;

    .profile-head {
      background-color: #fff;
      text-align: center;
      margin-bottom: 20px;
      border-radius: 8px;
      
      .cover-image {
        position: relative;
        width: 100%;
        height: 290px;
        object-fit: cover;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .camera-icon{
          position: absolute;
          bottom: 20px;
          right: 20px;
          padding: 6px 8px;
          border-radius: 5px;
          color: #fff;
          background-color: rgba(26,26,26,.65098);
          border-color: grey;
          cursor: pointer;

          &:hover {
            background-color: rgba(7,7,7,.65098);
            border-color: rgba(1,1,1,.65098);
          }

          i {
            margin-right: 5px;
          }
        }

        .user-image{
          position: absolute;
          bottom: -20px;
          width: 156px;
          height: 156px;
          border-radius: 50% ;
          overflow: hidden;
          transform: translateX(-50%);
          left: 50%;
          border: .25rem solid #fff;

          img {
            width: 100%;
            object-fit: cover;
          }

          &:hover + .avatar-mask {
            display: flex;
          }
        }

        .avatar-mask  {
          @extend .user-image;
          width: 156px;
          height: 156px;
          display: none;
          background: #000;
          opacity: .55;
          z-index: 99999;

          .view-avatar,.edit-avatar {
            cursor: pointer;
            width: 50%;
            border-right: 1px solid #fff;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 13px;
          }

          img {
            width: 20px;
            height: 20px;
            
          }
        }

        .list-btn {
          bottom: -40px;
          position: absolute;
          right: 20px;

          .cancel-btn {
            padding: 8px 15px;
            margin-right: 10px;
            cursor: pointer;
            border-radius: 4px;
            border: none;
            color: #4d4d4d;
            font-weight: bold;
          }

          .save-btn {
            border: none;
            background: #6fbe49;
            color: #f5f5f5;
            border-radius: 4px;
            padding: 8px 34px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }

      &-content {
        padding: 24px 0 16px;

        .profile-user-name {
          font-size: 24px;
          font-weight: 500;
        }

        .profile-user-bow {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 8px 0;

          img {
            width: 20px;
            margin-right: 8px;
          }
        }

        .profile-user-description {

          span {
            color: #6fbe44;
          }
        }
      }

      .profile-head-nav {
        display: flex;
        border-top: 1px solid #f2f2f2;
        padding: 0 16px;
        align-items: center;
        justify-content: space-between;

        .list-nav {
          list-style: none;
          display: flex;

          .profile-head-item {
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            padding: 16px;
          }

          .nav-item-active {
            border-bottom: .1875rem solid #6fbe44;
          }
        }

        .list-action {
          display: flex;
          align-items: center;

          .btn {
            width: auto;
            margin:  5px;

            i {
              margin-right: 3px;
            }
          }

          .btn-settings {
            height: 30px;
            width: 35px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
            
            .list-settings {
              position: absolute;
              top: 125%;
              right: -10px;
              z-index: 999;
              list-style: none;
              width: 220px;
              background-color: #fff;
              text-align: left;
              border-radius: 5px;
              border: 1px solid #e5e5e5;
              box-shadow: 0 0 8px rgba(0,0,0,0.3);
              font-size: 14px;
  
              .setting-item {
                padding: 15px 30px;
  
                i {
                  margin-right: 5px;
                }
  
                &:hover {
                  background-color: #6fbe44;
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>