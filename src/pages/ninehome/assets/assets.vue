<!--资产管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">刷新</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入产品编号" v-model="productcodeLike" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入产品名称" v-model="productname" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入资金账号" v-model="userid" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="券商名称" v-model="brokerName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center" width="330">
            <template slot-scope="scope">
              <div class="operation">
                <span>修改</span>
                <span>删除</span>
                <span> 获取券商资金</span>
                <span> 获取券商持仓</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" prop="productcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品名称" prop="productname" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金账号" prop="userid" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="优先级" prop="priority" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="状态" prop="onlineStatusDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账号类型" prop="usertype" align="center" :formatter="formatter"></el-table-column>
          <el-table-column show-overflow-tooltip label="开仓控制" prop="operateStatusDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品佣金" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip width="150" label="期初可分配金额" prop="marketcap" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商名称" prop="brokerName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总资产" prop="totalBnc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总可用" prop="availableBnc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总期初" prop="allottedScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总可用" prop="accountAvailableBnc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="剩余资产" prop="diffTotal" align="center"></el-table-column>
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
      tableData: [],
      colorBool: false,
      keyword: "",
      productcodeLike: "",
      productname: "",
      userid: "",
      brokerName: "",
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
    this.getFundAccount();
  },
  methods: {
    formatter(row, column) {
      if (row) {
        let usertype = row.usertype;
        switch (usertype) {
          case 0:
            return "普通户";
          case 1:
            return "担保品";
          case 2:
            return "融资融券";
          default:
            return "未知";
        }
      }
    },
    search(){
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/productInfo/list", {
          productcodeLike: this.productcodeLike,
          productname: this.productname,
          userid: this.userid,
          brokerName: this.brokerName,
          pageSize: this.pageSize,
          pageNo: this.currentPage
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


