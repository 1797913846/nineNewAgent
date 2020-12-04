<!--股票静态信息-->
<template>
    <div class="bigestbox">
        <topNav v-if="whoserouter =='/ninehome/y1'"></topNav>
        <div class="container" @click="colorBool = false">
            <div class="template-top">
                <div class="title" @click="refresh">刷新</div>
                <div class="operate-btn">
                    <div class="search-box">
                        <input type="text" placeholder="请输入股票代码" v-model="stockCode" />
                        <img src="../../../assets/nine/search.png" class="search-img" />
                    </div>
                    <div class="search-box">
                        <input type="text" placeholder="请输入股票名称" v-model="stockName" />
                        <img src="../../../assets/nine/search.png" class="search-img" />
                    </div>
                    <div class="search-user" @click="search">查询</div>
                </div>
            </div>
            <!--表格-->
            <div class="reset-scroll-style">
                <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="720" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column show-overflow-tooltip label="股票代码" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="股票名称" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="昨日收盘价" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="更新时间" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="跌停价格" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="涨停价格" align="center"></el-table-column>
                </el-table>
                <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="720" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column show-overflow-tooltip label="股票代码" prop="stockCode" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="股票名称" prop="stockName" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="昨日收盘价" prop="preClosePrice" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="更新时间" prop="updateTime" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="跌停价格" prop="priceDownlimit" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="涨停价格" prop="priceUplimit" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <!-- <div class="tongji">
                    <span>总持仓数量 : {{ext.stockCnt }}</span>
                    <span>总参考盈亏 : {{ext.profit }}</span>
                    <span>总持仓金额（市值）: {{ext.lastPrice }}</span>
                </div> -->
                <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </div>
        <!--修改表单-->
        <div class="addForm" v-if="changeNow==true">
            <div class="addContent">
                <div class="title">
                    <span class="tl">{{addTitle}}</span>
                    <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeChange1">
                </div>
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                    <el-form-item label="平仓价格：">
                        <el-input v-model="lastPrice" placeholder="平仓价格"></el-input>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <el-button class="savebt" type="primary" @click="onSubmitChange1('formInline')">保存</el-button>
                        <el-button class="nobt" type="primary" @click="closeChange('formInline')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="loadingText" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
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
      fullscreenLoading: false,
      loadingText: "数据量很大,拼命加载中,请耐心等待",
      whoserouter: "",
      tableData: [],
      ext: {},
      colorBool: false,
      id: "",
      keyword: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      accountCode: "",
      productCode: "",
      stockNo: "",
      stockCode: "",
      stockName: "",
      lastPrice: "",
      setArray: [
        {
          key: 0,
          value: "减少可用资金"
        },
        {
          key: 1,
          value: "增加可用资金"
        },
        {
          key: 2,
          value: "减少账户余额"
        },
        {
          key: 3,
          value: "增加账户余额"
        }
      ],
      changeNow: false,
      addTitle: "调整资金",
      formInline: {
        accountCode: "",
        accountName: "",
        adjustmentType: "",
        money: "",
        remark: "",
        financeRatio: "",
        amount: 0
      },
      financeRatioList: [
        {
          key: 3,
          value: "3倍"
        },
        {
          key: 5,
          value: "5倍"
        },
        {
          key: 6,
          value: "6倍"
        },
        {
          key: 8,
          value: "8倍"
        }
      ]
    };
  },
  props: {
    accountId: {
      type: String,
      default: ""
    }
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
  watch: {
    keyword: {
      handler(newVal, oldVal) {
        this.currentPage = 1;
        this.getFundAccount();
      },
      deep: true
    },
    accountId: {
      handler(newVal, oldVal) {
        this.accountCode = newVal;
        this.getFundAccount();
      },
      deep: true
    }
  },
  created() {
    this.accountCode = this.$route.query.accountId || this.accountId || "";
    this.whoserouter = this.$route.path;
    console.log("是我啊", this.whoserouter, this.accountId);
    this.getFundAccount();
  },
  methods: {
    getSummaries(param) {
      console.log("是我", param);
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "当前页统计";
          return;
        }
        if (
          column.property != "accountCode" &&
          column.property != "accountName" &&
          column.property != "productCode" &&
          column.property != "stockCode" &&
          column.property != "stockName" &&
          column.property != "stockCntAble" &&
          column.property != "costPrice"
        ) {
          console.log("列", column);
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index] = " ";
          }
        }
      });
      let newsums = sums.map(item => {
        console.log(typeof item);
        if (typeof item == "number") {
          item = item.toFixed(2);
        }
        return item;
      });
      // console.log('是我',sums)
      return newsums;
    },
    closeChange1() {
      this.changeNow = false;
    },
    onSubmitChange1(formName) {
      this.axios
        .post("/tn/mgr-api/itg/appoint/CLOSE", {
          accountCode: this.formInline.accountCode,
          productCode: this.productCode,
          stockCode: this.stockCode,
          appointPrice: this.lastPrice
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.changeNow = false;
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
    },
    closeChange(formName) {
      this.$refs[formName].resetFields();
      this.changeNow = false;
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/hold/export",
        data: {
          accountCode: this.accountCode,
          productCode: this.productCode,
          stockNo: this.stockNo,
          pageNo: -1
        }
      }).then(
        res => {
          var disposition = res.headers["content-disposition"];
          var fileName = decodeURI(disposition.split("filename=")[1]);
          fileName = fileName.substr(0, fileName.length - 1);
          fileName = fileName.substr(1, fileName.length - 1);
          let blob = new Blob([res.data], { type: "application/.xls" });
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          link.remove();
        },
        err => {
          var enc = new TextDecoder("utf-8");
          var res = JSON.parse(enc.decode(new Uint8Array(err.data))); //转化成json对象
        }
      );
    },
    refresh() {
      this.fullscreenLoading = true;
      this.axios
        .post("/tn/mgr-api/static/stock/refresh")
        .then(res => {
          if (res.data.code == 200) {
            let that = this;
            setTimeout(function() {
              that.loadingText = "后台正在处理中，请15秒之后刷新重试";
            }, 2000);
            setTimeout(function() {
              that.getFundAccount();
              that.fullscreenLoading = false;
            }, 3000);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/static/stock/list", {
          stockCode: this.stockCode,
          stockName: this.stockName,
          pageSize: this.pageSize,
          pageNo: this.currentPage
        })
        .then(res => {
          if (res.data.code == 200) {
            let rows = res.data.data.rows;
            if (rows.length > 0) {
              this.tableData = res.data.data.rows;
              //   this.ext = res.data.data.ext;
            } else {
              this.tableData = [];
            }
            this.total = res.data.data.total;
          } else {
            this.tableData = [];
          }
          if (this.tableData.length <= 0) {
            this.nullTable = true;
            this.tableData = new Array(this.pageSize);
          } else {
            this.nullTable = false;
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


