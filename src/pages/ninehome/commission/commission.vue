<!--佣金方案配置-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">添加</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="memberId" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="方案名称" width="100" prop="packageName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日结方案" prop="dailyPlan" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="合作分成方案" prop="sharingScheme" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="月结方案" prop="statementScheme" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="用户注册默认" width="100" prop="signup" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span>修改</span>
                <span>删除</span>
                <span>置为默认</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSzie" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
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
      tableData: [
        {
          packageName: "总部(平台)",
          dailyPlan: "交易佣金率：0‰；管理费成交率：0%",
          sharingScheme: "交易佣金率：0‰；管理费成交率：0%；盈利分成成交率：0%",
          statementScheme: "交易佣金率：0‰；管理费成交率：0%",
          signup: "-"
        },
        {
          packageName: "总部(平台)",
          dailyPlan: "交易佣金率：0‰；管理费成交率：0%",
          sharingScheme: "交易佣金率：0‰；管理费成交率：0%；盈利分成成交率：0%",
          statementScheme: "交易佣金率：0‰；管理费成交率：0%",
          signup: "-"
        },
        {
          packageName: "总部(平台)",
          dailyPlan: "交易佣金率：0‰；管理费成交率：0%",
          sharingScheme: "交易佣金率：0‰；管理费成交率：0%；盈利分成成交率：0%",
          statementScheme: "交易佣金率：0‰；管理费成交率：0%",
          signup: "-"
        },
        {
          packageName: "总部(平台)",
          dailyPlan: "交易佣金率：0‰；管理费成交率：0%",
          sharingScheme: "交易佣金率：0‰；管理费成交率：0%；盈利分成成交率：0%",
          statementScheme: "交易佣金率：0‰；管理费成交率：0%",
          signup: "-"
        },
        {
          packageName: "总部(平台)",
          dailyPlan: "交易佣金率：0‰；管理费成交率：0%",
          sharingScheme: "交易佣金率：0‰；管理费成交率：0%；盈利分成成交率：0%",
          statementScheme: "交易佣金率：0‰；管理费成交率：0%",
          signup: "-"
        },
        {
          packageName: "总部(平台)",
          dailyPlan: "交易佣金率：0‰；管理费成交率：0%",
          sharingScheme: "交易佣金率：0‰；管理费成交率：0%；盈利分成成交率：0%",
          statementScheme: "交易佣金率：0‰；管理费成交率：0%",
          signup: "-"
        },
        {
          packageName: "总部(平台)",
          dailyPlan: "交易佣金率：0‰；管理费成交率：0%",
          sharingScheme: "交易佣金率：0‰；管理费成交率：0%；盈利分成成交率：0%",
          statementScheme: "交易佣金率：0‰；管理费成交率：0%",
          signup: "-"
        }
      ],
      colorBool: false,
      memberId: "",
      pageSzie: 31,
      currentPage: 1,
      total: 10,
      nullTable: false
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
    memberId: {
      handler(newVal, oldVal) {
        this.currentPage = 1;
        // this.getFundAccount();
      },
      deep: true
    }
  },
  created() {
    // this.getFundAccount();
  },
  methods: {
    getFundAccount() {
      this.axios
        .get("account/fund", {
          params: {
            search: this.memberId,
            size: this.pageSzie,
            page: this.currentPage
          }
        })
        .then(res => {
          console.log("getFundAccount>>", res.data.data);
          if (res.data.code == 1) {
            this.tableData = res.data.data.data;
            this.total = res.data.data.total;
          } else {
            this.tableData = [];
          }
          if (this.tableData.length <= 0) {
            this.nullTable = true;
            this.tableData = new Array(this.pageSzie);
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


