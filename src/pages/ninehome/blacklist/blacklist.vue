<!--黑名单配置-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="showAddNow">添加</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入证券代码" v-model="stockNo" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入证券名称" v-model="stockName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search()">查询</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="ID" prop="id" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券代码" prop="stockNo" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券名称" prop="stockName" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="deleteNow(scope.$index, scope.row)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
      <!--表单-->
      <div class="addForm" v-if="showAdd==true">
        <div class="addContent">
          <div class="title">
            <span class="tl">{{addTitle}}</span>
            <span class="tr" @click="closeAdd">X</span>
          </div>
          <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="证券代码：">
              <el-input v-model="newStockNo" placeholder="证券代码"></el-input>
            </el-form-item>
            <br />
            <el-form-item>
              <el-button type="primary" @click="onSubmit('formInline')">保存</el-button>
              <el-button type="primary" @click="closeAdd1('formInline')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
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
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      stockNo: "",
      stockName: "",
      newStockNo: "",
      id: "",
      showAdd: false,
      addTitle: "新增",
      formInline: {}
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
    // stockNo: {
    //   handler(newVal, oldVal) {
    //     this.currentPage = 1;
    //     this.getFundAccount();
    //   },
    //   deep: true
    // },
    // stockName: {
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
    showAddNow() {
      console.log(3333);
      this.addTitle = "新增";
      this.showAdd = true;
      this.newStockNo = "";
    },
    closeAdd1(formName) {
      this.$refs[formName].resetFields();
      this.showAdd = false;
    },
    closeAdd() {
      this.showAdd = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("submit!");
          this.axios
            .post("/tn/mgr-api/tntg/stockBlack/saveOrUpdate", {
              stockNo: this.newStockNo
            })
            .then(res => {
              console.log("getFundAccount>>", res.data);
              if (res.data.code == 200) {
                this.showAdd = false;
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
          console.log("error submit!!");
          return false;
        }
      });
    },
    refresh() {
      this.getFundAccount();
    },
    deleteNow(index, row) {
      console.log(222);
      console.log("13点", index, row);
      this.id = row.id;
      this.axios
        .post("/tn/mgr-api/tntg/stockBlack/delete", {
          id: this.id
        })
        .then(res => {
          console.log("getFundAccount>>", res.data);
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
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/tntg/stockBlack/list", {
          stockNo: this.stockNo,
          stockName: this.stockName,
          pageSize: this.pageSize,
          pageNo: this.currentPage
        })
        .then(res => {
          console.log("getFundAccount>>", res.data.data);
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
  height: 200px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
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


