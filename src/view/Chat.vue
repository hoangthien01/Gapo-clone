<template>
  <div class="chat-wrapper">
    <div class="chat-left">
      <div class="head">
        <div>
          <div class="user-avatar">
            <img :src="this.$store.state.userPhotoURL" alt="" srcset="">
          </div>
          <span class="user-name">{{this.$store.state.userName}}</span>
        </div>
        <div>
          <img src="../assets/Chat/message-wating-icon.svg" class="waitting-msg">
          <img src="../assets/Chat/edit-account.svg" class="new-msg">
        </div>
      </div>
      <div class="main">
        <div class="search-friend">
          <i class="fal fa-search search-icon"></i>
          <input type="text" placeholder="Tìm kiếm" class="input">
        </div>
        <div class="friend-messages">
          <div class="friend-messages-item" v-for="(message,index) in messages" :key="index"
           @click="getMessage(message.messageId)">
            <div class="friend-image">
              <img :src="message.user1.userPhotoURL" alt="" srcset="">
            </div>
            <div class="friend-info">
              <p class="friend-name-box">
                <span class="name"> {{message.user1.userName}} </span>
                <span class="time">vừa xong</span>
              </p>
              <p class="message">Tin nhăn mới</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-main">
      <div class="head">
        <div class="user-image">
          <img :src="this.chatWithUser.userPhotoURL" class="system-image">
        </div>
        <div class="system-name">
            <p>{{this.chatWithUser.userName}}
            <img src="../assets/icon-verify-blue.svg" alt="" srcset=""> </p>
            <span>Offline</span>
        </div>
      </div>
      <div class="content">
        <div class="messages" ref="scrollable">
          <div class="message-item" v-for="(msg,index) in message.messages" :key="index"
            :class="{'my-message' : msg.userUID == $store.state.userUID}"
          >
            <div class="user-image">
              <img :src="msg.userPhotoURL" alt="" srcset="">
            </div>
            <span class="text">{{msg.text}}</span>
          </div>
        </div>
        <div class="action">
          <div class="image-upload">
            <img src="../assets/Chat/image.svg" alt="" srcset="">
          </div>
          <div class="memo-upload">
            <img src="../assets/Chat/sticker.svg" alt="" srcset="">
          </div>
          <div class="file-upload">
            <img src="../assets/Chat/attactment.svg" alt="" srcset="">

          </div>
          <div class="message-input">
            <input type="text" placeholder="Trả lời..." v-model="text">
            <img src="../assets/Chat/emoji.svg" alt="" srcset="">
          </div>
          <div class="btn-send" 
            @keyup.enter ="sendMessage"
            @keydown.enter.prevent 
            @click="sendMessage"
          >
            <img src="../assets/Chat/send-message-icon.svg" alt="" srcset="">
          </div>

        </div>
      </div>
    </div>
    <div class="chat-right">
      <div class="chat-system">
        <div class="system-content">
          <div class="user-image">
            <img :src="this.chatWithUser.userPhotoURL" class="system-image">
          </div>
          <div class="system-name">
            <p>{{this.chatWithUser.userName}}</p>
            <img src="../assets/icon-verify-blue.svg" alt="" srcset="">
          </div>
          <span class="view-profile">Xem profile</span>
        </div>
      </div>
      <div class="chat-settings">
        <div class="title">
          <span>Cài đặt</span>
          <i class="fas fa-chevron-up" @click="() => {this.settingSystemActive = !this.settingSystemActive}"
            :class="{'rotate' : settingSystemActive }">
          </i>
        </div>
        <transition name="slide-fade"> 
          <div v-show="settingSystemActive">  
            <div class="item">
              <img src="../assets/Chat/setting-user-noti.svg" alt="">
              <span>Tắt thông báo</span>
            </div>
            <div class="item">
              <img src="../assets/Chat/setting-user-block.svg" alt="">
              <span>Chặn tin nhắn</span>
            </div>
          </div>
        </transition>
      </div>
      <div class="chat-lib">
        <div class="title">
          <span>Thư viện</span>
          <i class="fas fa-chevron-up"  @click="() => {this.libSystemActive = !this.libSystemActive}"
            :class="{'rotate' : libSystemActive }"></i>
        </div>
        <transition name="slide-fade"> 
          <div v-show="libSystemActive">
            <div class="item">
              <img src="../assets/Chat/picture-colection.svg" alt="">
              <span>Ảnh</span>
            </div>
            <div class="item">
              <img src="../assets/Chat/video-colection.svg" alt="">
              <span>Video</span>
            </div>
            <div class="item">
              <img src="../assets/Chat/file-colection.svg" alt="">
              <span>Tập tin</span>
            </div>
            <div class="item">
              <img src="../assets/Chat/link-colection.svg" alt="">
              <span>Links</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '../firebase/index'
export default {
  name: 'Chat',
  data () {
    return {
      settingSystemActive : false,
      libSystemActive : false,
      text : '',
      chatWithUser : {}
    }
  },
  computed : {
    messages () {
      return this.$store.state.user.messages
    },
    message () {
      return this.$store.state.user.message
    }
  },
  async created () {
    this.$store.dispatch("user/getAllMessages")
  },
  updated() {
    this.$refs['scrollable'].lastElementChild.scrollIntoView(false)
  },
  
  methods : {
    async getMessage (messageId) {
      this.$store.dispatch("user/getMessage",messageId)
      console.log(this.messages)
    },
    async sendMessage() {
      await db.collection("messages").doc(this.message.messageId)
        .update ({
          messages : firebase.firestore.FieldValue.arrayUnion({
            userUID : this.$store.state.userUID,
            userPhotoURL : this.$store.state.userPhotoURL,
            text : this.text
          })
        })
      this.text = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.rotate {
    transform: rotateZ(180deg);
}

.my-message {
  justify-content: flex-end;

  .user-image {
    display: none;
  }
}

.chat-wrapper {
  height: 100%;
  padding-top: 72px;
  display: flex;

  .head {
    border-bottom: 1px solid #e5e5e5;
    height: 52px;

  }

  .chat-left {
    width: 23%;
    border-right: 1px solid #e5e5e5;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;

      div {
        display: flex;
        align-items: center;

        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 5px;

          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .waitting-msg, .new-msg {
          margin-left: 15px;
          cursor: pointer;
        }
      }
    }

    .main {
      height: calc(100% - 52px);

      .search-friend {
        padding: 10px 12px;
        position: relative;

        .search-icon {
          position: absolute;
          left: 28px;
          top: 22px;
        }

        input {
          background-color: #f2f2f2;
          display: block;
          width: 100%;
          height: 40px;
          padding: 6px 12px 6px 40px;
          border-radius: 100px;
          outline: none;
          border: none;
          font-size: 1rem;
          font-weight: 400;
          color: #495057;
          border: 1px solid #e5e5e5;
        }
      }

      .friend-messages {

         .friend-messages-item {
           padding: 12px;
           display: flex;
           align-items: center;
           width: 100%;
           overflow: hidden;
           cursor: pointer;

          .friend-image {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;

            img {
              width: 100%;
              object-fit: cover;
            }
          }

          .friend-info {
            flex: 1;

            .friend-name-box {
              display: flex;
              justify-content: space-between;

              .name {
                width: 170px;
                overflow: hidden;
                white-space: nowrap; 
                text-overflow: ellipsis;
              }

              .time {
                flex: 1;
                text-align: right;
              }
            }

            .message {
              width: 160px;
              overflow: hidden;
              white-space: nowrap; 
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }

  .chat-main {
    width: 54%;
    position: relative;

    .head {
      display: flex;
      align-items: center;
      padding: 3px 12px;

      .user-image {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 5px;

        img {
          width: 100%;
          object-fit: cover;
        }
      }

      .system-name {
        font-size: 15px;
        margin-left: 5px;

        p {
          display: flex;
          align-items: center;
        }

        img {
          width: 15px;
          height: 15px;
          margin-left: 5px;
        }

        span {
          font-size: 13px;
        }
      }
    }

    .content {
      height: calc(100% - 52px);

      .messages {
        padding: 12px;
        height: calc(100% - 62px);
        overflow-y: scroll;

        &::-webkit-scrollbar {
          width: 0px;
        }

        .message-item {
          display: flex;
          align-items: center;
          padding:  8px 0;

          .user-image {
            width: 28px;
            height: 28px;
            overflow: hidden;
            border-radius: 50%;
            margin-right :10px;

            img  {
              width: 100%;
              object-fit: cover;
            }
          }

          .text {
            background-color: #eff0ef;
            border-radius: 15px;
            padding: 8px 12px;
            word-break: break-word;
            max-width: 500px;
          }
        }
      }

      .action {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 7px 0 ;
        display: flex;
        align-items: center;
        width: 100%;

        .image-upload, .memo-upload, .file-upload{
          width: 25px;
          height: 25px;
          overflow: hidden;
          margin: 0 12px;
          cursor: pointer;

          img {
            width: 100%;
            object-fit: cover;
          }
        }

        .message-input {
          flex: 1;
          position: relative;

          img {
            position: absolute;
            right: 12px;
            top: 9px;
            cursor: pointer;
          }

          input {
            padding: 8px 10px;
            background-color: #f2f2f2;
            width: 100%;
            height: 40px;
            border-radius: 100px;
            outline: none;
            border: none;
            font-size: 1rem;
            font-weight: 400;
            color: #495057;
            border: 1px solid #e5e5e5;
          }
        }

        .btn-send {
          margin: 0 12px;
          cursor: pointer;
        }
      }
    }
  }

  .chat-right {
    width: 23%;
    border-left: 1px solid #e5e5e5;

    .chat-system {
      border-bottom: 1px solid #e5e5e5;
      height: 30%;
      position: relative;

      .system-content {
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        text-align: center;

        .user-image {
          width: 80px;
          height: 80px;
          overflow: hidden;
          border-radius: 50%;
          margin: auto;

          .system-image {
            width: 100%;
            object-fit: cover;
          }
        }


        .system-name {
          display: flex;
          margin-top: 16px 0;
          align-items: center;
          justify-content: center;
          font-weight: 700;

          img {
            width: 20px;
            margin-left: 5px;
          }
        }

        .view-profile {
          color: #6fbe44;
          cursor: pointer;
          font-size: 13px;
        }
      }
    }

    .chat-settings, .chat-lib {
      border-bottom: 1px solid #e5e5e5;
      overflow: hidden;
      // height: 20%;

      .title {
        display: flex;
        padding: 16px 16px 10px;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 500;

        i {
          cursor: pointer;
          transition: transform 1s;
        }
      }

      .item {
        padding: 10px 26px ;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: #f5faf2;
        }

        img {
          margin-right: 10px;
        }
      }
    }

    .chat-lib {
      // min-height: 50%;
      border: none;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all .4s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>