<template>
  <div class="login-wrapper">
    <header></header>
    <main>
      <div class="login-box">
        <h1>登录</h1>
        <div class="err-wrapper" v-if="errShow">
          <p class="text">{{errMsg}}</p>
        </div>
        <div class="input-wrapper">
          <input type="text" placeholder="账号" v-model="username">
        </div>
        <div class="input-wrapper">
          <input type="password" placeholder="密码" v-model="password">
        </div>
      </div>
      <div class="button-wrapper">
        <button class="submit" @click="handleLogin">登录</button>
        <a class="register" @click="handleToRegister"> 注册个新账户 </a>
      </div>

      <div class="forget-wrapper">
        <a class="forget" @click="handleToForget">忘记了密码？</a>
      </div>
    </main>
    <footer>
      <p class="copyright">@copyright   项目负责人：张安   指导老师：谭立兴</p>
    </footer>
  </div>
</template>

<script>

  import axios from 'axios';
  import { mapMutations } from 'vuex';

  import Student from '../model/student';
  import LocalStorage from '../api/local-storage';

  export default {
    data() {
      return {
        username: '',
        password: '',
        errShow: false,
        errMsg: ''
      };
    },
    mounted() {
      //本地缓存
      const student = LocalStorage.getItem('student');
      const token = LocalStorage.getItem('token');

      //本地有缓存，则跳过登录
      if (student && token) {
        //存入vuex
        this.setStudent(student);

        //跳转路由
        this.$router.push('/main');
      }
    },
    methods: {
      /**
       *  点击登录按钮
       */
      async handleLogin() {
        if(this.username === '' || this.password === '') {
          return;
        }

        try {
          //配置请求参数
          const params = {
            username: this.username,
            password: this.password
          };

          //请求数据
          const result = await axios.post('/student/login', params);
          const data = result.data;

          if(data.status === 0) {
            //没有抛出异常
            if(data.result !== '') {
              //没有自定义错误
              const student = new Student({...data.result});

              //存入vuex
              this.setStudent(student);

              //本地缓存
              LocalStorage.setItem('student', student);
              LocalStorage.setItem('token', data.token);

              //跳转路由
              if(!student.TeacherName) {
                //未选指导老师
                alert('未选择指导老师，请前去选择!');
                this.$router.push('/main/edit/information');
              }
              else {
                this.$router.push('/main/problemType');
              }
            }
            else {
              //自定义错误，显示错误信息
              this.errShow = true;
              this.errMsg = data.msg;
            }
          }
          else {
            console.log(data.msg);
            this.$router.push('/error');
          }
        }
        catch (err) {
          console.log(err.message);
        }
      },
      handleToRegister() {
        this.$router.push('/register/validate');
      },
      handleToForget() {
        this.$router.push('/forget');
      },
      ...mapMutations({
        setStudent: 'SET_STUDENT'
      })
    }
  }
</script>

<style scoped lang="stylus">
  .login-wrapper
    width: 100%;
    height: 100%;
    background-color: #2e9fff;
    header
      max-width: 400px;
      margin: 0 auto 15px;
      padding: 30px 0;
    main
      box-sizing: border-box;
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
      .err-wrapper
        line-height: 16px;
        padding: 8px 48px 8px 16px;
        border: 1px solid #fbd9d0;
        margin-bottom: 10px;
        font-size: 12px;
        background-color: #fdece8;
        border-radius: 6px;
        color: #495060;
      .input-wrapper
        position: relative;
        margin-top: 20px;
        input
          box-sizing: border-box;
          display: inline-block;
          width: 100%;
          height: 44px;
          line-height: 26px;
          margin: 0 auto;
          padding: 4px 6px;
          border: 1px solid #c2c9d4;
          border-radius: 3px;
          font-size: 16px;
          color: #546673;
          background: #fff;
          outline: 0;
          &:focus
            border-color: #2e9fff;
            background: #fff;
            color: #2e9fff;
      .button-wrapper
        overflow: hidden;
        .submit
          display: inline-block;
          float: left;
          width: 47.5%;
          line-height: 26px;
          padding: 8px 10px;
          margin: 20px auto 0;
          border: 1px solid transparent;
          border-radius: 3px;
          font-weight: 500;
          background: rgba(46,159,255,.7);
          color: #fff;
          outline: none;
          transition: .15s all ease;
          &:hover
            background: #234970!important;
            color: #fff;
            cursor: pointer;
        .register
          box-sizing: border-box;
          display: inline-block;
          float: right;
          width: 47.5%;
          line-height: 26px;
          padding: 8px 12px;
          border: 1px solid rgba(46,159,255,.5);
          margin: 20px auto 0;
          font-size: 14px;
          text-align: center;
          border-radius: 3px;
          color: #2e9fff;
          transition: all .2s ease 0s;
          &:hover
            border-color: #2e9fff;
            cursor: pointer;
      .forget-wrapper
        margin: 25px 0 -10px;
        text-align: center;
        .forget
          color: #7f919e;
          font-size: 15px;
          &:hover
            color: #2e9fff;
            cursor: pointer;
    footer
      max-width: 400px;
      margin: 20px auto;
      .copyright
        text-align: center;
        color: #fff;
        white-space: pre-wrap;
</style>
