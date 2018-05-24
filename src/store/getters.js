export const student = state => {
  if(state.student.Id) {
    return state.student;
  }
  else {
    return JSON.parse(window.localStorage.getItem('student'));
  }
};

export const registerInfo = state => {
  return state.registerInfo;
};
