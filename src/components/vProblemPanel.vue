<template>
  <div class="panel-wrapper" v-if="contentTrim !== ''">
    <div class="title">
      <span class="text">{{title}}</span>
    </div>
    <div class="content">
      <p class="text" v-html="contentTrim"></p>
      <img v-if="imageList !== []"
           v-for="item in imageList"
           :src="`${PROBLEM_IMAGE_URL}/${item.url}`"
           alt="" class="img">
    </div>
  </div>
</template>

<script>

  import ServerConfig from '../api/server-config';

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      imageList: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    computed: {
      contentTrim() {
        return this.content.replace(/</g, '&lt').replace('/>/g', '&gt').replace(/\n/g, '<br />');
      }
    },
    created() {
      this.PROBLEM_IMAGE_URL = ServerConfig.PROBLEM_IMAGE_URL;
    }
  }
</script>

<style scoped lang="stylus">
  .panel-wrapper
    width: 75%;
    margin-bottom: 20px;
    border: 1px solid #dee5e7;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    .title
      padding: 10px 15px;
      border-bottom: 1px solid #edf1f2;
      background-color: #f6f8f8;
      .text
        color: #333;
        font-weight: 700;
    .content
      padding: 15px;
      .text
        margin: 0 0 10px;
        white-space: pre-wrap;
      .img
        display: block;
        width: 200px;
        height: 200px;
</style>
