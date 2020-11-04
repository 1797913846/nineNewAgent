<!--会员列表-->
<template>
  <div class="bigestbox huiyuan" @click="hideEveryCode">
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
        <el-table :border="true" :highlight-current-row="colorBool" :data="tableData" key="desingerTable" stripe class="user-table" style="width:100%;background-color:#ffffff;" height="600" :cell-style="cellStyle" :header-cell-style="headerCellStyle" :row-class-name="tableRowClassName">
          <!-- <el-table-column type="selection" width="23" align="center"></el-table-column> -->
          <el-table-column label="操作" align="center" width="520">
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
          <el-table-column show-overflow-tooltip label="代理ID" prop="accountId" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理名称" prop="accountName" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="代理状态" prop="accountStatus" :formatter="formatter" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="产品" prop="productCode" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="单边佣金" prop="commission" align="center"></el-table-column>
          <!-- <el-table-column label="邀请码" align="center">
                        <template slot-scope="scope">
                            <img class="smallcode" src="../../../assets/ercode.png" alt="" @click.stop="showEveryCode(scope.$index,scope.row)">
                        </template>
                    </el-table-column> -->
          <el-table-column show-overflow-tooltip label="推荐人ID" prop="parentAccountCode" align="center"></el-table-column>
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
          <el-table-column show-overflow-tooltip label="下单权限" prop="orderPermission" :formatter="formattera" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资比例" prop="financeRatio" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资周期" prop="financePeriod" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="管理费率" prop="manageFeeRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="建仓费率" prop="manageMakeFeeRate" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="盈利分成率" prop="separateFeeRate" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="融资开始日期" prop="financeStartDate" align="center" width="140"></el-table-column>
          <el-table-column show-overflow-tooltip label="创建时间" prop="createTime" align="center"></el-table-column>
          <el-table-column show-overflow-tooltip label="下级默认资金池" align="center" width="180">
            <template slot-scope="scope">
              {{getDefaultGroupName(scope.row.defaultChildGroupId)}}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="下级默认佣金方案" align="center" width="180">
            <template slot-scope="scope">
              {{getDefaultGroupName1(scope.row.defaultChildCommissionCfgId)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination :current-page.sync="currentPage" layout="prev, pager, next" :page-size="pageSize" :pager-count="5" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
    <!--表单-->
    <div class="addForm" v-if="showAdd==true">
      <div class="addContent addContent2">
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
          <!-- <el-form-item label="产品：">
                        <el-select v-model="formInline.productCode" :disabled="true">
                            <el-option v-for="(item,index) in productList" :key="index" :label="item.value+'~'+item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item> -->
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
          <el-form-item label="创业板持仓比例：" class="smallfont">
            <el-input v-model="formInline.secondBoardPositionRatio" :disabled="true" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：" class="smallfont">
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
          <el-form-item label="下级默认资金池：" class="smallfont">
            <el-select v-model="formInline.defaultChildGroupId" :disabled="true">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认佣金方案：" class="smallfont">
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
    <div class="addForm" v-if="changeNow==true">
      <div class="addContent addContent2">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeChange">
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
            <el-select v-model="formInline.productGroupId">
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
          <el-form-item label="创业板持仓比例：" class="smallfont">
            <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：" class="smallfont">
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
          <el-form-item label="下级默认资金池：" class="smallfont">
            <el-select v-model="formInline.defaultChildGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认佣金方案：" class="smallfont">
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
      <div class="addContent addContent2">
        <div class="title">
          <span class="tl">{{addTitle}}</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeJia">
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
            <el-select v-model="formInline.productGroupId">
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
          <el-form-item label="创业板持仓比例：" class="smallfont">
            <el-input v-model="formInline.secondBoardPositionRatio" placeholder="创业板持仓比例"></el-input>
          </el-form-item>
          <el-form-item label="科创板持仓比例：" class="smallfont">
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
          <el-form-item label="下级默认资金池：" class="smallfont">
            <el-select v-model="formInline.defaultChildGroupId">
              <el-option v-for="(item,index) in groupIdList" :key="index" :label="item.groupId+'~'+item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下级默认佣金方案：" class="smallfont">
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
    <div class="addForm" v-if="msg==true">
      <div class="addContent">
        <div class="title">
          <span class="tl">修改角色</span>
          <img class="tr" src="../../../assets/nine/closeform.png" alt="" @click="closeMsg">
        </div>
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <div>
            <el-radio-group v-model="radio">
              <el-radio :label="item.roleId" v-for="(item,index) in levelList" :key="index">{{item.roleName}}</el-radio>
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
                <el-option v-for="(item,index) in eList" :key="index" :label="item.accountName" :value="item.accountId"></el-option>
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
        productGroupId: "",
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
        agentLevel: [],
        defaultChildGroupId: "",
        defaultChildCommissionCfgId: ""
      },
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
      whowho: ""
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
    this.getMsg();
    this.getFundAccount();
    this.getGroupIdList();
    this.userId = localStorage.getItem("userId");
    this.userName = localStorage.getItem("userName");
    this.getEList();
  },
  methods: {
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
            .defaultChildCommissionCfgId
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
            .defaultChildCommissionCfgId
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
.huiyuan .el-table--striped .el-table__body tr td {
  background: none !important;
}
</style>



