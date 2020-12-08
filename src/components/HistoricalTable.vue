<template>
  <div>
    <table :class="['table', tableData.type == 0 && 'table1']" cellspacing=0>
      <thead>
      <tr>
        <th v-for="th in tableData.thead" :key="th">{{ th }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(tr, trIdx) in tableData.tbody" :key="trIdx">
        <td v-if="trIdx == 0" :rowspan="tableData.tbody.length" style="border: 1px solid #F1F6F9; border-top: none;">
          <div>
            <p v-for="(text, pIdx) in tableData.firstTdData" :key="pIdx">{{ text }}</p>
          </div>
        </td>
        <td v-for="(td, tdIdx) in tr" :key="tdIdx">
          <img src="../assets/images/battery/oneFx.png" alt="" v-if="(tableData.type == 2) && (tdIdx == 0) && td == 1">
          <img src="../assets/images/battery/twoFx.png" alt=""
               v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 2">
          <img src="../assets/images/battery/threeFx.png" alt=""
               v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 3">
          <img src="../assets/images/battery/fourFx.png" alt=""
               v-else-if="(tableData.type == 2) && (tdIdx == 0) && td == 4">
          <span v-else> {{ td }}</span>
        </td>
        <td v-if="tableData.type != 3">
          <el-button type="text" @click="handleDetails(tableData.type, trIdx, tr[0],$event)">查看详情</el-button>
        </td>
      </tr>
      <tr v-if="tableData.tbody.length == 0">
        <td :colspan="tableData.thead.length" style="border: none;">
          <p style="text-align: center;">数据为空</p>
        </td>
      </tr>
      </tbody>
    </table>
    <el-dialog title="查看" :visible.sync="dialogVisible0" width="706px" :before-close="handleClose(0)"
               class="dialog-box">
      <div class="dialog-content">
        <div class="top-box">
          <el-row>
            <el-col :span="14">
              <b>电池所在设备</b>
              <!-- <span>北汽新能源EX360 车牌号京A88888</span> -->
              <span>{{tableData.firstTdData[0]}} {{tableData.firstTdData[1]}}</span>
            </el-col>
            <el-col :span="10">
              <b>VIN</b>
              <span>{{tableData.firstTdData[2]}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>充电开始时间</b>
              <span>{{this.dialog.TiemStart}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>充电开始SOC</b>
              <span>{{this.dialog.start}}%</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>充电结束时间</b>
              <span>{{this.dialog.TiemEnd}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>充电结束SOC</b>
              <span>{{this.dialog.end}}%</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>充电电量</b>
              <span>{{this.dialog.AH}}Ah</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>充电方式</b>
              <span>快充</span>
            </el-col>
          </el-row>
        </div>
        <p style="color: #3E526F;">数据最后更新时间：{{this.dialog.TiemEnd}}</p>
        <!-- <p style="color: #3E526F; font-weight: bold; margin-bottom: 0;">最高电压/最低电压（V）</p> -->
        <div style="height: 200px; padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #E5EEF5;"
             ref="chart1"></div>
        <div style="display: flex; justify-content: space-between;">
          <div style="height: 200px; width: 48%;" ref="chart2"></div>
          <div style="height: 200px; width: 48%;" ref="chart3"></div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dialogVisible1" width="706px" :before-close="handleClose(1)"
               class="dialog-box">
      <div class="dialog-content">
        <div class="top-box">
          <el-row>
            <el-col :span="14">
              <b>电池所在设备</b>
              <span>{{tableData.firstTdData[0]}} {{tableData.firstTdData[1]}}</span>
            </el-col>
            <el-col :span="10">
              <b>VIN</b>
              <span>{{tableData.firstTdData[2]}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>报警类型</b>
              <span>{{this.dialog.TiemStart}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>报警时间</b>
              <span>{{this.dialog.start}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>持续时长</b>
              <span>{{this.dialog.TiemEnd}}</span>
            </el-col>
          </el-row>
        </div>
        <div style="height: 200px;" ref="chart4"></div>
        <!--        <p style="border-bottom: 1px solid #E5EEF5; padding: 0 8px 15px 0; font-size: 12px; color: #3E526F; text-align: right;">2019年</p>-->
        <div
          style="display: flex; justify-content: space-between;padding-top: 20px;margin-top: 20px;border-top: 1px solid #E5EEF5">
          <div style="height: 200px; width: 48%;" ref="chart5"></div>
          <div style="height: 200px; width: 48%;" ref="chart6"></div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dialogVisible2" width="80%" :before-close="handleClose(2)" class="dialog-box">
      <div class="dialog-content">
        <div class="top-box" style="margin-bottom: 0;border-bottom: 0;">
          <el-row>
            <el-col :span="8">
              <b>电池所在设备</b>
              <span>{{tableData.firstTdData[0]}} {{tableData.firstTdData[1]}}</span>
            </el-col>
            <el-col :span="16">
              <b>VIN</b>
              <span>{{tableData.firstTdData[2]}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>预警风险等级</b>
              <span>{{ RiskLevel }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>预警名称</b>
              <span>{{this.dialog.start}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>预警状态</b>
              <span>{{this.dialog.TiemEnd}}</span>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :span="15">
            <div style="height: 180px;" ref="chart7"></div>
            <p style="margin: 0; text-align: right; font-size: 12px; color: #3E526F;padding-right: 26px;">
              {{detailData3.time1}}</p>
            <div style="height: 180px;" ref="chart8"></div>
            <p style="margin: 0; text-align: right; font-size: 12px; color: #3E526F;padding-right: 26px;">
              {{detailData3.time2}}</p>
            <p
              style="margin: 0; text-align: right; font-size: 14px; color: #3F536E; margin-top: 15px; padding-right: 26px;">
              单体电压离散异常</p>
          </el-col>
          <el-col :span="9">
            <div style="height: 360px;" ref="chart9"></div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dialogVisible4" width="706px" :before-close="handleClose(3)"
               class="dialog-box">
      <div class="dialog-content">
        <div class="top-box">
          <el-row>
            <el-col :span="14">
              <b>电池所在设备</b>
              <span>{{tableData.firstTdData[0]}} {{tableData.firstTdData[1]}}</span>
            </el-col>
            <el-col :span="10">
              <b>VIN</b>
              <span>{{tableData.firstTdData[2]}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>里程</b>
              <span>{{this.dialog.TiemStart}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>时间</b>
              <span>{{this.dialog.start}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>时长</b>
              <span>{{this.dialog.TiemEnd}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <b>次数</b>
              <span>{{this.dialog.end}}</span>
            </el-col>
          </el-row>
        </div>
        <div style="display: flex;">
          <div style="margin-right: 15px; display: flex; align-items: center;">
            <b style="font-size: 14px; color: #3F536E; margin-right: 5px;">数据类型1</b>
            <el-select v-model="timeType1" placeholder="请选择" size="small">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="display: flex; align-items: center;">
            <b style="font-size: 14px; color: #3F536E; margin-right:5px;">数据类型2</b>
            <el-select v-model="timeType2" placeholder="请选择" size="small">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div style="height: 200px;" ref="chart10"></div>
        <p
          style="margin: 0; text-align: right; font-size: 12px; color: #3E526F; padding: 0px 22px 15px 0; border-bottom: 1px solid #E5EEF5; margin-bottom: 15px;">
          {{detailData4.time1}}</p>
        <!-- <div style="display: flex; justify-content: space-between;">
          <div style="height: 200px; width: 48%;"
               ref="chart11"></div>
          <div style="height: 200px; width: 48%;"
               ref="chart12"></div>
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getChargeRecordVOByID, getFailureVOByID, getDetailById} from "@/api/historical";
import {getHistoricalVehicleData} from "@/api/pack"
import {getFrequencyData} from "@/api/pack"

export default {
  data() {
    return {
      ceilingVoltage: [],
      maximumTemperature: [],
      averageCellVoltages: [],
      differenceCellVoltage: [],
      differenceCellVoltageV: [],
      itineraryRecord1: [],
      itineraryRecord2: [],
      faultDiagramData: [],
      detailData1: {
        series: [],
        minArr: [],
        xDataArr: [],
        barData1: [],
        barX1: [],
        barData2: [],
        barX2: []
      },
      detailData2: {
        series: [],
        xDataArr: [],
        barData1: [],
        barX1: [],
        barData2: [],
        barX2: []
      },
      detailData3: {
        series: [],
        xDataArr: [],
        time1: '',
        time2: '',
        line1X: [],
        line1Data: []
      },
      detailData4: {
        seriesData1: [],
        seriesData2: [],
        xDataArr: [],
        time1: '',
        title1: '',
        title2: ''
      },
      dialogVisible0: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible4: false,
      RiskLevel: 1,
      options1: [
        {
          value: '1',
          label: '总电压'
        },
        {
          value: '2',
          label: '总电流'
        },
        {
          value: '3',
          label: 'SOC'
        },
        {
          value: '4',
          label: '绝缘电阻'
        },
        {
          value: '5',
          label: '车速'
        },
        {
          value: '6',
          label: '行驶里程'
        },
        {
          value: '7',
          label: '充电状态'
        },
        {
          value: '8',
          label: '行驶状态'
        },
        {
          value: '9',
          label: '最高单体电压'
        },
        {
          value: '10',
          label: '最低单体电压'
        },
        {
          value: '11',
          label: '最高电压单体编号'
        },
        {
          value: '12',
          label: '最低电压单体编号'
        },
        {
          value: '13',
          label: '最高探针温度'
        },
        {
          value: '14',
          label: '最低探针温度'
        },
        {
          value: '15',
          label: '最高温度探针编号'
        },
        {
          value: '16',
          label: '最低温度探针编号'
        },
        {
          value: '17',
          label: '电芯电压'
        },
        {
          value: '18',
          label: '探针温度'
        },
      ],
      timeType1: '1',
      timeType2: '2',
      dialog: {
        TiemStart: "",
        start: "",
        TiemEnd: "",
        end: "",
        AH: ""
      }
    }
  },
  props: ['tableData'],
  watch: {
    timeType1: {
      handler(newVal, oldVal) {
        this.travelChartRecord()
      }
    },
    timeType2: {
      handler(newVal, oldVal) {
        this.travelChartRecord()
      }
    },
  },
  mounted() {
    // this.chargingRecord()
    // this.faultRecord()
    // this.getFrequencyDataF(1)
    // this.maximumTemperatureF(3)
    // this.warningRecord()
  },
  methods: {
    // 最高单体电压
    getFrequencyDataF(value) {
      let _this = this
      let params = {
        // endDateStr: '',
        // startDateStr: this.dialog.start,
        // vin: this.tableData.firstTdData[2],
        // vehicleType: this.tableData.firstTdData[0],
        // type: value
        // 测试假数据
        // endDateStr: '2020-09-29T23:00:00.000Z',
        // startDateStr: '2020-09-29T00:10:00.000Z',
        vin: "LGJE13EA8HM612688",
        vehicleType: 'ER005',
        type: value
      }
      this.ceilingVoltage = []
      getFrequencyData(params).then(res => {
        res.data.data.forEach(function (e) {
          _this.ceilingVoltage.push(e.count)

        })
        // _this.draw()
      })
    },
    // 最高单体温度
    maximumTemperatureF(value) {
      let _this = this
      let params = {
        // endDateStr: '',
        // startDateStr: this.dialog.start,
        // vin: this.tableData.firstTdData[2],
        // vehicleType: this.tableData.firstTdData[0],
        // type: value
        // 测试假数据
        // endDateStr: '2020-09-29T23:00:00.000Z',
        // startDateStr: '2020-09-29T00:10:00.000Z',
        vin: "LGJE13EA8HM612688",
        vehicleType: 'ER005',
        type: value
      }
      this.maximumTemperature = []
      getFrequencyData(params).then(res => {
        res.data.data.forEach(function (e) {
          _this.maximumTemperature.push(e.count)

        })
        // _this.draw()
      })
    },
    // 双Y轴充电记录数据接口(完)
    chargingRecord() {
      let params = {
        // 以下为测试数据
        // endDateStr: '2020-09-29T23:00:00.000Z',
        // vin: "LGJE13EA8HM612688",
        // startDateStr: '2020-09-29T00:10:00.000Z',
        // vehicleType: 'ER005',
        // ------------------end-----------------
        endDateStr: this.dialog.TiemEnd,
        startDateStr: this.dialog.TiemStart,
        vin: this.tableData.firstTdData[2],
        yAxis1: ['9', '10'],
        yAxis2: [],
        vehicleType: this.tableData.firstTdData[0],
      }
      getHistoricalVehicleData(params).then(res => {
        let arr = res.data.data.maxCellVoltage.categories
        let arrs = res.data.data.maxCellVoltage.value
        let minArr = res.data.data.minCellVoltage.categories
        let minArrs = res.data.data.minCellVoltage.value
        for (let j = 0; j < arr.length; j++) {
          let data = []
          data.push(arr[j])
          data.push(arrs[j])
          this.series.push(data)
        }
        for (let j = 0; j < minArr.length; j++) {
          let data = []
          data.push(arr[j])
          data.push(arrs[j])
          this.minArr.push(data)
        }
        this.draw()
      })
    },
    // 双Y轴故障记录数据接口
    faultRecord() {
      let params = {
        // endDateStr: '',
        // startDateStr: this.dialog.start,
        // vin: this.tableData.firstTdData[2],
        // yAxis1: ['4'],
        // yAxis2: [],
        // vehicleType: this.tableData.firstTdData[0],
        // 测试假数据
        endDateStr: '2018-05-14T16:02:10.000Z',
        // endDateStr: '',
        startDateStr: '2018-05-12T16:02:10.000Z',
        vin: "LGJE13EA8HM612688",
        yAxis1: ['4'],
        yAxis2: [],
        vehicleType: 'ER005',
      }
      getHistoricalVehicleData(params).then(res => {
        // 判断数据输出值对应的英文
        let arr = res.data.data.resistance.categories
        let arrs = res.data.data.resistance.value
        for (let j = 0; j < arr.length; j++) {
          let data = []
          data.push(arr[j])
          data.push(arrs[j])
          this.faultDiagramData.push(data)
        }
        this.draw()
      })
    },
    // 双Y轴预警记录数据接口
    warningRecord() {
      let params = {
        // 以下为测试数据
        endDateStr: '2020-09-29 21:03:06',
        vin: "LGJE13EA8HM612688",
        startDateStr: '2020-09-29 00:00:06',
        vehicleType: 'ER005',
        yAxis1: ['19', '15'],
        yAxis2: [],
        // ------------------end-----------------
        // endDateStr: this.dialog.TiemEnd,
        // startDateStr: this.dialog.TiemStart,
        // vin: this.tableData.firstTdData[2],
        // yAxis1: ['19', '15'],
        // yAxis2: [],
        // vehicleType: this.tableData.firstTdData[0],
      }
      getHistoricalVehicleData(params).then(res => {
        this.averageCellVoltages = res.data.data.averageCellVoltage.value
        this.differenceCellVoltageV = res.data.data.differenceCellVoltage.value
        let arr = res.data.data.differenceCellVoltage.value
        let arrs = res.data.data.differenceCellVoltage.categories
        for (let j = 0; j < arr.length; j++) {
          let data = [arrs[j], arr[j]]
          this.differenceCellVoltage.push(data)
        }
        this.draw()
      })
    },


    // 双Y轴行程记录数据接口
    travelChartRecord() {
      let params = {
        // endDateStr: this.dialog.TiemEnd,
        // startDateStr: this.dialog.TiemStart,
        // vin: this.tableData.firstTdData[2],
        // vehicleType: this.tableData.firstTdData[0],
        // yAxis1: [this.timeType1, this.timeType2],
        // yAxis2: [],
        // 测试假数据
        endDateStr: '2018-05-14T16:02:10.000Z',
        startDateStr: '2018-05-12T16:02:10.000Z',
        vin: "LGJE13EA8HM612678",
        yAxis1: [this.timeType1, this.timeType2],
        yAxis2: [],
        vehicleType: '',
      }
      getHistoricalVehicleData(params).then(res => {
        let arr
        let arrs
        let arr1
        let arrs1
        // 判断数据输出值对应的英文
        if (this.timeType2 == 1) {
          arr = res.data.data.totalVoltage.categories
          arrs = res.data.data.totalVoltage.value
        } else if (this.timeType2 == 3) {
          arr = res.data.data.soc.categories
          arrs = res.data.data.soc.value
        } else if (this.timeType2 == 4) {
          arr = res.data.data.resistance.categories
          arrs = res.data.data.resistance.value
        } else if (this.timeType2 == 5) {
          arr = res.data.data.speed.categories
          arrs = res.data.data.speed.value
        } else if (this.timeType2 == 6) {
          arr = res.data.data.odo.categories
          arrs = res.data.data.odo.value
        } else if (this.timeType2 == 7) {
          arr = res.data.data.chargeStatus.categories
          arrs = res.data.data.chargeStatus.value
        } else if (this.timeType2 == 8) {
          arr = res.data.data.startupStatus.categories
          arrs = res.data.data.startupStatus.value
        } else if (this.timeType2 == 9) {
          arr = res.data.data.maxCellVoltage.categories
          arrs = res.data.data.maxCellVoltage.value
        } else if (this.timeType2 == 10) {
          arr = res.data.data.minCellVoltage.categories
          arrs = res.data.data.minCellVoltage.value
        } else if (this.timeType2 == 11) {
          arr = res.data.data.maxProbeTemperature.categories
          arrs = res.data.data.maxProbeTemperature.value
        } else if (this.timeType2 == 12) {
          arr = res.data.data.minProbeTemperature.categories
          arrs = res.data.data.minProbeTemperature.value
        } else if (this.timeType2 == 13) {
          arr = res.data.data.cellVoltage.categories
          arrs = res.data.data.cellVoltage.value
        } else if (this.timeType2 == 14) {
          arr = res.data.data.probeTemperature.categories
          arrs = res.data.data.probeTemperature.value
        } else if (this.timeType2 == 15) {
          arr = res.data.data.differenceCellVoltage.categories
          arrs = res.data.data.differenceCellVoltage.value
        } else if (this.timeType2 == 16) {
          arr = res.data.data.differenceTemperature.categories
          arrs = res.data.data.differenceTemperature.value
        } else if (this.timeType2 == 17) {
          arr = res.data.data.temperatureRate.categories
          arrs = res.data.data.temperatureRate.value
        } else if (this.timeType2 == 18) {
          arr = res.data.data.atanMaxTemperatureRate.categories
          arrs = res.data.data.atanMaxTemperatureRate.value
        } else if (this.timeType2 == 19) {
          arr = res.data.data.averageCellVoltage.categories
          arrs = res.data.data.averageCellVoltage.value
        } else if (this.timeType2 == 20) {
          arr = res.data.data.averageProbeTemperature.categories
          arrs = res.data.data.averageProbeTemperature.value
        } else if (this.timeType2 == 21) {
          arr = res.data.data.varianceCellVoltage.categories
          arrs = res.data.data.varianceCellVoltage.value
        } else if (this.timeType2 == 22) {
          arr = res.data.data.varianceProbeTemperature.categories
          arrs = res.data.data.varianceProbeTemperature.value
        } else if (this.timeType2 == 23) {
          arr = res.data.data.entropy.categories
          arrs = res.data.data.entropy.value
        } else if (this.timeType2 == 24) {
          arr = res.data.data.variation.categories
          arrs = res.data.data.variation.value
        } else if (this.timeType2 == 25) {
          arr = res.data.data.wDifferenceCellVoltages.categories
          arrs = res.data.data.wDifferenceCellVoltages.value
        } else if (this.timeType2 == 26) {
          arr = res.data.data.wDifferenceTotalCellVoltage.categories
          arrs = res.data.data.wDifferenceTotalCellVoltage.value
        } else if (this.timeType2 == 27) {
          arr = res.data.data.instantaneousConsumption.categories
          arrs = res.data.data.instantaneousConsumption.value
        } else if (this.timeType2 == 28) {
          arr = res.data.data.atanMinTemperatureRate.categories
          arrs = res.data.data.atanMinTemperatureRate.value
        } else if (this.timeType2 == 2) {
          arr = res.data.data.totalCurrent.categories
          arrs = res.data.data.totalCurrent.value
        } else {
          arr = []
        }
        if (this.timeType1 == 1) {
          arr1 = res.data.data.totalVoltage.categories
          arrs1 = res.data.data.totalVoltage.value
        } else if (this.timeType1 == 3) {
          arr1 = res.data.data.soc.categories
          arrs1 = res.data.data.soc.value
        } else if (this.timeType1 == 4) {
          arr1 = res.data.data.resistance.categories
          arrs1 = res.data.data.resistance.value
        } else if (this.timeType1 == 5) {
          arr1 = res.data.data.speed.categories
          arrs1 = res.data.data.speed.value
        } else if (this.timeType1 == 6) {
          arr1 = res.data.data.odo.categories
          arrs1 = res.data.data.odo.value
        } else if (this.timeType1 == 7) {
          arr1 = res.data.data.chargeStatus.categories
          arrs1 = res.data.data.chargeStatus.value
        } else if (this.timeType1 == 8) {
          arr1 = res.data.data.startupStatus.categories
          arrs1 = res.data.data.startupStatus.value
        } else if (this.timeType1 == 9) {
          arr1 = res.data.data.maxCellVoltage.categories
          arrs1 = res.data.data.maxCellVoltage.value
        } else if (this.timeType1 == 10) {
          arr1 = res.data.data.minCellVoltage.categories
          arrs1 = res.data.data.minCellVoltage.value
        } else if (this.timeType1 == 11) {
          arr1 = res.data.data.maxProbeTemperature.categories
          arrs1 = res.data.data.maxProbeTemperature.value
        } else if (this.timeType1 == 12) {
          arr1 = res.data.data.minProbeTemperature.categories
          arrs1 = res.data.data.minProbeTemperature.value
        } else if (this.timeType1 == 13) {
          arr1 = res.data.data.cellVoltage.categories
          arrs1 = res.data.data.cellVoltage.value
        } else if (this.timeType1 == 14) {
          arr1 = res.data.data.probeTemperature.categories
          arrs1 = res.data.data.probeTemperature.value
        } else if (this.timeType1 == 15) {
          arr1 = res.data.data.differenceCellVoltage.categories
          arrs1 = res.data.data.differenceCellVoltage.value
        } else if (this.timeType1 == 16) {
          arr1 = res.data.data.differenceTemperature.categories
          arrs1 = res.data.data.differenceTemperature.value
        } else if (this.timeType1 == 17) {
          arr1 = res.data.data.temperatureRate.categories
          arrs1 = res.data.data.temperatureRate.value
        } else if (this.timeType2 == 18) {
          arr = res.data.data.atanMaxTemperatureRate.categories
          arrs = res.data.data.atanMaxTemperatureRate.value
        } else if (this.timeType1 == 19) {
          arr1 = res.data.data.averageCellVoltage.categories
          arrs1 = res.data.data.averageCellVoltage.value
        } else if (this.timeType1 == 20) {
          arr1 = res.data.data.averageProbeTemperature.categories
          arrs1 = res.data.data.averageProbeTemperature.value
        } else if (this.timeType1 == 21) {
          arr1 = res.data.data.varianceCellVoltage.categories
          arrs1 = res.data.data.varianceCellVoltage.value
        } else if (this.timeType1 == 22) {
          arr1 = res.data.data.varianceProbeTemperature.categories
          arrs1 = res.data.data.varianceProbeTemperature.value
        } else if (this.timeType1 == 23) {
          arr1 = res.data.data.entropy.categories
          arrs1 = res.data.data.entropy.value
        } else if (this.timeType1 == 24) {
          arr1 = res.data.data.variation.categories
          arrs1 = res.data.data.variation.value
        } else if (this.timeType1 == 25) {
          arr1 = res.data.data.wDifferenceCellVoltages.categories
          arrs1 = res.data.data.wDifferenceCellVoltages.value
        } else if (this.timeType1 == 26) {
          arr1 = res.data.data.wDifferenceTotalCellVoltage.categories
          arrs1 = res.data.data.wDifferenceTotalCellVoltage.value
        } else if (this.timeType1 == 27) {
          arr1 = res.data.data.instantaneousConsumption.categories
          arrs1 = res.data.data.instantaneousConsumption.value
        } else if (this.timeType1 == 28) {
          arr1 = res.data.data.atanMinTemperatureRate.categories
          arrs1 = res.data.data.atanMinTemperatureRate.value
        } else if (this.timeType1 == 2) {
          arr1 = res.data.data.totalCurrent.categories
          arrs1 = res.data.data.totalCurrent.value
        } else {
          arr1 = []
        }
        //轴1数据处理
        this.detailData4.seriesData1 = arrs1
        this.options1.forEach(item => {
          if (item.value === this.timeType1) {
            this.detailData4.title1 = item.label
          }
        })
        //轴2数据处理
        this.detailData4.time1 = arr[0].slice(0, 10)
        this.detailData4.xDataArr = arr.map(item => {
          return item.slice(10)
        })
        this.detailData4.seriesData2 = arrs
        this.options1.forEach(item => {
          if (item.value === this.timeType2) {
            this.detailData4.title2 = item.label
          }
        })
        this.$nextTick(function () {
          this.draw(4)
        })
      })
    },
    handleDetails(type, id, RiskLevel, e) {
      this.dialogVisible0 = false
      this.dialogVisible1 = false
      this.dialogVisible2 = false
      this.dialogVisible4 = false
      this['dialogVisible' + type] = true
      this.RiskLevel = RiskLevel
      if (type == 0) {
        var num = id + 1
        var el = document.querySelector("table tbody tr:nth-child(" + num + ")");
        if (id == 0) {
          this.dialog.TiemStart = el.querySelector("td:nth-child(2)").textContent;
          this.dialog.start = el.querySelector("td:nth-child(3)").textContent;
          this.dialog.TiemEnd = el.querySelector("td:nth-child(4)").textContent;
          this.dialog.end = el.querySelector("td:nth-child(5)").textContent;
          this.dialog.AH = el.querySelector("td:nth-child(6)").textContent;
        } else {
          this.dialog.TiemStart = el.querySelector("td:nth-child(1)").textContent;
          this.dialog.start = el.querySelector("td:nth-child(2)").textContent;
          this.dialog.TiemEnd = el.querySelector("td:nth-child(3)").textContent;
          this.dialog.end = el.querySelector("td:nth-child(4)").textContent;
          this.dialog.AH = el.querySelector("td:nth-child(5)").textContent;
        }
        //参数
        // var obj = {
        //   "chargeEndTime": this.dialog.TiemEnd,
        //   "chargeStartTime": this.dialog.TiemStart,
        //   "vin": this.tableData.firstTdData[2]
        // }
        //测试数据
        var obj = {
          "chargeEndTime": "2018-05-14T16:02:10.000Z",
          "chargeStartTime": "2018-05-12T16:02:10.000Z",
          "vin": "LGJE13EA8HM612678"
        }
        getChargeRecordVOByID(obj).then(res => {
          this.detailData1.xDataArr = res.data.data.chartResult.maxCellVoltage.categories
          this.detailData1.series = res.data.data.chartResult.maxCellVoltage.value
          this.detailData1.minArr = res.data.data.chartResult.minCellVoltage.value
          this.detailData1.barData1 = []
          this.detailData1.barX1 = []
          this.detailData1.barData2 = []
          this.detailData1.barX2 = []
          res.data.data.maxCellVoltageNumList.forEach(item => {
            this.detailData1.barData1.push(item.count)
            this.detailData1.barX1.push(item.xaxis)
          })
          res.data.data.maxProbeTemperatureNumList.forEach(item => {
            this.detailData1.barData2.push(item.count)
            this.detailData1.barX2.push(item.xaxis)
          })
          this.$nextTick(function () {
            this.draw(type)
          })
        })
      }
      if (type == 1 || type == 2) {
        var num1 = id + 1
        var el1 = document.querySelector("table tbody tr:nth-child(" + num1 + ")");
        if (id == 0) {
          this.dialog.TiemStart = el1.querySelector("td:nth-child(2)").textContent;
          this.dialog.start = el1.querySelector("td:nth-child(3)").textContent;
          this.dialog.TiemEnd = el1.querySelector("td:nth-child(4)").textContent;

        } else {
          this.dialog.TiemStart = el1.querySelector("td:nth-child(1)").textContent;
          this.dialog.start = el1.querySelector("td:nth-child(2)").textContent;
          this.dialog.TiemEnd = el1.querySelector("td:nth-child(3)").textContent;

        }
        if (type == 1) {
          //参数
          // var obj = {
          //   "failureEndTime": this.dialog.TiemEnd,
          //   "failureStartTime": this.dialog.TiemStart,
          //   "vin": this.tableData.firstTdData[2]
          // }
          //测试数据
          var obj = {
            "failureEndTime": "2018-05-12T16:02:10.000Z",
            "failureStartTime": "2018-05-14T16:02:10.000Z",
            "vin": "LGJE13EA8HM612678"
          }
          getFailureVOByID(obj).then(res => {
            this.detailData2.xDataArr = res.data.data.chartResult.resistance.categories
            this.detailData2.series = res.data.data.chartResult.resistance.value
            this.detailData2.barData1 = []
            this.detailData2.barX1 = []
            this.detailData2.barData2 = []
            this.detailData2.barX2 = []
            res.data.data.maxCellVoltageNumList.forEach(item => {
              this.detailData2.barData1.push(item.count)
              this.detailData2.barX1.push(item.xaxis)
            })
            res.data.data.maxProbeTemperatureNumList.forEach(item => {
              this.detailData2.barData2.push(item.count)
              this.detailData2.barX2.push(item.xaxis)
            })
            this.$nextTick(function () {
              this.draw(type)
            })
          })
        } else {
          //测试参数
          var params = 'fQuP5HUBsCTw14I3HWAM'
          getDetailById(params).then(res => {
            let data = res.data.data.arrayData
            //图一数据处理
            this.detailData3.time1 = data[0].lineDoubleYData5.x[0].slice(0, 10)
            console.log("tu1", this.detailData3.time1)
            this.detailData3.xDataArr = data[0].lineDoubleYData5.x.map(item => {
              return item.slice(10)
            })
            let arr = Object.keys(data[0].lineDoubleYData5)
            arr.forEach(item => {
              if (item !== 'x') {
                this.detailData3.series.push(
                  {
                    name: '',
                    type: 'line',
                    data: data[0].lineDoubleYData5[item],
                  }
                )
              }
            })
            //图二数据处理
            this.detailData3.time2 = data[1].lineData6.x[0].slice(0, 10)
            this.detailData3.line1X = data[1].lineData6.x.map(item => {
              return item.slice(10)
            })
            this.detailData3.line1Data = data[1].lineData6.y
            console.log(this.detailData3.line1X)
            console.log(this.detailData3.line1Data)
            //图三数据处理

            this.$nextTick(function () {
              this.draw(type)
            })
          })
        }
      }
      if (type == 4) {
        var num2 = id + 1
        var el2 = document.querySelector("table tbody tr:nth-child(" + num2 + ")");
        if (id == 0) {
          this.dialog.TiemStart = el2.querySelector("td:nth-child(2)").textContent;
          this.dialog.start = el2.querySelector("td:nth-child(3)").textContent;
          this.dialog.TiemEnd = el2.querySelector("td:nth-child(4)").textContent;
          this.dialog.end = el2.querySelector("td:nth-child(5)").textContent;

        } else {
          this.dialog.TiemStart = el2.querySelector("td:nth-child(1)").textContent;
          this.dialog.start = el2.querySelector("td:nth-child(2)").textContent;
          this.dialog.TiemEnd = el2.querySelector("td:nth-child(3)").textContent;
          this.dialog.end = el2.querySelector("td:nth-child(4)").textContent;
          this.dialog.AH = el2.querySelector("td:nth-child(5)").textContent;
        }
        this.travelChartRecord()
      }
    },
    handleClose(type) {
    },
    draw(type) {
      if (type == 0) {
        let chart1 = this.$echarts.init(this.$refs.chart1);
        let option1 = {
          tooltip: {
            trigger: 'axis',
            confine: true
          },
          title: {
            show: true,
            text: '最高电压/最低电压（V）',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          legend: [
            {
              icon: '',
              textStyle: {
                fontSize: '12',
                color: "#3E526F",
                // lineHeight:15
                padding: [2, 0, 0, 0]
              },
              data: ['最高电压', '最低电压'],
              x: 'left',
              itemWidth: 16,
              itemHeight: 10,
              orient: 'horizontal',
              itemGap: 10,
              top: 25
            }
          ],
          grid: {
            top: 65,
            left: '3%',
            right: '6%',
            bottom: '25',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: false
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#A7C6E0',
              }
            },
            axisLabel: {
              color: '#3E526F'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            data: this.detailData1.xDataArr
          },
          yAxis: [{
            type: 'value',
            // name: '最高电压/最低电压（V）',
            // nameTextStyle: {
            //     fontSize: '14',
            //     color: '#3E526F',
            //     fontWeight: '600',
            //     padding: [0, 0, 0, 30]
            // },
            // splitNumber: 2,
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#A7C6E0',
              }
            },
            axisLabel: {
              color: '#3E526F'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            min: 3.2
          }
          ],
          dataZoom: [{
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: '6',
            start: 20,
            end: 80,
            handleSize: 20,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent"
            },
            borderColor: 'transparent',
            backgroundColor: '#EEEFF3',
            dataBackground: {
              lineStyle: {
                width: 0
              },
              areaStyle: {
                color: 'transparent'
              }
            },
            fillerColor: '#C3C6D1',
          }, {
            type: "inside",
            show: true,
          }],
          series: [
            {
              name: '最高电压',
              type: 'line',
              color: '#2763B7',
              data: this.detailData1.series,
            },
            {
              name: '最低电压',
              type: 'line',
              color: '#1890FF',
              data: this.detailData1.minArr,
            }
          ]
        }
        chart1.clear()
        chart1.setOption(option1);
        window.addEventListener("resize", function () {
          chart1.resize();
        });

        let chart2 = this.$echarts.init(this.$refs.chart2)
        let option2 = {
          title: {
            text: '最高电压单体号',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          color: ['#326FF8'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '4%',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.detailData1.barX1,
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              }
            }
          ],
          yAxis: [
            {
              name: 'x10⁴',
              type: 'value',
              nameTextStyle: {
                padding: [0, 0, 0, 20],
                color: '#3E526F'
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              }
            },
            {
              name: '',
              nameLocation: 'start',
              type: 'value',
              inverse: true,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: this.detailData1.barData1
            }
          ]
        }
        chart2.clear()
        chart2.setOption(option2)

        let chart3 = this.$echarts.init(this.$refs.chart3)
        let option3 = {
          title: {
            text: '最高温度探针号',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          color: ['#FC6579'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '4%',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.detailData1.barX2,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              name: 'x10⁵',
              type: 'value',
              nameTextStyle: {
                padding: [0, 0, 0, 20],
                color: '#3E526F'
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              }
            },
            {
              name: '',
              nameLocation: 'start',
              type: 'value',
              inverse: true,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: this.detailData1.barData2
            }
          ]
        }
        chart3.clear()
        chart3.setOption(option3)
      } else if (type == 1) {
        let chart4 = this.$echarts.init(this.$refs.chart4)
        let option4 = {
          tooltip: {
            trigger: 'axis'
          },
          title: {
            show: false,
            text: '绝缘电阻/kΩ',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30
          },
          grid: {
            top: 15,
            left: '30',
            right: '30',
            bottom: '25',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: false
              }
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            nameTextStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            },
            axisLine: {
              lineStyle: {
                color: '#A7C6E0',
              }
            },
            axisLabel: {
              color: '#3E526F'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            data: this.detailData2.xDataArr
          },
          yAxis: {
            type: 'value',
            name: '绝缘电阻/kΩ',
            nameLocation: 'center',
            nameGap: 40,
            nameTextStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            },
            axisLine: {
              lineStyle: {
                color: '#A7C6E0',
              }
            },
            axisLabel: {
              color: '#3E526F'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            }
          },
          dataZoom: [{
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: '5',
            start: 20,
            end: 80,
            handleSize: 20,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent"
            },
            borderColor: 'transparent',
            backgroundColor: '#EEEFF3',
            dataBackground: {
              lineStyle: {
                width: 0
              },
              areaStyle: {
                color: 'transparent'
              }
            },
            fillerColor: '#C3C6D1',
          }, {
            type: "inside",
            show: true,
          }],
          series: [
            {
              name: '',
              type: 'line',
              symbol: 'none',
              data: this.detailData2.series,
              color: '#1890FF'
            }
          ],
          connectNulls: true
        };
        chart4.clear()
        chart4.setOption(option4)

        let chart5 = this.$echarts.init(this.$refs.chart5)
        let option5 = {
          title: {
            text: '最高电压单体号',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          color: ['#326FF8'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '4%',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              // data: this.detailData1.barX1,
              data: this.detailData2.barX1,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              }
            },
          ],
          yAxis: [
            {
              name: 'x10⁴',
              type: 'value',
              nameTextStyle: {
                padding: [0, 0, 0, 20],
                color: '#3E526F'
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              }
            },
            {
              name: '',
              nameLocation: 'start',
              type: 'value',
              inverse: true,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: this.detailData2.barData1
            }
          ]
        }
        chart5.clear()
        chart5.setOption(option5)

        let chart6 = this.$echarts.init(this.$refs.chart6)
        let option6 = {
          title: {
            text: '最高温度探针号',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          color: ['#FC6579'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '4%',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.detailData2.barX2,
              axisTick: {
                shuow: false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              },
            }
          ],
          yAxis: [
            {
              name: 'x10⁵',
              type: 'value',
              nameTextStyle: {
                padding: [0, 0, 0, 20],
                color: '#3E526F'
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              }
            },
            {
              name: '',
              nameLocation: 'start',
              type: 'value',
              inverse: true,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: this.detailData2.barData2
            }
          ]
        }
        chart6.clear()
        chart6.setOption(option6)
      } else if (type == 2) {
        let chart7 = this.$echarts.init(this.$refs.chart7)
        let option7 = {
          tooltip: {
            trigger: 'axis'
          },
          title: {
            show: false,
            text: '',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30
          },
          grid: {
            top: 20,
            left: '30',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: false
              }
            }
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            name: '',
            axisLabel: {
              show: true,
              interval: 0,
              color: '#3E526F',
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#A7C6E0"
              }
            },
            data: this.detailData3.xDataArr
          },
          yAxis: {
            type: 'value',
            name: '电池包单体电压N',
            nameLocation: 'center',
            nameGap: 40,
            nameTextStyle: {
              fontSize: '14',
              color: '#3E526F'
            },
            min: 3.4,
            max: 3.8,
            interval: 0.2,
            axisLabel: {
              color: '#3E526F'
            },
            axisLine: {
              lineStyle: {
                color: '#A7C6E0',
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            }
          },
          dataZoom: [{
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: '5%',
            start: 50,
            end: 52,
            handleSize: 20,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent"
            },
            borderColor: 'transparent',
            backgroundColor: '#EEEFF3',
            dataBackground: {
              lineStyle: {
                width: 0
              },
              areaStyle: {
                color: 'transparent'
              }
            },
            fillerColor: '#C3C6D1',
          }, {
            type: "inside",
            show: true,
            // start: 1,
            // end: 35,
            // zoomOnMouseWheel: false,
            // moveOnMouseWheel: true,
            // moveOnMouseMove: true,
            // preventDefaultMouseMove: true
          }],
          series: this.detailData3.series
        };
        chart7.clear()
        chart7.setOption(option7)

        let chart8 = this.$echarts.init(this.$refs.chart8)
        let option8 = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            name: '',
            axisLabel: {
              show: true,
              interval: 0,
              color: '#3E526F',
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#A7C6E0"
              }
            },
            data: this.detailData3.line1X
          },
          yAxis: [{
            type: 'value',
            name: '压差/mV',
            nameLocation: 'center',
            // min: 40,
            // max: 90,
            interval: 10,
            nameGap: 30,
            nameTextStyle: {
              fontSize: '14',
              color: '#3E526F'
            },
            axisLabel: {
              color: '#3E526F'
            },
            axisLine: {
              lineStyle: {
                color: '#A7C6E0',
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            axisTick: {
              show: false,
              alignWithLabel: true
            }
          },
            {
              name: '',
              nameLocation: 'start',
              type: 'value',
              inverse: true,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
            }],
          grid: {
            top: 20,
            left: '30',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          dataZoom: [{
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: '5%',
            start: 50,
            end: 52,
            handleSize: 20,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent"
            },
            borderColor: 'transparent',
            backgroundColor: '#EEEFF3',
            dataBackground: {
              lineStyle: {
                width: 0
              },
              areaStyle: {
                color: 'transparent'
              }
            },
            fillerColor: '#C3C6D1',
          }, {
            type: "inside",
            show: true,
            // start: 1,
            // end: 35,
            // zoomOnMouseWheel: false,
            // moveOnMouseWheel: true,
            // moveOnMouseMove: true,
            // preventDefaultMouseMove: true
          }],
          series: [{
            symbolSize: 8,
            data: this.detailData3.line1Data,
            type: 'scatter',
            color: '#1890FF'
          }]
        };
        chart8.clear()
        chart8.setOption(option8)
        let chart9 = this.$echarts.init(this.$refs.chart9)
        let option9 = {
          xAxis: {
            type: '',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#A7C6E0',
              }
            },
            axisLabel: {
              color: '#3E526F'
            },
            splitLine: {
              lineStyle: {
                color: '#A7C6E0',
              },
            },
          },
          yAxis: {

            type: 'value',
            name: '',
            nameLocation: 'center',
            nameGap: 30,
            nameTextStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#A7C6E0',
              }
            },
            axisLabel: {
              color: '#3E526F'
            },
            splitLine: {
              lineStyle: {
                color: '#A7C6E0',
              },
            },
          },
          grid: {
            top: 20,
            left: '20',
            right: '7%',
            bottom: '0',
            containLabel: true
          },
          visualMap: {
            min: 0,
            max: 180,
            color: ['#FCDE66', '#1890FF'],
            top: 'center',
            itemWidth: 8,
            itemHeight: 300,
            align: 'right',
            text: [180, 0],
            right: '0',
            textStyle: {
              fontSize: 10,
              color: '#3E526F'
            },
          },
          series: [
            {
              symbolSize: 8,
              data:
              // this.averageCellVoltages,
                [
                  [20.0, 28.04],
                  [38.0, 16.95],
                  [143.0, 157.58],
                  [90.0, 48.81],
                  [110.0, 68.33],
                  [104.0, 89.96],
                  [68.0, 27.24],
                  [49.0, 34.26],
                  [120.0, 10.84],
                  [78.0, 64.82],
                  [55.0, 45.68]
                ],
              type: 'scatter'
              // color: '#1890FF'
            },
            {
              symbolSize: 8,
              data:
              // this.differenceCellVoltageV,
                [
                  [65.0, 38.04],
                  [49.0, 56.25],
                  [18.0, 177.58],
                  [110.0, 98.41],
                  [95.0, 68.63],
                  [21.0, 109.96],
                  [59.0, 78.24],
                  [72.0, 64.26],
                  [115.0, 110.84],
                  [88.0, 64.82],
                  [94.0, 85.68]
                ],
              type: 'scatter'
              // color: '#FACC14'
            }
          ]
        };
        chart9.clear()
        chart9.setOption(option9)
      } else if (type == 4) {
        let chart10 = this.$echarts.init(this.$refs.chart10)
        let option10 = {
          tooltip: {
            trigger: 'axis'
          },
          title: {
            show: false,
            text: '车速（km/h）',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30
          },
          grid: {
            top: 50,
            left: '20',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: false
              }
            }
          },
          xAxis: {
            type: 'category',
            name: '',
            axisLabel: {
              show: true,
              interval: 0,
              color: '#3E526F',
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#DDECFA',
                width: 1
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#A7C6E0"
              }
            },
            data: this.detailData4.xDataArr
          },
          yAxis: [
            {
              type: 'value',
              name: this.detailData4.title1,
            },
            {
              type: 'value',
              name: this.detailData4.title2,
            }
          ],
          dataZoom: [{
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: '5%',
            start: 55,
            end: 56,
            handleSize: 20,
            handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
            //handleSize: '110%',
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent"
            },
            borderColor: 'transparent',
            backgroundColor: '#EEEFF3',
            dataBackground: {
              lineStyle: {
                width: 0
              },
              areaStyle: {
                color: 'transparent'
              }
            },
            fillerColor: '#C3C6D1',
          }, {
            type: "inside",
            show: true,
            // start: 1,
            // end: 35,
            // zoomOnMouseWheel: false,
            // moveOnMouseWheel: true,
            // moveOnMouseMove: true,
            // preventDefaultMouseMove: true
          }],
          series: [
            {
              name: this.detailData4.title1,
              type: 'line',
              yAxisIndex: 0,
              data: this.detailData4.seriesData1,
            },
            {
              name: this.detailData4.title2,
              type: 'line',
              yAxisIndex: 1,
              data: this.detailData4.seriesData2,
            }
          ]
        };
        chart10.clear()
        chart10.setOption(option10)

        let chart11 = this.$echarts.init(this.$refs.chart11)
        let option11 = {
          title: {
            text: '最高电压单体号',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          color: ['#326FF8'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '4%',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [0, 20, 40, 60, 80, 100],
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              }
            }
          ],
          yAxis: [
            {
              name: 'x10⁴',
              type: 'value',
              nameTextStyle: {
                padding: [0, 0, 0, 20],
                color: '#3E526F'
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              }
            },
            {
              name: '',
              nameLocation: 'start',
              type: 'value',
              inverse: true,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: [1.8, 1.6, 8.3, 8, 1.0, 0.2, 2.2, 4.0, 4.5, 2.0]
            }
          ]
        }
        chart11.clear()
        chart11.setOption(option11)

        let chart12 = this.$echarts.init(this.$refs.chart12)
        let option12 = {
          title: {
            text: '最高温度探针号',
            textStyle: {
              fontSize: '14',
              color: '#3E526F',
              fontWeight: '600'
            }
          },
          color: ['#FC6579'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0',
            right: '4%',
            bottom: '0',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [0, 20, 40, 60, 80, 100],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              name: 'x10⁵',
              type: 'value',
              nameTextStyle: {
                padding: [0, 0, 0, 20],
                color: '#3E526F'
              },
              axisLabel: {
                color: '#3E526F'
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: '#DDECFA',
                  width: 1
                },
              },
              axisTick: {
                show: false,
                alignWithLabel: true
              },
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              }
            },
            {
              name: '',
              nameLocation: 'start',
              type: 'value',
              inverse: true,
              axisLine: {
                lineStyle: {
                  color: '#A7C6E0',
                }
              },
            }
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: [0.8, 0.5, 2.7, 2.5, 0.5, 0.1, 1.1, 1.5, 1.7, 1.0]
            }
          ]
        }
        chart12.clear()
        chart12.setOption(option12)
      }
    }
  },
}
</script>

<style scoped>
.table {
  width: 100%;
  font-size: 14px;
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
  text-align: center;
}

.table thead tr th:first-child {
  width: 290px;
  /* text-align: left; */
  /* padding-left: 25px; */
}

.table tbody tr td {
  text-align: center;
  border-bottom: 1px solid #f1f6f9;
  height: 44px;
  color: #3f536e;
  /* padding-left: 25px; */
}

.table1 tbody tr td {
  /* text-align: left; */
}

.table1 thead tr th {
  /* text-align: left; */
  /* padding-left: 25px; */
}

.table1 thead tr th:nth-child(5) {
  /* text-align: right; */
  /* padding-right: 25px; */
}

.table1 thead tr th:nth-child(6) {
  /* text-align: center; */
}

.table1 thead tr th:nth-child(3) {
  /* text-align: center; */
}

.table1 tbody tr:first-child td:nth-child(5) {
  /* text-align: right;
        padding-right: 25px; */
}

.table1 tbody tr:not(:first-child) td:nth-child(4) {
  /* text-align: right;
        padding-right: 25px; */
}

.table1 tbody tr:first-child td:nth-child(6) {
  text-align: center;
}

.table1 tbody tr:not(:first-child) td:nth-child(5) {
  text-align: center;
}

.table1 tbody tr:first-child td:nth-child(3) {
  text-align: center;
}

.table1 tbody tr:not(:first-child) td:nth-child(2) {
  text-align: center;
}

/deep/ .dialog-box .el-dialog__header {
  padding: 15px 20px;
  background-color: #fafbfc;
  font-size: 16px;
  color: #2b405b;
  border-bottom: 1px solid #f1f2f2;
}

/deep/ .dialog-box .el-dialog__body {
  padding: 15px 30px 30px;
}

/deep/ .dialog-box .el-dialog {
  border-radius: 5px;
  overflow: hidden;
  margin: 30px 0 !important;
  overflow-y: auto;
}

/deep/ .dialog-box .el-dialog::-webkit-scrollbar {
  width: 0;
}

.dialog-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top-box {
  border-bottom: 1px solid #e5eef5;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

/deep/ .dialog-content .el-col b {
  color: #3e526f;
  margin-right: 20px;
}

/deep/ .dialog-content .el-col span {
  color: #3e526f;
}

/deep/ .dialog-content .el-row {
  margin-bottom: 10px;
}
</style>
