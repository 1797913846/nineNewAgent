<!--提现审核-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="accountCode" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入会员名称" v-model="accountName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="selectbox">
            <el-form :inline="true">
              <el-form-item label="审核状态：">
                <el-select v-model="auditResult" :clearable="true">
                  <el-option v-for="(item,index) in auditResultList" :key="index" :label="item.value" :value="item.key"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <div class="search-boxv">
            <span class="bu"> 从：</span>
            <div class="selectbox">
              <el-date-picker v-model="createTimeStart" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
              </el-date-picker>
            </div>
            <span class="bu">&nbsp; 至：</span>
            <div class="selectbox">
              <el-date-picker v-model="createTimeEnd" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date">
              </el-date-picker>
            </div>
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="!nullTable">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span v-if=" scope.row.auditResult==0" @click.stop="tong1(scope.$index, scope.row)" class="addSameClass " style="color:#2662ee">通过</span>
                <span v-if=" scope.row.auditResult==0" @click.stop="ju1(scope.$index, scope.row)" class="addSameClass " style="color:#2662ee">拒绝</span>
                <span v-if="scope.row.auditResult==1" style="color:rgb(0, 128, 0);">已通过</span>
                <span v-if="scope.row.auditResult==-1" style="color:rgb(255, 0, 0);">已拒绝</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="申请时间" prop="createTime" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="类型" prop="orderTypeDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" prop="accountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人ID" prop="parentAccountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" prop="parentAccountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="金额（元）" prop="totalAmount" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip :formatter="formatter" label="手续费" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="费率" prop="commissionStr" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款开户行" prop="bankName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款支行" prop="subBranchName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款开户名" prop="userName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款卡号" prop="cardNo" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="支付方式" prop="channelDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="支付状态" prop="payStatusDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" prop="remark" align="center"></el-table-column>
        </el-table>
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="nullTable">
          <el-table-column show-overflow-tooltip label="申请时间" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="类型" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="金额（元）" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手续费" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="费率" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款开户行" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款支行" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款开户名" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="收款卡号" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="支付方式" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="支付状态" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="!nullTable">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
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
      tableData: [],
      colorBool: false,
      proId: "",
      proName: "",
      account: "",
      keyword: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      isAdminGroup: false,
      accountCode: "",
      accountName: "",
      auditResult: "",
      auditResultList: [
        {
          key: "",
          value: "所有"
        },
        {
          key: 0,
          value: "待审核"
        },
        {
          key: 1,
          value: "通过"
        },
        {
          key: -1,
          value: "不通过"
        }
      ],
      createTimeStart: "",
      createTimeEnd: ""
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
  created() {},
  mounted() {
    this.getFundAccount();
  },
  methods: {
    tong1(index, row) {
      this.axios
        .post("/tn/mgr-api/payOrder/verify", {
          id: row.id,
          result: "SUCC"
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
    ju1(index, row) {
      this.axios
        .post("/tn/mgr-api/payOrder/verify", {
          id: row.id,
          result: "FAIL",
          remark: "审核不通过"
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
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/payOrder/export",
        data: { orderType: "OUT" }
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
    formatter(row, column) {
      if (row) {
        let commission = row.commission;
        switch (commission) {
          case "-1.00":
            return "-";
        }
      }
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    getFundAccount() {
      this.isAdminGroup = localStorage.getItem("isAdminGroup");
      this.axios
        .post("/tn/mgr-api/payOrder/list", {
          orderType: "OUT",
          accountCode: this.accountCode,
          accountName: this.accountName,
          auditResult: this.auditResult,
          createTimeStart: this.createTimeStart,
          createTimeEnd: this.createTimeEnd,
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


