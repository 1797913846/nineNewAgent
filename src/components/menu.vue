<template>
  <div class="menu">
    <div class="logo">LOGO</div>
    <div class="smenu">
      <div class="boxmenu">
        <div class="smallmenu">
          <el-row class="tac">
            <el-col>
              <el-menu :default-active="whichIndex" class="el-menu-vertical-demo" :unique-opened="true" @open="handleOpen" @close="handleClose">
                <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.ext">
                  <template slot="title">
                    <!-- <i><img class="menu-icon menu-icon-noshow" :src="'../../static/nine/m'+item.ext+'-2.png'" alt=""></i> -->
                    <!-- <i><img class="menu-icon menu-icon-show" :src="'../../static/nine/m'+item.ext+'-1.png'" alt=""></i> -->
                    <i><img class="menu-icon menu-icon-noshow" :src="'../../manager/static/nine/m'+item.ext+'-2.png'" alt=""></i>
                    <i><img class="menu-icon menu-icon-show" :src="'../../manager/static/nine/m'+item.ext+'-1.png'" alt=""></i>
                    <span>{{item.name}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item v-for="(item1,index1) in item.children" :key="index1" :index="item.ext+'-'+(index1+1)" @click="clickJump(item1.url)">{{item1.name}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <!-- <el-submenu index="8">
                  <template slot="title">
                    <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m9-2.png" alt=""></i>
                    <i><img class="menu-icon menu-icon-show" src="../assets/nine/m9-1.png" alt=""></i>
                    <span>系统管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="8-2" @click="clickJump('/ninehome/l2')">公告管理</el-menu-item>
                    <el-menu-item index="8-3" @click="clickJump('/ninehome/l3')">收付款管理</el-menu-item>
                    <el-menu-item index="8-4" @click="clickJump('/ninehome/l4')">券商管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="9">
                  <template slot="title">
                    <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m10-2.png" alt=""></i>
                    <i><img class="menu-icon menu-icon-show" src="../assets/nine/m10-1.png" alt=""></i>
                    <span>安全管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="9-1" @click="clickJump('/ninehome/l1')">角色管理</el-menu-item>
                    <el-menu-item index="9-3" @click="clickJump('/ninehome/l6')">操作日志</el-menu-item>
                    <el-menu-item index="9-4" @click="clickJump('/ninehome/l7')">安全设置</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="1">
                  <template slot="title">
                    <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m2-2.png" alt=""></i>
                    <i><img class="menu-icon menu-icon-show" src="../assets/nine/m2-1.png" alt=""></i>
                    <span>投顾管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1" @click="clickJump('/ninehome/commission')">佣金方案配置</el-menu-item>
                    <el-menu-item index="1-2" @click="clickJump('/ninehome/financing')">资金方案配置</el-menu-item>
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
                    <el-menu-item index="4-2" @click="clickJump('/ninehome/pool')">资金池管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m6-2.png" alt=""></i>
                    <i><img class="menu-icon menu-icon-show" src="../assets/nine/m6-1.png" alt=""></i>
                    <span>风控管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1" @click="clickJump('/ninehome/account')">分账户监管</el-menu-item>
                    <el-menu-item index="3-2" @click="clickJump('/ninehome/blacklist')">黑名单</el-menu-item>
                    <el-menu-item index="3-4" @click="clickJump('/ninehome/other1')">全局风控设置</el-menu-item>
                    <el-menu-item index="3-5" @click="clickJump('/ninehome/other2')">股票交易设置</el-menu-item>
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
                    <el-menu-item index="5-4" @click="clickJump('/ninehome/water')">资金流水</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                  <template slot="title">
                    <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m7-2.png" alt=""></i>
                    <i><img class="menu-icon menu-icon-show" src="../assets/nine/m7-1.png" alt=""></i>
                    <span>账户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="6-1" @click="clickJump('/ninehome/huiyuan')">会员列表</el-menu-item>
                    <el-menu-item index="6-2" @click="clickJump('/ninehome/hy1')">会员绑卡信息</el-menu-item>
                    <el-menu-item index="6-3" @click="clickJump('/ninehome/hy2')">等级列表</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                  <template slot="title">
                    <i><img class="menu-icon menu-icon-noshow" src="../assets/nine/m8-2.png" alt=""></i>
                    <i><img class="menu-icon menu-icon-show" src="../assets/nine/m8-1.png" alt=""></i>
                    <span>交易管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="7-1" @click="clickJump('/ninehome/y1')">持仓信息</el-menu-item>
                    <el-menu-item index="7-2" @click="clickJump('/ninehome/y2')">逐笔持仓</el-menu-item>
                    <el-menu-item index="7-3" @click="clickJump('/ninehome/y3')">委托信息</el-menu-item>
                    <el-menu-item index="7-4" @click="clickJump('/ninehome/y4')">成交信息</el-menu-item>
                    <el-menu-item index="7-5" @click="clickJump('/ninehome/y5')">逐笔平仓</el-menu-item>
                    <el-menu-item index="7-6" @click="clickJump('/ninehome/y6')">结算信息</el-menu-item>
                    <el-menu-item index="7-7" @click="clickJump('/ninehome/y7')">代理结算详情</el-menu-item>
                    <el-menu-item index="7-8" @click="clickJump('/ninehome/y8')">佣金统计</el-menu-item>
                    <el-menu-item index="7-9" @click="clickJump('/ninehome/y9')">分红送股信息</el-menu-item>
                    <el-menu-item index="7-10" @click="clickJump('/ninehome/y10')">持仓变动信息</el-menu-item>
                    <el-menu-item index="7-11" @click="clickJump('/ninehome/y11')">交割单信息</el-menu-item>
                  </el-menu-item-group>
                </el-submenu> -->
              </el-menu>
            </el-col>
          </el-row>
        </div>
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
      InviteCode: "",
      where: "",
      whichIndex: "",
      menuList: ""
    };
  },
  created: function() {
    this.getMenuList();
    eventBus.$on("modifyUserName", newName => {
      this.userName = newName;
    });
    //获取当前路由
    this.where = this.$route.path;
    console.log("我是当前路由", this.where);
  },
  watch: {
    $route(to, from) {
      console.log("to", to, "from", from);
      // if (to.path == "/ninehome/money") {
      //   this.whichIndex = "5-1";
      // }
      // if (to.path == "/ninehome/y1") {
      //   this.whichIndex = "7-1";
      // }
    },
    where: {
      handler(newVal, oldVal) {
        switch (newVal) {
          case "/ninehome/commission":
            this.whichIndex = "1-1";
            break;
          case "/ninehome/financing":
            this.whichIndex = "1-2";
            break;
          case "/ninehome/agents":
            this.whichIndex = "2-1";
            break;
          case "/ninehome/assets":
            this.whichIndex = "3-1";
            break;
          case "/ninehome/pool":
            this.whichIndex = "3-2";
            break;
          case "/ninehome/account":
            this.whichIndex = "4-1";
            break;
          case "/ninehome/blacklist":
            this.whichIndex = "4-2";
            break;
          // case "/ninehome/other":
          //   this.whichIndex = "4-3";
          //   break;
          case "/ninehome/other1":
            this.whichIndex = "4-3";
            break;
          case "/ninehome/other2":
            this.whichIndex = "4-4";
            break;
          case "/ninehome/money":
            this.whichIndex = "5-4";
            break;
          case "/ninehome/topup":
            this.whichIndex = "5-1";
            break;
          case "/ninehome/withdrawal":
            this.whichIndex = "5-2";
            break;
          case "/ninehome/water":
            this.whichIndex = "5-3";
            break;
          case "/ninehome/huiyuan":
            this.whichIndex = "6-1";
            break;
          case "/ninehome/hy1":
            this.whichIndex = "6-2";
            break;
          case "/ninehome/hy2":
            this.whichIndex = "6-3";
            break;
          case "/ninehome/y1":
            this.whichIndex = "7-1";
            break;
          case "/ninehome/y2":
            this.whichIndex = "7-2";
            break;
          case "/ninehome/y3":
            this.whichIndex = "7-3";
            break;
          case "/ninehome/y4":
            this.whichIndex = "7-4";
            break;
          case "/ninehome/y5":
            this.whichIndex = "7-5";
            break;
          case "/ninehome/y6":
            this.whichIndex = "7-6";
            break;
          case "/ninehome/y7":
            this.whichIndex = "7-7";
            break;
          case "/ninehome/y8":
            this.whichIndex = "7-8";
            break;
          case "/ninehome/y9":
            this.whichIndex = "7-9";
            break;
          case "/ninehome/y10":
            this.whichIndex = "7-10";
            break;
          case "/ninehome/y11":
            this.whichIndex = "7-11";
            break;
          case "/ninehome/y12":
            this.whichIndex = "7-12";
            break;
          case "/ninehome/y13":
            this.whichIndex = "7-13";
            break;
          case "/ninehome/l1":
            this.whichIndex = "9-2";
            break;
          case "/ninehome/l6":
            this.whichIndex = "9-1";
            break;
          case "/ninehome/l7":
            this.whichIndex = "9-3";
            break;
          case "/ninehome/l2":
            this.whichIndex = "8-1";
            break;
          case "/ninehome/l3":
            this.whichIndex = "8-2";
            break;
          case "/ninehome/l4":
            this.whichIndex = "8-3";
            break;
        }
      },
      deep: true
    }
  },
  mounted: function() {
    // this.listenResize();
  },
  methods: {
    getMenuList() {
      this.axios
        .get("/tn/mgr-api/menu-list")
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.menuList = res.data.data;
          } else {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickJump(where) {
      this.$router.push({
        path: where
      });
      // if (where == "/ninehome/y3") {
      //   location.reload();
      // }
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
        $(".smallmenu").css("height", height + "px");
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

.el-submenu .el-menu-item {
  padding-left: 72px !important;
  height: 40px !important;
  line-height: 40px !important;
}
</style>

<style scoped>
@import "../assets/css/menu.css";
.menu-icon {
  width: 20px;
  height: 20px;
  float: left;
  margin-top: 18px;
  margin-right: 20px;
}
.logo {
  width: 191px;
  height: 76px;
  border-bottom: 1px solid #e9eff3;
  border-right: 1px solid #e9eff3;
  line-height: 75px;
  font-size: 20px;
  font-weight: bold;
  color: #2662ee;
  box-sizing: border-box;
  padding-left: 60px;
}
</style>
