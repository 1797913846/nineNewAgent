<!--股票交易设置-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container contanier2 contanier3">
      <div class=" heightbox">
        <!--表单-->
        <div class="reset-scroll-style">
          <div class="rbox rbox1">
            <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
              <el-form-item label="沪深主板涨幅买入限制：">
                <el-input v-model="formInline.stockIncreaseBuyLimit" placeholder="沪深主板涨幅买入限制"></el-input>
              </el-form-item>
              <span>注：数据为0时无限制</span>
              <el-form-item label="沪深主板跌幅买入限制：">
                <el-input v-model="formInline.stockDropBuyLimit" placeholder="沪深主板跌幅买入限制"></el-input>
              </el-form-item>
              <span>注：数据为0时无限制</span>
              <el-form-item label="创业板新票禁止交易天数：">
                <el-input v-model="formInline.secondRejectTradeDays" placeholder="创业板新票禁止交易天数"></el-input>
              </el-form-item>
              <span>注：数据为0时无限制</span>
              <el-form-item label="创业板涨幅买入限制：">
                <el-input v-model="formInline.secondStockIncreaseBuyLimit" placeholder="创业板涨幅买入限制"></el-input>
              </el-form-item>
              <span>注：数据为0时无限制</span>
              <el-form-item label="创业板跌幅买入限制：">
                <el-input v-model="formInline.secondStockDropBuyLimit" placeholder="创业板跌幅买入限制"></el-input>
              </el-form-item>
              <span>注：数据为0时无限制</span>
              <el-form-item label="科创板新票禁止交易天数：">
                <el-input v-model="formInline.thirdRejectTradeDays" placeholder="科创板新票禁止交易天数"></el-input>
              </el-form-item>
              <span>注：数据为0时无限制</span>
              <el-form-item label="科创板涨幅买入限制：">
                <el-input v-model="formInline.thirdStockIncreaseBuyLimit" placeholder="科创板涨幅买入限制"></el-input>
              </el-form-item>
              <span>注：数据为0时无限制</span>
              <el-form-item label="科创板跌幅买入限制：">
                <el-input v-model="formInline.thirdStockDropBuyLimit" placeholder="科创板跌幅买入限制"></el-input>
              </el-form-item>
              <span>注：数据为0时无限制</span>
              <el-form-item label="单客户单支股票市值规模限制：">
                <el-input v-model="formInline.singlestockHoldLimit" placeholder="单客户单支股票市值规模限制"></el-input>
              </el-form-item>
              <el-form-item label="全平台单支股票市值规模限制：">
                <el-input v-model="formInline.singlestockAllHoldLimit" placeholder="全平台单支股票市值规模限制"></el-input>
              </el-form-item>
              <!-- <el-form-item label="交易股票限制：">
          <el-input v-model="formInline.stockPrefixLimit" placeholder="交易股票限制"></el-input>
        </el-form-item>
        <el-form-item label="管理费清算模式：">
          <el-select v-model="formInline.manageFeeMode">
            <el-option label="按持仓市值计算：股票总市值*管理费率/天" :value="Number(1)"></el-option>
            <el-option label="按优先资金计算：(保证金*融资倍率-可用资金)*管理费率/天" :value="Number(2)"></el-option>
            <el-option label="按融资金额计算：(保证金*融资倍率)*管理费率/天" :value="Number(3)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自动强平模式：">
          <el-select v-model="formInline.autoClosePosition">
            <el-option label="关闭" :value="Number(0)"></el-option>
            <el-option label="开启" :value="Number(1)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品下单随机算法配置：">
          <el-input v-model="formInline.ctrlRoundRobinNumber" placeholder="产品下单随机算法配置"></el-input>
        </el-form-item>
        <el-form-item label="产品下单随机算法配置：">
          <el-select v-model="formInline.ctrlRoundRobinNumber">
            <el-option label="【随机方式】匹配券商账户" :value="Number(1)"></el-option>
            <el-option label="【可用资金方式】匹配券商账户" :value="Number(2)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开启交易佣金自动结算到账户余额：">
          <el-select v-model="formInline.autoClear">
            <el-option label="关闭" :value="Number(0)"></el-option>
            <el-option label="开启" :value="Number(1)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开启券商账户资金轮询：">
          <el-select v-model="formInline.autoPolling">
            <el-option label="关闭" :value="Number(0)"></el-option>
            <el-option label="开启" :value="Number(1)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="委托间隔时效（秒）：">
          <el-input v-model="formInline.appointReqExpire" placeholder="委托间隔时效（秒）"></el-input>
        </el-form-item>
        <el-form-item label="开启创业板注册制：">
          <el-select v-model="formInline.autoPolling">
            <el-option label="关闭" :value="Number(0)"></el-option>
            <el-option label="开启" :value="Number(1)"></el-option>
          </el-select>
        </el-form-item> --><br />
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.axios
            .post("/tn/mgr-api/tntg/compSet/config/stock", {
              stockIncreaseBuyLimit: this.formInline.stockIncreaseBuyLimit,
              stockDropBuyLimit: this.formInline.stockDropBuyLimit,
              secondRejectTradeDays: this.formInline.secondRejectTradeDays,
              secondStockIncreaseBuyLimit: this.formInline
                .secondStockIncreaseBuyLimit,
              secondStockDropBuyLimit: this.formInline.secondStockDropBuyLimit,
              thirdRejectTradeDays: this.formInline.thirdRejectTradeDays,
              thirdStockIncreaseBuyLimit: this.formInline
                .thirdStockIncreaseBuyLimit,
              thirdStockDropBuyLimit: this.formInline.thirdStockDropBuyLimit,
              singlestockHoldLimit: this.formInline.singlestockHoldLimit,
              singlestockAllHoldLimit: this.formInline.singlestockAllHoldLimit
              // stockPrefixLimit: this.formInline.stockPrefixLimit,
              // manageFeeMode: this.formInline.manageFeeMode,
              // autoClosePosition: this.formInline.autoClosePosition,
              // ctrlRoundRobinNumber: this.formInline.ctrlRoundRobinNumber,
              // autoClear: this.formInline.autoClear,
              // autoPolling: this.formInline.autoPolling,
              // appointReqExpire: this.formInline.appointReqExpire,
              // isRegBoard: this.formInline.isRegBoard
            })
            .then(res => {
              console.log("getFundAccount>>", res.data);
              if (res.data.code == 200) {
                this.$alert(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  center: true,
                  type: "success"
                });
                this.getFundAccount();
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
</style>


