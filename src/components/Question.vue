<template>
  <div class="wrapper-question">
    <div class="overlay"></div>
    <div class="content">
      <div class="head">
        <h3>GAPO</h3>
      </div>
      <div class="main">
        <p class="text">{{this.question}}</p>
        <div class="action">
          <button class="btn no-btn" @click="sayNo">Không</button>
          <button class="btn yes-btn" @click="sayYes">Có</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Question',
  props: [
    'question'
  ],
  methods : {
    sayNo() {
      this.$emit('AnswerQuestion',false)
    },
    sayYes () {
      this.$emit('AnswerQuestion',true)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-question {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;

  .overlay {
    background-color: #000;
    opacity: 0.9;
    width: 100%;
    height: 100%;
    
  }

  .content {
    z-index: 99999;
    opacity: 1;
    position: absolute;
    transform: translate(-50%,-50%);
    width: 400px;
    top: 50%;
    left: 50%;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ccc;

    .head {
      padding: 8px;
      background-color: #ccc;
    }

    .main {
      padding: 8px;

      .text {
        margin-top: 10px;
        font-size: 17px;
      }

      .action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 12px;

        .btn {
          width: auto;
          margin: 0 10px;

          &:hover {
            opacity: 1;
          }
        }

        .no-btn {
          background-color: #e5e5e5;
          color: #000;
          opacity: 0.8;
        }

        .yes-btn {
          background-color: #6fbe44;
          color: #fff;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>