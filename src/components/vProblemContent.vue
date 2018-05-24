<template>
  <div class="wrapper">
    <header>
      <div class="title-wrapper">
        <h3> {{problem.Title}} </h3>
      </div>
      <div class="difficulty-wrapper">
        <i class="icon fa fa-trophy" aria-hidden="true"></i>
        <span class="text">题目等级:{{DIFFICULTY_TEXT[problem.Difficulty - 1]}}</span>
      </div>
    </header>
    <main>
      <v-problem-panel title="题目描述 Description"
                       :content="problem.MainDescription"
                       :image-list="problem.ImageList">
      </v-problem-panel>

      <v-problem-panel title="输入描述 Input Description"
                       :content="problem.InputDescription">
      </v-problem-panel>

      <v-problem-panel title="输出描述 Output Description"
                       :content="problem.OutputDescription">
      </v-problem-panel>

      <v-problem-panel title="样例输入 Sample Input"
                       :content="problem.SampleInput">
      </v-problem-panel>

      <v-problem-panel title="样例输出 Sample Output"
                       :content="problem.SampleOutput">
      </v-problem-panel>

      <v-problem-panel title="数据范围及提示 Data Size & Hint"
                       :content="problem.DataSize">
      </v-problem-panel>

      <ace-editor :is-read-only="!!submission.Score" ref="Editor"></ace-editor>

      <div class="submit-wrapper" v-show="!submission.Score">
        <button class="submit" @click="handleSubmit">提交</button>
      </div>
    </main>

    <footer>
      <div class="remark-wrapper" v-show="submission.HasCorrected">
        <div class="head">
          <p class="title">评语</p>
          <p class="time">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            {{submission.CorrectTime}}
          </p>
          <span class="score">{{submission.Score}}</span>
        </div>
        <div class="body">{{submission.Remark}}</div>
      </div>
    </footer>

    <v-modal title="提示"
             content="确定要提交?"
             :show.sync="modalShow"
             @confirm="handleModalConfirm">
    </v-modal>

  </div>
</template>

<script>

  import axios from 'axios';
  import { mapGetters } from 'vuex';

  import VProblemPanel from './vProblemPanel';
  import AceEditor from './vAceEditor';
  import VModal from '../base/vModal';
  import { config as ProblemConfig } from '../model/problem';

  export default {
    props: {
      problemId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        problem: {},
        submission: {},
        modalShow: false
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    created() {
      this.DIFFICULTY_TEXT = ProblemConfig.DIFFICULTY_TEXT;
    },
    mounted() {
      this.getProblemOne();
      this.getSubmissionInfo();
    },
    methods: {
      /**
       *  获取题目信息
       */
      async getProblemOne() {
        try {
          const params = {
            id: this.problemId
          };

          const result = await axios.get('/problem/one', {params});
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            this.problem = data.result;
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
       *  获取提交记录信息
       */
      async getSubmissionInfo() {
        try {
          const params = {
            condition: {
              StudentId: this.student.Id,
              ProblemId: this.problemId
            }
          };

          const result = await axios.get('/submission/info', {params});
          const data = result.data;

          if(data.status === 0) {
            if(data.result !== '') {
              this.submission = data.result;
              this.setAceEditorValue(this.submission.Code);
            }
            else {
              console.log(data.msg);
            }
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
       *  点击显示模态框
       */
      handleSubmit() {
        this.modalShow = true;
      },
      /**
       *  模态框确认
       */
      async handleModalConfirm() {
        this.submission.Id ? this.edit() : this.add();
      },
      async add() {
        try {
          const params = {
            name: this.student.Name,
            title: this.problem.Title,
            type: this.problem.Type,
            year: this.problem.Year,
            language: this.problem.Language,
            code: this.getAceEditorValue(),
            problemId: this.problem.Id,
            teacherId: this.student.TeacherId,
            studentId: this.student.Id,
          };

          const result = await axios.post('/submission/add', params);
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            this.$router.push('/main/submission');
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
      async edit() {
        try {
          const params = {
            id: this.submission.Id,
            submission: {
              Code: this.getAceEditorValue()
            }
          };

          const result = await axios.post('/submission/edit', params);
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            this.$router.push('/main/submission');
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
       *  设置代码编辑器的值
       */
      setAceEditorValue(val) {
        this.$refs.Editor.editor.setValue(val);
        this.$refs.Editor.editor.gotoLine(1);
      },
      /**
       *  获取代码编辑器的值
       */
      getAceEditorValue(val) {
        return this.$refs.Editor.editor.getValue(val);
      }
    },
    components: {
      VProblemPanel,
      AceEditor,
      VModal
    }
  }
</script>

<style scoped lang="stylus">
  .wrapper
    height: 100%;
    background-color: #fff;
    header
      border-bottom: 2px solid #dee5e7;
      background-color: rgb(241, 243, 244);
      .title-wrapper
        padding: 0 15px;
        h3
          padding: 10px 0 5px;
          font-size: 24px;
      .difficulty-wrapper
        height: 36px;
        padding: 0 15px;
        margin-bottom: 10px;
        .icon
          vertical-align: middle;
          font-size: 2em;
          color: #d9d9d9;
          text-shadow: 0 1px 1px #fff;
        .text
          margin-left: 5px;
          line-height: 36px;
    main
      padding: 20px;
      .submit-wrapper
        .submit
          width: 90px;
          padding: 7px 12px;
          font-weight: 500;
          border-radius: 2px;
          color: #fff;
          background-color: #23b7e5;
          border-color: #23b7e5;
          outline: none;
          &:hover
            background-color: #19a9d5;
            border-color: #189ec8;
            cursor: pointer
    footer
      padding: 20px;
      .remark-wrapper
        width: 75%;
        border: 1px solid #dee5e7;
        .head
          position: relative;
          padding: 10px 15px;
          color: #333;
          background-color: #f6f8f8;
          p
            margin-bottom: 10px;
            &.title
              font-size: 18px;
              font-weight: 700;
            &.time
              margin: 0;
          .score
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            font-size: 44px;
        .body
          line-height: 1.8;
          padding: 15px;
          background-color: #fff;
          white-space: pre-wrap;
</style>
