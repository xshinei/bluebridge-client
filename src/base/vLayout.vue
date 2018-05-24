<template>
  <div>
    <div class="header-wrapper">
      <v-header></v-header>
    </div>

    <div class="main-wrapper">
      <v-nav></v-nav>
      <v-main></v-main>
    </div>
  </div>
</template>

<script>

  import VHeader from './vHeader';
  import VNav from './vNav';
  import VMain from './vMain';

  export default {
    components: {
      VHeader,
      VNav,
      VMain
    }
  }
</script>

<style scoped lang="stylus">
  .header-wrapper
    width: 100%;
    height: 50px;
    background-color #16aad8;

  .main-wrapper
    position: absolute;
    top: 50px;
    bottom: 0;
    width: 100%;
</style>
