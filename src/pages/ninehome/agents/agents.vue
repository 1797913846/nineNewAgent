<!--代理商列表-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">刷新</div>
        <div class="title" style="margin-left:7px;">我的二维码</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入代理商名称" v-model="agentName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入代理商ID" v-model="agentId" />
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
          <!-- <el-table-column show-overflow-tooltip label="序号" prop="serial" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="等级" prop="level" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级名称" prop="levelName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理ID" prop="accountId" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理状态" prop="accountStatus" :formatter="formatter" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="单边佣金" prop="commission" align="center"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="邀请码" prop="code" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="推荐人ID" prop="parentAccountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" prop="parentAccountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" prop="balance" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="初期规模" prop="allottedScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" prop="cashScale" align="center"></el-table-column>
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
      agentName: "",
      agentId: "",
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
  watch: {},
  created() {
    this.getFundAccount();
  },
  methods: {
    formatter(row, column) {
      if (row) {
        let accountStatus = row.accountStatus;
        switch (accountStatus) {
          case -1:
            return "删除";
          case 0:
            return "失效";
          case 1:
            return "正常";
          case 2:
            return "停机";
        }
      }
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/account/agent/agentList", {
          pageSize: this.pageSize,
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
            this.tableData = new Array(this.pageSize);
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


