<template>
  <div class="wrapper">
    <div class="personal-page">
      <div class="profile-head">
        <div class="cover-image">
          <img src="../assets/default-cover.jpg" alt="">
          <div class="user-image">
            <img src="../assets/default-user-avatar.png" alt="" srcset="">
          </div>
        </div>
        <div class="profile-head-content">
          <h1 class="profile-user-name">{{this.$store.state.userName}}</h1>
          <div class="profile-user-bow">
            <img src="../assets/bow/bachduong.svg" alt="" srcset="">
            Bạch Dương
          </div>
          <p class="profile-user-description">Mô tả ngắn về bản thân của bạn. <span>Thêm mô tả</span></p>

        </div>
        <ul class="profile-head-nav">
          <li class="profile-head-item" @click="changeActiveNav('DongThoiGian')" :class="{ 'nav-item-active' : activeNav === 'DongThoiGian'}">Dòng thời gian</li>
          <li class="profile-head-item" @click="changeActiveNav('GioiThieu')" :class="{ 'nav-item-active' : activeNav === 'GioiThieu'}">Giới thiệu</li>
          <li class="profile-head-item" @click="changeActiveNav('BanBe')" :class="{ 'nav-item-active' : activeNav === 'BanBe'}">Bạn bè</li>
          <li class="profile-head-item" @click="changeActiveNav('Anh')" :class="{ 'nav-item-active' : activeNav === 'Anh'}">Ảnh</li>
        </ul>
      </div>

      <time-line></time-line>
      
    </div>
  </div>
</template>

<script>
import TimeLine from '../components/Personal/TimeLine.vue'
export default {
  name: 'Personal',
  components : {
    TimeLine
  },
  data () {
    return {
      activeNav : 'DongThoiGian'
    }
  },
  methods: {
    changeActiveNav (name) {
      this.activeNav = name
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

        .user-image {
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
        list-style: none;
        display: flex;
        border-top: 1px solid #f2f2f2;
        padding: 0 16px;

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
    }
  }
}
</style>