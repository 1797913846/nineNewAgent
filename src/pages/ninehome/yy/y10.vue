<!--持仓变动信息-->
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
          <div class="search-box1">
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box1">
            <input type="text" placeholder="请输入产品编号" v-model="productCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box1">
            <input type="text" placeholder="请输入股票代码" v-model="stockCode" />
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
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券代码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="类型" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作人" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作时间" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券代码" prop="stockCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券名称" prop="stockName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="数量" prop="amount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="类型" prop="type" align="center" :formatter="formatter"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" prop="remark" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作人" prop="opeartor" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作时间" prop="opeartorTime" align="center"></el-table-column>
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
      tableData: [],
      colorBool: false,
      id: "",
      keyword: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      accountCode: "",
      productCode: "",
      stockCode: "",
      financePeriod: "",
      financePeriodList: [
        { key: "day", value: "天" },
        { key: "week", value: "周" },
        { key: "month", value: "月" },
        { key: "single", value: "单" }
      ],
      lastPrice: "",
      setArray: [
        {
          key: 0,
          value: "减少可用资金"
        },
        {
          key: 1,
          value: "增加可用资金"
        },
        {
          key: 2,
          value: "减少账户余额"
        },
        {
          key: 3,
          value: "增加账户余额"
        }
      ],
      changeNow: false,
      addTitle: "调整资金",
      formInline: {
        accountCode: "",
        accountName: "",
        adjustmentType: "",
        money: "",
        remark: "",
        financeRatio: "",
        amount: 0
      },
      type: "",
      typeList: [
        { key: "", value: "所有" },
        { key: 1, value: "委托成交" },
        { key: 2, value: "送股转赠股" },
        { key: 3, value: " 持仓调整" },
        { key: 4, value: " 移仓" }
      ],
      accountName: "",
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
    formatter(row, column) {
      if (row) {
        let type = row.type;
        switch (type) {
          case 1:
            return "委托成交";
          case 2:
            return "送股转赠股";
          case 3:
            return "持仓调整";
          case 4:
            return "移仓";
          default:
            return "所有";
        }
      }
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/holdDetail/export",
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
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/account/holdChange/list", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          accountCode: this.accountCode,
          accountName: this.accountName,
          productCode: this.productCode,
          stockCode: this.stockCode,
          type: this.type,
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


