<template>
  <form action="">

    <div class="form-group">
      <div class="form-item">
        <span class="form-label form-label-b">设置真实姓名信息</span>
      </div>
    </div>
    <div class="form-group">
      <v-register-input label="真实姓名"
                        placeholder="设置你的真实姓名"
                        warn-msg="请填写你的真实姓名"
                        tag="name"
                        :value.sync="name"
                        :finish.sync="nameFinish">
      </v-register-input>
    </div>

    <div class="form-group">
      <div class="form-item">
        <span class="form-label form-label-b">设置邮箱信息</span>
      </div>
    </div>
    <div class="form-group">
      <v-register-input label="邮箱"
                        placeholder="设置你的邮箱"
                        warn-msg="请填写你的邮箱"
                        tag="email"
                        :value.sync="email"
                        :finish.sync="emailFinish">
      </v-register-input>
    </div>

    <div class="form-group">
      <div class="form-item">
        <span class="form-label form-label-b">设置专业信息</span>
      </div>
    </div>
    <div class="form-group">
        <v-register-select :value.sync="profession"
                           :list="PROFESSION_LIST"
                           label="专业">
        </v-register-select>
    </div>

    <div class="form-group">
      <div class="form-item">
        <span class="form-label form-label-b">设置年级信息</span>
      </div>
    </div>
    <div class="form-group">
      <v-register-select :value.sync="grade"
                         :list="GRADE_LIST"
                         label="年级">
      </v-register-select>
    </div>

    <div class="form-group">
      <div class="form-item">
        <span class="form-label form-label-b">设置语言信息</span>
      </div>
    </div>
    <div class="form-group">
      <v-register-select :value.sync="language"
                         :list="LANGUAGE_LIST"
                         label="语言">
      </v-register-select>
    </div>

    <div class="form-group">
      <div class="form-item">
        <span class="form-label form-label-b">设置指导老师信息</span>
      </div>
    </div>
    <div class="form-group">
      <v-register-select :value.sync="teacherName"
                         :list="teacherList"
                         label="指导老师">
      </v-register-select>
    </div>

    <div class="form-group">
      <v-register-button :finish="finish"
                         @clickButton="handleNext">
      </v-register-button>
    </div>

  </form>
</template>

<script>

  import axios from 'axios';
  import { mapGetters } from 'vuex';

  import VRegisterInput from './vRegisterInput';
  import VRegisterSelect from './vRegisterSelect';
  import VRegisterButton from './vRegisterButton';
  import { config as StudentConfig } from '../model/student';

  export default {
    beforeRouteEnter(to, from, next) {
      //如果不是从account组建跳转而来，则跳转到account页面
      if(from.path !== '/register/account') {
        next('/register/validate');
      }
      else {
        next();
      }
    },
    data() {
      return {
        name: '',
        email: '',
        grade: '',
        profession: '',
        language: '',
        teacherId: '',
        teacherList: [],
        teacherMap: new Map(),
        teacherName: '',
        nameFinish: false,
        emailFinish: false
      };
    },
    computed: {
      finish() {
        return this.nameFinish && this.emailFinish;
      },
      ...mapGetters([
        'registerInfo'
      ])
    },
    created() {
      this.GRADE_LIST = StudentConfig.GRADE_LIST;
      this.LANGUAGE_LIST = StudentConfig.LANGUAGE_LIST;
      this.PROFESSION_LIST = StudentConfig.PROFESSION_LIST;
      this.grade = this.GRADE_LIST[0];
      this.profession = this.PROFESSION_LIST[0];
      this.language = this.LANGUAGE_LIST[0];
    },
    mounted() {
      this.getTeacherList();
    },
    methods: {
      async getTeacherList() {
        try {
          const res = await axios.get('/teacher/list');
          const data = res.data;

          if(data.status === 0 && data.result !== '') {
            for(let item of data.result) {
              this.teacherMap.set(item.Name, item.Id);
            }

            this.teacherList = [...this.teacherMap.keys()];
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
      async handleNext() {
        try {
          const params = {
            username: this.registerInfo.username,
            password: this.registerInfo.password,
            name: this.name,
            email: this.email,
            grade: this.grade,
            profession: this.profession,
            language: this.language,
            teacherId: this.teacherId,
            teacherName: this.teacherName
          };

          const result = await axios.post('/student/add', params);
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            this.$router.push('/register/success');
          }
          else {
            console.log(data.msg);
            this.$router.push('/error');
          }
        }
        catch (err) {
          console.log(err.message);
        }
      }
    },
    watch: {
      teacherName(newVal) {
        this.teacherId = this.teacherMap.get(newVal);
      }
    },
    components: {
      VRegisterInput,
      VRegisterSelect,
      VRegisterButton
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/register-form.styl';
</style>
