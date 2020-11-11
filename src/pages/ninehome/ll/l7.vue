<!--安全设置-->
<template>
    <div class="bigestbox">
        <topNav></topNav>
        <div>
            <span class="safetitle">安全设置</span>
            <div class="bigtu">
                <span class="tutitle">是否开启手机验证</span>
                <div class="tuname">
                    <span v-if="value1==true" class="ta1">已开启</span>
                    <span v-if="value1==false" class="ta2">已关闭</span>
                </div>
                <div class="kaiguan" v-if="value1==true" @click="changeVal(false)">
                    <div class="tu1">
                        <span class="yuan1 yuana"></span>
                    </div>
                </div>
                <div class="kaiguan" v-if="value1==false" @click="changeVal(true)">
                    <div class="tu1">
                        <span class="yuan1 yuanb"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from "@/components/topNav";
export default {
  components: {
    topNav
  },
  data() {
    return {
      value1: true
    };
  },
  computed: {
    headerCellStyle() {
      return {
        background: "#F3F3F3",
        color: "#586A82",
        "font-size": "12px"
      };
    },
    cellStyle() {
      return {
        "border-bottom": "1px solid #F3F3F3",
        "border-right": "0px",
        color: "#8C97A6",
        "font-size": "12px"
      };
    }
  },
  watch: {},
  created() {},
  mounted() {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.safetitle {
  color: #576880;
  font-weight: bold;
  font-size: 20px;
  margin-top: 53px;
  margin-left: 53px;
  display: inline-block;
}
.bigtu {
  width: 602px;
  height: 138px;
  background: #ffffff;
  border: 1px solid rgba(233, 239, 243, 0.21);
  border-radius: 10px;
  margin-left: 53px;
  margin-top: 31px;
}
.tutitle {
  color: #586982;
  font-size: 14px;
  line-height: 138px;
  float: left;
  margin-left: 74px;
}
.tuname {
  float: left;
  line-height: 138px;
  font-size: 14px;
  margin-left: 116px;
}
.ta1 {
  color: #2562ee;
}
.ta2 {
  color: #586982;
}
.kaiguan {
  float: left;
  margin-left: 146px;
  margin-top: 62px;
  cursor: pointer;
}
.tu1 {
  width: 53px;
  height: 13px;
  background: #ededed;
  border-radius: 7px;
}
.yuan1 {
  display: inline-block;
  width: 20px;
  height: 20px;

  border-radius: 10px;
}
.yuana {
  background: #2562ee;
  margin-left: 7px;
  margin-top: -4px;
}
.yuanb {
  background: #586982;
  margin-left: 27px;
  margin-top: -4px;
}
</style>


