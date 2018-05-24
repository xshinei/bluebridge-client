<template>
  <div class="forget-wrapper">
    <header></header>
    <main>
      <h1>重设您的密码</h1>
      <p class="msg">如果你的忘记了你的密码，请联系谭立兴老师重设你的密码</p>
      <p>QQ: 459905538</p>
      <button @click="handleChangeRouter">返回登录</button>
    </main>
    <footer>
      <p class="copyright">@copyright   项目负责人：张安   指导老师：谭立兴</p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "v-forget",
    methods: {
      handleChangeRouter() {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped lang="stylus">
  .forget-wrapper
    width: 100%;
    height: 100%;
    background-color: #2e9fff;
    header
      width: 100%;
      max-width: 400px;
      margin: 0 auto 15px;
      padding: 30px 0;
    main
      box-sizing: border-box;
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      padding: 30px 40px 40px;
      background: #fff;
      border-radius: 3px;
      border: 1px solid #c2c9d4;
      h1
        text-align: center;
        margin-bottom: 15px;
        color: #546673;
        font-weight: 600;
        font-size: 24px;
      p
        margin-bottom: 15px;
        font-size: 16px;
      button
        width: 100%;
        line-height: 42px;
        border: 1px solid transparent;
        margin: 20px auto;
        font-size: 16px;
        font-weight: 500;
        background: rgba(46,159,255,.7);
        color: #fff;
        border-radius: 3px;
        outline: none;
        cursor: pointer;
        &:hover
          background: #234970;
    footer
      max-width: 400px;
      margin: 20px auto;
      .copyright
        text-align: center;
        color: #fff;
        white-space: pre-wrap;
</style>
