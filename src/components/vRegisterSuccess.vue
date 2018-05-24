<template>
    <div class="wrapper">
      <i class="icon fa fa-check" aria-hidden="true"></i>
      <h2>恭喜，您已成功注册，请等待管理员验证！</h2>
      <button class="btn" @click="handleToLogin">跳转登录界面</button>
    </div>
</template>

<script>
  export default {
    name: "v-register-success",
    methods: {
      handleToLogin() {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped lang="stylus">
  .wrapper
    padding: 20px 20px 20px 170px;
    margin-bottom: 10px;
    font-size: 14px;
    background: #f3fdf6;
    border: 1px solid #def3e6;
    overflow: hidden;
    .icon
      display: inline;
      float: left;
      width: 32px;
      height: 32px;
      margin-left: -40px;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      border-radius: 50%;
      background-color: #15c2b4;
      color: #fff;
    h2
      font: 400 20px/1.6 "\5FAE\8F6F\96C5\9ED1","\534E\6587\7EC6\9ED1","\9ED1\4F53",arial,sans-serif;
      line-height: 32px;
      padding-bottom: 20px;
    .btn
      display: block;
      width: 180px;
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      border: 0;
      margin-left: 60px;
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
</style>
