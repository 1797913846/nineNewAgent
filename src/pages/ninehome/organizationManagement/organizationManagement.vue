<!--机构管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="jiaNow">新增机构</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入机构名称" v-model="brokerName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table huiyuan" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" :row-class-name="tableRowClassName" v-if="!nullTable">
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="changeMsg(scope.$index,scope.row)" class="addSameClass ">修改</span>
                <span v-if="scope.row.status==1" @click.stop="changeSet(scope.$index,scope.row)" class="addSameClass " style="color:green;">
                  启用
                </span>
                <span v-if="scope.row.status==0" @click.stop="changeSet(scope.$index,scope.row)" class="addSameClass " style="color:red;">
                  停用
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="用户名" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="机构ID" prop="brokerId" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="机构名称" prop="brokerName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建时间" prop="createTime" align="center" width="160"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="状态" prop="status" align="center" :formatter="formatter"></el-table-column> -->
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span v-if="scope.row.status==0" style="color:green;">正常</span>
                <span v-if="scope.row.status==1" style="color:red;">停用</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="服务到期日" prop="endDate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="省份" prop="provinceName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="城市" prop="cityName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="联系人" prop="contactPerson" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手机号" prop="contactPersonMobile" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" prop="remark" align="center"></el-table-column>
        </el-table>
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="nullTable">
          <el-table-column show-overflow-tooltip label="用户名" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="机构ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="机构名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建时间" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="状态" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="服务到期日" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="省份" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="城市" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="联系人" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手机号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="!nullTable">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--表单-->
    <div class="addForm ggf3" v-if="jia==true||changeNow==true">
      <div class="addContent addContent2 gg4444">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeJia" v-if="jia==true">
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeChange" v-if="changeNow==true">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" :rules="rules">
          <div class="gbbox">
            <div class="gbcontent">
              <span class="gbspan">
                <el-form-item label="用户名：" prop="accountName">
                  <el-input v-model="formInline.accountName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="机构名称：" prop="brokerName">
                  <el-input v-model="formInline.brokerName" placeholder="机构名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="contactPerson">
                  <el-input v-model="formInline.contactPerson" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label="备注信息：" prop="remark">
                  <el-input v-model="formInline.remark" placeholder="备注信息"></el-input>
                </el-form-item>
              </span>
              <span class="gbspan">
                <el-form-item label="登录密码：" prop="password">
                  <el-input v-model="formInline.password" type="password" placeholder="登录密码"></el-input>
                </el-form-item>
                <div class="ssbale">
                  <el-form-item label="省份：" prop="provinceId">
                    <el-select v-model="formInline.provinceId" class="shortwidth">
                      <el-option v-for="(item,index) in provincesList" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="城市：" class="shortlabel" prop="cityId">
                    <el-select v-model="formInline.cityId" class="shortwidth">
                      <el-option v-for="(item,index) in citiesList" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item label="联系电话：" prop="contactPersonMobile">
                  <el-input v-model="formInline.contactPersonMobile" placeholder="联系电话"></el-input>
                </el-form-item>
                <el-form-item label="服务截止：" prop="endDate">
                  <el-date-picker v-model="formInline.endDate" format="yyyy-MM-dd" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </span>
            </div>
          </div>
          <el-form-item v-if="jia==true">
            <el-button class="savebt" type="primary" @click="onSubmit2('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeAdd2('formInline')">取消</el-button>
          </el-form-item>
          <el-form-item v-if="changeNow==true">
            <el-button class="savebt" type="primary" @click="onSubmit('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeAdd1('formInline')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="addForm" v-if="msg==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">修改角色</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeMsg">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <div class="changewho">
            <el-radio-group v-model="radio">
              <el-radio :class="{tradio:index==5}" :label="item.roleId" v-for="(item,index) in levelList" :key="index">{{item.roleName}}</el-radio>
            </el-radio-group>
          </div>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="saveChange">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeMsg">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="addForm" v-if="setBool==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">修改用户推荐人</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeMsgSet">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <div>
            <el-form-item label="推荐人：">
              <el-select v-model="whowho">
                <el-option v-for="(item,index) in eList" :key="index" :label="item.accountId+'~'+item.brokerName" :value="item.accountId"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="saveChangeSet">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeMsgSet">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "@/components/topNav";
import QRCode from "qrcodejs2"; // 引入qrcode
export default {
  components: {
    topNav
  },
  data() {
    return {
      brokerName: "",
      tableData: [],
      colorBool: false,
      pageSize: 31,
      currentPage: 1,
      total: 10,
      provincesList: [],
      citiesList: [],
      nullTable: false,
      showAdd: false,
      addTitle: "查看",
      brokerId:"",
      formInline: {
        accountName: "",
        password: "",
        contactPerson: "",
        contactPersonMobile: "",
        brokerName: "",
        provinceId: "",
        cityId: "",
        endDate: ""
      },
      changeNow: false,
      jia: false,
      userId: "",
      userName: "",
      inviteCode: "",
      inviteCodeUrl: "",
      showQrcode: false,
      showQrcode1: false,
      groupIdList: [],
      levelList: [],
      accountCode: "",
      msg: false,
      radio: "",
      setBool: false,
      eList: [],
      whoid: "",
      whowho: "",
      tableData1: "",
      total1: "",
      nullTable1: false,
      loginName: "",
      defaultChildGroupId: "",
      defaultChildCommissionCfgId: "",
      levelId: "",
      isAdminGroup: false,
      queryData: {},
      financeScheme: "",
      financeRatioList: "",
      rules: {
        accountName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        contactPerson: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        contactPersonMobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[0-9]{10}$/,
            message: "手机号错误",
            trigger: "blur"
          }
        ],
        brokerName: [
          { required: true, message: "请输入机构名称", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "请输入备注信息", trigger: "blur" }
        ],
        provinceId: [
          { required: true, message: "请选择省份", trigger: "change" }
        ],
        cityId: [{ required: true, message: "请选择城市", trigger: "change" }],
        endDate: [
          { required: true, message: "请选择服务截止日期", trigger: "change" }
        ]
      }
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
    "formInline.provinceId": {
      handler(newVal, oldVal) {
        this.formInline.cityId = "";
        this.getCitiesList();
      },
      deep: true
    }
  },
  created() {
    this.getFundAccount();
    this.getProvincesList();
  },
  methods: {
    getProvincesList() {
      this.axios
        .post("/tn/mgr-api/agency/province")
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
        .post("/tn/mgr-api/agency/city", {
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
    getEList() {
      this.axios.post("/tn/mgr-api/account/edit-pre").then(res => {
        if (res.data.code == 200) {
          this.eList = res.data.data.accountList;
        } else {
          this.$alert(res.data.info, "提示", {
            confirmButtonText: "确定",
            center: true,
            type: "error"
          });
        }
      });
    },
    saveChangeSet() {
      this.axios
        .post("/tn/mgr-api/account/update-parent", {
          accountCode: this.whoid,
          parentCode: this.whowho
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            // this.getFundAccount();
            this.search();
            this.setBool = false;
          } else {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        });
    },
    closeMsgSet() {
      this.setBool = false;
    },
    changeSet(index, row) {
      let accountCode = row.accountId;
      let parentCode = row.parentAccountCode;
      this.whoid = accountCode;
      this.whowho = parentCode;
      this.setBool = true;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.profit > 0) {
        return "red";
      } else if (row.profit < 0) {
        return "colorgreen";
      }
      return "";
    },
    closeMsg() {
      this.msg = false;
    },
    changeWho(index, row) {
      this.msg = true;
      this.accountCode = row.accountId;
      this.getAgentLevel();
    },
    saveChange() {
      this.axios
        .post("/tn/mgr-api/account/role/update", {
          accountCode: this.accountCode,
          roleId: this.radio
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.msg = false;
            this.search();
            // this.getFundAccount();
          } else {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        });
    },
    getAgentLevel() {
      this.axios
        .post("/tn/mgr-api/account/role", {
          accountCode: this.accountCode
        })
        .then(res => {
          if (res.data.code == 200) {
            this.levelList = res.data.data;
            let that = this;
            this.levelList.map((item, index) => {
              if (item.isUserRole == 1) {
                console.log("我在的", item, item.roleId);
                that.radio = item.roleId;
              }
            });
          } else {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        });
    },
    ping(index, row) {
      let accountCode = row.accountId;
      this.axios
        .post("/tn/mgr-api/account/closePosition", {
          accountCode: accountCode
        })
        .then(res => {
          if (res.data.code == 200) {
            this.getFundAccount();
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
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
    money(index, row) {
      let accountId = row.accountId;
      this.queryData = {
        agentId: this.agentId,
        checked: this.checked,
        agentName: this.agentName
      };
      this.$router.push({
        path: "/ninehome/money",
        query: {
          accountId: accountId,
          from: "/ninehome/huiyuan",
          queryData: this.queryData
        }
      });
    },
    getDefaultGroupName(id) {
      let a;
      this.groupIdList.map(item => {
        if (item.groupId == id) {
          a = item.groupName;
        }
      });
      return a;
    },
    getDefaultGroupName1(id) {
      let a;
      this.commissionCfgList.map(item => {
        if (item.id == id) {
          a = item.cfgName;
        }
      });
      return a;
    },
    formatter(row, column) {
      if (row) {
        let status = row.status;
        switch (status) {
          case 0:
            return "正常";
          case 1:
            return "停用";
        }
      }
    },
    getMsg666() {
      this.axios
        .get("/tn/mgr-api/account-info")
        .then(res => {
          console.log("login>>", res.data);
          if (res.data.code == 200) {
            let data = res.data.data;
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("level", data.level);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("loginName", data.loginName);
            localStorage.setItem("isAdminGroup", data.isAdminGroup);
            localStorage.setItem(
              "defaultChildGroupId",
              data.defaultChildGroupId
            );
            localStorage.setItem(
              "defaultChildCommissionCfgId",
              data.defaultChildCommissionCfgId
            );
          } else {
          }
        })
        .catch(() => {});
    },
    jiaNow() {
      this.jia = true;
      this.addTitle = "新增机构";
      this.formInline.accountName = "";
      this.formInline.password = "";
      this.formInline.contactPerson = "";
      this.formInline.contactPersonMobile = "";
      this.formInline.brokerName = "";
      this.formInline.provinceId = "";
      this.formInline.cityId = "";
      this.formInline.endDate = "";
    },
    getGroupIdList() {
      this.axios
        .post("/tn/mgr-api/account/fund-list")
        .then(res => {
          if (res.data.code == 200) {
            this.groupIdList = res.data.data;
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
    getMsg() {
      this.axios
        .post("/tn/mgr-api/account/agent/edit-pre")
        .then(res => {
          if (res.data.code == 200) {
            this.commissionCfgList = res.data.data.commissionCfgList;
            this.productList = res.data.data.productList;
            this.agentLevel = res.data.data.agentLevel;
            this.financeScheme = res.data.data.financeScheme;
            //取出客户
            this.agentLevel.map(item => {
              if (item.levelName == "客户") {
                this.levelId = item.level;
                this.formInline.agentMaxLimitMoney = 0;
              }
            });
            this.inviteCode = res.data.data.inviteCode;
            this.inviteCodeUrl = res.data.data.inviteCodeUrl;
            localStorage.setItem("inviteCodeUrl", this.inviteCodeUrl);
            this.creatQrCode(this.inviteCodeUrl + this.inviteCode);
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
    changeMsg(index, row) {
      this.changeNow=true;
      this.addTitle = "修改机构";
      let brokerId = row.brokerId;
      this.brokerId=brokerId;
      this.formInline.accountName = row.accountName;
      this.formInline.password = row.password;
      this.formInline.contactPerson = row.contactPerson;
      this.formInline.contactPersonMobile = row.contactPersonMobile;
      this.formInline.brokerName = row.brokerName;
      this.formInline.provinceId = row.provinceId;
      this.formInline.cityId = row.cityId;
      this.formInline.endDate = row.endDate;
      console.log('我是日期',this.formInline.endDate)
    },
    closeJia() {
      this.jia = false;
    },
    closeChange() {
      this.changeNow = false;
    },
    closeAdd1(formName) {
      this.$refs[formName].resetFields();
      this.changeNow = false;
    },
    closeAdd2(formName) {
      this.$refs[formName].resetFields();
      this.jia = false;
    },
    onSubmit2(formName) {
      this.axios
        .post("/tn/mgr-api/agency/save", {
          brokerId:"",
          accountName: this.formInline.accountName,
          password: this.formInline.password,
          contactPerson: this.formInline.contactPerson,
          contactPersonMobile: this.formInline.contactPersonMobile,
          brokerName: this.formInline.brokerName,
          provinceId: this.formInline.provinceId,
          cityId: this.formInline.cityId,
          endDate: this.formInline.endDate,
          remark: this.formInline.remark
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
    onSubmit(formName) {
      this.axios
        .post("/tn/mgr-api/agency/save", {
          brokerId:this.brokerId,
          accountName: this.formInline.accountName,
          password: this.formInline.password,
          contactPerson: this.formInline.contactPerson,
          contactPersonMobile: this.formInline.contactPersonMobile,
          brokerName: this.formInline.brokerName,
          provinceId: this.formInline.provinceId,
          cityId: this.formInline.cityId,
          endDate: this.formInline.endDate,
          remark: this.formInline.remark
        })
        .then(res => {
          if (res.data.code == 200) {
            this.changeNow = false;
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
    closeAdd() {
      this.showAdd = false;
    },
    changeSet(index, row) {
      let brokerId = row.brokerId;
      this.axios
        .post("/tn/mgr-api/agency/switchStatus", {
          brokerId: brokerId
        })
        .then(res => {
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
    look(index, row) {
      this.addTitle = "查看";
      let accountId = row.accountId;
      this.axios
        .post("/tn/mgr-api/account/detail", {
          accountId: accountId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.showAdd = true;
            this.formInline = res.data.data;
            if (this.formInline.bankId == 0) {
              this.radio1 = 0;
            } else {
              this.radio1 = 1;
            }
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
        .post("/tn/mgr-api/agency/list", {
          brokerName: this.brokerName,
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
.qrbox {
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 300px);
  top: 0px;
}

.qrbox span {
  font-size: 20px;
  color: #000;
  display: inline-block;
  padding: 10px 0px;
}
.qrcode {
  display: none;
}
.qrbox1 {
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  position: absolute;
  left: 920px;
  top: 0px;
}

/*小三角形*/
.qrbox1 :before,
.qrbox1 :after {
  width: 0;
  height: 0;
  border: solid transparent;
  position: absolute;
  left: 100%;
  /*该属性一定要有*/
  content: "";
}
.qrbox1 :before {
  border-width: 10px;
  border-left-color: #2662ee;
  top: 20px;
}
.qrbox1 :after {
  border-width: 8px;
  border-left-color: #fff;
  top: 22px;
}
.qrbox1 span {
  font-size: 20px;
  color: #000;
  display: inline-block;
  padding: 10px 0px;
}
.show-qrcode {
  display: block;
}
.qrcode1 {
  display: none;
}
.show-qrcode1 {
  display: block;
}
.smallcode {
  width: 10px;
  height: 10px;
  margin-left: 36px;
}
.changewho {
  margin-left: 33px;
  margin-right: 33px;
}
.gbbox {
  border-bottom: 1px solid #ededed;
  overflow: hidden;
  margin-left: 30px;
  margin-right: 30px;
}
.gbtitle {
  color: #586982;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}
.gbcontent {
}
.gbspan {
  display: inline-block;
  float: left;
  width: 49%;
}
.gbspan:last-child {
  margin-left: 2%;
}
</style>
<style>
.el-table .colorgreen {
  background-color: #dff0d8 !important;
}
.el-table .yellow {
  background-color: #fcf8e3 !important;
}
.el-table .red {
  background-color: #f2dede !important;
}
.huiyuan .el-table__body tr td {
  background: none !important;
}
.changewho .el-radio__input.is-checked + .el-radio__label {
  color: #2562ee;
}
.changewho .el-radio__label {
  font-size: 15px;
}
.changewho .el-radio__input.is-checked .el-radio__inner {
  border-color: #2562ee;
  background: #2562ee;
}
.changewho .el-radio__inner {
  width: 17px;
  height: 17px;
}
.tradio {
  margin-left: 0px !important;
}
.ggf3 .el-form-item__label {
  width: 170px !important;
  text-align: right !important;
  margin-left: 0px !important;
}
.ggf3 .shortlabel .el-form-item__label {
  width: 65px !important;
  text-align: right !important;
  margin-left: 0px !important;
}
.gg4444 .el-date-editor .el-input__icon {
  height: 100% !important;
}
.ggf3 .ssbale .el-form-item {
  float: left;
}
.ggf3 .el-input__inner {
  width: 270px !important;
}
.ggf3 .shortwidth .el-input__inner {
  width: 97.5px !important;
}
.huiyuan .el-table__body tr.el-table__row--striped td {
  background: transparent !important;
}
</style>



