<template>
  <div class="upload-wrapper">

    <div class="show upload" v-show="hasSelect">
      <img ref="image-container">
      <div class="cover" ref="cover">
        <i class="icon fa fa-trash-o" aria-hidden="true" @click="handleDeleteImg"></i>
      </div>
    </div>

    <div class="operate upload"  v-show="!hasSelect" @click="handleSelectFile">
      <input type="file"
             @change="handleChangeFile"
             v-show="false"
             ref="file-input">
      <i class="icon fa fa-camera" aria-hidden="true"></i>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: Array,
        default: () => {
          return ['jpg', 'jpeg', 'png'];
        }
      },
      maxSize: {
        type: Number,
        default: 5
      }
    },
    data() {
      return {
        hasSelect: false,
        val: {}
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.imageContainer = this.$refs['image-container'];
        this.fileInput = this.$refs['file-input'];
      });
    },
    methods: {
      /**
       *  file输入框值改变
       */
      handleChangeFile() {
        const fileReader = new FileReader();
        const file = this.fileInput.files[0];
        const imageContainer = this.imageContainer;

        //验证文件的类型和大小
        if(this.checkFileType(file) && this.checkFileSize(file)) {
          this.hasSelect = true;
          this.val = file;

          fileReader.onload = function () {
            //预览图片
            imageContainer.src = this.result;
          };

          //base64格式读取文件
          fileReader.readAsDataURL(file);
        }

      },
      /**
       *  点击file输入框
       */
      handleSelectFile() {
        this.fileInput.click();
      },
      /**
       *  删除预览图片
       */
      handleDeleteImg() {
        this.imageContainer.src = '';
        this.hasSelect = false;
        this.val = {};

        this.fileInput.value = '';
      },
      /**
       *  验证文件类型
       */
      checkFileType(file) {
        for(let i = 0; i < this.type.length; i++) {
          if(file.type.split('/')[1] === this.type[i]) {
            return true;
          }
        }

        //验证失败，触发error回调
        this.$emit('error', '请选择正确的图片格式!');

        return false;
      },
      /**
       *  验证文件大小
       */
      checkFileSize(file) {
        //转换单位为M
        const fileSize = file.size / (1024 * 1024);

        if(fileSize <= this.maxSize) {
          return true;
        }
        else {
          //验证失败，触发error回调
          this.$emit('error', `图片最大限制${this.maxSize}M!`);
        }

        return false;
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
  .upload-wrapper
    .upload
      position: relative;
      display: inline-block;
      width: 100px;
      height: 100px;
      border: 1px dashed #dddee1;
      background: #fff;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      overflow: hidden;
    .show
      border: 1px solid #dddee1 !important;
      &:hover .cover
        display: block;
      .cover
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
        .icon
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 16px;
          color: #fff;
          cursor: pointer;
    .operate
      .icon
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        cursor: pointer;
    img
      width: 100%;
      height: 100%;

</style>
