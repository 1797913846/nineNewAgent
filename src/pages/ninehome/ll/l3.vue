<!--收付款管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container contanier2">
      <div class=" heightbox">
        <div class="c2title" v-if="level==2">请配置用户线下充值的收款银行、支付宝信息</div>
        <div class="c2title" v-if="level!=2">用户线下充值的收款银行、支付宝信息</div>
        <!--表单-->
        <div class="reset-scroll-style">
          <div class="rbox" style="padding-bottom:20px;">
            <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
              <el-form-item label="开户银行：">
                <el-input v-model="formInline.PAY_BANK_NAME" placeholder="开户银行" :disabled="level!=2"></el-input>
              </el-form-item>
              <el-form-item label="支行名称：">
                <el-input v-model="formInline.PAY_BANK_BRANCH" placeholder="支行名称" :disabled="level!=2"></el-input>
              </el-form-item>
              <el-form-item label="银行卡号：">
                <el-input v-model="formInline.PAY_BANK_CARDNO" placeholder="银行卡号" :disabled="level!=2"></el-input>
              </el-form-item>
              <el-form-item label="户 名：">
                <el-input v-model="formInline.PAY_BANK_ACCOUNT_NAME" placeholder="户名" :disabled="level!=2"></el-input>
              </el-form-item>
              <el-form-item label="支付宝账号：">
                <el-input v-model="formInline.PAY_ALIYPAY" placeholder="支付宝账号" :disabled="level!=2"></el-input>
              </el-form-item>
              <el-form-item label="支付宝名称：">
                <el-input v-model="formInline.PAY_ALIYPAY_NAME" placeholder="支付宝名称" :disabled="level!=2"></el-input>
              </el-form-item>
              <el-form-item label="支付宝收款码：">
                <el-input v-model="formInline.PAY_ALIYPAY_CODE_URL" placeholder="支付宝收款码" :disabled="level!=2"></el-input>
              </el-form-item><br />
              <el-form-item v-if="level==2">
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
        payBankName: "",
        payBankBranch: "",
        payBankCardNo: "",
        payBankAccountName: "",
        payAliplay: "",
        payAliplayName: "",
        payAliplayCodeUrl: ""
      },
      level: ""
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
  created() {
    let allhref = window.location.href;
    if (allhref.indexOf("newbaby") != -1) {
      let getmMatchResult = allhref.match(/newbaby(\S*)~/)[1];
      let data = localStorage.getItem("babyData" + getmMatchResult);
      data = JSON.parse(data);
      this.level = data.level;
    }
    this.getFundAccount();
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.axios
            .post("/tn/mgr-api/sysmgr/config/save", {
              payBankName: this.formInline.PAY_BANK_NAME,
              payBankBranch: this.formInline.PAY_BANK_BRANCH,
              payBankCardNo: this.formInline.PAY_BANK_CARDNO,
              payBankAccountName: this.formInline.PAY_BANK_ACCOUNT_NAME,
              payAliplay: this.formInline.PAY_ALIYPAY,
              payAliplayName: this.formInline.PAY_ALIYPAY_NAME,
              payAliplayCodeUrl: this.formInline.PAY_ALIYPAY_CODE_URL
            })
            .then(res => {
              console.log("getFundAccount>>", res.data);
              if (res.data.code == 200) {
                this.getFundAccount();
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
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/sysmgr/config")
        .then(res => {
          if (res.data.code == 200) {
            this.formInline = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFundAccount();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


