<template>
  <div class="wrap">
    <toph v-bind:active="active"
          class="nav"></toph>
    <div class="main">
      <div class="title">历史溯源</div>
      <div class="search-box">
        <el-form :inline="true"
                 :model="formData"
                 class="form-box">
          <el-form-item label="车型">
            <v-selectpage :data="carOptions"
                          v-model="formData.carType"
                          sort="name"
                          placeholder='请选择一个车型'
                          style="width:183.5px;">
            </v-selectpage>
            <!-- <el-select v-model="formData.carType"
                       placeholder="请选择"
                       size="small">
              <el-option label="北汽新能源EX360"
                         value="0"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="车辆VIN">
            <v-selectpage :data="carList"
                          v-model="formData.carVIN"
                          sort="name"
                          placeholder='请选择一个车型'
                          style="width:183.5px;">
            </v-selectpage>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="handleSearch"
                       size="small">搜索</el-button>
            <el-button @click="handleReset"
                       size="small">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-box">
        <el-tabs class="tabs-box"
                 v-model="activeName">
          <el-tab-pane label="充电记录">
            <HistoricalTable :tableData="tableData1"
                             v-if="activeName == 0"></HistoricalTable>
            <div class="pagingtion-box"
                 style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
              <el-pagination @size-change="handleSizeChange1"
                             @current-change="handleCurrentChange1"
                             :current-page="currentPage1"
                             :page-sizes="[10, 20, 30, 40]"
                             :page-size="pageSize1"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total1">
              </el-pagination>
              <el-button size="small"
                         type="primary"
                         style="margin-left: 20px;"
                         @click="handleCurrentChange1">确定</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="故障记录">
            <HistoricalTable :tableData="tableData2"
                             v-if="activeName == 1"></HistoricalTable>
            <div class="pagingtion-box"
                 style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
              <el-pagination @size-change="handleSizeChange2"
                             @current-change="handleCurrentChange2"
                             :current-page="currentPage2"
                             :page-sizes="[10, 20, 30, 40]"
                             :page-size="pageSize2"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total2">
              </el-pagination>
              <el-button size="small"
                         type="primary"
                         style="margin-left: 20px;"
                         @click="handleCurrentChange2">确定</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="预警记录">
            <HistoricalTable :tableData="tableData3"
                             v-if="activeName == 2"></HistoricalTable>
            <div class="pagingtion-box"
                 style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
              <el-pagination @size-change="handleSizeChange3"
                             @current-change="handleCurrentChange3"
                             :current-page="currentPage3"
                             :page-sizes="[10, 20, 30, 40]"
                             :page-size="pageSize3"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total3">
              </el-pagination>
              <el-button size="small"
                         type="primary"
                         style="margin-left: 20px;"
                         @click="handleCurrentChange3">确定</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="维修记录">
            <HistoricalTable :tableData="tableData4"
                             v-if="activeName == 3"></HistoricalTable>
            <div class="pagingtion-box"
                 style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
              <el-pagination @size-change="handleSizeChange4"
                             @current-change="handleCurrentChange4"
                             :current-page="currentPage4"
                             :page-sizes="[10, 20, 30, 40]"
                             :page-size="pageSize4"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total4">
              </el-pagination>
              <el-button size="small"
                         type="primary"
                         style="margin-left: 20px;"
                         @click="handleCurrentChange4">确定</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="行程记录">
            <HistoricalTable :tableData="tableData5"
                             v-if="activeName == 4"></HistoricalTable>
            <div class="pagingtion-box"
                 style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
              <el-pagination @size-change="handleSizeChange5"
                             @current-change="handleCurrentChange5"
                             :current-page="currentPage5"
                             :page-sizes="[1, 20, 30, 40]"
                             :page-size="pageSize5"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="total5">
              </el-pagination>
              <el-button size="small"
                         type="primary"
                         style="margin-left: 20px;"
                         @click="handleCurrentChange5">确定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import HistoricalTable from '@/components/HistoricalTable'
import { SelectPage } from 'v-selectpage'
import { getWarningInforInit, getWarningInforStatistics } from "@/api/failureTable";
import { getDrivingRecordPage, getChargeRecordPage, getFailurePage, getWarningInfoEOPage, getMaintainEOPage } from "@/api/historical";
export default {
  data () {
    return {
      carList: [],
      carOptions: [],
      active: 5,
      activeName: '0',
      formData: {
        carType: '',
        carNumber: '',
        carVIN: ''
      },
      pageNo1: 0,
      total1: 0,
      currentPage1: 1,
      pageSize1: 10,
      total2: 0,
      pageNo2: 0,
      currentPage2: 1,
      pageSize2: 5,
      total3: 0,
      pageNo3: 0,
      currentPage3: 1,
      pageSize3: 5,
      total4: 0,
      pageNo4: 0,
      currentPage4: 1,
      pageSize4: 5,
      total5: 0,
      pageNo5: 0,
      currentPage5: 1,
      pageSize5: 5,
      // 一下四个数据需要接口动态获取后得到动态值发送子组件中
      tableData1: {
        thead: [],
        tbody: [],
        firstTdData: ['北汽新能源EX360', '车牌号京A88888', 'VIN: WBAZV4109BL817920'],
        type: 0
      },
      tableData2: {
        thead: ['电池所在设备', '报警类型', '报警时间', '持续时长', '操作'],
        tbody: [],
        firstTdData: ['北汽新能源EX360', '车牌号京A88888', 'VIN: WBAZV4109BL817920'],
        type: 1
      },
      tableData3: {
        thead: ['电池所在设备', '预警风险等级', '预警名称', '预警状态', '操作'],
        tbody: [],
        firstTdData: ['北汽新能源EX360', '车牌号京A88888', 'VIN: WBAZV4109BL817920'],
        type: 2
      },
      tableData4: {
        thead: [],
        tbody: [],
        firstTdData: ['北汽新能源EX360', '车牌号京A88888', 'VIN: WBAZV4109BL817920'],
        type: 3
      },
      tableData5: {
      }
      // -------------------
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 临时初始化
    init () {
      this.carList = []
      this.carOptions = []
      // 初始化车型、车辆VIN
      getWarningInforInit().then(response => (
        response.data.data[3].forEach((e, index) => {
          let data = {
            id: e,
            name: e
          }
          this.carList.push(data)
        }),
        response.data.data[2].forEach((e, index) => {
          let data = {
            id: e,
            name: e
          }
          this.carOptions.push(data)
        })
      ))
        .catch(function(error) { // 请求失败处理
        })
      // -------------------------end------------------
      // 初始化充电记录列表(完成)
      getChargeRecordPage({
        pageNo: this.pageNo1,
        pageSize: this.pageSize1
      }).then(res => {
        this.total1 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '充电开始时间', '充电开始SOC/%', '充电结束时间', '充电结束SOC/%', '充电电量Ah', '操作'],
          tbody: [],
          firstTdData: [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin],
          type: 0,
          imageData: []
        }
        res.data.data.list.forEach(function(e) {
          let dataTbody = [
            e.chargeStartTime,
            e.chargeStartSoc,
            e.chargeEndTime,
            e.chargeEndSoc,
            e.chargeElectricity,
          ]
          let imageData1 = [
            e.maxVolCellNumFrequency,
            e.minVolCellNumFrequency,
          ]
          data.tbody.push(dataTbody)
          data.imageData.push(imageData1)
        })
        this.tableData1 = data
      })
      // ----------------------end-------------------
      // 初始化故障记录列表（完成）
      getFailurePage({
        pageNo: this.pageNo2,
        pageSize: this.pageSize2
      }).then(res => {
        this.total2 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '故障类型', '报警时间', '持续时长(S)', '操作'],
          tbody: [],
          firstTdData: [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin],
          type: 1,
          imageData: []
        }
        res.data.data.list.forEach(function(e) {
          let dataTbody = [
            e.failureType,
            e.failureStartTime,
            e.duration
          ]
          let imageData1 = [
            e.maxCellVoltageNumList,
            e.maxProbeTemperatureNumList,
          ]
          data.tbody.push(dataTbody)
          data.imageData.push(imageData1)
        })
        this.tableData2 = data
      })
      // ----------------------end-------------------
      // 初始化预警记录列表
      getWarningInfoEOPage({
        pageNo: this.pageNo3,
        // pageSize: this.pageSize3
        pageSize: 100
      }).then(res => {
        // 添加动态数据
        this.total2 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '预警风险等级', '预警名称', '预警状态', '操作'],
          tbody: [],
          firstTdData: [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin],
          type: 2
        }
        res.data.data.list.forEach(function(e) {
          let time = e.failureEndTime - e.failureStartTime//
          let dataTbody = [
            e.riskLevel,//预警风险等
            e.batteryType,//预警名称
            e.reviewStatus,//预警状态
          ]
          data.tbody.push(dataTbody)
        })
        this.tableData3 = data
      })
      // ----------------------end-------------------
      // 初始化维修记录列表（完成）
      getMaintainEOPage({
        pageNo: this.pageNo4,
        // pageSize: this.pageSize4
        pageSize: 100

      }).then(res => {
        this.total4 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '故障描述', '维修时间', '维修方式'],
          tbody: [],
          firstTdData: [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin],//返回数据没有车牌车型
          type: 3
        }
        res.data.data.list.forEach(function(e) {
          let dataTbody = [
            e.failureDescribe,//故障描述
            e.maintainTime,//维修时间
            e.solution,//维修方式         
          ]
          data.tbody.push(dataTbody)
        })
        this.tableData4 = data
      })
      // ----------------------end-------------------
      // 初始化充电记录列表
      getDrivingRecordPage({
        pageNo: this.pageNo5,
        pageSize: this.pageSize5
      }).then(res => {
        this.total5 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '里程', '开始时间', '结束时间', '时长', '平均车速', '能耗', '操作'],
          tbody: [],
          firstTdData: [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin],
          type: 4,
        }
        res.data.data.list.forEach(function(e) {
          let dataTbody = [
            e.totalOdo,//里程
            e.startTime,//开始时间
            e.endTime,//结束时间
            e.duration,//期间
            e.avgSpeed,//车速
            e.totalConsumption
          ]
          data.tbody.push(dataTbody)
        })
        this.tableData5 = data
      })
      // ----------------------end-------------------
    },
    // ---------------end------------
    handleSearch () {
      getChargeRecordPage({
        pageNo: this.pageNo1,
        pageSize: this.pageSize1,
        vehicleType: this.formData.carType,
        vin: this.formData.carVIN
      }).then(res => {
        let firstTdData = []
        if (res.data.data.list == '') {
          firstTdData = []
        } else {
          firstTdData = [
            res.data.data.list[0].vehicleType,
            res.data.data.list[0].licensePlate,
            res.data.data.list[0].vin
          ]
        }
        this.total1 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '充电开始时间', '充电开始SOC/%', '充电结束时间', '充电结束SOC/%', '充电电量Ah', '操作'],
          tbody: [],
          firstTdData: firstTdData,
          type: 0,
          imageData: []
        }
        res.data.data.list.forEach(function(e) {
          let dataTbody = [
            e.chargeStartTime,
            e.chargeStartSoc,
            e.chargeEndTime,
            e.chargeEndSoc,
            e.chargeElectricity,
          ]
          let imageData1 = [
            e.maxVolCellNumFrequency,
            e.minVolCellNumFrequency,
          ]
          data.imageData.push(imageData1)
          data.tbody.push(dataTbody)
        })
        this.tableData1 = data
      })
      // ----------------------end-------------------
      // 初始化故障记录列表（完成）
      getFailurePage({
        pageNo: this.pageNo2,
        pageSize: this.pageSize2,
        vehicleType: this.formData.carType,
        vin: this.formData.carVIN
      }).then(res => {
        let firstTdData = []
        if (res.data.data.list == '') {
          firstTdData = []
        } else {
          firstTdData = [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin]
        }
        this.total2 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '故障类型', '报警时间', '持续时长', '操作'],
          tbody: [],
          firstTdData: firstTdData,
          type: 0,
          imageData: []
        }
        res.data.data.list.forEach(function(e) {
          let time = e.failureEndTime - e.failureStartTime//
          let dataTbody = [
            e.failureType,
            e.failureStartTime,
            time
          ]
          let imageData1 = [
            e.maxCellVoltageNumList,
            e.maxProbeTemperatureNumList,
          ]
          data.tbody.push(dataTbody)
          data.imageData.push(imageData1)
        })
        this.tableData2 = data
      })
      // ----------------------end-------------------
      // 初始化预警记录列表
      getWarningInfoEOPage({
        pageNo: this.pageNo3,
        pageSize: this.pageSize3,
        vehicleType: this.formData.carType,
        vin: this.formData.carVIN
      }).then(res => {
        let firstTdData = []
        if (res.data.data.list == '') {
          firstTdData = []
        } else {
          firstTdData = [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin]
        }
        // 添加动态数据
        this.total2 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '预警风险等级', '预警名称', '预警状态', '操作'],
          tbody: [],
          firstTdData: firstTdData,
          type: 0
        }
        res.data.data.list.forEach(function(e) {
          let time = e.failureEndTime - e.failureStartTime//
          let dataTbody = [
            e.riskLevel,//预警风险等
            e.batteryType,//预警名称
            e.reviewStatus,//预警状态
          ]
          data.tbody.push(dataTbody)
        })
        this.tableData3 = data
      })
      // ----------------------end-------------------
      // 初始化维修记录列表（完成）
      getMaintainEOPage({
        pageNo: this.pageNo4,
        pageSize: this.pageSize4,
        vehicleType: this.formData.carType,
        vin: this.formData.carVIN

      }).then(res => {
        let firstTdData = []
        if (res.data.data.list == '') {
          firstTdData = []
        } else {
          firstTdData = [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin]
        }
        this.total4 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '故障描述', '维修时间', '维修方式', '操作'],
          tbody: [],
          firstTdData: firstTdData,//返回数据没有车牌车型
          type: 4
        }
        res.data.data.list.forEach(function(e) {
          let dataTbody = [
            e.failureDescribe,//故障描述
            e.maintainTime,//维修时间
            e.solution,//维修方式         
          ]
          data.tbody.push(dataTbody)
        })
        this.tableData4 = data
      })
      // ----------------------end-------------------
      // 初始化充电记录列表
      getDrivingRecordPage({
        pageNo: this.pageNo5,
        pageSize: this.pageSize5,
        vehicleType: this.formData.carType,
        vin: this.formData.carVIN
      }).then(res => {
        let firstTdData = []
        if (res.data.data.list == '') {
          firstTdData = []
        } else {
          firstTdData = [res.data.data.list[0].vehicleType, res.data.data.list[0].licensePlate,
          res.data.data.list[0].vin]
        }
        this.total5 = res.data.data.count
        // 添加动态数据
        let data = {
          thead: ['电池所在设备', '里程', '开始时间', '结束时间', '时长', '平均车速', '能耗', '操作'],
          tbody: [],
          firstTdData: firstTdData,
          type: 4
        }
        res.data.data.list.forEach(function(e) {
          let dataTbody = [
            e.totalOdo,//里程
            e.startTime,//开始时间
            e.endTime,//结束时间
            e.duration,//期间
            e.avgSpeed,//车速
            e.totalConsumption
          ]
          data.tbody.push(dataTbody)
        })
        this.tableData5 = data
      })
    },
    handleReset () {
      this.formData = {
        carType: '',
        carNumber: '',
        carVIN: ''
      }
      this.pageNo1 = 0,
        this.pageNo2 = 0,
        this.pageNo3 = 0,
        this.pageNo4 = 0,
        this.pageNo5 = 0,
        this.pageSize1 = 10,
        this.pageSize2 = 10,
        this.pageSize3 = 10,
        this.pageSize4 = 10,
        this.pageSize5 = 10,

        this.init()
    },
    handleCurrentChange1 (val) {
      this.pageNo1 = val
      this.init()
      // if (val == 1) {
      //   this.tableData1.tbody = [
      //     ['2019/6/20 12:06:00', 40, '2019/6/20 14:06:00', 98, 93],
      //     ['2019/6/19 12:56:00', 45, '2019/6/19 14:00:00', 79, 93],
      //     ['2019/6/18 12:46:00', 43, '2019/6/18 14:35:00', 100, 94],
      //     ['2019/6/17 12:36:00', 25, '2019/6/17 15:36:00', 96, 95],
      //     ['2019/6/15 12:26:00', 42, '2019/6/15 15:03:00', 75, 93],
      //     ['2019/6/14 12:16:00', 40, '2019/6/14 15:10:00', 95, 94],
      //     ['2019/6/13 12:06:00', 45, '2019/6/13 13:58:00', 98, 91],
      //     ['2019/6/12 11:56:00', 25, '2019/6/12 15:28:00', 98, 90],
      //     ['2019/6/10 11:46:00', 35, '2019/6/10 13:53:00', 100, 85],
      //   ]
      // } else if (val == 2) {
      //   this.tableData1.tbody = [
      //     ['2019/6/8 11:36:00', 25, '2019/6/8 15:07:00', 85, 99],
      //     ['2019/6/7 11:26:00', 38, '2019/6/7 14:32:00', 80, 98],
      //     ['2019/6/6 11:16:00', 45, '2019/6/6 13:25:00', 100, 96],
      //     ['2019/6/5 11:06:00', 35, '2019/6/5 15:00:00', 89, 92],
      //   ]
      // }
    },
    handleSizeChange1 (val) {
      this.pageSize1 = val
      this.init()
      // if (val == 10) {
      //   this.tableData1.tbody = [
      //     ['2019/6/20 12:06:00', 40, '2019/6/20 14:06:00', 98, 93],
      //     ['2019/6/19 12:56:00', 45, '2019/6/19 14:00:00', 79, 93],
      //     ['2019/6/18 12:46:00', 43, '2019/6/18 14:35:00', 100, 94],
      //     ['2019/6/17 12:36:00', 25, '2019/6/17 15:36:00', 96, 95],
      //     ['2019/6/15 12:26:00', 42, '2019/6/15 15:03:00', 75, 93],
      //     ['2019/6/14 12:16:00', 40, '2019/6/14 15:10:00', 95, 94],
      //     ['2019/6/13 12:06:00', 45, '2019/6/13 13:58:00', 98, 91],
      //     ['2019/6/12 11:56:00', 25, '2019/6/12 15:28:00', 98, 90],
      //     ['2019/6/10 11:46:00', 35, '2019/6/10 13:53:00', 100, 85],
      //   ]
      // } else {
      //   this.tableData1.tbody = [
      //     ['2019/6/20 12:06:00', 40, '2019/6/20 14:06:00', 98, 93],
      //     ['2019/6/19 12:56:00', 45, '2019/6/19 14:00:00', 79, 93],
      //     ['2019/6/18 12:46:00', 43, '2019/6/18 14:35:00', 100, 94],
      //     ['2019/6/17 12:36:00', 25, '2019/6/17 15:36:00', 96, 95],
      //     ['2019/6/15 12:26:00', 42, '2019/6/15 15:03:00', 75, 93],
      //     ['2019/6/14 12:16:00', 40, '2019/6/14 15:10:00', 95, 94],
      //     ['2019/6/13 12:06:00', 45, '2019/6/13 13:58:00', 98, 91],
      //     ['2019/6/12 11:56:00', 25, '2019/6/12 15:28:00', 98, 90],
      //     ['2019/6/10 11:46:00', 35, '2019/6/10 13:53:00', 100, 85],
      //     ['2019/6/8 11:36:00', 25, '2019/6/8 15:07:00', 85, 99],
      //     ['2019/6/7 11:26:00', 38, '2019/6/7 14:32:00', 80, 98],
      //     ['2019/6/6 11:16:00', 45, '2019/6/6 13:25:00', 100, 96],
      //     ['2019/6/5 11:06:00', 35, '2019/6/5 15:00:00', 89, 92],
      //   ]
      // }
    },
    handleCurrentChange2 (val) {
      this.pageNo2 = val
      this.init()
    },
    handleSizeChange2 (val) {
      this.pageSize2 = val
      this.init()
    },
    handleCurrentChange3 (val) {
      this.pageNo3 = val
      this.init()
    },
    handleSizeChange3 (val) {
      this.pageSize3 = val
      this.init()
    },
    handleCurrentChange4 (val) {
      this.pageNo4 = val
      this.init()
    },
    handleSizeChange4 (val) {
      this.pageSize4 = val
      this.init()
    },
    handleCurrentChange5 (val) {
      this.pageNo5 = val
      this.init()
    },
    handleSizeChange5 (val) {
      this.pageSize5 = val
      this.init()

    },
  },
  components: {
    toph,
    HistoricalTable,
    SelectPage
  }
}
</script>
<style scoped>
.table {
  width: 100%;
}
.table thead tr {
  background: #fafafa;
  color: #7791a7;
  font-size: 14px;
  height: 50px;
}
.table thead tr th {
  font-weight: 600;
  border-bottom: 2px solid #e7ebf2;
}
.table tbody tr td {
  text-align: center;
  border-bottom: 1px solid #f1f6f9;
  height: 44px;
  color: #3f536e;
}

/deep/div.v-selectpage div.sp-input-container span.sp-placeholder {
  color: #c0c4cc;
}
/deep/div.v-dropdown-caller.v-dropdown-caller--full-width {
  display: inherit;
  width: 183.5px;
}
/deep/.el-select__tags {
  flex-wrap: inherit;
  overflow: hidden;
}
/deep/.form-box .el-form-item__label {
  color: #3e526f;
}
/deep/.search-box .el-form-item {
  margin-bottom: 0;
}
.tabs-box {
  margin-top: 10px;
  background: #fff;
}
/deep/.tabs-box .el-tabs__nav-wrap::after {
  display: none;
}
/deep/.tabs-box .el-tabs__active-bar {
  display: none;
}
/deep/.tabs-box .el-tabs__item {
  color: #7791a7;
}
/deep/.tabs-box .is-active {
  background: #fff;
  color: #239fff;
}
/deep/.tabs-box .el-tabs__header {
  background: #f7f7f7;
  margin-bottom: 0;
}
/deep/.tabs-box .el-tabs__content {
  padding: 10px 15px;
}
/deep/.tabs-box .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
}
/deep/.tabs-box .el-tabs__item.is-top:last-child {
  padding-right: 20px;
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
/deep/.pagingtion-box .el-input__inner {
  font-size: 14px;
  color: #606266;
}
/deep/.pagingtion-box .el-pager .number {
  font-size: 14px;
  color: #303133;
}
/deep/.pagingtion-box .el-pager .active {
  color: #409eff;
}
/deep/.header.nav .content .el-menu--horizontal > .el-menu-item.is-active {
  color: #fff !important;
  background: transparent !important;
}
.search-box {
  padding: 12px 15px;
  background: #fff;
  border-radius: 4px;
}
.wrap {
  min-width: 100%;
  min-height: 100%;
  background: #f4f7fc;
}
.title {
  font-size: 14px;
  padding: 10px 15px;
  color: #2b405b;
}
.main {
  padding: 0 10px 10px;
}
</style>