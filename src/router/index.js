import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '@/pages/login'
//投顾管理》佣金方案配置
import ninehomeCommission from '@/pages/ninehome/commission/commission'
import ninehomeFinancing from '@/pages/ninehome/financing/financing'
import ninehomeBlacklist from '@/pages/ninehome/blacklist/blacklist'
import ninehomeOther from '@/pages/ninehome/other/other'
import ninehomeAgents from '@/pages/ninehome/agents/agents'
import ninehomeAssets from '@/pages/ninehome/assets/assets'
import ninehomePool from '@/pages/ninehome/pool/pool'
import ninehomeAccount from '@/pages/ninehome/account/account'
import ninehomeStocks from '@/pages/ninehome/stocks/stocks'
import ninehomeMoney from '@/pages/ninehome/money/money'
import ninehomeTopup from '@/pages/ninehome/topup/topup'
import ninehomeWithdrawal from '@/pages/ninehome/withdrawal/withdrawal'
import ninehomeWater from '@/pages/ninehome/water/water'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: login
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: login
    },
    {
      path: '/ninehome/commission',
      meta: {
        title: '佣金方案配置',
        requireAuth: true
      },
      component: ninehomeCommission
    },
    {
      path: '/ninehome/financing',
      meta: {
        title: '融资方案配置',
        requireAuth: true
      },
      component: ninehomeFinancing
    },
    {
      path: '/ninehome/blacklist',
      meta: {
        title: '黑名单配置',
        requireAuth: true
      },
      component: ninehomeBlacklist
    },
    {
      path: '/ninehome/other',
      meta: {
        title: '其他配置',
        requireAuth: true
      },
      component: ninehomeOther
    },
    {
      path: '/ninehome/agents',
      meta: {
        title: '代理商列表',
        requireAuth: true
      },
      component: ninehomeAgents
    },
    {
      path: '/ninehome/assets',
      meta: {
        title: '资产管理',
        requireAuth: true
      },
      component: ninehomeAssets
    },
    {
      path: '/ninehome/pool',
      meta: {
        title: '资金池管理',
        requireAuth: true
      },
      component: ninehomePool
    },
    {
      path: '/ninehome/account',
      meta: {
        title: '分账户监管',
        requireAuth: true
      },
      component: ninehomeAccount
    },
    {
      path: '/ninehome/stocks',
      meta: {
        title: '股票黑名单',
        requireAuth: true
      },
      component: ninehomeStocks
    },
    {
      path: '/ninehome/money',
      meta: {
        title: '资金信息',
        requireAuth: true
      },
      component: ninehomeMoney
    },
    {
      path: '/ninehome/topup',
      meta: {
        title: '充值审核',
        requireAuth: true
      },
      component: ninehomeTopup
    },
    {
      path: '/ninehome/withdrawal',
      meta: {
        title: '提现审核',
        requireAuth: true
      },
      component: ninehomeWithdrawal
    },
    {
      path: '/ninehome/water',
      meta: {
        title: '资金流水',
        requireAuth: true
      },
      component: ninehomeWater
    },
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  window.scrollTo(0, 0);
  var token = localStorage.getItem("Authorization");
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    if (token) {
      if (to.path == '/login' || to.path == '/signup') {
        window.document.title = "首页";
        next({ path: '/' })
      } else {
        next();
      }
    } else {
      next();
    }
  }
})

export default router;