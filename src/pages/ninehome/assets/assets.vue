<!--资产管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">刷新</div>
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
          <div class="search-box">
            <input type="text" placeholder="券商名称" v-model="gname" />
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
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <div class="operation">
                <span>修改</span>
                <span>重置密码</span>
                <span>查看</span>
                <span>资金</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" prop="serial" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品名称" prop="name" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金账号" prop="accout" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="优先级" prop="priority" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="状态" prop="state" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账号类型" prop="type" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="开仓控制" prop="control" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品佣金" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip width="150" label="期初可分配金额" prop="amount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商名称" prop=" jname" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总资产" prop="jmoney" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总可用" prop="juse" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总期初" prop="jamount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总可用" prop="jall" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="剩余资产" prop="jalluse" align="center"></el-table-column>
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
          name: "1",
          accout: "200001",
          priority: "0",
          state: "在线",
          type: "普通户",
          control: "允许操作",
          commission: "0.0002",
          amount: "1000000",
          jname: "同花顺模拟",
          jmoney: "988897878.76",
          juse: "988897878.76",
          jamount: "159958",
          jall: "-3.107",
          jalluse: "14500"
        },
        {
          serial: "1",
          name: "1",
          accout: "200001",
          priority: "0",
          state: "在线",
          type: "普通户",
          control: "允许操作",
          commission: "0.0002",
          amount: "1000000",
          jname: "同花顺模拟",
          jmoney: "988897878.76",
          juse: "988897878.76",
          jamount: "159958",
          jall: "-3.107",
          jalluse: "14500"
        },
        {
          serial: "1",
          name: "1",
          accout: "200001",
          priority: "0",
          state: "在线",
          type: "普通户",
          control: "允许操作",
          commission: "0.0002",
          amount: "1000000",
          jname: "同花顺模拟",
          jmoney: "988897878.76",
          juse: "988897878.76",
          jamount: "159958",
          jall: "-3.107",
          jalluse: "14500"
        },
        {
          serial: "1",
          name: "1",
          accout: "200001",
          priority: "0",
          state: "在线",
          type: "普通户",
          control: "允许操作",
          commission: "0.0002",
          amount: "1000000",
          jname: "同花顺模拟",
          jmoney: "988897878.76",
          juse: "988897878.76",
          jamount: "159958",
          jall: "-3.107",
          jalluse: "14500"
        }
      ],
      colorBool: false,
      keyword: "",
      proId: "",
      proName: "",
      account: "",
      gname: "",
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


