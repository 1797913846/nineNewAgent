<!--佣金统计-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      
      <div class="template-top">
        <div class="title" @click="setset">批量转账户余额</div>
        <div class="operate-btn">
          <el-form :inline="true">
            <el-form-item label="是否结算：">
              <el-select v-model="isSettled">
                <el-option v-for="(item,index) in isSettledList" :key="index" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结算方式：">
              <el-select v-model="settleType">
                <el-option v-for="(item,index) in settleTypeList" :key="index" :label="item.value" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="search-box1">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box1">
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-boxv">
            <el-date-picker v-model="dealDateStart" type="date">
            </el-date-picker>
            <span>至</span>
            <el-date-picker v-model="dealDateEnd" type="date">
            </el-date-picker>
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总成交金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="佣金总和" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="是否结算" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="结算方式" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="编号" prop="id" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总成交金额" prop="totalCost" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="佣金总和" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日期" prop="dataDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="是否结算" prop="isSettledDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="结算方式" prop="settleTypeDesc" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <div class="addForm" v-if="msg==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">提示信息</span>
          <span class="tr" @click="closeMsg">关闭</span>
        </div>
        <el-form :inline="true" ref="formInline" class="demo-form-inline">
          <span>确认转入账户余额？</span>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmitMsg">保存</el-button>
            <el-button type="primary" @click="closeMsg">取消</el-button>
          </el-form-item>
        </el-form>
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
      isSettled: "",
      isSettledList: [
        {
          key: "",
          value: "所有"
        },
        {
          key: 0,
          value: "否"
        },
        {
          key: 1,
          value: "是"
        }
      ],
      settleType: "",
      settleTypeList: [
        {
          key: "",
          value: "所有"
        },
        {
          key: 1,
          value: "提现"
        },
        {
          key: 2,
          value: "转入可用"
        },
        {
          key: 3,
          value: "转入账户余额"
        }
      ],
      dealDateStart: "2020-10-1",
      dealDateEnd: "2020-10-22",
      productCode: "",
      stockNo: "",
      lastPrice: "",
      changeNow: false,
      addTitle: "调整资金",
      list: [],
      settleType: "",
      msg: false
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
    closeMsg() {
      this.msg = false;
    },
    setset() {
      this.msg = true;
    },
    onSubmitMsg() {
      this.axios
        .post("/tn/mgr-api/account/commission/settle", {
          list: this.list,
          settleType: "BALANCE"
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.msg = false;
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
    handleSelectionChange(val) {
      console.log("勾选的", val);
      this.list=[];
      val.map(item => {
        this.list.push(item.id);
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
    search() {
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/commission/export",
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
        .post("/tn/mgr-api/account/commission", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          isSettled: this.isSettled,
          accountCode: this.accountCode,
          accountName: this.accountName,
          dealDateStart: this.dealDateStart,
          dealDateEnd: this.dealDateEnd,
          settleType: this.settleType
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
</style>


