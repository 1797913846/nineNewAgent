<!--资产管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="jiaNow">添加</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入产品编号" v-model="productcodeLike" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入产品名称" v-model="productname" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入资金账号" v-model="userid" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="券商名称" v-model="brokerName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="!nullTable">
          <el-table-column label="操作" align="center" width="330">
            <template slot-scope="scope">
              <div class="operation">
                <span class="addSameClass " @click.stop="getEdit(scope.$index,scope.row)">修改</span>
                <span class="addSameClass " @click.stop="deleteNow(scope.$index, scope.row)">删除</span>
                <span class="addSameClass " @click.stop="getBalanceRefresh(scope.$index,scope.row)"> 获取券商资金</span>
                <span class="addSameClass " @click.stop="getHoldRefresh(scope.$index,scope.row)"> 获取券商持仓</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" prop="productcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品名称" prop="productname" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金账号" prop="userid" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="优先级" prop="priority" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="状态" prop="onlineStatusDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账号类型" prop="usertype" align="center" :formatter="formatter"></el-table-column>
          <el-table-column show-overflow-tooltip label="开仓控制" prop="operateStatusDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品佣金" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip width="150" label="期初可分配金额" prop="marketcap" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商名称" prop="brokerName" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总资产" prop="totalBnc" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总可用" prop="availableBnc" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总期初" prop="allottedScale" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总可用" prop="accountAvailableBnc" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="剩余资产" prop="diffTotal" align="center" width="140"></el-table-column>
        </el-table>
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="nullTable">
          <el-table-column show-overflow-tooltip label="产品编号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品名称" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金账号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="优先级" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="状态" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账号类型" align="center" :formatter="formatter"></el-table-column>
          <el-table-column show-overflow-tooltip label="开仓控制" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品佣金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip width="150" label="期初可分配金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商名称" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总资产" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总可用" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总期初" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总可用" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="剩余资产" align="center" width="140"></el-table-column>
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
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" :rules="rules">
          <el-form-item label="产品编号：" prop="productcode">
            <el-input v-model="formInline.productcode" placeholder="产品编号"></el-input>
          </el-form-item>
          <el-form-item label="产品名称：" prop="productname">
            <el-input v-model="formInline.productname" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="优先级：" prop="priority">
            <el-input v-model="formInline.priority" placeholder="优先级"></el-input>
          </el-form-item>
          <el-form-item label="资金账号：" prop="userid">
            <el-input v-model="formInline.userid" placeholder="资金账号"></el-input>
          </el-form-item>
          <el-form-item label="资金账号类型：" prop="usertype">
            <el-select v-model="formInline.usertype">
              <el-option v-for="(item,index) in usertypeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开仓控制：" prop="operateStatus">
            <el-select v-model="formInline.operateStatus">
              <el-option v-for="(item,index) in operateStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易密码：" prop="passwordtrade">
            <el-input v-model="formInline.passwordtrade" placeholder="交易密码"></el-input>
          </el-form-item>
          <el-form-item label="通讯密码：" prop="passwordcom">
            <el-input v-model="formInline.passwordcom" placeholder="交易密码"></el-input>
          </el-form-item>
          <el-form-item label="券商：" prop="brokerid">
            <el-select v-model="formInline.brokerid">
              <el-option v-for="(item,index) in brokerList" :key="index" :label="item.value+'~'+item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品佣金：" prop="commission">
            <el-input v-model="formInline.commission" placeholder="产品佣金"></el-input>
          </el-form-item>
          <el-form-item label="期初可分配金额：" prop="marketcap" class="smallfont">
            <el-input v-model="formInline.marketcap" placeholder="期初可分配金额"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="formInline.memo" placeholder="备注"></el-input>
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
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" :rules="rules">
          <el-form-item label="产品编号：" prop="productcode">
            <el-input v-model="formInline.productcode" :disabled="true" placeholder="产品编号"></el-input>
          </el-form-item>
          <el-form-item label="产品名称：" prop="productname">
            <el-input v-model="formInline.productname" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="优先级：" prop="priority">
            <el-input v-model="formInline.priority" placeholder="优先级"></el-input>
          </el-form-item>
          <el-form-item label="资金账号：" prop="userid">
            <el-input v-model="formInline.userid" :disabled="true" placeholder="资金账号"></el-input>
          </el-form-item>
          <el-form-item label="资金账号类型：" prop="usertype">
            <el-select v-model="formInline.usertype">
              <el-option v-for="(item,index) in usertypeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开仓控制：" prop="operateStatus">
            <el-select v-model="formInline.operateStatus">
              <el-option v-for="(item,index) in operateStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易密码：" prop="passwordtrade">
            <el-input v-model="formInline.passwordtrade" placeholder="交易密码"></el-input>
          </el-form-item>
          <el-form-item label="通讯密码：" prop="passwordcom">
            <el-input v-model="formInline.passwordcom" placeholder="通讯密码"></el-input>
          </el-form-item>
          <el-form-item label="券商：" prop="brokerid">
            <el-select v-model="formInline.brokerid">
              <el-option v-for="(item,index) in brokerList" :key="index" :label="item.value+'~'+item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品佣金：" prop="commission">
            <el-input v-model="formInline.commission" placeholder="产品佣金"></el-input>
          </el-form-item>
          <el-form-item label="期初可分配金额：" prop="marketcap" class="smallfont">
            <el-input v-model="formInline.marketcap" placeholder="期初可分配金额"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="formInline.memo" placeholder="备注"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmitChange('formInline')">保存</el-button>
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
      keyword: "",
      productcodeLike: "",
      productname: "",
      userid: "",
      brokerName: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      jia: false,
      addTitle: "添加",
      formInline: {
        productcode: "",
        productname: "",
        priority: "",
        userid: "",
        usertype: "",
        operateStatus: "",
        passwordtrade: "",
        passwordcom: "",
        brokerid: "",
        commission: "",
        marketcap: "",
        memo: ""
      },
      usertypeList: [
        {
          key: 0,
          value: "普通户"
        },
        {
          key: 1,
          value: "担保品"
        },
        {
          key: 0,
          value: "融资融券"
        }
      ],
      operateStatusList: [
        { key: 0, value: "允许操作" },
        { key: 1, value: "禁止操作" }
      ],
      brokerList: [],
      changeNow: false,
      rules: {
        productcode: [
          { required: true, message: "请输入产品编号", trigger: "blur" }
        ],
        productname: [
          { required: true, message: "请输入产品名称", trigger: "blur" }
        ],
        priority: [
          { required: true, message: "请输入优先级", trigger: "blur" }
        ],
        userid: [
          { required: true, message: "请输入资金账号", trigger: "blur" }
        ],
        usertype: [
          { required: true, message: "请选择资金账号类型", trigger: "change" }
        ],
        operateStatus: [
          { required: true, message: "请选择开仓控制", trigger: "change" }
        ],
        passwordtrade: [
          { required: true, message: "请输入交易密码", trigger: "blur" }
        ],
        passwordcom: [
          { required: true, message: "请输入通讯密码", trigger: "blur" }
        ],
        brokerid: [
          { required: true, message: "请选择券商", trigger: "change" }
        ],
        commission: [
          { required: true, message: "请输入产品佣金", trigger: "blur" }
        ],
        marketcap: [
          { required: true, message: "请输入期初可分配金额", trigger: "blur" }
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
    keyword: {
      handler(newVal, oldVal) {
        this.currentPage = 1;
        this.getFundAccount();
      },
      deep: true
    }
  },
  created() {
    this.getMsg();
    this.getFundAccount();
  },
  methods: {
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/productInfo/export",
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
    getBalanceRefresh(index, row) {
      let productCode = row.productcode;
      this.axios
        .get("/tn/mgr-api/itg/product/balance/refresh", {
          params: {
            productCode: productCode
          }
        })
        .then(res => {
          if (res.data.code == 200) {
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
    getHoldRefresh(index, row) {
      let productCode = row.productcode;
      this.axios
        .get("/tn/mgr-api/itg/product/hold/refresh", {
          params: {
            productCode: productCode
          }
        })
        .then(res => {
          if (res.data.code == 200) {
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
      this.formInline.productcode = "";
      this.formInline.productname = "";
      this.formInline.priority = "";
      this.formInline.userid = "";
      this.formInline.usertype = "";
      this.formInline.operateStatus = "";
      this.formInline.passwordtrade = "";
      this.formInline.passwordcom = "";
      this.formInline.brokerid = "";
      this.formInline.commission = "";
      this.formInline.marketcap = "";
      this.formInline.memo = "";
    },
    closeAdd(formName) {
      this.$refs[formName].resetFields();
      this.jia = false;
    },
    closeChange1() {
      this.changeNow = false;
    },
    getMsg() {
      this.axios
        .post("/tn/mgr-api/productInfo/edit-pre")
        .then(res => {
          if (res.data.code == 200) {
            this.brokerList = res.data.data.brokerList;
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
    getEdit(index, row) {
      console.log("我啊", row);
      this.addTitle = "修改";
      this.changeNow = true;
      let productCode = row.productcode;
      this.axios
        .get("/tn/mgr-api/productInfo/detail", {
          params: {
            productCode: productCode
          }
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
      let productCode = row.productcode;
      this.axios
        .post("/tn/mgr-api/productInfo/delete", {
          productcode: productCode
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
    },
    onSubmitChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/tn/mgr-api/productInfo/update", {
              productcode: this.formInline.productcode,
              productname: this.formInline.productname,
              priority: this.formInline.priority,
              userid: this.formInline.userid,
              usertype: this.formInline.usertype,
              operateStatus: this.formInline.operateStatus,
              passwordtrade: this.formInline.passwordtrade,
              passwordcom: this.formInline.passwordcom,
              brokerid: this.formInline.brokerid,
              commission: this.formInline.commission,
              marketcap: this.formInline.marketcap,
              memo: this.formInline.memo
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
            .post("/tn/mgr-api/productInfo/save", {
              productcode: this.formInline.productcode,
              productname: this.formInline.productname,
              priority: this.formInline.priority,
              userid: this.formInline.userid,
              usertype: this.formInline.usertype,
              operateStatus: this.formInline.operateStatus,
              passwordtrade: this.formInline.passwordtrade,
              passwordcom: this.formInline.passwordcom,
              brokerid: this.formInline.brokerid,
              commission: this.formInline.commission,
              marketcap: this.formInline.marketcap,
              memo: this.formInline.memo
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
        .post("/tn/mgr-api/productInfo/list", {
          productcodeLike: this.productcodeLike,
          productname: this.productname,
          userid: this.userid,
          brokerName: this.brokerName,
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


