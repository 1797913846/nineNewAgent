<!--佣金统计-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">

      <div class="template-top">
        <div class="title" @click="setset" style="padding-left:5px;padding-right:5px;">批量转账户余额</div>
        <div class="operate-btn">
          <el-form :inline="true">
            <div class="selectbox">
              <el-form-item label="是否结算：">
                <el-select v-model="isSettled" :clearable="true">
                  <el-option v-for="(item,index) in isSettledList" :key="index" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="selectbox">
              <el-form-item label="结算方式：">
                <el-select v-model="settleType" :clearable="true">
                  <el-option v-for="(item,index) in settleTypeList" :key="index" :label="item.value" :value="item.key"></el-option>
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
          <div class="search-boxv">
            <span class="bu"> 从：</span>
            <div class="selectbox">
              <el-date-picker v-model="dealDateStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
              </el-date-picker>
            </div>
            <span class="bu">&nbsp; 至：</span>
            <div class="selectbox">
              <el-date-picker v-model="dealDateEnd" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
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
          <el-table-column show-overflow-tooltip label="编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总成交金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="佣金总和" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="是否结算" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="结算方式" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="编号" prop="id" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总成交金额" prop="totalCost" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="佣金总和" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日期" prop="dataDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="是否结算" prop="isSettledDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="结算方式" prop="settleTypeDesc" :formatter="formatter" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="nullTable==false">
        <div class="tongji">
          <span>佣金总和 : {{ext.totalCommissionCnt	}}</span>
        </div>
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <div class="addForm" v-if="msg==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">提示信息</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeMsg">
        </div>
        <el-form :inline="true" ref="formInline" class="demo-form-inline">
          <span style="color:#586982;font-size:16px;margin:34px;">确认转入账户余额？</span>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmitMsg">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeMsg">取消</el-button>
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
      ext:{},
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
      dealDateStart: "",
      dealDateEnd: "",
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
    this.dealDateStart = this.getNowFormatDate();
    this.dealDateEnd = this.getNowFormatDate();
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
    closeMsg() {
      this.msg = false;
    },
    setset() {
      this.msg = true;
    },
    onSubmitMsg() {
      if (this.list.length <= 0) {
        this.$alert("请先勾选需要处理的数据", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      } else {
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
      }
    },
    handleSelectionChange(val) {
      console.log("勾选的", val);
      this.list = [];
      val.map(item => {
        this.list.push(item.id);
      });
    },
    formatter(row, column) {
      if (row) {
        let settleTypeDesc = row.settleTypeDesc;
        switch (settleTypeDesc) {
          case 1:
            return "提现";
            break;
          case 2:
            return "转入可用";
            break;
          case 3:
            return "转入账户余额";
            break;
          default:
            return "所有";
            break;
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
        url: "/tn/mgr-api/account/commission/export",
        data: {
          isSettled: this.isSettled,
          accountCode: this.accountCode,
          accountName: this.accountName,
          dealDateStart: this.dealDateStart,
          dealDateEnd: this.dealDateEnd,
          settleType: this.settleType
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
              this.ext=res.data.data.ext;
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


