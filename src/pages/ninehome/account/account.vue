<!--分账户监管-->
<template>
  <div class="bigestbox jiankong">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="refresh">刷新</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle" :row-class-name="tableRowClassName">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="money(scope.$index,scope.row)" class="addSameClass " style="color:#337ab7;">资金</span>
                <span @click.stop="y1(scope.$index,scope.row)" class="addSameClass " style="color:#f0ad4e;">持仓</span>
                <span @click.stop="ping(scope.$index, scope.row)" v-if="(scope.row.totalScale - scope.row.cordonLine) < 0 || (scope.row.totalScale - scope.row.flatLine) < 0" class="addSameClass " style="color:#d9534f;">平仓</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column show-overflow-tooltip label="母账户ID" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户名称" prop="accountName" align="center" width="150"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" prop="cashScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="借款额" prop="borrowing" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="期初金额" prop="allottedScale" align="center" width="100" sortable></el-table-column>
          <el-table-column show-overflow-tooltip label="总资产" prop="totalScale" align="center" width="100" sortable></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏额" prop="profit" align="center" width="100" sortable></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏率" prop="profitRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数" prop="stockCnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票市值" prop="stockScale" align="center" width="100" sortable></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center" width="100" sortable></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓率%" prop="stockRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线(差额)" prop="cordonLineDiff" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="平仓线(差额)" prop="flatLineDiff" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="风控提示" prop="riskTip" align="center" sortable></el-table-column>
          <el-table-column show-overflow-tooltip label="账户状态" prop="statusDesc" align="center"></el-table-column>
        </el-table>
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
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      accountCode: ""
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
    tableRowClassName({ row, rowIndex }) {
      console.log("对的是我", row);
      if (row["totalScale"] - row["flatLine"] <= 0) {
        return "yellow";
      } else if (row["totalScale"] - row["cordonLine"] <= 0) {
        return "red";
      }
      return "colorgreen";
    },
    ping(index, row) {
      this.axios
        .post("/tn/mgr-api/account/closePosition", {
          accountCode: row.accountCode
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.$alert("平仓成功", "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.changeNow = false;
            this.getFundAccount();
          } else {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    money(index, row) {
      let accountId = row.accountId;
      this.$router.push({
        path: "/ninehome/money",
        query: {
          accountId: accountId
        }
      });
    },
    y1(index, row) {
      let accountId = row.accountId;
      this.$router.push({
        path: "/ninehome/y1",
        query: {
          accountId: accountId
        }
      });
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/risk/management/export",
        data: {}
      }).then(
        res => {
          var disposition = res.headers["content-disposition"];
          console.log("我是名字", decodeURI(disposition));
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
    search() {
      this.getFundAccount();
    },
    refresh() {
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/risk/management/list", {
          accountCode: this.accountCode
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

<style lang="scss">
.el-table .colorgreen {
  background-color: #dff0d8 !important;
}
.el-table .yellow {
  background-color: #fcf8e3 !important;
}
.el-table .red {
  background-color: #f2dede !important;
}
.jiankong .el-table--striped .el-table__body tr td {
  background: none !important;
}
</style>


