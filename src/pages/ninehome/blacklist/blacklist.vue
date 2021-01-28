<!--黑名单-->
<template>
  <div class="bigestbox">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="showAddNow">添加</div>
        <div class="title" @click="deleteAll" style="margin-left:20px;">批量删除</div>
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
          <div class="search-user" @click="exportExcel">下载</div>
          <!-- <el-upload class="upload-demo" action="http://10.10.1.26:8081/tn/mgr-api/tntg/stockBlack/batch-add" :headers="{Authorization:token}" multiple :show-file-list="false" :on-success="handleAvatarSuccess">
            <div class="search-user">导入</div>
          </el-upload> -->
          <el-upload class="upload-demo" action="/tn/mgr-api/tntg/stockBlack/batch-add" :headers="{Authorization:token}" multiple :show-file-list="false" :on-success="handleAvatarSuccess">
            <div class="search-user">导入</div>
          </el-upload>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column label="序号" type="index" width="50" align="center">
          </el-table-column>
          <el-table-column show-overflow-tooltip label="证券代码" prop="stockNo" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券名称" prop="stockName" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="deleteNow(scope.$index, scope.row)" class="addSameClass ">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
          <el-table-column show-overflow-tooltip label="证券代码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="证券名称" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="nullTable==false">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
      <!--表单-->
      <div class="addForm" v-if="showAdd==true">
        <div class="addContent">
          <div class="title">
            <span class="tl">{{addTitle}}</span>
            <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeAdd">
          </div>
          <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="证券代码：">
              <el-input v-model="newStockNo" placeholder="证券代码"></el-input>
            </el-form-item>
            <br />
            <el-form-item>
              <el-button class="savebt" type="primary" @click="onSubmit('formInline')">保存</el-button>
              <el-button class="nobt" type="primary" @click="closeAdd1('formInline')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <alertWindows v-if="deleteBool==true" :deleteTitle="deleteTitle" @childByValue="childByValue"></alertWindows>
  </div>
</template>

<script>
import topNav from "@/components/topNav";
import alertWindows from "@/components/alertWindows";
export default {
  components: {
    topNav,
    alertWindows
  },
  data() {
    return {
      deleteBool: false,
      deleteRight: false,
      deleteTitle: "确认删除吗?",
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
      formInline: {},
      blackIds: "",
      token: ""
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
    //取自己的token哦
    let allhref = window.location.href;
    let token;
    //如果存在token,请求头里面设置
    if (allhref.indexOf("newbaby") != -1) {
      let getmMatchResult = allhref.match(/newbaby(\S*)~/)[1];
      token = localStorage.getItem("baby" + getmMatchResult);
    }
    token
      ? (token = token)
      : (token = localStorage.getItem("managerAuthorization"));
    this.token = token;
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val);
      let blackIds = [];
      val.map(item => {
        blackIds.push(item.id);
      });
      console.log("我是数组", blackIds);
      this.blackIds = blackIds;
    },
    deleteAll() {
      if (this.blackIds.length <= 0) {
        this.$alert("请先勾选黑名单", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      } else {
        this.axios
          .post("/tn/mgr-api/tntg/stockBlack/batch-delete", {
            blackIds: this.blackIds
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
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.$alert("导入成功", "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "sucess"
        });
        this.getFundAccount();
      } else {
        this.$alert(res.info, "提示", {
          confirmButtonText: "确定",
          center: true,
          type: "error"
        });
      }
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/tntg/stockBlack/batch-example",
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
    childByValue: function(childValue) {
      // childValue就是子组件传过来的值
      this.deleteRight = childValue;
      if (this.deleteRight == true) {
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
        this.deleteBool = false;
      } else {
        this.deleteBool = false;
      }
    },
    deleteNow(index, row) {
      this.deleteBool = true;
      this.id = row.id;
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
.operate-btn {
  width: 900px;
}
</style>


