<template>
  <div class="register-wrapper">
    <header>
      <h2>用户注册</h2>
    </header>
    <div class="step-wrapper">
      <v-step></v-step>
    </div>
    <main>
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  import VStep from './vRegisterStep';
  import VSlider from './vRegisterSlider';

  export default {
    components: {
      VStep,
      VSlider
    }
  }
</script>

<style scoped lang="stylus">
  .register-wrapper
    width: 1190px;
    margin: 0 auto;
    color: #3c3c3c;
    header
      position: relative;
      height: 43px;
      padding: 20px 0;
      h2
        height: 43px;
        line-height: 43px;
        margin-left: 6px;
        font-size: 22px;
        font-weight: 400;
    main
      padding: 50px 0;
      .content-wrapper
        width: 720px;
        margin: 0 auto;
        font-size: 14px;
</style>
