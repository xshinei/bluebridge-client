<template>
  <div class="edit-success-wrapper">
    <header>修改成功</header>
    <section>
      <div class="content">
        <router-link to="/main">点此继续</router-link>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "v-edit-success"
  }
</script>

<style scoped lang="stylus">
  .edit-success-wrapper
    width: 500px;
    border: 1px solid #ebeff6;
    border-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    overflow: hidden;
    header
      padding: 10px 15px;
      border-bottom: 1px solid #ebeff6;
      border-radius: 2px 2px 0 0;
      text-align: center;
      background-color: #92cf5c;
      color: #fbfdfa;
    section
      margin-top: 10px;
      margin-left: 10px;
      .content
        padding: 10px 20px;
        border-left: 5px solid #eeeeee;
        margin: 0 0 20px;
</style>
