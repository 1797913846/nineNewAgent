<!--券商管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="jiaNow">添加</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入券商名称" v-model="brokername" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="getEdit(scope.$index,scope.row)" class="addSameClass ">修改</span>
                <span @click.stop="deleteNow(scope.$index, scope.row)" class="addSameClass ">删除</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="券商编号" prop="brokerid" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商名称" prop="brokername" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商类型" prop="brokertype" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="登录模式" prop="loginflag" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户端版本号" prop="clientversion" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="营业部标识" prop="deptid" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="成交类型" prop="calcdealstype" align="center" :formatter="formatter1"></el-table-column>
          <el-table-column show-overflow-tooltip label="协议类型" prop="productssl" align="center" :formatter="formatter2"></el-table-column>
          <el-table-column show-overflow-tooltip label="IP地址" prop="ipaddress" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="端口号" prop="ipport" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
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
        <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline">
          <el-form-item label="券商编码：" prop="brokerid">
            <el-input v-model="formInline.brokerid" placeholder="券商编码"></el-input>
          </el-form-item>
          <el-form-item label="券商名称：" prop="brokername">
            <el-input v-model="formInline.brokername" placeholder="券商名称"></el-input>
          </el-form-item>
          <el-form-item label="券商类型：" prop="brokertype">
            <el-input v-model="formInline.brokertype" placeholder="券商类型"></el-input>
          </el-form-item>
          <el-form-item label="登录模式：" prop="loginflag">
            <el-input v-model="formInline.loginflag" placeholder="登录模式"></el-input>
          </el-form-item>
          <el-form-item label="客户端版本号：" prop="clientversion">
            <el-input v-model="formInline.clientversion" placeholder="客户端版本号"></el-input>
          </el-form-item>
          <el-form-item label="营业部标识：" prop="deptid">
            <el-input v-model="formInline.deptid" placeholder="营业部标识"></el-input>
          </el-form-item>
          <el-form-item label="成交类型：" prop="calcdealstype">
            <el-select v-model="formInline.calcdealstype">
              <el-option v-for="(item,index) in calcdealstypeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="协议类型：" prop="productssl">
            <el-select v-model="formInline.productssl">
              <el-option v-for="(item,index) in productsslList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP地址：" prop="ipaddress">
            <el-input v-model="formInline.ipaddress" placeholder="IP地址"></el-input>
          </el-form-item>
          <el-form-item label="端口：" prop="ipport">
            <el-input v-model="formInline.ipport" placeholder="端口"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" class="savebt" @click="onSubmit('formInline')">保存</el-button>
            <el-button type="primary" class="nobt" @click="closeAdd('formInline')">取消</el-button>
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
        <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline">
          <el-form-item label="券商编码：" prop="brokerid">
            <el-input v-model="formInline.brokerid" placeholder="券商编码"></el-input>
          </el-form-item>
          <el-form-item label="券商名称：" prop="brokername">
            <el-input v-model="formInline.brokername" placeholder="券商名称"></el-input>
          </el-form-item>
          <el-form-item label="券商类型：" prop="brokertype">
            <el-input v-model="formInline.brokertype" placeholder="券商类型"></el-input>
          </el-form-item>
          <el-form-item label="登录模式：" prop="loginflag">
            <el-input v-model="formInline.loginflag" placeholder="登录模式"></el-input>
          </el-form-item>
          <el-form-item label="客户端版本号：" prop="clientversion">
            <el-input v-model="formInline.clientversion" placeholder="客户端版本号"></el-input>
          </el-form-item>
          <el-form-item label="营业部标识：" prop="deptid">
            <el-input v-model="formInline.deptid" placeholder="营业部标识"></el-input>
          </el-form-item>
          <el-form-item label="成交类型：" prop="calcdealstype">
            <el-select v-model="formInline.calcdealstype">
              <el-option v-for="(item,index) in calcdealstypeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="协议类型：" prop="productssl">
            <el-select v-model="formInline.productssl">
              <el-option v-for="(item,index) in productsslList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IP地址：" prop="ipaddress">
            <el-input v-model="formInline.ipaddress" placeholder="IP地址"></el-input>
          </el-form-item>
          <el-form-item label="端口：" prop="ipport">
            <el-input v-model="formInline.ipport" placeholder="端口"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" class="savebt" @click="onSubmitChange('formInline')">保存</el-button>
            <el-button type="primary" class="nobt" @click="closeChange('formInline')">取消</el-button>
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
      accountCode: "",
      userName: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      jia: false,
      addTitle: "添加",
      formInline: {
        brokerid: "",
        brokername: "",
        brokertype: "",
        loginflag: "",
        clientversion: "",
        deptid: "",
        calcdealstype: "",
        productssl: "",
        ipaddress: "",
        ipport: ""
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
      brokername: "",
      brokerid: "",
      calcdealstypeList: [
        {
          key: 0,
          value: "券商"
        },
        {
          key: 1,
          value: "计算"
        }
      ],
      productsslList: [
        {
          key: 0,
          value: "同花顺"
        },
        {
          key: 1,
          value: "通达信"
        }
      ],
      rules: {
        brokerid: [
          { required: true, message: "请输入券商编码", trigger: "blur" }
        ],
        brokername: [
          { required: true, message: "请输入券商名称", trigger: "blur" }
        ],
        brokertype: [
          { required: true, message: "请输入券商类型", trigger: "blur" }
        ],
        loginflag: [
          { required: true, message: "请输入登录模式", trigger: "blur" }
        ],
        clientversion: [
          { required: true, message: "请输入客户端版本号", trigger: "blur" }
        ],
        deptid: [
          { required: true, message: "请输入营业部标识", trigger: "blur" }
        ],
        calcdealstype: [
          { required: true, message: "请选择成交类型", trigger: "change" }
        ],
        productssl: [
          { required: true, message: "请选择协议类型", trigger: "change" }
        ],
        ipaddress: [
          { required: true, message: "请输入IP地址", trigger: "blur" },
          {
            pattern: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,
            message: "IP地址不正确",
            trigger: "blur"
          }
        ],
        ipport: [{ required: true, message: "请输入端口", trigger: "blur" }]
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
    formatter1(row, column) {
      if (row) {
        let calcdealstype = row.calcdealstype;
        switch (calcdealstype) {
          case 0:
            return "券商";
          case 1:
            return "计算";
        }
      }
    },
    formatter2(row, column) {
      if (row) {
        let productssl = row.productssl;
        switch (productssl) {
          case 0:
            return "同花顺";
          case 1:
            return "通达信";
        }
      }
    },
    jiaNow() {
      this.jia = true;
      this.addTitle = "添加";
      this.formInline.brokerid = "";
      this.formInline.brokername = "";
      this.formInline.brokertype = "";
      this.formInline.loginflag = "";
      this.formInline.clientversion = "";
      this.formInline.deptid = "";
      this.formInline.calcdealstype = this.calcdealstypeList[0].key;
      this.formInline.productssl = this.productsslList[0].key;
      this.formInline.ipaddress = "";
      this.formInline.ipport = "";
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
      let brokerid = row.brokerid;
      this.brokerid = brokerid;
      this.axios
        .post("/tn/mgr-api/sysmgr/brokerMgr/get", {
          brokerid: brokerid
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
    deleteNow(index, row) {
      let brokerid = row.brokerid;
      this.axios
        .post("/tn/mgr-api/sysmgr/brokerMgr/delete", {
          brokerid: brokerid
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
          if (res.data.code == 200) {
            this.$alert("删除成功", "提示", {
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
    onSubmitChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/tn/mgr-api/sysmgr/brokerMgr/save", {
              brokerid: this.formInline.brokerid,
              brokername: this.formInline.brokername,
              brokertype: this.formInline.brokertype,
              loginflag: this.formInline.loginflag,
              clientversion: this.formInline.clientversion,
              deptid: this.formInline.deptid,
              calcdealstype: this.formInline.calcdealstype,
              productssl: this.formInline.productssl,
              ipaddress: this.formInline.ipaddress,
              ipport: this.formInline.ipport
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
                this.changeNow = false;
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
          console.log("提交信息错误");
          return false;
        }
      });
    },
    closeChange(formName) {
      this.$refs[formName].resetFields();
      this.changeNow = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/tn/mgr-api/sysmgr/brokerMgr/save", {
              brokerid: this.formInline.brokerid,
              brokername: this.formInline.brokername,
              brokertype: this.formInline.brokertype,
              loginflag: this.formInline.loginflag,
              clientversion: this.formInline.clientversion,
              deptid: this.formInline.deptid,
              calcdealstype: this.formInline.calcdealstype,
              productssl: this.formInline.productssl,
              ipaddress: this.formInline.ipaddress,
              ipport: this.formInline.ipport
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
                this.jia = false;
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
          console.log("提交信息错误");
          return false;
        }
      });
    },
    search() {
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/sysmgr/brokerMgr/brokerList", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          brokername: this.brokername
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


