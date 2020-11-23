<!--代理结算详情-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入代理ID" v-model="agentAccountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-boxv">
            <span class="bu"> 从：</span>
            <div class="selectbox">
              <el-date-picker v-model="createTimeStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
              </el-date-picker>
            </div>
            <span class="bu">&nbsp; 至：</span>
            <div class="selectbox">
              <el-date-picker v-model="createTimeEnd" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
              </el-date-picker>
            </div>
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="700" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="订单日期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理账户ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理账户名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员账户ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员账户名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资方案" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买入数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买入成交金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买入手续费" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="卖出数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="卖出成交金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="卖出手续费" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易佣金返利" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="管理费返利" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买卖成交金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="利润分成返利" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="700" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="订单日期" prop="orderDate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理账户ID" prop="agentAccountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理账户名称" prop="agentAccountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员账户ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员账户名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资方案" :formatter="formatterday" prop="financePeriod" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买入数量" prop="dealCntBuy" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买入成交金额" prop="dealAmountBuy" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买入手续费" prop="commissionBuy" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="卖出数量" prop="dealCntSell" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="卖出成交金额" prop="dealAmountSell" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="卖出手续费" prop="commissionSell" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易佣金返利" prop="commissionRebate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="管理费返利" prop="managerRebate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买卖成交金额" prop="dealAmountBuy" :formatter="formattera" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="利润分成返利" prop="profitRebate" :formatter="formatterb" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="nullTable==false">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
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
      id: "",
      keyword: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      accountCode: "",
      accountName: "",
      agentAccountCode: "",
      stockNo: "",
      buyOrderNo: "",
      sellOrderNo: "",
      financePeriod: "",
      financePeriodList: [
        { key: "day", value: "天" },
        { key: "week", value: "周" },
        { key: "month", value: "月" },
        { key: "single", value: "单" }
      ],
      createTimeStart: "",
      createTimeEnd: "",
      productCode: "",

      lastPrice: "",
      addTitle: "调整资金",
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
    }
  },
  created() {
    this.createTimeStart = this.getNowFormatDate();
    this.createTimeEnd = this.getNowFormatDate();
    this.getFundAccount();
  },
  methods: {
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    formatterday(row, column) {
      if (row) {
        let financePeriod = row.financePeriod;
        switch (financePeriod) {
          case "day":
            return "天";
            break;
          case "week":
            return "周";
            break;
          case "month":
            return "月";
            break;
          case "single":
            return "单";
            break;
          default:
            return "所有";
            break;
        }
      }
    },
    formatter(row, column) {
      if (row) {
        return (
          Math.round(
            (row["lastPrice"] - row["preCost"]) * row["allottedCnt"] * 100
          ) / 100
        );
      }
    },
    formattera(row, column) {
      return row["dealAmountBuy"] + row["dealAmountSell"];
    },
    formatterb(row, column) {
      return (
        row["profitRebate"] + row["managerRebate"] + row["commissionRebate"]
      );
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/agent/settle/infoList/export",
        data: {
          accountCode: this.accountCode,
          agentAccountCode: this.agentAccountCode,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd
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
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/account/agent/settle/infoList", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          accountCode: this.accountCode,
          agentAccountCode: this.agentAccountCode,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd
        })
        .then(res => {
          if (res.data.code == 200) {
            let rows = res.data.data.rows;
            if (rows.length > 0) {
              this.tableData = res.data.data.rows;
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


