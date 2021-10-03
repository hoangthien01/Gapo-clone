<template>
  <div class="home-sidebar">
      <h2>Trang chủ</h2>
      <ul>
        <li @click="$router.push('/khampha')">
          <i class="fas fa-compass"></i>
          <span>Khám phá</span>
        </li>
        <li>
          <i class="fas fa-home-lg-alt"></i>
          <span>Theo dõi</span>
        </li>
        <li>
          <i class="fas fa-search"></i>
          <span>Tìm bạn bè</span>
        </li>
        <li>
          <i class="fas fa-flag"></i>
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
</template>

<script>
export default {
  name: 'Sidebar',
}
</script>

<style lang="scss" scoped>
.home-sidebar{
  width: 23%;
  position: fixed;
  left: 0;
  min-height: calc(100% - 72px);

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

      i {
        margin-right: 10px;
        color: #7CA0FA;
        font-size: 18px;
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
</style>