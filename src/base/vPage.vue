
<script>
  export default {
    props: {
      pageSizeProp: {
        type: Number,
        required: true
      },
      pageNumProp: {
        type: Number,
        required: true
      },
      totalProp: {
        type: Number,
        required: true
      }
    },
    render(createElement) {
      return createElement('ul', this.pageList.map((item) => {
        if(typeof item === 'number') {
          return createElement('li', {
            'class': {
              'active': this.pageNum === item
            },
            on: {
              click: () => {
                if(this.pageNum !== item) {
                  this.pageNum = item;
                  this.$emit('change', item);
                }
              }
            }
          }, item);
        }
        else {
          if(item === 'jump-prev') {
            return createElement('li', {
              'class': {
                'jump-prev': true
              },
              on: {
                mouseover: (event) => {
                  this.handleOverJump(event, 'left');
                },
                mouseout: event => {
                  this.handleOutJump(event, 'left');
                },
                click: () => {
                  this.pageNum = this.pageNum - 5;
                }
              }
            }, [createElement('i', {
              'class': {
                icon: true,
                fa: true,
                'fa-ellipsis-h': true
              },
              attrs: {
                'aria-hidden': 'true'
              }
            })]);
          }
          else if(item === 'jump-next') {
            return createElement('li', {
              'class': {
                'jump-next': true
              },
              on: {
                mouseover: (event) => {
                  this.handleOverJump(event, 'right');
                },
                mouseout: event => {
                  this.handleOutJump(event, 'right');
                },
                click: () => {
                  this.pageNum = this.pageNum + 5;
                }
              }
            }, [createElement('i', {
              'class': {
                icon: true,
                fa: true,
                'fa-ellipsis-h': true
              },
              attrs: {
                'aria-hidden': 'true'
              }
            })]);
          }
          else if(item === 'prev') {
            return createElement('li', {
              'class': {
                prev: true,
                disabled: this.pageNum <= 1
              },
              on: {
                click: () => {
                  if(this.pageNum > 1) {
                    this.pageNum--;
                    this.$emit('change', this.pageNum);
                  }
                }
              }
            }, [createElement('i', {
              'class': {
                icon: true,
                fa: true,
                'fa-angle-left': true
              }
            })]);
          }
          else if(item === 'next') {
            const pageCount = Math.ceil(this.total / this.pageSize);

            return createElement('li', {
              'class': {
                prev: true,
                disabled: this.pageNum >= pageCount
              },
              on: {
                click: () => {
                  if(this.pageNum < pageCount) {
                    this.pageNum++;
                    this.$emit('change', this.pageNum);
                  }
                }
              }
            }, [createElement('i', {
              'class': {
                icon: true,
                fa: true,
                'fa-angle-right': true
              }
            })]);
          }
        }
      }));
    },
    data() {
      return {
        pageList: [],
        pageSize: this.pageSizeProp,
        pageNum: this.pageNumProp,
        total: this.totalProp
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      handleOverJump(event, direction) {
        let ele = event.target;

        if(ele.nodeName.toLowerCase() === 'li') {
          ele = ele.firstChild;
        }

        const cls = `fa-angle-double-${direction}`;

        ele.classList.remove('fa-ellipsis-h');
        ele.classList.add(cls);
      },
      handleOutJump(event, direction) {
        let ele = event.target;

        if(ele.nodeName.toLowerCase() === 'li') {
          ele = ele.firstChild;
        }

        const cls = `fa-angle-double-${direction}`;

        ele.classList.remove(cls);
        ele.classList.add('fa-ellipsis-h');
      },
      init() {
        const pageCount = Math.ceil(this.total / this.pageSize);
        const minPage = 1;
        const maxPage = pageCount;

        let left = Math.max(this.pageNum - minPage, 0);
        let right = Math.max(maxPage - this.pageNum, 0);

        let list = [];

        if(left >= 4) {
          list.push(minPage, 'jump-prev');
          list.push(this.pageNum - 2);
          list.push(this.pageNum - 1);
        }
        else {
          while(left) {
            list.push(this.pageNum - left);
            left--;
          }
        }

        list.push(this.pageNum);

        if(right >= 4) {
          list.push(this.pageNum + 1);
          list.push(this.pageNum + 2);
          list.push('jump-next', maxPage);
        }
        else {
          for(let i = 1; i <= right; i++) {
            list.push(this.pageNum + i);
          }
        }

        list.unshift('prev');
        list.push('next');

        this.pageList = list;
      }
    },
    watch: {
      totalProp(newVal) {
        this.total = newVal;
        this.init();
      }
    }
  }
</script>

<style scoped lang="stylus">
  /*.page-wrapper*/
  /*padding: 0 20px;*/
  ul
    max-width: 380px;
    margin: 0 auto;
    li
      display: inline-block;
      vertical-align: middle;
      min-width: 32px;
      height: 32px;
      line-height: 30px;
      margin: 0 4px;
      list-style: none;
      text-align: center;
      cursor: pointer;
      color: #666;
      font-family: Arial;
      border: 1px solid #dddee1;
      border-radius: 4px;
      font-size: 14px;
      transition: all .2s ease-in-out;
      &:hover
        border-color: #2d8cf0;
        color: #2d8cf0;
      &.prev
        margin-right: 4px;
      &.next
        margin-left: 4px;
      &.active
        background-color: #2d8cf0;
        border-color: #2d8cf0;
        color: #fff;
        &:hover
          border-color: #2d8cf0;
          color: #fff;
      &.disabled
        cursor: not-allowed;
        &:hover
          border-color: #dddee1;
          color: #666;
      .icon
        line-height: 32px;
        -webkit-font-smoothing: antialiased;
        &.fa-ellipsis-h
          letter-spacing: 1px;
          color: #ccc;
          text-align: center;
</style>
