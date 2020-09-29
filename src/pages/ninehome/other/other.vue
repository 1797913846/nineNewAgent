<!--其他配置-->
<template>
  <div class="bigestbox" style="background-color:#fff;">
    <topNav></topNav>
    <div>
      <div class="reset-scroll-style"></div>
    </div>
    <!--表单-->
    <div class="addContent">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
        <el-form-item label="沪深主板涨幅买入限制：">
          <el-input v-model="formInline.stockIncreaseBuyLimit" placeholder="沪深主板涨幅买入限制"></el-input>
        </el-form-item>
        <el-form-item label="沪深主板跌幅买入限制：">
          <el-input v-model="formInline.stockDropBuyLimit" placeholder="沪深主板跌幅买入限制"></el-input>
        </el-form-item>
        <el-form-item label="创业板新票禁止交易天数：">
          <el-input v-model="formInline.secondRejectTradeDays" placeholder="创业板新票禁止交易天数"></el-input>
        </el-form-item>
        <el-form-item label="创业板涨幅买入限制：">
          <el-input v-model="formInline.secondStockIncreaseBuyLimit" placeholder="创业板涨幅买入限制"></el-input>
        </el-form-item>
        <el-form-item label="创业板跌幅买入限制：">
          <el-input v-model="formInline.secondStockDropBuyLimit" placeholder="创业板跌幅买入限制"></el-input>
        </el-form-item>
        <el-form-item label="科创板新票禁止交易天数：">
          <el-input v-model="formInline.thirdRejectTradeDays" placeholder="科创板新票禁止交易天数"></el-input>
        </el-form-item>
        <el-form-item label="科创板涨幅买入限制：">
          <el-input v-model="formInline.thirdStockIncreaseBuyLimit" placeholder="科创板涨幅买入限制"></el-input>
        </el-form-item>
        <el-form-item label="科创板跌幅买入限制：">
          <el-input v-model="formInline.thirdStockDropBuyLimit" placeholder="科创板跌幅买入限制"></el-input>
        </el-form-item>
        <el-form-item label="单客户单支股票市值规模限制：">
          <el-input v-model="formInline.singlestockHoldLimit" placeholder="单客户单支股票市值规模限制"></el-input>
        </el-form-item>
        <el-form-item label="全平台单支股票市值规模限制：">
          <el-input v-model="formInline.singlestockAllHoldLimit" placeholder="全平台单支股票市值规模限制"></el-input>
        </el-form-item>
        <el-form-item label="交易股票限制：">
          <el-input v-model="formInline.stockPrefixLimit" placeholder="交易股票限制"></el-input>
        </el-form-item>
        <el-form-item label="管理费清算模式：">
          <el-input v-model="formInline.manageFeeMode" placeholder="管理费清算模式"></el-input>
        </el-form-item>
        <el-form-item label="自动强平模式：">
          <el-input v-model="formInline.autoClosePosition" placeholder="自动强平模式"></el-input>
        </el-form-item>
        <el-form-item label="产品下单随机算法配置：">
          <el-input v-model="formInline.ctrlRoundRobinNumber" placeholder="产品下单随机算法配置"></el-input>
        </el-form-item>
        <el-form-item label="开启交易佣金自动结算到账户余额：">
          <el-input v-model="formInline.autoClear" placeholder="开启交易佣金自动结算到账户余额"></el-input>
        </el-form-item>
        <el-form-item label="开启券商账户资金轮询：">
          <el-input v-model="formInline.autoPolling" placeholder="开启券商账户资金轮询"></el-input>
        </el-form-item>
        <el-form-item label="委托间隔时效（秒）：">
          <el-input v-model="formInline.appointReqExpire" placeholder="委托间隔时效（秒）"></el-input>
        </el-form-item>
        <el-form-item label="开启创业板注册制：">
          <el-input v-model="formInline.isRegBoard" placeholder="开启创业板注册制"></el-input>
        </el-form-item>
        <br />
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formInline')">保存</el-button>
        </el-form-item>
      </el-form>
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
        stockIncreaseBuyLimit: "",
        stockDropBuyLimit: "",
        secondRejectTradeDays: "",
        secondStockIncreaseBuyLimit: "",
        secondStockDropBuyLimit: "",
        thirdRejectTradeDays: "",
        thirdStockIncreaseBuyLimit: "",
        thirdStockDropBuyLimit: "",
        singlestockHoldLimit: "",
        singlestockAllHoldLimit: "",
        stockPrefixLimit: "",
        manageFeeMode: "",
        autoClosePosition: "",
        ctrlRoundRobinNumber: "",
        autoClear: "",
        autoPolling: "",
        appointReqExpire: "",
        isRegBoard: ""
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
  created() {
    this.getFundAccount();
  },
  methods: {
    getFundAccount() {
      this.axios
        .get("/tn/mgr-api/tntg/compSet")
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
.addContent {
  width: 500px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 1%);
  padding-left: 10px;
  padding-right: 10px;
}
.addContent .title {
  border-bottom: 1px solid #ccc;
  color: #000;
  font-size: 18px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 20px;
  overflow: hidden;
}
.addContent .title .tl {
  float: left;
}
.addContent .title .tr {
  float: right;
  cursor: pointer;
}
</style>


