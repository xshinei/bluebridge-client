import axios from 'axios';
import {toFirstUpper} from '../api/util';

let config = {
  username: {
    regexp: /^[a-zA-Z]\w{5,12}$/,
    text: '只能以字母开头,包含字符 数字 下划线, 长度为5 - 12',
  },
  password: {
    regexp: /^(\w){6,15}$/,
    text: '6-15个字母、数字、下划线'
  },
  email: {
    regexp: /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/,
    text: '邮箱格式不正确'
  },
  name: {
    regexp:  /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/ ,
    text: '2-4个中文'
  }
};

export default class {
  constructor(user, type) {
    this.user = user;
    this.type = type;
    this.val = '';
  }

  setVal(val) {
    this.val = val;
  }

  empty() {
    if(this.val === '') {
      return Promise.reject('不能为空!')
    }

    return Promise.resolve();
  }

  format() {
    const conf = config[this.type];

    if(!this.val.match(conf.regexp)) {
      return Promise.reject(conf.text);
    }

    return Promise.resolve();
  }

  async exist() {
    let res = await axios.post(`/${this.user}/validate`, {
      key: toFirstUpper(this.type),
      value: this.val
    });

    if(res.data.status === 0) {
      if(res.data.result) {
        return Promise.reject('已经存在！')
      }

      return Promise.resolve();
    }
  }
};
