<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="keyword" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user">查询</div>
          <div class="search-user">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span>调整资金</span>
                <span>增配资金</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="序号" prop="number" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="id" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名字" prop="name" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" prop="balance" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="初期规模" prop="early" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总资产" prop="allmoney" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="usemoney" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可取资金" prop="good" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票市值" prop="market" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易冻结资金" prop="trading" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手动冻结资金" prop="manual" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总盈亏" prop="profit" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSzie" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
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
          number: "1",
          id: "13987674763",
          name: "2000001",
          balance: "0",
          early: "0",
          allmoney: "0",
          usemoney: "0",
          good: "0",
          market: "10000000",
          trading: "10000000",
          manual: "10000000",
          profit: "99839474.45"
        },
        {
          number: "1",
          id: "13987674763",
          name: "2000001",
          balance: "0",
          early: "0",
          allmoney: "0",
          usemoney: "0",
          good: "0",
          market: "10000000",
          trading: "10000000",
          manual: "10000000",
          profit: "99839474.45"
        },
        {
          number: "1",
          id: "13987674763",
          name: "2000001",
          balance: "0",
          early: "0",
          allmoney: "0",
          usemoney: "0",
          good: "0",
          market: "10000000",
          trading: "10000000",
          manual: "10000000",
          profit: "99839474.45"
        }
      ],
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
            size: this.pageSzie,
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
            this.tableData = new Array(this.pageSzie);
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
.operation {
}
.operation span {
  color: #586880;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
  margin-right: 24px;
}
</style>


