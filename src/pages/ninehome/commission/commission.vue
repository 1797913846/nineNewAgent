<!--佣金方案配置-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">添加</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入方案名称" v-model="cfgName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search()">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="方案名称" width="100" prop="cfgName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日结方案" prop="dayCommission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="合作分成方案" prop="singleCommission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="月结方案" prop="monthCommission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="用户注册默认" width="100" prop="isDefault" :formatter="formatter" align="center"></el-table-column>
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
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="方案名称" width="100" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="日结方案" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="合作分成方案" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="月结方案" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="用户注册默认" width="100" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="nullTable==false">
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
      tableData: [],
      colorBool: false,
      cfgName: "",
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
        .post("/tn/mgr-api/commissionCfgs/pageQuery", {
          pageSize: this.pageSzie,
          pageNo: this.currentPage,
          cfgName: this.cfgName
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
            this.tableData = new Array(this.pageSzie);
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
</style>


