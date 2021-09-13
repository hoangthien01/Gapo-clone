<template>
  <div class="wrapper">
    <div class="navbar">
      <div class="navbar-left">
        <a href=""   class="navbar-left__logo" >
          <img src="../assets/logo.svg" alt="" srcset="">
        </a> 
        <div style="width: 1px; height: 34px; background-color: rgb(238, 238, 238);"></div>
        <div class="navbar-left__search">
          <i class="fal fa-search"></i>
          <input type="text" placeholder="Tìm kiếm">
        </div>
      </div>
      <div class="navbar-main">
        <div class="navbar-main__item active">
          <i class="fal fa-home-alt"></i>
          <span>Trang chủ</span>
        </div>
        <div class="navbar-main__item">
          <i class="fal fa-users"></i>
          <span>Nhóm</span>
        </div>
        <div class="navbar-main__item">
          <i class="fal fa-tv"></i>
          <span>Video</span>
        </div>
        <div class="navbar-main__item">
          <i class="fal fa-comment-alt"></i>
          <span>Chat</span>
        </div>
      </div>
      <div class="navbar-right">
        <div class="navbar-right__friends" @click="toggleFriendsDialog">
          <i class="fas fa-user-friends"></i>
        </div>
        <div class="navbar-right__noti" @click="toggleNotificationDialog">
          <i class="fas fa-bell"></i>
        </div>
        <div class="navbar-right__user" @click="toggleProfileMenu">
          <div class="user__image">
            <img src="" alt="" srcset="">
          </div>
          <div class="user__name">
            <span>Hoàng Thiện</span>
            <i class="fas fa-sort-down"></i>
          </div>
          <div class="user__setting" v-show="profileMenu">
              <div class="user__info">
                <div class="user__info-image">
                  <img src="" alt="" srcset="">
                </div>
                <h3>Hoàng Thiện</h3>
                <p>Trang cá nhân</p>
              </div>
              <hr>
              <ul>
                <li>
                  <img src="../assets/icon-setting.svg" alt="" srcset="">
                  <span>Cài đặt</span>
                </li>
                <li>
                  <img src="../assets/icon-edit-profile.svg" alt="" srcset="">
                  <span>Chỉnh sửa thông tin</span>
                </li>
                <li>
                  <img src="../assets/icon-favorite.svg" alt="" srcset="">
                  <span>Chủ đề ưa thích</span>
                </li>
                <li>
                  <img src="../assets/icon-fanpage.svg" alt="" srcset="">
                  <span>Trang của bạn</span>
                </li>
              </ul>
              <hr>
              <div class="user__logout">
                <img src="../assets/icon-logout.svg" alt="" srcset="">
                <span>Đăng xuất</span>
              </div>
            </div>
        </div>
      </div>
      <div class="friendsrequest-dialog" v-show="friendsDialog">
        <div class="friendsrequest-quantity">
          <h3>Lời mời kết bạn</h3>
          <span>0</span>
        </div>
        <hr>
        <div class="friendsrequest">
          <span>Không có lời mời kết bạn nào</span>
        </div>
        <div class="morefriends">
          <h3>Những người bạn có thể biết</h3>
          <hr>
          <div></div>
        </div>
        <hr>
        <div class="friendsrequest-seeall">
          <a href="">Xem tất cả</a>
        </div>
      </div>
      <div class="notification-dialog" v-show="notificationDialog"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      profileMenu : false,
      notificationDialog :false,
      friendsDialog : false
    }
  },
  methods: {
    toggleProfileMenu() {
      this.profileMenu = ! this.profileMenu
      this.friendsDialog = false
      this.notificationDialog =false
    },
    toggleNotificationDialog() {
      this.notificationDialog = !this.notificationDialog
      this.profileMenu = false
      this.friendsDialog = false
    },
    toggleFriendsDialog() {
      this.friendsDialog = !this.friendsDialog
      this.notificationDialog =false
      this.profileMenu = false
    }
  }
}
</script>

<style lang = "scss" scoped>
.wrapper {
  height: 72px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 16px;
  box-shadow: inset 0 -1px 0 #ececec;

  .navbar {
    display: flex;
    height: 100%;
    align-items: center;
    width: 100%;
    position: relative;

    .navbar-left {
      display: flex;
      align-items: center;
      width: 25%;

      &__logo {
        width: 98px;
        padding: 18px 0 10px;
        margin-right: 16px;

        img {
          width: 100%;
          object-fit: contain;
        }
      }

      &__search {
        position: relative;
        margin-left: 10px;

        i {
          font-size: 17px;
          position: absolute;
          left: 12px;
          top: 10px;
          font-weight: 200;
        }

        input {
          padding:12px 10px 12px 40px ;
          width: 198px;
          border-radius: 20px;
          border: none;
          outline: none;

          &:focus {
            background-color: #E7E7E7;

          }
        }
      }
    }

    .navbar-main {
      display: flex;
      height: 100%;
      width: 50%;
      align-items: center;
      justify-content: center;

      &__item {
        width: 82px;
        margin: 0 28px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-direction: column;

        i {
          font-size: 24px;
        }

        span {
          font-size: 13px;
        }
      }

      .active {
        border-bottom: 3px solid #6fbe49;
        color: #6fbe49;
      }
    }

    .navbar-right {
      display: flex;
      width: 25%;
      padding-left: 40px;

      &__friends, &__noti, .user__image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #E7E7E7;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 25px;
        cursor: pointer;
      }

      i {
        font-size: 20px;
      }
      &__user {
        flex: 1;
        display: flex;
        position: relative;

        .user__image {
          margin-right: 10px;
        }

        .user__name {
          cursor: pointer;
          position: relative;

          span {
            line-height: 40px;
            font-weight: 600;
          }

          i {
            position: absolute;
            top: 11px;
            font-size: 15px;
            margin-left: 5px;
          }
        }

        .user__setting {
          position: absolute;
          z-index: 99;
          top: 50px;
          right: 13px;
          background: #fff;
          width: 243px;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          box-shadow: 0 0 3px darkkhaki;
          border-radius: 4px;
          padding: 0 21px;

          .user__info {
            text-align: center;
            padding: 16px 0px;
            cursor: pointer;

            &-image {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              margin: auto;
              background-color: #6fbe49;
            }
            p {
              font-size: 13px;
            }
          }

          hr {
            border-top: 1px solid #e5e5e5;
          }
          ul {
            list-style: none;
            padding: 20px 0;

            li {
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              padding: 8px 0px;
              cursor: pointer;

              img {
                width: 24px;
                height: 24px;
                display: inline-block;
                margin: 0px 10px 0px 8px;
              }
            }
          }

          .user__logout {
            padding: 17px 0px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            cursor: pointer;

            img {
              width: 24px;
              height: 24px;
              display: inline-block;
              margin: 0px 10px 0px 8px;
            }
          }
        }
      }
    }

    .friendsrequest-dialog {
      position: absolute;
      top: 64px;
      right: 30px;
      width: 372px; 
      background: #fff;
      overflow-y: hidden;
      overflow-x: hidden;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
      box-shadow: 0 0 3px darkkhaki;
      border-radius: 4px;

      hr {
        border-top: 1px solid #e5e5e5;
      }

      .friendsrequest-quantity {
        display: flex;
        padding: 8px 16px;

        h3{
          font-weight: 400;
        }
        
        span {
          margin-left: 5px;
          border-radius: 100px;
          display: inline-block;
          font-size: .75rem;
          padding: .3rem .4rem;
          background-color: #E7E7E7;
        }
      }

      .morefriends {
        height: 300px;

        h3 {
          padding: 8px 16px;
          font-weight: 400;
        }
      }

      .friendsrequest-seeall {
        padding: 8px 6px;
        text-align: center;

        a{
          color: #6fbe49;
          text-decoration: none;
        }
      }
    }

    .notification-dialog {
      position: absolute;
      top: 64px;
      right: 0;
      background: #fff;
      height: 600px;
      width: 400px;
      overflow-y: hidden;
      overflow-x: hidden;
      border: 1px solid #e5e5e5;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 0 3px darkkhaki;
    }
  }
}
</style>