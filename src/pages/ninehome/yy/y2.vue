<!--逐笔持仓-->
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
            <input type="text" placeholder="请输入产品编号" v-model="productCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入股票代码" v-model="stockNo" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="selectbox">
            <el-form :inline="true">
              <el-form-item label="融资方式：">
                <el-select v-model="financePeriod" :clearable="true">
                  <el-option v-for="(item,index) in financePeriodList" :key="index" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="参考成本" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="市价" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="参考盈亏" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column show-overflow-tooltip label="成交日期" prop="orderDate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交时间" prop="orderTime" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托编号" prop="orderNo" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" width="160" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资周期" prop="financePeriod" :formatter="formatterday" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" prop="stockNo" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" prop="stockName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交数量" prop="dealCnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交均价" prop="dealAvrPrice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数量" prop="allottedCnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="逐笔成本" prop="preCost" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="逐笔市价" prop="lastPrice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="逐笔盈亏" prop="lastPrice" :formatter="formatter" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="!nullTable">
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
      productCode: "",
      stockNo: "",
      financePeriod: "",
      financePeriodList: [
        { key: "", value: "所有" },
        { key: "day", value: "天" },
        { key: "week", value: "周" },
        { key: "month", value: "月" },
        { key: "single", value: "单" }
      ],
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
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/holdDetail/export",
        data: {
          accountCode: this.accountCode,
          productCode: this.productCode,
          stockNo: this.stockNo,
          financePeriod: this.financePeriod
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
        .post("/tn/mgr-api/account/holdDetail", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          accountCode: this.accountCode,
          productCode: this.productCode,
          stockNo: this.stockNo,
          financePeriod: this.financePeriod
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


