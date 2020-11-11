<!--等级列表-->
<template>
    <div class="bigestbox">
        <topNav></topNav>
        <div class="container" @click="colorBool = false">
            <!--表格-->
            <div class="reset-scroll-style">
                <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <el-table-column show-overflow-tooltip label="等级标识" prop="level" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="等级名称" prop="levelName" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="是否代理" prop="isProxyDesc" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span @click.stop="getEdit(scope.$index,scope.row)" class="addSameClass ">编辑</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!--修改表单-->
        <div class="addForm" v-if="changeNow==true">
            <div class="addContent">
                <div class="title">
                    <span class="tl">{{addTitle}}</span>
                    <img class="tr" src="../../../assets/nine/closeform.png" alt=""  @click="closeChange1">
                </div>
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                    <el-form-item label="等级名称：">
                        <el-input v-model="levelName" placeholder="等级名称"></el-input>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <el-button class="savebt" type="primary" @click="onSubmitChange('formInline')">保存</el-button>
                        <el-button class="nobt" type="primary" @click="closeChange('formInline')">取消</el-button>
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
      keyword: "",
      productcodeLike: "",
      productname: "",
      userid: "",
      brokerName: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      jia: false,
      addTitle: "添加",
      brokerList: [],
      changeNow: false,
      id: "",
      levelName: "",
      formInline:{}
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
    this.getFundAccount();
  },
  methods: {
    jiaNow() {
      this.jia = true;
    },
    closeAdd(formName) {
      this.$refs[formName].resetFields();
      this.jia = false;
    },
    closeChange1() {
      this.changeNow = false;
    },
    getEdit(index, row) {
      this.addTitle = "修改";
      this.changeNow = true;
      let id = row.id;
      this.id = id;
      let levelName = row.levelName;
      this.levelName = levelName;
    },
    onSubmitChange(formName) {
      this.axios
        .post("/tn/mgr-api/account/agentLevel/edit", {
          id: this.id,
          levelName: this.levelName
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.changeNow = false;
            this.getFundAccount();
          } else {
            this.changeNow = false;
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
    closeChange(formName) {
      this.$refs[formName].resetFields();
      this.changeNow = false;
    },
    search() {
      this.getFundAccount();
    },
    getFundAccount() {
      this.axios
        .post("/tn/mgr-api/account/agentLevel/list")
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


