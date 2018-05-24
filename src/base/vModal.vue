<template>
  <div class="modal-wrapper" v-if="show">
    <div class="modal-box">
      <header>
        <p class="title">{{title}}</p>
        <a class="close" @click="handleClose">
          <i class="fa fa-times" aria-hidden="true"></i>
        </a>
      </header>
      <main>
        <p class="content">{{content}}</p>
      </main>
      <footer>
        <button class="cancel" @click="handleCancel">取消</button>
        <button class="confirm" @click="handleConfirm">确认</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      show: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:show', false);
      },
      handleCancel() {
        this.$emit('update:show', false);
        this.$emit('cancel');
      },
      handleConfirm() {
        this.$emit('update:show', false);
        this.$emit('confirm');
      }
    },
    watch: {
      show(newVal) {
        this.$emit('update:show', newVal);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .modal-wrapper
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 100%;
    background-color: rgba(55, 55, 55, .6);
    overflow: auto;
    .modal-box
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -100%);
      width: 520px;
      background-color: #fff;
      border-radius: 6px;
      header
        position: relative;
        line-height: 1;
        padding: 14px 16px;
        border-bottom: 1px solid #e9eaec;
        .title
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #1c2438;
          font-weight: 700;
        .close
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 16px;
          font-weight: 400;
          color: #999;
          transition: color .2s ease;
          &:hover
            color: #444;
            cursor: pointer;
      main
        padding: 16px;
        line-height: 1.5;
        font-size: 12px;
      footer
        padding: 12px 18px;
        border-top: 1px solid #e9eaec;
        text-align: right;
        button
          padding: 6px 15px 7px;
          font-size: 14px;
          border-radius: 4px;
          outline: none;
          &.cancel
            border-color: transparent;
            color: #495060;
            background-color: transparent;
            &:hover
              color: #57a3f3;
              cursor: pointer;
          &.confirm
            margin-left: 8px;
            border-color: #2d8cf0;
            color: #fff;
            background-color: #2d8cf0;
            &:hover
              background-color: #57a3f3;
              border-color: #57a3f3;
              cursor: pointer;
</style>
