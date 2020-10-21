<!--委托信息-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="navNav">
      <span :class="{topactive:topActive==1}" @click="activeNow(1)">当日委托</span>
      <span :class="{topactive:topActive==2}" @click="activeNow(2)">历史委托</span>
    </div>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
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
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="委托时间" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托PK" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托价格" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交均价" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手续费" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="发生金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买卖方向" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托状态" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注信息" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="set1(scope.$index, scope.row)">修改</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="委托时间" prop="orderDateDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托编号" prop="orderno" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托PK" prop="pkorder" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" prop="productcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" prop="stockno" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" prop="stockName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托价格" prop="entrustprice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托数量" prop="stockcnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交数量" prop="dealcnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交均价" prop="dealavrprice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交金额" prop="dealAmount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手续费" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="发生金额" prop="happenAmount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="买卖方向" prop="subtypeDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托状态" prop="entruststatusDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注信息" prop="memo" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="nullTable==false">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--修改表单-->
    <div class="addForm" v-if="changeNow==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <span class="tr" @click="closeChange1">关闭</span>
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="会员ID：">
            <el-input v-model="formInline.accountCode" :disabled="true" placeholder="会员ID"></el-input>
          </el-form-item>
          <el-form-item label="会员名称：">
            <el-input v-model="formInline.accountName" :disabled="true" placeholder="会员名称"></el-input>
          </el-form-item>
          <el-form-item label="调整类型：" v-if="addTitle=='调整资金'">
            <el-select v-model="formInline.adjustmentType">
              <el-option v-for="(item,index) in setArray" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额：" v-if="addTitle=='调整资金'">
            <el-input v-model="formInline.money" placeholder="金额"></el-input>
          </el-form-item>
          <el-form-item label="备注：" v-if="addTitle=='调整资金'">
            <el-input v-model="formInline.remark" placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item label="策略倍数：" v-if="addTitle=='增配资金'">
            <el-select v-model="formInline.financeRatio">
              <el-option v-for="(item,index) in financeRatioList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="劣后资金：" v-if="addTitle=='增配资金'">
            <el-input v-model="formInline.amount" placeholder="劣后资金"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmitChange1('formInline')">保存</el-button>
            <el-button type="primary" @click="closeChange('formInline')">取消</el-button>
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
      order: "",
      subtype: "",
      queryChild: "",
      accountName: "",
      orderno: "",
      entruststatusList: "",
      createTimeStart: "2020-10-21",
      createTimeEnd: "2020-10-21",
      topActive: 1,
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
      ]
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
    this.getFundAccount("today");
  },
  methods: {
    activeNow(num) {
      this.topActive = num;
      if (num == 1) {
        this.getFundAccount("today");
      } else if (num == 2) {
        this.getFundAccount();
      }
    },
    closeChange1() {
      this.changeNow = false;
    },
    onSubmitChange1(formName) {
      this.axios
        .post("/tn/mgr-api/account/deposit", {
          accountCode: this.formInline.accountCode,
          amount: this.formInline.amount,
          financeRatio: this.formInline.financeRatio
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
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
    onSubmitChange(formName) {
      this.axios
        .post("/tn/mgr-api/account/adjustment", {
          accountCode: this.formInline.accountCode,
          accountName: this.formInline.accountName,
          adjustmentType: this.formInline.adjustmentType,
          money: this.formInline.money,
          remark: this.formInline.remark
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
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
    closeChange(formName) {
      this.$refs[formName].resetFields();
      this.changeNow = false;
    },
    set1(index, row) {
      this.changeNow = true;
      this.addTitle = "调整资金";
      console.log("我啊", row);
      this.formInline.accountCode = row.accountCode;
      this.formInline.accountName = row.accountName;
      this.formInline.adjustmentType = 3;
    },
    search() {
      this.getFundAccount();
    },
    exportExcel() {
      let url;
      if (this.topActive == 1) {
        url = "/tn/mgr-api/history/entrustCurrent/export";
      } else {
        url = "/tn/mgr-api/history/entrustHistory/export";
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
        url = "/tn/mgr-api/history/entrustCurrent";
        options = {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          order: this.order,
          subtype: this.subtype,
          accountCode: this.accountCode,
          queryChild: this.queryChild,
          accountName: this.accountName,
          orderno: this.orderno,
          entruststatusList: this.entruststatusList
        };
      } else {
        url = "/tn/mgr-api/history/entrustHistory";
        options = {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          order: this.order,
          subtype: this.subtype,
          accountCode: this.accountCode,
          queryChild: this.queryChild,
          accountName: this.accountName,
          orderno: this.orderno,
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


