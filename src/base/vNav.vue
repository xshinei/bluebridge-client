<template>
  <nav>
    <div class="user-wrapper">
      <div class="avatar">
        <img :src="`${AVATAR_URL}/${student.Avatar}`" alt="">
      </div>
      <div class="username" @click="handleShowDropdownMenu">
        <span class="text">{{student.Name}}</span>
        <i class="icon fa fa-caret-down" aria-hidden="true"></i>
      </div>
      <ul class="drop-down-menu" v-show="dropdownMenuShow">
        <li class="arrow-wrapper">
          <span class="arrow"></span>
        </li>
        <li>
          <router-link to="/main/edit/avatar">修改头像</router-link>
        </li>
        <li>
          <router-link to="/main/edit/password">修改密码</router-link>
        </li>
        <li>
          <router-link to="/main/edit/information">修改资料</router-link>
        </li>
      </ul>
    </div>
    <div class="nav-wrapper">
      <p class="head">Navigation</p>
      <ul>
        <li class="item" @click="handleChangeRouter('')">
          <a class="link">
            <i class="icon fa fa-user-o" aria-hidden="true"></i>
            <span class="text">我的</span>
          </a>
        </li>
        <li class="item" @click="handleChangeRouter('problemType')">
          <a class="link">
            <i class="icon fa fa-align-justify" aria-hidden="true"></i>
            <span class="text">题库</span>
          </a>
        </li>
        <li class="item"  @click="handleChangeRouter('submission')">
          <a class="link">
            <i class="icon fa fa-eye" aria-hidden="true"></i>
            <span class="text">题解</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

  import { mapGetters } from 'vuex';
  import ServerConfig from '../api/server-config';

  export default {
    data() {
      return {
        dropdownMenuShow: false
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    created() {
      this.AVATAR_URL = ServerConfig.AVATAR_URL;

      window.addEventListener('click', () => {
        this.dropdownMenuShow = false;
      });
    },
    methods: {
      /**
       *  点击显示or隐藏下拉列表
       */
      handleShowDropdownMenu(event) {
        this.dropdownMenuShow = !this.dropdownMenuShow;

        event.stopPropagation();
      },
      handleChangeRouter(path) {
        const allPath = !!path ? `/main/${path}` : '/main';
        this.$router.push({
          path: allPath
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
  nav
    float: left;
    height: 100%;
    width: 200px;
    background-color #2c3039;
    .user-wrapper
      position: relative;
      padding: 15px;
      .avatar
        width: 96px;
        height: 96px;
        margin: 10px auto 0;
        border-radius: 50%;
        img
          width: 94px;
          height: 94px;
          border-radius: 50%;
      .username
        width: 170px;
        height: 20px;
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
        .text
          font-weight: 700;
          color: #bfd1de;
        .icon
          color: #6b94b3;
      .drop-down-menu
        position: absolute;
        top: 100%;
        left: 0;
        width: 197px;
        padding: 5px 0;
        border: 1px solid rgba(0,0,0,0.1);
        margin: 2px 0 0;
        border-radius: 2px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        font-size: 14px;
        text-align: left;
        background-clip: padding-box;
        background-color: #fff;
        .arrow-wrapper
          padding: 15px;
          border-bottom: 1px solid #e0e4e8;
          margin-top: -5px;
          margin-bottom: 10px;
          background-color: #23b7e5;
          .arrow, .arrow::after
            position: absolute;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
          .arrow
            top: -9px;
            left: 50%;
            border-width: 9px;
            border-top-width: 0;
            border-bottom-color: rgba(0,0,0,0.1);
            margin-left: -9px;
            &::after
              content: '';
              top: 1px;
              border-width: 8px;
              border-top-width: 0;
              border-bottom-color: #23b7e5;
              margin-left: -8px;
        li
          a
            display: block;
            line-height: 1.42857143;
            padding: 5px 15px;
            clear: both;
            font-weight: normal;
            color: #333;
            white-space: nowrap;
            &:hover
              color: #141719;
              background-color: #edf1f2;
    .nav-wrapper
      .head
        margin-top: 15px;
        margin-bottom: 10px;
        padding: 0 15px;
        font-size: 12px;
        color: #507b9b;
      .item
        height: 40px;
        cursor: pointer
        .link
          display: block;
          height: 20px;
          padding: 10px 20px;
          color: #7ca1bb;
          &:hover
            color: #fff;
            background-color: #131e26;
          .icon
            width: 40px;
            height: 40px;
            line-height: 40px;
            margin: -10px -10px;
            margin-right: 5px;
            color: #43d967;
            text-align: center;
          .text
            font-weight: 700;

</style>
