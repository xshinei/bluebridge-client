<template>

  <div class="form-item">
    <span class="form-label">密码确认</span>
    <input class="input-text"
           type="password"
           placeholder="请再次输入你的密码!"
           :class="{'input-err': hasErr}"
           @focus="handleFocus"
           @blur="handleBlur"
           v-model="val">
    <div v-if="hasFocus" class="form-msg">
      <i class="icon icon-warn fa fa-exclamation-circle" aria-hidden="true"></i>
      <span class="text">请再次输入你的密码!</span>
    </div>
    <div v-else-if="!hasFocus && hasErr" class="form-msg">
      <i class="icon icon-err fa fa-times-circle" aria-hidden="true"></i>
      <span class="text">两次密码输入不一致</span>
    </div>
    <div v-else-if="hasFinish" class="form-msg">
      <i class="icon icon-success fa fa-check-circle" aria-hidden="true"></i>
    </div>
  </div>

</template>

<script>

  export default {
    props: {
      password: {
        type: String,
        require: true
      }
    },
    data() {
      return {
        val: '',
        hasFocus: false,
        hasErr: false
      };
    },
    computed: {
      hasFinish() {
        return this.val !== '' && !this.hasFocus && !this.hasErr;
      }
    },
    methods: {
      handleFocus() {
        this.hasFocus = true;
      },
      async handleBlur() {
        this.hasFocus = false;

        if (this.password !== '' && this.val !== '') {
          if (this.password !== this.val) {
            this.hasErr = true;

            return;
          }
        }

        this.hasErr = false;
      }
    },
    watch: {
      hasFinish(newVal) {
        this.$emit('update:finish', newVal);
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/register-form.styl';
</style>
