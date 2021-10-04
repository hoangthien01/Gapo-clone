<template>
  <div class="home">
    <loading v-show="isLoading"></loading>
    <Sidebar></Sidebar>
    <div class="home-main">
      <News :posts="this.posts" :user="this.$store.state.user"></News>
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
import Loading from '../components/Loading.vue'
import Sidebar from '../components/Home/Sidebar.vue'
import News from '../components/News.vue'
export default {
  name: 'Home',
  data () {
    return {
      // isLoading : true
    }
  },
  components : {
    Sidebar,News,Loading
  },
  computed: {
    posts () {
      return  this.$store.state.posts
    },
    isLoading() {
      return this.$store.state.isLoading
    }
  },
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
    margin: 0 auto;
    }
  }

  .home-account {
    width: 23%;
    position: fixed;
    right: 0;
    min-height: calc(100% - 72px);

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
        z-index: -1;

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

</style>