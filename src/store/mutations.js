import * as types from './mutation-types';
import LocalStorage from '../api/local-storage';

const mutations = {
  [types.SET_STUDENT] (state, student) {
    state.student = student;
    LocalStorage.setItem('student', student);
  },
  [types.SET_REGISTER_INFO] (state, info) {
    state.registerInfo = info;
  }
};

export default mutations;
