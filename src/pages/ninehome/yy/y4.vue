<!--成交信息-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="navNav">
      <span :class="{topactive:topActive==1}" @click="activeNow(1)">当日成交</span>
      <span :class="{topactive:topActive==2}" @click="activeNow(2)">历史成交</span>
    </div>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="operate-btn">
          <el-form :inline="true">
            <el-form-item label="买卖方向：">
              <el-select v-model="bstype">
                <el-option v-for="(item,index) in subtypeList" :key="index" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!--搜索框-->
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="accountcode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入成交编号" v-model="dealno" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-boxv" v-if="topActive == 2">
            <el-date-picker v-model="createTimeStart" type="date">
            </el-date-picker>
            <span>至</span>
            <el-date-picker v-model="createTimeEnd" type="date">
            </el-date-picker>
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="母账户编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交时间" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买卖方向" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交均价" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托编号" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="母账户编号" prop="productcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交时间" prop="dealtimeDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" prop="stockno" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" prop="stockName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买卖方向" prop="bstypeDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交数量" prop="dealcnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交均价" prop="dealprice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交金额" prop="dealAmount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交编号" prop="dealno" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托编号" prop="orderno" align="center"></el-table-column>
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
      accountcode: "",
      accountName: "",
      dealno: "",
      order: "",
      bstype: "",
      subtypeList: [
        { key: "1", value: "买入" },
        { key: "2", value: "卖出" },
        { key: "", value: "所有" }
      ],
      queryChild: "",
      checkList: [],
      createTimeStart: "2020-10-21",
      createTimeEnd: "2020-10-21",
      topActive: 1,
      changeNow: false,
      addTitle: "调整资金"
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
    topActive: {
      handler(newVal, oldVal) {
        this.currentPage = 1;
        this.getFundAccount();
      },
      deep: true
    }
  },
  created() {
    if (this.topActive == 1) {
      this.getFundAccount("today");
    } else {
      this.getFundAccount();
    }
  },
  methods: {
    handleCheckedCitiesChange(value) {
      this.entruststatusList = value.join(",");
      console.log("最终的", this.entruststatusList);
    },
    activeNow(num) {
      this.topActive = num;
      if (num == 1) {
        this.getFundAccount("today");
      } else if (num == 2) {
        this.getFundAccount();
      }
    },
    search() {
      if (this.topActive == 1) {
        this.getFundAccount("today");
      } else {
        this.getFundAccount();
      }
    },
    exportExcel() {
      let url;
      if (this.topActive == 1) {
        url = "/tn/mgr-api/history/dealCurrent/export";
      } else {
        url = "/tn/mgr-api/history/dealHistory/export";
      }
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: url,
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
    getFundAccount(who) {
      let url, options;
      if (who == "today") {
        url = "/tn/mgr-api/history/dealCurrent";
        options = {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          bstype: this.bstype,
          accountcode: this.accountcode,
          accountName: this.accountName,
          dealno: this.dealno
        };
      } else {
        url = "/tn/mgr-api/history/dealHistory";
        options = {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          bstype: this.bstype,
          accountcode: this.accountcode,
          accountName: this.accountName,
          dealno: this.dealno,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd
        };
      }
      this.axios
        .post(url, options)
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
.addForm {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
}
.addContent {
  background-color: #fff;
  width: 500px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
  padding-left: 10px;
  padding-right: 10px;
}
.addContent .title {
  border-bottom: 1px solid #ccc;
  color: #000;
  font-size: 18px;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 20px;
  overflow: hidden;
}
.addContent .title .tl {
  float: left;
}
.addContent .title .tr {
  float: right;
  cursor: pointer;
}
.navNav {
  margin-left: 24px;
  margin-top: 20px;
}
.navNav span {
  display: inline-block;
  font-size: 16px;
  width: 100px;
  color: #586880;
  text-align: center;
  cursor: pointer;
}
.topactive {
  border-bottom: 2px solid #2662ee;
}
</style>


