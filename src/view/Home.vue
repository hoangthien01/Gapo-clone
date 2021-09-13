<template>
  <div class="home">
    <div class="home-sidebar">
      <h2>Trang chủ</h2>
      <ul>
        <li @click="$router.push('/khampha')">
          <span>Khám phá</span>
        </li>
        <li>
          <span>Theo dõi</span>
        </li>
        <li>
          <span>Tìm bạn bè</span>
        </li>
        <li>
          <span>Trang của bạn</span>
        </li>
        <li>
          <button class="create-page"><span>+</span> Tạo trang</button>
        </li>
      </ul>
      <div class="sidebar-policy">
        <div >
          <span>Điều khoản sử dụng</span>
          <span>Hỗ trợ khách hàng</span>
        </div>
        <span>Gapo © 2020</span>
      </div>
    </div>
    <div class="home-main">
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
export default {
  name: 'Home',
  data () {
    return {

    }
  },

}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100%;
  padding-top: 72px;
  display: flex;

  .home-sidebar{
    width: 23%;
    position: relative;

    h2 {
      font-size: 21px;
      padding: 8px 16px 0;
      margin-bottom: 16px;
    }

    ul {
      list-style: none;

      li {
        padding: 10px 16px ;
        cursor: pointer;
        width: 100%;
        height: 48px;

        &:hover {
          background-color: #f5f5f5;
        }

        .create-page {
          background-color: #ecf7e7;
          border-color: #ecf7e7;
          color: #6fbe44;
          font-size: 16px;
          width: 100%;
          padding: 8px 12px;
          line-height: 22px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          &:hover {
            background-color: #d5edca;
            border-color: #ceeac1;
          }

          span {
            display: inline-block;
            width: 18px;
            height: 18px;
            background-color: rgb(111, 190, 73);
            border-radius: 50%;
            color: #fff;
            margin-right: 8px;
          }
        }
      }
    }

    .sidebar-policy {
      bottom: 0;
      position: absolute;
      padding: 0 16px 25px;

      div {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
      }

      span{
        display: block;
        overflow: hidden;
        margin-right: 15px;
        line-height: 28px;
        color: #808080;
        cursor: pointer;
      }
    }
  }

  .home-main {
    width: 54%;
    background-color: #F2F2F2;
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