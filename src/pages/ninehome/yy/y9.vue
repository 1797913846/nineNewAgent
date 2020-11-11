<!--分红送股信息-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入证券代码" v-model="stockCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入证券名称" v-model="stockName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="交易所" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券代码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="发生日期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="分红" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="送股" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="转赠股" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易所" prop="exchangeCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券代码" prop="stockCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券名称" prop="stockName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="发生日期" prop="brokeDate" align="center" :formatter="formatter"></el-table-column>
          <el-table-column show-overflow-tooltip label="分红" prop="bonus" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="送股" prop="bonusIssue" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="转赠股" prop="conversionShares" align="center"></el-table-column>
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
      dateStart: "2020-10-21",
      dateEnd: "2020-10-21",
      productCode: "",
      lastPrice: "",
      addTitle: "调整资金",
      stockCode: "",
      stockName: ""
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
    this.getFundAccount();
  },
  methods: {
    formatter(row, column) {
      if (row) {
        let value = row.brokeDate;
        return value.year + "-" + value.monthValue + "-" + value.dayOfMonth;
      }
    },
    search() {
      this.currentPage=1;
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
        .post("/tn/mgr-api/tntg/stockBonus/list", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          stockCode: this.stockCode,
          stockName: this.stockName
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


