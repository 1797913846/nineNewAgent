<!--其他配置-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">刷新</div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="融资周期" width="100" prop="financing" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="递延周期" prop="deferred" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资倍率" prop="ratio" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资费率" prop="rate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="利润分成比例" width="100" prop="Divided" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="建仓费率" width="100" prop="positions" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线比率" width="100" prop="cordon" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="平仓线比率" width="100" prop="open" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="个股持仓比率" width="100" prop="stocks" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创业板持仓比率" width="100" prop="entrepreneurship" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板持仓比率" width="100" prop="kechuang" align="center"></el-table-column>
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
      tableData: [
        {
          financing: "天",
          deferred: "T+1",
          ratio: "3",
          rate: "0.001",
          Divided: "0",
          positions: "0.001",
          cordon: "0.88",
          open: "0.85",
          stocks: "0.7",
          entrepreneurship: "0.7",
          kechuang: "0.7"
        },
        {
          financing: "天",
          deferred: "T+1",
          ratio: "3",
          rate: "0.001",
          Divided: "0",
          positions: "0.001",
          cordon: "0.88",
          open: "0.85",
          stocks: "0.7",
          entrepreneurship: "0.7",
          kechuang: "0.7"
        },
        {
          financing: "天",
          deferred: "T+1",
          ratio: "3",
          rate: "0.001",
          Divided: "0",
          positions: "0.001",
          cordon: "0.88",
          open: "0.85",
          stocks: "0.7",
          entrepreneurship: "0.7",
          kechuang: "0.7"
        },
        {
          financing: "天",
          deferred: "T+1",
          ratio: "3",
          rate: "0.001",
          Divided: "0",
          positions: "0.001",
          cordon: "0.88",
          open: "0.85",
          stocks: "0.7",
          entrepreneurship: "0.7",
          kechuang: "0.7"
        }
      ],
      colorBool: false,
      keyword: "",
      pageSize: 31,
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
    keyword: {
      handler(newVal, oldVal) {
        this.currentPage = 1;
        this.getFundAccount();
      },
      deep: true
    }
  },
  created() {
    // this.getFundAccount();
  },
  methods: {
    getFundAccount() {
      this.axios
        .get("account/fund", {
          params: {
            search: this.keyword,
            size: this.pageSize,
            page: this.currentPage
          }
        })
        .then(res => {
          console.log("getFundAccount>>", res.data.data);
          if (res.data.code == 1) {
            this.tableData = res.data.data.data;
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


