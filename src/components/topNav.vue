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
      <span class="r5">
        <el-switch v-model="value1" active-text="开" inactive-text="关" @change="changeVal">
        </el-switch>
      </span>

      <!-- <img class="r4" src="../assets/nine/chi.png" alt=""> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: localStorage.getItem("userName"),
      value1: true
    };
  },
  created() {},
  mounted() {
    this.userName = localStorage.getItem("userName");
    this.getValue1();
  },
  methods: {
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
            localStorage.clear();
            this.$router.push({
              path: "/login"
            });
          } else {
          }
        })
        .catch(() => {});
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
  margin-top: 25px;
}
</style>