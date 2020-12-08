<template>
    <div class="wrap">
        <toph v-bind:active="active"></toph>
        <div class="main">
            <el-breadcrumb separator="/" style="margin-top:12px; margin-left:15px;">
                <el-breadcrumb-item :to="{ path: '/batteryWarning/batterys' }">电池预警</el-breadcrumb-item>
                <el-breadcrumb-item><a>风险电池管理</a></el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索部分 -->
            <div class="listCon">
                <div class="item" style="height:30px;line-height:30px;background: #FFFFFF;font-size:14px;padding-bottom:10px;border-bottom:1px solid #EBEEF5;">
                    <span style="float:left;font-size: 14px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: #303133;">预警信息管理</span>
                    <!--按钮-->
                    <span style="float:right">
                        <el-button type="primary" icon="el-icon-user" size="mini" @click="shenheAll()">一键审核</el-button>
                        <el-button icon="el-icon-delete" size="mini" @click="delAll()">一键删除</el-button>
                        <!-- <el-button icon="el-icon-download" size="mini" @click="outExe()">导出</el-button> -->
                    </span>
                </div>
                <el-form :inline="true" :model="filters" ref="filters" style="margin-top:10px">
                    <el-form-item prop="vehicleType" label="车型">
                        <!-- <el-autocomplete class="inline-input" v-model="filters.vehicleType" :fetch-suggestions="querySearch" placeholder="请输入车型" :trigger-on-focus="false" @select="handleSelect" size="mini"></el-autocomplete> -->
                        <el-input v-model="filters.vehicleType" placeholder="请输入车型" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item prop="vin" label="车辆VIN">
                        <!-- <el-autocomplete class="inline-input" v-model="filters.vin" :fetch-suggestions="querySearch1" placeholder="请输入vin" :trigger-on-focus="false" @select="handleSelect" size="mini"></el-autocomplete> -->
                        <el-input v-model="filters.vin" placeholder="请输入VIN码" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item prop="warningStartTime" label="预警开始时刻">
                        <template>
                            <el-date-picker size="mini" v-model="filters.warningStartTime" type="datetime" placeholder="开始日期时间">
                            </el-date-picker>
                        </template>
                    </el-form-item>
                    <el-form-item prop="warningEndTime" label="一">
                        <template>
                            <el-date-picker size="mini" v-model="filters.warningEndTime" type="datetime" placeholder="结束日期时间">
                            </el-date-picker>
                        </template>
                    </el-form-item>
                    <el-form-item prop="licensePlate" label="车牌号">
                        <!-- <el-autocomplete class="inline-input" v-model="filters.licensePlate" :fetch-suggestions="querySearch2" placeholder="请输入车牌号" :trigger-on-focus="false" @select="handleSelect" size="mini"></el-autocomplete> -->
                        <el-input v-model="filters.licensePlate" placeholder="请输入车牌号" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item prop="yjState" label="电池类型">
                        <el-select v-model="filters.yjState" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in filters.batteryType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="yjMode" label="失效模式">
                        <el-select v-model="filters.yjMode" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in filters.failureModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="yjtype" label="预警类型">
                        <el-select v-model="filters.yjtype" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in filters.failureModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="yjstatus" label="预警状态">
                        <el-select v-model="filters.yjstatus" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in filters.reviewStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="yjGraden" label="预警风险等级">
                        <el-select v-model="filters.yjGraden" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in filters.warningGradenOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getDataList('filters')" size="mini">搜索</el-button>
                        <el-button size="mini" @click="resetForm('filters')">重置</el-button>
                    </el-form-item>
                    <!-- <el-button icon="el-icon-view" size="mini" @click="compare()">对比</el-button> -->
                    <!-- <el-form-item style="float:right;">
                <el-button type="info" size="mini" @click="resetForm()" style="height:32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);">重置</el-button>
              </el-form-item>
              <el-form-item style="float:right;margin-right:8px;">
                <el-button type="primary" @click="getDataList(filters)" size="mini" style="height:32px;">搜索</el-button>
              </el-form-item> -->
                </el-form>
                <!--列表部分-->
                <el-table :data="tableData" style="width: 100%;" ref="tipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" min-width="60">
                    </el-table-column>
                    <el-table-column type="index" label="序号" min-width="50">
                    </el-table-column>
                    <el-table-column prop="vehicleType" label="车型" min-width="90">
                    </el-table-column>
                    <el-table-column prop="vin" label="车辆VIN" min-width="100">
                    </el-table-column>
                    <el-table-column prop="licensePlate" label="车牌号" min-width="95">
                    </el-table-column>
                    <el-table-column prop="batteryType" label="电池类型" min-width="90">
                    </el-table-column>
                    <el-table-column label="预警风险等级" min-width="105">
                        <template slot-scope="scope">
                            <!-- 显示纯文字↓ -->
                            <span>{{ scope.row.riskLevel}}</span>
                            <!-- <span>{{warningGraden (scope.row.riskLevel)}}</span> -->
                            <!-- 显示等级图片↓ -->
                            <!-- <img src="../../assets/images/battery/oneFx.png" alt="" v-if="scope.row.riskLevel==1">
                            <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="scope.row.riskLevel==2">
                            <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="scope.row.riskLevel==3"> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="warningStartTime" label="预警开始时刻" min-width="110">
                    </el-table-column>
                    <el-table-column prop="warningEndTime" label="预警结束时刻" min-width="110">
                    </el-table-column>
                    <el-table-column prop="warningType" label="预警类型" min-width="90">
                        <!-- <template slot-scope="scope">
                            <span>{{warningType (scope.row.warningType)}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="附件管理" min-width="80">
                        <template slot-scope="scope">
                            <!-- 显示附件图标↓ -->
                            <img src="../../assets/images/battery/形状.png" alt="" v-if="scope.row.fileNameList!==null" @click="imgClick(scope.$index, scope.row)" style="cursor:pointer;">
                        </template>
                    </el-table-column>

                    <el-table-column prop="loseEfficacyType" label="失效模式" min-width="100">
                        <!-- <template slot-scope="scope">
                            <span>{{failureMode (scope.row.loseEfficacyType)}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="预警状态" min-width="80">
                        <template slot-scope="scope">
                            <span>{{warningState (scope.row.reviewStatus)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" min-width="260">
                        <template slot-scope="scope">
                            <el-button @click="handleLook(scope.$index, scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
                            <el-button @click="handleShenhe(scope.$index, scope.row)" type="text" size="small">审核</el-button>
                            <el-button @click="handleFasong(scope.$index, scope.row)" type="text" size="small">推送</el-button>
                            <el-button @click="handleUpdate(scope.$index, scope.row)" type="text" size="small">上传</el-button>
                            <el-button @click="handleDel(scope.$index, scope.row)" type="text" size="small" style="color:red">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagingtion-box" style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
                    <!-- 列表分页 -->
                    <el-pagination style=" display: flex; justify-content: flex-end;" @size-change="handleSizeChange_" @current-change="handleCurrentChange_" :current-page="currentPage_" :page-sizes="[5, 10, 50, 100]" :page-size="pageSize_" layout="total, sizes, prev, pager, next, jumper" :total="total_">
                    </el-pagination>
                    <el-button size="small" type="primary" style="margin-left: 20px;">确定</el-button>
                </div>

            </div>
            <!-- 查看/编辑/审核 -->
            <el-dialog v-model="labelPosition" :title="titleMap[dialogStatus]" :visible.sync="FormVisibleck" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" @close="closeEditForm()" @open="open()">
                <el-form :model="viewRejectionForm" label-width="120px" ref="viewRejectionForm" :rules="rules" :label-position="labelPosition">
                    <!-- <el-row>
                        <el-button type="primary" size="mini" round @click="gotolink" v-show="this.dialogStatus=='ckEquipment'">汽车全生命周期数据查看</el-button>
                    </el-row> -->
                    <el-row style="background: #EBEEF5;height:35px;line-height:35px;font-size:14px;margin-top:-15px">
                        <el-col :span="24">
                            <span style="font-family: PingFang-SC-Bold, PingFang-SC;font-weight: bold;color: #354660;margin-left:10px">基本信息</span>
                        </el-col>
                    </el-row>
                    <div class="tcCon">
                        <div style="flex:1">
                            <el-form-item label="车型" prop="vehicleType">
                                <span>{{viewRejectionForm.vehicleType}}</span>
                            </el-form-item>
                            <el-form-item label="车辆VIN">
                                <span>{{viewRejectionForm.vin}}</span>
                            </el-form-item>
                            <el-form-item label="预警状态" prop="reviewStatus">
                                <span>{{warningState (viewRejectionForm.reviewStatus)}}</span>
                            </el-form-item>
                            <el-form-item label="预警风险等级" prop="riskLevel">
                                <span>{{ viewRejectionForm.riskLevel}}</span>
                                <!-- <span>{{warningGraden (viewRejectionForm.riskLevel)}}</span> -->
                                <!-- <el-select v-model="viewRejectionForm.riskLevel" placeholder="请选择" clearable size="mini" :disabled="this.dialogStatus=='ckEquipment'?true:false">
                                    <el-option v-for="(item,index) in warningGradenOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select> -->
                                <!-- <img src="../../assets/images/battery/oneFx.png" alt="" v-if="Form.riskLevel==1">
                                <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="Form.riskLevel==2">
                                <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="Form.riskLevel==3"> -->
                            </el-form-item>
                        </div>
                        <div style="flex:1">
                            <el-form-item label="车牌号">
                                <span>{{viewRejectionForm.licensePlate}}</span>
                            </el-form-item>
                            <el-form-item label="电池类型">
                                <span>{{viewRejectionForm.batteryType}}</span>
                            </el-form-item>
                            <el-form-item label="预警类型">
                                <span>{{viewRejectionForm.warningType}}</span>
                            </el-form-item>
                            <el-form-item label="失效模式" prop="loseEfficacyType">
                                <span>{{viewRejectionForm.loseEfficacyType}}</span>
                                <!-- <span>{{failureMode (viewRejectionForm.loseEfficacyType)}}</span> -->
                                <!-- <el-select v-model="viewRejectionForm.loseEfficacyType" placeholder="请选择" size="mini" :disabled="this.dialogStatus=='ckEquipment'?true:false">
                                    <el-option v-for="(item,index) in failureModeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select> -->
                            </el-form-item>
                        </div>
                    </div>
                    <div class="line"></div>
                    <el-row style="background: #EBEEF5;height:35px;line-height:35px;font-size:14px;">
                        <el-col :span="24">
                            <span style="font-family: PingFang-SC-Bold, PingFang-SC;font-weight: bold;color: #354660;margin-left:10px;">预警描述</span><span style="font-weight: 400;font-family: PingFangSC-Regular, PingFang SC;font-size: 12px;margin-left:20px">{{'该动力电池电压趋势异常，判断电芯内短路，为1级高风险预警'}}</span>
                        </el-col>
                    </el-row>
                    <!-- <div class="tcCon" style="justify-content: flex-start;">
                        <div style="width:120px;font-size: 14px;color:rgba(62,82,111,1);font-weight:bold;">预警描述</div>
                        <div style="width:80%;font-size: 14px;color:rgba(62,82,111,1);font-weight:400;">
                            该动力电池电压趋势异常，判断电芯内短路，为1级高风险预警
                        </div>
                    </div> -->
                    <div style="margin-left:30px;">
                        <div id="dyBox1" ref="dyBox1" style="height:220px; width:90%;"></div>
                        <div id="dyBox2" ref="dyBox2" style="height:220px; width:90%;"></div>
                        <div id="dyBox3" ref="dyBox3" style="height:220px; width:90%;"></div>
                        <div id="dyBox4" ref="dyBox4" style="height:220px; width:90%;"></div>
                    </div>
                    <div class="line"></div>
                    <el-row style="background: #EBEEF5;height:35px;line-height:35px;font-size:14px;">
                        <el-col :span="24">
                            <span style="font-family: PingFang-SC-Bold, PingFang-SC;font-weight: bold;color: #354660;margin-left:10px">诊断结果</span>
                        </el-col>
                    </el-row>
                    <el-form-item label="审核描述" prop="reviewUserOpinion" v-show="this.dialogStatus=='editEquipment'||this.dialogStatus=='ckEquipment'">
                        <el-input style="width:100%" v-model="viewRejectionForm.reviewUserOpinion" :disabled="true" size="mini"></el-input>
                    </el-form-item>
                    <div class="zhenduan" style="justify-content: flex-start;">
                        <el-form-item label="诊断结果" prop="inputZD" v-show="this.dialogStatus=='editEquipment'">
                            <el-input type="textarea" maxlength="50" show-word-limit v-model="viewRejectionForm.inputZD" placeholder="分析电池包监控数据，与预警描述一致"></el-input>
                        </el-form-item>
                        <el-form-item label="诊断结果" prop="diagnosisResultDesc" v-show="this.dialogStatus=='ckEquipment'">
                            <el-input style="width:100%" v-model="viewRejectionForm.diagnosisResultDescResultDesc" type="text" size="mini" readonly="readonly"></el-input>
                        </el-form-item>
                    </div>
                    <div class="" style="justify-content: flex-start;">
                        <el-form-item label="诊断结果描述" v-show="this.dialogStatus=='shenheEquipment'">
                            <div style="color:#3E526F; margin-left:8px;">分析电池包监控数据，与预警描述一致</div>
                            <!-- <el-input type="textarea" v-model="Form.sxms" style="width:100%; border-radius:4px;border:1px solid rgba(168,198,223,1);"></el-input> -->
                        </el-form-item>
                    </div>
                    <div class="tcCon" style="justify-content: flex-start; margin-top:10px;">
                        <el-form-item label="审核人" prop="revieUser">
                            <!-- <el-select v-model="viewRejectionForm.shpeople" placeholder="请选择" clearable size="mini">
                                <el-option v-for="item in filters.shenheOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select> -->
                            <el-input v-model="viewRejectionForm.revieUser" type="text" size="mini"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="审核结果" v-show="this.dialogStatus=='shenheEquipment'">
                        <el-radio-group v-model="viewRejectionForm.resource">
                            <el-radio label="1">通过</el-radio>
                            <el-radio label="2">驳回</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="审核人意见" prop="opinion" v-show="this.dialogStatus=='shenheEquipment'">
                        <el-input type="textarea" maxlength="50" show-word-limit v-model="viewRejectionForm.opinion" placeholder="分析电池包监控数据，与预警描述一致"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="viewRejectionForm.checkAll" @change="handleCheckAll" style="margin-left:8px;">
                            <!-- {{viewRejectionForm.checkAll}} -->
                        </el-checkbox>
                        <span style="font-size:14px;color:#3E526F;font-family:PingFangSC-Regular,PingFang SC;">推送消息给</span>
                        <span style="font-family:PingFangSC-Regular,PingFang SC;color:#239FFF;font-size:14px;cursor: pointer;" @click="handleDialogAll()">所有人</span>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="">
                    <el-button type="text" size="mini" @click="gotolink" v-show="this.dialogStatus=='ckEquipment'" style="float:left;">汽车全生命周期数据查看</el-button>
                    <el-button v-show="this.dialogStatus=='editEquipment'||this.dialogStatus=='shenheEquipment'" size="mini" @click.native="handleCancel('viewRejectionForm')">取消</el-button>
                    <el-button v-show="this.dialogStatus=='editEquipment'" type="primary" size="mini" @click.native="confirmEdit('viewRejectionForm')">确定</el-button>
                    <el-button v-show="this.dialogStatus=='shenheEquipment'" type="primary" size="mini" @click.native="confirmShenhe('viewRejectionForm')">确定</el-button>
                    <el-button v-show="this.dialogStatus=='ckEquipment'" type="primary" size="mini" @click.native="handleCancel('viewRejectionForm')">确定</el-button>
                </div>
            </el-dialog>
            <!-- 推送所有人弹框开始 -->
            <el-dialog title="推送给" :visible.sync="FormVisibleTS" :close-on-click-modal="false" class="edit-form" :before-close="handleCloseTs" width="44%">
                <el-form :model="Form" ref="Form" style="margin:-20px 0">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item>
                                <span style="float:left;font-weight: bold;font-size: 14px;">人员列表</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-input placeholder="搜索姓名" v-model="inputCoutent" size="mini" style="float:right;cursor:pointer" suffix-icon="el-icon-search" @click="search"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-checkbox-group v-model="roleCheckList" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(item,index) in pushMsgUserNames" :label="item" :key="index">{{item}}</el-checkbox>
                    </el-checkbox-group>
                    <!-- 联系人分页 -->
                    <el-pagination style=" display: flex; justify-content: flex-end;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
                    </el-pagination>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleTs('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancelTs('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                </div>
                <!-- 推送所有人弹框结束 -->
            </el-dialog>
            <!-- 附件管理弹框开始 -->
            <el-dialog title="附件管理" :visible.sync="managementVisible" :close-on-click-modal="false" class="edit-form del-form" :before-close="handleClose">
                <el-table :data="managementData">
                    <el-table-column prop="filename" label="文件名" min-width="100">
                    </el-table-column>
                    <el-table-column prop="creator" label="创建者" min-width="100">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleManagement(scope.$index, scope.row)" type="text" size="small">预览</el-button>
                            <el-button @click="handleDownload(scope.$index, scope.row)" type="text" size="small">下载</el-button>
                            <el-button @click="managementDelete(scope.$index, scope.row)" type="text" size="small" style="color:red">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handManagement('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                </div>
            </el-dialog>
            <!--上传弹框开始-->
            <el-dialog title="上传附件" :visible.sync="uploadFormVisible" @close="cancel('updateForm')" width="40%">
                <el-form :model="updateForm" ref="updateForm" label-width="100px">
                    <el-form-item prop="fileList">
                        <el-upload class="upload-demo" multiple action='none' ref="upload" :auto-upload="false" :on-change="fileChange" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :before-upload="beforeAvatarUpload" :accept="limitFileType" :limit="limitFileNum" :on-exceed="handleExceed" :file-list="updateForm.fileList">
                            <el-button size="small" type="primary">添加文件</el-button>
                            <div slot="tip" class="el-upload__tip">请选择您要上传的文件(单条预警累计上传附件不超过5个)</div>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('updateForm')">取 消</el-button>
                    <el-button type="primary" @click="updateConfirm('updateForm')">确 定</el-button>
                </div>
            </el-dialog>
            <!--上传弹框结束-->
            <!-- 列表删除 -->
            <el-dialog title="删除" customClass="customWidth" :visible.sync="FormVisibledel" :close-on-click-modal="false" class="edit-form del-form" :before-close="handleClose" style="margin-top:10%;">
                <div>确定删除选中的选项</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleDelete('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                </div>
            </el-dialog>
            <!-- 附件删除 -->
            <el-dialog title="删除" customClass="customWidth" :visible.sync="enclosureFormVisibledel" :close-on-click-modal="false" class="edit-form del-form" :before-close="handleCloseFJ" style="margin-top:10%;">
                <div>确定删除选中的选项</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="enclosureDelete('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                </div>
            </el-dialog>
            <!-- 推送 -->
            <el-dialog title="推送" customClass="customWidth" :visible.sync="FormVisibleSend" :close-on-click-modal="false" class="edit-form del-form" :before-close="handleClose" style="margin-top:10%;">
                <div>确定推送选中的选项</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleSend('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                </div>
            </el-dialog>
            <!-- 批量删除 -->
            <el-dialog title="批量删除" customClass="customWidth" :visible.sync="FormVisibleAlldel" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" style="margin-top:10%;">
                <div v-if="multipleSelection.length==0">请选择要删除的项</div>
                <div v-else>确定删除选中的选项</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteFileOrDirectory('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                </div>
            </el-dialog>
            <!-- 一键审核 -->
            <el-dialog title="审核" customClass="customWidth" :visible.sync="FormVisibleAllSh" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" style="margin-top:10%;">
                <div v-if="multipleSelection.length==0">请选择要审核的项</div>
                <div v-else>确定审核选中的选项</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleShenhe2('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import toph from "@/components/top";
// import "echarts";
import _url from "@/api/arrayRemove";
import { getRiskBatteryList, DeleteList, getEnterpriseUser, getSearchList, getList, fileUpload, delfile, download, getDetailById, edit, seedList, auditing } from "@/api/battery";
import { chartLineOption1, boxPlotOption, chartLineOption6, chartLineOption3, chartLineOption4, chartLineOption2 } from "./battery.js";
var _index;
export default {
    components: {
        toph
    },
    data() {
        return {
            idss: '',
            managements: [],
            // diseaseList: [],//这个值是需要匹配的值-车型
            // vinList: [],//这个值是需要匹配的值-vin
            // licensePlateList: [],//这个值是需要匹配的值-车牌号
            roleCheckList: [],//复选框默认选中为空
            pushMsgUserNames: [],//复选框内容
            isIndeterminate: false,
            inputCoutent: '',//搜索内容
            //上传表单
            updateForm: {
                reportType: [],
                createPerson: null,
                documentName: null,
                // uploadPath: "/opt/monitorReport/outputfile",
                fileList: []//上传文件的集合
            },
            // uploadUrl: '/api/battery/fileUpload',
            // 上传文件类型限制
            limitFileType: ".jpg,.jpeg,.zip,.rar,.pdf,.doc,.docx,.xls,.xlsx,.txt,",
            // 上传文件大小限制,MB
            limitFileSize: 10,
            // 上传文件数量限制
            limitFileNum: 5,
            // 上传文件数量是否超过限制
            exceedLimitNum: false,
            series: [],
            //模拟后台数据
            dataTu: [
                // {
                //     "doubleYData":
                //     {
                //         "x": ["2020-01-02", "2020-02-04", "2020-06-04", "2020-07-04", "2020-08-04", "2020-09-04"],
                //         "y1": [10, 9, 12, 45, 63, 33],
                //         "y2": [7, 12, 8, 63, 45, 75],
                //         "y3": [34, 54, 8, 54, 65, 75],
                //         "y4": [23, 72, 45, 75, 35, 65],
                //         "y5": [37, 7, 35, 44, 15, 55],
                //         "y6": [34, 27, 35, 14, 65, 85],
                //         "y7": [35, 70, 55, 64, 55, 15],
                //     }
                // },
                // {
                //     "lineData":
                //     {
                //         "x": ["2020-01-02", "2020-02-04", "2020-03-04", "2020-04-04", "2020-05-04", "2020-08-04"],
                //         "y": [11, 20, 23, 44, 25, 77]
                //     }
                // },
                // {
                //     "boxData":
                //     {
                //         'boxData': [//盒子
                //             [55, 24, 41, 9, 55],
                //             [12, 77, 15, 80, 21],
                //             [25, 64, 57, 22, 35],
                //             [35, 24, 55, 77, 44],
                //             [44.5, 35, 33, 80, 77],
                //         ],
                //         "data": [120, '', 110, '', 300],//加号
                //     }
                // }
            ],
            //（14）模组电压离群1
            dantiNum1401: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            // （1）单体压差过大模型96
            dantiNum01: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            // 单体压差过大模型 2
            aloneNum02: {
                xData: [],
                aloneCount: [],
            },
            //模组电压离群2 散点3
            aloneNum1402: {
                xData: [],
                aloneCount: [],
            },

            //（9）单体内阻或者容量异常模型1
            dantiNum9: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            //（9）单体内阻或者容量异常模型2
            dantiNum902: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            //（8）单体电压离散度高模型
            dantiNum: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            //(11)单体电压波动性差异大模型双Y
            dianyaNum11: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            //(11)单体电压波动性差异大模型单折线2
            aloneNum1102: {
                xData: [],
                aloneCount: [],
            },
            //(11)单体电压波动性差异大模型双Y3
            dianyaNum1103: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            //单体压差过大模型双折线
            dianyaNum: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            //BMS采样异常
            aloneNum: {
                xData: [],
                aloneCount: [],
            },
            //单体电压离散度高模型2
            aloneNum802: {
                xData: [],
                aloneCount: [],
            },
            //单体电压离散度高模型 散点3
            aloneNum803: {
                xData: [],
                aloneCount: [],
            },
            // （15）电池包衰减预警模型
            Attenuation: {
                xData: [],
                aloneCount: [],
            },
            // （12）绝缘电阻突降1
            resistance: {
                xData: [],
                aloneCount: [],
            },
            // （12）绝缘电阻突降2
            reduce: {
                xData: [],
                aloneCount: [],
            },
            //（10）连接阻抗大模型（在充电工况时）
            effective: {
                xData: [],
                aloneCount: [],
            },
            effective1: {
                xData: [],
                aloneCount: [],
            },
            effective2: {
                xData: [],
                aloneCount: [],
            },
            effective3: {
                xData: [],
                aloneCount: [],
            },

            //BMS采样异常柱图1
            aloneNum1: {
                xData: [],
                aloneCount: [],
            },
            //BMS采样异常柱图2
            aloneNum2: {
                xData: [],
                aloneCount: [],
            },
            //单体压差过大箱线图
            boxPlotNum: {
                yData1: [],
                yData2: [],
            },
            rules: {
                inputZD: [
                    { required: true, message: '请填写诊断结果', trigger: 'blur' }
                ],
                // opinion: [
                //     { required: true, message: '请填写审核人意见', trigger: 'blur' }
                // ]
            },
            labelPosition: 'left',//默认左对齐
            inputZD: '',//诊断结果文本
            opinion: '',//审核意见文本
            titleMap: {
                editEquipment: "编辑",
                shenheEquipment: "审核",
                // daochuEquipment: "导出",
                ckEquipment: "查看"
            },
            dialogStatus: "",
            Form: {
                id: 0,
                name: '',
                vehicleType: '',//车型
                vin: '',//vin
                licensePlate: '',//车牌号
                batteryType: '',//电池类型
                sxms: '',
                riskLevel: '',//预警风险等级
                warningStartTime: '',//预警开始时刻
                warningEndTime: '',//预警结束时刻
                warningType: '',//预警类型
                loseEfficacyType: '',//失效模式
                reviewStatus: '',//预警状态
            },
            //查看/编辑/审核
            viewRejectionForm: {
                id: 0,
                name: '',
                vehicleType: '',//车型
                vin: '',
                licensePlate: '',
                batteryType: '',
                resource: '',//按钮
                sxms: '',
                reviewUserOpinion: '',//审核描述
                diagnosisResultDesc: '',//诊断结果text类型
                revieUser: '',//审核人
                riskLevel: '',//预警风险等级
                warningStartTime: '',//预警开始时刻
                warningEndTime: '',//预警结束时刻
                warningType: '',//预警类型
                loseEfficacyType: '',//失效模式
                reviewStatus: '',//预警状态
                checkAll: false,
            },
            radio: '1',
            shpeople: '张三管理员',
            managementData: [
                // {
                //     filename: '222',
                //     creator: 'gg',
                // },
                // {
                //     filename: 'dd',
                //     creator: 'll',
                // },
            ],
            tableData: [
                // {
                //     vehicleType: '20165254',
                //     vin: '王小虎',
                //     licensePlate: '上海市',
                //     batteryType: '78 15',
                //     warningStartTime: '24245',
                //     warningEndTime: 'fgfggfgf',
                //     reviewStatus: '6',
                //     fileNameList: '1'
                // },
                // {
                //     vehicleType: '第三方',
                //     vin: '发发发',
                //     licensePlate: '多福多寿 ',
                //     batteryType: '5555',
                //     warningStartTime: '9999999',
                //     warningEndTime: '去去去去去',
                //     reviewStatus: '7',
                //     fileNameList: '1'
                // },
            ],//下部分列表
            /* 上传窗口是否可见*/
            managementVisible: false,
            uploadFormVisible: false,
            FormVisibleck: false,
            FormVisibledel: false,
            enclosureFormVisibledel: false,
            FormVisibleSend: false,
            FormVisibleAlldel: false,
            FormVisibleAllSh: false,
            FormVisibleTS: false,
            currentRow: [],
            DcBtnshow: false,
            FormVisibleCompare: false,
            multipleSelection: [],
            editid: '',
            active: 2,
            // 搜索条件filters
            filters: {
                vin: "",
                licensePlate: "",
                vehicleType: "",//这个值是用户正在输入的值--车型
                yjGraden: '',
                yjstatus: '',
                yjtype: '',
                yjMode: '',
                yjState: '',
                warningStartTime: '',//开始日期时间
                warningEndTime: '',//结束日期时间
                //预警风险等级下拉框
                warningGradenOptions: [{
                    value: '1',
                    label: '高风险'
                }, {
                    value: '2',
                    label: '中风险'
                }, {
                    value: '3',
                    label: '低风险'
                }],
                //失效模式下拉框
                failureModeOptions: [{
                    value: '单体压差过大',
                    label: '单体压差过大'
                }, {
                    value: '温升速率过大',
                    label: '温升速率过大'
                }, {
                    value: '温度过高',
                    label: '温度过高'
                }, {
                    value: '温度梯度化',
                    label: '温度梯度化'
                }, {
                    value: '绝缘电阻值低',
                    label: '绝缘电阻值低'
                }, {
                    value: '数据错误模型',
                    label: '数据错误模型'
                }, {
                    value: '电芯自放电大',
                    label: '电芯自放电大'
                }, {
                    value: '充电压差扩大',
                    label: '充电压差扩大'
                }, {
                    value: '单体电压离散度高',
                    label: '单体电压离散度高'
                }, {
                    value: '单体内阻或者容量异常',
                    label: '单体内阻或者容量异常'
                }, {
                    value: '连接阻抗大',
                    label: '连接阻抗大'
                }, {
                    value: '单体电压波动性差异大',
                    label: '单体电压波动性差异大'
                }, {
                    value: '绝缘电阻突降',
                    label: '绝缘电阻突降'
                }, {
                    value: 'BMS采样异常',
                    label: 'BMS采样异常'
                }, {
                    value: '模组电压离群',
                    label: '模组电压离群'
                }, {
                    value: '电池包欠压',
                    label: '电池包欠压'
                }],
                //审核人
                shenheOptions: [
                    {
                        value: "0",
                        label: "审核人1"
                    },
                    {
                        value: "1",
                        label: "审核人2"
                    }
                ],
                //预警状态
                reviewStatus: [
                    {
                        value: "1",
                        label: "未推送"
                    },
                    {
                        value: "2",
                        label: "已推送"
                    },
                    {
                        value: "3",
                        label: "已处理"
                    },
                    {
                        value: "4",
                        label: "已审核"
                    },
                    {
                        value: "5",
                        label: "已驳回"
                    },
                    {
                        value: "6",
                        label: "已安全"
                    },
                ],
                //电池类型
                batteryType: [
                    {
                        value: "三元电池",
                        label: "三元电池"
                    },
                    {
                        value: "四元电池",
                        label: "四元电池"
                    },
                    {
                        value: "电池",
                        label: "电池"
                    },
                ],
                //预警类型
                yjlxOptions: [
                    {
                        value: "温度异常",
                        label: "温度异常"
                    },
                    {
                        value: "车辆离群",
                        label: "车辆离群"
                    },
                    {
                        value: "电压异常",
                        label: "电压异常"
                    },
                    {
                        value: "绝缘异常",
                        label: "绝缘异常"
                    },
                    {
                        value: "SOC异常",
                        label: "SOC异常"
                    }
                ],
            },
            //批量选中data
            selectList: [],
            //分页
            pageSize_: 5,
            currentPage_: 1,
            total_: 0,
            //联系人分页
            pageSize: 5,
            currentPage: 1,
            total: 0,

        }
    },
    methods: {
        // //车型模糊
        // querySearch(queryString, cb) {
        //     // console.log(111, queryString);
        //     const diseaseList = this.diseaseList
        //     const vinList = this.vinList
        //     const results = queryString ? diseaseList.filter(this.createFilter(queryString)) : diseaseList;
        //     // 调用 callback 返回建议列表的数据
        //     cb(results)
        //     // console.log(2222, results);
        // },
        // createFilter(queryString) {
        //     // console.log(222, queryString);
        //     return disease => {
        //         return (
        //             disease.value.indexOf(queryString) !== -1  // 改为===0 就是筛选的数据只是首字匹配的列表项，需要包含输入字的所有列表项改为！==-1
        //         )
        //     }
        // },
        // //vin模糊
        // querySearch1(queryString, cb) {
        //     console.log(111, queryString);
        //     const vinList = this.vinList
        //     const results = queryString ? vinList.filter(this.createFilter1(queryString)) : vinList;
        //     // 调用 callback 返回建议列表的数据
        //     cb(results)
        //     console.log(2222, results);
        // },
        // createFilter1(queryString) {
        //     console.log(222, queryString);
        //     return disease => {
        //         return (
        //             disease.value.indexOf(queryString) !== -1  // 改为===0 就是筛选的数据只是首字匹配的列表项，需要包含输入字的所有列表项改为！==-1
        //         )
        //     }
        // },
        // //车牌模糊
        // querySearch2(queryString, cb) {
        //     console.log(111, queryString);
        //     const licensePlateList = this.licensePlateList
        //     const results = queryString ? licensePlateList.filter(this.createFilter2(queryString)) : licensePlateList;
        //     // 调用 callback 返回建议列表的数据
        //     cb(results)
        //     console.log(2222, results);
        // },
        // createFilter2(queryString) {
        //     console.log(222, queryString);
        //     return disease => {
        //         return (
        //             disease.value.indexOf(queryString) !== -1  // 改为===0 就是筛选的数据只是首字匹配的列表项，需要包含输入字的所有列表项改为！==-1
        //         )
        //     }
        // },
        // //模糊查询
        // // 给diseaseList赋值，用来匹配用户输入的值disease是否与diseaseList相同。
        // mohuList() {
        //     getSearchList().then(res => {
        //         const vehicleType = res.data.data.vehicleType
        //         const vin = res.data.data.vin
        //         const licensePlate = res.data.data.licensePlate
        //         // const licensePlate = res.data.data.licensePlate
        //         if (res.data.ok == true) {
        //             vehicleType.forEach(item => {
        //                 this.diseaseList.push({
        //                     value: item
        //                 })
        //             })
        //             vin.forEach(item => {
        //                 this.vinList.push({
        //                     value: item
        //                 })
        //             })
        //             licensePlate.forEach(item => {
        //                 this.licensePlateList.push({
        //                     value: item
        //                 })
        //             })
        //         }
        //     })
        // },
        // handleSelect(item) {
        //     console.log(item);
        // },

        //联系人搜索
        search() { },
        // 附件图标弹框列表
        imgClick(index, row) {
            this.managementVisible = true
            this.Form = Object.assign({}, row);
            _index = index;
            // console.log('附件图标', this.Form);
            const ids = this.Form.id
            // console.log('ids', this.Form.id);
            this.managementData = [];
            getRiskBatteryList().then(res => {
                // console.log('附件列表', res);
                const data = res.data.data
                if (res.data.ok == true) {
                    const managementList = data.list;
                    this.managements = managementList.filter(item => {
                        // console.log(item);
                        return item.id == ids
                    })
                    // console.log('managements', this.managements);
                    // var fileNameLists = this.managements[0].fileNameList
                    let filePathList = this.managements[0].filePathList
                    let fileNameLists = this.managements[0].fileNameList
                    let newArr = filePathList.map((path, i) => ({
                        path, name: fileNameLists[i]
                    }))
                    // console.log('newArr', newArr);
                    // debugger
                    newArr.forEach(item => {
                        // console.log(item);
                        this.managementData.push({
                            filename: item.name,
                            path: item.path,
                            creator: this.managements[0].fileCreateUserList[0],
                            id: this.managements[0].id
                        })
                    })
                    // console.log('managementData', this.managementData);
                }
                //  else {
                //     this.managementData = [];
                // }

            })
                .finally(() => {
                })
                .catch(e => { });
        },
        // 附件预览
        handleManagement() { },
        // 附件下载 李工端口
        handleDownload(index, row) {
            const url = "http://192.168.10.120:8080/api/battery/download?path=" + row.path
            window.location.href = url;
        },
        // 附件删除
        managementDelete(index, row) {
            this.enclosureFormVisibledel = true;
            this.Form = Object.assign({}, row);
            _index = index

        },
        // 附件删除确定
        enclosureDelete(form) {
            // console.log('附件form', this.Form);
            const ids = this.Form.id
            const param = {
                fileName: this.Form.filename,
                filePath: this.Form.path,
                fileCreateUser: this.Form.creator
            }
            // console.log('param', param);
            // console.log(8888, newArr);
            // console.log('附件form', this.Form);
            // const ids = this.Form.id
            // console.log('ids', this.Form.id);
            delfile(ids, param).then(res => {
                // console.log(555, res);
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.enclosureFormVisibledel = false;
                this.imgClick()
                this.getDataList()
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: '111'
                })
            })
        },
        //附件管理确定
        handManagement() {
            this.managementVisible = false
        },
        singleValues(data) {
            // console.log(data);
            console.log('选中的值为==', data)
        },
        //预警类型
        // warningType(warningType) {
        //     return warningType == "1" ? "单体压差过大" : warningType == "2" ? "温升速率过大" : warningType == "3" ? "温度过高" : warningType == "4" ? "度梯度化" : warningType == "5" ? "绝缘电阻值低" : warningType == "6" ? "数据错误模型" : warningType == "7" ? "电芯自放电大" : warningType == "8" ? "充电压差扩大" : warningType == "9" ? "单体电压离散度高" : warningType == "10" ? "单体内阻或者容量异常" : warningType == "11" ? "连接阻抗大" : warningType == "12" ? "单体电压波动性差异大" : warningType == "13" ? "绝缘电阻突降" : warningType == "14" ? "BMS采样异常" : warningType == "15" ? "模组电压" : warningType == "16" ? "电池包欠压" : "";
        // },
        // 失效模式
        failureMode(loseEfficacyType) {
            return loseEfficacyType == "1" ? "单体压差过大" : loseEfficacyType == "2" ? "温升速率过大" : loseEfficacyType == "3" ? "温度过高" : loseEfficacyType == "4" ? "度梯度化" : loseEfficacyType == "5" ? "绝缘电阻值低" : loseEfficacyType == "6" ? "数据错误模型" : loseEfficacyType == "7" ? "电芯自放电大" : loseEfficacyType == "8" ? "充电压差扩大" : loseEfficacyType == "9" ? "单体电压离散度高" : loseEfficacyType == "10" ? "单体内阻或者容量异常" : loseEfficacyType == "11" ? "连接阻抗大" : loseEfficacyType == "12" ? "单体电压波动性差异大" : loseEfficacyType == "13" ? "绝缘电阻突降" : loseEfficacyType == "14" ? "BMS采样异常" : loseEfficacyType == "15" ? "模组电压" : loseEfficacyType == "16" ? "电池包欠压" : "";
        },
        //预警状态
        warningState(reviewStatus) {
            return reviewStatus == "1" ? "未推送" : reviewStatus == "2" ? "已推送" : reviewStatus == "3" ? "已处理" : reviewStatus == "4" ? "已审核" : reviewStatus == "5" ? "已驳回" : reviewStatus == "6" ? "已安全" : ""
        },
        // 预警风险等级
        // warningGraden(riskLevel) {
        //     return riskLevel == "1" ? "高风险" : riskLevel == "2" ? "中风险" : riskLevel == "3" ? "低风险" : ""
        // },
        // 点击汽车全生命周期数据查看跳转到电池包数据可视化页面
        gotolink() {
            this.$router.push('/pack')
        },
        change(value) {
            this.$forceUpdate();
        },
        // 每页数
        handleSizeChange_(val) {
            console.log(`每页${val}条`);
            this.pageSize_ = val;
            this.currentPage_ = 1;
            this.getDataList()
        },
        // 当前页
        handleCurrentChange_(val) {
            console.log(`当前页:${val}`);
            this.currentPage_ = val;
            this.getDataList()
        },
        // 联系人每页数
        handleSizeChange(val) {
            console.log(`每页${val}条`);
            this.pageSize = val;
            this.currentPage = 1;
            // this.getDataList()
        },
        // 联系人当前页
        handleCurrentChange(val) {
            console.log(`当前页:${val}`);
            this.currentPage = val;
            // this.getDataList()
        },

        //搜索列表
        getDataList() {
            // let url = 'D:\CarProjects\计划.xlsx'; //要预览文件的访问地址
            // console.log('url', url);
            // window.open('http://192.168.10.120:8012/onlinePreview?url=' + encodeURIComponent(url));
            let params = {
                page: this.currentPage_, //当前页
                pageSize: this.pageSize_, //每页条数
                vehicleType: this.filters.vehicleType ? this.filters.vehicleType : "",//车型
                vin: this.filters.vin ? this.filters.vin : "",//车辆vin
                warningStartDate: this.filters.warningStartTime ? this.filters.warningStartTime : "",//开始日期时间
                warningEndDate: this.filters.warningEndTime ? this.filters.warningEndTime : new Date(),//结束日期时间
                licensePlate: this.filters.licensePlate ? this.filters.licensePlate : "",//车牌号
                batteryType: this.filters.yjState ? this.filters.yjState : "",//电池类型下拉
                loseEfficacyType: this.filters.yjMode ? this.filters.yjMode : "",//失效模式下拉
                warningType: this.filters.yjtype ? this.filters.yjtype : "",//预警类型下拉
                reviewStatus: this.filters.yjstatus ? this.filters.yjstatus : "",//预警状态下拉
                riskLevel: this.filters.yjGraden ? this.filters.yjGraden : "",//预警风险等级下拉
            };
            // console.log('getDataList', params);
            getRiskBatteryList(params).then(res => {
                console.log('首页列表', res);
                const data = res.data.data
                if (res.data.ok == true) {
                    this.tableData = data.list;
                    // console.log('tableData', this.tableData);
                    this.total_ = data.count;
                } else {
                    this.tableData = [];
                    this.total_ = 0;
                }
            })
                .finally(() => {
                })
                .catch(e => { });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
            this.getDataList()
        },
        //查看/驳回处理
        handleLook(index, row) {
            const that = this;
            console.log('查看row', row);
            const param = {
                id: row.id,
            }

            that.idss = row.id,
                console.log('idss', that.idss);
            console.log('查看ID', param);
            that.FormVisibleck = true;
            that.viewRejectionForm = Object.assign({}, row);
            _index = index;
            that.dialogStatus = "ckEquipment"
            getDetailById(param).then(res => {
                console.log('查看res', res);
                that.dataTu = res.data.data.arrayData //图的数据赋值给dataTu变量
                console.log('dataTu', that.dataTu);
                that.viewRejectionForm.reviewUserOpinion = res.data.reviewUserOpinion//审核描述
                that.viewRejectionForm.diagnosisResultDesc = res.data.reviewResult//诊断结果
                that.viewRejectionForm.revieUser = res.data.revieUser//审核人
                if (row.loseEfficacyType == "BMS采样异常") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine6(),
                        that.drawLine2(),
                        that.drawLine4(),
                        that.drawLine5(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })
                } else if (row.loseEfficacyType == "连接阻抗大") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine101(),
                        that.drawLine102(),
                        that.drawLine103(),
                        that.drawLine104(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })

                } else if (row.loseEfficacyType == "电池包衰减预警") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine1501(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })

                } else if (row.loseEfficacyType == "绝缘电阻突降") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine1201(),
                        that.drawLine1202(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })

                } else if (row.loseEfficacyType == "单体电压离散度高") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine801(),
                        that.drawLine802(),
                        that.drawLine803(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })

                } else if (row.loseEfficacyType == "单体电压波动性差异大") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine11(),
                        that.drawLine1102(),
                        that.drawLine1103(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })

                }
                else if (row.loseEfficacyType == "单体内阻或者容量异常") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine901(),
                        // that.drawLine902(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })

                } else if (row.loseEfficacyType == "模组电压离群") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine1401(),
                        that.drawLine1402(),
                        // that.drawLine902(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })

                }
                else if (row.loseEfficacyType == "单体压差过大") {
                    Promise.all([// Promise.all解决执行顺序问题，同步执行
                        that.drawLine01(),
                        that.drawLine02(),
                        that.drawLine3(),
                        // that.drawLine902(),
                    ]).then(res => {
                        /* 你的逻辑代码 */
                        console.log("run");
                    })

                }
            })
        },
        // （1）单体压差过大模型 96折线
        drawLine01() {
            let obj = this.dataTu.find((item) => item.lineDoubleYData1);
            this.dantiNum01.xData = obj.lineDoubleYData1.x;
            this.series = []
            for (var k in obj.lineDoubleYData1) {
                if (k !== "x") {
                    this.series.push({
                        type: "line",
                        symbol: 'circle',     //设定为实心点
                        symbolSize: 1,   //设定实心点的大小
                        itemStyle: {
                            normal: {
                                // label: { show: true },//折线图不显示数字
                                lineStyle: {
                                    color:
                                        "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                                    width: 0.5//设置线条粗细
                                },
                            },
                        },
                        data: obj.lineDoubleYData1[k],
                    });
                }
            }
            this.chartLineOption01();
        },
        chartLineOption01() {
            this.$nextTick(() => {
                document.getElementById('dyBox1').removeAttribute('_echarts_instance_'); //每次进入后清除echarts上次旧数据
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption6(
                        this.series,
                        this.dantiNum01.xData,
                        "最高电压",
                        "电压(V)",
                        // this.dianyaNum.gaoCount,
                        "最低电压"
                        // this.dianyaNum.lowerLimit
                    )
                );
            });
        },
        // 单体压差过大模型 单折线
        drawLine02() {
            let obj = this.dataTu.find(item => item.lineData1)
            this.aloneNum02.xData = obj.lineData1.x;
            this.aloneNum02.aloneCount = obj.lineData1.y;
            this.drawCarVehicleOnlineChart02();
        },
        drawCarVehicleOnlineChart02() {
            this.$nextTick(() => {
                document.getElementById('dyBox2').removeAttribute('_echarts_instance_'); //每次进入后清除echarts上次旧数据
                let myChart = this.$echarts.init(this.$refs.dyBox2);
                myChart.setOption(
                    chartLineOption1(
                        this.aloneNum02.xData,
                        "压差",
                        "压差（/V）",
                        this.aloneNum02.aloneCount,
                    )
                );
            });
        },
        // 单体压差过大模型 箱线图
        drawLine3() {
            let obj = this.dataTu.find(item => item.boxData1)
            this.boxPlotNum.yData1 = obj.boxData1.boxData;
            console.log('55555555555', this.boxPlotNum.yData1);
            // this.boxPlotNum.data = obj.boxData1.data;
            this.boxPlotChart();
        },
        boxPlotChart() {
            const a = []
            a.push(this.boxPlotNum.yData1)
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox3);
                myChart.setOption(
                    boxPlotOption(
                        "车辆压差（V）",
                        a,//盒子数据
                        // this.boxPlotNum.yData2,//加号数据  暂无数据！
                    )
                );
            });
        },

        //（14）模组电压离群 折线96条
        // 模组电压离群1
        drawLine1401() {
            let obj = this.dataTu.find((item) => item.lineData17);
            this.dantiNum1401.xData = obj.lineData17.x;
            this.series = []
            for (var k in obj.lineData17) {
                if (k !== "x") {
                    this.series.push({
                        type: "line",
                        symbol: 'circle',     //设定为实心点
                        symbolSize: 1,   //设定实心点的大小
                        itemStyle: {
                            normal: {
                                // label: { show: true },//折线图不显示数字
                                lineStyle: {
                                    color:
                                        "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                                    width: 0.5//设置线条粗细
                                },
                            },
                        },
                        data: obj.lineData17[k],
                    });
                }
            }
            this.chartLineOption1401();
        },
        chartLineOption1401() {
            this.$nextTick(() => {
                document.getElementById('dyBox1').removeAttribute('_echarts_instance_');
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption6(
                        this.series,
                        this.dantiNum1401.xData,
                        "电压",
                        "所有模组平均电压(V)",
                        // this.dianyaNum.gaoCount,
                        "电压"
                        // this.dianyaNum.lowerLimit
                    )
                );
            });
        },
        // 模组电压离群2 散点图3 后台返回格式有误！
        // drawLine1402() {
        //     let obj = this.dataTu.find(item => item.scatterData4)
        //     this.aloneNum1402.xData = obj.scatterData4[0];
        //     this.aloneNum1402.aloneCount = obj.scatterData4[1];
        //     this.drawCarVehicleOnlineChart1402();
        // },
        // drawCarVehicleOnlineChart1402() {
        //     this.$nextTick(() => {
        //         let myChart = this.$echarts.init(this.$refs.dyBox2);
        //         myChart.setOption(
        //             chartLineOption2(
        //                 "电压方差偏差",
        //                 this.aloneNum1402.xData,
        //                 "方差",
        //                 this.aloneNum1402.aloneCount,
        //             )
        //         );
        //     });
        // },

        //（9）单体内阻或者容量异常模型 折线96条
        // 单体内阻或者容量异常模型1
        drawLine901() {
            let obj = this.dataTu.find((item) => item.chargeLineData);
            this.dantiNum9.xData = obj.chargeLineData.x;
            this.series = []
            for (var k in obj.chargeLineData) {
                if (k !== "x") {
                    this.series.push({
                        type: "line",
                        itemStyle: {
                            normal: {
                                // label: { show: true },//折线图不显示数字
                                lineStyle: {
                                    color:
                                        "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                                    width: 0.5//设置线条粗细
                                },
                            },
                        },
                        data: obj.chargeLineData[k],
                    });
                }
            }
            this.chartLineOption901();
        },
        chartLineOption901() {
            this.$nextTick(() => {
                document.getElementById('dyBox1').removeAttribute('_echarts_instance_');
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption6(
                        this.series,
                        this.dantiNum9.xData,
                        "单体电压",
                        "充电单体电压(V)",
                        // this.dianyaNum.gaoCount,
                        "最低电压"
                        // this.dianyaNum.lowerLimit
                    )
                );
            });
        },
        // 单体内阻或者容量异常模型2 折线96条  缺少y轴数据，暂时无显示
        drawLine902() {
            let obj = this.dataTu.find((item) => item.disChargeLineData);
            this.dantiNum902.xData = obj.disChargeLineData.x;
            this.series = []
            for (var k in obj.disChargeLineData) {
                if (k !== "x") {
                    this.series.push({
                        type: "line",
                        symbol: 'circle',     //设定为实心点
                        symbolSize: 1,   //设定实心点的大小
                        itemStyle: {
                            normal: {
                                // label: { show: true },//折线图不显示数字
                                lineStyle: {
                                    color:
                                        "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                                    width: 0.5//设置线条粗细
                                },
                            },
                        },
                        data: obj.disChargeLineData[k],
                    });
                }
            }
            this.chartLineOption902();
        },
        chartLineOption902() {
            this.$nextTick(() => {
                document.getElementById('dyBox1').removeAttribute('_echarts_instance_');
                let myChart = this.$echarts.init(this.$refs.dyBox2);
                myChart.setOption(
                    chartLineOption6(
                        this.series,
                        this.dantiNum902.xData,
                        "单体电压",
                        "放电单体电压(V)",
                        // this.dianyaNum.gaoCount,
                        "最低电压"
                        // this.dianyaNum.lowerLimit
                    )
                );
            });
        },
        //(11)单体电压波动性差异大模型 双折线图1
        drawLine11() {
            let obj = this.dataTu.find(item => item.lineData10)
            this.dianyaNum11.xData = obj.lineData10.x;
            this.dianyaNum11.gaoCount = obj.lineData10.y1;
            this.dianyaNum11.lowerLimit = obj.lineData10.y2;
            this.drawOnlineChart11();
        },
        drawOnlineChart11() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                // this.busVehicleOnlineCharts.setOption(chartLineOption3(null, this.xData, null, null, '车辆数', this.chartsNum.yData, null, null, null, null, '辆'))
                myChart.setOption(
                    chartLineOption1(
                        this.dianyaNum11.xData,
                        "最高电压",
                        "电压（V）",
                        this.dianyaNum11.gaoCount,
                        "最低电压",
                        this.dianyaNum11.lowerLimit
                    )
                );
            });
        },
        // (11)单体电压波动性差异大模型 单折线图2
        drawLine1102() {
            let obj = this.dataTu.find(item => item.lineData11)
            this.aloneNum1102.xData = obj.lineData11.x;
            this.aloneNum1102.aloneCount = obj.lineData11.y;
            this.drawCarVehicleOnlineChart1102();
        },
        drawCarVehicleOnlineChart1102() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox2);
                myChart.setOption(
                    chartLineOption1(
                        this.aloneNum1102.xData,
                        "压差",
                        "压差（/mV）",
                        this.aloneNum1102.aloneCount,
                    )
                );
            });
        },
        //(11)单体电压波动性差异大模型 双折线图3
        drawLine1103() {
            let obj = this.dataTu.find(item => item.lineData12)
            this.dianyaNum1103.xData = obj.lineData12.x;
            this.dianyaNum1103.gaoCount = obj.lineData12.y1;
            this.dianyaNum1103.lowerLimit = obj.lineData12.y2;
            this.drawOnlineChart1103();
        },
        drawOnlineChart1103() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox3);
                // this.busVehicleOnlineCharts.setOption(chartLineOption3(null, this.xData, null, null, '车辆数', this.chartsNum.yData, null, null, null, null, '辆'))
                myChart.setOption(
                    chartLineOption1(
                        this.dianyaNum1103.xData,
                        "最高电压",
                        "电压变化率（V）",
                        this.dianyaNum1103.gaoCount,
                        "最低电压",
                        this.dianyaNum1103.lowerLimit
                    )
                );
            });
        },
        // （15）电池包衰减预警模型
        drawLine1501() {
            let obj = this.dataTu.find(item => item.lineData18)
            this.Attenuation.xData = obj.lineData18.x;
            this.Attenuation.aloneCount = obj.lineData18.y;
            this.AttenuationLineOnlineChart();
        },
        AttenuationLineOnlineChart() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption1(
                        this.Attenuation.xData,
                        "充电容量",
                        "充电容量",
                        this.Attenuation.aloneCount,
                    )
                );
            });
        },
        // （12）绝缘电阻突降
        // 绝缘电阻突降1
        drawLine1201() {
            let obj = this.dataTu.find(item => item.lineData13)
            this.resistance.xData = obj.lineData13.x;
            this.resistance.aloneCount = obj.lineData13.y;
            this.resistanceLineOnlineChart();
        },
        resistanceLineOnlineChart() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption1(
                        this.resistance.xData,
                        "绝缘电阻",
                        "绝缘电阻（kΩ）",
                        this.resistance.aloneCount,
                    )
                );
            });
        },
        // 绝缘电阻突降2
        drawLine1202() {
            let obj = this.dataTu.find(item => item.lineData14)
            this.reduce.xData = obj.lineData14.x;
            this.reduce.aloneCount = obj.lineData14.y;
            this.resistanceLineOnlineChart2();
        },
        resistanceLineOnlineChart2() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox2);
                myChart.setOption(
                    chartLineOption3(
                        this.reduce.xData,
                        "绝缘报警指示",
                        "绝缘报警指示",
                        this.reduce.aloneCount,
                    )
                );
            });
        },

        // （10）连接阻抗大模型（在充电工况时）
        // 连接阻抗大模型1
        drawLine101() {
            let obj = this.dataTu.find(item => item.lineData7)
            this.effective.xData = obj.lineData7.x;
            this.effective.aloneCount = obj.lineData7.y;
            this.effectiveLineOnlineChart();
        },
        effectiveLineOnlineChart() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption1(
                        this.effective.xData,
                        "电流",
                        "电流（A）",
                        this.effective.aloneCount,
                    )
                );
            });
        },
        // 连接阻抗大模型2
        drawLine102() {
            let obj = this.dataTu.find(item => item.lineData8)
            this.effective1.xData = obj.lineData8.x;
            this.effective1.aloneCount = obj.lineData8.y;
            this.effectiveLineOnlineChart2();
        },
        effectiveLineOnlineChart2() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox2);
                myChart.setOption(
                    chartLineOption1(
                        this.effective1.xData,
                        "压差",
                        "压差（/mV）",
                        this.effective1.aloneCount,
                    )
                );
            });
        },
        // 连接阻抗大模型3
        drawLine103() {
            let obj = this.dataTu.find(item => item.lineData9)
            this.effective2.xData = obj.lineData9.x;
            this.effective2.aloneCount = obj.lineData9.y;
            this.effectiveLineOnlineChart3();
        },
        effectiveLineOnlineChart3() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox3);
                myChart.setOption(
                    chartLineOption1(
                        this.effective2.xData,
                        "SOC",
                        "SOC",
                        this.effective2.aloneCount,
                    )
                );
            });
        },
        // 连接阻抗大模型4
        drawLine104() {
            let obj = this.dataTu.find(item => item.lineData)
            this.effective3.xData = obj.lineData.x;
            this.effective3.aloneCount = obj.lineData.y;
            this.effectiveLineOnlineChart4();
        },
        effectiveLineOnlineChart4() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox4);
                myChart.setOption(
                    chartLineOption1(
                        this.effective3.xData,
                        "内阻差",
                        "内阻差",
                        this.effective3.aloneCount,
                    )
                );
            });
        },
        //（8）单体电压离散度高模型96条
        // 单体电压离散度高模型1
        drawLine801() {
            let obj = this.dataTu.find((item) => item.lineDoubleYData5);
            this.dantiNum.xData = obj.lineDoubleYData5.x;
            this.series = []
            for (var k in obj.lineDoubleYData5) {
                if (k !== "x") {
                    this.series.push({
                        type: "line",
                        symbol: 'circle',     //设定为实心点
                        symbolSize: 1,   //设定实心点的大小
                        itemStyle: {
                            normal: {
                                // label: { show: true },//折线图不显示数字
                                lineStyle: {
                                    color:
                                        "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                                    width: 0.5//设置线条粗细
                                },
                            },
                        },
                        data: obj.lineDoubleYData5[k],
                    });
                }
            }
            this.chartLineOption8();
        },
        chartLineOption8() {
            this.$nextTick(() => {
                document.getElementById('dyBox1').removeAttribute('_echarts_instance_');
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption6(
                        this.series,
                        this.dantiNum.xData,
                        "单体电压",
                        "单体电压",
                        // this.dianyaNum.gaoCount,
                        "最低电压"
                        // this.dianyaNum.lowerLimit
                    )
                );
            });
        },
        // 单体电压离散度高模型2
        drawLine802() {
            let obj = this.dataTu.find(item => item.lineData6)
            this.aloneNum802.xData = obj.lineData6.x;
            this.aloneNum802.aloneCount = obj.lineData6.y;
            this.drawCarVehicleOnlineChart2();
        },
        drawCarVehicleOnlineChart2() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox2);
                myChart.setOption(
                    chartLineOption1(
                        this.aloneNum802.xData,
                        "压差",
                        "压差（/V）",
                        this.aloneNum802.aloneCount,
                    )
                );
            });
        },
        // 单体电压离散度高模型 散点图3 后台返回格式有误！
        // drawLine803() {
        //     var data = [
        //         [[28604, 77, 17096869, '', 1990], [31163, 77.4, 27662440, '', 1990], [1516, 68, 114605773, '', 1990],],
        //         [[44056, 81.8, 23968973, '', 2015], [43294, 81.7, 35939927, '', 2015], [13334, 76.9, 136048943, '', 20715],]
        //     ];
        //     let obj = this.dataTu.find(item => item.scatterData2)
        //     this.aloneNum803.xData = obj.scatterData2[0];
        //     console.log('this.aloneNum803.xData', this.aloneNum803.xData);
        //     this.aloneNum803.aloneCount = obj.scatterData2[1];
        //     console.log('this.aloneNum803.aloneCount', this.aloneNum803.aloneCount);
        //     this.drawCarVehicleOnlineChart3();
        // },
        // drawCarVehicleOnlineChart3() {
        //     this.$nextTick(() => {
        //         let myChart = this.$echarts.init(this.$refs.dyBox3);
        //         myChart.setOption(
        //             chartLineOption2(
        //                 "方差",
        //                 this.aloneNum803.xData,
        //                 "方差",
        //                 this.aloneNum803.aloneCount,
        //             )
        //         );
        //     });
        // },
        //（13）BMS采样异常 折线图96条
        drawLine6() {
            console.log('折线图96条', this.dataTu);
            let obj = this.dataTu.find((item) => item.lineData15);
            console.log("obj", obj.lineData15);
            this.dianyaNum.xData = obj.lineData15.x;
            this.series = []
            for (var k in obj.lineData15) {
                if (k !== "x") {
                    this.series.push({
                        type: "line",
                        symbol: 'circle',     //设定为实心点
                        symbolSize: 1,   //设定实心点的大小
                        itemStyle: {
                            normal: {
                                // label: { show: true },//折线图不显示数字
                                lineStyle: {
                                    color:
                                        "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                                    width: 0.5//设置线条粗细
                                },
                            },
                        },
                        data: obj.lineData15[k],
                    });
                }
            }
            console.log(1111, this.series);
            this.chartLineOption6();
        },
        chartLineOption6() {
            this.$nextTick(() => {
                document.getElementById('dyBox1').removeAttribute('_echarts_instance_');
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption6(
                        this.series,
                        this.dianyaNum.xData,
                        "最高电压",
                        "总电压（V）",
                        // this.dianyaNum.gaoCount,
                        "最低电压"
                        // this.dianyaNum.lowerLimit
                    )
                );
            });
        },
        // BMS采样异常 单折线图
        drawLine2() {
            console.log('单折线图', this.dataTu);
            let obj = this.dataTu.find(item => item.lineData16)
            this.aloneNum.xData = obj.lineData16.x;
            this.aloneNum.aloneCount = obj.lineData16.y;
            this.drawCarVehicleOnlineChart();
        },
        drawCarVehicleOnlineChart() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox2);
                myChart.setOption(
                    chartLineOption1(
                        this.aloneNum.xData,
                        "压差",
                        "压差（/mV）",
                        this.aloneNum.aloneCount,
                    )
                );
            });
        },
        //BMS采样异常 柱图1
        drawLine4() {
            console.log('柱图1', this.dataTu);
            let obj = this.dataTu.find(item => item.barData6)
            this.aloneNum1.xData = obj.barData6.x;
            this.aloneNum1.aloneCount = obj.barData6.y;
            this.drawCarVehicleBarChart();
        },
        drawCarVehicleBarChart() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox3);
                myChart.setOption(
                    chartLineOption4(
                        this.aloneNum1.xData,
                        "频次",
                        "频次（%）",
                        this.aloneNum1.aloneCount,
                    )
                );
            });
        },
        //BMS采样异常 柱图2
        drawLine5() {
            console.log('柱图2', this.dataTu);
            let obj = this.dataTu.find(item => item.barData7)
            this.aloneNum2.xData = obj.barData7.x;
            this.aloneNum2.aloneCount = obj.barData7.y;
            this.drawCarVehicleBarChart1();
        },
        drawCarVehicleBarChart1() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox4);
                myChart.setOption(
                    chartLineOption4(
                        this.aloneNum2.xData,
                        "频次",
                        "频次（%）",
                        this.aloneNum2.aloneCount,
                    )
                );
            });
        },
        //双折线图
        drawLine1() {
            let obj = this.dataTu.find(item => item.doubleYData)
            this.dianyaNum.xData = obj.doubleYData.x;
            this.dianyaNum.gaoCount = obj.doubleYData.y1;
            this.dianyaNum.lowerLimit = obj.doubleYData.y2;
            this.drawOnlineChart();
        },
        drawOnlineChart() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                // this.busVehicleOnlineCharts.setOption(chartLineOption3(null, this.xData, null, null, '车辆数', this.chartsNum.yData, null, null, null, null, '辆'))
                myChart.setOption(
                    chartLineOption1(
                        this.dianyaNum.xData,
                        "最高电压",
                        "电压（N）",
                        this.dianyaNum.gaoCount,
                        "最低电压",
                        this.dianyaNum.lowerLimit
                    )
                );
            });
        },

        //清空编辑表单校验
        closeEditForm() {
            this.$refs.viewRejectionForm.resetFields()
        },
        //编辑
        handleEdit: function (index, row) {
            const param = {
                id: row.id
            }
            this.idss = row.id,
                this.FormVisibleck = true;
            this.viewRejectionForm = Object.assign({}, row);
            _index = index;
            this.dialogStatus = "editEquipment"
        },
        // 点击确定（编辑）
        confirmEdit(viewRejectionForm) {
            this.$refs[viewRejectionForm].validate((valid) => {
                if (valid) {
                    edit().then(response => {
                        var editdata = _index;
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                        this.FormVisibleck = false;
                        this.getDataList();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 上传事件
        fileChange(file, fileList) {
            console.log("upload", file, fileList);
            // console.log("999", this.updateForm.reportTaskName.split(".")[0]);
            for (let index = 0; index < fileList.length - 1; index++) {
                // const element = array[index];
                if (file.name === fileList[index].name) {
                    // 文件名格式检查
                    this.$message({
                        message: '请勿重复上传文件',
                        type: 'warning'
                    });
                    // this.msgNotify("请勿重复上传文件");
                    fileList.pop();
                    return false;
                }
            }
            if (file.name) {
                // const regs = /.+\.(docx)$/i;
                // // 文件名格式检查
                // if (!regs.test(file.name)) {
                //     this.$message("请上传docx文件!");
                //     fileList.pop();
                //     return false;
                // }
                // 文件大小检查
                if (file.size > this.limitFileSize * 1024 * 1024) {
                    this.$message("上传文件只能小于10MB!");
                    fileList.pop();
                    return false;
                }
                // 文件个数检查
                if (fileList.length > this.limitFileNum) {
                    this.$message("每次限制上传5个文件");
                    this.exceedLimitNum = true; // 文件数量超过限制
                    return false;
                }
                // 文件重复检查
                // for (let i = 0; i < fileList.length - 1; i++) {
                //     if (fileList[i].name === file.name) {
                //         fileList.pop();
                //         this.msgNotify(file.name + " 文件名重复，请修改后上传");
                //         return false;
                //     }
                // }
                // this.updateForm.templateName = file.name.split(".")[0];
                this.updateForm.fileList = fileList;
                // console.log(1111, this.updateForm.fileList);
            } else {
                // this.$message("请上传与报告名称一致的docx文件");
                this.uploadFormVisible = false;
                this.updateForm.fileList = [];
            }
        },
        handlePreview(file) { },
        handleExceed(files, fileList) {
            this.$message({
                // message: `当前限制选择 1个文件，本次选择了 ${
                //   files.length
                // } 个文件，共选择了 ${files.length + fileList.length} 个文件`,
                message: "当前限制选择 5个文件",
                type: "warning",
                duration: 20000
            });
        },
        resetTemp() {
            this.form = {
                templateId: null,
                reportType: null,
                createPerson: null,
                createTime: null,
                documentName: null,
                // uploadPath: "/opt/monitorReport/outputfile/",
                // uploadPath: "/api/battery/fileUpload",
                fileList: []
            };
        },
        cancel(formName, ruleForm) {
            this.addFormVisible = false;
            this.uploadFormVisible = false;
            this.changeTitleFormVisible = false;
            // this.$refs[formName].resetFields();
            // this.form.reportType=[]
            this.exceedLimitNum = false; // 文件数量未超过限制
        },
        handleRemove(file, fileList) {
            if (fileList.length > this.limitFileNum) {
                this.exceedLimitNum = true; // 文件数量超过限制
            } else {
                this.updateForm.fileList = fileList;
                this.exceedLimitNum = false;
            }
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}?`);
        },
        beforeAvatarUpload(file) {
            // console.log(555, file);
            // const formData = new FormData()
            // formData.append('files', this.updateForm.fileList);//传文件
            // formData.append('id', this.updateForm.id);//传其他参数
            // axios.post('/api/battery/fileUpload', formData).then(function (res) {
            //     alert('成功');
            // })
            // return false  //屏蔽了action的默认上传
        },
        // 上传
        handleUpdate(index, row) {
            this.uploadFormVisible = true;
            this.dialogStatus = "update";
            this.updateForm = Object.assign({}, row);
            // console.log(this.updateForm);
        },
        // 上传确定
        updateConfirm(formName) {
            let formData = new FormData();
            formData.append('id', this.updateForm.id);
            let yjFileList = [];
            this.updateForm.fileList.map(item => {
                yjFileList.push(item.raw)
                return item
            })
            // console.log(yjFileList, 'yjFileList');
            yjFileList.map(item => {
                formData.append('files', item);
            })
            for (var value of formData.values()) {
                // console.log('rrrrr', value);
            }
            this.$http({
                method: 'post',
                url: '/api/battery/fileUpload',   //  二次接口
                processData: false,//是否将data中的数据进行转化，默认是true，
                // contentType: false,
                data: formData
            }).then(res => {
                if (res.data.ok == true) {
                    // fileUpload(formData, { processData: false, }).then(res => {//不知道咋回事封装的不好使，接收到的是null
                    this.$message({
                        message: '附件上传成功',
                        type: 'success'
                    });
                    this.uploadFormVisible = false;
                    // console.log('附件成功后');
                    this.getDataList()
                    // this.resetForm()
                }
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: err,
                })
            })
            return false  //屏蔽了action的默认上传
        },
        //点击审核
        handleShenhe: function (index, row) {
            const param = {
                id: row.id
            }
            this.idss = row.id,
                this.FormVisibleck = true;
            this.viewRejectionForm = Object.assign({}, row);
            _index = index;
            this.dialogStatus = "shenheEquipment"
        },
        // 点击审核确定
        confirmShenhe(viewRejectionForm) {
            edit().then(response => {
                var shenhedata = _index;
                this.$message({
                    message: '审核成功',
                    type: 'success'
                });
                this.FormVisibleck = false;
                this.getDataList();
            });
        },
        //所有人弹框
        handleDialogAll() {
            this.FormVisibleTS = true;//推送所有弹框
            const id = this.idss //idss定义的变量接收id
            this.pushMsgUserNames = []
            getEnterpriseUser(id).then(res => {
                const linkman = res.data.data
                linkman.forEach((item) => {
                    console.log('item', item);
                    this.pushMsgUserNames.push(
                        item.usname
                    )
                    // console.log('this.pushMsgUserNames', this.pushMsgUserNames);
                })
            })
        },
        handleCheckAll(val) {
            // console.log(111, val);
            this.roleCheckList = val ? this.pushMsgUserNames : [];
            this.isIndeterminate = false;
            // console.log('this.roleCheckList', this.roleCheckList);
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.viewRejectionForm.checkAll = checkedCount === this.pushMsgUserNames.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.pushMsgUserNames.length;
        },
        // 推送所有人确定
        handleTs(val) {
            // console.log(555, val);
            this.FormVisibleTS = false;
            this.viewRejectionForm.checkAll = !this.roleCheckList.length ? false : true
            // this.roleCheckList = this.roleCheckList
            // console.log('确定', this.pushMsgUserNames);
        },
        handleCancelTs(formName) {
            this.FormVisibleTS = false;
        },
        handleCloseTs(done) {
            this.FormVisibleTS = false;
        },
        handleCloseFJ(done) {
            this.enclosureFormVisibledel = false;
        },
        confirmDr() {
            this.FormVisibledr = false;
        },
        //点击关闭dialog
        handleClose(done) {
            this.managementVisible = false;
            this.FormVisibledr = false;
            this.FormVisibleck = false;
            this.FormVisibledel = false;
            this.FormVisibleSend = false;
            this.FormVisibleAlldel = false;
            this.FormVisibleTS = false;
            this.FormVisibleAllSh = false;
            this.FormVisibleCompare = false;

        },
        //点击取消
        handleCancel(formName) {
            this.FormVisibledr = false;
            this.FormVisibleck = false;
            this.FormVisibledel = false;
            this.enclosureFormVisibledel = false;
            this.FormVisibleSend = false;
            this.FormVisibleAlldel = false;
            this.FormVisibleTS = false;
            this.FormVisibleAllSh = false;
            this.FormVisibleCompare = false;
        },
        //一键审核
        shenheAll: function () {
            this.FormVisibleAllSh = true;

        },
        //一键审核确定
        handleShenhe2() {
            // this.FormVisibleAlldel = false;
            if (this.multipleSelection.length == 0) {
                return false;
            }
            // this.multipleSelection.forEach((item) => {
            //     // this.users.remove(item);
            // });
            console.log('boxxxx', this.multipleSelection);
            const idsList = this.multipleSelection.map(item => {
                return item.id
            })
            const ids = idsList.toString()
            console.log('审核ids', ids);
            auditing(ids).then(res => {
                console.log('审核');
                this.$message({
                    message: '审核成功',
                    type: 'success'
                });
                this.FormVisibleAllSh = false;
                this.getDataList()
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })

            // this.FormVisibleAllSh = false;
            // if (this.multipleSelection.length == 0) {
            //     return false;
            // }
            // this.$message({
            //     showClose: true,
            //     message: '审核成功',
            //     type: 'success'
            // });
            // this.multipleSelection.forEach((item) => {
            //     // this.users.remove(item);
            // });

        },
        //一键删除
        delAll() {
            this.FormVisibleAlldel = true;
        },
        //一键删除确定
        deleteFileOrDirectory() {
            // this.FormVisibleAlldel = false;
            if (this.multipleSelection.length == 0) {
                return false;
            }
            const idsList = this.multipleSelection.map(item => {
                return item.id
            })
            const ids = idsList.toString()
            DeleteList(ids).then(res => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.FormVisibleAlldel = false;
                this.getDataList()
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })
        },
        //选中多选框实现自动加入待删除行对象的数组
        handleSelectionChange(val) {
            //下面这个表示选择的多选框都会被加到存放待删除行的行对象！
            this.multipleSelection = val;
            // console.log('box', this.multipleSelection);
            //当用户只要选择了任意个多选框，删除选中和取消选中按钮就会出现
            if (this.multipleSelection.length === 0) {
                //如不进行判断则勾选完毕后批量删除按钮还是会在
                this.multipleSelectionFlag = false;
            }
        },
        //切换选中状态
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },

        // 删除
        handleDel(index, row) {
            this.FormVisibledel = true;
            this.Form = Object.assign({}, row);
            _index = index;
        },
        // 列表删除确定
        handleDelete(form) {
            // console.log('列表form', this.Form);
            const ids = this.Form.id
            DeleteList(ids).then(res => {
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.FormVisibledel = false;
                this.getDataList()
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })
        },
        //推送
        handleFasong(index, row) {
            this.FormVisibleSend = true;
            this.Form = Object.assign({}, row);
            _index = index;
        },
        //推送确定 seedList
        handleSend(form) {
            // console.log('推送', this.Form);
            const id = this.Form.id
            // console.log('推送id', id);
            seedList(id).then(res => {
                this.$message({
                    message: '推送成功',
                    type: 'success'
                });
                this.FormVisibleSend = false;
                this.getDataList()
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })

        },
        // handleDelete(index, row) {
        //   console.log(index, row);

        //   this.$confirm('是否继续?', {
        //   }).then(() => {
        //     this.$message({
        //       type: 'success',
        //       message: '删除成功!',
        //       delete: row.splice(index, 1)
        //     });
        //   }).catch(() => {
        //     this.$message({
        //       type: 'info',
        //       message: '已取消删除'
        //     });
        //   });
        // },
        open() {
            this.$nextTick(() => {
                // this.drawLine1();//折线图普通
                // this.drawLine2();//单折线图
                // this.drawLine3();
                // this.drawLine6();
            })
        },
        // 下拉框数据,接口暂时未返回数据
        getSelectList() {
            getList().then(res => {
                console.log('下拉数据', res);
            })
        }
    },
    created() {
        this.getDataList();//列表
        this.getSelectList();//下拉框数据
    },
    mounted() {
        // this.mohuList()//模糊查询
    }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 1400px) {
    /deep/.el-input {
        width: 148px;
    }
}
@media screen and (max-width: 1920px) and (min-width: 1920px) {
    /deep/.el-input {
        width: 235px;
    }
}
/deep/.el-input--suffix .el-input__inner {
    padding-right: 0;
}
/deep/.el-form--inline .el-form-item {
    margin-right: 5px;
}
/deep/.el-pagination__editor.el-input .el-input__inner {
    width: 45px;
}
// .el-date-editor--datetimerange.el-input,
// .el-date-editor--datetimerange.el-input__inner {
//     width: 345px;
// }
/deep/.header {
    .content {
        .nav {
            > ul {
                .is-active {
                    .el-submenu__title {
                        color: #fff !important;
                    }
                }
            }
        }
    }
}
.wrap {
    box-sizing: border-box;
    min-width: 100%;
    min-height: 100%;
    background: rgba(244, 247, 252, 1);
}
.main {
    width: 98%;
    margin: 0 auto;
    overflow: hidden;
}
/deep/.el-breadcrumb__inner.is-link {
    font-weight: 700;
    text-decoration: none;
    -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: rgba(141, 171, 196, 1) !important;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    font-weight: 400;
    color: rgba(43, 64, 91, 1);
    cursor: text;
}
.el-form-item {
    margin-bottom: 3px;
}
// /deep/.el-input__inner {
//     -webkit-appearance: none;
//     background-color: #fff;
//     background-image: none;
//     border-radius: 4px;
//     border: 1px solid #dcdfe6;
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
//     color: #606266;
//     display: inline-block;
//     font-size: inherit;
//     height: 32px;
//     line-height: 32px;
//     outline: 0;
//     padding: 0 15px;
//     -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
//     transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
//     width: 100%;
// }
.listCon {
    margin: 5px 0 20px 0;
    padding: 10px 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
}
/deep/.el-dialog__header {
    padding: 10px 20px 10px;
    background: rgba(250, 251, 252, 1);
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
    border-radius: 8px 8px 0px 0px;
}
/deep/.el-dialog__headerbtn {
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
}
.tcCon {
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    // /deep/.el-input__inner {
    //     border: 1px solid transparent !important;
    //     font-size: 14px;
    //     color: rgba(62, 82, 111, 1);
    //     font-weight: 400;
    // }
}
.line {
    margin: 10px auto;
    border-bottom: 1px solid rgba(229, 238, 245, 1);
}
/deep/.el-textarea__inner {
    font-size: 14px;
    color: rgba(62, 82, 111, 1);
    font-weight: 400;
    padding: 5px 15px 5px 10px;
}
/deep/.el-radio {
    color: rgba(62, 82, 111, 1);
}
/deep/.el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: rgba(62, 82, 111, 1);
    font-weight: bold;
}

/deep/.el-table {
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: #3f536e;
}
/deep/.el-table__header {
    width: 100% !important;
}
/deep/.el-table__body {
    width: 100% !important;
}
/deep/.el-table thead {
    // width: 100% !important;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #7791a7;
    font-weight: 500;
}
/deep/.el-table th {
    background-color: rgba(250, 250, 250, 1) !important;
}
/deep/.el-table td,
.el-table th {
    // padding: 12px 0;
    padding: 9px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: center;
}
/deep/.el-table__body tr > td:first-child {
    border-left: 2px solid transparent;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td:first-child {
    border-left: 2px solid #0093ee;
}
/deep/.el-table th > .cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    text-align: center;
    width: 100%;
}
.pagingtion-box {
    position: relative;
}
/deep/.pagingtion-box .el-pagination__total {
    position: absolute;
    left: 0;
}
/deep/.pagingtion-box .el-pagination__sizes {
    position: absolute;
    left: 67px;
}
/deep/.pagingtion-box .el-pagination__total {
    font-size: 14px;
    color: #606266;
}
// /deep/.pagingtion-box .el-input__inner {
//     font-size: 14px;
//     color: #606266;
// }
/deep/.pagingtion-box .el-pager .number {
    font-size: 14px;
    color: #303133;
}
/deep/.pagingtion-box .el-pager .active {
    color: #409eff;
}
/deep/.header.nav .content .el-menu--horizontal > .el-menu-item.is-active {
    color: #fff !important;
}
/deep/.el-message-box__header {
    position: relative;
    padding: 15px 15px 10px;
    height: 29px;
    background: rgba(250, 251, 252, 1);
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
}
//测试
// /deep/.el-form--inline .el-form-item {
//     display: inline-block;
//     margin-right: 28px;
//     vertical-align: top;
// }
// /deep/.el-form--inline .el-form-item:nth-child(4) {
//     display: inline-block;
//     margin-right: 0;
//     vertical-align: top;
// }
/deep/.el-dialog__footer {
    border-top: 1px solid rgba(238, 238, 238, 1);
    padding: 10px 20px 10px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
/deep/.el-checkbox__input {
    cursor: pointer;
    outline: 0;
    line-height: 0;
    vertical-align: middle;
}
/deep/.el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
/deep/.customWidth {
    width: 20% !important;
}
/deep/.customWidth2 {
    // width: 30% !important;
    width: 480px;
}
/deep/.el-table .cell {
    img {
        margin-top: 2px;
    }
}
.el-table__header {
    width: 100% !important;
}
.el-table__body {
    width: 100% !important;
}
</style>
