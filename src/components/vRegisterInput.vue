<template>
  <div class="form-item">
    <span class="form-label">{{label}}</span>
    <input class="input-text"
           :type="type"
           :placeholder="placeholder"
           :class="{'input-err': hasErr}"
           @focus="handleFocus"
           @blur="handleBlur"
           v-model="val">
    <div v-if="hasFocus" class="form-msg">
      <i class="icon icon-warn fa fa-exclamation-circle" aria-hidden="true"></i>
      <span class="text">{{warnMsg}}</span>
    </div>
    <div v-else-if="!hasFocus && hasErr" class="form-msg">
      <i class="icon icon-err fa fa-times-circle" aria-hidden="true"></i>
      <span class="text">{{errMsg}}</span>
    </div>
    <div v-else-if="hasFinish" class="form-msg">
      <i class="icon icon-success fa fa-check-circle" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>

  import Validate from '../api/register-form';

  export default {
    name: "v-register-input",
    props: {
      empty: {
        type: Boolean,
        default: true
      },
      format: {
        type: Boolean,
        default: true
      },
      exist: {
        type: Boolean,
        default: false
      },
      user: {
        type: String,
        default: ''
      },
      tag: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        require: true
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        require: true
      },
      warnMsg: {
        type: String,
        require: true
      },
    },
    data() {
      return {
        val: '',
        hasFocus: false,
        hasErr: false,
        errMsg: ''
      };
    },
    computed: {
      hasFinish() {
        return this.val !== '' && !this.hasFocus && !this.hasErr;
      }
    },
    created() {
      this.validate = new Validate(this.user, this.tag);
    },
    methods: {
      handleFocus() {
        this.hasFocus = true;
      },
      async handleBlur() {
        this.hasFocus = false;

        try {
          this.empty && await this.validate.empty();
          this.format && await this.validate.format();
          this.exist && await this.validate.exist();
        }
        catch (err) {
          this.errMsg = err;
          this.hasErr = true;

          return;
        }

        this.hasErr = false;
      }
    },
    watch: {
      val(newVal) {
        this.validate.setVal(newVal);
        this.$emit('update:value', newVal);
      },
      hasFinish(newVal) {
        this.$emit('update:finish', newVal);
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/register-form.styl';
</style>
