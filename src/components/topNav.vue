<template>
  <div class="topnav">
    <div class="navname">管理系统</div>
    <div class="rightnav">
      <img class="r1" src="../assets/nine/tou.png" alt="">
      <span class="r2">
        <span>{{userName}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <!-- <img src="../assets/nine/arr_b.png" /> -->
        <span style="cursor: pointer;" @click="loginOut">退出</span>
      </span>
      <span class="r3">|</span>
      <span class="r2" style="cursor: pointer;" @click="changePassword">修改密码</span>
      <!-- <span class="r5">
        <el-switch v-model="value1" active-text="开" inactive-text="关" @change="changeVal">
        </el-switch>
      </span> -->
      <img class="r4" src="../assets/nine/chi.png" alt="">
    </div>
    <div class="addForm" v-if="changeNow==true" style="z-index:2000;">
      <div class="addContent">
        <div class="title">
          <span class="tl">修改密码</span>
          <img class="tr" src="../assets/nine/closeform.png" alt="" @click="closeChange1">
        </div>
        <el-form :inline="true" ref="formInline" class="demo-form-inline">
          <el-form-item label="旧密码：">
            <el-input v-model="p1" type="password" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码：">
            <el-input v-model="p2" type="password" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="p3" type="password" placeholder="请确认密码"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmitChange('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeChange('formInline')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      userName: "",
      value1: true,
      changeNow: false,
      p1: "",
      p2: "",
      p3: ""
    };
  },
  beforeCreate() {
    // let allhref = window.location.href;
    // if (allhref.indexOf("newbaby") != -1) {
    //   let getmMatchResult = allhref.match(/newbaby(\S*)~/)[1];
    //   let data = localStorage.getItem("babyData" + getmMatchResult);
    //   let that = this;
    //   setTimeout(function() {
    //     if (getmMatchResult != "admin") {
    //       that.userName = JSON.parse(data).loginName;
    //     } else {
    //       that.userName = localStorage.getItem("loginName");
    //     }
    //   }, 1000);
    // }
  },
  created() {
    let allhref = window.location.href;
    if (allhref.indexOf("newbaby") != -1) {
      let getmMatchResult = allhref.match(/newbaby(\S*)~/)[1];
      let data = localStorage.getItem("babyData" + getmMatchResult);
      let that = this;
      if (getmMatchResult != "admin") {
        that.userName = getmMatchResult;
      } else {
        that.userName = localStorage.getItem("loginName");
      }
    }
  },
  mounted() {
    // this.userName = localStorage.getItem("loginName");
    // this.getValue1();
  },
  methods: {
    closeChange1() {
      this.changeNow = false;
    },
    closeChange(formName) {
      this.$refs[formName].resetFields();
      this.changeNow = false;
    },
    onSubmitChange(formName) {
      if (this.p2 !== this.p3) {
        this.$alert("确认密码与新密码不一致", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      } else {
        this.axios
          .post("/tn/mgr-api/sysmgr/updatePwd", {
            pwdOldMd5: md5(this.p1),
            pwdNewMd5: md5(this.p2)
          })
          .then(res => {
            console.log("getFundAccount>>", res.data);
            if (res.data.code == 200) {
              this.$alert(res.data.info, "提示", {
                confirmButtonText: "确定",
                center: true,
                type: "success"
              });
              localStorage.clear();
              this.$router.push({
                path: "/login"
              });
              this.changeNow = false;
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
      }
    },
    getValue1() {
      this.axios
        .post("/tn/mgr-api/sysmgr/get-mobile-config")
        .then(res => {
          if (res.data.code == 200) {
            this.value1 = res.data.data.loginVerifyPhone;
            if (this.value1 == 1) {
              this.value1 = true;
            } else {
              this.value1 = false;
            }
          } else {
          }
        })
        .catch(() => {});
    },
    changeVal(val) {
      console.log("我是值", val);
      if (val == false) {
        val = 0;
      } else if (val == true) {
        val = 1;
      }
      this.axios
        .post("/tn/mgr-api/sysmgr/save-mobile-config", {
          loginVerifyPhone: val
        })
        .then(res => {
          console.log("我啊", res);
          if (res.data.code == 200) {
            this.getValue1();
            this.value1 = res.data.data.loginVerifyPhone;
          } else {
          }
        })
        .catch(() => {});
    },
    loginOut() {
      this.axios
        .post("/tn/mgr-api/logout")
        .then(res => {
          console.log("login>>", res.data);
          if (res.data.code == 200) {
            // localStorage.clear();
            this.$router.push({
              path: "/login",
              query: {}
            });
          } else {
          }
        })
        .catch(() => {});
    },
    changePassword() {
      this.changeNow = true;
      this.p1 = "";
      this.p2 = "";
      this.p3 = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.topnav {
  background-color: #fff;
  height: 75px;
  margin-left: 1px;
}
.navname {
  color: #5b5b65;
  font-size: 20px;
  margin-left: 27px;
  line-height: 75px;
  float: left;
}
.rightnav {
  float: right;
  margin-right: 65px;
}
.rightnav * {
  float: left;
  margin-right: 30px;
}
.rightnav .r1 {
  width: 45px;
  height: 45px;
  margin-top: 15px;
}
.rightnav .r2 {
  font-size: 18px;
  color: #596a82;
  line-height: 75px;
}
.rightnav .r2 * {
  float: left;
}
.rightnav .r2 span {
  margin-right: 4px;
}
.rightnav .r2 img {
  width: 14px;
  height: 8px;
  margin-top: 35px;
}
.rightnav .r3 {
  color: #596a82;
  line-height: 75px;
}
.rightnav .r4 {
  width: 24px;
  height: 24px;
  margin-top: 25.5px;
}
.rightnav .r5 {
  margin-top: 27px;
}
</style>