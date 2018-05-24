<template>
  <div class="wrapper">
    <div class="head-wrapper">
      <v-select-input default-value="年份"
                      :value-list="YEAR_LIST"
                      @change="handleChangeYear">
      </v-select-input>

      <v-select-input default-value="语言"
                      :value-list="LANGUAGE_LIST"
                      @change="handleChangeLanguage">
      </v-select-input>
    </div>
    <div class="list-wrapper">
      <table>
        <thead>
        <tr>
          <th class="status">
            <i class="fa fa-star" aria-hidden="true"></i>
          </th>
          <th class="id">ID</th>
          <th class="title">题目名称</th>
          <th class="difficulty">难度等级</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="problem in problemList">
          <td class="score" :class="getScoreClass(problem.Score)">
            <i v-show="problem.Score && problem.Score === -1" class="fa fa-check" aria-hidden="true"></i>
            <span v-show="problem.Score && problem.Score !== -1">{{problem.Score}}</span>
          </td>
          <td>{{problem.SortId}}</td>
          <td class="title" @click="handleChangeRouter(problem.Id)">
            <span>{{problem.Title}}</span>
          </td>
          <td class="difficulty">
            <span :class="DIFFICULTY_CLASS[problem.Difficulty - 1]">
              {{DIFFICULTY_TEXT[problem.Difficulty - 1]}}
            </span>
          </td>
        </tr>
        </tbody>

      </table>
    </div>
    <!--<div class="footer-wrapper"></div>-->
  </div>
</template>

<script>

  import axios from 'axios';
  import {mapGetters} from 'vuex';

  import VSelectInput from '../base/vSelectInput';
  import {config as ProblemConfig} from '../model/problem';

  export default {
    props: {
      type: {
        type: String
      }
    },
    data() {
      return {
        problemList: [],
        submissionInfoList: [],
        year: ProblemConfig.LATEST_YEAR,
        language: 'C/C++'
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    created() {
      this.DIFFICULTY_CLASS = ['bronze', 'silver', 'gold', 'diamond', 'master'];
      this.DIFFICULTY_TEXT = ProblemConfig.DIFFICULTY_TEXT;
      this.YEAR_LIST = ProblemConfig.YEAR_LIST;
      this.LANGUAGE_LIST = ProblemConfig.LANGUAGE_LIST;
    },
    mounted() {
      this.getProblemList();
    },
    methods: {
      /**
       *  获取题目列表
       */
      async getProblemList() {
        try {
          const params = {
            pageNum: 1,
            pageSize: 10,
            condition: {
              Type: this.type,
              Year: this.year,
              Language: this.language
            }
          };

          const result = await axios.get('/problem/list', {params});
          const data = result.data;

          if (data.status === 0 && data.result !== '') {
            this.problemList = data.result;
            this.sortProblemList();
            this.getSubmissionList();
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
       *  获取提交记录列表
       */
      async getSubmissionList() {
        try {
          const params = {
            condition: {
              StudentId: this.student.Id,
              Type: this.type,
              Year: this.year,
              Language: this.language
            }
          };

          const result = await axios.get('/submission/list', {params});
          const data = result.data;

          if (data.status === 0 && data.result !== '') {
            this.submissionInfoList = data.result;
            this.serializeProblemList();
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
       *  年份下拉列表改变
       */
      handleChangeYear(val) {
        this.year = val;
        this.getProblemList();
      },
      /**
       *  语言下拉列表改变
       */
      handleChangeLanguage(val) {
        this.language = val;
        this.getProblemList();
      },
      /**
       *  跳转路由
       */
      handleChangeRouter(problemId) {
        this.$router.push({
          path: `/main/problemContent/${problemId}`
        });
      },
      /**
       *  序列化题目列表
       */
      serializeProblemList() {
        this.problemList.forEach(item => {
          const score = this.hasScore(item.Id);

          score && (this.$set(item, 'Score', score));
        });
      },
      hasScore(problemId) {
        const list = this.submissionInfoList;
        const len = list.length;

        for (let i = 0; i < len; i++) {
          if (problemId === list[i].ProblemId) {
            return list[i].HasCorrected ? list[i].Score : -1;
          }
        }

        return false;
      },
      /**
       *  根据score获取对应的css类
       * @param score
       * @return {string}
       */
      getScoreClass(score) {
        if (+score === 100) {
          return 'hundred';
        }
        else if (+score >= 80) {
          return 'eighty';
        }
        else if (+score >= 60) {
          return 'sixty';
        }
        else if(+score < 60) {
          return 'zero';
        }

        return '';
      },
      /**
       *  根据SortId排序题目列表
       */
      sortProblemList() {
        this.problemList.sort((a, b) => {
          return a.SortId - b.SortId;
        });
      }
    },
    components: {
      VSelectInput
    }
  }
</script>

<style scoped lang="stylus">
  .head-wrapper
    height: 32px;
    padding: 9px 200px;
    border-bottom: 1px solid #dee5e7;
    background-color: #fff;

  .list-wrapper
    padding: 20px;
    table
      width: 100%;
      border-collapse: collapse;
      background-color: #fff !important;
      thead
        tr
          background: #fafbfc;
          th
            padding: 6px 15px;
            border-bottom: 1px solid #e0e4e8;
            border-right: 1px solid #e0e4e8;
            text-align: left;
            &.status
              width: 10px;
            &.id
              width: 30px;
            &.difficulty
              width: 95px;
              border-right: 0;
      tbody
        tr
          height: 40px;
          td
            line-height: 1;
            padding: 6px 15px;
            border-top: 1px solid #eaedef;
            font-size: 14px;
            &.score
              &.hundred
                color: #27c24c;
              &.eighty
                color: #23b7e5;
              &.sixty
                color: #fad733;
              &.zero
                color: #f05050;
            &.title
              span:hover
                color: #141719;
                cursor: pointer;
            &.difficulty
              color: #fff;
              span
                display: block;
                width: 90px;
                padding: 2px 6px 3px;
                text-align: center;
                border-radius: 5px;
                &.bronze
                  background-color: #bbb;
                &.silver
                  background-color: #f89406;
                &.gold
                  background-color: #c3325f;
                &.diamond
                  background-color: #9d261d;
                &.master
                  background-color: #049cdb;
</style>
