<!--会员列表-->
<template>
  <div class="bigestbox" @click="hideEveryCode">
    <topNav></topNav>
    <div class="container" @click="colorBool = false">
      <div class="template-top">
        <div class="title" @click="jiaNow">添加</div>
        <div class="title" style="margin-left:7px;" @click="mouseOver">我的二维码</div>
        <div class="title" style="margin-left:7px;" @click="huishou">回收站</div>
        <div class="operate-btn">
          <div class="search-box">
            <input type="text" placeholder="请输入会员ID" v-model="agentId" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="tmbox">
            <el-checkbox v-model="checked">下级</el-checkbox>
          </div>
          <div class="search-box">
            <input type="text" placeholder="请输入会员名称" v-model="agentName" />
            <img src="../../../assets/nine/search.png" class="search-img" />
          </div>
          <div class="search-user" @click="search">查询</div>
          <div class="search-user" @click="exportExcel">导出</div>
        </div>
      </div>
      <!--表格-->
      <div class="reset-scroll-style">
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table huiyuan" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" :row-class-name="tableRowClassName" v-if="!nullTable">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center" width="400">
            <template slot-scope="scope">
              <div class="operation">
                <span @click.stop="changeMsg(scope.$index,scope.row)" class="addSameClass ">修改</span>
                <span @click.stop="resetPassWord(scope.$index,scope.row)" class="addSameClass ">重置密码</span>
                <span @click.stop="look(scope.$index,scope.row)" class="addSameClass ">查看</span>
                <span @click.stop="money(scope.$index,scope.row)" class="addSameClass ">资金</span>
                <span v-if="scope.row.accountStatus == 2 || scope.row.balance < 0" @click.stop="ping(scope.$index,scope.row)" class="addSameClass ">平仓</span>
                <span @click.stop="changeWho(scope.$index, scope.row)" class="addSameClass ">修改角色</span>
                <span class="addSameClass " @click.stop="changeSet(scope.$index, scope.row)">修改用户推荐人</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级" prop="level" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级名称" prop="levelName" align="center"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="会员ID" width="120" prop="accountId" align="center"></el-table-column> -->
          <el-table-column label="会员ID" align="center" width="120">
            <template slot-scope="scope">
              <div class="operation">
                <span style="color:#2662ee;" @click.stop="y1(scope.$index,scope.row)">{{scope.row.accountId}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" width="120" prop="accountName" align="center"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip label="会员状态" prop="accountStatus" :class="{red:accountStatus==2}" :formatter="formatter" align="center"></el-table-column> -->
          <el-table-column label="会员状态" align="center">
            <template slot-scope="scope">
              <div class="operation">
                <span style="color:red;" v-if="scope.row.accountStatus==2">停机</span>
                <span style="color:green;" v-if="scope.row.accountStatus==1">正常</span>
                <span style="color:red;" v-if="scope.row.accountStatus==0">失效</span>
                <span style="color:red;" v-if="scope.row.accountStatus==-1">删除</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="下级默认资金池" align="center" width="140">
            <template slot-scope="scope">
              {{getDefaultGroupName(scope.row.defaultChildGroupId)}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="下级默认佣金方案" align="center" width="140">
            <template slot-scope="scope">
              {{getDefaultGroupName1(scope.row.defaultChildCommissionCfgId)}}
            </template>
          </el-table-column>

          <el-table-column show-overflow-tooltip label="代理商限额" prop="agentMaxLimitMoney" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="单边佣金" prop="commission" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人ID" prop="parentAccountCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" prop="parentAccountName" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" width="120" prop="balance" align="center"></el-table-column>
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
          <el-table-column show-overflow-tooltip label="创业板个股持仓比率" width="150" prop="secondBoardSingleStockPositionRatio" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板个股持仓比率" width="150" prop="thirdBoardSingleStockPositionRatio" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="下单权限" prop="orderPermission" :formatter="formattera" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资比例" prop="financeRatio" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资周期" prop="financePeriodDesc" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="管理费率" prop="manageFeeRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="建仓费率" prop="manageMakeFeeRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈利分成率" prop="separateFeeRate" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资开始日期" prop="financeStartDate" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建时间" width="200" prop="createTime" align="center"></el-table-column>
        </el-table>
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable1" stripe class="user-table" style="width:98.4%;background-color:#ffffff;" height="650" :cell-style="cellStyle" :header-cell-style="headerCellStyle" v-if="nullTable">
          <el-table-column show-overflow-tooltip label="等级" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="等级名称" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员ID" width="120" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员名称" width="120" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="会员状态" :formatter="formatter" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理商限额" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="下级默认资金池" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="下级默认佣金方案" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="单边佣金" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人ID" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="推荐人名称" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="账户余额" width="120" align="center"></el-table-column>
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
          <el-table-column show-overflow-tooltip label="创业板个股持仓比率" width="150" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="科创板个股持仓比率" width="150" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="下单权限" align="center"></el-table-column>
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
    <div class="addForm" v-if="hsbool">
      <div class="addContent addcontenths">
        <div class="reset-scroll-style">
          <div class="title">
            <span class="tl">回收站</span>
            <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closehs">
          </div>
          <el-table :border="true" :highlight-current-row="colorBool" :data="tableData1" key="desingerTable2" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle">
            <el-table-column show-overflow-tooltip label="创建时间" prop="createTime" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="会员ID" prop="accountId" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="会员名称" prop="accountName" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="会员状态" prop="statusDesc" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="产品" prop="productCode" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="单边佣金" prop="commission" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="推荐人ID" prop="parentAccountCode" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="账户余额" prop="balance" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="期初规模" prop="allottedScale" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="可用资金" prop="ableScale" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="保证金" prop="cashScale" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="手动冻结资金" prop="freezeScale" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="总盈亏" prop="profit" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="平仓线（金额）" prop="flatLine" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="警戒线（金额）" prop="cordonLine" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="个股持仓比例" prop="positionRatio" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="创业板持仓比例" prop="secondBoardPositionRatio" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="科创板持仓比例" prop="thirdBoardPositionRatio" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="下单权限" prop="orderPermissionDesc" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="融资比例" prop="financeRatio" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="融资周期" prop="financePeriodDesc" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="管理费率" prop="manageFeeDealRate" align="center"></el-table-column>
            <el-table-column show-overflow-tooltip label="建仓费率" prop="manageMakeFeeRate" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!--表单-->
    <div class="addForm fnn" v-if="showAdd==true">
      <div class="addContent addContent2 gg3">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeAdd">
        </div>
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
          <el-form-item label="会员ID：">
            <el-input v-model="formInline.accountId" :disabled="true" placeholder="会员ID"></el-input>
          </el-form-item>
          <el-form-item label="会员名称：">
            <el-input v-model="formInline.accountName" :disabled="true" placeholder="会员名称"></el-input>
          </el-form-item>
          <el-form-item label="资金池ID：">
            <el-select v-model="formInline.productGroupId" :disabled="true">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员等级：">
            <el-select v-model="formInline.level" :disabled="true">
              <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="佣金方案(单边)：">
            <el-select v-model="formInline.commissionCfgId" :disabled="true">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员管理权限：">
            <el-select v-model="formInline.ableCrud" :disabled="true">
              <el-option v-for="(item,index) in productCodeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商限额：">
            <el-input :disabled="true" v-model="formInline.agentMaxLimitMoney" placeholder="数据为0时无限制"></el-input>
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
          <el-form-item label="会员状态：">
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
          <el-form-item label="添加开户银行：">
            <el-radio v-model="radio1" :label="1" :disabled="true">是</el-radio>
            <el-radio v-model="radio1" :label="0" :disabled="true">否</el-radio>
          </el-form-item>
          <el-form-item label="开户银行：" v-if="radio1==1">
            <el-select v-model="formInline.bankId" :disabled="true">
              <el-option v-for="(item,index) in banksList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行省份：" v-if="radio1==1">
            <el-select v-model="formInline.provinceId" :disabled="true">
              <el-option v-for="(item,index) in provincesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行城市：" v-if="radio1==1">
            <el-select v-model="formInline.cityId" :disabled="true">
              <el-option v-for="(item,index) in citiesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行支行：" v-if="radio1==1">
            <el-select v-model="formInline.subBranchId" :disabled="true">
              <el-option v-for="(item,index) in branchesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡号：" v-if="radio1==1">
            <el-input v-model="formInline.cardNo" :disabled="true" placeholder="卡号"></el-input>
          </el-form-item>
          <el-form-item label="开户名：" v-if="radio1==1">
            <el-input v-model="formInline.userName" :disabled="true" placeholder="开户名"></el-input>
          </el-form-item>
          <el-form-item label="身份证：" v-if="radio1==1">
            <el-input v-model="formInline.identityNo" :disabled="true" placeholder="身份证"></el-input>
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
          <el-form-item label="会员ID：">
            <el-input v-model="formInline.accountId" :disabled="true" placeholder="会员ID"></el-input>
          </el-form-item>
          <el-form-item label="会员名称：">
            <el-input v-model="formInline.accountName" placeholder="会员名称"></el-input>
          </el-form-item>
          <el-form-item label="资金池ID：">
            <el-select v-model="formInline.productGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员等级：">
            <el-select v-model="formInline.level">
              <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="佣金方案(单边)：">
            <el-select v-model="formInline.commissionCfgId">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员管理权限：">
            <el-select v-model="formInline.ableCrud">
              <el-option v-for="(item,index) in productCodeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商限额：">
            <el-input v-model="formInline.agentMaxLimitMoney" placeholder="数据为0时无限制"></el-input>
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
          <el-form-item label="创业板持仓比例：" class="smallfont">
            <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：" class="smallfont">
            <el-input v-model="formInline.thirdBoardPositionRatio" placeholder="科创板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="创业板个股持仓比率：" class="smallfont">
            <el-input v-model="formInline.secondBoardSingleStockPositionRatio" placeholder="请输入0-1之间的数字"></el-input>
          </el-form-item>
          <el-form-item label="科创板个股持仓比率：" class="smallfont">
            <el-input v-model="formInline.thirdBoardSingleStockPositionRatio" placeholder="请输入0-1之间的数字"></el-input>
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
          <el-form-item label="会员状态：">
            <el-select v-model="formInline.accountStatus">
              <el-option v-for="(item,index) in accountStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认资金池：" class="smallfont" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认佣金方案：" class="smallfont" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildCommissionCfgId">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加开户银行：">
            <el-radio v-model="radio1" :label="1">是</el-radio>
            <el-radio v-model="radio1" :label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="开户银行：" v-if="radio1==1">
            <el-select v-model="formInline.bankId">
              <el-option v-for="(item,index) in banksList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行省份：" v-if="radio1==1">
            <el-select v-model="formInline.provinceId">
              <el-option v-for="(item,index) in provincesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行城市：" v-if="radio1==1">
            <el-select v-model="formInline.cityId">
              <el-option v-for="(item,index) in citiesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行支行：" v-if="radio1==1">
            <el-select v-model="formInline.subBranchId">
              <el-option v-for="(item,index) in branchesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡号：" v-if="radio1==1">
            <el-input v-model="formInline.cardNo" placeholder="卡号"></el-input>
          </el-form-item>
          <el-form-item label="开户名：" v-if="radio1==1">
            <el-input v-model="formInline.userName" placeholder="开户名"></el-input>
          </el-form-item>
          <el-form-item label="身份证：" v-if="radio1==1">
            <el-input v-model="formInline.identityNo" placeholder="身份证"></el-input>
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
        <span>邀请码：{{inviteCode}}</span>
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
          <el-form-item label="手机号：">
            <el-input v-model="formInline.accountId" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="会员名称：">
            <el-input v-model="formInline.accountName" placeholder="会员名称"></el-input>
          </el-form-item>
          <el-form-item label="资金池ID：">
            <el-select v-model="formInline.productGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员等级：">
            <el-select v-model="formInline.level">
              <el-option v-for="(item,index) in agentLevel" :key="index" :label="item.levelName" :value="item.level"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="佣金方案(单边)：">
            <el-select v-model="formInline.commissionCfgId">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员管理权限：">
            <el-select v-model="formInline.ableCrud">
              <el-option v-for="(item,index) in productCodeList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理商限额：">
            <el-input v-model="formInline.agentMaxLimitMoney" placeholder="数据为0时无限制"></el-input>
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
          <el-form-item label="创业板持仓比例：" class="smallfont">
            <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：" class="smallfont">
            <el-input v-model="formInline.thirdBoardPositionRatio" placeholder="科创板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="创业板个股持仓比率：" class="smallfont">
            <el-input v-model="formInline.secondBoardSingleStockPositionRatio" placeholder="请输入0-1之间的数字"></el-input>
          </el-form-item>
          <el-form-item label="科创板个股持仓比率：" class="smallfont">
            <el-input v-model="formInline.thirdBoardSingleStockPositionRatio" placeholder="请输入0-1之间的数字"></el-input>
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
          <el-form-item label="会员状态：">
            <el-select v-model="formInline.accountStatus">
              <el-option v-for="(item,index) in accountStatusList" :key="index" :label="item.value" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认资金池：" class="smallfont" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认佣金方案：" class="smallfont" v-if="formInline.level!=levelId">
            <el-select v-model="formInline.defaultChildCommissionCfgId">
              <el-option v-for="(item,index) in commissionCfgList" :key="index" :label="item.cfgName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加开户银行：">
            <el-radio v-model="radio1" :label="1">是</el-radio>
            <el-radio v-model="radio1" :label="0">否</el-radio>
          </el-form-item>
          <el-form-item label="开户银行：" v-if="radio1==1">
            <el-select v-model="formInline.bankId">
              <el-option v-for="(item,index) in banksList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行省份：" v-if="radio1==1">
            <el-select v-model="formInline.provinceId">
              <el-option v-for="(item,index) in provincesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行城市：" v-if="radio1==1">
            <el-select v-model="formInline.cityId">
              <el-option v-for="(item,index) in citiesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行支行：" v-if="radio1==1">
            <el-select v-model="formInline.subBranchId">
              <el-option v-for="(item,index) in branchesList" :key="index" :label="item.text" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡号：" v-if="radio1==1">
            <el-input v-model="formInline.cardNo" placeholder="卡号"></el-input>
          </el-form-item>
          <el-form-item label="开户名：" v-if="radio1==1">
            <el-input v-model="formInline.userName" placeholder="开户名"></el-input>
          </el-form-item>
          <el-form-item label="身份证：" v-if="radio1==1">
            <el-input v-model="formInline.identityNo" placeholder="身份证"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="onSubmit2('formInline')">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeAdd2('formInline')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="addForm" v-if="msg==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">修改角色</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeMsg">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <div class="changewho">
            <el-radio-group v-model="radio">
              <el-radio :class="{tradio:index==5}" :label="item.roleId" v-for="(item,index) in levelList" :key="index">{{item.roleName}}</el-radio>
            </el-radio-group>
          </div>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="saveChange">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeMsg">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="addForm" v-if="setBool==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">修改用户推荐人</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeMsgSet">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <div>
            <el-form-item label="推荐人：">
              <el-select v-model="whowho">
                <el-option v-for="(item,index) in eList" :key="index" :label="item.accountId+'~'+item.accountName" :value="item.accountId"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <br />
          <el-form-item>
            <el-button class="savebt" type="primary" @click="saveChangeSet">保存</el-button>
            <el-button class="nobt" type="primary" @click="closeMsgSet">取消</el-button>
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
      checked: false,
      hsbool: false,
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
      banksList: [],
      provincesList: [],
      citiesList: [],
      branchesList: [],
      formInline: {
        parentAccountCode: "",
        parentAccountName: "",
        commission: "",
        accountId: "",
        accountName: "",
        productCode: "",
        productGroupId: "",
        level: "",
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
        orderPermission: 0,
        accountStatus: 1,
        createTime: "",
        commissionCfgList: [],
        productList: [],
        agentLevel: [],
        defaultChildGroupId: "",
        defaultChildCommissionCfgId: "",
        secondBoardSingleStockPositionRatio: "",
        thirdBoardSingleStockPositionRatio: "",
        agentMaxLimitMoney: "",
        bankId: "",
        provinceId: "",
        cityId: "",
        subBranchId: "",
        cardNo: "",
        userName: "",
        identityNo: "",
        bankName: "",
        provinceName: "",
        cityName: "",
        subBranchName: ""
      },
      radio1: 0,
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
      inviteCode: "",
      inviteCodeUrl: "",
      showQrcode: false,
      showQrcode1: false,
      groupIdList: [],
      levelList: [],
      accountCode: "",
      msg: false,
      radio: "",
      setBool: false,
      eList: [],
      whoid: "",
      whowho: "",
      tableData1: "",
      total1: "",
      nullTable1: false,
      loginName: "",
      defaultChildGroupId: "",
      defaultChildCommissionCfgId: "",
      levelId: ""
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
    "formInline.bankId": {
      handler(newVal, oldVal) {
        this.getProvincesList();
        this.getCitiesList();
        this.getBranchesList();
      },
      deep: true
    },
    "formInline.provinceId": {
      handler(newVal, oldVal) {
        this.getCitiesList();
        this.getBranchesList();
      },
      deep: true
    },
    "formInline.cityId": {
      handler(newVal, oldVal) {
        this.getBranchesList();
      },
      deep: true
    }
  },
  created() {
    this.getBanksList();
    this.getProvincesList();
    this.getCitiesList();
    this.getBranchesList();
    this.getMsg();
    this.getFundAccount();
    this.getGroupIdList();
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.loginName = localStorage.getItem("loginName");
    this.getEList();
    this.defaultChildGroupId = localStorage.getItem("defaultChildGroupId");
    this.defaultChildCommissionCfgId = localStorage.getItem(
      "defaultChildCommissionCfgId"
    );
  },
  methods: {
    y1(index, row) {
      let accountId = row.accountId;
      this.$router.push({
        path: "/ninehome/y1",
        query: {
          accountId: accountId
        }
      });
    },
    huishou() {
      this.hsbool = true;
      this.getHS();
    },
    closehs() {
      this.hsbool = false;
    },
    formatterday(index, row) {
      if (row) {
        if (row.financePeriod == "day") {
          return "天";
        } else if (row.financePeriod == "week") {
          return "周";
        } else if (row.financePeriod == "month") {
          return "月";
        } else if (row.financePeriod == "single") {
          return "单";
        } else {
          return "-";
        }
      }
    },
    getHS() {
      this.axios
        .post("/tn/mgr-api/account/garbageList")
        .then(res => {
          if (res.data.code == 200) {
            let rows = res.data.data.rows;
            if (rows.length > 0) {
              this.tableData1 = res.data.data.rows;
            } else {
              this.tableData1 = [];
            }
            this.total1 = res.data.data.total;
          } else {
            this.tableData1 = [];
          }
          if (this.tableData1.length <= 0) {
            this.nullTable1 = true;
            this.tableData1 = new Array(this.pageSize);
          } else {
            this.nullTable1 = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBanksList() {
      this.axios
        .post("/tn/mgr-api/account/banks")
        .then(res => {
          if (res.data.code == 200) {
            this.banksList = res.data.data;
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
    getProvincesList() {
      this.axios
        .post("/tn/mgr-api/account/banks/provinces", {
          bankId: this.formInline.bankId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.provincesList = res.data.data;
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
    getCitiesList() {
      this.axios
        .post("/tn/mgr-api/account/banks/provinces/cities", {
          bankId: this.formInline.bankId,
          provinceId: this.formInline.provinceId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.citiesList = res.data.data;
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
    getBranchesList() {
      this.axios
        .post("/tn/mgr-api/account/banks/provinces/cities/branches", {
          bankId: this.formInline.bankId,
          provinceId: this.formInline.provinceId,
          cityId: this.formInline.cityId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.branchesList = res.data.data;
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
    getEList() {
      this.axios.post("/tn/mgr-api/account/edit-pre").then(res => {
        if (res.data.code == 200) {
          this.eList = res.data.data.accountList;
        } else {
          this.$alert(res.data.info, "提示", {
            confirmButtonText: "确定",
            center: true,
            type: "error"
          });
        }
      });
    },
    saveChangeSet() {
      this.axios
        .post("/tn/mgr-api/account/update-parent", {
          accountCode: this.whoid,
          parentCode: this.whowho
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.getFundAccount();
            this.setBool = false;
          } else {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        });
    },
    closeMsgSet() {
      this.setBool = false;
    },
    changeSet(index, row) {
      let accountCode = row.accountId;
      let parentCode = row.parentAccountCode;
      this.whoid = accountCode;
      this.whowho = parentCode;
      this.setBool = true;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.profit > 0) {
        return "red";
      } else if (row.profit < 0) {
        return "colorgreen";
      }
      return "";
    },
    closeMsg() {
      this.msg = false;
    },
    changeWho(index, row) {
      this.msg = true;
      this.accountCode = row.accountId;
      this.getAgentLevel();
    },
    saveChange() {
      this.axios
        .post("/tn/mgr-api/account/role/update", {
          accountCode: this.accountCode,
          roleId: this.radio
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
            this.msg = false;
            this.getFundAccount();
          } else {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        });
    },
    getAgentLevel() {
      this.axios
        .post("/tn/mgr-api/account/role", {
          accountCode: this.accountCode
        })
        .then(res => {
          if (res.data.code == 200) {
            this.levelList = res.data.data;
            let that = this;
            this.levelList.map((item, index) => {
              if (item.isUserRole == 1) {
                console.log("我在的", item, item.roleId);
                that.radio = item.roleId;
              }
            });
          } else {
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "error"
            });
          }
        });
    },
    ping(index, row) {
      let accountCode = row.accountId;
      this.axios
        .post("/tn/mgr-api/account/closePosition", {
          accountCode: accountCode
        })
        .then(res => {
          if (res.data.code == 200) {
            this.getFundAccount();
            this.$alert(res.data.info, "提示", {
              confirmButtonText: "确定",
              center: true,
              type: "success"
            });
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
    exportExcel() {
      this.axios({
        method: "post",
        responseType: "arraybuffer",
        url: "/tn/mgr-api/account/accountList/export",
        data: {
          accountId: this.agentId,
          accountName: this.agentName,
          queryChild: this.checked,
          pageNo: -1
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
      this.formInline.accountId = "";
      this.formInline.accountName = "";
      this.formInline.productGroupId = Number(this.defaultChildGroupId);
      this.formInline.level = "";
      this.formInline.commission = 0;
      this.formInline.commissionCfgId = Number(
        this.defaultChildCommissionCfgId
      );
      this.formInline.ableCrud = "";
      this.formInline.positionRatio = "";
      this.formInline.secondBoardPositionRatio = "";
      this.formInline.thirdBoardPositionRatio = "";
      this.formInline.manageFeeRate = "";
      this.formInline.manageMakeFeeRate = "";
      this.formInline.orderPermission = 0;
      this.formInline.accountStatus = 1;
      this.formInline.defaultChildGroupId = "";
      this.formInline.defaultChildCommissionCfgId = "";
      this.formInline.parentAccountCode = this.loginName;
      this.formInline.parentAccountName = this.userName;
      this.formInline.balance = 0;
      this.formInline.allottedScale = 0;
      this.formInline.cashScale = 0;
      this.formInline.freezeScale = 0;
      this.formInline.flatLine = 0;
      this.formInline.cordonLine = 0;
      this.formInline.financeRatio = 0;
      this.formInline.secondBoardSingleStockPositionRatio = "";
      this.formInline.thirdBoardSingleStockPositionRatio = "";
      this.agentMaxLimitMoney = "";
      this.radio1 = 0;
      this.formInline.bankId = "";
      this.formInline.provinceId = "";
      this.formInline.cityId = "";
      this.formInline.subBranchId = "";
      this.formInline.cardNo = "";
      this.formInline.userName = "";
      this.formInline.identityNo = "";
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
            if (this.formInline.bankId == 0) {
              this.radio1 = 0;
            } else {
              this.radio1 = 1;
            }
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
      this.banksList.map(item => {
        if (this.formInline.bankId == item.value) {
          this.formInline.bankName = item.text;
        }
      });
      this.provincesList.map(item => {
        if (this.formInline.provinceId == item.value) {
          this.formInline.provinceName = item.text;
        }
      });
      this.citiesList.map(item => {
        if (this.formInline.cityId == item.value) {
          this.formInline.cityName = item.text;
        }
      });
      this.branchesList.map(item => {
        if (this.formInline.subBranchId == item.value) {
          this.formInline.subBranchName = item.text;
        }
      });
      this.axios
        .post("/tn/mgr-api/account/save", {
          accountId: this.formInline.accountId,
          accountName: this.formInline.accountName,
          //   productCode: this.formInline.productCode,
          productGroupId: this.formInline.productGroupId,
          level: this.formInline.level,
          commissionCfgId: this.formInline.commissionCfgId,
          ableCrud: this.formInline.ableCrud,
          positionRatio: this.formInline.positionRatio,
          secondBoardPositionRatio: this.formInline.secondBoardPositionRatio,
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
          agentMaxLimitMoney: this.formInline.agentMaxLimitMoney,
          bankId: this.formInline.bankId || 0,
          bankName: this.formInline.bankName,
          provinceId: this.formInline.provinceId || 0,
          provinceName: this.formInline.provinceName,
          cityId: this.formInline.cityId || 0,
          cityName: this.formInline.cityName,
          subBranchId: this.formInline.subBranchId || 0,
          subBranchName: this.formInline.subBranchName,
          cardNo: this.formInline.cardNo,
          userName: this.formInline.userName,
          identityNo: this.formInline.identityNo,
          freezeScale: this.formInline.freezeScale,
          flatLine: this.formInline.flatLine,
          cordonLine: this.formInline.cordonLine
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
      this.banksList.map(item => {
        if (this.formInline.bankId == item.value) {
          this.formInline.bankName = item.text;
        }
      });
      this.provincesList.map(item => {
        if (this.formInline.provinceId == item.value) {
          this.formInline.provinceName = item.text;
        }
      });
      this.citiesList.map(item => {
        if (this.formInline.cityId == item.value) {
          this.formInline.cityName = item.text;
        }
      });
      this.branchesList.map(item => {
        if (this.formInline.subBranchId == item.value) {
          this.formInline.subBranchName = item.text;
        }
      });
      this.axios
        .post("/tn/mgr-api/account/update", {
          accountId: this.formInline.accountId,
          accountName: this.formInline.accountName,
          //   productCode: this.formInline.productCode,
          productGroupId: this.formInline.productGroupId,
          level: this.formInline.level,
          commissionCfgId: this.formInline.commissionCfgId,
          ableCrud: this.formInline.ableCrud,
          positionRatio: this.formInline.positionRatio,
          secondBoardPositionRatio: this.formInline.secondBoardPositionRatio,
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
          agentMaxLimitMoney: this.formInline.agentMaxLimitMoney,
          bankId: this.formInline.bankId || 0,
          bankName: this.formInline.bankName,
          provinceId: this.formInline.provinceId || 0,
          provinceName: this.formInline.provinceName,
          cityId: this.formInline.cityId || 0,
          cityName: this.formInline.cityName,
          subBranchId: this.formInline.subBranchId || 0,
          subBranchName: this.formInline.subBranchName,
          cardNo: this.formInline.cardNo,
          userName: this.formInline.userName,
          identityNo: this.formInline.identityNo,
          freezeScale: this.formInline.freezeScale,
          flatLine: this.formInline.flatLine,
          cordonLine: this.formInline.cordonLine
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
      this.addTitle = "查看";
      let accountId = row.accountId;
      this.axios
        .post("/tn/mgr-api/account/detail", {
          accountId: accountId
        })
        .then(res => {
          if (res.data.code == 200) {
            this.showAdd = true;
            this.formInline = res.data.data;
            if (this.formInline.bankId == 0) {
              this.radio1 = 0;
            } else {
              this.radio1 = 1;
            }
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
      this.axios
        .post("/tn/mgr-api/account/agentList", {
          accountId: agentId,
          accountName: agentName,
          queryChild: this.checked,
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
.changewho {
  margin-left: 33px;
  margin-right: 33px;
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
.huiyuan .el-table__body tr td {
  background: none !important;
}
.changewho .el-radio__input.is-checked + .el-radio__label {
  color: #2562ee;
}
.changewho .el-radio__label {
  font-size: 15px;
}
.changewho .el-radio__input.is-checked .el-radio__inner {
  border-color: #2562ee;
  background: #2562ee;
}
.changewho .el-radio__inner {
  width: 17px;
  height: 17px;
}
.tradio {
  margin-left: 0px !important;
}
.fnn .el-form-item__label {
  width: 180px !important;
  margin-left: 24px !important;
}

.huiyuan .el-table__body tr.el-table__row--striped td {
  background: transparent !important;
}
</style>



