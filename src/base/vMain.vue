<template>
  <main>

    <div class="body-wrapper">
      <v-account v-if="$route.path === '/main'"></v-account>
      <router-view></router-view>
    </div>

  </main>
</template>

<script>

  import VAccount from '../components/vAccount';

  export default {
    components: {
      VAccount
    }
  }
</script>

<style scoped lang="stylus">
  main
    position: relative;
    height: 100%;
    background-color: #f3f5f9;
    overflow-y: scroll;
    .body-wrapper
      /*padding: 20px;*/
    .footer-wrapper
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 74px;
      background-color: #fff;
</style>
