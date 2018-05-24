import axios from 'axios';
import {toFirstUpper} from '../api/util';

const config = {
  username: {
    regexp: /^[a-zA-Z]\w{5,12}$/,
    text: '只能以字母开头,包含字符 数字 下划线, 长度为5 - 12'
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
  constructor(teacher, tag, val) {
    this.teacher = teacher;
    this.tag = tag;
    this.val = val;
    this.defaultVal = teacher[toFirstUpper(tag)] || '';
    this.config = config[tag];
  }

  setVal(val) {
    this.val = val;
  }

  ['empty']() {
    if(this.val === '') {
      return Promise.reject('不能为空!')
    }

    return Promise.resolve();
  }

  ['format']() {
    if(!this.val.match(this.config.regexp)) {
      return Promise.reject(this.config.text);
    }

    return Promise.resolve();
  }

  async ['exist']() {
    if(this.val === this.defaultVal) {
      return Promise.reject('不能与初始值相同!');
    }

    const params = {
      key: toFirstUpper(this.tag),
      value: this.val
    };

    const result = await axios.post('/student/validate', params);
    const data = result.data;

    if(data.status === 0) {
      if(data.result !== '') {
        return Promise.resolve();
      }

      return Promise.reject('已经存在！')
    }
    else {
      throw new Error(data.msg);
    }
  }

  async ['initPassword']() {
    const params = {
      id: this.teacher.Id,
      password: this.val
    };

    const result = await axios.post('/student/initPassword', params);
    const data = result.data;

    if(data.status === 0) {
      if(data.result !== '') {
        return Promise.resolve();
      }

      return Promise.reject(data.msg);
    }
    else {
      throw new Error(data.msg);
    }
  }

}
