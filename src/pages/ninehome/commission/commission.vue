<!--佣金方案配置-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="showAddNow">添加</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入方案名称" v-model="cfgName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search()">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="方案名称" width="100" prop="cfgName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日结方案" prop="dayCommission" :formatter="formattera" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="合作分成方案" width="420" prop="singleCommission" :formatter="formatterb" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="月结方案" prop="monthCommission" :formatter="formatterc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="用户注册默认" width="100" prop="isDefault" :formatter="formatter" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="getContent(scope.$index, scope.row)" class="addSameClass ">修改</span>
                <span @click.stop="deleteNow(scope.$index, scope.row)" class="addSameClass ">删除</span>
                <span v-if="scope.row.isDefault==0" @click.stop="setIt(scope.$index, scope.row)" class="addSameClass ">置为默认</span>
                <span v-if="scope.row.isDefault==1" class="addSameClass ">默认方案</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="方案名称" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日结方案" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="合作分成方案" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="月结方案" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="用户注册默认" width="100" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="nullTable==false">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--表单-->
    <div class="addForm" v-if="showAdd==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeAdd">
        </div>
        <el-form :inline="true" :model="formInline" :rules="rules" ref="formInline" class="demo-form-inline">
          <div class="bt">
            <el-form-item label="方案名称：" prop="cfgName">
              <el-input v-model="formInline.cfgName" placeholder="方案名称"></el-input>
            </el-form-item>
          </div>
          <div class="bt">
            <div class="smallTitle">日结方案：</div>
            <el-form-item label="交易佣金率：" prop="dayCommission">
              <el-input v-model="formInline.dayCommission" placeholder="交易佣金率"></el-input>
            </el-form-item>
            <el-form-item label="管理费成交率：" prop="dayManageFeeDealRate" class="smallfont">
              <el-input v-model="formInline.dayManageFeeDealRate" placeholder="管理费成交率"></el-input>
            </el-form-item>
          </div>
          <div class="bt">
            <div class="smallTitle">合作分成方案：</div>
            <el-form-item label="交易佣金率：" prop="singleCommission">
              <el-input v-model="formInline.singleCommission" placeholder="交易佣金率"></el-input>
            </el-form-item>
            <el-form-item label="管理费成交率：" prop="singleManageFeeDealRate" class="smallfont">
              <el-input v-model="formInline.singleManageFeeDealRate" placeholder="管理费成交率"></el-input>
            </el-form-item>
            <el-form-item label="盈利分成成交率：" prop="singleDividedRate" class="smallfont">
              <el-input v-model="formInline.singleDividedRate" placeholder="盈利分成成交率"></el-input>
            </el-form-item>
          </div>
          <div class="bt btlast">
            <div class="smallTitle">月结方案：</div>
            <el-form-item label="交易佣金率：" prop="monthCommission">
              <el-input v-model="formInline.monthCommission" placeholder="交易佣金率"></el-input>
            </el-form-item>
            <el-form-item label="管理费成交率：" prop="monthManageFeeDealRate" class="smallfont">
              <el-input v-model="formInline.monthManageFeeDealRate" placeholder="管理费成交率"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmit('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeAdd1('formInline')">取消</el-button>
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
      cfgName: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,

      showAdd: false,
      formInline: {
        cfgName: "",
        dayCommission: "",
        dayManageFeeDealRate: "",
        singleCommission: "",
        singleManageFeeDealRate: "",
        singleDividedRate: "",
        monthCommission: "",
        monthManageFeeDealRate: ""
      },
      rules: {
        cfgName: [
          { required: true, message: "请输入方案名称", trigger: "blur" }
        ],
        dayCommission: [
          { required: true, message: "请输入交易佣金率", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        dayManageFeeDealRate: [
          { required: true, message: "请输入管理费成交率", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        singleCommission: [
          { required: true, message: "请输入交易佣金率", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        singleManageFeeDealRate: [
          { required: true, message: "请输入管理费成交率", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        singleDividedRate: [
          { required: true, message: "请输入盈利分成成交率", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        monthCommission: [
          { required: true, message: "请输入交易佣金率", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        monthManageFeeDealRate: [
          { required: true, message: "请输入管理费成交率", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ]
      },
      id: "",
      addTitle: "新增"
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
    // cfgName: {
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
    formattera(row, column) {
      return (
        "交易佣金率：" +
        row.dayCommission * 1000 +
        "‰ ; 管理费成交率：" +
        row.dayManageFeeDealRate * 100 +
        "%"
      );
    },
    formatterb(row, column) {
      return (
        "交易佣金率：" +
        row.singleCommission * 1000 +
        "‰ ; 管理费成交率：" +
        row.singleManageFeeDealRate * 100 +
        "% ; +盈利分成成交率：" +
        row.singleDividedRate * 100 +
        "%"
      );
    },
    formatterc(row, column) {
      return (
        "交易佣金率：" +
        row.monthCommission * 1000 +
        "‰ ; 管理费成交率：" +
        row.monthManageFeeDealRate * 100 +
        "%"
      );
    },
    getContent(index, row) {
      this.id = row.id;
      this.axios
        .get("/tn/mgr-api/commissionCfgs/getById", {
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
            this.id = data.id;
            this.formInline.id = data.id;
            this.formInline.cfgName = data.cfgName;
            this.formInline.dayCommission = data.dayCommission;
            this.formInline.dayManageFeeDealRate = data.dayManageFeeDealRate;
            this.formInline.singleCommission = data.singleCommission;
            this.formInline.singleManageFeeDealRate =
              data.singleManageFeeDealRate;
            this.formInline.singleDividedRate = data.singleDividedRate;
            this.formInline.monthCommission = data.monthCommission;
            this.formInline.monthManageFeeDealRate =
              data.monthManageFeeDealRate;
          } else {
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
        .post("/tn/mgr-api/commissionCfgs/delete", {
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
    setIt(index, row) {
      console.log(222);
      console.log("13点", index, row);
      this.id = row.id;
      this.axios
        .post("/tn/mgr-api/commissionCfgs/markAsDefault", {
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
    showAddNow() {
      this.addTitle = "新增";
      this.showAdd = true;
    },
    closeAdd() {
      this.showAdd = false;
    },
    closeAdd1(formName) {
      this.$refs[formName].resetFields();
      this.showAdd = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.axios
            .post("/tn/mgr-api/commissionCfgs/saveOrUpdate", {
              id: this.formInline.id,
              cfgName: this.formInline.cfgName,
              dayCommission: this.formInline.dayCommission,
              dayManageFeeDealRate: this.formInline.dayManageFeeDealRate,
              singleCommission: this.formInline.singleCommission,
              singleManageFeeDealRate: this.formInline.singleManageFeeDealRate,
              singleDividedRate: this.formInline.singleDividedRate,
              monthCommission: this.formInline.monthCommission,
              monthManageFeeDealRate: this.formInline.monthManageFeeDealRate
            })
            .then(res => {
              console.log("getFundAccount>>", res.data);
              if (res.data.code == 200) {
                this.showAdd = false;
                this.getFundAccount();
              } else {
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("提交信息错误");
          return false;
        }
      });
    },
    formatter(row, column) {
      if (row) {
        if (row.isDefault == 0) {
          return "否";
        } else if (row.isDefault == 1) {
          return "是";
        }
      }
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/commissionCfgs/pageQuery", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          cfgName: this.cfgName
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
.addContent .smallTitle {
  margin-bottom: 10px;
  color: #586982;
  font-size: 14px;
  font-weight: bold;
}

.addContent .bt {
  margin-bottom: 15px;
  border-bottom: 1px solid #ededed;
  margin-left: 44px;
  margin-right: 44px;
}

.addContent .btlast {
  border-bottom: 0px;
}
</style>
<style>
.addForm .bt .el-input__inner {
  width: 317px;
}
.addForm .bt .el-form-item__label {
  margin-left: 0px;
}
</style>



