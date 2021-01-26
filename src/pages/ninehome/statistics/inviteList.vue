<!--会员直推关系-->
<template>
    <div class="bigestbox">
        <topNav></topNav>
        <div class="container" @click="colorBool = false">
            <div class="template-top">
                <div class="title" @click="jiaNow">添加</div>
                <div class="operate-btn">
                    <div class="search-box">
                        <input type="text" placeholder="请输入直推人ID" v-model="fromUser" />
                        <img src="../../../assets/nine/search.png" class="search-img" />
                    </div>
                    <div class="search-box">
                        <input type="text" placeholder="请输入直推人名称" v-model="fromUserName" />
                        <img src="../../../assets/nine/search.png" class="search-img" />
                    </div>
                    <div class="search-user" @click="search">查询</div>
                </div>
            </div>
            <!--表格-->
            <div class="reset-scroll-style">
                <el-table v-if="nullTable==true" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="620" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column show-overflow-tooltip label="客户ID" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="客户名称" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="直推人ID" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="直推人名称" align="center"></el-table-column>
                </el-table>
                <el-table v-if="nullTable==false" :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="620" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <div class="operation">
                                <!-- <span class="addSameClass " @click.stop="getEdit(scope.$index,scope.row)">修改</span> -->
                                <span class="addSameClass " @click.stop="getEdit(scope.$index,scope.row)">修改</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="客户ID" prop="toUser" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="客户名称" prop="toUserName" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="直推人ID" prop="fromUser" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="直推人名称" prop="fromUserName" align="center"></el-table-column>
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
                    <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeJia">
                </div>
                <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline">
                    <!-- <el-form-item label="客户：" prop="toUser">
                        <el-select v-model="formInline.toUser" :disabled="addTitle=='修改'">
                            <el-option v-for="(item,index) in toUserList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="推荐人：" prop="fromUser">
                        <el-select v-model="formInline.fromUser">
                            <el-option v-for="(item,index) in fromUserList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <!--改-->
                    <el-form-item label="客户：" prop="toUser">
                        <el-autocomplete v-model="formInline.toUser" :disabled="addTitle=='修改'" :fetch-suggestions="querySearchAsync" placeholder="客户" @select="handleSelect" clearable @clear="clearCode"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="直推人：" prop="fromUser">
                        <el-autocomplete v-model="formInline.fromUser" :fetch-suggestions="querySearchAsync1" placeholder="直推人" @select="handleSelect1" clearable @clear="clearCode1"></el-autocomplete>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <el-button type="primary" class="savebt" @click="onSubmit('formInline')">保存</el-button>
                        <el-button type="primary" class="nobt" @click="closeAdd('formInline')">取消</el-button>
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
      jia: false,
      addTitle: "添加",
      restaurants: [],
      restaurants1: [],
      toUserList: [],
      fromUserList: [],
      formInline: {
        toUser: "",
        fromUser: ""
      },
      rules: {
        toUser: [{ required: true, message: "请选择客户", trigger: "change" }],
        fromUser: [
          { required: true, message: "请选择直推人", trigger: "change" }
        ]
      },
      tableData: [],
      ext: {},
      colorBool: false,
      id: "",
      keyword: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      fromUser: "",
      fromUserName: "",
      stockNo: "",
      buyOrderNo: "",
      sellOrderNo: "",
      financePeriod: "",
      financePeriodList: [
        { key: "day", value: "天" },
        { key: "week", value: "周" },
        { key: "month", value: "月" },
        { key: "single", value: "单" }
      ],
      dateStart: "",
      dateEnd: "",
      productCode: "",
      lastPrice: "",
      addTitle: "调整资金",
      financeRatioList: [
        {
          key: 3,
          value: "3倍"
        },
        {
          key: 5,
          value: "5倍"
        },
        {
          key: 6,
          value: "6倍"
        },
        {
          key: 8,
          value: "8倍"
        }
      ]
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
  created() {
    this.getDataList();
    this.getFundAccount();
  },
  methods: {
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      console.log("数据啊", results);
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      console.log("数据666", queryString);
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    handleSelect(item) {
      console.log("是我啊", item);
      if (JSON.stringify(item) != "{}") {
        this.formInline.toUser = item.key;
      } else {
        this.formInline.toUser = "";
      }
    },
    clearCode() {
      this.formInline.toUser = "";
    },
    querySearchAsync1(queryString, cb) {
      var restaurants = this.restaurants1;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      console.log("数据啊", results);
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter1(queryString) {
      console.log("数据666", queryString);
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    handleSelect1(item) {
      console.log("是我啊", item);
      if (JSON.stringify(item) != "{}") {
        this.formInline.fromUser = item.key;
      } else {
        this.formInline.fromUser = "";
      }
    },
    clearCode1() {
      this.formInline.fromUser = "";
    },
    jiaNow() {
      this.jia = true;
      this.addTitle = "添加";
      this.formInline.toUser = "";
      this.formInline.fromUser = "";
    },
    getEdit(index, row) {
      console.log("该行数据", row);
      this.addTitle = "修改";
      this.jia = true;
      this.formInline.toUser = row.toUser;
      this.formInline.fromUser = row.fromUser;
    },
    closeJia() {
      this.jia = false;
    },
    closeAdd(formName) {
      this.$refs[formName].resetFields();
      this.jia = false;
    },
    onSubmit(formName) {
      let url;
      if (this.addTitle == "添加") {
        url = "/tn/mgr-api/agent-invite/save";
      } else {
        url = "/tn/mgr-api/agent-invite/update";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post(url, {
              fromUser: this.formInline.fromUser,
              toUser: this.formInline.toUser
            })
            .then(res => {
              if (res.data.code == 200) {
                this.$alert(res.data.info, "提示", {
                  confirmButtonText: "确定",
                  center: true,
                  type: "success"
                });
                this.jia = false;
                this.getFundAccount();
              } else {
                // this.jia = false;
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
          console.log("提交信息错误");
          return false;
        }
      });
    },
    getDataList() {
      this.axios
        .post("/tn/mgr-api/agent-invite/edit-pre")
        .then(res => {
          this.toUserList = res.data.data.toUser;
          this.fromUserList = res.data.data.fromUser;
          this.restaurants = this.toUserList;
          this.restaurants1 = this.fromUserList;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    formatter(row, column) {
      if (row) {
        return (
          Math.round(
            (row["lastPrice"] - row["preCost"]) * row["allottedCnt"] * 100
          ) / 100
        );
      }
    },
    search() {
      this.currentPage = 1;
      this.getFundAccount();
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/history/settle/export",
        data: {
          fromUser: this.fromUser,
          fromUserName: this.fromUserName,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd
        }
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
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/agent-invite/list", {
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          fromUser: this.fromUser,
          fromUserName: this.fromUserName
        })
        .then(res => {
          if (res.data.code == 200) {
            let rows = res.data.data.rows;
            if (rows.length > 0) {
              this.tableData = res.data.data.rows;
              this.ext = res.data.data.ext;
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


