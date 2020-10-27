<!--会员列表-->
<template>
    <div class="bigestbox" @click="hideEveryCode">
        <topNav></topNav>
        <div class="container" @click="colorBool = false">
            <div class="template-top">
                <div class="title" @click="jiaNow">添加</div>
                <div class="title" style="margin-left:7px;" @click="mouseOver">我的二维码</div>
                <div class="operate-btn">
                    <div class="search-box">
                        <input type="text" placeholder="请输入代理商名称" v-model="agentName" />
                        <img src="../../../assets/nine/search.png" class="search-img" />
                    </div>
                    <div class="search-box">
                        <input type="text" placeholder="请输入代理商ID" v-model="agentId" />
                        <img src="../../../assets/nine/search.png" class="search-img" />
                    </div>
                    <div class="search-user" @click="search">查询</div>
                    <div class="search-user" @click="exportExcel">导出</div>
                </div>
            </div>
            <!--表格-->
            <div class="reset-scroll-style">
                <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
                    <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
                    <el-table-column label="操作" align="center" width="280">
                        <template slot-scope="scope">
                            <div class="operation">
                                <span @click.stop="changeMsg(scope.$index,scope.row)">修改</span>
                                <span @click.stop="resetPassWord(scope.$index,scope.row)">重置密码</span>
                                <span @click.stop="look(scope.$index,scope.row)">查看</span>
                                <span>资金</span>
                            </div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column show-overflow-tooltip label="序号" prop="serial" align="center"></el-table-column> -->
                    <el-table-column show-overflow-tooltip label="等级" prop="level" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="等级名称" prop="levelName" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="代理ID" prop="accountId" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="代理名称" prop="accountName" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="代理状态" prop="accountStatus" :formatter="formatter" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="产品" prop="productCode" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="单边佣金" prop="commission" align="center"></el-table-column>
                    <el-table-column label="邀请码" align="center">
                        <template slot-scope="scope">
                            <img class="smallcode" src="../../../assets/ercode.png" alt="" @click.stop="showEveryCode(scope.$index,scope.row)">
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label="推荐人ID" prop="parentAccountCode" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="推荐人名称" prop="parentAccountName" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="账户余额" prop="balance" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="初期规模" prop="allottedScale" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center"></el-table-column>
                    <el-table-column show-overflow-tooltip label="保证金" prop="cashScale" align="center"></el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </div>
        <!--表单-->
        <div class="addForm" v-if="showAdd==true">
            <div class="addContent">
                <div class="title">
                    <span class="tl">{{addTitle}}</span>
                    <span class="tr" @click="closeAdd">关闭</span>
                </div>
                <!--推荐人佣金，代理管理权限，融资周期字段不明确-->
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                    <el-form-item label="推荐人ID：">
                        <el-input v-model="formInline.parentAccountCode" :disabled="true" placeholder="推荐人ID"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人名称：">
                        <el-input v-model="formInline.parentAccountName" :disabled="true" placeholder="推荐人名称"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人佣金：">
                        <el-input v-model="formInline.commission" :disabled="true" placeholder="推荐人佣金"></el-input>
                    </el-form-item>
                    <el-form-item label="代理ID：">
                        <el-input v-model="formInline.accountId" :disabled="true" placeholder="代理ID"></el-input>
                    </el-form-item>
                    <el-form-item label="代理名称：">
                        <el-input v-model="formInline.accountName" :disabled="true" placeholder="代理名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="产品：">
                        <el-select v-model="formInline.productCode" :disabled="true">
                            <el-option v-for="(item,index) in productList" :key="index" :label="item.value+'~'+item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="资金池ID：">
                        <el-select v-model="formInline.groupId" :disabled="true">
                            <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理等级：">
                        <el-select v-model="formInline.level" :disabled="true">
                            <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="佣金方案(单边)：">
                        <el-select v-model="formInline.commissionCfgId" :disabled="true">
                            <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理管理权限：">
                        <el-select v-model="formInline.ableCrud" :disabled="true">
                            <el-option v-for="(item,index) in productCodeList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账户余额：">
                        <el-input v-model="formInline.balance" :disabled="true" placeholder="账户余额"></el-input>
                    </el-form-item>
                    <el-form-item label="初期规模：">
                        <el-input v-model="formInline.allottedScale" :disabled="true" placeholder="初期规模"></el-input>
                    </el-form-item>
                    <el-form-item label="保证金：">
                        <el-input v-model="formInline.cashScale" :disabled="true" placeholder="保证金"></el-input>
                    </el-form-item>
                    <el-form-item label="手动冻结金额：">
                        <el-input v-model="formInline.freezeScale" :disabled="true" placeholder="手动冻结金额"></el-input>
                    </el-form-item>
                    <el-form-item label="平仓线(金额)：">
                        <el-input v-model="formInline.flatLine" :disabled="true" placeholder="平仓线(金额)"></el-input>
                    </el-form-item>
                    <el-form-item label="警戒线(金额)：">
                        <el-input v-model="formInline.cordonLine" :disabled="true" placeholder="警戒线(金额)"></el-input>
                    </el-form-item>
                    <el-form-item label="个股持仓比例：">
                        <el-input v-model="formInline.positionRatio" :disabled="true" placeholder="个股持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="创业板持仓比例：">
                        <el-input v-model="formInline.secondBoardPositionRatio" :disabled="true" placeholder="创业板持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="科创板持仓比例：">
                        <el-input v-model="formInline.thirdBoardPositionRatio" :disabled="true" placeholder="科创板持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="融资比例：">
                        <el-input v-model="formInline.financeRatio" :disabled="true" placeholder="融资比例"></el-input>
                    </el-form-item>
                    <el-form-item label="管理费率：">
                        <el-input v-model="formInline.manageFeeRate" :disabled="true" placeholder="管理费率"></el-input>
                    </el-form-item>
                    <el-form-item label="建仓费率：">
                        <el-input v-model="formInline.manageMakeFeeRate" :disabled="true" placeholder="建仓费率"></el-input>
                    </el-form-item>
                    <el-form-item label="融资周期：">
                        <el-select v-model="formInline.financePeriod" :disabled="true">
                            <el-option label="天" value="day"></el-option>
                            <el-option label="周" value="week"></el-option>
                            <el-option label="月" value="month"></el-option>
                            <el-option label="单" value="single"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下单权限：">
                        <el-select v-model="formInline.orderPermission" :disabled="true">
                            <el-option v-for="(item,index) in orderPermissionList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理状态：">
                        <el-select v-model="formInline.accountStatus" :disabled="true">
                            <el-option v-for="(item,index) in accountStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        <el-input v-model="formInline.createTime" :disabled="true" placeholder="创建时间"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!--修改表单-->
        <div class="addForm" v-if="changeNow==true">
            <div class="addContent">
                <div class="title">
                    <span class="tl">{{addTitle}}</span>
                    <span class="tr" @click="closeChange">关闭</span>
                </div>
                <!--推荐人佣金，代理管理权限，融资周期字段不明确-->
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                    <el-form-item label="推荐人ID：">
                        <el-input v-model="formInline.parentAccountCode" :disabled="true" placeholder="推荐人ID"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人名称：">
                        <el-input v-model="formInline.parentAccountName" :disabled="true" placeholder="推荐人名称"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人佣金：">
                        <el-input v-model="formInline.commission" :disabled="true" placeholder="推荐人佣金"></el-input>
                    </el-form-item>
                    <el-form-item label="代理ID：">
                        <el-input v-model="formInline.accountId" :disabled="true" placeholder="代理ID"></el-input>
                    </el-form-item>
                    <el-form-item label="代理名称：">
                        <el-input v-model="formInline.accountName" placeholder="代理名称"></el-input>
                    </el-form-item>
                    <el-form-item label="资金池ID：">
                        <el-select v-model="formInline.groupId">
                            <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="产品：">
                        <el-select v-model="formInline.productCode">
                            <el-option v-for="(item,index) in productList" :key="index" :label="item.value+'~'+item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="代理等级：">
                        <el-select v-model="formInline.level">
                            <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="佣金方案(单边)：">
                        <el-select v-model="formInline.commissionCfgId">
                            <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理管理权限：">
                        <el-select v-model="formInline.ableCrud">
                            <el-option v-for="(item,index) in productCodeList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账户余额：">
                        <el-input v-model="formInline.balance" :disabled="true" placeholder="账户余额"></el-input>
                    </el-form-item>
                    <el-form-item label="初期规模：">
                        <el-input v-model="formInline.allottedScale" :disabled="true" placeholder="初期规模"></el-input>
                    </el-form-item>
                    <el-form-item label="保证金：">
                        <el-input v-model="formInline.cashScale" :disabled="true" placeholder="保证金"></el-input>
                    </el-form-item>
                    <el-form-item label="手动冻结金额：">
                        <el-input v-model="formInline.freezeScale" placeholder="手动冻结金额"></el-input>
                    </el-form-item>
                    <el-form-item label="平仓线(金额)：">
                        <el-input v-model="formInline.flatLine" placeholder="平仓线(金额)"></el-input>
                    </el-form-item>
                    <el-form-item label="警戒线(金额)：">
                        <el-input v-model="formInline.cordonLine" placeholder="警戒线(金额)"></el-input>
                    </el-form-item>
                    <el-form-item label="个股持仓比例：">
                        <el-input v-model="formInline.positionRatio" placeholder="个股持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="创业板持仓比例：">
                        <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="科创板持仓比例：">
                        <el-input v-model="formInline.thirdBoardPositionRatio" placeholder="科创板持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="融资比例：">
                        <el-input v-model="formInline.financeRatio" :disabled="true" placeholder="融资比例"></el-input>
                    </el-form-item>
                    <el-form-item label="管理费率：">
                        <el-input v-model="formInline.manageFeeRate" placeholder="管理费率"></el-input>
                    </el-form-item>
                    <el-form-item label="建仓费率：">
                        <el-input v-model="formInline.manageMakeFeeRate" placeholder="建仓费率"></el-input>
                    </el-form-item>
                    <el-form-item label="融资周期：">
                        <el-select v-model="formInline.financePeriod" :disabled="true">
                            <el-option label="天" value="day"></el-option>
                            <el-option label="周" value="week"></el-option>
                            <el-option label="月" value="month"></el-option>
                            <el-option label="单" value="single"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下单权限：">
                        <el-select v-model="formInline.orderPermission">
                            <el-option v-for="(item,index) in orderPermissionList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理状态：">
                        <el-select v-model="formInline.accountStatus">
                            <el-option v-for="(item,index) in accountStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('formInline')">保存</el-button>
                        <el-button type="primary" @click="closeAdd1('formInline')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!--邀请码二维码-->
        <div :class="{'show-qrcode': showQrcode==true,addForm:true,'qrcode':true,}" @click="mouseOut">
            <div :class="{'qrbox':true}">
                <span>邀请码：</span>
                <div id="qrcode" ref="qrcode"></div>
            </div>
        </div>
        <div :class="{'qrbox1':true,'show-qrcode1': showQrcode1==true,'qrcode1':true}" id="qrcode2">
            <span>邀请码：</span>
            <div id="qrcode1" ref="qrcode1"></div>
        </div>
        <!--添加表单-->
        <div class="addForm" v-if="jia==true">
            <div class="addContent">
                <div class="title">
                    <span class="tl">{{addTitle}}</span>
                    <span class="tr" @click="closeJia">关闭</span>
                </div>
                <!--推荐人佣金，代理管理权限，融资周期字段不明确-->
                <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                    <el-form-item label="推荐人ID：">
                        <el-input v-model="formInline.parentAccountCode" :disabled="true" placeholder="推荐人ID"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人名称：">
                        <el-input v-model="formInline.parentAccountName" :disabled="true" placeholder="推荐人名称"></el-input>
                    </el-form-item>
                    <el-form-item label="推荐人佣金：">
                        <el-input v-model="formInline.commission" :disabled="true" placeholder="推荐人佣金"></el-input>
                    </el-form-item>
                    <el-form-item label="代理ID：">
                        <el-input v-model="formInline.accountId" placeholder="代理ID"></el-input>
                    </el-form-item>
                    <el-form-item label="代理名称：">
                        <el-input v-model="formInline.accountName" placeholder="代理名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="产品：">
                        <el-select v-model="formInline.productCode">
                            <el-option v-for="(item,index) in productList" :key="index" :label="item.value+'~'+item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="资金池ID：">
                        <el-select v-model="formInline.groupId">
                            <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理等级：">
                        <el-select v-model="formInline.level">
                            <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="佣金方案(单边)：">
                        <el-select v-model="formInline.commissionCfgId">
                            <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理管理权限：">
                        <el-select v-model="formInline.ableCrud">
                            <el-option v-for="(item,index) in productCodeList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="账户余额：">
                        <el-input v-model="formInline.balance" :disabled="true" placeholder="账户余额"></el-input>
                    </el-form-item>
                    <el-form-item label="初期规模：">
                        <el-input v-model="formInline.allottedScale" :disabled="true" placeholder="初期规模"></el-input>
                    </el-form-item>
                    <el-form-item label="保证金：">
                        <el-input v-model="formInline.cashScale" :disabled="true" placeholder="保证金"></el-input>
                    </el-form-item>
                    <el-form-item label="手动冻结金额：">
                        <el-input v-model="formInline.freezeScale" :disabled="true" placeholder="手动冻结金额"></el-input>
                    </el-form-item>
                    <el-form-item label="平仓线(金额)：">
                        <el-input v-model="formInline.flatLine" :disabled="true" placeholder="平仓线(金额)"></el-input>
                    </el-form-item>
                    <el-form-item label="警戒线(金额)：">
                        <el-input v-model="formInline.cordonLine" :disabled="true" placeholder="警戒线(金额)"></el-input>
                    </el-form-item>
                    <el-form-item label="个股持仓比例：">
                        <el-input v-model="formInline.positionRatio" placeholder="个股持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="创业板持仓比例：">
                        <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="科创板持仓比例：">
                        <el-input v-model="formInline.thirdBoardPositionRatio" placeholder="科创板持仓比例"></el-input>
                    </el-form-item>
                    <el-form-item label="融资比例：">
                        <el-input v-model="formInline.financeRatio" :disabled="true" placeholder="融资比例"></el-input>
                    </el-form-item>
                    <el-form-item label="管理费率：">
                        <el-input v-model="formInline.manageFeeRate" placeholder="管理费率"></el-input>
                    </el-form-item>
                    <el-form-item label="建仓费率：">
                        <el-input v-model="formInline.manageMakeFeeRate" placeholder="建仓费率"></el-input>
                    </el-form-item>
                    <el-form-item label="融资周期：">
                        <el-select v-model="formInline.financePeriod" :disabled="true">
                            <el-option label="天" value="day"></el-option>
                            <el-option label="周" value="week"></el-option>
                            <el-option label="月" value="month"></el-option>
                            <el-option label="单" value="single"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下单权限：">
                        <el-select v-model="formInline.orderPermission">
                            <el-option v-for="(item,index) in orderPermissionList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="代理状态：">
                        <el-select v-model="formInline.accountStatus">
                            <el-option v-for="(item,index) in accountStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
                        </el-select>
                    </el-form-item>
                    <br />
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit2('formInline')">保存</el-button>
                        <el-button type="primary" @click="closeAdd2('formInline')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from "@/components/topNav";
import QRCode from "qrcodejs2"; // 引入qrcode
export default {
  components: {
    topNav
  },
  data() {
    return {
      tableData: [],
      colorBool: false,
      agentName: "",
      agentId: "",
      pageSize: 31,
      currentPage: 1,
      total: 10,
      nullTable: false,
      showAdd: false,
      addTitle: "查看",
      formInline: {
        parentAccountCode: "",
        parentAccountName: "",
        commission: "",
        accountId: "",
        accountName: "",
        productCode: "",
        groupId: "",
        levelName: "",
        commissionCfgId: "",
        ableCrud: "",
        balance: "",
        allottedScale: "",
        cashScale: "",
        freezeScale: "",
        flatLine: "",
        cordonLine: "",
        positionRatio: "",
        secondBoardPositionRatio: "",
        thirdBoardPositionRatio: "",
        financeRatio: "",
        manageFeeRate: "",
        manageMakeFeeRate: "",
        financePeriod: "",
        orderPermission: "",
        accountStatus: "",
        createTime: "",
        commissionCfgList: [],
        productList: [],
        agentLevel: []
      },
      orderPermissionList: [
        { key: 0, value: "可买卖" },
        { key: 1, value: "禁买" },
        { key: 2, value: "禁卖" },
        { key: 3, value: "禁买卖" }
      ],
      accountStatusList: [
        { key: 0, value: "失效" },
        { key: 1, value: "正常" },
        { key: 2, value: "停机" }
      ],
      productCodeList: [{ key: 0, value: "否" }, { key: 1, value: "是" }],
      changeNow: false,
      jia: false,
      userId: "",
      userName: "",
      inviteCode: "",
      inviteCodeUrl: "",
      showQrcode: false,
      showQrcode1: false,
      groupIdList: []
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
  watch: {},
  created() {
    this.getFundAccount();
    this.getMsg();
    this.getGroupIdList();
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
  },
  methods: {
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/accountList/export",
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
    formatter(row, column) {
      if (row) {
        let accountStatus = row.accountStatus;
        switch (accountStatus) {
          case -1:
            return "删除";
          case 0:
            return "失效";
          case 1:
            return "正常";
          case 2:
            return "停机";
        }
      }
    },
    jiaNow() {
      this.jia = true;
      this.addTitle = "添加";
      this.formInline.parentAccountCode = this.userId;
      this.formInline.parentAccountName = this.userName;
      this.formInline.balance = 0;
      this.formInline.allottedScale = 0;
      this.formInline.cashScale = 0;
      this.formInline.freezeScale = 0;
      this.formInline.flatLine = 0;
      this.formInline.cordonLine = 0;
      this.formInline.financeRatio = 0;
    },
    showEveryCode(index, row) {
      console.log("index2", index);
      let inviteCode = row.inviteCode;
      this.showQrcode1 = true;
      document.getElementById("qrcode1").innerHTML = "";
      document.getElementById("qrcode2").style.top = 220 + 35 * index + "px";
      let inviteCodeUrl = localStorage.getItem("inviteCodeUrl") + inviteCode;
      this.creatQrCode1(inviteCodeUrl);
    },
    hideEveryCode() {
      document.getElementById("qrcode1").innerHTML = "";
      this.showQrcode1 = false;
    },
    creatQrCode(url) {
      console.log("我是地址", url);
      var qrcode = new QRCode("qrcode", {
        width: 250,
        height: 250,
        text: url,
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
    creatQrCode1(url) {
      console.log("我是地址1", url);
      var qrcode = new QRCode("qrcode1", {
        width: 250,
        height: 250,
        text: url,
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
    mouseOver() {
      this.showQrcode = true;
    },
    mouseOut() {
      this.showQrcode = false;
    },
    getGroupIdList() {
      this.axios
        .post("/tn/mgr-api/account/fund-list")
        .then(res => {
          if (res.data.code == 200) {
            this.groupIdList = res.data.data;
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
    getMsg() {
      this.axios
        .post("/tn/mgr-api/account/agent/edit-pre")
        .then(res => {
          if (res.data.code == 200) {
            this.commissionCfgList = res.data.data.commissionCfgList;
            this.productList = res.data.data.productList;
            this.agentLevel = res.data.data.agentLevel;
            this.inviteCode = res.data.data.inviteCode;
            this.inviteCodeUrl = res.data.data.inviteCodeUrl;
            localStorage.setItem("inviteCodeUrl", this.inviteCodeUrl);
            this.creatQrCode(this.inviteCodeUrl);
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
    changeMsg(index, row) {
      this.addTitle = "修改";
      let accountId = row.accountId;
      this.axios
        .get("/tn/mgr-api/account/getAccount", {
          params: {
            accountId: accountId
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.changeNow = true;
            this.formInline = res.data.data;
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
    closeJia() {
      this.jia = false;
    },
    closeChange() {
      this.changeNow = false;
    },
    closeAdd1(formName) {
      this.$refs[formName].resetFields();
      this.changeNow = false;
    },
    closeAdd2(formName) {
      this.$refs[formName].resetFields();
      this.jia = false;
    },
    onSubmit2(formName) {
      this.axios
        .post("/tn/mgr-api/account/save", {
          accountId: this.formInline.accountId,
          accountName: this.formInline.accountName,
          //   productCode: this.formInline.productCode,
          groupId: this.formInline.groupId,
          level: this.formInline.level,
          commissionCfgId: this.formInline.commissionCfgId,
          ableCrud: this.formInline.ableCrud,
          positionRatio: this.formInline.positionRatio,
          secondBoardPositionRatio: this.formInline.secondBoardPositionRatio,
          thirdBoardPositionRatio: this.formInline.thirdBoardPositionRatio,
          manageFeeRate: this.formInline.manageFeeRate,
          manageMakeFeeRate: this.formInline.manageMakeFeeRate,
          orderPermission: this.formInline.orderPermission,
          accountStatus: this.formInline.accountStatus
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
    onSubmit(formName) {
      this.axios
        .post("/tn/mgr-api/account/update", {
          accountId: this.formInline.accountId,
          accountName: this.formInline.accountName,
          //   productCode: this.formInline.productCode,
          groupId: this.formInline.groupId,
          level: this.formInline.level,
          commissionCfgId: this.formInline.commissionCfgId,
          ableCrud: this.formInline.ableCrud,
          positionRatio: this.formInline.positionRatio,
          secondBoardPositionRatio: this.formInline.secondBoardPositionRatio,
          thirdBoardPositionRatio: this.formInline.thirdBoardPositionRatio,
          manageFeeRate: this.formInline.manageFeeRate,
          manageMakeFeeRate: this.formInline.manageMakeFeeRate,
          orderPermission: this.formInline.orderPermission,
          accountStatus: this.formInline.accountStatus
        })
        .then(res => {
          if (res.data.code == 200) {
            this.changeNow = false;
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
    closeAdd() {
      this.showAdd = false;
    },
    look(index, row) {
      let accountId = row.accountId;
      this.axios
        .post("/tn/mgr-api/account/detail", {
          accountId: accountId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.showAdd = true;
            this.formInline = res.data.data;
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
    resetPassWord(index, row) {
      console.log("谁", row);
      let accountId = row.accountId;
      this.axios
        .post("/tn/mgr-api/account/agent/agentList", {
          accountId: accountId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert("重置密码成功", "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
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
    search() {
      this.getFundAccount(this.agentName, this.agentId);
    },
    getFundAccount(agentName, agentId) {
      if (!agentName) {
        agentName = "";
      }
      if (!agentId) {
        agentId = "";
      }
      this.axios
        .post("/tn/mgr-api/account/agentList", {
          accountId: agentId,
          accountName: agentName,
          pageSize: this.pageSize,
          pageNo: this.currentPage
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
            this.tableData = new Array(this.pageSize);
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
.addForm {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
}
.addForm1 {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0);
}
.qrbox {
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 300px);
  top: 0px;
}

.qrbox span {
  font-size: 20px;
  color: #000;
  display: inline-block;
  padding: 10px 0px;
}
.qrcode {
  display: none;
}
.qrbox1 {
  background-color: #fff;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  position: absolute;
  left: 920px;
  top: 0px;
}

/*小三角形*/
.qrbox1 :before,
.qrbox1 :after {
  width: 0;
  height: 0;
  border: solid transparent;
  position: absolute;
  left: 100%;
  /*该属性一定要有*/
  content: "";
}
.qrbox1 :before {
  border-width: 10px;
  border-left-color: #2662ee;
  top: 20px;
}
.qrbox1 :after {
  border-width: 8px;
  border-left-color: #fff;
  top: 22px;
}
.qrbox1 span {
  font-size: 20px;
  color: #000;
  display: inline-block;
  padding: 10px 0px;
}
.show-qrcode {
  display: block;
}
.qrcode1 {
  display: none;
}
.show-qrcode1 {
  display: block;
}
.smallcode {
  width: 10px;
  height: 10px;
  margin-left: 36px;
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


