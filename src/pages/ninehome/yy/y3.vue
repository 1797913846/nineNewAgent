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
          <el-form :inline="true">
            <div class="selectbox">
              <el-form-item label="买卖方向：">
                <el-select v-model="subtype">
                  <el-option v-for="(item,index) in subtypeList" :key="index" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <!--搜索框-->
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入委托编号" v-model="orderno" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div style="width:300px;float:left;margin-top:10px;" v-if="topActive == 1">
            <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(item,index) in entruststatusListList" :key="index" :label="item.key">{{item.value}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="search-boxv" v-if="topActive == 2">
            <div class="selectbox">
              <el-date-picker v-model="createTimeStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
              </el-date-picker>
            </div>
            <span class="bu">至</span>
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
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="委托时间" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托编号" width="160" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托PK" width="160" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" width="160" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" width="160" align="center"></el-table-column>
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
          <el-table-column label="操作" align="center" width="180" v-if="topActive==1">
            <template slot-scope="scope">
              <div class="operation" v-if="scope.row.entruststatus != 'E'">
                <span v-if="scope.row.entruststatus!= 8 && scope.row.entruststatus!= 6 && scope.row.entruststatus!= 5" @click.stop="set1(scope.$index, scope.row)" class="addSameClass " style="color:#f0ad4e;">修改</span>
                <span v-if="scope.row.entruststatus!= 6 && scope.row.entruststatus!= 8 && scope.row.entruststatus!= 5" @click.stop="set2(scope.$index, scope.row)" class="addSameClass " style="color:#d9534f;">撤单</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="委托时间" align="center" width="220">
            <template slot-scope="scope">
              <div class="operation">
                <span>{{scope.row.orderDateDesc}} {{scope.row.orderTimeDesc}}</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="委托时间" width="220" prop="orderDateDesc" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="委托编号" width="140" prop="orderno" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="委托PK" width="140" prop="pkorder" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" width="140" prop="productcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" width="140" prop="accountcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" width="140" prop="accountName" align="center"></el-table-column>
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
    <div class="addForm" v-if="msg==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">信息</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeMsg">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <span class="lmsg">pk : {{formInline.pkorder}}确认是否撤销该笔委托？</span>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmitMsg">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeMsg">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--修改表单-->
    <div class="addForm" v-if="changeNow==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeChange1">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="委托编号：">
            <el-input v-model="formInline.orderno" placeholder="委托编号"></el-input>
          </el-form-item>
          <el-form-item label="买卖方向：">
            <el-select v-model="formInline.subtype" :disabled="true">
              <el-option v-for="(item,index) in subtypeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员ID：">
            <el-input v-model="formInline.accountCode" :disabled="true" placeholder="会员ID"></el-input>
          </el-form-item>
          <el-form-item label="股票代码：">
            <el-input v-model="formInline.stockno" :disabled="true" placeholder="股票代码"></el-input>
          </el-form-item>
          <el-form-item label="委托数量：">
            <el-input v-model="formInline.stockcnt" :disabled="true" placeholder="委托数量"></el-input>
          </el-form-item>
          <el-form-item label="委托价格：">
            <el-input v-model="formInline.entrustprice" :disabled="true" placeholder="委托价格"></el-input>
          </el-form-item>
          <el-form-item label="成交数量：">
            <el-input v-model="formInline.dealcnt" placeholder="成交数量"></el-input>
          </el-form-item>
          <el-form-item label="成交价格：">
            <el-input v-model="formInline.dealavrprice" placeholder="成交价格"></el-input>
          </el-form-item>
          <el-form-item label="委托状态：">
            <el-select v-model="formInline.updateEntruststatus">
              <el-option v-for="(item,index) in updateEntruststatusList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmitChange('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeChange('formInline')">取消</el-button>
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
      subtypeList: [
        { key: 1, value: "买入" },
        { key: 2, value: "卖出" },
        { key: "", value: "所有" }
      ],
      queryChild: "",
      accountName: "",
      orderno: "",
      entruststatusList: "",
      entruststatusListList: [
        {
          key: "S,0,1,2,3,4,7,W,C",
          value: "委托可撤"
        },
        {
          key: "9,A,O,E",
          value: "委托失败"
        },
        {
          key: "S",
          value: "委托延迟"
        }
      ],
      formInline: {
        pkorder: "",
        orderno: "",
        subtype: "",
        accountcode: "",
        stockno: "",
        stockcnt: "",
        entrustprice: "",
        dealcnt: "",
        dealavrprice: "",
        updateEntruststatus: ""
      },
      updateEntruststatusList: [
        { key: 5, value: "部成已撤" },
        { key: 6, value: "已撤" },
        { key: 8, value: "已成" },
        { key: 9, value: "废单" }
      ],
      checkList: [],
      createTimeStart: "",
      createTimeEnd: "",
      topActive: 1,
      changeNow: false,
      addTitle: "调整资金",
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
    // topActive: {
    //   handler(newVal, oldVal) {
    //     this.currentPage = 1;
    //     this.getFundAccount();
    //   },
    //   deep: true
    // }
  },
  created() {
    this.createTimeStart = this.getNowFormatDate();
    this.createTimeEnd = this.getNowFormatDate();
    if (this.topActive == 1) {
      this.getFundAccount("today");
    } else {
      this.getFundAccount();
    }
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
    closeChange1() {
      this.changeNow = false;
    },
    closeMsg() {
      this.msg = false;
    },
    onSubmitChange(formName) {
      this.axios
        .post("/tn/mgr-api/itg/orderCtrl/UPDATE", {
          pkorder: this.formInline.pkorder,
          orderno: this.formInline.orderno,
          dealcnt: this.formInline.dealcnt,
          dealavrprice: this.formInline.dealavrprice,
          updateEntruststatus: this.formInline.updateEntruststatus
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
            this.getFundAccount("today");
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
    onSubmitMsg() {
      this.axios
        .post("/tn/mgr-api/history/entrustCancel", {
          appointPkOrder: this.formInline.pkorder
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
            this.getFundAccount("today");
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
      this.addTitle = "修改";
      this.formInline.pkorder = row.pkorder;
      this.formInline.orderno = row.orderno;
      this.formInline.subtype = row.subtype;
      this.formInline.accountcode = row.accountcode;
      this.formInline.stockno = row.stockno;
      this.formInline.stockcnt = row.stockcnt;
      this.formInline.entrustprice = row.entrustprice;
      this.formInline.dealcnt = row.dealcnt;
      this.formInline.dealavrprice = row.dealavrprice;
      this.formInline.updateEntruststatus = row.entruststatusDesc;
    },
    set2(index, row) {
      this.msg = true;
      this.formInline.pkorder = row.pkorder;
      this.formInline.orderno = row.orderno;
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
        url = "/tn/mgr-api/history/entrustCurrent/export";
        options = {
          subtype: this.subtype,
          accountcode: this.accountCode,
          queryChild: this.queryChild,
          accountName: this.accountName,
          orderno: this.orderno,
          entruststatusList: this.entruststatusList
        };
      } else {
        url = "/tn/mgr-api/history/entrustHistory/export";
        options = {
          subtype: this.subtype,
          accountcode: this.accountCode,
          queryChild: this.queryChild,
          accountName: this.accountName,
          orderno: this.orderno,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd
        };
      }
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: url,
        data: options
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
          accountcode: this.accountCode,
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
          accountcode: this.accountCode,
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
          console.log("我是数据", this.tableData, this.nullTable);
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
.addContent .lmsg {
  font-size: 16px;
  color: #000;
  display: inline-block;
  margin-left: 44px;
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
  padding-bottom: 10px;
}
.topactive {
  border-bottom: 2px solid #2662ee;
}
</style>


