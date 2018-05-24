<template>
  <div id="ace-editor">

  </div>
</template>

<script>

  import ace from 'brace';
  import 'brace/mode/c_cpp';
  import 'brace/theme/xcode';

  export default {
    props: {
      isReadOnly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        content: `#include <iostream>\nusing namespace std;\n\nint main()\n{\n    return 0;\n}`,
      };
    },
    mounted() {
      this.$nextTick(() => {
        //初始化并渲染编辑器
        this.editor = ace.edit('ace-editor');

        //设置语法提示为c/cpp
        this.editor.getSession().setMode('ace/mode/c_cpp');

        //设置主题
        this.editor.setTheme('ace/theme/xcode');

        //设置编辑器值
        this.editor.setValue(this.content);

        //设置默认光标在第一行
        this.editor.gotoLine(1);

        //如果已经被批阅，则设置为只读
        this.editor.setReadOnly(this.isReadOnly);
      });
    },
    watch: {
      isReadOnly(newVal) {
        this.editor.setReadOnly(newVal);
      }
    }
  }
</script>

<style scoped lang="stylus">
  #ace-editor
    height: 112px;
    margin-top: 30px;
    margin-bottom: 30px;
    position: relative;
    min-height: 300px;
    border-radius: 4px;
    border: 2px solid rgb(224, 224, 224);
</style>
