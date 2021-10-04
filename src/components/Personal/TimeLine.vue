<template>
  <div class="profile-main">
    <div class="profile-left">
      <div class="profile-question">
        <img src="../../assets/questionGray.svg" alt="" srcset="">
        <p>Hãy trả lời những thắc mắc về bạn</p>
        <span>5</span>
      </div>
      <div style="position: sticky; top: 20px;">
        <div class="profile-follow">
          <div>
            <p class="quantity">42</p>
            <p class="description">Lượt theo dõi</p>
          </div>
          <div>
            <p class="quantity">1</p>
            <p class="description">Bài viết</p>
          </div>
          <div>
            <p class="quantity">10</p>
            <p class="description">Lượt thích</p>
          </div>
        </div>
        <div class="profile-intro">
          <h3>Giới thiệu</h3>
          <div class="gender">
            <img src="../../assets/person.svg" alt="" srcset="">
            <span>Giới tính</span>
            <img src="../../assets/Male.svg" alt="" srcset="">
            <span>Nam</span>
          </div>
          <hr style="margin: 8px 0; backgroundColor:#ccc;opacity:0.3;">
          <h3>Sở thích</h3>
          <button class="btn edit-btn">
            <img src="../../assets/editInfo.svg" alt="" srcset=""> 
            <span>Chỉnh sửa thông tin</span>
          </button>
        </div>
        <div class="profile-image">
          <h3>Ảnh <span>Xem tất cả</span></h3>

        </div>
        <div class="profile-friends">
          <h3>Bạn bè <span>Tất cả bạn bè</span></h3>
        </div>
      </div>
    </div>
    <div class="profile-right">
      <news :posts="postsOfUserUID" :user="this.user"></news>
    </div>
  </div>
</template>

<script>
import News from '../../components/News.vue'
export default {
  name: 'TimeLine',
  components: {
    News
  },
   computed: {
    postsOfUserUID () {
      return this.$store.state.postsOfUserUID
    }
  },
  props : [
    'user'
  ],
  created () {
    const userUID = this.$route.params.userId
    this.$store.dispatch("getPostByUserUID",userUID)
  }
}
</script>

<style lang="scss" scoped>
 .profile-main {
    display: flex;

    .profile-left {
      width: 40%;

      .profile-question {
        width: 100%;
        height: auto;
        display: flex;
        padding: 12px 16px;
        background: rgb(255, 255, 255);
        border: 1px solid rgb(26, 26, 26);
        border-radius: 12px;
        cursor: pointer;
        margin-bottom: 16px;
        -webkit-box-align: center;
        align-items: center;
        font-size: 14px;

        img {
          margin-right: 8px;
        }

        span {
          border: 1px solid rgb(255, 0, 51);  
          border-radius: 20px;
          padding: 2px 6px;
          font-weight: bold;
          font-size: 12px;
          color: rgb(255, 0, 51);
          line-height: 16px;
          margin-left: auto;
        }

      }

      .profile-follow {
        padding: 16px;
        display: flex;
        background-color: #fff;
        margin-bottom: 16px;
        border-radius: 5px;


        div {
          text-align: center;
          flex-grow: 1;

           &:nth-child(2) {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }

          .quantity {
            font-size: 18px;
            font-weight: bold;
          }

          .description {
            font-size: 14px;
            color: #808080;
          }
        }
      }

      .profile-intro {
        padding: 16px;
        margin-bottom: 16px;
        background-color: #fff;
        border-radius: 5px;

        .gender {
          margin-top: 8px;
          display: flex;
          align-items: center;
          font-size: 15px;

          span {
            margin: 0 10px 0 5px;

            &:nth-child(4) {
              font-weight: bold;
            }
          }
        }

        .edit-btn {
          margin-top: 8px;
          padding: 11px ;
          display: flex;
          align-items: center;
          justify-content: center;


          img {
            margin-right: 5px;
          }
        }
      }

      .profile-image,.profile-friends {
        padding: 16px;
        margin-bottom: 16px;
        background-color: #fff;
        border-radius: 5px;

        h3 {
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            color: #6fbe49;
            font-size: 14px;
            font-weight: 400;
            cursor: pointer;
          }
        }
      }
    }

    .profile-right {
      width: 60%;
      margin-top: -8px;

     
    }
  }
</style>