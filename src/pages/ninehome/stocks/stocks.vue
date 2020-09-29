<!--股票黑名单-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">刷新</div>
        <div class="title" style="margin-left:10px;">删除</div>
        <div class="title" style="margin-left:10px;">导入</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入证券代码" v-model="code" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入证券名称" v-model="name" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column type="selection" width="30" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票代码" prop="id" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="股票名称" prop="name" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
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
      tableData: [
        {
          id: "-",
          name: "-"
        }
      ],
      colorBool: false,
      keyword: "",
      code:"",
      name:"",
      pageSize: 31,
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
    keyword: {
      handler(newVal, oldVal) {
        this.currentPage = 1;
        this.getFundAccount();
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
            search: this.keyword,
            size: this.pageSize,
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


