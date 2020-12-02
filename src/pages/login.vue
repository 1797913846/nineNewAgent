<!--网页-->
<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-position="left" label-width="80px" class="login-box">
      <div class="loginbox">
        <div class="logintop1">
          <div class="logintitle1">管理系统</div>
          <div class="logintitle2">AGENT BACK OFFICE MANAGEMENT SYSTEM</div>
        </div>
        <div style="display: none">
          <input type="text" id="username">
          <input type="password" id="password">
        </div>
        <div v-if="isLogin==true" class="bgbox">
          <div class="smallbg">
            <div class="msgbox">
              <span class="m1">
                <img src="../assets/nine/u1.png" alt="" class="tu">
                <div class="mt">account</div>
              </span>
              <input v-model="form.username" type="text" placeholder="请输入用户名">
            </div>
            <div class="msgbox">
              <span class="m1">
                <img src="../assets/nine/u2.png" alt="" class="tu">
                <div class="mt">password</div>
              </span>
              <input v-model="form.pwd" type="password" placeholder="请输入密码">
            </div>
            <div class="msgbox">
              <span class="m1">
                <img src="../assets/nine/u3.png" alt="" class="tu">
                <div class="mt">Verification</div>
              </span>
              <input v-model="form.code" placeholder="请输入验证码">
              <img class="code" :src="'http://47.102.151.13/tn/mgr-api/get-code?uuid='+num" @click="getCode()">
            </div>
            <!-- <div class="errorbox" v-if="errMsg">
              <img src="../assets/loginimg/error.png" alt="">
              <div>{{errMsg}}</div>
            </div> -->
            <div class="loginbtn" @click="login()">登 &nbsp;录</div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import eventBus from "../eventBus.js";
import md5 from "js-md5";
export default {
  data() {
    return {
      userName: "",
      form: {
        username: localStorage.getItem("remenberUsername") || "",
        pwd: "",
        code: "",
        url: "http://120.26.187.19:8081"
      },
      isLogin: true,
      errMsg: "",
      Code: "",
      BrokerID: "",
      token: "",
      who: "",
      app: "",
      appUrl: "",
      Expire_Day: "",
      num: 2345
    };
  },
  watch: {},
  created() {
    localStorage.clear();
    this.getCode();
    let that = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        that.login();
      }
    };
  },
  mounted: function() {
    this.listenResize();
    let height = $(window).height();
    $(".login-container").css("height", height + "px");
  },
  methods: {
    listenResize: function() {
      $(window).resize(function() {
        let height = $(window).height();
        $(".login-container").css("height", height + "px");
      });
    },
    getCode() {
      let out = Math.floor(Math.random() * 10000);
      console.log("我啊", out);
      this.num = out;
    },
    getMsg() {
      this.axios
        .get("/tn/mgr-api/account-info")
        .then(res => {
          console.log("login>>", res.data);
          if (res.data.code == 200) {
            let data = res.data.data;
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("level", data.level);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("loginName", data.loginName);
            localStorage.setItem("isAdminGroup", data.isAdminGroup);
            localStorage.setItem("defaultChildGroupId",data.defaultChildGroupId);
            localStorage.setItem("defaultChildCommissionCfgId",data.defaultChildCommissionCfgId);
          } else {
          }
        })
        .catch(() => {});
    },
    login() {
      this.axios
        .post("/tn/mgr-api/login", {
          username: this.form.username,
          password: md5(this.form.pwd),
          code: this.form.code,
          uuid: this.num
        })
        .then(res => {
          console.log("login>>", res.data);
          if (res.data.code == 200) {
            let Authorization = res.data.data.token;
            localStorage.setItem("Authorization", Authorization);
            let toVerifyCode = res.data.data.toVerifyCode;
            this.getMsg();
            let that = this;
            setTimeout(function() {
              that.$router.push({
                path: "/ninehome/commission"
              });
            }, 800);
          } else {
            this.errMsg = res.data.info;
            this.getCode();
            this.$alert(this.errMsg, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.login-box .el-form-item {
  width: 380px;
  height: 40px;
  text-align: center;
}
.login-box .el-form-item__label {
  color: #ccc;
  font-size: 14px;
}
.login-box .el-form-item__content .el-input__inner {
  width: 300px;
}
.login-container .el-select .el-input__inner {
  background-color: transparent;
}
</style>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
}
.login-box {
  overflow: hidden;
  background-color: #2562ee;
}
.loginbox {
  overflow: hidden;
}
.loginbox .logintop1 {
  width: 1200px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 150px);
  height: 247px;
}
.logintitle1 {
  color: #fff;
  font-size: 56px;
  margin-bottom: 17px;
}
.logintitle2 {
  font-size: 20px;
  color: #fff;
}
.bgbox {
  background-image: url("../assets/nine/bgcolor.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  height: 450px;
  background-color: #fff;
  margin-top: 160px;
}
.smallbg {
  background-image: url("../assets/nine/smallbg.png");
  background-repeat: no-repeat;
  background-size: 100% 380px;
  width: 650px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-left: 200px;
  margin-top: 180px;
  overflow: hidden;
}
.loginbox .msgbox {
  height: 65px;
  box-sizing: border-box;
}
.loginbox .msgbox:first-child {
  margin-top: 130px;
}
.loginbox .msgbox .m1 {
  width: 66px;
  overflow: hidden;
  float: left;
  margin-left: 94px;
}
.loginbox .msgbox .m1 .mt {
  color: #44444f;
}
.loginbox .msgbox .tu {
  width: 20px;
  margin-bottom: 5px;
}
.loginbox .msgbox .code {
  margin-left: -140px;
  float: left;
}
.loginbox .msgbox input {
  float: left;
  width: 348px;
  height: 33px;
  margin-top: 10px;
  margin-left: 20px;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 14px;
  line-height: 33px;
  outline: none;
  border-bottom: 1px solid #ededed;
  color: #393747;
}
.loginbox .msgbox input::placeholder {
  color: #393747;
}
.loginbox .msgbox .el-select {
  float: left;
  width: 270px;
  height: 33px;
  margin-top: 5px;
  box-sizing: border-box;
  padding-left: 10px;
  background-color: #24272c;
  color: #ffffff;
  font-size: 12px;
  line-height: 33px;
  outline: none;
}
.loginbox .loginbtn {
  width: 466px;
  height: 60px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  box-sizing: border-box;
  line-height: 60px;
  cursor: pointer;
  background-color: #2562ee;
  border-radius: 10px;
  margin-left: 80px;
  margin-top: 20px;
}
.login-container .shezhi {
  width: 33px;
  height: 32px;
  position: absolute;
  right: 80px;
  top: 40px;
  cursor: pointer;
}
.errorbox {
  height: 43px;
  overflow: hidden;
  box-sizing: border-box;
}
.errorbox img {
  width: 13px;
  height: 13px;
  margin-top: 15px;
  float: left;
}
.errorbox div {
  float: left;
  line-height: 43px;
  font-size: 12px;
  margin-left: 10px;
  color: #fff;
}
</style>