<!--提现审核-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入产品编号" v-model="proId" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入产品名称" v-model="proName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入资金账号" v-model="account" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box1">
            <el-date-picker v-model="value1" type="date">
            </el-date-picker>
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
          <el-table-column show-overflow-tooltip label="申请时间" prop="time" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="类型" prop="state" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="id" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="name" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="金额（元" prop="money" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手续费" prop="much" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="费率" prop="rate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款开户行" prop="hang" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款支行" prop="zhi" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款开户名" prop="where" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款卡号" prop="card" align="center"></el-table-column>
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
      value1: "",
      tableData: [
        {
          time: "2020-09-01 09:49:18",
          state: "充值",
          id: "100001131",
          name: "admin",
          money: "0",
          much: "0",
          rate: "-",
          hang: "杭州银行",
          zhi: "杭州",
          where: "晨晨",
          card: "6217002870002365325"
        },
        {
          time: "2020-09-01 09:49:18",
          state: "充值",
          id: "100001131",
          name: "admin",
          money: "0",
          much: "0",
          rate: "-",
          hang: "杭州银行",
          zhi: "杭州",
          where: "晨晨",
          card: "6217002870002365325"
        },
        {
          time: "2020-09-01 09:49:18",
          state: "充值",
          id: "100001131",
          name: "admin",
          money: "0",
          much: "0",
          rate: "-",
          hang: "杭州银行",
          zhi: "杭州",
          where: "晨晨",
          card: "6217002870002365325"
        }
      ],
      colorBool: false,
      proId: "",
      proName: "",
      account: "",
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


