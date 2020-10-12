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
          <div class="search-user">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center" width="330">
            <template slot-scope="scope">
              <div class="operation">
                <span>修改</span>
                <span>删除</span>
                <span> 获取券商资金</span>
                <span> 获取券商持仓</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="产品编号" prop="productcode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品名称" prop="productname" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金账号" prop="userid" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="优先级" prop="priority" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="状态" prop="onlineStatusDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账号类型" prop="usertype" align="center" :formatter="formatter"></el-table-column>
          <el-table-column show-overflow-tooltip label="开仓控制" prop="operateStatusDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品佣金" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip width="150" label="期初可分配金额" prop="marketcap" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商名称" prop="brokerName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总资产" prop="totalBnc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="券商总可用" prop="availableBnc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总期初" prop="allottedScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="客户总可用" prop="accountAvailableBnc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="剩余资产" prop="diffTotal" align="center"></el-table-column>
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
          <span class="tr" @click="closeJia">关闭</span>
        </div>
        <!--推荐人佣金，代理管理权限，融资周期字段不明确-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="产品编号：">
            <el-input v-model="formInline.productcode" placeholder="产品编号"></el-input>
          </el-form-item>
          <el-form-item label="产品名称：">
            <el-input v-model="formInline.productname" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="优先级：">
            <el-input v-model="formInline.priority" placeholder="优先级"></el-input>
          </el-form-item>
          <el-form-item label="资金账号：">
            <el-input v-model="formInline.userid" placeholder="资金账号"></el-input>
          </el-form-item>
          <el-form-item label="资金账号类型：">
            <el-select v-model="formInline.usertype">
              <el-option v-for="(item,index) in usertypeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开仓控制：">
            <el-select v-model="formInline.operateStatus">
              <el-option v-for="(item,index) in operateStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易密码：">
            <el-input v-model="formInline.passwordtrade" placeholder="交易密码"></el-input>
          </el-form-item>
          <el-form-item label="通讯密码：">
            <el-input v-model="formInline.passwordcom" placeholder="交易密码"></el-input>
          </el-form-item>
          <el-form-item label="券商：">
            <el-select v-model="formInline.brokerid">
              <el-option v-for="(item,index) in brokerList" :key="index" :label="item.value+'~'+item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品佣金：">
            <el-input v-model="formInline.commission" placeholder="产品佣金"></el-input>
          </el-form-item>
          <el-form-item label="期初可分配金额：">
            <el-input v-model="formInline.marketcap" placeholder="期初可分配金额"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="formInline.memo" placeholder="备注"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmit('formInline')">保存</el-button>
            <el-button type="primary" @click="closeAdd('formInline')">取消</el-button>
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
      brokerList: []
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
    },
    closeAdd(formName) {
      this.$refs[formName].resetFields();
      this.jia = false;
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
    onSubmit(formName) {
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
</style>


