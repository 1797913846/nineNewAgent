<!--资金方案配置-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="addNow">添加</div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="融资周期" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="递延周期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资倍率" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资费率" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="利润分成比例" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="建仓费率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线比率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="平仓线比率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="个股持仓比率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创业板持仓比率" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板持仓比率" width="100" align="center"></el-table-column>
        </el-table>
      </div>
      <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
        <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
        <el-table-column show-overflow-tooltip label="融资周期" width="100" prop="financePeriod" :formatter="formatter1" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="递延周期" prop="financePeriod" :formatter="formatter" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="融资倍率" prop="financeRatio" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="融资费率" prop="financeFeeRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="利润分成比例" width="100" prop="separateFeeRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="建仓费率" width="100" prop="makeFeeRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="警戒线比率" width="100" prop="cordonLineRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="平仓线比率" width="100" prop="flatLineRate" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="个股持仓比率" width="100" prop="positionRatio" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="创业板持仓比率" width="100" prop="secondBoardPositionRatio" align="center"></el-table-column>
        <el-table-column show-overflow-tooltip label="科创板持仓比率" width="100" prop="thirdBoardPositionRatio" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="operation">
              <span @click.stop="getContent(scope.$index, scope.row)">修改</span>
              <span @click.stop="deleteNow(scope.$index, scope.row)">删除</span>
              <span v-if="scope.row.isDefault==0" @click.stop="setIt(scope.$index, scope.row)">应用到用户</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
    </div>
    <!--表单-->
    <div class="addForm" v-if="showAdd==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <span class="tr" @click="closeAdd">X</span>
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="融资周期：">
            <el-select v-model="formInline.financePeriod">
              <el-option label="天" value="day"></el-option>
              <el-option label="周" value="week"></el-option>
              <el-option label="月" value="month"></el-option>
              <el-option label="单" value="single"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="融资倍率：">
            <el-input v-model="formInline.financeRatio" placeholder="融资倍率"></el-input>
          </el-form-item>
          <el-form-item label="融资费率：">
            <el-input v-model="formInline.financeFeeRate" placeholder="融资费率"></el-input>
          </el-form-item>

          <el-form-item label="建仓费率：">
            <el-input v-model="formInline.makeFeeRate" placeholder="建仓费率"></el-input>
          </el-form-item>
          <el-form-item label="利润分成比例：">
            <el-input v-model="formInline.separateFeeRate" :disabled="addTitle=='修改'" placeholder="利润分成比例"></el-input>
          </el-form-item>
          <el-form-item label="警戒线比率：">
            <el-input v-model="formInline.cordonLineRate" placeholder="警戒线比率"></el-input>
          </el-form-item>
          <el-form-item label="平仓线比率：">
            <el-input v-model="formInline.flatLineRate" placeholder="平仓线比率"></el-input>
          </el-form-item>
          <el-form-item label="个股持仓比率：">
            <el-input v-model="formInline.positionRatio" placeholder="个股持仓比率"></el-input>
          </el-form-item>
          <el-form-item label="创业板持仓比率：">
            <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比率"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比率：">
            <el-input v-model="formInline.thirdBoardPositionRatio" placeholder="科创板持仓比率"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmit('formInline')">保存</el-button>
            <el-button type="primary" @click="closeAdd1('formInline')">取消</el-button>
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
      keyword: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      id: "",
      showAdd: false,
      addTitle: "修改",
      formInline: {
        financePeriod: "", //融资周期
        financeRatio: "", //融资倍率
        separateFeeRate: "", //分成比例
        makeFeeRate: "", //建仓费率
        financeFeeRate: "", //融资费率
        cordonLineRate: "", //警戒线比率
        flatLineRate: "", //平仓线比率
        positionRatio: "", //个股持仓比率
        secondBoardPositionRatio: "", //创业板持仓比率
        thirdBoardPositionRatio: "" //科创板持仓比率
      }
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
    // keyword: {
    //   handler(newVal, oldVal) {
    //     this.currentPage = 1;
    //     this.getFundAccount();
    //   },
    //   deep: true
    // }
  },
  created() {
    this.getFundAccount();
  },
  methods: {
    closeAdd1(formName) {
      this.$refs[formName].resetFields();
      this.showAdd = false;
    },
    closeAdd() {
      this.showAdd = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.axios
            .post("/tn/mgr-api/tntg/financeScheme/saveOrUpdate", {
              id: this.id,
              financePeriod: this.formInline.financePeriod, //融资周期
              financeRatio: this.formInline.financeRatio, //融资倍率
              separateFeeRate: this.formInline.separateFeeRate, //分成比例
              makeFeeRate: this.formInline.makeFeeRate, //建仓费率
              financeFeeRate: this.formInline.financeFeeRate, //融资费率
              cordonLineRate: this.formInline.cordonLineRate, //警戒线比率
              flatLineRate: this.formInline.flatLineRate, //平仓线比率
              positionRatio: this.formInline.positionRatio, //个股持仓比率
              secondBoardPositionRatio: this.formInline
                .secondBoardPositionRatio, //创业板持仓比率
              thirdBoardPositionRatio: this.formInline.thirdBoardPositionRatio //科创板持仓比率
            })
            .then(res => {
              console.log("getFundAccount>>", res.data);
              if (res.data.code == 200) {
                this.showAdd = false;
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addNow() {
      this.showAdd = true;
      this.addTitle = "新增";
      this.formInline.financePeriod = "";
      this.formInline.financeRatio = "";
      this.formInline.financeFeeRate = "";
      this.formInline.makeFeeRate = "";
      this.formInline.separateFeeRate = "";
      this.formInline.cordonLineRate = "";
      this.formInline.flatLineRate = "";
      this.formInline.positionRatio = "";
      this.formInline.secondBoardPositionRatio = "";
      this.formInline.thirdBoardPositionRatio = "";
      this.id = "";
    },
    getContent(index, row) {
      this.id = row.id;
      this.axios
        .get("/tn/mgr-api/tntg/financeScheme/getById", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            let data = res.data.data;
            this.showAdd = true;
            this.addTitle = "修改";
            this.formInline.financePeriod = data.financePeriod; //融资周期
            this.formInline.financeRatio = data.financeRatio; //融资倍率
            this.formInline.financeFeeRate = data.financeFeeRate; //融资费率
            this.formInline.makeFeeRate = data.makeFeeRate; //建仓费率
            this.formInline.separateFeeRate = data.separateFeeRate; //分成比例
            this.formInline.cordonLineRate = data.cordonLineRate; //警戒线比率
            this.formInline.flatLineRate = data.flatLineRate; //平仓线比率
            this.formInline.positionRatio = data.positionRatio; //个股持仓比率
            this.formInline.secondBoardPositionRatio =
              data.secondBoardPositionRatio; //创业板持仓比率
            this.formInline.thirdBoardPositionRatio =
              data.thirdBoardPositionRatio; //科创板持仓比率
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setIt(index, row) {
      console.log(222);
      console.log("13点", index, row);
      this.id = row.id;
      this.axios
        .post("/tn/mgr-api/tntg/financeScheme/applyToUser", {
          id: this.id
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            // this.getFundAccount();
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
    deleteNow(index, row) {
      console.log(222);
      console.log("13点", index, row);
      this.id = row.id;
      this.axios
        .post("/tn/mgr-api/tntg/financeScheme/delete", {
          id: this.id
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
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
    formatter(row, column) {
      if (row) {
        let financePeriod = row.financePeriod;
        switch (financePeriod) {
          case "day":
            return "T+1";
          case "week":
            return "T+7";
          case "month":
            return "T+30";
          case "single":
            return "T+5";
          default:
            return "T+0";
        }
      }
    },
    formatter1(row, column) {
      if (row) {
        let financePeriod = row.financePeriod;
        switch (financePeriod) {
          case "day":
            return "天";
          case "week":
            return "周";
          case "month":
            return "月";
          case "single":
            return "单";
          default:
            return "默认";
        }
      }
    },
    refresh() {
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/tntg/financeScheme/list", {
          pageSize: this.pageSize,
          pageNo: this.currentPage
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
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

          console.log("我是最终结果", this.tableData);
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
  height: 590px;
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


