<template>
  <div class="input-wrapper">
    <input type="text"
           :placeholder="defaultValue"
           v-model="val">
  </div>
</template>

<script>

  export default {
    props: {
      defaultValue: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        val: '',
      };
    },
    watch: {
      val(newVal) {
        this.$emit('change', newVal)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .input-wrapper
    display: inline-block;
    width: 200px;
    color: #495060;
    input
      display: inline-block;
      width: 182px;
      height: 30px;
      line-height: 30px;
      padding: 0 8px;
      border: 1px solid #dddee1;
      border-radius: 4px;
      font-size: 14px;
      color: #495060;
      background-color: #fff;
      -webkit-font-smoothing: antialiased;
      transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
      &:hover
        border-color: #57a3f3;
      &:focus
        border-color: #57a3f3;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(45,140,240,.2);
      &::-webkit-input-placeholder
        font-size: 12px;
        font-weight 700;
        color: #bbbec4;
</style>
