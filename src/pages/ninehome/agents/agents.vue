<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">刷新</div>
        <div class="title" style="margin-left:7px;">我的二维码</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入代理商名称" v-model="keyword" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入代理商ID" v-model="keyword" />
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
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <div class="operation">
                <span>修改</span>
                <span>重置密码</span>
                <span>查看</span>
                <span>资金</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="序号" prop="serial" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级" prop="level" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级名称" prop="name" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理ID" prop="id" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理名称" prop="agent" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理状态" prop="state" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品" prop="product" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="单边佣金" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="邀请码" prop="code" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人ID" prop="referees" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" prop="rname" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" prop="balance" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="初期规模" prop="initial" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="available" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" prop="margin" align="center"></el-table-column>
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
          level: "1",
          name: "admin",
          id: "13878674736",
          agent: "测试",
          state: "正常",
          product: "0",
          commission: "0",
          code: "查看",
          referees: "-6.225",
          rname: "0",
          balance: "-761.00",
          initial: "25250.52",
          available: "-3.107",
          margin: "14500"
        },
        {
          serial: "1",
          level: "1",
          name: "admin",
          id: "13878674736",
          agent: "测试",
          state: "正常",
          product: "0",
          commission: "0",
          code: "查看",
          referees: "-6.225",
          rname: "0",
          balance: "-761.00",
          initial: "25250.52",
          available: "-3.107",
          margin: "14500"
        },
        {
          serial: "1",
          level: "1",
          name: "admin",
          id: "13878674736",
          agent: "测试",
          state: "正常",
          product: "0",
          commission: "0",
          code: "查看",
          referees: "-6.225",
          rname: "0",
          balance: "-761.00",
          initial: "25250.52",
          available: "-3.107",
          margin: "14500"
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


