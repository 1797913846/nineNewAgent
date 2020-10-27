<!--结算信息-->
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
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-boxv">
            <span class="bu"> 从：</span>
            <div class="selectbox">
              <el-date-picker v-model="dateStart" type="date">
              </el-date-picker>
            </div>
            <span class="bu">&nbsp; 至：</span>
            <div class="selectbox">
              <el-date-picker v-model="dateEnd" type="date">
              </el-date-picker>
            </div>
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易日期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总买入数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总买入手续费" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总买入发生金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总卖出数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总卖出手续费" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总卖出发生金额" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易日期" prop="orderDate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总买入数量" prop="dealCntBuy" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总买入手续费" prop="commissionBuy" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总买入发生金额" prop="dealAmountBuy" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总卖出数量" prop="dealCntSell" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总卖出手续费" prop="commissionSell" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总卖出发生金额" prop="dealAmountSell" align="center"></el-table-column>
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
      dateStart: "2020-10-21",
      dateEnd: "2020-10-21",
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
    this.getFundAccount();
  },
  methods: {
    formatter(row, column) {
      if (row) {
        return (
          Math.round(
            (row["lastPrice"] - row["preCost"]) * row["allottedCnt"] * 100
          ) / 100
        );
      }
    },
    search() {
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/history/settle/export",
        data: {}
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
        .post("/tn/mgr-api/history/settle", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          accountCode: this.accountCode,
          accountName: this.accountName,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd
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
.addForm {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
}
.addContent {
  background-color: #fff;
  width: 500px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
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


