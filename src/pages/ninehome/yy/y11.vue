<!--交割单信息-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="operate-btn">
          <el-form :inline="true">
            <div class="selectbox">
              <el-form-item label="买卖方向：">
                <el-select v-model="bstype" :clearable="true">
                  <el-option v-for="(item,index) in bstypeList" :key="index" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <div class="search-box1">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box1">
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box1">
            <input type="text" placeholder="请输入委托编号" v-model="orderno" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>>
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
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="母账户ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托日期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托时间" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="分账户ID" width="140" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="分账户名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买卖方向" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托价" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交均价" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易佣金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="印花税" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="过户费" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="其他费用" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="结算金额" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="母账户ID" prop="productcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托日期" prop="orderDateDesc" width="140" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托时间" prop="orderTimeDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="分账户ID" prop="accountcode" width="140" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="分账户名称" prop="accountName" width="140" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" prop="stockno" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" prop="stockName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买卖方向" prop="subtypeDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托编号" prop="orderno" width="140" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托价" prop="entrustprice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托数量" prop="stockcnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交数量" prop="dealcnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交均价" prop="dealavrprice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交金额" prop="dealAmount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易佣金" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="印花税" prop="stamp" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="过户费" prop="transferFee" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="其他费用" prop="otherFee" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="结算金额" prop="deliverAmount" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="tongji">
          <span>合计买卖总金额买卖总数量 : {{ext.totalDealAmount }}</span>
          <span>合计买卖总数量 : {{ext.totalDealCnt }}</span>
          <span>总买入数量 : {{ext.sumBuyDealCnt }}</span>
          <span>总买入手续费 : {{ext.sumBuyCommission }}</span>
          <span>总买入发生金额 : {{ext.sumBuyDealAmount }}</span>
          <span>总卖出数量 : {{ext.sumSellDealCnt }}</span>
          <span>总卖出手续费 : {{ext.sumSellCommission }}</span>
          <span>总卖出发生金额 : {{ext.sumSellDealAmount }}</span>
        </div>
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
      ext: {},
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
        { key: 3, value: " 持仓调整" }
      ],
      bstype: "",
      bstypeList: [
        { key: "", value: "所有" },
        { key: "1", value: "买入" },
        { key: "2", value: "卖出" }
      ],
      orderno: "",
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
        return (
          Math.round(
            (row["lastPrice"] - row["preCost"]) * row["allottedCnt"] * 100
          ) / 100
        );
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
        url: "/tn/mgr-api/risk/deliverOrder/export",
        data: {
          subtype: this.bstype,
          accountcode: this.accountCode,
          accountName: this.accountName,
          orderno: this.orderno,
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
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/risk/deliverOrder", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          subtype: this.bstype,
          accountcode: this.accountCode,
          accountName: this.accountName,
          orderno: this.orderno,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd
        })
        .then(res => {
          if (res.data.code == 200) {
            let rows = res.data.data.rows;
            if (rows.length > 0) {
              this.tableData = res.data.data.rows;
              this.ext = res.data.data.ext;
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


