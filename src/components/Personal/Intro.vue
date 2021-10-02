<template>
<div class="intro-wrapper">
  <div class="intro">
    <h2 class="intro-heading">Giới thiệu</h2>
    <div class="intro-infomation">
      <div class="title">
        <i class="fal fa-user-circle"></i>
        Thông tin cá nhân
      </div>
      <div class="intro-item">
        <label for="" class="name">Tên tài khoản</label>
        <span class="text">{{this.$store.state.userName}}</span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Chỉnh sửa</span>
        </div>
      </div>
       <div class="intro-item">
        <label for="" class="name">Giới tính</label>
        <span class="text">Chưa cập nhật</span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Chỉnh sửa</span>
        </div>
      </div>
       <div class="intro-item">
        <label for="" class="name">Ngày sinh</label>
        <span class="text">{{this.$store.state.dateOfBirth}}</span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Chỉnh sửa</span>
        </div>
      </div>
       <div class="intro-item">
        <label for="" class="name">Tình trạng</label>
        <span class="text">Chưa cập nhật</span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Chỉnh sửa</span>
        </div>
      </div>
      <div class="intro-item">
        <label for="" class="name">Đường dẫn</label>
        <span class="text">Chưa cập nhật</span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Chỉnh sửa</span>
        </div>
      </div>
    </div>
    <div class="intro-contact">
      <div class="title">
        <i class="fal fa-phone-alt"></i>
        Thông tin liên hệ
      </div>
      <div class="intro-item">
        <label for="" class="name">Tỉnh/ Thành phố hiện tại</label>
        <span class="text">Chưa cập nhật</span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Chỉnh sửa</span>
        </div>
      </div>
      <div class="intro-item">
        <label for="" class="name">Quê quán</label>
        <span class="text">Chưa cập nhật</span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Chỉnh sửa</span>
        </div>
      </div>
    </div>
    <div class="intro-work">
      <div class="title-ver2">
        <span>
          <i class="fal fa-briefcase"></i>
          Công việc
        </span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Thêm công việc</span>
        </div>
      </div>
    </div>
    <div class="intro-school">
      <div class="title-ver2">
        <span>
          <i class="fal fa-briefcase"></i>
          Trường học
        </span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Thêm trường học</span>
        </div>
      </div>
    </div>
    <div class="intro-favorite">
      <div class="title-ver2">
        <span>
          <i class="fal fa-clipboard"></i>
          Sở thích
        </span>
        <div class="action">
          <i class="fal fa-pen"></i>
          <span>Thêm/Sửa sở thích</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Intro'
}
</script>

<style lang="scss" scoped>
.intro-wrapper {
  padding-bottom: 40px;

  .intro {
    padding: 24px 48px;
    background-color: #fff;
    border-radius: 3px;

    .intro-heading {
      padding: 8px 0 0;
      margin-bottom: 16px;
    }

    .title {
      padding: 30px 0;
      font-size: 18px;
      display: flex;
      align-items: center;
      font-weight: 600;
      border-bottom: 1px solid #f2f2f2;


      i {
        font-size: 22px;
        margin-right: 10px;
      }
    }

    .action {
      color: #6fbe44;
      cursor: pointer;

      i {
        margin-right: 5px;
      }
    }

    .intro-item {
      border-bottom: 1px solid #f2f2f2;
      padding: 6px 0;
      display: flex;
      align-items: center;

      .name {
        width: 250px;
        padding: 7px 6px;
      }

      .text {
        flex: 1;
        padding: 7px 0;
        font-weight: 500;
      }
    }
  }

  .intro-work, .intro-school, .intro-favorite {

    .title-ver2 {
      @extend .title;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .action {
        font-size: 16px;
        font-weight: 400;

        i {
          font-size: 16px;
        }
      }
    }

  }
}
</style>