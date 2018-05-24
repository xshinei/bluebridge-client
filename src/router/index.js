import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import LocalStorage from '../api/local-storage';

import VLayout from '../base/vLayout';
import VLogin from '../components/vLogin';
import VForget from '../components/vForget';
import VRegister from '../components/vRegister';
import VRegisterSlider from '../components/vRegisterSlider';
import VRegisterAccount from '../components/vRegisterAccount';
import VRegisterInformation from '../components/vRegisterInformation';
import VRegisterSuccess from '../components/vRegisterSuccess';
import VEdit from '../components/vEdit';
import VEditPassword from '../components/vEditPassword';
import VEditAvatar from '../components/vEditAvatar';
import VEditInformation from '../components/vEditInformation';
import VEditSuccess from '../components/vEditSuccess';
import VProblemType from '../components/vProblemType';
import VProblemList from '../components/vProblemList';
import VProblemContent from '../components/vProblemContent';
import VSubmissionList from '../components/vSubmissionList';
import VError from '../components/vError';

Vue.use(Router);

const router =  new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path: '/',
      name: '',
      component: VLogin,
    },
    {
      path: '/forget',
      name: '',
      component: VForget
    },
    {
      path: '/register',
      name: '',
      component: VRegister,
      children: [
        {
          path: 'validate',
          name: '',
          component: VRegisterSlider,
        },
        {
          path: 'account',
          name: '',
          component: VRegisterAccount
        },
        {
          path: 'information',
          name: '',
          component: VRegisterInformation
        },
        {
          path: 'success',
          name: '',
          component: VRegisterSuccess
        }
      ]
    },
    {
      path: '/main',
      name: '',
      meta: {
        requireLogin: true
      },
      component: VLayout,
      children: [
        {
          path: 'edit',
          name: '',
          component: VEdit,
          children: [
            {
              path: 'password',
              name: '',
              component: VEditPassword
            },
            {
              path: 'avatar',
              name: '',
              component: VEditAvatar
            },
            {
              path: 'information',
              name: '',
              component: VEditInformation
            },
            {
              path: 'success',
              name: '',
              component: VEditSuccess
            }
          ]
        },
        {
          path: 'problemType',
          name: '',
          meta: {
            requireLogin: true
          },
          component: VProblemType
        },
        {
          path: 'problemList/:type',
          name: '',
          meta: {
            requireLogin: true
          },
          component: VProblemList,
          props: true
        },
        {
          path: 'problemContent/:problemId',
          name: '',
          meta: {
            requireLogin: true
          },
          component: VProblemContent,
          props: true
        },
        {
          path: 'submission',
          name: '',
          meta: {
            requireLogin: true
          },
          component: VSubmissionList
        }
      ]
    },
    {
      path: '/error',
      name: '',
      component: VError
    },
    {
      path: '*',
      redirect: '/error',
      hidden: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta.requireLogin) {
    if(store.getters.student.Id && LocalStorage.getItem('token')) {
      next();
    }
    else {
      alert('信息过期，请重新登录!');
      next({
        path: '/',
        query: {redirect: to.fullPath}
      });
    }
  }
  else {
    next();
  }
});


export default router;
