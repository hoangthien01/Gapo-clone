<template>
  <div class="warraper">
    <div class="home-main-head" v-show="this.$store.state.userUID == this.user.userUID">
      <div class="avatar">
        <img :src="this.$store.state.userPhotoURL">
      </div>
      <button class="create-btn" @click="() => this.activeCreatePost = true">Đăng bài viết</button>
      <img class="upload-image" src="../assets/picture-video.svg" @click="() => this.activeCreatePost = true">
      <div class="overlay" @click="clickOutSide" v-show="activeCreatePost"></div>
      <div class="create-post" v-show="activeCreatePost">
        <div class="create-post-head">
          <div class="user-image">
            <img :src="this.$store.state.userPhotoURL" alt="" srcset="">
          </div>
          <div>
            <p class="user-name">{{this.$store.state.userName}}</p>
            <button class="access-permission">
              <i class="fas fa-globe-asia"></i>
              <span>Công khai</span>
              <i class="fas fa-sort-down"></i>
              <div class="option-list">
                <div class="option-item">
                  <span class="radio-input"></span>
                  <p >
                   <i class="fas fa-globe-asia"></i>
                   Công Khai
                  </p>
                </div>
                <div class="option-item">
                  <span class="radio-input"></span>
                  <p >
                   <i class="fas fa-user-friends"></i>
                   Bạn bè
                  </p>
                </div>
                <div class="option-item">
                  <span class="radio-input"></span>
                  <p>
                   <i class="fas fa-lock-alt"></i>
                   Chỉ mình tôi
                  </p>
                </div>
              </div>
            </button>
          </div>
          <div class="create-post-exit" @click="() => this.activeCreatePost = false">
            <i class="fal fa-times-circle"></i>
          </div>
        </div>
        <div class="create-post-main">
          <textarea class="text-area" cols="100%" rows="8" placeholder="Bạn muốn chia sẻ điều gì?" v-model="text"></textarea>
          <div class="create-post-action">
            <div class="action-item">
              <span >Aa</span>
              <img src="../assets/smile.svg" alt="" srcset="">
            </div>
            <div class="action-item" @click="$refs.inputImage.click()">
              <img src="../assets/picture-video.svg" alt="" srcset="">
              <input type="file" ref="inputImage" style="display:none"  @change="photoURLSelected">
              <span>Ảnh/Video</span>
            </div>
             <div class="action-item">
              <img src="../assets/livestream-camera.svg" alt="" srcset="">
              <span>Livestream</span>
            </div>
             <div class="action-item">
              <img src="../assets/icon-ask.svg" alt="" srcset="">
              <span >Hỏi đáp</span>
            </div>
          </div>
          <button class="btn create-post-share" @click="postStatus" >
            <span v-show="!isPosting"> Chia sẻ</span>
            <div class="ani-create-post" v-show="isPosting">
              <div class="one"></div>
              <div class="two"></div>
              <div class="three"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
    <!-- <div class="home-main-fad">
      <h4>Xu hướng nổi bật</h4>
    </div> -->
    <div class="home-main-content">
      <div class="post-item" v-for="(post,index) in  posts" :key="index">
        <div class="post-item__head">
          <div class="user-image" @click="$router.push('/'+ post.userUID)">
            <img :src="post.userPhotoURL" alt="" srcset="">
          </div>
          <div>
            <p class="user-name" >{{post.userName}}</p>
            <p class="time">{{new Date(post.date).toLocaleString("en-us", { dateStyle: "long" })}}</p>
          </div>
          <div class="setting" @click="() => {turnOnSetting = post.postID}">
            <i class="far fa-ellipsis-h"></i>
          </div>
          <div class="overlay" style="background-color : transparent" @click="clickOutSide" v-show="turnOnSetting !=''"></div>
          <ul class="list-settings"  v-show="post.postID == turnOnSetting">
            <li class="setting-item">
              <i class="fas fa-paperclip"></i>
              <span>Sao chép link bài viết</span>
            </li>
            <li class="setting-item">
              <i class="far fa-copy"></i>
              <span>Sao chép nội dung bài viết</span>
            </li>
            <li class="setting-item">
              <i class="far fa-bell-slash"></i>
              <span>Tắt thông báo về bài viết này</span>
            </li>
            <li class="setting-item">
              <i class="far fa-edit"></i>
              <span> Chỉnh sửa bài viết</span>
            </li>
            <li class="setting-item" @click="deletePost(post.postID)">
              <i class="far fa-trash-alt"></i>
              <span>Xóa bài viết</span>
            </li>
          </ul>
        </div>
        <div class="post-item__content">
          <p>{{post.text}}</p>
        </div>
        <div class="post-item__attachment" v-show="post.photoURL != ''">
          <img :src="post.photoURL" alt="" srcset="">
        </div>
        <div class="post-item__stats" v-show="post.numberComments != 0 || post.liked != 0">
          <div class="react">
              <div class="react-image"><img src="../assets/react/like-circle.svg" alt="" srcset=""></div>
              <div class="react-image"><img src="../assets/react/haha-reaction.svg" alt="" srcset=""></div>
              <div class="react-image"><img src="../assets/react/sad-reaction.svg" alt="" srcset=""></div>
              <span class="quantity">{{post.liked}}</span>
          </div>
          <div class="number">
            <div class="number-comments">
              <span >{{post.numberComments}} bình luận</span>
            </div>
            <div class="number-seen">
              <span >1.1k lượt xem</span>
            </div>
          </div>
        </div>
        <div class="post-item__action">
          <div class="item" @click="likePost(post)" 
            :class="{active: post.listUserLiked.indexOf($store.state.userUID) != -1}"
          >
            <i class="fal fa-thumbs-up"></i>
            <span>Thích</span>
          </div>
          <div class="item" @click="$refs.input[index].focus()">
            <i class="fal fa-comment-alt"></i>
            <span >Bình luận</span>
          </div>
          <div class="item">
            <i class="fal fa-share"></i>
            <span >Chia sẻ</span>
          </div>
        </div>
        <div class="post-item__comments">
          <div class="comment-item" v-for="(comment,index) in post.comments" :key="index">
            <div class="user-image">
              <img :src="comment.userPhotoURL" alt="" srcset="">
            </div>
            <div class="info">
              <p class="name">{{comment.userName}}</p>
              <p class="text">{{comment.text}}</p>
            </div>
          </div>
        </div>
        <div class="comment">
          <div class="user-image">
            <img :src="$store.state.userPhotoURL" alt="" srcset="">
          </div>
          <div class="input-form">
            <p class="input" role="textbox" contenteditable 
              @keyup.enter ="sendComment(post,index)"
              @keydown.enter.prevent
              ref= "input"
            > </p>
            <div class="action">
              <i class="fal fa-smile"></i>
              <i class="fal fa-camera"></i>
              <img src="../assets/react/sticker.svg" alt="" srcset="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
// import firebase from 'firebase/app'
import "firebase/auth";
import db from '../firebase/index'
export default {
  name : 'News',
  data () {
    return {
      activeCreatePost : false,
      text : '',
      photo : '',
      isPosting : false,
      turnOnSetting : ''
    }
  },
  props : [
    'posts','user'
  ],
  methods: {
    clickOutSide() {
      this.activeCreatePost = false
      this.turnOnSetting = ''
    },
    async postStatus() {
      this.isPosting = true
      const imageName = this.photo.name
      const storageRef = firebase.storage().ref();
      var imagesRef = storageRef.child(`postImages/${imageName}`);
      await imagesRef.put(this.photo).then(() => {
        console.log('Uploaded a blob or file!');
        this.photo = ''
      });
      const downloadURL = await imagesRef.getDownloadURL();
      const timestamp = await Date.now();
      const dataBase = await db.collection("posts").doc();
      await dataBase.set({
        postID :  dataBase.id,
        userPhotoURL : this.$store.state.userPhotoURL,
        userUID : this.$store.state.userUID,
        userName : this.$store.state.userName,
        date : timestamp,
        text: this.text,
        photoURL: downloadURL,
        liked: 0,
        listUserLiked: [],
        comments: [],
        numberComments: 0,
      });
      this.activeCreatePost = false
      this.isPosting = false
      this.text = ''
      this.photo = ''
    },
    photoURLSelected (e) {
      // const image = e.target.files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(image);
      // reader.onload = e =>{
      //   this.photoURL = e.target.result;
      // }
      this.photo =  e.target.files[0];
    },
    async likePost(post) {
      const dataBase = await db.collection("posts").doc(post.postID);
      if(post.listUserLiked.indexOf(this.$store.state.userUID) == -1) {
        await dataBase.update({
          liked : post.liked +1,
          listUserLiked: firebase.firestore.FieldValue.arrayUnion(this.$store.state.userUID),
        });
        } else {
          await dataBase.update({
            liked : post.liked -1,
            listUserLiked : firebase.firestore.FieldValue.arrayRemove(this.$store.state.userUID)
          });
        }
    },
    async sendComment (post,num) {
      const comment = {
        text :  this.$refs.input[num].textContent,
        userPhotoURL : this.$store.state.userPhotoURL,
        userName : this.$store.state.userName
      }
      const dataBase = await db.collection("posts").doc(post.postID);
      await dataBase.update({
        numberComments : post.numberComments + 1,
        comments: firebase.firestore.FieldValue.arrayUnion(comment),
      });
      this.$refs.input[num].textContent = ''
    },
    async deletePost (postID) {
      await db.collection("posts").doc(postID).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: #6fbe44;
}

.overlay {
  bottom: 0;
  transition: opacity .3s;
  opacity: .6;
  background-color: #000;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
}

.warraper {
  width: 100%;
  max-width: 500px;
  margin: auto;

  .home-main-head {
    margin: 8px 0 15px;
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 12px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;

    .avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin: auto;
      cursor: pointer;
      background-color: #6fbe49;
      overflow: hidden;

      img {
        width: 100%;
        object-fit: cover;
      }
    }

    .create-btn {
      padding: 10px;
      flex: 1;
      margin: 0 10px;
      background-color: #ecf7e7;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 16px;
      border-radius: 5px;
      color: #6fbe44;

      &:hover {
        background-color: #d5edca;
      }
    }

    .upload-image {
      width: 25px;
      color: #6fbe44;
      cursor: pointer;
    }

    .home-main-fad {
        background-color: #fff;
        padding: 16px;
        border-radius: 5px;

        h4 {
          font-weight: 500;
          font-size: 15px;
        }
    }

    .create-post {
      position: absolute;
      top: 0;
      z-index: 9999;
      left: 0;
      right: 0;
      background-color: #fff;
      border-radius: 8px;
      padding:16px;

      .create-post-head {
        display: flex;
        align-items: center;
        padding-bottom: 8px;
        position: relative;

        .create-post-exit {
          position: absolute;
          right: 0;
          width: 30px;
          height: 30px;
          cursor: pointer;

          i {
            font-size: 30px;
          }
        }

        .user-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;

          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .user-name { 
          font-weight: 600;
        }

        .access-permission {
          border: none;
          border-radius: 5px;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          cursor:pointer;
          margin-top: 5px;
          position: relative;

          i {
            font-size: 15px;
          }

          i:nth-child(3) {
              height: 20px; 
          }

          span {
            margin: 0 8px;
          }

          .option-list {
            position: absolute;
            top: 100%;
            right: 0;
            padding: 8px 0;
            background-color: #fff;
            border-radius: 3px;
            width: 164px;
            display: none;
            box-shadow: 0 0 4px rgb(247, 245, 245);
            border: 1px solid #e5e5e5;

            .option-item {
              padding: 8px 16px;
              display: flex;
              align-items: center;
              justify-content: flex-start;

              .radio-input {
                width: 22px;
                height: 22px;
                margin-right: 10px;
                border-radius: 50%;
                border: 1px solid #ccc;
              }

              &:hover {
                background-color: #6fbe44;
              }
            }
          }

          &:hover .option-list {
            display: block;
          }
        }
        
      }
    }

    .create-post-main {

      .text-area {
        width: 100%;
        padding: 10px 0;
        outline: none;
        border: none;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-size: 18px;
      }
      textarea::-webkit-scrollbar {
        width: 6px;
        background-color: #F5F5F5;
      }

      textarea::-webkit-scrollbar-thumb {
        background-color: #B3B3B3; 
        border-radius: 10px;
      }

      .create-post-action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        height: 40px;

        .action-item {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          img {
            margin: 0 5px;
          }
        }
      }

      .create-post-share {
        display: block;
        text-align: center;
        background-color: #6fbe44;
        color: #fff;
        margin-top: 16px;
        border-radius: 5px ;
        height: 40px;
      }
    }
  }

  .home-main-content {

    .post-item {
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 12px;

      .post-item__head {
        padding: 12px;
        display: flex;
        align-items: center;
        position: relative;
        
        .user-image {
          width: 38px;
          height: 38px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 10px;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }

          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .user-name {
          font-weight: 500;
        }

        .setting {
          position: absolute;
          right: 20px;
          cursor: pointer;
        }

        .list-settings {
          position: absolute;
          top: 55px;
          right: 15px;
          padding: 8px 0;
          background-color: #fff;
          border-radius: 8px;
          list-style: none;
          box-shadow: 0 0 8px rgba(0,0,0,0.5);
          z-index: 9999;

          .setting-item {
            padding: 5px 16px;
            cursor: pointer;

            &:hover {
              color: #fff;
              text-decoration: none;
              background-color: #6fbe44;
            }

            span {
              font-size: 14px;
            }

            i {
              margin-right: 5px;
              width: 25px;
              height: 25px;
            }
          }
        }
      }

      .post-item__content {
        padding: 0 12px 12px;
        white-space: pre-line;
      }

      .post-item__attachment {
        width: 100%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .post-item__stats {
        padding: 12px 8px;
        display: flex;
        justify-content: space-between;

        .react {
          display: flex;
          align-items: center;
          cursor: pointer;

          .react-image {
            width: 20px;
            height: 20px;
            overflow: hidden;
            margin: 0 1px;

            img {
              width: 100%;
              object-fit: cover;
            }
          }

          .quantity {
            margin-left: 2px;
            font-size: 15px;
            color: #4D4D4D;
          }
        }

        .number {
          display: flex;
          align-items: center;

          .number-seen {
            font-size: 15px;
            margin: 0 5px;
            color: #4D4D4D;
          }

          .number-comments {
            @extend .number-seen;
            cursor: pointer;
          }
        }
      }

      .post-item__action {
        padding: 4px;
        height: 45px;
        display: flex;
        align-items: center;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;

        .item {
          line-height: 40px;
          flex-grow: 1;
          text-align: center;
          cursor: pointer;

          &:hover{
            background-color: #f2f2f2;
          }

          i {
            margin-right: 5px;
          }

        }
      }

      .post-item__comments {
        padding-top: 8px;

        .comment-item {
          padding: 8px 60px 12px 12px;
          display: flex;
          justify-content: flex-start;
          flex-wrap: nowrap;

          .user-image {
            width: 32px !important;
            height: 32px;
            overflow: hidden;
            border-radius: 50%;
            margin-right: 10px;

            img {
              width: 100%;
              object-fit: cover;
            }
          }

          .info {
            padding: 8px 10px;
            max-width: 380px;
            display: inline-block;
            background-color: #f5f5f5;
            border-radius: 12px;

            .name {
              font-size: 15px;
              font-weight: 500;
            }
  
            .text {
              // white-space: pre-line;
              font-size: 15px;
              word-break: break-word;
              color: #1A1A1A;
            }
          }

        }
      }

      .comment {
        display: flex;
        align-items: center;
        padding: 12px;

        .user-image {
          width: 32px ;
          height: 32px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 10px;

          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .input-form {
          display: flex;
          align-items: center;
          width: calc(100% - 45px);
          position: relative;

          .input {
            // resize: both;
            word-break: break-word;
            font-size: 15px;
            flex: 1;
            overflow: hidden;
            border: none;
            outline: none;
            padding: 8px 90px 8px 12px;
            background: #f5f5f5;
            border: 1px solid #e5e5e5;
            border-radius: 18px;
          }

          .input[contenteditable]:empty::before {
            content: "Viết bình luận...";
          }

          .action {
            position: absolute;
            right: 8px;
            bottom: 4px;
            display: flex;
            align-items: center;

            i {
              font-size: 20px;
              margin: 0 5px;
              cursor: pointer;
              opacity: 0.7;

              &:hover {
                opacity: 1;
              }
            }

            img {
              cursor: pointer;
              opacity: 0.7;
              &:hover {
                opacity: 1;
              }
            }
          }
          
        }
      }
    }
  }
}

.ani-create-post {
  left: 50%;
  display: flex;
  transform: translate(-50%, -50%);
  position: absolute;
} 

.ani-create-post div {
  margin: 5px;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
}

.one {
  animation-name: load-one;
}

@keyframes load-one {
  30% {
     transform: translateY(-50%);
  }
}

.two {
  animation-name: load-two;
}

@keyframes load-two {
  50% {
     transform: translateY(-50%);
  }
}

.three {
  animation-name: load-three;
}

@keyframes load-three {
  70% {
     transform: translateY(-50%);
  }
}
</style>