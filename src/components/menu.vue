<template>
  <div class="menu">
    <div class="smallmenu">
      <div class="contentheight">
        <div class="logo">LOGO</div>
        <el-row class="tac">
          <el-col>
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m2-2.png" alt=""></i>
                  <i><img class="menu-icon menu-icon-show" src="../assets/nine/m2-1.png" alt=""></i>
                  <span>投顾管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="clickJump('/ninehome/commission')">佣金方案配置</el-menu-item>
                  <el-menu-item index="1-2" @click="clickJump('/ninehome/financing')">融资方案配置</el-menu-item>
                  <el-menu-item index="1-3" @click="clickJump('/ninehome/blacklist')">黑名单配置</el-menu-item>
                  <el-menu-item index="1-4" @click="clickJump('/ninehome/other')">其他配置</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m3-2.png" alt=""></i>
                  <i><img class="menu-icon menu-icon-show" src="../assets/nine/m3-1.png" alt=""></i>
                  <span>代理商管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="clickJump('/ninehome/agents')">代理商列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m4-2.png" alt=""></i>
                  <i><img class="menu-icon menu-icon-show" src="../assets/nine/m4-1.png" alt=""></i>
                  <span>资产管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1" @click="clickJump('/ninehome/assets')">资产管理</el-menu-item>
                  <el-menu-item index="4-2" @click="clickJump('/ninehome/account')">资金池管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <!-- <i class="el-icon-location"></i> -->
                  <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m6-2.png" alt=""></i>
                  <i><img class="menu-icon menu-icon-show" src="../assets/nine/m6-1.png" alt=""></i>
                  <span>风控管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1" @click="clickJump('/ninehome/account')">分账户监管</el-menu-item>
                  <el-menu-item index="3-2" @click="clickJump('/ninehome/stocks')">股票黑名单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m5-2.png" alt=""></i>
                  <i><img class="menu-icon menu-icon-show" src="../assets/nine/m5-1.png" alt=""></i>
                  <span>资金管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1" @click="clickJump('/ninehome/money')">资金信息</el-menu-item>
                  <el-menu-item index="5-2" @click="clickJump('/ninehome/topup')">充值审核</el-menu-item>
                  <el-menu-item index="5-3" @click="clickJump('/ninehome/withdrawal')">提现审核</el-menu-item>
                  <el-menu-item index="5-3" @click="clickJump('/ninehome/water')">资金流水</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "../eventBus.js";
import QRCode from "qrcodejs2"; // 引入qrcode
export default {
  data: function() {
    return {
      userName: "",
      RoleName: "",
      menu: "",
      barIndex: -1,
      bgIndex: 0,
      showBealIndex: 0,
      showBealIndex1: 0,
      menuHeight: "",
      navHeight: "",
      BorkerID: "",
      AdminID: "",
      showQrcode: false,
      InviteCode: ""
    };
  },
  created: function() {
    eventBus.$on("modifyUserName", newName => {
      this.userName = newName;
    });
  },
  watch: {},
  mounted: function() {
    this.listenResize();
    this.navHeight = $(".contentheight").height();
  },
  methods: {
    clickJump(where) {
      this.$router.push({
        path: where
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //监听窗口变化
    listenResize: function() {
      $(window).resize(function() {
        let height = $(window).height();
        $(".menu").css("height", height + "px");
        $(".smallmenu").css("height", height - 130 + "px");
      });
    },
    //监听展开后的导航来设置是否出现滚动条
    isScroll: function(top) {
      //获取展开后的导航高度
      setTimeout(() => {
        this.menuHeight = $(".menu").height();
        this.navHeight = $(".contentheight").height();
        if (this.navHeight > this.menuHeight - 130) {
          $(".smallmenu").css("overflow-y", "scroll");
          $(".smallmenu").css("height", this.menuHeight - 130 + "px");
          // $(".smallmenu").scrollTop(top)
        }
      });
    }
  }
};
</script>

<style>
.menu .el-col-24 {
  width: 101% !important;
}
.el-icon-arrow-down:before {
  content: " " !important;
  background-image: url("../assets/nine/arr_b.png");
  background-repeat: no-repeat;
  width: 10px;
  height: 6px;
  background-size: 10px 6px;
  display: block;
}
.el-submenu__icon-arrow {
  margin-top: -3px !important;
}
.el-submenu.is-active .el-submenu__title {
  color: #2662ee;
  background-color: #ecf5ff;
  border-right: 5px solid #2662ee;
}
.menu-icon-noshow {
  display: block;
}
.el-submenu.is-active .menu-icon-noshow {
  display: none;
}
.menu-icon-show {
  display: none;
}
.el-submenu.is-active .menu-icon-show {
  display: block;
}
</style>

<style scoped>
@import "../assets/css/menu.css";
.menu-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-top: 18px;
  margin-right: 10px;
}
.logo {
  width: 230px;
  height: 75px;
  border-bottom: 1px solid #ccc;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
  color: #2662ee;
}
</style>
