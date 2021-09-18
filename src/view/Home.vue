<template>
  <div class="home">
    <Sidebar></Sidebar>
    <div class="home-main">
      <div class="warraper">
        <div class="home-main-head">
          <div class="avatar">
            <img src="" alt="" srcset="">
          </div>
          <button>Đăng bài viết</button>
          <i class="fas fa-image"></i>
        </div>
        <div class="home-main-fad">
          <h4>Xu hướng nổi bật</h4>
        </div>
        <div class="home-main-content">

        </div>
      </div>
    </div>
    <div class="home-account">
      <div class="home-account-head">
        <h3>Tài khoản: <span>0</span></h3>
        <button>Mua Gcoin</button>
      </div>
      <hr style="border-top: 1px solid #e5e5e5;">
      <div class="home-account-main">
        <h4>Danh bạ</h4>
        <div class="account-search">
          <i class="fal fa-search"></i>
          <input type="text" class="search-input" placeholder="Tìm kiếm">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Home/Sidebar.vue'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components : {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100%;
  padding-top: 72px;
  display: flex;

  .home-main {
    width: 54%;
    background-color: #F2F2F2;

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

        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin: auto;
          cursor: pointer;
          background-color: #6fbe49;
        }

        button {
          padding: 8px 12px;
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

        i {
          font-size: 22px;
          color: #6fbe44;
          cursor: pointer;
        }
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
    }
  }

  .home-account {
    width: 23%;

    .home-account-head {
      padding: 20px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        display: inline-block;
        padding: 4px 15px;
        height: 30px;
        font-weight: 600;
        color: #4d4d4d;
        background: #f5f5f5;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .home-account-main {
      padding: 10px 16px ;

      .account-search {
        margin-top: 20px;
        position: relative;

        i {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          padding: .75rem;
          color: grey;
        }

        .search-input {
          width: 100%;
          height: 40px;
          outline: none;
          color: #495057;
          font-weight: 400;
          padding: 6px 12px 6px 40px;
          border: none;
          border-radius: 200px;
          background-color: #f2f2f2;
        }
      }
    }

  }
}
</style>