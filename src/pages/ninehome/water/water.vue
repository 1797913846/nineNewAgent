<!--资金流水-->
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
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <el-form :inline="true">
            <el-form-item label="类型：">
              <el-select v-model="type">
                <el-option v-for="(item,index) in typeList" :key="index" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标的：">
              <el-select v-model="source">
                <el-option v-for="(item,index) in sourceList" :key="index" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="search-boxv">
            <span>开始：</span>
            <el-date-picker v-model="createTimeStart" type="date">
            </el-date-picker>
            <span>结束：</span>
            <el-date-picker v-model="createTimeEnd" type="date">
            </el-date-picker>
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="金额(元)" prop="amount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="类型" prop="type" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="标的" prop="source" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" prop="remark" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作人" prop="opeartor" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作时间" prop="opeartorTime" align="center"></el-table-column>
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
      tableData: [],
      colorBool: false,
      proId: "",
      proName: "",
      account: "",
      keyword: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      isAdminGroup: false,
      accountCode: "",
      accountName: "",
      type: "",
      typeList: [
        { key: 1, value: "充值" },
        { key: 2, value: "提现" },
        { key: 3, value: "资金调整" },
        { key: 4, value: "入金" },
        { key: 5, value: "出金" },
        { key: 6, value: "管理费" },
        { key: 7, value: "佣金转入" },
        { key: 8, value: "补平亏损" },
        { key: 9, value: "委托成交" },
        { key: 10, value: "除息分红" },
        { key: 11, value: "除权除息税费" },
        { key: 12, value: "单票免息" }
      ],
      source: "",
      sourceList: [
        { key: 1, value: "账户余额" },
        { key: 2, value: "可用资金" }
      ],
      createTimeStart: "",
      createTimeEnd: ""
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
    this.isAdminGroup = localStorage.getItem("isAdminGroup");
    this.getFundAccount();
  },
  methods: {
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/payOrder/fundStream/list/export",
        data: {}
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
    formatter(row, column) {
      if (row) {
        let commission = row.commission;
        switch (commission) {
          case "-1.00":
            return "-";
        }
      }
    },
    search() {
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/payOrder/fundStream/list", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          accountCode: this.accountCode,
          accountName: this.accountName,
          type: this.type,
          source: this.source,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd
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


