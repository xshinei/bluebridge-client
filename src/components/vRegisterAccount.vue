<template>
  <form action="">

    <div class="form-group">
      <div class="form-item">
        <span class="form-label form-label-b">设置登录账号</span>
      </div>
    </div>
    <div class="form-group">
      <v-register-input :exist="true"
                        label="登录账号"
                        placeholder="设置你的登录账号!"
                        warn-msg="请填写你的登录账号!"
                        tag="username"
                        user="student"
                        :value.sync="username"
                        :finish.sync="usernameFinish">
      </v-register-input>
    </div>

    <div class="form-group">
      <div class="form-item">
        <span class="form-label form-label-b">设置登录密码</span>
      </div>
    </div>
    <div class="form-group">
      <v-register-input label="登录密码"
                        placeholder="设置你的登录密码!"
                        warn-msg="请填写你的登录密码!"
                        tag="password"
                        type="password"
                        :value.sync="password"
                        :finish.sync="passwordFinish">
      </v-register-input>

      <v-register-password-input :finish.sync="passwordAgainFinish"
                                 :password="password">
      </v-register-password-input>
    </div>

    <div class="form-group">
      <v-register-button :finish="hasFinish"
                         @clickButton="handleNext">
      </v-register-button>
    </div>

  </form>
</template>

<script>

  import VRegisterPasswordInput from './vRegisterPasswordInput';
  import VRegisterInput from './vRegisterInput';
  import VRegisterButton from './vRegisterButton';
  import { mapMutations } from 'vuex';

  export default {
    name: "v-register-account",
    beforeRouteEnter(to, from, next) {
      //如果不是从validate组建跳转而来，则跳转到validate页面
      if(from.path !== '/register/validate') {
        next('/register/validate');
      }

      next();
    },
    data() {
      return {
        username: '',
        password: '',
        usernameFinish: false,
        passwordFinish: false,
        passwordAgainFinish: false
      };
    },
    computed: {
      hasFinish() {
        return this.usernameFinish && this.passwordFinish && this.passwordAgainFinish;
      }
    },
    methods: {
      handleNext() {
        this.setRegisterInfo({
          username: this.username,
          password: this.password
        });

        this.$router.push('/register/information');
      },
      ...mapMutations({
        setRegisterInfo: 'SET_REGISTER_INFO'
      })
    },
    components: {
      VRegisterPasswordInput,
      VRegisterInput,
      VRegisterButton
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/register-form.styl';
</style>
