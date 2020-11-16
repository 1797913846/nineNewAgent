<!--操作日志-->
<template>
    <div class="bigestbox">
        <topNav></topNav>
        <div class="container" @click="colorBool = false">
            <div class="template-top">
                <div class="operate-btn">
                    <div class="search-box">
                        <input type="text" placeholder="请输入操作账号" v-model="accountCode" />
                        <img src="../../../assets/nine/search.png" class="search-img" />
                    </div>
                    <div class="selectbox">
                        <el-form :inline="true">
                            <el-form-item label="操作类型：">
                                <el-select v-model="type" clearable>
                                    <el-option v-for="(item,index) in typesList" :key="index" :label="item.key" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="search-boxv">
                        <span class="bu"> 从：</span>
                        <div class="selectbox">
                            <el-date-picker v-model="createTimeStart" type="date" format="yyyy-MM-dd" value-format="timestamp">
                            </el-date-picker>
                        </div>
                        <span class="bu">&nbsp; 至：</span>
                        <div class="selectbox">
                            <el-date-picker v-model="createTimeEnd" type="date" format="yyyy-MM-dd" value-format="timestamp">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="search-user" @click="search">查询</div>
                </div>
            </div>
            <!--表格-->
            <div class="reset-scroll-style">
                <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column show-overflow-tooltip label="ID" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作账号" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作类型" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作内容" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作时间" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="IP地址" align="center"></el-table-column>
                </el-table>
                <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column show-overflow-tooltip label="ID" prop="id" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作账号" prop="accountCode" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作类型" prop="optTypeStr" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作内容" prop="optContent" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作时间" prop="optTime" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="IP地址" prop="optIp" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="pagination" v-if="nullTable==false">
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
      accountName: "",
      agentAccountCode: "",
      stockNo: "",
      buyOrderNo: "",
      sellOrderNo: "",
      financePeriod: "",
      financePeriodList: [
        { key: "day", value: "天" },
        { key: "week", value: "周" },
        { key: "month", value: "月" },
        { key: "single", value: "单" }
      ],
      createTimeStart: null,
      createTimeEnd: null,
      productCode: "",

      lastPrice: "",
      addTitle: "调整资金",
      financeRatioList: [
        {
          key: 3,
          value: "3倍"
        },
        {
          key: 5,
          value: "5倍"
        },
        {
          key: 6,
          value: "6倍"
        },
        {
          key: 8,
          value: "8倍"
        }
      ],
      type: "",
      types: [],
      typesList: []
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
    this.getTypesList();
    this.getFundAccount();
  },
  methods: {
    getTypesList() {
      this.axios
        .post("/tn/mgr-api/opt-log/search-pre")
        .then(res => {
          if (res.data.code == 200) {
            this.typesList = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
    formattera(row, column) {
      return row["dealAmountBuy"] + row["dealAmountSell"];
    },
    formatterb(row, column) {
      return (
        row["profitRebate"] + row["managerRebate"] + row["commissionRebate"]
      );
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/agent/settle/infoList/export",
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
      console.log("时间", this.createTimeStart, this.createTimeEnd);
      this.types = [];
      if (this.type) {
        this.types.push(this.type);
      }
      if (!this.createTimeStart) {
        this.createTimeStart = null;
      }
      if (!this.createTimeEnd) {
        this.createTimeEnd = null;
      }
      this.axios
        .post("/tn/mgr-api/opt-log/list", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          accountCode: this.accountCode,
          types: this.types,
          startTime: this.createTimeStart,
          endTime: this.createTimeEnd
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


