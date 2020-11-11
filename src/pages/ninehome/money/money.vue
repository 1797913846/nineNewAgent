<!--资金信息-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
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
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="期初规模" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总资产" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可取资金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票市值" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易冻结资金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手动冻结资金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总盈亏" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="set1(scope.$index, scope.row)" class="addSameClass " style="color:#337ab7;">调整资金</span>
                <span @click.stop="set2(scope.$index, scope.row)" v-if="scope.row.allottedScale <= 0" class="addSameClass " style="color:#f0ad4e;">增配资金</span>
                <span @click.stop="set3(scope.$index, scope.row)" v-if="scope.row.allottedScale > 0" class="addSameClass " style="color:#d9534f;">结案策略</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" prop="balance" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="期初规模" prop="allottedScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总资产" prop="totalScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可取资金" prop="ableTakeoutScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票市值" prop="stockScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="交易冻结资金" prop="lockScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手动冻结资金" prop="freezeScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="总盈亏" prop="profit" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="!nullTable">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
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
            <el-button class="savebt" type="primary" @click="onSubmitChange1('formInline')" v-if="addTitle=='增配资金'">保存</el-button>
            <el-button class="savebt" type="primary" @click="onSubmitChange('formInline')" v-if="addTitle=='调整资金'">保存</el-button>
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
        background: "#F3F3F3",
        "font-size": "12px"
      };
    },
    cellStyle() {
      return {
        "border-bottom": "1px solid #F3F3F3",
        "border-right": "0px",
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
    console.log("是我", this.$route.query);
    this.accountCode = this.$route.query.accountId || "";
    this.getFundAccount();
  },
  methods: {
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
      this.formInline.money = "";
      console.log("我啊", row);
      this.formInline.accountCode = row.accountCode;
      this.formInline.accountName = row.accountName;
      this.formInline.adjustmentType = 3;
    },
    set2(index, row) {
      this.changeNow = true;
      this.addTitle = "增配资金";
      this.formInline.accountCode = row.accountCode;
      this.formInline.financeRatio = 3;
      this.formInline.amount = 0;
    },
    set3(index, row) {
      this.axios
        .post("/tn/mgr-api/account/finishStrategy", {
          accountCode: row.accountCode
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
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
    search() {
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/fund/export",
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
        .post("/tn/mgr-api/account/fund", {
          accountCode: this.accountCode,
          pageSize: this.pageSize,
          pageNo: this.currentPage
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


