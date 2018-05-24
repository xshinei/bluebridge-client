<template>
  <header>
    <a class="retreat" @click="handleRetreat">
      <i class="fa fa-chevron-left icon" aria-hidden="true"></i>
    </a>
    <button class="logout" @click="handleLogout">注销</button>
  </header>
</template>

<script>

  import { mapMutations } from 'vuex';
  import LocalStorage from '../api/local-storage';

  export default {
    methods: {
      /**
       *  点击注销
       */
      handleLogout() {
        this.setStudent({});
        LocalStorage.clear();
        this.$router.push('/');
      },
      handleRetreat() {
        this.$router.go(-1);
      },
      ...mapMutations({
        setStudent: 'SET_STUDENT'
      })
    }
  }
</script>

<style scoped lang="stylus">
  header
    height: 100%;
    font-size: 0;
    .logout
      float: right;
      width: 80px;
      height: 100%;
      border: 0;
      font-size: 16px;
      color: #fff;
      background-color: #23b7e5;
      outline: none;
      &:hover
        background-color: #19a9d5;
        cursor: pointer;
    .retreat
      float: left;
      width: 50px;
      text-align: center;
      cursor: pointer;
      background-color: #23b7e5;
      &:hover
        background-color: #19a9d5;
      .icon
        line-height: 50px;
        font-size: 24px;
        color: #fff;
</style>
