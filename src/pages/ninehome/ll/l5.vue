<!--收付款管理-->
<template>
    <div class="bigestbox">
        <topNav></topNav>
        <div class="container contanier2">
            <div class=" heightbox">
                <div class="c2title">请验证手机号</div>
                <!--表单-->
                <div class="reset-scroll-style">
                    <div class="rbox">
                        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                            <el-form-item label="手机号：">
                                <el-input v-model="formInline.tel" placeholder="手机号"></el-input>
                            </el-form-item>
                            <div>
                                <el-form-item label="验证码：" class="codebox">
                                    <el-input class="codeinput" v-model="formInline.telcode" placeholder="验证码"></el-input>
                                </el-form-item>
                                <el-button class="getcode" type="primary">获取验证码</el-button>
                            </div>
                            <br />
                            <el-form-item>
                                <el-button class="nobt" type="primary" @click="onSubmit('formInline')">保存</el-button>
                            </el-form-item>
                        </el-form>
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
      tableData: [],
      colorBool: false,
      keyword: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      formInline: {
        tel: "",
        telcode: ""
      }
    };
  },
  computed: {
    headerCellStyle() {
      return {
        padding: "10px 0",
        background: "#F3F3F3",
        color: "#586A82",
        "font-size": "12px"
      };
    },
    cellStyle() {
      return {
        padding: "6px 0",
        "border-bottom": "1px solid #F3F3F3",
        "border-right": "0px",
        color: "#8C97A6",
        "font-size": "12px"
      };
    }
  },
  watch: {},
  created() {},
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.axios
            .post("/tn/mgr-api/sysmgr/config/save", {
              tel: this.formInline.tel,
              code: this.formInline.telcode
            })
            .then(res => {
              console.log("getFundAccount>>", res.data);
              if (res.data.code == 200) {
                this.$alert(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  center: true,
                  type: "success"
                });
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


