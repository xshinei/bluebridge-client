<template>
  <div class="step-wrapper">
    <ul>
      <li :class="{'active': step >= 1}">
        <i class="icon">1</i>
        <span>验证</span>
      </li>
      <li :class="{'active': step >= 2}">
        <i class="icon">2</i>
        <span>填写账号信息</span>
      </li>
      <li :class="{'active': step >= 3}">
        <i class="icon">3</i>
        <span>完善个人信息</span>
      </li>
      <li :class="{'active': step >= 4}">
        <i class="icon fa fa-check" aria-hidden="true"></i>
        <span>注册成功</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "v-step",
    computed: {
      step() {
        let pathArr = this.$route.path.split('/');
        let route = pathArr[pathArr.length - 1];

        if(route === 'validate') {
          return 1;
        }
        else if(route === 'account') {
          return 2;
        }
        else if(route === 'information') {
          return 3
        }
        else if(route === 'success') {
          return 4;
        }

        return 0;
      }
    }
  }
</script>

<style scoped lang="stylus">
  .step-wrapper
    position: relative;
    height: 46px;
    border-bottom: 2px solid #e6e6e6;
    ul
      width: 720px;
      margin: 0 auto;
      li
        float: left;
        width: 150px;
        height: 46px;
        line-height: 46px;
        padding-left: 30px;
        font-size: 16px;
        font-weight: 700;
        color: #999;
        &.active
          color: #3e3e3e;
          border-bottom: 2px solid #ff4700;
          .icon
            background-color: #ff4700;
        .icon
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          font-style: normal;
          color: #fff;
          text-align: center;
          border-radius: 50%;
          background-color: #ccc;
</style>
