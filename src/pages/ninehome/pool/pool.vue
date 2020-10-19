<!--资金池管理-->
<template>
  <div class="bigestbox pool">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="add">新增</div>
        <!-- <div class="title" style="margin-left:10px;">编辑</div> -->
        <!-- <div class="title" style="margin-left:10px;" @click="deleteAll">删除</div> -->
        <div class="operate-btn">
          <!-- <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="id" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入会员名称" v-model="name" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box1">
            <el-select v-model="value1" placeholder="请选择审核状态" :clearable="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-box1">
            <el-date-picker v-model="value2" type="date">
            </el-date-picker>
          </div>
          <div class="search-user">查询</div> -->
          <!-- <div class="search-user">导出</div> -->
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle" @selection-change="handleSelectionChange">
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="getEdit(scope.$index,scope.row)">修改</span>
                <span @click.stop="deleteNow(scope.$index, scope.row)">删除</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="分组名称" prop="groupName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金账户" prop="productCodes" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--新增-->
    <div class="addForm" v-if="addBool==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="分组名称：">
            <el-input v-model="levelName" placeholder="分组名称"></el-input>
          </el-form-item>
          <div class="codebox">
            <span class="codetitle">资金账号：</span>
            <div class="checkbox">
              <el-checkbox-group v-model="checkList" align="left">
                <el-checkbox v-for="(item,index) in productList" :key="index" :label="item.productcode">{{item.productname}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="buybox" v-if="accountGroup.length>0">
            <div class="buytitle">买入优先级：</div>
            <div class="buycontent">
              <el-table :border="true" :highlight-current-row="colorBool" :data="accountGroup" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="accountGroup.length>0">
                <el-table-column label="序号" align="center" width="100">
                  <template slot-scope="scope">
                    <div class="operation">
                      <span>{{scope.row.priority}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label="资金账号" prop="productCode" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="180">
                  <template slot-scope="scope">
                    <div class="operation">
                      <span @click.stop="set1(scope.$index,scope.row)">保存</span>
                      <span @click.stop="set2(scope.$index, scope.row)">修改</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <br />
          <el-form-item>
            <el-button type="primary" @click="saveNow('formInline')">{{addTitle}}</el-button>
            <el-button type="primary" @click="closeadd('formInline')">取消</el-button>
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
      value1: "",
      value2: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      tableData: [],
      colorBool: false,
      keyword: "",
      id: "",
      name: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      groupId: [],
      addTitle: "新增",
      groupId: 0,
      addBool: false,
      productPool: "",
      productList: "",
      checkList: [],
      levelName: "",
      formInline: {},
      accountGroup: [],
      realAccountGroup: []
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
    checkList: {
      handler(newVal, oldVal) {
        if (this.addTitle == "新增") {
          this.accountGroup = [];
          newVal.map(item => {
            this.accountGroup.push({
              priority: 0,
              productCode: item
            });
          });
        } else if (this.addTitle == "修改") {
          // newVal.map(item => {
          //   this.accountGroup.push({
          //     priority: 0,
          //     productCode: item
          //   });
          // });
        }
      },
      deep: true
    },
    accountGroup: {
      handler(newVal, oldVal) {
        console.log("我新的", newVal);
      },
      deep: true
    }
  },
  created() {
    this.getFundAccount();
  },
  methods: {
    add() {
      this.addBool = true;
      this.getContent(0);
      this.addTitle = "新增";
    },
    set1(index, row) {
      console.log("是我", index, row);
      this.realAccountGroup.push(row);
    },
    set2(index, row) {},
    closeadd(formName) {
      this.$refs[formName].resetFields();
      this.addBool = false;
    },
    saveNow(formName) {
      console.log("我被勾中了", this.checkList);
      if (this.checkList.length <= 0) {
        this.$alert("必须勾选资金账号", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      } else {
        if (this.realAccountGroup.length <= 0) {
          this.$alert("请先保存买入优先级", "提示", {
            confirmButtonText: "确定",
            center: true,
            type: "error"
          });
        } else {
          let url, options;
          if (this.addTitle == "新增") {
            url = "tn/mgr-api/fund-pool/save";
            options = {
              groupName: this.levelName,
              accountGroup: this.realAccountGroup
            };
          } else if (this.addTitle == "修改") {
            url = "/tn/mgr-api/fund-pool/update";
            options = {
              groupId: this.groupId,
              groupName: this.levelName,
              accountGroup: this.realAccountGroup
            };
          }
          this.axios
            .post(url, options)
            .then(res => {
              if (res.data.code == 200) {
                this.$alert(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  center: true,
                  type: "success"
                });
                this.getFundAccount();
                this.addBool = false;
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
      }
    },
    //单个查询
    getContent(groupId) {
      this.axios
        .post("/tn/mgr-api/fund-pool/detail", {
          groupId: groupId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.productPool = res.data.data.productPool;
            this.productList = res.data.data.productList;
            this.realAccountGroup = [];
            this.accountGroup = [];
            this.checkList = [];
            //修改时候如果是选中的，那复选框就得勾选上
            this.productList.map(item => {
              if (item.fundPoolChecked == 1) {
                this.checkList.push(item.productcode);
              }
            });
            this.productPool.accountGroup.map(item => {
              this.realAccountGroup.push({
                priority: item.priority,
                productCode: item.productCode
              });
              this.accountGroup.push({
                priority: item.priority,
                productCode: item.productCode
              });
            });
            console.log(
              "我是修改的啊",
              this.accountGroup,
              this.accountGroup.length
            );
            // this.realAccountGroup = this.productPool;
            this.levelName = this.productPool.groupName;
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
      console.log(val);
      let groupIdList = [];
      val.map(item => {
        groupIdList.push(item.groupId);
      });
      this.groupId = groupIdList;
    },
    getEdit(index, row) {
      this.addBool = true;
      let groupId = row.groupId;
      this.getContent(groupId);
      this.addTitle = "修改";
    },
    deleteNow(index, row) {
      let groupId = row.groupId;
      this.axios
        .post("/tn/mgr-api/fund-pool/delete", {
          groupId: groupId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "sucess"
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
    deleteAll() {
      if (this.groupId.length <= 0) {
        this.$alert("请先勾选资金池", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      } else {
        this.axios
          .post("/tn/mgr-api/fund-pool/delete", {
            groupId: this.groupId
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$alert(res.data.info, "提示", {
                confirmButtonText: "确定",
                center: true,
                type: "sucess"
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
      }
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/fund-pool/list", {
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
  height: 700px;
  overflow-y: scroll;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
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
.codebox {
}
.codetitle {
  font-size: 12px;
  color: #606266;
}
.checkbox {
  width: 390px;
}
.checkbox * {
  color: #606266;
}
.buybox {
  margin-top: 30px;
}
.buybox .buytitle {
  font-size: 12px;
  color: #606266;
}
.buycontent {
}
</style>
<style>
.pool .el-checkbox + .el-checkbox {
  margin-left: 0px !important;
  margin-right: 30px;
}
.pool .el-checkbox {
  margin-right: 30px;
}
</style>



