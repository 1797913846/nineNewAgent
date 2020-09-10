<!--网页-->
<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-position="left" label-width="80px" class="login-box">
      <div class="loginbox">
        <div class="logintitle">代理商后台管理系统</div>
        <div style="display: none">
          <input type="text" id="username">
          <input type="password" id="password">
        </div>
        <div v-if="isLogin==true">
          <div class="msgbox">
            <img src="../assets/loginimg/username.png" alt="">
            <input v-model="form.username" type="text" placeholder="请输入用户名">
          </div>
          <div class="msgbox">
            <img src="../assets/loginimg/password.png" alt="" placeholder="请输入密码">
            <input v-model="form.pwd" type="password">
          </div>
          <div class="errorbox" v-if="errMsg">
            <img src="../assets/loginimg/error.png" alt="">
            <div>{{errMsg}}</div>
          </div>
          <div class="loginbtn">登录</div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import eventBus from "../eventBus.js";
export default {
  data() {
    return {
      form: {
        username: localStorage.getItem("remenberUsername") || "",
        pwd: "",
        url: "http://47.102.136.48"
      },
      isLogin: true,
      errMsg: "",
      Code: "",
      BrokerID: "",
      token: "",
      who: "",
      app: "",
      appUrl: "",
      Expire_Day: ""
    };
  },
  watch: {},
  created() {
    localStorage.clear();
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
    login() {
      this.axios
        .post("admin/auth/login", {
          Account: this.form.username,
          Password: this.form.pwd
        })
        .then(res => {
          console.log("login>>", res.data.data);
          if (res.data.code == 1) {
            // this.getDict();
            // this.getExchange();
            // this.getBroker();
            // this.getRisk();
            //console.log("大大"+menuPath)
            // this.$router.push({
            //   path: menuPath
            // });
          } else {
            this.errMsg = res.data.msg;
            // this.$alert(res.data.msg, "提示", {
            //   confirmButtonText: "确定",
            //   center: true,
            //   type: "error"
            // });
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
  background: #111622;
  box-sizing: border-box;
  padding-top: 190px;
}
.login-box {
  width: 826px;
  height: 620px;
  background-image: url("../assets/loginimg/bigbg.png");
  background-repeat: no-repeat;
  background-size: 413px 620px;
  margin: 0 auto;
  overflow: hidden;
}
.loginbox {
  width: 317px;
  margin-left: 254.5px;
  margin-top: 190px;
  text-align: center;
}
.logintitle {
  color: #fff;
  font-size: 30px;
  margin-bottom: 30px;
}
.loginbox .msgbox {
  width: 317px;
  height: 43px;
  background-color: #24272c;
  margin-bottom: 8px;
  box-sizing: border-box;
}
.loginbox .msgbox img {
  width: 13px;
  height: 14px;
  float: left;
  margin-top: 14.5px;
  margin-left: 14px;
}
.loginbox .msgbox1 img {
  width: 16px;
  height: 12px;
}
.loginbox .msgbox input {
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
  width: 317px;
  height: 43px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  box-sizing: border-box;
  line-height: 43px;
  cursor: pointer;
  background-image: url("../assets/loginimg/btnbg.png");
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