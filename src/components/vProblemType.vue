<template>
    <section class="type-wrapper">

      <article @click="handleChangeRouter('省赛')">
        <div class="icon-wrapper">
          <i class="icon fa fa-file" aria-hidden="true"></i>
        </div>
        <div class="text-wrapper">
          <span class="text">省赛</span>
        </div>
      </article>

      <div class="line"></div>

      <article @click="handleChangeRouter('决赛')">
        <div class="icon-wrapper">
          <i class="icon fa fa-file" aria-hidden="true"></i>
        </div>
        <div class="text-wrapper">
          <span class="text">决赛</span>
        </div>
      </article>

      <div class="line"></div>

      <article  @click="handleChangeRouter('校内选拔赛')">
        <div class="icon-wrapper">
          <i class="icon fa fa-file" aria-hidden="true"></i>
        </div>
        <div class="text-wrapper">
          <span class="text">校内选拔赛</span>
        </div>
      </article>

    </section>
</template>

<script>
    export default {
        methods: {
          handleChangeRouter(type) {
            this.$router.push({
              path: `/main/problemList/${type}`
            });
          }
        }
    }
</script>

<style scoped lang="stylus">
  .type-wrapper
    padding: 15px;
    border-radius: 2px;
    background-color: #fff;
    article
      margin-top: 10px;
      overflow: hidden;
      cursor: pointer;
      &:hover
        background-color: rgba(0, 0, 0, .1);
      .icon-wrapper
        position: relative;
        float: left;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: rgb(88, 102, 110);
        .icon
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2em;
          color: #fff;
      .text-wrapper
        float: left;
        line-height: 50px;
        font-size: 18px;
        color: #27c24c;
    .line
      height: 2px;
      margin: 10px 0 0;
      font-size: 0;
      overflow: hidden;
      background-color: transparent;
      border-width: 0;
      border-top: 1px solid #eaedef;
</style>
