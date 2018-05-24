<template>
  <form action="">
    <div class="form-group">
      <div class="form-item">
        <span class="form-label">验证</span>
        <div class="slider-wrapper">
          <div class="slider-content" ref="sliderContent">
            <span v-if="!finish" class="slider-btn"
                  ref="sliderBtn"
                  @mousedown="handleMousedown($event)">
              <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </span>
            <span v-else class="finish-tag">
              <i class="fa fa-check-circle" aria-hidden="true"></i>
            </span>
            <div class="slider-unmoved">
              <span v-if="!finish" class="unfinished-text">请按住滑块，拖动到最右边</span>
              <span v-else class="finish-text">验证通过</span>
            </div>
            <div class="slider-moved" ref="sliderMoved"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group">
        <v-register-button :finish="finish"
                           @clickButton="handleNext">
        </v-register-button>
    </div>
  </form>
</template>

<script>

  import VRegisterButton from './vRegisterButton';

  export default {
    data() {
      return {
        finish: false
      };
    },
    mounted() {
      this.sliderContent = this.$refs.sliderContent;
      this.sliderMoved = this.$refs.sliderMoved;
      this.sliderBtn = this.$refs.sliderBtn;

      window.onmousemove = (e) => {
        if (this.start && !this.end) {
          let offset = e.pageX - this.startX;

          if(offset >= 0) {
            let r1 = this.sliderMoved.offsetLeft + parseInt(getComputedStyle(this.sliderMoved).width);
            let r2 = parseInt(getComputedStyle(this.sliderContent).width) - parseInt(getComputedStyle(this.sliderBtn).width);

            this.sliderBtn.style.left = offset + 'px';
            this.sliderMoved.style.width = offset + 'px';

            if(r1 >= r2) {
              this.end = true;
              this.start = false;

              this.sliderBtn.style.left = r2 + 'px';
              this.sliderMoved.style.width = r2 + 'px';

              this.finish = true;
            }
          }
        }
      };

      window.onmouseup = () => {
        if(!this.end) {
          this.startX = 0;
          this.start = false;
          this.end = false;

          this.sliderBtn.style.left = '0px';
          this.sliderMoved.style.width = '0px';
        }
      };
    },
    methods: {
      handleMousedown(e) {
        this.start = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
      },
      handleNext() {
        this.$router.push('/register/account');
      }
    },
    components: {
      VRegisterButton
    }
  }
</script>

<style scoped lang="stylus">

    form
      .form-group
        padding: 10px 0;
        .form-item
          line-height: 36px;
          padding: 10px 0 10px 260px;
          .form-label
            float: left;
            width: 240px;
            height: 37px;
            line-height: 37px;
            margin-left: -260px;
            text-align: right;
          .slider-wrapper
            width: 300px;
            .slider-content
              position: relative;
              width: auto;
              height: 34px;
              background: #e8e8e8;
              .slider-btn
                position: absolute;
                z-index: 2;
                left: 0;
                width: 40px;
                height: 32px;
                line-height: 32px;
                border: 1px solid #ccc;
                color: #737383;
                font-size: 16px;
                font-style: normal;
                text-align: center;
                cursor: move;
                background: #fff;
              .finish-tag
                position: absolute;
                z-index: 2;
                top: 0;
                right: 0;
                width: 40px;
                height: 32px;
                line-height: 34px;
                border: 1px solid #ccc;
                font-size: 20px;
                background: #fff;
                color: #76c61d;
                text-align: center;
              .slider-unmoved
                position: absolute;
                z-index: 1;
                width: 100%;
                height: 100%;
                line-height: 34px;
                text-align: center;
                background: transparent;
                color: #9c9c9c;
                font-size: 12px;
                cursor: pointer;
                .unfinished-text
                  -webkit-user-select: none;
                .finish-text
                  width: 40px;
                  height: 32px;
                  line-height: 32px;
                  margin-left: -42px;
                  font-size: 12px;
                  color: #fff;
              .slider-moved
                position: absolute;
                width: 0;
                height: 100%;
                background: #7ac23c;

</style>
