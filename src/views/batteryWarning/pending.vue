<template>
    <div class="wrap">
        <toph v-bind:active="active"></toph>
        <div class="main">
            <el-breadcrumb separator="/" style="margin-top:12px; margin-left:15px;">
                <el-breadcrumb-item :to="{ path: '/batteryWarning/batterys' }">电池预警</el-breadcrumb-item>
                <el-breadcrumb-item><a>风险待办管理</a></el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索部分 -->
            <div class="listCon">
                <div class="item" style="height:30px;line-height:30px;background: #FFFFFF;font-size:14px;padding-bottom:10px;border-bottom:1px solid #EBEEF5;">
                    <span style="float:left;font-size: 14px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: #303133;">风险电池待办管理</span>
                </div>
                <el-form :inline="true" :model="filters" ref="filters" style="margin-top:10px">
                    <el-form-item prop="vehicleType" label="车型">
                        <el-input v-model="filters.vehicleType" placeholder="请输入车型" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item prop="vin" label="车辆VIN">
                        <el-input v-model="filters.vin" placeholder="请输入VIN码" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item prop="startTime" label="预警时刻">
                        <template>
                            <el-date-picker size="mini" v-model="filters.startTime" type="datetime" placeholder="开始日期时间">
                            </el-date-picker>
                        </template>
                    </el-form-item>
                    <el-form-item prop="EndTime" label="一">
                        <template>
                            <el-date-picker size="mini" v-model="filters.EndTime" type="datetime" placeholder="结束日期时间">
                            </el-date-picker>
                        </template>
                    </el-form-item>
                    <el-form-item prop="licensePlate" label="车牌号">
                        <el-input v-model="filters.licensePlate" placeholder="请输入车牌号" size="mini"></el-input>
                    </el-form-item>
                    <el-form-item prop="yjState" label="电池类型">
                        <el-select v-model="filters.yjState" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in filters.dcTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="yjMode" label="失效模式">
                        <el-select v-model="filters.yjMode" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in failureModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="yjtype" label="预警类型">
                        <el-select v-model="filters.yjtype" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in failureModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="yjstatus" label="预警状态">
                        <el-select v-model="filters.yjstatus" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in filters.yjztOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="yjGraden" label="预警风险等级">
                        <el-select v-model="filters.yjGraden" placeholder="请选择" clearable size="mini" @change="change($event)">
                            <el-option v-for="item in warningGradenOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getDataList()" size="mini">搜索</el-button>
                        <el-button size="mini" @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
                <!--列表部分-->
                <el-table :data="waitTableData" style="width: 100%;margin-top:10px;" height="250" ref="multipleTable">
                    <el-table-column type="selection" width="60">
                    </el-table-column>
                    <el-table-column type="index" label="序号" width="50">
                    </el-table-column>
                    <el-table-column prop="vehicleType" label="车型" width="80">
                    </el-table-column>
                    <el-table-column prop="vin" label="车辆VIN" width="80">
                    </el-table-column>
                    <el-table-column prop="licensePlate" label="车牌号" min-width="80">
                    </el-table-column>
                    <el-table-column prop="batteryType" label="电池类型" min-width="80">
                    </el-table-column>
                    <el-table-column label="预警风险等级" min-width="105">
                        <template slot-scope="scope">
                            <!-- 显示纯文字↓ -->
                            <span>{{warningGraden (scope.row.riskLevel)}}</span>
                            <!-- 显示等级图片↓ -->
                            <!-- <img src="../../assets/images/battery/oneFx.png" alt="" v-if="scope.row.riskLevel==1">
                            <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="scope.row.riskLevel==2">
                            <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="scope.row.riskLevel==3"> -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="warningTime" label="预警时刻" min-width="80">
                    </el-table-column>
                    <el-table-column prop="warningMessage" label="预警对应发生时间点" min-width="145">
                    </el-table-column>
                    <el-table-column prop="warningType" label="预警类型" min-width="100">
                        <!-- <template slot-scope="scope">
                            <span>{{warningType (scope.row.warningType)}}</span>
                        </template> -->
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
                    <el-table-column label="操作" width="140">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small" v-if="scope.row.reviewStatus=='2'">编辑</el-button>
                            <el-button @click="handleShenhe(scope.$index, scope.row)" type="text" size="small" v-else-if="scope.row.reviewStatus=='7'">审核</el-button>
                            <el-button @click="handleLook(scope.$index, scope.row)" type="text" size="small" v-else-if="scope.row.reviewStatus=='6'">驳回处理</el-button>
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
            <!-- 编辑/驳回处理 -->
            <el-dialog v-model="labelPosition" :title="titleMap[dialogStatus]" :visible.sync="FormVisibleck" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" @close="closeEditForm()" @open="open()">
                <el-form :model="viewRejectionForm" label-width="120px" ref="viewRejectionForm" :rules="rules" :label-position="labelPosition">
                    <el-row>
                        <el-button type="primary" size="mini" round @click="gotolink" v-show="this.dialogStatus=='ckEquipment'">汽车全生命周期数据查看</el-button>
                    </el-row>
                    <div class="tcCon">
                        <div style="width:45%;">
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
                                <span>{{warningGraden (viewRejectionForm.riskLevel)}}</span>
                                <!-- <el-select v-model="viewRejectionForm.riskLevel" placeholder="请选择" clearable size="mini" :disabled="this.dialogStatus=='ckEquipment'?true:false">
                                    <el-option v-for="(item,index) in warningGradenOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select> -->
                                <!-- <img src="../../assets/images/battery/oneFx.png" alt="" v-if="Form.riskLevel==1">
                                <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="Form.riskLevel==2">
                                <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="Form.riskLevel==3"> -->
                            </el-form-item>
                        </div>
                        <div style="width:45%;">
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
                                <span>{{failureMode (viewRejectionForm.loseEfficacyType)}}</span>
                                <!-- <el-select v-model="viewRejectionForm.loseEfficacyType" placeholder="请选择" size="mini" :disabled="this.dialogStatus=='ckEquipment'?true:false">
                                    <el-option v-for="(item,index) in failureModeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select> -->
                            </el-form-item>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="tcCon" style="justify-content: flex-start;">
                        <div style="width:120px;font-size: 14px;color:rgba(62,82,111,1);font-weight:bold;">预警描述</div>
                        <div style="width:80%;font-size: 14px;color:rgba(62,82,111,1);font-weight:400;">
                            该动力电池电压趋势异常，判断电芯内短路，为1级高风险预警
                            <!-- <el-button type="primary" size="mini" round @click="newTu" v-show="this.dialogStatus=='ckEquipment'">刷新</el-button> -->
                        </div>
                    </div>
                    <div style="margin-left:30px;">
                        <div id="dyBox1" ref="dyBox1" style="height:220px; width:90%;"></div>
                        <div id="dyBox2" ref="dyBox2" style="height:220px; width:90%;"></div>
                        <div id="dyBox3" ref="dyBox3" style="height:220px; width:90%;"></div>
                    </div>
                    <div class="line"></div>
                    <!-- 编辑=》预警状态为已驳回展示审核描述 -->
                    <el-form-item label="审核描述" prop="describe" v-show="viewRejectionForm.reviewStatus=='6'">
                        <el-input v-model="viewRejectionForm.describe" :disabled="true" size="mini"></el-input>
                    </el-form-item>
                    <div class="zhenduan" style="justify-content: flex-start;">
                        <el-form-item label="诊断结果" prop="inputZD" v-show="this.dialogStatus=='editEquipment'">
                            <el-input type="textarea" maxlength="50" show-word-limit v-model="viewRejectionForm.inputZD" placeholder="分析电池包监控数据，与预警描述一致"></el-input>
                        </el-form-item>
                        <el-form-item label="诊断结果" v-show="this.dialogStatus=='ckEquipment'">
                            <el-input type="text" size="mini" readonly="readonly" value="分析电池包监控数据，与预警描述一致"></el-input>
                        </el-form-item>
                    </div>
                    <div class="tcCon" style="justify-content: flex-start; margin-top:10px;">
                        <el-form-item label="审核人">
                            <!-- <el-select v-model="viewRejectionForm.shpeople" placeholder="请选择" clearable size="mini">
                                <el-option v-for="item in filters.shenheOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select> -->
                            <el-input type="text" size="mini" value="张三管理员"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button v-show="this.dialogStatus=='editEquipment'" size="mini" @click.native="handleCancel('viewRejectionForm')">取消</el-button>
                    <el-button v-show="this.dialogStatus=='editEquipment'" type="primary" size="mini" @click.native="confirmEdit('viewRejectionForm')">确定</el-button>
                    <el-button v-show="this.dialogStatus=='ckEquipment'" type="primary" size="mini" @click.native="handleCancel('viewRejectionForm')">确定</el-button>
                    <!-- <el-button v-if="addBtnshow" type="primary" @click.native="confirmAdd('Form')">确定</el-button> -->
                </div>
            </el-dialog>
            <!-- 审核 -->
            <el-dialog v-model="labelPosition" :title="titleMap[dialogStatus]" :visible.sync="FormVisible2" :close-on-click-modal="false" class="edit-form" :before-close="handleClose" @open="open()">
                <el-form :model="Form" :label-position="labelPosition" label-width="120px" ref="Form">
                    <div class="tcCon">
                        <div style="width:45%;">
                            <el-form-item label="车型" prop="vehicleType">
                                <span>{{Form.vehicleType}}</span>
                            </el-form-item>
                            <el-form-item label="车辆VIN">
                                <span>{{Form.vin}}</span>
                            </el-form-item>
                            <el-form-item label="预警状态">
                                <span>{{warningState (Form.reviewStatus)}}</span>
                            </el-form-item>
                            <el-form-item label="预警风险等级">
                                <span>{{warningGraden(Form.riskLevel)}}</span>
                                <!-- <img src="../../assets/images/battery/oneFx.png" alt="" v-if="Form.riskLevel==1">
                                <img src="../../assets/images/battery/twoFx.png" alt="" v-else-if="Form.riskLevel==2">
                                <img src="../../assets/images/battery/fourFx.png" alt="" v-else-if="Form.riskLevel==3"> -->
                                <!-- <el-select v-model="Form.fxDj" placeholder="" clearable size="mini" style="border: 1px solid #A8C6DF; border-radius:4px;">
                <el-option  v-for="item in filters.fengxianOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
            </el-select> -->
                            </el-form-item>
                        </div>
                        <div style="width:45%;">
                            <el-form-item label="车牌号">
                                <span>{{Form.licensePlate}}</span>
                            </el-form-item>
                            <el-form-item label="电池类型">
                                <span>{{Form.batteryType}}</span>
                            </el-form-item>
                            <!-- <el-form-item label="电池SOH">
                <el-input value="99%"></el-input>
              </el-form-item> -->
                            <el-form-item label="预警类型">
                                <span>{{Form.warningType}}</span>
                                <!-- <span>{{warningType (Form.warningType)}}</span> -->
                            </el-form-item>
                            <el-form-item label="失效模式">
                                <span>{{Form.loseEfficacyType}}</span>
                                <!-- <span>{{failureMode (Form.loseEfficacyType)}}</span> -->
                            </el-form-item>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="tcCon" style="justify-content: flex-start;">
                        <div style="width:120px;font-size: 14px;color:rgba(62,82,111,1);font-weight:bold; margin-right:12px;">预警描述</div>
                        <div style="width:80%;font-size: 14px;color:rgba(62,82,111,1);font-weight:400;">
                            该动力电池电压趋势异常，判断电芯内短路，为1级高风险预警

                        </div>

                    </div>
                    <div style="margin-left:30px;">
                        <div id="dyBox1" ref="dyBox1" style="height:220px; width:90%;"></div>
                        <div id="dyBox2" ref="dyBox2" style="height:220px; width:90%;"></div>
                        <div id="dyBox3" ref="dyBox3" style="height:220px; width:90%;"></div>
                    </div>
                    <div class="line"></div>
                    <div class="" style="justify-content: flex-start;">
                        <el-form-item label="诊断结果描述">
                            <div style="color:#3E526F; margin-left:8px;">分析电池包监控数据，与预警描述一致</div>
                            <!-- <el-input type="textarea" v-model="Form.sxms" style="width:100%; border-radius:4px;border:1px solid rgba(168,198,223,1);"></el-input> -->
                        </el-form-item>
                    </div>
                    <div class="tcCon" style="justify-content: flex-start;">
                        <el-form-item label="审核人">
                            <div style="color:#3E526F; margin-left:8px;">张三管理员</div>
                            <!-- <el-select v-model="Form.shpeople" placeholder="张三管理员" clearable size="mini" style="border: 1px solid #A8C6DF; border-radius:4px;">
                <el-option  v-for="item in filters.shenheOptions"   :key="item.value"  :label="item.label"  :value="item.value" ></el-option>
            </el-select> -->
                        </el-form-item>
                    </div>
                    <el-form-item label="审核结果">
                        <el-radio v-model="radio" label="1" style="margin-left:8px;">通过</el-radio>
                        <el-radio v-model="radio" label="2">驳回</el-radio>
                    </el-form-item>
                    <el-form-item label="审核描述" class="shmiaoshu">
                        <el-input type="textarea" v-model="Form.shms" style="width:85%; border-radius:4px;"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-checkbox label="1" v-model="checked" style="margin-left:8px;"><span style="font-size:14px;color:#3E526F;font-family:PingFangSC-Regular,PingFang SC;">推送消息 给</span> <span style="font-family:PingFangSC-Regular,PingFang SC;color:#239FFF;font-size:14px;" @click="allPeople()">所有人</span></el-checkbox>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click.native="confirmShenhe('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                    <!-- <el-button v-if="addBtnshow" type="primary" @click.native="confirmAdd('Form')">确定</el-button> -->

                </div>
            </el-dialog>
            <!-- 删除 -->
            <el-dialog title="删除" customClass="customWidth" :visible.sync="FormVisibledel" :close-on-click-modal="false" class="edit-form del-form" :before-close="handleClose" style="margin-top:10%;">
                <div>确定删除选中的选项</div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleDelete('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                </div>
            </el-dialog>
            <!-- 推送所有人 -->
            <el-dialog title="推送" customClass="customWidth" :visible.sync="FormVisibleTS" :close-on-click-modal="false" class="edit-form" :before-close="handleCloseTs">
                <el-form :model="Form" ref="Form">
                    <el-form-item label="人员列表" label-width="80px">
                        <el-checkbox-group v-model="roleCheckList.content1">
                            <el-checkbox label="刘敏"></el-checkbox>
                            <el-checkbox label="王毅"></el-checkbox>
                            <el-checkbox label="张建斌"></el-checkbox>
                            <el-checkbox label="夏丽丽"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="handleTs('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                    <el-button @click.native="handleCancelTs('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import toph from "@/components/top";
// import "echarts";
import _url from "@/api/arrayRemove";
import { getRiskBatteryList, getWarningInforInit } from "@/api/battery";
import { chartLineOption1, boxPlotOption, chartLineOption6, chartLineOption4 } from "./battery.js";
var _index;
export default {
    components: {
        toph
    },
    data() {
        return {
            series: [],
            //模拟后台数据
            dataTu: [
                {
                    "doubleYData":
                    {
                        "x": ["2020-01-02", "2020-02-04", "2020-06-04", "2020-07-04", "2020-08-04", "2020-09-04"],
                        "y1": [10, 9, 12, 45, 63, 33],
                        "y2": [7, 12, 8, 63, 45, 75],
                        "y3": [34, 54, 8, 54, 65, 75],
                        "y4": [23, 72, 45, 75, 35, 65],
                        "y5": [37, 7, 35, 44, 15, 55]
                    }
                },
                {
                    "lineData":
                    {
                        "x": ["2020-01-02", "2020-02-04", "2020-03-04", "2020-04-04", "2020-05-04", "2020-08-04"],
                        "y": [11, 20, 23, 44, 25, 77]
                    }
                },
                {
                    "boxData":
                    {
                        'boxData': [//盒子
                            [55, 24, 41, 9, 55],
                            [12, 77, 15, 80, 21],
                            [25, 64, 57, 22, 35],
                            [35, 24, 55, 77, 44],
                            [44.5, 35, 33, 80, 77],
                        ],
                        "data": [120, '', 110, '', 300],//加号
                    }
                }],
            waitTableData: [
                {
                    vehicleType: '111',
                    vin: '王小虎',
                    licensePlate: '上海市普陀518 弄',
                    batteryType: '78 15',
                    warningTime: '24245 1518 弄',
                    warningMessage: 'rrr',
                    reviewStatus: '2',
                },
                {
                    vehicleType: '222',
                    vin: '王小虎',
                    licensePlate: '上海市普陀518 弄',
                    batteryType: '78 15',
                    warningTime: '24245 1518 弄',
                    warningMessage: 'ggg',
                    reviewStatus: '6',
                },
                {
                    vehicleType: '333',
                    vin: '王小虎',
                    licensePlate: '上海市普陀518 弄',
                    batteryType: '78 15',
                    warningTime: '24245 1518 弄',
                    warningMessage: 'hhh',
                    reviewStatus: '7',
                },
            ],
            //单体压差过大模型双折线
            dianyaNum: {
                xData: [],
                lowerLimit: [],
                gaoCount: [],
            },
            //单体压差过大模型折线
            aloneNum: {
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
                ]
            },
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
                value: '模组电压',
                label: '模组电压'
            }, {
                value: '电池包欠压',
                label: '电池包欠压'
            }],
            labelPosition: 'left',//默认左对齐
            inputZD: '',//编辑内的诊断结果文本
            titleMap: {
                editEquipment: "编辑",
                shenheEquipment: "审核",
                // daochuEquipment: "导出",
                ckEquipment: "查看"
            },
            dialogStatus: "",
            checked: true,
            //审核
            Form: {
                id: 0,
                name: '',
                vehicleType: '',//车型
                vin: '',//vin
                licensePlate: '',//车牌号
                batteryType: '',//电池类型
                sxms: '',
                riskLevel: '',//预警风险等级
                warningTime: '',//预警时刻
                warningMessage: '',//预警信息
                warningType: '',//预警类型
                loseEfficacyType: '',//失效模式
                reviewStatus: '',//预警状态
            },
            //查看/编辑/驳回处理
            viewRejectionForm: {
                id: 0,
                name: '',
                vin: '',
                licensePlate: '',
                batteryType: '',
                sxms: '',
                describe: '',//审核描述 
                riskLevel: '',//预警风险等级
                warningTime: '',//预警时刻
                warningMessage: '',//预警信息
                warningType: '',//预警类型
                loseEfficacyType: '',//失效模式
                reviewStatus: '',//预警状态
            },
            radio: '1',
            shpeople: '张三管理员',
            FormVisible2: false,
            FormVisibledc: false,
            FormVisibledr: false,
            FormVisibleck: false,
            FormVisibledel: false,
            FormVisibleSend: false,
            FormVisibleAlldel: false,
            FormVisibleAllSh: false,
            FormVisibleTS: false,
            currentRow: [],
            addBtnshow: false,
            editBtnshow: false,
            DcBtnshow: false,
            FormVisibleCompare: false,
            multipleSelection: [],
            editid: '',
            active: 2,
            roleCheckList: {
                content1: [],
            },
            filters: {
                //审核人
                startTime: '',//开始日期时间
                EndTime: '',//结束日期时间
                // startEndTime: [new Date(), new Date()],//时间选择器
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
                yjztOptions: [
                    {
                        value: "未审核",
                        label: "未审核"
                    },
                    {
                        value: "已推送",
                        label: "已推送"
                    },
                    {
                        value: "已处理",
                        label: "已处理"
                    },
                    {
                        value: "已审核",
                        label: "已审核"
                    },
                    {
                        value: "已驳回",
                        label: "已驳回"
                    },
                    {
                        value: "已安全",
                        label: "已安全"
                    }
                ],
                //电池类型
                dcTypeOptions: [
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
                //列表搜索参数
                vin: "",
                licensePlate: "",
            },
            //批量选中data
            selectList: [],
            //分页
            pageSize: 1,
            currentPage: 1,
            total: 0,
            pageSize_: 5,
            currentPage_: 1,
            total_: 0,
        }
    },
    methods: {
        //折线图96条
        drawLine6() {
            let obj = this.dataTu.find((item) => item.doubleYData);
            console.log("obj", obj.doubleYData);
            this.dianyaNum.xData = obj.doubleYData.x;
            // delete obj.doubleYData.x;
            console.log('this.dianyaNum.xData', this.dianyaNum.xData);
            console.log("obj22", obj.doubleYData);
            let series = []
            for (var k in obj.doubleYData) {
                var item = {
                    type: "line",
                    itemStyle: {
                        normal: {
                            label: { show: true }, lineStyle: {
                                color: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                            },
                        },
                    },
                    data: obj.doubleYData[k],
                };
                console.log("item", item);
                this.series.push(item);
            }
            console.log('series', this.series);
            this.chartLineOption6();
        },
        chartLineOption6() {
            this.$nextTick(() => {
                // document.getElementById('dyBox1').removeAttribute('_echarts_instance_');
                let myChart = this.$echarts.init(this.$refs.dyBox1);
                myChart.setOption(
                    chartLineOption6(
                        this.series,
                        this.dianyaNum.xData,
                        "最高电压",
                        "电压（N）",
                        // this.dianyaNum.gaoCount,
                        "最低电压"
                        // this.dianyaNum.lowerLimit
                    )
                );
            });
        },
        //双折线图
        // drawLine1() {
        //     let obj = this.dataTu.find(item => item.doubleYData)
        //     this.dianyaNum.xData = obj.doubleYData.x;
        //     this.dianyaNum.gaoCount = obj.doubleYData.y1;
        //     this.dianyaNum.lowerLimit = obj.doubleYData.y2;
        //     this.drawOnlineChart();
        // },
        // drawOnlineChart() {
        //     this.$nextTick(() => {
        //         let myChart = this.$echarts.init(this.$refs.dyBox1);
        //         // this.busVehicleOnlineCharts.setOption(chartLineOption3(null, this.xData, null, null, '车辆数', this.chartsNum.yData, null, null, null, null, '辆'))
        //         myChart.setOption(
        //             chartLineOption1(
        //                 this.dianyaNum.xData,
        //                 "最高电压",
        //                 "电压（N）",
        //                 this.dianyaNum.gaoCount,
        //                 "最低电压",
        //                 this.dianyaNum.lowerLimit
        //             )
        //         );
        //     });
        // },
        // 单折线图
        drawLine2() {
            let obj = this.dataTu.find(item => item.lineData)
            this.aloneNum.xData = obj.lineData.x;
            this.aloneNum.aloneCount = obj.lineData.y;
            this.drawCarVehicleOnlineChart();
        },
        drawCarVehicleOnlineChart() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox2);
                myChart.setOption(
                    chartLineOption4(
                        this.aloneNum.xData,
                        "压差",
                        "单压变化率（V/s）",
                        this.aloneNum.aloneCount,
                    )
                );
            });
        },
        // 箱线图
        drawLine3() {
            let obj = this.dataTu.find(item => item.boxData)
            this.boxPlotNum.boxData = obj.boxData.boxData;
            console.log('55555555555', this.boxPlotNum.boxData);
            this.boxPlotNum.data = obj.boxData.data;
            this.boxPlotChart();
        },
        boxPlotChart() {
            this.$nextTick(() => {
                let myChart = this.$echarts.init(this.$refs.dyBox3);
                myChart.setOption(
                    boxPlotOption(
                        "同类车辆压差（V）",
                        this.boxPlotNum.boxData,//盒子数据
                        this.boxPlotNum.data,//加号数据
                    )
                );
            });
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
            return reviewStatus == "1" ? "未推送" : reviewStatus == "2" ? "已推送" : reviewStatus == "3" ? "已处理" : reviewStatus == "4" ? "已审核" : reviewStatus == "5" ? "已安全" : reviewStatus == "6" ? "已驳回" : reviewStatus == "7" ? "待审核" : ""
        },
        // 预警风险等级
        warningGraden(riskLevel) {
            return riskLevel == "1" ? "高风险" : riskLevel == "2" ? "中风险" : riskLevel == "3" ? "低风险" : ""
        },
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
        // 待办列表
        getDataList() {
            let params = {
                page: this.currentPage, //当前页
                pageSize: this.pageSize, //每页条数
                reviewStatus: "6,7",
            };
            console.log('getDataList', params);
            getRiskBatteryList(params).then(res => {
                const data = res.data.data
                if (res.data.ok == true) {
                    this.waitTableData = data.list;
                    this.total = data.count;
                } else {
                    this.waitTableData = [];
                    this.total = 0;
                }
            })
                .finally(() => {
                })
                .catch(e => { });
        },

        resetForm() {
            this.$refs.filters.resetFields()
        },
        //查看/驳回处理
        handleLook: function (index, row) {
            this.FormVisibleck = true;
            this.viewRejectionForm = Object.assign({}, row);
            _index = index;
            this.dialogStatus = "ckEquipment"
            this.addBtnshow = false
            this.editBtnshow = true
        },
        //清空编辑表单校验
        closeEditForm() {
            this.$refs.viewRejectionForm.resetFields()
        },
        //编辑
        handleEdit: function (index, row) {
            this.FormVisibleck = true;
            this.viewRejectionForm = Object.assign({}, row);
            _index = index;
            this.dialogStatus = "editEquipment"
            this.addBtnshow = false
            this.editBtnshow = true
        },
        // 点击确定（编辑）  
        confirmEdit(viewRejectionForm) {
            this.$refs[viewRejectionForm].validate((valid) => {
                if (valid) {
                    var editdata = _index;
                    // this.users[editdata].name = this.viewRejectionForm.name;
                    // this.users[editdata].vin = this.viewRejectionForm.vin;
                    // this.users[editdata].licensePlate = this.viewRejectionForm.licensePlate;
                    // this.users[editdata].batteryType = this.viewRejectionForm.batteryType;
                    // this.users[editdata].fxDj = this.viewRejectionForm.fxDj;
                    // this.users[editdata].sxms = this.viewRejectionForm.sxms;
                    this.FormVisibleck = false;
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //点击审核
        handleShenhe: function (index, row) {
            this.FormVisible2 = true;
            this.Form = Object.assign({}, row);
            _index = index;
            this.dialogStatus = "shenheEquipment"
            this.addBtnshow = false
            this.editBtnshow = true
        },
        // 点击确定（审核）  
        confirmShenhe() {
            var shenhedata = _index;
            this.FormVisible2 = false;
            this.$message({
                message: '审核成功',
                type: 'success'
            });
        },
        //推送给所有人
        allPeople() {
            this.FormVisibleTS = true;
        },
        handleTs() {
            this.FormVisibleTS = false;
        },
        handleCancelTs(formName) {
            this.FormVisibleTS = false;
        },
        handleCloseTs(done) {
            this.FormVisibleTS = false;
        },
        //点击关闭dialog
        handleClose(done) {
            this.FormVisible2 = false;
            this.FormVisibledc = false;
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
            this.FormVisible2 = false;
            this.FormVisibledc = false;
            this.FormVisibledr = false;
            this.FormVisibleck = false;
            this.FormVisibledel = false;
            this.FormVisibleSend = false;
            this.FormVisibleAlldel = false;
            this.FormVisibleTS = false;
            this.FormVisibleAllSh = false;
            this.FormVisibleCompare = false;
        },
        cancel: function (index, row) {
            this.FormVisibledr = true;
            this.Form = Object.assign({}, row);
            _index = index;
            console.log(index);
            console.log(_index);

            this.dialogStatus = "daochuEquipment"
            this.DcBtnshow = true
        },
        //推送
        handleFasong(index, row) {
            this.FormVisibleSend = true;
            this.Form = Object.assign({}, row);
            _index = index;
        },
        //（2）温升速率过大模型
        // drawLine1() {
        //     let myChart = this.$echarts.init(this.$refs.dyBox1);
        //     myChart.setOption({
        //         color: ['#2763B7', '#50BBFF'],
        //         title: {
        //             text: ''
        //         },
        //         tooltip: {
        //             trigger: 'item',
        //             formatter: "{a} <br/>{b} : {c}（℃）"
        //         },
        //         grid: {
        //             top: '23%',
        //             left: '9%',
        //             right: '4%',
        //             bottom: '15%',
        //             containLabel: true
        //         },
        //         legend: {
        //             top: 20,
        //             itemWidth: 24,
        //             itemHeight: 10,
        //             right: "3%", data: ['最高温度', '最低温度']
        //         },
        //         calculable: true,
        //         xAxis: [
        //             {
        //                 type: 'category',
        //                 axisLabel: { //坐标轴刻度标签的相关设置。
        //                     show: true,
        //                     interval: 0,
        //                     color: '#3E526F',
        //                 },
        //                 axisLine: { //是否显示坐标轴轴线。
        //                     lineStyle: {
        //                         color: "#A7C6E0"
        //                     }
        //                 },
        //                 axisTick: { //坐标轴刻度相关设置。
        //                     show: false, //是否显示坐标轴刻度。
        //                 },
        //                 data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        //             }
        //         ],
        //         yAxis: [
        //             {
        //                 type: 'value',
        //                 min: 0,
        //                 name: "温度差（℃）",
        //                 nameLocation: "center",
        //                 nameGap: 50,
        //                 nameTextStyle: {
        //                     fontSize: '14',
        //                     color: '#3E526F',
        //                     fontWeight: '400'
        //                 },
        //                 //默认以千分位显示，不想用的可以在这加一段
        //                 axisLabel: {   //调整左侧Y轴刻度， 直接按对应数据显示
        //                     show: true,
        //                     interval: 0, //0 强制显示所有标签。
        //                     color: '#3E526F',
        //                     showMinLabel: true,
        //                     showMaxLabel: true,
        //                     formatter: function (value) {
        //                         return value;
        //                     }
        //                 },
        //                 splitLine: { //坐标轴在 grid 区域中的分隔线。
        //                     show: true,
        //                     lineStyle: {
        //                         color: "#A7C6E0",
        //                         //type: "dashed"
        //                     }
        //                 },
        //                 axisLine: {
        //                     lineStyle: {
        //                         color: "#A7C6E0"
        //                     }
        //                 },
        //                 axisTick: { //坐标轴刻度相关设置。
        //                     show: false,
        //                 },

        //             },
        //             {
        //                 type: 'value',
        //                 name: "温度差（℃）",
        //                 nameLocation: "center",
        //                 nameGap: 35,
        //                 nameRotate: 0,
        //                 nameTextStyle: {
        //                     fontSize: 16,
        //                 },
        //                 //默认以千分位显示，不想用的可以在这加一段
        //                 axisLabel: {   //调整左侧Y轴刻度， 直接按对应数据显示
        //                     show: true,
        //                     interval: 0, //0 强制显示所有标签。
        //                     color: '#3E526F',
        //                     showMinLabel: true,
        //                     showMaxLabel: true,
        //                     formatter: function (value) {
        //                         return value;
        //                     }
        //                 },
        //                 splitLine: { //坐标轴在 grid 区域中的分隔线。
        //                     show: true,
        //                     lineStyle: {
        //                         color: "#A7C6E0",
        //                         //type: "dashed"
        //                     }
        //                 },
        //                 axisLine: {
        //                     lineStyle: {
        //                         color: "#A7C6E0"
        //                     }
        //                 },
        //                 axisTick: { //坐标轴刻度相关设置。
        //                     show: false,
        //                 },
        //             }
        //         ],
        //         dataZoom: [{//组件 用于区域缩放
        //             show: true,
        //             height: 4,
        //             xAxisIndex: [0],// 表示这个 dataZoom 组件控制第一个xAxis
        //             bottom: '5%',
        //             start: 20,//数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
        //             end: 80,//数据窗口范围的结束百分比。范围是：0 ~ 100。
        //             handleSize: 20,
        //             handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
        //             //handleSize: '110%',
        //             handleStyle: {
        //                 color: "transparent",
        //             },
        //             textStyle: {
        //                 color: "transparent"
        //             },
        //             borderColor: 'transparent',
        //             backgroundColor: '#EEEFF3',
        //             dataBackground: {
        //                 lineStyle: {
        //                     width: 0
        //                 },
        //                 areaStyle: {
        //                     color: 'transparent'
        //                 }
        //             },
        //             fillerColor: '#C3C6D1',
        //         }, {
        //             type: "inside",
        //             show: true,
        //             // start: 1,
        //             // end: 35,
        //             // zoomOnMouseWheel: false, //如何触发缩放。可选值为：
        //             // moveOnMouseMove: true,//如何触发数据窗口平移。可选值为：  
        //             // moveOnMouseWheel: true,//如何触发数据窗口平移。可选值为：
        //             // preventDefaultMouseMove: true//是否阻止 mousemove 事件的默认行为。
        //         }],
        // series: [
        //     {
        //         name: '最高温度',
        //         type: 'line',
        //         smooth: true,
        //         yAxisIndex: 0,
        //         data: [35, 15, 8, 12, 11, 6, 3, 0, 0, 0, 0, 0],
        //         itemStyle: { normal: { label: { show: true } } },
        //     },
        //     {
        //         name: '最低温度',
        //         type: 'line',
        //         smooth: true,
        //         yAxisIndex: 1,
        //         data: [16, 16, 6, 5, 4, 4, 3, 0, 0, 0, 0, 0],
        //         itemStyle: { normal: { label: { show: true } } },
        //     }
        // ]
        //     });
        //     window.addEventListener("resize", function () {
        //         myChart.resize();
        //     });
        // },
        open() {
            this.$nextTick(() => {
                // this.drawLine1();//折线图普通
                this.drawLine2();//单折线图
                this.drawLine3();
                this.drawLine6();
            })
        }

    },
    created() {
        // this.getDataList();//列表
    },
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 1400px) {
    /deep/.el-input {
        width: 155px;
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
    width: 60px;
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
.filIn {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    width: 85%;
}
.listCon {
    margin: 5px 0 20px 0;
    padding: 10px 15px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
}
.btns {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 12px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
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
    margin: 20px auto;
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
.choseBtnold {
    position: absolute;
    z-index: 10;
    opacity: 0;
    right: 0;
    width: 65px;
}
.choseBtn {
    float: left;
    width: 65px;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    text-align: center;
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    cursor: pointer;
    position: relative;
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
//测试
// /deep/.el-form-item::after,
// .el-form-item::before {
//     display: inline !important;
// }

// /deep/.el-form-item::after,
// .el-form-item::before {
//     display: inline !important;
// }
// /deep/.el-form-item__content::after,
// .el-form-item__content::before {
//     display: inline !important;
// }
// /deep/.el-form-item__content::after,
// .el-form-item__content::before {
//     display: inline !important;
// }
// /deep/.el-form-item__content::after,
// .el-form-item__content::before {
//     display: inline !important;
// }

.el-table__header {
    width: 100% !important;
}
.el-table__body {
    width: 100% !important;
}
.zhenduan {
    // /deep/.el-input__inner {
    //     -webkit-appearance: none;
    //     background-color: #fff;
    //     background-image: none;
    //     border-radius: 4px;
    //     border: 1px solid #a8c6df;
    //     -webkit-box-sizing: border-box;
    //     box-sizing: border-box;
    //     color: #606266;
    //     display: inline-block;
    //     font-size: inherit;
    //     height: 32px;
    //     line-height: 32px;
    //     outline: 0;
    //     padding: 0 15px;
    //     -webkit-transition: border-color 0.2s
    //         cubic-bezier(0.645, 0.045, 0.355, 1);
    //     transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    //     width: 100%;
    // }
}
.shmiaoshu {
    /deep/.el-textarea__inner {
        display: block;
        resize: vertical;
        padding: 5px 15px;
        line-height: 1.5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        font-size: inherit;
        color: #606266;
        background-color: #fff;
        background-image: none;
        border: 1px solid #a8c6df;
        border-radius: 4px;
        -webkit-transition: border-color 0.2s
            cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
}
</style>