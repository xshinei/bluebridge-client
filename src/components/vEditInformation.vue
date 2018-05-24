<template>
  <form>
    <div class="content">
      <header>
        <h2>修改资料</h2>
      </header>
      <main>
        <div class="form-group">
          <label>年级</label>
          <div class="select-wrapper">
            <select v-model="grade">
              <option v-for="item in GRADE_LIST"
                      :value="item">{{item}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>专业</label>
          <div class="select-wrapper">
            <select v-model="profession">
              <option v-for="item in PROFESSION_LIST"
                      :value="item">{{item}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>语言</label>
          <div class="select-wrapper">
            <select v-model="language">
              <option v-for="item in LANGUAGE_LIST"
                      :value="item">{{item}}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>指导老师</label>
          <div class="select-wrapper">
            <select v-model="teacherId">
              <option v-for="item in teacherList"
                      :value="item.Id">{{item.Name}}</option>
            </select>
          </div>
        </div>

        <div class="button-wrapper">
          <button @click="handleClickButton">保存</button>
        </div>
      </main>
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import { mapGetters, mapMutations } from 'vuex';
  import { config as StudentConfig } from '../model/student';

  export default {
    beforeRouteLeave(to, from, next) {
      if(to.path === 'error') {
        next();
      }
      else if(to.path === '/') {
        next();
      }
      else if(to.path === '/main/edit/success') {
        next();
      }

      if(!this.student.TeacherName) {
        alert('未选择指导老师!');
      }
      else {
        next();
      }
    },
    data() {
      return {
        teacherList: []
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    created() {
      this.GRADE_LIST = StudentConfig.GRADE_LIST;
      this.LANGUAGE_LIST = StudentConfig.LANGUAGE_LIST;
      this.PROFESSION_LIST = StudentConfig.PROFESSION_LIST;

      this.grade = this.student.Grade;
      this.language = this.student.Language;
      this.profession = this.student.Profession;
      this.teacherId = this.student.TeacherId;
      this.teacherName = this.student.TeacherName;
    },
    mounted() {
      this.getTeacherList();
    },
    methods: {
      async getTeacherList() {
        try {
          const result = await axios.get('/teacher/list');
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            this.teacherList = data.result;
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
      async handleClickButton(event) {
        event.preventDefault();

        try {
          const params = {
            id: this.student.Id,
            student: {
              Grade: this.grade,
              Language: this.language,
              Profession: this.profession,
              TeacherId: this.teacherId,
              TeacherName: this.findTeacherName(this.teacherId)
            }
          };

          const result = await axios.post('/student/edit', params);
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            this.afterSubmit();
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
      findTeacherName(teacherId) {
        for(let item of this.teacherList) {
          if(item.Id === teacherId) {
            return item.Name;
          }
        }
      },
      afterSubmit() {
        let student = Object.assign({}, this.student);
        student.Grade = this.grade;
        student.Profession = this.profession;
        student.Language = this.language;
        student.TeacherId = this.teacherId;
        student.TeacherName = this.findTeacherName(this.teacherId);

        this.setStudent(student);

        this.$router.push('/main/edit/success');
      },
      ...mapMutations({
        'setStudent': 'SET_STUDENT'
      })
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/edit-form.styl';

  .form-group
    margin-bottom: 15px;
    label
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
    .select-wrapper
      select
        display: block;
        width: 100%;
        height: 34px;
        line-height: 1.42857143;
        padding: 6px 12px;
        border: 1px solid #cfdadd;
        font-size: 14px;
        color: #555;
        border-radius: 2px;
        background-color: #fff;

</style>
