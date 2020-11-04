<!--公告管理-->
<template>
    <div class="bigestbox">
        <topNav></topNav>
        <div class="container" @click="colorBool = false">
            <div class="template-top">
                <div class="title" @click="showAddNow">添加</div>
                <div class="operate-btn">
                    <div class="search-box">
                        <input type="text" placeholder="请输入标题" v-model="title" />
                        <img src="../../../assets/nine/search.png" class="search-img" />
                    </div>
                    <div class="search-user" @click="search()">查询</div>
                </div>
            </div>
            <!--表格-->
            <div class="reset-scroll-style">
                <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column show-overflow-tooltip label="标题" prop="title" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="更新时间" prop="createTime" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="操作" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span @click.stop="getContent(scope.$index, scope.row)" class="addSameClass ">修改</span>
                                <span @click.stop="deleteNow(scope.$index, scope.row)" class="addSameClass ">删除</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column show-overflow-tooltip label="标题" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="更新时间" align="center"></el-table-column>
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
                    <span class="tr" @click="closeAdd">X</span>
                </div>
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                    <el-form-item label="标题：">
                        <el-input v-model="formInline.title" placeholder="标题"></el-input>
                    </el-form-item>
                    <br />
                    <el-form-item label="内容：">
                        <el-input v-model="formInline.content" placeholder="内容"></el-input>
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
      cfgName: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      title: "",
      roleName: "",
      showAdd: false,
      formInline: {
        title: "",
        content: ""
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
      this.formInline.title = row.title;
      this.formInline.content = row.content;
      this.id = row.id;
      this.addTitle = "修改";
      this.showAdd = true;
    },
    deleteNow(index, row) {
      let id = row.id;
      this.axios
        .post("/tn/mgr-api/sysmgr/bulltinMgr/delete", {
          id: id
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
      this.formInline.title = "";
      this.formInline.content = "";
    },
    closeAdd() {
      this.showAdd = false;
    },
    closeAdd1(formName) {
      this.$refs[formName].resetFields();
      this.showAdd = false;
    },
    onSubmit(formName) {
      if (!this.id) {
        this.id = "";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.axios
            .post("/tn/mgr-api/sysmgr/bulltinMgr/save", {
              id: this.id,
              title: this.formInline.title,
              content: this.formInline.content
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
        .post("/tn/mgr-api/sysmgr/bulltinList", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          title: this.title
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
.addContent {
  background-color: #fff;
  width: 400px;
  height: 260px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
  padding-left: 10px;
  padding-right: 10px;
}
.addContent .smallTitle {
  margin-bottom: 10px;
  color: #000;
  font-size: 20px;
}
.addContent .bt {
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
}
</style>


