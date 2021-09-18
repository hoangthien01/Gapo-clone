<template>
  <div class="group">
    <div class="group-left">
      <h2>Nhóm</h2>
      <button class="btn btn-news">Bảng tin của bạn</button>
      <button class="btn btn-discover">Khám phá</button>
      <button class="btn btn-group"><span>+</span> Tạo nhóm mới</button>
      <hr style="border-top: 1px solid #e5e5e5;">
      <div class="group-manage">
        <h3>Nhóm bạn quản lí</h3>
        <span>Xem tất cả</span>
      </div>
      <hr style="border-top: 1px solid #e5e5e5;">
      <div class="group-join">
        <h3>Nhóm bạn tham gia</h3>
        <span>Xem tất cả</span>
      </div>
    </div>
    <div class="group-right">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Group'
}
</script>

<style lang="scss" scoped>
.group {
  min-height: 100%;
  padding-top: 72px;
  display: flex;

  .group-left {
    padding: 8px 24px 30px;
    width: 26%;

    h2 {
      margin-bottom: 20px;
      font-size: 28px;
    }

    .btn-news,.btn-discover {
      height: 64px;
      text-align: left;
      margin-bottom: 8px; 
      padding-left: 12px;

      &:hover {
        background: #f5f5f5;
      }
    }

    .btn-discover {
      background-color: #fff;
    }

    .btn-group {
      margin-bottom: 20px;
      background-color: #fff;
      border: 1px solid #6fbe44;
      font-weight: 100;
    }

    .group-manage,.group-join {
      margin: 20px 0;
      display: flex; 
      align-items: center;
      justify-content: space-between;
      line-height: 36px;

      h3 {
        font-weight: 500;
      }

      span {
        font-size: 13px;
        color: #6fbe44;
        cursor: pointer;
      }
    }
  }

  .group-right {
    width: 74%;
    background-color: #F2F2F2;
  }
}
</style>