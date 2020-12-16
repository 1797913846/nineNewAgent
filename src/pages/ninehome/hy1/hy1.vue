<!--会员绑卡信息-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="jiaNow">添加</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入账户" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入开户名" v-model="userName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="!nullTable">
          <el-table-column label="操作" align="center" width="140">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="getEdit(scope.$index,scope.row)" class="addSameClass ">修改</span>
                <span @click.stop="deleteNow(scope.$index, scope.row)" class="addSameClass ">删除</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" width="100" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="银行名称" prop="bankName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="省份名称" prop="provinceName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="城市名称" prop="cityName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="支行名称" prop="subBranchName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="卡号" prop="cardNo" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="开户名" prop="userName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="身份证号" prop="identityNo" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手机号" prop="mobile" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="注册时间" prop="createTime" width="150" align="center"></el-table-column>
        </el-table>
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="nullTable">
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="银行名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="省份名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="城市名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="支行名称" align="center" :formatter="formatter"></el-table-column>
          <el-table-column show-overflow-tooltip label="卡号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="开户名" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="身份证号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手机号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="注册时间" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="!nullTable">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--添加表单-->
    <div class="addForm" v-if="jia==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeJia">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="账户：">
            <el-select v-model="formInline.accountCode">
              <el-option v-for="(item,index) in accountList" :key="index" :label="item.accountId+'~'+item.accountName" :value="item.accountId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行：">
            <el-select v-model="formInline.bankId">
              <el-option v-for="(item,index) in banksList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行省份：">
            <el-select v-model="formInline.provinceId">
              <el-option v-for="(item,index) in provincesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行城市：">
            <el-select v-model="formInline.cityId">
              <el-option v-for="(item,index) in citiesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行支行：">
            <el-select v-model="formInline.subBranchId">
              <el-option v-for="(item,index) in branchesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡号：">
            <el-input v-model="formInline.cardNo" placeholder="卡号"></el-input>
          </el-form-item>
          <el-form-item label="开户名：">
            <el-input v-model="formInline.userName" placeholder="开户名"></el-input>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-input v-model="formInline.identityNo" placeholder="身份证"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmit('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeAdd('formInline')">取消</el-button>
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
          <el-form-item label="账户：">
            <el-select v-model="formInline.accountCode" :disabled="true">
              <el-option v-for="(item,index) in accountList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行：">
            <el-select v-model="formInline.bankId">
              <el-option v-for="(item,index) in banksList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行省份：">
            <el-select v-model="formInline.provinceId">
              <el-option v-for="(item,index) in provincesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行城市：">
            <el-select v-model="formInline.cityId">
              <el-option v-for="(item,index) in citiesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行支行：">
            <el-select v-model="formInline.subBranchId">
              <el-option v-for="(item,index) in branchesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡号：">
            <el-input v-model="formInline.cardNo" placeholder="卡号"></el-input>
          </el-form-item>
          <el-form-item label="开户名：">
            <el-input v-model="formInline.userName" placeholder="开户名"></el-input>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-input v-model="formInline.identityNo" placeholder="身份证"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmitChange('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeChange('formInline')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <alertWindows v-if="deleteBool==true" :deleteTitle="deleteTitle" @childByValue="childByValue1"></alertWindows>
  </div>
</template>

<script>
import topNav from "@/components/topNav";
import alertWindows from "@/components/alertWindows";
export default {
  components: {
    topNav,
    alertWindows
  },
  data() {
    return {
      tableData: [],
      colorBool: false,
      keyword: "",
      accountCode: "",
      userName: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      jia: false,
      addTitle: "添加",
      formInline: {
        accountCode: "",
        bankId: "",
        bankName: "",
        provinceId: "",
        provinceName: "",
        cityId: "",
        cityName: "",
        subBranchId: "",
        subBranchName: "",
        cardNo: "",
        userName: "",
        identityNo: ""
      },
      accountList: [],
      banksList: [],
      provincesList: [],
      citiesList: [],
      branchesList: [],
      bankId: "",
      provinceId: "",
      cityId: "",
      changeNow: false,
      id: "",
      deleteId: "",
      deleteBool: false,
      deleteTitle: "确认删除吗?",
      deleteRight: false
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
    "formInline.bankId": {
      handler(newVal, oldVal) {
        this.getProvincesList();
        this.getCitiesList();
        this.getBranchesList();
      },
      deep: true
    },
    "formInline.provinceId": {
      handler(newVal, oldVal) {
        this.getCitiesList();
        this.getBranchesList();
      },
      deep: true
    },
    "formInline.cityId": {
      handler(newVal, oldVal) {
        this.getBranchesList();
      },
      deep: true
    }
  },
  created() {
    this.getAccountList();
    this.getFundAccount();
    this.getBanksList();
    this.getProvincesList();
    this.getCitiesList();
    this.getBranchesList();
  },
  methods: {
    getAccountList() {
      this.axios
        .post("/tn/mgr-api/account/bankCard/edit-pre")
        .then(res => {
          if (res.data.code == 200) {
            this.accountList = res.data.data.accountList;
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
    //可以
    getBanksList() {
      this.axios
        .post("/tn/mgr-api/account/banks")
        .then(res => {
          if (res.data.code == 200) {
            this.banksList = res.data.data;
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
    getProvincesList() {
      this.axios
        .post("/tn/mgr-api/account/banks/provinces", {
          bankId: this.formInline.bankId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.provincesList = res.data.data;
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
    getCitiesList() {
      this.axios
        .post("/tn/mgr-api/account/banks/provinces/cities", {
          bankId: this.formInline.bankId,
          provinceId: this.formInline.provinceId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.citiesList = res.data.data;
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
    getBranchesList() {
      this.axios
        .post("/tn/mgr-api/account/banks/provinces/cities/branches", {
          bankId: this.formInline.bankId,
          provinceId: this.formInline.provinceId,
          cityId: this.formInline.cityId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.branchesList = res.data.data;
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
    closeJia() {
      this.jia = false;
    },
    formatter(row, column) {
      if (row) {
        let usertype = row.usertype;
        switch (usertype) {
          case 0:
            return "普通户";
          case 1:
            return "担保品";
          case 2:
            return "融资融券";
          default:
            return "未知";
        }
      }
    },
    jiaNow() {
      this.jia = true;
      this.addTitle = "添加";
      this.formInline.accountCode = "";
      this.formInline.bankId = "";
      this.formInline.provinceId = "";
      this.formInline.cityId = "";
      this.formInline.subBranchId = "";
      this.formInline.cardNo = "";
      this.formInline.userName = "";
      this.formInline.identityNo = "";
    },
    closeAdd(formName) {
      this.$refs[formName].resetFields();
      this.jia = false;
    },
    closeChange1() {
      this.changeNow = false;
    },
    getEdit(index, row) {
      this.addTitle = "修改";
      this.changeNow = true;
      let id = row.id;
      this.id = id;
      this.axios
        .post("/tn/mgr-api/account/bankCard", {
          id: id
        })
        .then(res => {
          if (res.data.code == 200) {
            this.formInline = res.data.data;
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
    childByValue1: function(childValue) {
      // childValue就是子组件传过来的值
      this.deleteRight = childValue;
      if (this.deleteRight == true) {
        this.axios
          .post("/tn/mgr-api/account/deleteCard", {
            id: this.deleteId
          })
          .then(res => {
            console.log("getFundAccount>>", res.data);
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
        this.deleteBool = false;
      } else {
        this.deleteBool = false;
      }
    },
    deleteNow(index, row) {
      let id = row.id;
      this.deleteId = id;
      this.deleteBool = true;
    },
    onSubmitChange(formName) {
      //name需要用id去列表取
      this.banksList.map(item => {
        if (this.formInline.bankId == item.value) {
          this.formInline.bankName = item.text;
        }
      });
      this.provincesList.map(item => {
        if (this.formInline.provinceId == item.value) {
          this.formInline.provinceName = item.text;
        }
      });
      this.citiesList.map(item => {
        if (this.formInline.cityId == item.value) {
          this.formInline.cityName = item.text;
        }
      });
      this.branchesList.map(item => {
        if (this.formInline.subBranchId == item.value) {
          this.formInline.subBranchName = item.text;
        }
      });
      this.axios
        .post("/tn/mgr-api/account/bankCard/save", {
          accountCode: this.formInline.accountCode,
          bankId: this.formInline.bankId,
          bankName: this.formInline.bankName,
          provinceId: this.formInline.provinceId,
          provinceName: this.formInline.provinceName,
          cityId: this.formInline.cityId,
          cityName: this.formInline.cityName,
          subBranchId: this.formInline.subBranchId,
          subBranchName: this.formInline.subBranchName,
          cardNo: this.formInline.cardNo,
          userName: this.formInline.userName,
          identityNo: this.formInline.identityNo,
          id: this.id
        })
        .then(res => {
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
    onSubmit(formName) {
      //name需要用id去列表取
      this.banksList.map(item => {
        if (this.formInline.bankId == item.value) {
          this.formInline.bankName = item.text;
        }
      });
      this.provincesList.map(item => {
        if (this.formInline.provinceId == item.value) {
          this.formInline.provinceName = item.text;
        }
      });
      this.citiesList.map(item => {
        if (this.formInline.cityId == item.value) {
          this.formInline.cityName = item.text;
        }
      });
      this.branchesList.map(item => {
        if (this.formInline.subBranchId == item.value) {
          this.formInline.subBranchName = item.text;
        }
      });
      this.axios
        .post("/tn/mgr-api/account/bankCard/save", {
          accountCode: this.formInline.accountCode,
          bankId: this.formInline.bankId,
          bankName: this.formInline.bankName,
          provinceId: this.formInline.provinceId,
          provinceName: this.formInline.provinceName,
          cityId: this.formInline.cityId,
          cityName: this.formInline.cityName,
          subBranchId: this.formInline.subBranchId,
          subBranchName: this.formInline.subBranchName,
          cardNo: this.formInline.cardNo,
          userName: this.formInline.userName,
          identityNo: this.formInline.identityNo
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.jia = false;
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
      this.currentPage = 1;
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/account/bankcardList", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          accountCode: this.accountCode,
          userName: this.userName
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


