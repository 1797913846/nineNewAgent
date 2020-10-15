<!--资金池管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">新增</div>
        <div class="title" style="margin-left:10px;">编辑</div>
        <div class="title" style="margin-left:10px;">删除</div>
        <div class="operate-btn">
          <!-- <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="id" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入会员名称" v-model="name" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box1">
            <el-select v-model="value1" placeholder="请选择审核状态" :clearable="true">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-box1">
            <el-date-picker v-model="value2" type="date">
            </el-date-picker>
          </div>
          <div class="search-user">查询</div> -->
          <!-- <div class="search-user">导出</div> -->
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="分组名称" prop="groupName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金账户" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用金额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="参考市值" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="余额" align="center"></el-table-column>
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
      value1: "",
      value2: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      tableData: [],
      colorBool: false,
      keyword: "",
      id: "",
      name: "",
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
    this.getFundAccount();
  },
  methods: {
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/fund-pool/list", {
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


