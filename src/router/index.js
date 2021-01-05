import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '@/pages/login'
//投顾管理》佣金方案配置
import ninehomeCommission from '@/pages/ninehome/commission/commission'
import ninehomeFinancing from '@/pages/ninehome/financing/financing'
import ninehomeBlacklist from '@/pages/ninehome/blacklist/blacklist'
import ninehomeOther from '@/pages/ninehome/other/other'
import ninehomeOther1 from '@/pages/ninehome/other1/other1'
import ninehomeOther2 from '@/pages/ninehome/other2/other2'
import ninehomeAgents from '@/pages/ninehome/agents/agents'
import ninehomeAssets from '@/pages/ninehome/assets/assets'
import ninehomePool from '@/pages/ninehome/pool/pool'
import ninehomeAccount from '@/pages/ninehome/account/account'
import ninehomeStocks from '@/pages/ninehome/stocks/stocks'
import ninehomeMoney from '@/pages/ninehome/money/money'
import ninehomeTopup from '@/pages/ninehome/topup/topup'
import ninehomeWithdrawal from '@/pages/ninehome/withdrawal/withdrawal'
import ninehomeWater from '@/pages/ninehome/water/water'
import ninehomeHuiyuan from '@/pages/ninehome/huiyuan/huiyuan'
import ninehomeHy1 from '@/pages/ninehome/hy1/hy1'
import ninehomeHy2 from '@/pages/ninehome/hy2/hy2'

import ninehomey1 from '@/pages/ninehome/yy/y1'
import ninehomey2 from '@/pages/ninehome/yy/y2'
import ninehomey3 from '@/pages/ninehome/yy/y3'
import ninehomey4 from '@/pages/ninehome/yy/y4'
import ninehomey5 from '@/pages/ninehome/yy/y5'
import ninehomey6 from '@/pages/ninehome/yy/y6'
import ninehomey7 from '@/pages/ninehome/yy/y7'
import ninehomey8 from '@/pages/ninehome/yy/y8'
import ninehomey9 from '@/pages/ninehome/yy/y9'
import ninehomey10 from '@/pages/ninehome/yy/y10'
import ninehomey11 from '@/pages/ninehome/yy/y11'
import ninehomey12 from '@/pages/ninehome/yy/y12'
import ninehomey13 from '@/pages/ninehome/yy/y13'

import ninehomel1 from '@/pages/ninehome/ll/l1'
import ninehomel2 from '@/pages/ninehome/ll/l2'
import ninehomel3 from '@/pages/ninehome/ll/l3'
import ninehomel4 from '@/pages/ninehome/ll/l4'
import ninehomel5 from '@/pages/ninehome/ll/l5'
import ninehomel6 from '@/pages/ninehome/ll/l6'
import ninehomel7 from '@/pages/ninehome/ll/l7'

import orderSttleInvite from '@/pages/ninehome/statistics/orderSttleInvite'
import inviteList from '@/pages/ninehome/statistics/inviteList'

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
        title: '资金方案配置',
        requireAuth: true
      },
      component: ninehomeFinancing
    },
    {
      path: '/ninehome/blacklist',
      meta: {
        title: '黑名单',
        requireAuth: true
      },
      component: ninehomeBlacklist
    },
    {
      path: '/ninehome/other',
      meta: {
        title: '风控设置',
        requireAuth: true
      },
      component: ninehomeOther
    },
    {
      path: '/ninehome/other1',
      meta: {
        title: '全局风控设置',
        requireAuth: true
      },
      component: ninehomeOther1
    },
    {
      path: '/ninehome/other2',
      meta: {
        title: '股票交易设置',
        requireAuth: true
      },
      component: ninehomeOther2
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
    {
      path: '/ninehome/huiyuan',
      meta: {
        title: '会员列表',
        requireAuth: true
      },
      component: ninehomeHuiyuan
    },
    {
      path: '/ninehome/hy1',
      meta: {
        title: '会员绑卡信息',
        requireAuth: true
      },
      component: ninehomeHy1
    },
    {
      path: '/ninehome/hy2',
      meta: {
        title: '等级列表',
        requireAuth: true
      },
      component: ninehomeHy2
    },
    {
      path: '/ninehome/y1',
      meta: {
        title: '持仓信息',
        requireAuth: true
      },
      component: ninehomey1
    },
    {
      path: '/ninehome/y2',
      meta: {
        title: '逐笔持仓',
        requireAuth: true
      },
      component: ninehomey2
    },
    {
      path: '/ninehome/y3',
      meta: {
        title: '委托信息',
        requireAuth: true
      },
      component: ninehomey3
    },
    {
      path: '/ninehome/y4',
      meta: {
        title: '成交信息',
        requireAuth: true
      },
      component: ninehomey4
    },
    {
      path: '/ninehome/y5',
      meta: {
        title: '逐笔平仓',
        requireAuth: true
      },
      component: ninehomey5
    },
    {
      path: '/ninehome/y6',
      meta: {
        title: '结算信息',
        requireAuth: true
      },
      component: ninehomey6
    },
    {
      path: '/ninehome/y7',
      meta: {
        title: '代理结算详情',
        requireAuth: true
      },
      component: ninehomey7
    },
    {
      path: '/ninehome/y8',
      meta: {
        title: '佣金统计',
        requireAuth: true
      },
      component: ninehomey8
    },
    {
      path: '/ninehome/y9',
      meta: {
        title: '分红送股信息',
        requireAuth: true
      },
      component: ninehomey9
    },
    {
      path: '/ninehome/y10',
      meta: {
        title: '持仓变动信息',
        requireAuth: true
      },
      component: ninehomey10
    },
    {
      path: '/ninehome/y11',
      meta: {
        title: '交割单信息',
        requireAuth: true
      },
      component: ninehomey11
    },
    {
      path: '/ninehome/y12',
      meta: {
        title: '逐笔持仓对比',
        requireAuth: true
      },
      component: ninehomey12
    },
    {
      path: '/ninehome/y13',
      meta: {
        title: '股票静态信息',
        requireAuth: true
      },
      component: ninehomey13
    },
    {
      path: '/ninehome/l1',
      meta: {
        title: '角色管理',
        requireAuth: true
      },
      component: ninehomel1
    },
    {
      path: '/ninehome/l2',
      meta: {
        title: '公告管理',
        requireAuth: true
      },
      component: ninehomel2
    },
    {
      path: '/ninehome/l3',
      meta: {
        title: '收付款管理',
        requireAuth: true
      },
      component: ninehomel3
    },
    {
      path: '/ninehome/l4',
      meta: {
        title: '券商管理',
        requireAuth: true
      },
      component: ninehomel4
    },
    {
      path: '/ninehome/l5',
      meta: {
        title: '手机号认证',
        requireAuth: true
      },
      component: ninehomel5
    },
    {
      path: '/ninehome/l6',
      meta: {
        title: '操作日志',
        requireAuth: true
      },
      component: ninehomel6
    },
    {
      path: '/ninehome/l7',
      meta: {
        title: '安全设置',
        requireAuth: true
      },
      component: ninehomel7
    }
    ,
    {
      path: '/orderSttleInvite',
      meta: {
        title: '会员直推统计',
        requireAuth: true
      },
      component: orderSttleInvite
    }
    ,
    {
      path: '/inviteList',
      meta: {
        title: '会员直推关系',
        requireAuth: true
      },
      component: inviteList
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = '管理系统';
  window.scrollTo(0, 0);
  var token = localStorage.getItem("managerAuthorization");
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