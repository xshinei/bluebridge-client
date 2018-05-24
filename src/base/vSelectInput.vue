<template>
  <div class="select-wrapper" ref="select">
    <div class="input-wrapper" tabindex="-1" @focus="handleFocusInput" @blur="handleBlurInput">
      <span class="placeholder" v-if="!hasSelect">{{defaultValue}}</span>
      <span class="value" v-else>{{selectedValue}}</span>

      <i class="icon fa fa-caret-down"
         aria-hidden="true"
         ref="arrow"></i>
    </div>

    <transition name="show">
      <div class="list-wrapper" v-show="toggleArrow">
        <ul class="list">
          <li v-for="item in valueList"
              class="item"
              :class="{selected: selectedValue === item}"
              @click="handleSelectValue(item)">
            {{item}}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      valueList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      defaultValue: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        toggleArrow: false,
        hasSelect: false,
        selectedValue: ''
      };
    },
    created() {

    },
    methods: {
      /**
       *  点击下拉框
       */
      handleFocusInput() {
        //显示or隐藏下拉列表
        this.toggleArrow = !this.toggleArrow;

        this.rotateArrow();
      },
      handleBlurInput() {
        this.toggleArrow = false;
        this.rotateArrow();
      },
      /**
       *  点击选择下拉列表的某个值
       */
      handleSelectValue(val) {
        this.hasSelect = true;
        this.selectedValue = val;
      },
      /**
       *  旋转角标
       */
      rotateArrow() {
        try {
          if (!this.toggleArrow) {
            this.$refs.arrow.style.transform = '';
          }
          else {
            this.$refs.arrow.style.transform = 'rotate(180deg)';
          }
        }
        catch (err) {
          console.log(err.message);
        }
      }
    },
    watch: {
      selectedValue(newVal) {
        //下拉框值发生改变，触发回调
        this.$emit('change', newVal);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .select-wrapper
    display: inline-block;
    width: 200px;
    color: #495060;
    .input-wrapper
      position: relative;
      height: 30px;
      line-height: 30px;
      border: 1px solid #dddee1;
      border-radius: 4px;
      background-color: #fff;
      outline none;
      &:hover
        border-color: #57a3f3;
        cursor: pointer;
      .placeholder, .value
        display: block;
        height: 30px;
        line-height: 30px;
        padding: 0 24px 0 8px;
        font-size: 12px;
      .placeholder
        color: #bbbec4;
      .icon
        position: absolute;
        top: 50%;
        right: 8px;
        line-height: 1;
        margin-top: -7px;
        font-size: 14px;
        color: #80848f;
        transition: all .4s ease-in-out;
    .list-wrapper
      position: absolute;
      z-index: 999;
      width: 200px;
      max-height: 200px;
      margin: 5px 0;
      padding: 5px 0;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      opacity: 1;
      overflow-y: auto;
      &.show-enter-active, &.show-leave-active
        transition: opacity .5s;
      &.show-enter, &.show-leave-to
        opacity: 0;
      .list
        list-style-type: none;
        .item
          padding: 7px 16px;
          font-size: 12px;
          color: #495060;
          white-space: nowrap;
          cursor: pointer;
          transition: background .2s ease-in-out;
          &:hover
            background-color: #f3f3f3;
          &.selected
            color: #fff;
            background: rgba(45, 140, 240, .9);
</style>
