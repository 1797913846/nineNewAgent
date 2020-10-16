<!--资金池管理-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title">新增</div>
        <div class="title" style="margin-left:10px;">编辑</div>
        <div class="title" style="margin-left:10px;" @click="deleteAll">删除</div>
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
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="分组id" prop="groupName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="分组名称" prop="groupName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金账户" prop="productCode" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--新增-->
    <!-- <div class="addForm">
      <div class="addContent">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <span class="tr">关闭</span>
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item label="分组名称：">
            <el-input v-model="levelName" placeholder="分组名称"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="primary">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div> -->
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
      nullTable: false,
      groupId: [],
      addTitle: "新增",
      groupId: 0
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
    this.getContent();
  },
  methods: {
    getContent() {
      this.axios
        .post("/tn/mgr-api/fund-pool/detail", {
          groupId: this.groupId
        })
        .then(res => {
          if (res.data.code == 200) {
            
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
    handleSelectionChange(val) {
      console.log(val);
      let groupIdList = [];
      val.map(item => {
        groupIdList.push(item.groupId);
      });
      this.groupId = groupIdList;
    },
    deleteAll() {
      if (this.groupId.length <= 0) {
        this.$alert("请先勾选资金池", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      } else {
        this.axios
          .post("/tn/mgr-api/fund-pool/delete", {
            groupId: this.groupId
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$alert(res.data.info, "提示", {
                confirmButtonText: "确定",
                center: true,
                type: "sucess"
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
      }
    },
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


