<!--代理商列表-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">添加</div>
        <div class="title" style="margin-left:7px;">我的二维码</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入代理商名称" v-model="agentName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入代理商ID" v-model="agentId" />
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
          <el-table-column label="操作" align="center" width="280">
            <template slot-scope="scope">
              <div class="operation">
                <span>修改</span>
                <span @click.stop="resetPassWord(scope.$index,scope.row)">重置密码</span>
                <span @click.stop="look(scope.$index,scope.row)">查看</span>
                <span>资金</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="序号" prop="serial" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="等级" prop="level" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级名称" prop="levelName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理ID" prop="accountId" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理状态" prop="accountStatus" :formatter="formatter" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="单边佣金" prop="commission" align="center"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="邀请码" prop="code" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="推荐人ID" prop="parentAccountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" prop="parentAccountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" prop="balance" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="初期规模" prop="allottedScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" prop="cashScale" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
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
        <!--推荐人佣金，代理管理权限，融资周期字段不明确-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="推荐人ID：">
            <el-input v-model="formInline.parentAccountCode" :disabled="true" placeholder="推荐人ID"></el-input>
          </el-form-item>
          <el-form-item label="推荐人名称：">
            <el-input v-model="formInline.parentAccountName" :disabled="true" placeholder="推荐人名称"></el-input>
          </el-form-item>
          <el-form-item label="推荐人佣金：">
            <el-input v-model="formInline.commission" :disabled="true" placeholder="推荐人佣金"></el-input>
          </el-form-item>
          <el-form-item label="代理ID：">
            <el-input v-model="formInline.accountId" :disabled="true" placeholder="代理ID"></el-input>
          </el-form-item>
          <el-form-item label="代理名称：">
            <el-input v-model="formInline.accountName" :disabled="true" placeholder="代理名称"></el-input>
          </el-form-item>
          <el-form-item label="产品：">
            <el-input v-model="formInline.productCode" :disabled="true" placeholder="产品"></el-input>
          </el-form-item>
          <el-form-item label="代理等级：">
            <el-input v-model="formInline.levelName" :disabled="true" placeholder="代理等级"></el-input>
          </el-form-item>
          <el-form-item label="佣金方案(单边)：">
            <el-input v-model="formInline.commissionCfgId" :disabled="true" placeholder="佣金方案"></el-input>
          </el-form-item>
          <el-form-item label="代理管理权限：">
            <el-input v-model="formInline.ableCrud" :disabled="true" placeholder="代理管理权限"></el-input>
          </el-form-item>
          <el-form-item label="账户余额：">
            <el-input v-model="formInline.balance" :disabled="true" placeholder="账户余额"></el-input>
          </el-form-item>
          <el-form-item label="初期规模：">
            <el-input v-model="formInline.allottedScale" :disabled="true" placeholder="初期规模"></el-input>
          </el-form-item>
          <el-form-item label="保证金：">
            <el-input v-model="formInline.cashScale" :disabled="true" placeholder="保证金"></el-input>
          </el-form-item>
          <el-form-item label="手动冻结金额：">
            <el-input v-model="formInline.freezeScale" :disabled="true" placeholder="手动冻结金额"></el-input>
          </el-form-item>
          <el-form-item label="平仓线(金额)：">
            <el-input v-model="formInline.flatLine" :disabled="true" placeholder="平仓线(金额)"></el-input>
          </el-form-item>
          <el-form-item label="警戒线(金额)：">
            <el-input v-model="formInline.cordonLine" :disabled="true" placeholder="警戒线(金额)"></el-input>
          </el-form-item>
          <el-form-item label="个股持仓比例：">
            <el-input v-model="formInline.positionRatio" :disabled="true" placeholder="个股持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="创业板持仓比例：">
            <el-input v-model="formInline.secondBoardPositionRatio" :disabled="true" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：">
            <el-input v-model="formInline.thirdBoardPositionRatio" :disabled="true" placeholder="科创板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="融资比例：">
            <el-input v-model="formInline.financeRatio" :disabled="true" placeholder="融资比例"></el-input>
          </el-form-item>
          <el-form-item label="管理费率：">
            <el-input v-model="formInline.manageFeeRate" :disabled="true" placeholder="管理费率"></el-input>
          </el-form-item>
          <el-form-item label="建仓费率：">
            <el-input v-model="formInline.manageMakeFeeRate" :disabled="true" placeholder="建仓费率"></el-input>
          </el-form-item>
          <el-form-item label="融资周期：">
            <el-select v-model="formInline.financePeriod" :disabled="true">
              <el-option label="天" value="day"></el-option>
              <el-option label="周" value="week"></el-option>
              <el-option label="月" value="month"></el-option>
              <el-option label="单" value="single"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下单权限：">
            <el-input v-model="formInline.orderPermission" :disabled="true" placeholder="下单权限"></el-input>
          </el-form-item>
          <el-form-item label="代理状态：">
            <el-input v-model="formInline.accountStatus" :disabled="true" placeholder="代理状态"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-input v-model="formInline.createTime" :disabled="true" placeholder="创建时间"></el-input>
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
      agentName: "",
      agentId: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      showAdd: false,
      addTitle: "查看",
      formInline: {
        parentAccountCode: "",
        parentAccountName: "",
        commission: "",
        accountId: "",
        accountName: "",
        productCode: "",
        levelName: "",
        commissionCfgId: "",
        ableCrud: "",
        balance: "",
        allottedScale: "",
        cashScale: "",
        freezeScale: "",
        flatLine: "",
        cordonLine: "",
        positionRatio: "",
        secondBoardPositionRatio: "",
        thirdBoardPositionRatio: "",
        financeRatio: "",
        manageFeeRate: "",
        manageMakeFeeRate: "",
        financePeriod: "",
        orderPermission: "",
        accountStatus: "",
        createTime: ""
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
  watch: {},
  created() {
    this.getFundAccount();
  },
  methods: {
    formatter(row, column) {
      if (row) {
        let accountStatus = row.accountStatus;
        switch (accountStatus) {
          case -1:
            return "删除";
          case 0:
            return "失效";
          case 1:
            return "正常";
          case 2:
            return "停机";
        }
      }
    },
    closeAdd() {
      this.showAdd = false;
    },
    look(index, row) {
      let accountId = row.accountId;
      this.axios
        .post("/tn/mgr-api/account/detail", {
          accountId: accountId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.showAdd = true;
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
    resetPassWord(index, row) {
      console.log("谁", row);
      let accountId = row.accountId;
      this.axios
        .post("/tn/mgr-api/account/agent/agentList", {
          accountId: accountId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert("重置密码成功", "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
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
      this.getFundAccount(this.agentName, this.agentId);
    },
    getFundAccount(agentName, agentId) {
      if (!agentName) {
        agentName = "";
      }
      if (!agentId) {
        agentId = "";
      }
      this.axios
        .post("/tn/mgr-api/account/agent/agentList", {
          accountId: agentId,
          accountName: agentName,
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


