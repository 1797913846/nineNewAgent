<!--融资方案配置-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="refresh">刷新</div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="融资周期" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="递延周期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资倍率" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资费率" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="利润分成比例" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="建仓费率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线比率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="平仓线比率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="个股持仓比率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创业板持仓比率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板持仓比率" width="100" align="center"></el-table-column>
        </el-table>
      </div>
      <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
        <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
        <el-table-column show-overflow-tooltip label="融资周期" width="100" prop="financePeriod" :formatter="formatter1" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="递延周期" prop="financePeriod" :formatter="formatter" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="融资倍率" prop="financeRatio" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="融资费率" prop="financeFeeRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="利润分成比例" width="100" prop="separateFeeRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="建仓费率" width="100" prop="makeFeeRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="警戒线比率" width="100" prop="cordonLineRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="平仓线比率" width="100" prop="flatLineRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="个股持仓比率" width="100" prop="positionRatio" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="创业板持仓比率" width="100" prop="secondBoardPositionRatio" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="科创板持仓比率" width="100" prop="thirdBoardPositionRatio" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="operation">
              <span>修改</span>
              <span>删除</span>
              <span>应用到用户</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSzie" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
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
      pageSzie: 31,
      currentPage: 1,
      total: 10,
      nullTable: false
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
    // keyword: {
    //   handler(newVal, oldVal) {
    //     this.currentPage = 1;
    //     this.getFundAccount();
    //   },
    //   deep: true
    // }
  },
  created() {
    this.getFundAccount();
  },
  methods: {
    formatter(row, column) {
      if (row) {
        let financePeriod = row.financePeriod;
        switch (financePeriod) {
          case "day":
            return "T+1";
          case "week":
            return "T+7";
          case "month":
            return "T+30";
          case "single":
            return "T+5";
          default:
            return "T+0";
        }
      }
    },
    formatter1(row, column) {
      if (row) {
        let financePeriod = row.financePeriod;
        switch (financePeriod) {
          case "day":
            return "天";
          case "week":
            return "周";
          case "month":
            return "月";
          case "single":
            return "单";
          default:
            return "默认";
        }
      }
    },
    refresh() {
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/tntg/financeScheme/list", {
          pageSize: this.pageSzie,
          pageNo: this.currentPage
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
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
            this.tableData = new Array(this.pageSzie);
          } else {
            this.nullTable = false;
          }

          console.log("我是最终结果", this.tableData);
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


