<template>

  <div class="form-item">
    <button class="btn"
            type="button"
            :class="{'btn-disabled': !finish}"
            @click="handleNext">下一步
    </button>
  </div>

</template>

<script>
  export default {
    name: "v-register-button",
    props: {
      finish: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleNext() {
        if (this.finish) {
          this.$emit('clickButton');
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .form-group
    padding: 10px 0;
    .form-item
      line-height: 36px;
      padding: 10px 0 10px 260px;
      .btn
        display: inline-block;
        zoom: 1;
        width: 180px;
        height: 36px;
        line-height: 36px;
        padding: 0 20px;
        border: 0;
        color: #FFF;
        font-weight: 700;
        font-size: 16px;
        text-align: center;
        background: #ff4001;
        border-radius: 3px;
        cursor: pointer;
        outline: none;
        &:hover
          color: #FFF;
          text-decoration: none;
          background-color: #f73500;
      .btn-disabled
        background-color: #ededed;
        border-color: #ededed;
        color: #999;
        cursor: default;
        &:hover
          background-color: #ededed;
</style>
