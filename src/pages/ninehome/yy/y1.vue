<!--持仓信息-->
<template>
  <div class="bigestbox">
    <topNav v-if="whoserouter =='/ninehome/y1'"></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" v-if="pathQuery" @click="back">返回</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box selects">
            <!-- <input type="text" placeholder="请输入产品编号" v-model="productCode" /> -->
            <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入产品编号" @select="handleSelect" clearable @clear="clearCode"></el-autocomplete>
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入股票代码" v-model="stockNo" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="620" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用数量" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="参考成本" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="市价" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="参考盈亏" align="center"></el-table-column>
        </el-table>
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="620" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="set1(scope.$index, scope.row)" style="margin-left:20px;text-decoration: underline;color:#d9534f;">平仓</span>
                <span @click.stop="removeSet(scope.$index, scope.row)" style="margin-left:20px;text-decoration: underline;color:#d9534f;">移仓</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" prop="stockCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" prop="stockName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="持仓数量" prop="stockCnt" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用数量" prop="stockCntAble" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="参考成本" prop="costPrice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="市价" prop="lastPrice" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="参考盈亏" prop="profit" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="tongji">
          <span>总持仓数量 : {{ext.stockCnt }}</span>
          <span>总参考盈亏 : {{ext.profit }}</span>
          <span>总持仓金额（市值）: {{ext.lastPrice }}</span>
        </div>
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
          <el-form-item label="平仓价格：">
            <el-input v-model="lastPrice" placeholder="平仓价格"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmitChange1('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeChange('formInline')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="addForm" v-if="removeBool==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">移仓</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeRemove">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline">
          <el-form-item label="证券代码：">
            <el-input v-model="formInline.stockCodeRemove" placeholder="证券代码" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户：">
            <el-input v-model="formInline.accountCodeRemove" placeholder="用户" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="原产品编号：">
            <el-input v-model="formInline.srcProductIdRemove" placeholder="券商类型" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="目标产品编号：" prop="dstProductIdRemove">
            <el-select v-model="formInline.dstProductIdRemove">
              <el-option v-for="(item,index) in dstProductIdRemoveList" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可用数量：">
            <el-input v-model="formInline.transferCountRemove1" placeholder="可用数量" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="移仓数量：">
            <el-input v-model="formInline.transferCountRemove" placeholder="移仓数量"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" class="savebt" @click="onSubmitRmove">保存</el-button>
            <el-button type="primary" class="nobt" @click="closeRemove">取消</el-button>
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
      restaurants: [],
      state: "",
      timeout: null,
      accountCode1: "",
      productCode1: "",
      whoserouter: "",
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
      stockNo: "",
      stockCode: "",
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
        amount: 0,
        accountCodeRemove: "",
        stockCodeRemove: "",
        srcProductIdRemove: "",
        dstProductIdRemove: "",
        transferCountRemove: ""
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
      ],
      pathQuery: "",
      queryData: {},
      dstProductIdRemoveList: [],
      removeBool: false,
      rules: {
        dstProductIdRemove: [
          { required: true, message: "请选择目标产品编号", trigger: "change" }
        ]
      }
    };
  },
  props: {
    accountId: {
      type: String,
      default: ""
    }
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
    },
    accountId: {
      handler(newVal, oldVal) {
        this.accountCode = newVal;
        this.getFundAccount();
      },
      deep: true
    }
  },
  created() {
    this.pathQuery = this.$route.query.from || "";
    this.queryData = this.$route.query.queryData || "";
    this.accountCode = this.$route.query.accountId || this.accountId || "";
    this.whoserouter = this.$route.path;
    console.log("是我啊", this.queryData);
    this.getFundAccount();
    this.getList();
  },
  mounted() {},
  methods: {
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      console.log("数据啊", results);
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      console.log("数据666", queryString);
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log("是我啊", item);
      if (JSON.stringify(item) != "{}") {
        this.productCode = item.key;
      } else {
        this.productCode = "";
      }
    },
    clearCode() {
      this.productCode = "";
    },
    getList() {
      this.axios
        .post("/tn/mgr-api/productInfo/list", {
          pageSize: 0,
          pageNo: 1
        })
        .then(res => {
          let data = res.data.data.rows;
          let newdata = [];
          data.map((item, index) => {
            newdata.push({
              value: item.productcode + "~~" + item.productname,
              address: item.productname,
              key: item.productcode
            });
          });
          this.restaurants = newdata;
          console.log("我是数组", this.restaurants);
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      console.log("是他啊", this.queryData);
      this.$router.push({
        path: this.pathQuery,
        query: {
          queryData: this.queryData
        }
      });
    },
    getSummaries(param) {
      console.log("是我", param);
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "当前页统计";
          return;
        }
        if (
          column.property != "accountCode" &&
          column.property != "accountName" &&
          column.property != "productCode" &&
          column.property != "stockCode" &&
          column.property != "stockName" &&
          column.property != "stockCntAble" &&
          column.property != "costPrice"
        ) {
          console.log("列", column);
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index];
          } else {
            sums[index] = " ";
          }
        }
      });
      let newsums = sums.map(item => {
        console.log(typeof item);
        if (typeof item == "number") {
          item = item.toFixed(2);
        }
        return item;
      });
      // console.log('是我',sums)
      return newsums;
    },
    closeRemove() {
      this.formInline.dstProductIdRemove = "";
      this.removeBool = false;
    },
    onSubmitRmove() {
      if (
        Number(this.formInline.transferCountRemove) >
        Number(this.formInline.transferCountRemove1)
      ) {
        this.$alert("移仓数量大于可用数量", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      } else {
        this.axios
          .post("/tn/mgr-api/account/transferHold", {
            accountCode: this.formInline.accountCodeRemove,
            stockCode: this.formInline.stockCodeRemove,
            srcProductId: this.formInline.srcProductIdRemove,
            dstProductId: this.formInline.dstProductIdRemove,
            transferCount: this.formInline.transferCountRemove
          })
          .then(res => {
            console.log("getFundAccount>>", res.data);
            if (res.data.code == 200) {
              this.$alert(res.data.info, "提示", {
                confirmButtonText: "确定",
                center: true,
                type: "success"
              });
              this.removeBool = false;
              // this.getFundAccount();
              this.search();
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
    closeChange1() {
      this.changeNow = false;
    },
    onSubmitChange1(formName) {
      this.axios
        .post("/tn/mgr-api/itg/appoint/CLOSE", {
          accountCode: this.accountCode1,
          productCode: this.productCode1,
          stockCode: this.stockCode,
          appointPrice: this.lastPrice
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
            // this.getFundAccount();
            this.search();
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
      this.addTitle = "请输入平仓价格，默认以市价平仓";
      // this.formInline.accountCode = row.accountCode;
      // this.productCode = row.productCode;
      this.accountCode1 = row.accountCode;
      this.productCode1 = row.productCode;
      this.stockCode = row.stockCode;
      this.lastPrice = row.lastPrice;
    },
    removeSet(index, row) {
      this.removeBool = true;
      this.formInline.dstProductIdRemove = "";
      this.formInline.accountCodeRemove = row.accountCode;
      this.formInline.stockCodeRemove = row.stockCode;
      this.formInline.srcProductIdRemove = row.productCode;
      this.formInline.transferCountRemove = row.stockCnt;
      this.formInline.transferCountRemove1 = row.stockCntAble;
      this.getDstProductIdRemoveList();
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/hold/export",
        data: {
          accountCode: this.accountCode,
          productCode: this.productCode,
          stockNo: this.stockNo,
          pageNo: -1
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
    getDstProductIdRemoveList() {
      this.axios
        .post("/tn/mgr-api/productInfo/productIdList", {
          accountCode: this.formInline.accountCodeRemove
        })
        .then(res => {
          this.dstProductIdRemoveList = res.data.data.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/account/hold", {
          accountCode: this.accountCode,
          productCode: this.productCode,
          stockNo: this.stockNo,
          pageSize: this.pageSize,
          pageNo: this.currentPage
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

<style lang="scss">
.selects .el-input__inner {
  height: 35px !important;
  border: 0px !important;
}
</style>


