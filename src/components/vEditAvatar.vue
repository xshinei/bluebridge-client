<template>
  <form>
    <div class="content">
      <header>
        <h2>修改头像</h2>
      </header>
      <main>
        <div class="form-group">
          <v-edit-upload :value.sync="avatar" @error="handleError"></v-edit-upload>
          <p class="error-msg" v-show="hasErr">{{errorMsg}}</p>
        </div>
        <div class="button-wrapper">
          <button @click="handleSubmit">保存</button>
        </div>
      </main>
    </div>
  </form>
</template>

<script>

  import axios from 'axios';
  import { mapGetters, mapMutations } from 'vuex';
  import Student from '../model/student';
  import VEditUpload from './vEditUpload';

  export default {
    data() {
      return {
        avatar: '',
        hasErr: false,
        errorMsg: ''
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    methods: {
      /**
       *  点击上传头像
       */
      async handleSubmit(event) {
        event.preventDefault();

        //为选择图片，显示错误信息
        if(!(this.avatar instanceof File)) {
          this.handleError('请选择图片!');

          return;
        }

        try {
          //配置请求参数
          let formData = new FormData();
          formData.append('id', this.student.Id);
          formData.append('avatar', this.avatar);

          //发送请求
          const result = await axios.post('/student/upload', formData, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          });
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            //处理数据
            this.afterSubmit(data.result);
          }
          else {
            throw new Error(data.msg);
          }
        }
        catch (err) {
          console.log(err.message);
          this.$router.push('/error');
        }
      },
      /**
       *  显示错误信息
       */
      handleError(msg) {
        this.hasErr = true;
        this.errorMsg = msg;

        setTimeout(() => {
          this.hasErr = false;
        }, 3000);
      },
      /**
       *  重置用户信息
       */
      async afterSubmit(avatar) {
        let student = Object.assign({}, this.student);
        student.Avatar = avatar;

        this.setStudent(student);

        this.$router.push('/main/edit/success')
      },
      ...mapMutations({
        setStudent: 'SET_STUDENT'
      })
    },
    components: {
      VEditUpload
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/edit-form.styl';

  .form-group
    margin-bottom: 15px;
    .error-msg
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: bold;
      color: #a94442;
</style>
