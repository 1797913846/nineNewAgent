<!--资金流水-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="operate-btn">
          <div class="search-box1">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="tmbox">
            <el-checkbox v-model="checked">下级</el-checkbox>
          </div>
          <div class="search-box1">
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <el-form :inline="true">
            <div class="selectbox">
              <el-form-item label="类型：">
                <el-select v-model="type" :clearable="true">
                  <el-option v-for="(item,index) in typeList" :key="index" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="selectbox">
              <el-form-item label="标的：">
                <el-select v-model="source" :clearable="true">
                  <el-option v-for="(item,index) in sourceList" :key="index" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <div class="search-boxv">
            <span class="bu"> 从：</span>
            <div class="selectbox">
              <el-date-picker v-model="createTimeStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
              </el-date-picker>
            </div>
            <span class="bu">&nbsp; 至：</span>
            <div class="selectbox">
              <el-date-picker v-model="createTimeEnd" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
              </el-date-picker>
            </div>
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="!nullTable">
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="金额(元)" prop="amount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="类型" :formatter="formattera" prop="type" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="标的" :formatter="formatterb" prop="source" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" prop="remark" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作人" prop="opeartor" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作时间" prop="opeartorTime" align="center"></el-table-column>
        </el-table>
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="nullTable">
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="金额(元)" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="类型" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="标的" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作人" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作时间" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="!nullTable">
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
      checked: false,
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
        { key: "", value: "所有" },
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
        { key: "", value: "所有" },
        { key: 1, value: "账户余额" },
        { key: 2, value: "可用资金" },
        { key: 3, value: "保证金" },
        { key: 4, value: "优先资金" }
      ],
      createTimeStart: "",
      createTimeEnd: ""
    };
  },
  computed: {
    headerCellStyle() {
      return {
        background: "#F3F3F3",
        color: "#586A82",
        "font-size": "12px"
      };
    },
    cellStyle() {
      return {
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
    let allhref = window.location.href;
    if (allhref.indexOf("newbaby") != -1) {
      let getmMatchResult = allhref.match(/newbaby(\S*)~/)[1];
      let data = localStorage.getItem("babyData" + getmMatchResult);
      data = JSON.parse(data);
      this.isAdminGroup = data.isAdminGroup;
    }
    this.createTimeStart = this.getNowFormatDate();
    this.createTimeEnd = this.getNowFormatDate();
    this.getFundAccount();
  },
  methods: {
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/payOrder/fundStream/list/export",
        data: {
          accountCode: this.accountCode,
          queryChild: this.checked,
          accountName: this.accountName,
          type: this.type,
          source: this.source,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd
        }
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
    formattera(row, column) {
      if (row) {
        let type = row.type;
        switch (type) {
          case 1:
            return "充值";
          case 2:
            return "提现";
          case 3:
            return "资金调整";
          case 4:
            return "入金";
          case 5:
            return "出金";
          case 6:
            return "管理费";
          case 7:
            return "佣金转入";
          case 8:
            return "补平亏损";
          case 9:
            return "委托成交";
          case 10:
            return "除息分红";
          case 11:
            return "除权除息税费";
          case 12:
            return "单票免息";
        }
      }
    },
    formatterb(row, column) {
      if (row) {
        let source = row.source;
        switch (source) {
          case 1:
            return "账户余额";
          case 2:
            return "可用资金";
          case 3:
            return "保证金";
          case 4:
            return "优先资金";
        }
      }
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/payOrder/fundStream/list", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          accountCode: this.accountCode,
          queryChild: this.checked,
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


