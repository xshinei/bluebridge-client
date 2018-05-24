<template>
    <div class="error-wrapper">
      <h1>出错了！正在紧急修复，请稍后...</h1>
    </div>
</template>

<script>
  export default {
    name: "v-error"
  }
</script>

<style scoped lang="stylus">
  .error-wrapper
    width: 500px;
    margin: 100px auto;
    text-align: center;
    h1
      color: #fb6b5b;
</style>
