<!--分账户监管-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">刷新</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="id" />
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
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span>操作</span>
                <span>持仓</span>
                <span>平仓</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="序号" width="100" prop="serial" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="母账户ID" prop="mom" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户ID" prop="id" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户名称" prop="name" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" prop="margin" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="借款额" prop="borrowing" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="期初金额" prop="money" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总资产" prop="assets" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏额" prop="loss" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏率" prop="rate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数" prop="house" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票市值" prop="smoeny" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="funds" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓率%" prop="position" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线" prop="cordon" align="center"></el-table-column>
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
          serial: "1",
          mom: "200001",
          id: "13898988463",
          name: "yy",
          margin: "13000",
          borrowing: "13000",
          money: "26000",
          assets: "24489.52",
          loss: "-1,524.70",
          rate: "-6.225",
          house: "0",
          smoney: "-761.00",
          funds: "25250.52",
          position: "-3.107",
          cordon: "14500"
        },
        {
          serial: "1",
          mom: "200001",
          id: "13898988463",
          name: "yy",
          margin: "13000",
          borrowing: "13000",
          money: "26000",
          assets: "24489.52",
          loss: "-1,524.70",
          rate: "-6.225",
          house: "0",
          smoney: "-761.00",
          funds: "25250.52",
          position: "-3.107",
          cordon: "14500"
        },
        {
          serial: "1",
          mom: "200001",
          id: "13898988463",
          name: "yy",
          margin: "13000",
          borrowing: "13000",
          money: "26000",
          assets: "24489.52",
          loss: "-1,524.70",
          rate: "-6.225",
          house: "0",
          smoney: "-761.00",
          funds: "25250.52",
          position: "-3.107",
          cordon: "14500"
        }
      ],
      colorBool: false,
      id:"",
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
</style>


