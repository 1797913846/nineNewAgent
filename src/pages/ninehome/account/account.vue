<!--分账户监管-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">刷新</div>
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
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span>资金</span>
                <span>持仓</span>
                <span>平仓</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="序号" width="100" prop="serial" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="母账户ID" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="子账户名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" prop="cashScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="借款额" prop="borrowing" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="期初金额" prop="allottedScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总资产" prop="totalScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏额" prop="profit" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈亏率" prop="profitRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数" prop="stockCnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票市值" prop="stockScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓率%" prop="stockRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线" prop="cordonLineDiff" align="center"></el-table-column>
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

<style lang="scss" scoped>
</style>


