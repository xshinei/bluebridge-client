<template>
  <div class="form-group">
    <label :class="{'error': hasErr}">{{label}}</label>
    <input :class="{'error': hasErr}" :type="type" v-model="val" @focus="handleFocusInput">
    <p class="error-msg" v-show="hasErr">{{errorMsg}}</p>
  </div>
</template>

<script>

  import { mapGetters } from 'vuex';
  import Validate from '../api/edit-form';

  export default {
    props: {
      label: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      validateList: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        val: '',
        hasErr: false,
        errorMsg: ''
      };
    },
    computed: {
      ...mapGetters([
        'student'
      ])
    },
    methods: {
      /**
       *  输入框验证
       */
      async validate() {
        try {
          //实例化验证对象
          const validate = new Validate(this.student, this.tag, this.val);

          //遍历验证数组，执行每个验证方法
          for(let item of this.validateList) {
            await validate[item]();
          }
        }
        catch (err) {
          if(err instanceof Error) {
            console.log(err.message);
            this.$router.push('/error');
          }
          else {
            //验证不通过
            this.hasErr = true;
            this.errorMsg = err;

            return Promise.reject(err);
          }
        }

        //验证通过
        return Promise.resolve();
      },
      /**
       *  输入框获得焦点事件回调
       */
      handleFocusInput() {
        this.hasErr = false;
        this.errMsg = '';
      }
    },
    watch: {
      val(newVal) {
        this.$emit('update:value', newVal);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .form-group
    margin-bottom: 15px;
    label
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: normal;
      &.error
        color: #a94442;
    input
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 34px;
      line-height: 1.42857143;
      padding: 6px 12px;
      border: 1px solid #ccc;
      font-size: 14px;
      border-radius: 2px;
      color: #555;
      background-color: #fff;
      transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
      &:focus
        border-color: #23b7e5;
        outline: none;
      &.error
        border-color: #a94442;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
      &.error::focus
        border-color: #843534;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;
    .error-msg
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: bold;
      color: #a94442;
</style>
