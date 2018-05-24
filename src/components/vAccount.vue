<template>
  <div>
    <header></header>
    <main>
      <div class="timer-shaft-wrapper">
        <div class="timer-shaft">

          <div class="item" v-for="item in submissionList">
            <a href="" class="avatar">
              <img :src="`/images/avatar/${student.Avatar}`" alt="">
            </a>
            <div class="panel">
              <header>
                <a href="" class="arrow-wrapper">
                  <i class="arrow"></i>
                </a>
                <a class="name">{{item.Name}}</a>
                <span class="time">
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                   {{item.SubmitTime}}
                </span>
              </header>
              <main>
                <p class="text">{{item.Name}}  已经AC了  <span>{{item.Title}}</span></p>
              </main>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script>

  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import ServerConfig from '../api/server-config';

  export default {
    data() {
      return {
        submissionList: []
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    created() {
      this.AVATAR_URL = ServerConfig.AVATAR_URL;
    },
    mounted() {
      this.getSubmissionList();
    },
    methods: {
      async getSubmissionList() {
        try {
          const params = {
              condition: {
                StudentId: this.student.Id
              }
          };

          const result = await axios.get('/submission/list', {params});
          const data= result.data;

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
    }
  }
</script>

<style scoped lang="stylus">
  header
    padding: 20px;
    border-bottom: 1px solid #dee5e7;
    background-color: #fff;
    color: #58666e;
  main
    width: 100%;
    .timer-shaft-wrapper
      float: left;
      width: 75%;
      min-width: 300px;
      padding: 15px;
      .timer-shaft
        position: relative;
        margin: 0 0 15px 20px;
        border-left: 1px solid #e0e4e8;
        .item
          .avatar
            position: relative;
            float: left;
            display: inline-block;
            width: 38px;
            height: 38px;
            margin-left: -20px;
            border: 1px solid rgba(255,255,255,0.2);
            img
              width: 100%;
              height: 100%;
              border-radius: 50%;
          .panel
            margin: 0 0 20px 30px;
            border: 1px solid #dee5e7;
            border-radius: 2px;
            background-color: #fff;
            header
              padding: 10px 15px;
              border-bottom: 1px solid #dee5e7;
              .arrow-wrapper
                position: relative;
                float: left;
                display: inline-block;
                width: 40px;
                margin-left: -20px;
                border: 1px solid rgba(255,255,255,0.2);
                .arrow
                  position: absolute;
                  z-index: 10;
                  top: 50%;
                  left: -9px;
                  margin-top: -9px;
                  width: 0;
                  height: 0;
                  border-width: 9px 9px 9px 0;
                  &::after
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 0;
                    top: 50%;
                    left: 1px;
                    bottom: -8px;
                    border-width: 8px;
                    border-left-width: 0;
                    border-color: transparent #fff transparent;
                    border-style: solid;
              .time
                float: right;
                margin-left: 10px;
                color: #99a6ad;
            main
              padding: 15px;
              .text
                margin-bottom: 10px;
                span
                  padding: .2em .6em .3em;
                  border-radius: .25em;
                  background-color: #23b7e5;
                  color: #d9f3fb;
        &::after
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 7px;
          height: 7px;
          margin-left: -5px;
          border: 1px solid rgb(222, 229, 231);
          background-color: #fff;
          border-radius: 10px;
</style>
