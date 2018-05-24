<template>
  <div class="wrapper">
    <div class="head-wrapper">
      <v-input default-value="标题"
               @change="handleChangeTitle">
      </v-input>
      <v-select-input default-value="批阅情况"
                      :value-list="CORRECT_LIST"
                      @change="handleChangeCorrect">
      </v-select-input>
      <v-select-input default-value="类型"
                      :value-list="TYPE_LIST"
                      @change="handleChangeType">
      </v-select-input>
      <v-select-input default-value="年份"
                      :value-list="YEAR_LIST"
                      @change="handleChangeYear">
      </v-select-input>
    </div>
    <div class="list-wrapper">
      <h3 class="head">
        <i class="fa fa-user" aria-hidden="true"></i>
        提交记录
      </h3>
      <div class="list">
        <table>
          <thead>
            <tr>
              <th class="title">题目</th>
              <th class="name">用户</th>
              <th class="type">类型</th>
              <th class="year">年份</th>
              <th class="language">语言</th>
              <th class="submit-time">提交时间</th>
              <th class="score">分数</th>
              <th class="operator">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in submissionList">
              <td class="title">{{item.Title}}</td>
              <td class="name">{{item.Name}}</td>
              <td class="type">{{item.Type}}</td>
              <td class="year">{{item.Year}}</td>
              <td class="language">{{item.Language}}</td>
              <td class="submit-time">{{item.SubmitTime}}</td>
              <td class="score">
                <span :class="getScoreClass(item.Score)">
                  {{!item.HasCorrected ? '未批阅' : item.Score}}
                </span>
              </td>
              <td class="operator">
                <button :class="!item.HasCorrected ? 'yet' : 'has'"
                        @click="handleToProblemContent(item.ProblemId)">
                  {{!item.HasCorrected ? '重新编辑' : '查看结果'}}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="footer-wrapper">
      <v-page :page-size-prop="pageSize"
              :page-num-prop="pageNum"
              :total-prop="total"
              @change="handlePageChange">
      </v-page>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import VSelectInput from '../base/vSelectInput';
  import VInput from '../base/vInput';
  import VPage from '../base/vPage';
  import { config as ProblemConfig } from '../model/problem';

  export default {
    data() {
      return {
        submissionList: [],
        hasCorrected: '',
        title: '',
        type: '',
        year: '',
        pageSize: 10,
        pageNum: 1,
        total: 0
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    created() {
      this.TYPE_LIST = ProblemConfig.TYPE_LIST;
      this.YEAR_LIST = ProblemConfig.YEAR_LIST;
      this.CORRECT_LIST = ['全部', '已批阅', '未批阅'];
      this.CORRECT_VALUE = {
        ['全部']: '',
        ['已批阅']: true,
        ['未批阅']: false
      };
    },
    mounted() {
      this.getSubmissionList();
      this.getSubmissionCount();
    },
    methods: {
      async getSubmissionList() {
        try {
          //配置请求参数
          const params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            condition: {
              StudentId: this.student.Id,
              HasCorrected: this.hasCorrected,
              Type: this.type,
              Year: this.Year,
              Title: {
                'regexp': this.title
              }
            }
          };

          const result = await axios.get('/submission/list', {params});
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            this.submissionList = data.result;
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
      async getSubmissionCount() {
        try {
          //配置请求参数
          const params = {
            condition: {
              StudentId: this.student.Id,
              HasCorrected: this.hasCorrected,
              Title: {
                'regexp': this.title
              }
            }
          };

          const result = await axios.get('/submission/count', {params});
          const data = result.data;

          if(data.status === 0 && data.result !== '') {
            this.total = data.result;
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
      handlePageChange(num) {
        this.pageNum = num;
        this.getSubmissionList();
      },
      handleChangeTitle(val) {
        this.title = val;
        this.getSubmissionList();
        this.getSubmissionCount();
      },
      handleChangeCorrect(val) {
        this.hasCorrected = this.CORRECT_VALUE[val];
        this.getSubmissionList();
        this.getSubmissionCount();
      },
      handleChangeType(val) {
        this.type = val;
        this.getSubmissionList();
        this.getSubmissionCount();
      },
      handleChangeYear(val) {
        this.year = val;
        this.getSubmissionList();
        this.getSubmissionCount();
      },
      handleToProblemContent(problemId) {
        this.$router.push({
          path: `/main/problemContent/${problemId}`
        });
      },
      getScoreClass(score) {
        if(score === undefined) {
          return 'yet';
        }
        else {
          if(+score === 100) {
            return 'hundred';
          }
          else if(+score >= 80) {
            return 'eighty';
          }
          else if(+score >= 60) {
            return 'sixty';
          }
          else {
            return 'zero';
          }
        }
      }
    },
    components: {
      VSelectInput,
      VInput,
      VPage
    }
  }
</script>

<style scoped lang="stylus">
  .wrapper
    .head-wrapper
      height: 32px;
      padding: 9px 200px;
      border-bottom: 1px solid #dee5e7;
      background-color: #fff;
    .list-wrapper
      padding: 10px;
      .head
        padding: 7px;
        font-size: 24px;
        text-align: center;
        background-color: #fff;
      .list
        table
          width: 100%;
          max-width: 100%;
          border-top: 1px solid #dee5e7;
          border-spacing: 0;
          border-collapse: collapse;
          font-size: 13px;
          border-bottom-right-radius: 3px;
          border-bottom-left-radius: 3px;
          thead
            tr
              th
                padding: 6px 15px;
                border-bottom: 1px solid #e0e4e8;
                border-right: 1px solid #e0e4e8;
                background: #fafbfc;
                text-align: left;
                &.name
                  width: 140px;
                &.type
                  width: 90px;
                &.year
                  width: 90px;
                &.language
                  width: 90px;
                &.submit-time
                  width: 150px;
                &.score
                  width: 100px;
                &.operator
                  width: 120px;
                  border-right: none;
          tbody
            tr
              td
                padding: 6px 15px;
                border-top: 1px solid #eaedef;
                background-color: #fcfdfe;
                &.score
                  .yet
                    padding: .2em .6em .3em;
                    font-size: 75%;
                    border-radius: .25em;
                    background-color: #fad733;
                    color: #fffefa;
                  .hundred
                    color: #27c24c;
                  .eighty
                    color: #23b7e5;
                  .sixty
                    color: #fad733;
                  .zero
                    color: #f05050;
                &.operator
                  button
                    width: 90px;
                    padding: 2px 15px;
                    font-weight: 500;
                    border-radius: 2px;
                    color: #fff;
                    outline: 0;
                    cursor: pointer
                    &.yet
                      background-color: #23b7e5;
                      border-color: #23b7e5;
                      &:hover
                        background-color: #19a9d5;
                        border-color: #189ec8;
                    &.has
                      background-color: #f05050;
                      border-color: #f05050;
                      &:hover
                        background-color: #ee3939;
                        border-color: #ed2a2a;
    .footer-wrapper
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 32px;
      padding: 9px 200px;
      border-bottom: 1px solid #dee5e7;
      margin-left: 200px;
      margin-right: 7px;
      background-color: #fff;
</style>
