<template>
  <div class="friends-wrapper">
    <div class="friends">
      <div class="friends-heading">
        <h2>Bạn bè</h2>
        <span>1 bạn</span>
      </div>
      <div class="friends-heading">
        <p>Lời mời đã gửi</p>
        <p>Lời mời kết bạn <span>44</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Friends'
}
</script>

<style lang="scss" scoped>
.friends-wrapper {
  padding-bottom: 40px;

  .friends {
    padding: 12px;
    background-color: #fff;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .friends-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 8px;
      font-size: 14px;

      h2 {
        margin-right: 10px;
      }

      p {
        font-weight: 500;
        margin-right: 30px;
        cursor: pointer;

        span {
          background: #e91111;
          color: #fff;
          border-radius: 100px;
          padding: 2px 6px;
        }
      }
    }
  }
}
</style>