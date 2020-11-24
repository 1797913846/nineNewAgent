<!--分账户监管-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="refresh">刷新</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入股票代码" v-model="stockCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>

      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table jiankong" style="width:98.4%;background-color:#ffffff;" height="700" :cell-style="cellStyle" :header-cell-style="headerCellStyle" :row-class-name="tableRowClassName" :default-sort="{prop: 'riskTip', order: 'desc'}" @sort-change="sortChange" v-if="nullTable==false">
          <el-table-column label="操作" width="130" align="center">
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
          <el-table-column show-overflow-tooltip label="子账户ID" prop="accountCode" align="center" width="130"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户名称" prop="accountName" align="center" width="150"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" prop="cashScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="借款额" prop="borrowing" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="期初金额" prop="allottedScale" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="总资产" prop="totalScale" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏额" prop="profit" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏率" prop="profitRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数" prop="stockCnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票市值" prop="stockScale" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓率%" prop="stockRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线(差额)" prop="cordonLineDiff" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="平仓线(差额)" prop="flatLineDiff" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="风控提示" prop="riskTip" align="center" sortable="custom" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户状态" prop="statusDesc" align="center"></el-table-column>
        </el-table>
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="700" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="nullTable==true">
          <el-table-column show-overflow-tooltip label="母账户ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户ID" align="center" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户名称" align="center" width="150"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="借款额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="期初金额" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="总资产" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏额" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏率" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票市值" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" align="center" width="100" sortable="custom"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓率%" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线(差额)" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="平仓线(差额)" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="风控提示" align="center" sortable="custom" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户状态" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
    <myAlert :whotitle="whotitle" :visible="visible" :accountId="accountId" @childByValue="childByValue"></myAlert>
  </div>
</template>

<script>
import topNav from "@/components/topNav";
import myAlert from "@/components/mydialog";
export default {
  components: {
    topNav,
    myAlert
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
      accountCode: "",
      sort: "riskTip",
      order: "desc",
      stockCode: "",
      whotitle: "",
      visible: false,
      accountId: ""
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
    this.getFundAccount();
  },
  methods: {
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      this.visible = childValue;
    },
    sortChange({ column, prop, order }) {
      console.log("排序", column, prop, order);
      this.sort = prop;
      if (this.order == "desc") {
        this.order = "asc";
      } else {
        this.order = "desc";
      }
      this.getFundAccount();
    },
    tableRowClassName({ row, rowIndex }) {
      if (row["totalScale"] - row["flatLine"] <= 0) {
        return "colorgreen";
      } else if (row["totalScale"] - row["cordonLine"] <= 0) {
        return "yellow";
      }
      return "red";
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
      console.log("钱", row);
      let accountId = row.accountCode;
      this.$router.push({
        path: "/ninehome/money",
        query: {
          accountId: accountId
        }
      });
    },
    y1(index, row) {
      let accountId = row.accountCode;
      this.accountId = accountId;
      this.whotitle = "持仓信息";
      this.visible = true;
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/risk/management/export",
        data: {
          accountCode: this.accountCode,
          stockCode: this.stockCode,
          sort: this.sort,
          order: this.order
        }
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
      this.sort = "";
      this.order = "";
      this.currentPage = 1;
      this.getFundAccount();
    },
    refresh() {
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/risk/management/list", {
          accountCode: this.accountCode,
          stockCode: this.stockCode,
          sort: this.sort,
          order: this.order
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

          console.log("是否显示", this.nullTable);
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
.jiankong .el-table__body tr td {
  background: none !important;
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: none !important;
}
.maxnow {
  background: transparent;
  border: 0px;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  position: absolute;
  right: 40px;
  top: 7px;
}
.maxnow1 {
  right: 60px;
}
</style>
<style>
.el-dialog .el-dialog__header {
  background-color: rgba(233, 239, 243, 0.21)!important;
}
.el-dialog .el-dialog__body {
  background-color: #fff!important;
}
.my-dialog-title {
  color: #333 !important;
}
.el-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #333 !important;
}
.shouldwidth {
  overflow: scroll;
  width: 100%;
  height: 100%;
}
.shouldwidth .container {
  margin: 0px !important;
}
</style>


