<!--代理商列表-->
<template>
  <div class="bigestbox" @click="hideEveryCode">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="jiaNow">添加</div>
        <div class="title" style="margin-left:7px;" @click="mouseOver">我的二维码</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入代理商ID" v-model="agentId" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="tmbox">
            <el-checkbox v-model="checked">下级</el-checkbox>
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入代理商名称" v-model="agentName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table daili" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" :row-class-name="tableRowClassName" v-if="!nullTable">
          <el-table-column label="操作" align="center" width="180">
            <template slot-scope="scope">
              <div class="operation">
                <span class="addSameClass " @click.stop="changeMsg(scope.$index,scope.row)">修改</span>
                <span class="addSameClass " @click.stop="resetPassWord(scope.$index,scope.row)">重置密码</span>
                <span class="addSameClass " @click.stop="look(scope.$index,scope.row)">查看</span>
                <span class="addSameClass " @click.stop="money(scope.$index,scope.row)">资金</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="序号" prop="serial" align="center"></el-table-column> -->
          <el-table-column show-overflow-tooltip label="等级" prop="level" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级名称" prop="levelName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理ID" prop="accountId" align="center" width="110"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理名称" prop="accountName" align="center" width="120"></el-table-column>
          <el-table-column show-overflow-tooltip label="单边佣金" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金池ID" prop="productGroupId" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金池名称" :formatter="formattername" align="center" width="100"></el-table-column>
          <!-- groupIdList -->
          <el-table-column show-overflow-tooltip label="下级默认资金池" align="center" width="130">
            <template slot-scope="scope">
              {{getDefaultGroupName(scope.row.defaultChildGroupId)}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="下级默认佣金方案" align="center" width="140">
            <template slot-scope="scope">
              {{getDefaultGroupName1(scope.row.defaultChildCommissionCfgId)}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="代理商限额" prop="agentMaxLimitMoney" align="center" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理状态" prop="accountStatus" :formatter="formatter" align="center"></el-table-column>
          <el-table-column label="邀请码" align="center">
            <template slot-scope="scope">
              <img :class="{smallcode:true, codeborder:indexindex==scope.$index}" src="../../../assets/ercode.png" alt="" @click.stop="showEveryCode(scope.$index,scope.row)">
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人ID" prop="parentAccountCode" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" prop="parentAccountName" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" prop="balance" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="初期规模" prop="allottedScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" prop="cashScale" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手动冻结资金" prop="freezeScale" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="总盈亏" prop="profit" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="平仓线(金额)" prop="flatLine" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线(金额)" prop="cordonLine" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="个股持仓比例" prop="positionRatio" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="创业板持仓比例" prop="secondBoardPositionRatio" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板持仓比例" prop="thirdBoardPositionRatio" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="创业板个股持仓比率" width="160" prop="secondBoardSingleStockPositionRatio" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板个股持仓比率" width="160" prop="thirdBoardSingleStockPositionRatio" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="下单权限" prop="orderPermission" :formatter="formattera" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资比例" prop="financeRatio" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资周期" prop="financePeriod" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="管理费率" prop="manageFeeRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="建仓费率" prop="manageMakeFeeRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈利分成率" prop="separateFeeRate" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资开始日期" prop="financeStartDate" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建时间" width="200" prop="createTime" align="center"></el-table-column>
        </el-table>
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="nullTable">
          <el-table-column show-overflow-tooltip label="等级" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理ID" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理名称" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="单边佣金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="资金池ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="下级默认资金池" align="center" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip label="下级默佣金方案" align="center" width="180"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理商限额" align="center" width="100"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理状态" :formatter="formatter" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="邀请码" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人ID" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="初期规模" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="可用资金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="保证金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="手动冻结资金" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="总盈亏" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="平仓线(金额)" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="警戒线(金额)" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="个股持仓比例" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="创业板持仓比例" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板持仓比例" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="创业板个股持仓比率" width="180" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板个股持仓比率" width="180" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="下单权限" :formatter="formattera" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资比例" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资周期" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="管理费率" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="建仓费率" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈利分成率" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资开始日期" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建时间" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-if="!nullTable">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--表单-->
    <div class="addForm fnn" v-if="showAdd==true">
      <div class="addContent addContent2 gg3">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeAdd">
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
          <el-form-item label="代理商限额：">
            <el-input :disabled="true" v-model="formInline.agentMaxLimitMoney" placeholder="数据为0时无限制"></el-input>
          </el-form-item>
          <el-form-item label="资金池ID：">
            <el-select v-model="formInline.productGroupId" :disabled="true">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理等级：">
            <el-select v-model="formInline.level" :disabled="true">
              <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="佣金方案(单边)：" class="smallfont">
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
          <el-form-item label="创业板持仓比例：" class="smallfont">
            <el-input v-model="formInline.secondBoardPositionRatio" :disabled="true" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：" class="smallfont">
            <el-input v-model="formInline.thirdBoardPositionRatio" :disabled="true" placeholder="科创板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="创业板个股持仓比率：" class="smallfont">
            <el-input :disabled="true" v-model="formInline.secondBoardSingleStockPositionRatio" placeholder="创业板个股持仓比率"></el-input>
          </el-form-item>
          <el-form-item label="科创板个股持仓比率：" class="smallfont">
            <el-input :disabled="true" v-model="formInline.thirdBoardSingleStockPositionRatio" placeholder="科创板个股持仓比率"></el-input>
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
          <el-form-item label="下级默认资金池：" class="smallfont" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildGroupId" :disabled="true">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认佣金方案：" class="smallfont" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildCommissionCfgId" :disabled="true">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-input v-model="formInline.createTime" :disabled="true" placeholder="创建时间"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--修改表单-->
    <div class="addForm fnn" v-if="changeNow==true">
      <div class="addContent addContent2 gg3">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeChange">
        </div>
        <!--推荐人佣金，代理管理权限，融资周期字段不明确-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" :rules="rules">
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
          <el-form-item label="代理名称：" prop="accountName">
            <el-input v-model="formInline.accountName" placeholder="代理名称"></el-input>
          </el-form-item>
          <el-form-item label="代理商限额：" prop="agentMaxLimitMoney">
            <el-input v-model="formInline.agentMaxLimitMoney" placeholder="数据为0时无限制"></el-input>
          </el-form-item>
          <el-form-item label="资金池ID：" prop="productGroupId">
            <el-select v-model="formInline.productGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理等级：" prop="level">
            <el-select v-model="formInline.level">
              <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="佣金方案(单边)：" class="smallfont" prop=" commissionCfgId">
            <el-select v-model="formInline.commissionCfgId">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理管理权限：" prop="ableCrud">
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
          <el-form-item label="个股持仓比例：" prop="positionRatio">
            <el-input v-model="formInline.positionRatio" placeholder="个股持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="创业板持仓比例：" class="smallfont" prop="secondBoardPositionRatio">
            <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：" class="smallfont" prop="thirdBoardPositionRatio">
            <el-input v-model="formInline.thirdBoardPositionRatio" placeholder="科创板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="创业板个股持仓比率：" class="smallfont" prop="secondBoardSingleStockPositionRatio">
            <el-input v-model="formInline.secondBoardSingleStockPositionRatio" placeholder="请输入0-1之间的数字"></el-input>
          </el-form-item>
          <el-form-item label="科创板个股持仓比率：" class="smallfont" prop="thirdBoardSingleStockPositionRatio">
            <el-input v-model="formInline.thirdBoardSingleStockPositionRatio" placeholder="请输入0-1之间的数字"></el-input>
          </el-form-item>
          <el-form-item label="融资比例：">
            <el-input v-model="formInline.financeRatio" :disabled="true" placeholder="融资比例"></el-input>
          </el-form-item>
          <el-form-item label="管理费率：" prop="manageFeeRate">
            <el-input v-model="formInline.manageFeeRate" placeholder="管理费率"></el-input>
          </el-form-item>
          <el-form-item label="建仓费率：" prop="manageMakeFeeRate">
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
          <el-form-item label="下单权限：" prop="orderPermission">
            <el-select v-model="formInline.orderPermission">
              <el-option v-for="(item,index) in orderPermissionList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理状态：" prop="accountStatus">
            <el-select v-model="formInline.accountStatus">
              <el-option v-for="(item,index) in accountStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认资金池：" class="smallfont" prop="defaultChildGroupId" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认佣金方案：" class="smallfont" prop="defaultChildCommissionCfgId" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildCommissionCfgId">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmit('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeAdd1('formInline')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--邀请码二维码-->
    <div :class="{'show-qrcode': showQrcode==true,addForm:true,'qrcode':true,}" @click="mouseOut">
      <div :class="{'qrbox':true}">
        <span>邀请码：{{inviteCode1}}</span>
        <div id="qrcode" ref="qrcode"></div>
      </div>
    </div>
    <div :class="{'qrbox1':true,'show-qrcode1': showQrcode1==true,'qrcode1':true}" id="qrcode2">
      <span>邀请码：{{inviteCode}}</span>
      <div id="qrcode1" ref="qrcode1"></div>
    </div>
    <!--添加表单-->
    <div class="addForm fnn" v-if="jia==true">
      <div class="addContent addContent2 gg3">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeJia">
        </div>
        <!--推荐人佣金，代理管理权限，融资周期字段不明确-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline" :rules="rules">
          <el-form-item label="推荐人ID：">
            <el-input v-model="formInline.parentAccountCode" :disabled="true" placeholder="推荐人ID"></el-input>
          </el-form-item>
          <el-form-item label="推荐人名称：">
            <el-input v-model="formInline.parentAccountName" :disabled="true" placeholder="推荐人名称"></el-input>
          </el-form-item>
          <el-form-item label="推荐人佣金：">
            <el-input v-model="formInline.commission" :disabled="true" placeholder="推荐人佣金"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="accountId">
            <el-input v-model="formInline.accountId" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="代理名称：" prop="accountName">
            <el-input v-model="formInline.accountName" placeholder="代理名称"></el-input>
          </el-form-item>
          <el-form-item label="代理商限额：" prop="agentMaxLimitMoney">
            <el-input v-model="formInline.agentMaxLimitMoney" placeholder="数据为0时无限制"></el-input>
          </el-form-item>
          <el-form-item label="资金池ID：" prop="productGroupId">
            <el-select v-model="formInline.productGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理等级：" prop="level">
            <el-select v-model="formInline.level">
              <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="佣金方案(单边)：" class="smallfont" prop=" commissionCfgId">
            <el-select v-model="formInline.commissionCfgId">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.id+'~'+item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理管理权限：" prop="ableCrud">
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
          <el-form-item label="个股持仓比例：" prop="positionRatio">
            <el-input v-model="formInline.positionRatio" placeholder="个股持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="创业板持仓比例：" class="smallfont" prop="secondBoardPositionRatio">
            <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：" class="smallfont" prop="thirdBoardPositionRatio">
            <el-input v-model="formInline.thirdBoardPositionRatio" placeholder="科创板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="创业板个股持仓比率：" class="smallfont" prop="secondBoardSingleStockPositionRatio">
            <el-input v-model="formInline.secondBoardSingleStockPositionRatio" placeholder="请输入0-1之间的数字"></el-input>
          </el-form-item>
          <el-form-item label="科创板个股持仓比率：" class="smallfont" prop="thirdBoardSingleStockPositionRatio">
            <el-input v-model="formInline.thirdBoardSingleStockPositionRatio" placeholder="请输入0-1之间的数字"></el-input>
          </el-form-item>
          <el-form-item label="融资比例：">
            <el-input v-model="formInline.financeRatio" :disabled="true" placeholder="融资比例"></el-input>
          </el-form-item>
          <el-form-item label="管理费率：" prop="manageFeeRate">
            <el-input v-model="formInline.manageFeeRate" placeholder="管理费率"></el-input>
          </el-form-item>
          <el-form-item label="建仓费率：" prop="manageMakeFeeRate">
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
          <el-form-item label="下单权限：" prop="orderPermission">
            <el-select v-model="formInline.orderPermission">
              <el-option v-for="(item,index) in orderPermissionList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理状态：" prop="accountStatus">
            <el-select v-model="formInline.accountStatus">
              <el-option v-for="(item,index) in accountStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认资金池：" class="smallfont" prop="defaultChildGroupId" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认佣金方案：" class="smallfont" prop="defaultChildCommissionCfgId" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildCommissionCfgId">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmit2('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeAdd2('formInline')">取消</el-button>
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
      pageSize: 13,
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
        productGroupId: "",
        levelName: "",
        level: "",
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
        orderPermission: 0,
        accountStatus: 1,
        createTime: "",
        commissionCfgList: [],
        productList: [],
        agentLevel: [],
        defaultChildGroupId: "",
        defaultChildCommissionCfgId: "",
        agentMaxLimitMoney: "",
        secondBoardSingleStockPositionRatio: "",
        thirdBoardSingleStockPositionRatio: ""
      },
      groupIdList: [],
      productList: [],
      commissionCfgList: [],
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
      inviteCode1: "",
      inviteCode: "",
      inviteCodeUrl: "",
      showQrcode: false,
      showQrcode1: false,
      checked: false,
      rules: {
        accountId: [
          { required: true, message: "必填项", trigger: "blur" },
          {
            pattern: /^1[0-9]{10}$/,
            message: "手机号错误",
            trigger: "blur"
          }
        ],
        accountName: [
          { required: true, message: "请输入代理名称", trigger: "blur" }
        ],
        agentMaxLimitMoney: [
          { required: true, message: "请输入代理商限额", trigger: "blur" }
        ],
        productGroupId: [
          { required: true, message: "请选择资金池ID", trigger: "change" }
        ],
        level: [
          { required: true, message: "请选择代理等级", trigger: "change" }
        ],
        commissionCfgId: [
          { required: true, message: "请选择佣金方案(单边)", trigger: "change" }
        ],
        ableCrud: [
          { required: true, message: "请选择代理管理权限", trigger: "change" }
        ],
        positionRatio: [
          { required: true, message: "请输入个股持仓比例", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        secondBoardPositionRatio: [
          { required: true, message: "请输入创业板持仓比例", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        thirdBoardPositionRatio: [
          { required: true, message: "请输入科创板持仓比例", trigger: "blur" },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        secondBoardSingleStockPositionRatio: [
          {
            required: true,
            message: "请输入创业板个股持仓比率",
            trigger: "blur"
          },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        thirdBoardSingleStockPositionRatio: [
          {
            required: true,
            message: "请输入科创板个股持仓比率",
            trigger: "blur"
          },
          {
            pattern: /^(0.\d+|0|1)$/,
            message: "请输入大于0小于等于1的数字",
            trigger: "blur"
          }
        ],
        manageFeeRate: [
          { required: true, message: "请输入管理费率", trigger: "blur" }
        ],
        manageMakeFeeRate: [
          { required: true, message: "请输入建仓费率", trigger: "blur" }
        ],
        orderPermission: [
          { required: true, message: "请选择下单权限", trigger: "change" }
        ],
        accountStatus: [
          { required: true, message: "请选择代理状态", trigger: "change" }
        ],
        defaultChildGroupId: [
          { required: true, message: "请选择下级默认资金池", trigger: "change" }
        ],
        defaultChildCommissionCfgId: [
          {
            required: true,
            message: "请选择下级默认佣金方案",
            trigger: "change"
          }
        ]
      },
      inviteCode: "",
      loginName: "",
      defaultChildGroupId: "",
      defaultChildCommissionCfgId: "",
      levelId: "",
      indexindex:""
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
  watch: {},
  created() {
    this.getMsg();
    this.getFundAccount();
    this.getGroupIdList();
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.loginName = localStorage.getItem("loginName");
    this.defaultChildGroupId = localStorage.getItem("defaultChildGroupId");
    this.defaultChildCommissionCfgId = localStorage.getItem(
      "defaultChildCommissionCfgId"
    );
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      console.log("布偶", row.profit);
      if (Number(row.profit) > 0) {
        return "red";
      } else if (Number(row.profit) < 0) {
        return "colorgreen";
      }
      return "";
    },
    // groupIdList
    formattername(row, column) {
      let a;
      if (row) {
        let productGroupId = row.productGroupId;
        this.groupIdList.map(item => {
          switch (productGroupId) {
            case item.groupId:
              a = item.groupName;
          }
        });
        return a;
      }
    },
    formattera(row, column) {
      if (row) {
        let orderPermission = row.orderPermission;
        switch (orderPermission) {
          case 0:
            return "可买卖";
          case 1:
            return "禁买";
          case 2:
            return "禁卖";
          case 3:
            return "禁买卖";
        }
      }
    },
    getDefaultGroupName(id) {
      let a;
      this.groupIdList.map(item => {
        if (item.groupId == id) {
          a = item.groupName;
        }
      });
      return a;
    },
    getDefaultGroupName1(id) {
      let a;
      this.commissionCfgList.map(item => {
        if (item.id == id) {
          a = item.cfgName;
        }
      });
      return a;
    },
    getGroupIdList() {
      this.axios
        .post("/tn/mgr-api/account/fund-list")
        .then(res => {
          if (res.data.code == 200) {
            this.groupIdList = res.data.data;
            console.log("数组", this.groupIdList);
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
    money(index, row) {
      let accountId = row.accountId;
      this.$router.push({
        path: "/ninehome/money",
        query: {
          accountId: accountId
        }
      });
    },
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/agent/agentList/export",
        data: {
          accountId: this.agentId,
          accountName: this.agentName,
          pageSize: this.pageSize,
          pageNo: -1,
          queryChild: this.checked
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
      console.log(
        "ID",
        this.defaultChildGroupId,
        this.defaultChildCommissionCfgId
      );
      this.jia = true;
      this.addTitle = "添加";
      this.formInline.parentAccountCode = this.loginName;
      this.formInline.parentAccountName = this.userName;
      this.formInline.balance = 0;
      this.formInline.allottedScale = 0;
      this.formInline.cashScale = 0;
      this.formInline.freezeScale = 0;
      this.formInline.flatLine = 0;
      this.formInline.cordonLine = 0;
      this.formInline.financeRatio = 0;
      this.formInline.accountId = "";
      this.formInline.accountName = "";
      this.formInline.productGroupId = Number(this.defaultChildGroupId);
      this.formInline.level = "";
      this.formInline.commission = 0;
      this.formInline.commissionCfgId = Number(
        this.defaultChildCommissionCfgId
      );
      this.formInline.ableCrud = "";
      this.formInline.agentMaxLimitMoney = "";
      this.formInline.positionRatio = "";
      this.formInline.secondBoardPositionRatio = "";
      this.formInline.thirdBoardPositionRatio = "";
      this.formInline.manageFeeRate = "";
      this.formInline.manageMakeFeeRate = "";
      this.formInline.orderPermission = 0;
      this.formInline.accountStatus = 1;
      this.formInline.defaultChildGroupId = "";
      this.formInline.defaultChildCommissionCfgId = "";
      this.formInline.secondBoardSingleStockPositionRatio = "";
      this.formInline.thirdBoardSingleStockPositionRatio = "";
    },
    showEveryCode(index, row) {
      console.log("index2", index);
      this.indexindex=index;
      if (index > 7) {
        index = 7;
      }
      let inviteCode = row.inviteCode;
      this.inviteCode = inviteCode;
      this.showQrcode1 = true;
      document.getElementById("qrcode1").innerHTML = "";
      document.getElementById("qrcode2").style.top = 220 + 50 * index + "px";
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
      qrcode._el.title = "";
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
      qrcode._el.title = "";
    },
    mouseOver() {
      this.showQrcode = true;
    },
    mouseOut() {
      this.showQrcode = false;
    },
    getMsg() {
      this.axios
        .post("/tn/mgr-api/account/agent/edit-pre")
        .then(res => {
          if (res.data.code == 200) {
            this.commissionCfgList = res.data.data.commissionCfgList;
            this.productList = res.data.data.productList;
            this.agentLevel = res.data.data.agentLevel;
            this.inviteCode1 = res.data.data.inviteCode;
            console.log("我是等级", this.agentLevel);
            //取出客户
            this.agentLevel.map(item => {
              if (item.levelName == "客户") {
                this.levelId = item.level;
              }
            });
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/tn/mgr-api/account/save", {
              accountId: this.formInline.accountId,
              accountName: this.formInline.accountName,
              productGroupId: this.formInline.productGroupId,
              level: this.formInline.level,
              commissionCfgId: this.formInline.commissionCfgId,
              ableCrud: this.formInline.ableCrud,
              agentMaxLimitMoney: this.formInline.agentMaxLimitMoney,
              positionRatio: this.formInline.positionRatio,
              secondBoardPositionRatio: this.formInline
                .secondBoardPositionRatio,
              thirdBoardPositionRatio: this.formInline.thirdBoardPositionRatio,
              manageFeeRate: this.formInline.manageFeeRate,
              manageMakeFeeRate: this.formInline.manageMakeFeeRate,
              orderPermission: this.formInline.orderPermission,
              accountStatus: this.formInline.accountStatus,
              defaultChildGroupId: this.formInline.defaultChildGroupId,
              defaultChildCommissionCfgId: this.formInline
                .defaultChildCommissionCfgId,
              secondBoardSingleStockPositionRatio: this.formInline
                .secondBoardSingleStockPositionRatio,
              thirdBoardSingleStockPositionRatio: this.formInline
                .thirdBoardSingleStockPositionRatio,
              bankId: 0
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
        } else {
          console.log("提交信息错误");
          return false;
        }
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/tn/mgr-api/account/update", {
              accountId: this.formInline.accountId,
              accountName: this.formInline.accountName,
              productGroupId: this.formInline.productGroupId,
              level: this.formInline.level,
              commissionCfgId: this.formInline.commissionCfgId,
              ableCrud: this.formInline.ableCrud,
              agentMaxLimitMoney: this.formInline.agentMaxLimitMoney,
              positionRatio: this.formInline.positionRatio,
              secondBoardPositionRatio: this.formInline
                .secondBoardPositionRatio,
              thirdBoardPositionRatio: this.formInline.thirdBoardPositionRatio,
              manageFeeRate: this.formInline.manageFeeRate,
              manageMakeFeeRate: this.formInline.manageMakeFeeRate,
              orderPermission: this.formInline.orderPermission,
              accountStatus: this.formInline.accountStatus,
              defaultChildGroupId: this.formInline.defaultChildGroupId,
              defaultChildCommissionCfgId: this.formInline
                .defaultChildCommissionCfgId,
              secondBoardSingleStockPositionRatio: this.formInline
                .secondBoardSingleStockPositionRatio,
              thirdBoardSingleStockPositionRatio: this.formInline
                .thirdBoardSingleStockPositionRatio,
              bankId: 0
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
        } else {
          console.log("提交信息错误");
          return false;
        }
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
        .post("/tn/mgr-api/account/resetPassword", {
          accountId: accountId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert("重置密码成功,密码是账户后六位", "提示", {
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
    search() {
      this.currentPage = 1;
      this.getFundAccount(this.agentName, this.agentId);
    },
    getFundAccount(agentName, agentId) {
      if (!agentName) {
        agentName = "";
      }
      if (!agentId) {
        agentId = "";
      }
      console.log("选择", this.checked);
      this.axios
        .post("/tn/mgr-api/account/agent/agentList", {
          accountId: agentId,
          accountName: agentName,
          pageSize: this.pageSize,
          pageNo: this.currentPage,
          queryChild: this.checked
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
  left: 1260px;
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
  width: 20px;
  height: 20px;
  margin-left: 22px;
  cursor: pointer;
}
</style>
<style>
.el-table .colorgreen {
  background-color: #dff0d8 !important;
}
.el-table .yellow {
  background-color: #fcf8e3 !important;
}
.el-table .red {
  background-color: #f2dede !important;
}
.daili .el-table__body tr td {
  background: none !important;
}
.daili .el-table__body tr.el-table__row--striped td {
  background: transparent !important;
}
.fnn .el-form-item__label {
  width: 180px !important;
  margin-left: 24px !important;
}
.daili .operation span {
  margin-right: 4px;
  font-weight: none !important;
}
.codeborder{border:2px solid #2662ee;border-radius: 50%;}
</style>



