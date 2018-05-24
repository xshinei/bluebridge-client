<template>
  <form>
    <div class="content">
      <header>
        <h2>修改密码</h2>
      </header>
      <main>
        <v-edit-input type="password"
                      label="初始密码"
                      tag="password"
                      :validate-list="['empty', 'initPassword']"
                      ref="initPassword">
        </v-edit-input>
        <v-edit-input type="password"
                      label="新密码"
                      :value.sync="password"
                      tag="password"
                      :validate-list="['empty', 'format']"
                      ref="newPassword">
        </v-edit-input>
        <div class="button-wrapper">
          <button @click="handleClickButton">保存</button>
        </div>
      </main>
    </div>
  </form>
</template>

<script>

  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import VEditInput from './vEditInput';

  export default {
    data() {
      return {
        password: ''
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    methods: {
      /**
       *  点击按钮
       */
      async handleClickButton(event) {
        event.preventDefault();

        try {
          //验证输入框
          await this.$refs['initPassword'].validate();
          await this.$refs['newPassword'].validate();
        }
        catch (err) {
          return err;
        }

        //验证通过，提交
        this.submit();
      },
      /**
       *  提交信息
       */
      async submit() {
        try {
          //配置请求参数
          const params = {
            id: this.student.Id,
            student: {
              Password: this.password
            }
          };

          //发送请求
          const result = await axios.post('/student/edit', params);
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            //成功，跳转路由
            this.$router.push('/main/edit/success')
          }
          else {
            throw new Error(data.msg);
          }
        }
        catch (err) {
          console.log(err.message);
          this.$router.push('/error');
        }
      }
    },
    components: {
      VEditInput
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/edit-form.styl';
</style>
