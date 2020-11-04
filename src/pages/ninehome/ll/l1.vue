<!--角色管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="showAddNow">添加</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入角色名称" v-model="roleName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search()">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="编号" width="100" prop="roleId" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="角色名称" prop="roleName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="描述" prop="roleDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建人" prop="modifyUser" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建时间" width="200" prop="createTime" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="getContent(scope.$index, scope.row)" class="addSameClass ">修改</span>
                <span @click.stop="deleteNow(scope.$index, scope.row)" class="addSameClass ">删除</span>
                <span class="addSameClass " @click.stop="getSaveRoleRes(scope.$index, scope.row)">权限设置</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="编号" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="角色名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="描述" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建人" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建时间" width="100" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="nullTable==false">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--表单ztree-->
    <div class="addForm" v-if="showAdd==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <span class="tr" @click="closeAdd">X</span>
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="角色名称：">
            <el-input v-model="formInline.roleName" placeholder="角色名称"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="描述：">
            <el-input v-model="formInline.roleDesc" placeholder="描述"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmit('formInline')">保存</el-button>
            <el-button type="primary" @click="closeAdd1('formInline')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="addForm" v-if="sBool==true">
      <div class="addContent addContent2">
        <div class="title">
          <span class="tl">权限设置</span>
          <span class="tr" @click="closeS">X</span>
        </div>
        <el-form :inline="true" class="demo-form-inline">
          <el-tree :data="sdata" show-checkbox default-expand-all node-key="id" :default-checked-keys="checkedbox" ref="tree" highlight-current :props="defaultProps">
          </el-tree>
          <br />
          <el-form-item>
            <el-button type="primary" @click="saveS">保存</el-button>
            <el-button type="primary" @click="closeS">取消</el-button>
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
      roleName: "",
      showAdd: false,
      formInline: {
        roleName: "",
        roleDesc: "",
        roleId: ""
      },
      id: "",
      addTitle: "新增",
      sBool: false,
      sdata: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      checkedbox: [],
      roleId: ""
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
    saveS() {
      console.log(this.$refs.tree.getCheckedKeys());
      let resIds = this.$refs.tree.getCheckedKeys();
      this.axios
        .post("/tn/mgr-api/sysmgr/saveRoleRes", {
          roleId: this.roleId,
          resIds: resIds
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.$alert("修改成功", "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.getFundAccount();
            this.sBool = false;
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
    closeS() {
      this.sBool = false;
    },
    getSaveRoleRes(index, row) {
      this.sBool = true;
      let roleId = row.roleId;
      this.roleId = roleId;
      this.axios
        .post("/tn/mgr-api/sysmgr/roleResSelect", {
          roleId: roleId
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.sdata = res.data.data;
            this.checkedbox = [];
            this.sdata.map(item => {
              if (item.checked == true) {
                this.checkedbox.push(item.id);
              }
            });
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
      this.formInline.roleName = row.roleName;
      this.formInline.roleDesc = row.roleDesc;
      this.formInline.roleId = row.roleId;
      this.addTitle = "修改";
      this.showAdd = true;
    },
    deleteNow(index, row) {
      let roleId = row.roleId;
      this.axios
        .post("/tn/mgr-api/sysmgr/deleteRole", {
          roleId: roleId
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
      this.formInline.roleName = "";
      this.formInline.roleDesc = "";
      this.formInline.roleId = "";
    },
    closeAdd() {
      this.showAdd = false;
    },
    closeAdd1(formName) {
      this.$refs[formName].resetFields();
      this.showAdd = false;
    },
    onSubmit(formName) {
      if (!this.roleId) {
        this.roleId = "";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.axios
            .post("/tn/mgr-api/sysmgr/saveOrUpdateRole", {
              roleName: this.formInline.roleName,
              roleDesc: this.formInline.roleDesc,
              roleId: this.formInline.roleId
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
        .post("/tn/mgr-api/sysmgr/pageQueryRole", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          roleName: this.roleName
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
.addContent2 {
  height: 500px;
  overflow-y: scroll;
}
</style>


