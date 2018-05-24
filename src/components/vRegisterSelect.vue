<template>
    <div class="form-item">
      <span class="form-label">{{label}}</span>
      <div class="select-content" @click="handleShow">
        <span class="text">{{val}}</span>
        <i class="icon fa fa-caret-down" aria-hidden="true"></i>
        <div class="select-list" v-show="show">
          <ul>
            <li v-for="item in list"
                @click="handleSelect(item)"
                :class="{'selected': item === val}"
                class="select-item">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Array,
        default: () => {
          return [];
        }
      },
      label: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        val: this.list[0],
        show: false
      };
    },
    created() {
      window.addEventListener('click', () => {
        this.show = false;
      });
    },
    methods: {
      handleShow(event) {
        this.show = !this.show;

        event.stopPropagation();
      },
      handleSelect(val) {
        this.val = val;
      }
    },
    watch: {
      val(newVal) {
        this.$emit('update:value', newVal);
      },
      list(newVal) {
        this.val = newVal[0];
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/css/register-form.styl';

  .select-content
    position: relative;
    width: 150px;
    height: 35px;
    padding-left: 10px;
    border: 1px solid #ccc;
    font-size: 14px;
    font-weight: 700;
    outline: 0;
    cursor: pointer;
    /*overflow: hidden;*/
    background-color: #fff;
    .span
      width: 85px;
      height: 35px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    .icon
      position: absolute;
      top: 12px;
      right: 8px;
      width: 10px;
      height: 5px;
    .select-list
      position: absolute;
      z-index: 999;
      top: 36px;
      left: -1px;
      width: 160px;
      max-height: 100px;
      border: 1px solid #dedede;
      background-color: #fff;
      overflow-y: scroll;
      .select-item
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 12px;
        padding-left: 10px;
        cursor: pointer;
        &:hover
          background-color: rgba(255, 51, 0, .3);
        &.selected
          color: #fff;
          background-color: #f30;
</style>
