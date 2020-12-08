 <template>
  <div class="wrap">
    <toph v-show="displayPdf"
          v-bind:active="active"></toph>
    <div class="main" v-show="showRentPrise">
      <el-breadcrumb separator="/" style="margin-left:12px;">
        <el-breadcrumb-item><a>计算</a></el-breadcrumb-item>

        <!-- <el-breadcrumb-item>
          <a>电池包数据可视化</a>
        </el-breadcrumb-item> -->
      </el-breadcrumb>
      <!-- 搜索工具栏 -->
      <div class="handle-box">
        <div class="box">
          <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="filters" ref="filters">
              <el-form-item prop="name">
                <span style="margin-right:33px;">车型</span>
<!--                <v-selectpage :data="filters.carOptions"-->
<!--                              v-model="filtersName"-->
<!--                              sort="name"-->
<!--                              placeholder='请选择一个车型'-->
<!--                              @values="singleValues">-->
<!--                </v-selectpage>-->
                <el-select v-model="filtersName" filterable placeholder="请选择车型" size="mini" @change="singleValues(filtersName)">
                  <el-option v-for="item in filters.carOptions" :key="item.id" :label="item.id" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label style="margin-right:-22px;">
                <span style="margin-right:23px;">时间段</span>
                <el-date-picker v-model="filters.column.create_start_date" type="datetime" size="mini" placeholder></el-date-picker>
              </el-form-item>
              <el-form-item label="—" label-width="45px" style="margin-right:18px;">
                <el-date-picker v-model="filters.column.create_end_date" type="datetime" size="mini" placeholder></el-date-picker>
              </el-form-item>
              <br />
              <el-form-item prop="carN">
                <span>车辆VIN</span>
<!--                <v-selectpage :data="filters.carNOptions"-->
<!--                              v-model="filters.carN"-->
<!--                              sort="name"-->
<!--                              placeholder='请选择一个车型'-->
<!--                              @values="singleValues">-->
<!--                </v-selectpage>-->
                <el-select v-model="filters.carN" filterable placeholder="请选择车辆vin" size="mini">
                  <el-option v-for="item in filters.carNOptions" :key="item.id" :label="item.id" :value="item.id"></el-option>
                </el-select>

              </el-form-item>
              <el-form-item prop="name">
                <span>输出类型</span>
                <el-select v-model="timeType2" @change="selectModel2($event),change($event)" placeholder="请选择" filterable size="mini">
                  <el-option v-for="item in filters.dataTyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-right:4px;">
                <el-button type="primary" @click="handleSearch" size="mini" style="height:32px;">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="info" size="mini" @click="resetForm" style="height:32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);">重置</el-button>
              </el-form-item>
              <!-- <el-form-item prop="time1"
                            style="margin-left:50px; margin-right:4px;">
                <el-button class="searBtnTime">最近12小时</el-button>
              </el-form-item>
              <el-form-item prop="time2"
                            style="margin-right:4px;">
                <el-button class="searBtnTime">最近1天</el-button>
              </el-form-item>
              <el-form-item prop="time3"
                            style="margin-right:4px;">
                <el-button class="searBtnTime">最近3天</el-button>
              </el-form-item>
              <el-form-item prop="time4">
                <el-button class="searBtnTime">最近7天</el-button>
              </el-form-item> -->
            </el-form>
          </el-col>
        </div>
      </div>
      <!-- 搜索工具栏 -->
      <!-- 图表区域 -->
      <div class="echartsCon" style="margin-top:10px;">
        <!-- 按钮区域 -->
        <div class="btns">
          <div class="showQp" @click="changeStatusqp">
            <img src="../../assets/images/icon_qp.png" alt />
            <span>全屏展示</span>
          </div>
          <!-- <div class="dcBtn"
               @click="handleEditC()">
            <img src="../../assets/images/battery/exict.png"
                 alt />导出
          </div> -->
        </div>
        <!-- 按钮区域 -->
        <div style="margin:0 50px;">
          <div class="titBoth">
            <div>{{typeOutput}}</div>
            <!-- <div>最高温度/最低温度（°C）</div> -->
          </div>
          <div class="eBoxs">
            <div style="width:100%; height: 100%;" id="chart1" ref="chart1"></div>
          </div>
          <div class="eBoxs" style="display: none;">
            <el-col :span="12">
              <div style="width:100%; height: 100%;" ref="chart2" v-show="hightDy"></div>
              <div style="width:100%; height: 100%;" ref="chart21" v-show="lowDy"></div>
              <div class="rselectDy">选择电压：
                <el-radio-group v-model="radio" @change="changeHandler">
                  <el-radio label="1">最高电压</el-radio>
                  <el-radio label="2">最低电压</el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span="12">
              <div style="height: 100%;" ref="chart3" v-show="hightWd"></div>
              <div style="height: 100%;" ref="chart31" v-show="lowWd"></div>
              <div class="rselectWd">选择温度：
                <el-radio-group v-model="radio2" @change="changeHandlerW">
                  <el-radio label="3">最高温度</el-radio>
                  <el-radio label="4">最低温度</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </div>
        </div>
      </div>

      <!-- 图表区域 -->
    </div>
    <div class="main" v-show="showRentPrise2">
      <!-- 图表区域 -->
      <div class="echartsCon">
        <div style="margin:0 50px;">
          <div class="titBoth" style="margin-top:29px;">
            <div>{{typeOutput}}</div>
            <!-- <div>最高温度/最低温度（°C）</div> -->
          </div>
          <div class="eBoxs">
            <div style="width:100%; height: 100%;" id="chart4" ref="chart4"></div>
          </div>
          <div class="eBoxs" style="display: none;">
            <el-col :span="12">
              <div style="height: 100%;" ref="chart5" id="chart5"></div>
            </el-col>
            <el-col :span="12">
              <div style="height: 100%;" ref="chart6" id="chart6"></div>
            </el-col>
          </div>
        </div>
        <div class="showQp2" @click="changeStatustqp">
          <span>单击或ESC退出全屏模式</span>
        </div>
        <div style="clear:both;"></div>
      </div>

      <!-- 图表区域 -->
    </div>
    <!-- 电压数据展示 -->
    <el-dialog title="数据展示" width="30%" :visible.sync="FormVisible" :close-on-click-modal="false" class="display-form" :before-close="handleClose">
      <el-form :model="Form" label-width="98px" ref="Form">
        <!-- <el-form-item label="电压单体编号">
          <el-input v-model="Form.yjtype"></el-input>
        </el-form-item> -->
        <el-form-item label="增加对比项目">
          <el-checkbox-group v-model="checkList1">
            <el-checkbox v-for=" (item,index) in dataComparison2" :key="index" :label="item.label">{{item.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="confirmDy('from')" style="height:32px; padding: 6px 18px;">确定</el-button>
        <el-button @click.native="handleCancel('Form')" style="height:32px; padding: 6px 18px;">取消</el-button>
      </div>
    </el-dialog>
    <!-- 温度数据展示 -->
    <el-dialog title="数据展示" width="30%" :visible.sync="FormVisible2" :close-on-click-modal="false" class="display-form" :before-close="handleClose">
      <el-form :model="Form" label-width="98px" ref="Form">
        <!-- <el-form-item label="温度探针号">
          <el-input v-model="Form.yjtype"></el-input>
        </el-form-item> -->
        <el-form-item label="增加对比项目">
          <el-checkbox-group v-model="checkList1">
            <el-checkbox v-for=" (item,index) in dataComparison1" :key="index" :label="item.label">{{item.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="confirmWd('Form')" style="height:32px; padding: 6px 18px;">确定</el-button>
        <el-button @click.native="handleCancel('Form')" style="height:32px; padding: 6px 18px;">取消</el-button>
      </div>
    </el-dialog>
    <!--startprint" + oper + "-->
    <!-- daochu -->
    <el-dialog customClass="customWidth2" title="导出" :visible.sync="FormVisibledc" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
      <el-form :model="Form" label-width="120px" ref="Form">
        <!-- <el-form-item label="保存路径">
             <div style="width:50%; float:left; margin-right:40px;"><input type="text" id="textfield" class="filIn" style="width:100%;"/></div>
            <a class="choseBtn">
                选择<input type="file" name="file" id="fileField" class="choseBtnold" onchange="document.getElementById('textfield').value=document.getElementById('fileField').value">
            </a>
        </el-form-item>-->
        <el-form-item label="保存类型">
          <el-radio v-model="radio1" label="1">WORD文件</el-radio>
          <br />
          <el-radio v-model="radio1" label="2">PDF文件</el-radio>
        </el-form-item>
      </el-form>
      <!--endprint" + oper + "-->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="confirmDc('Form')" style="height:32px; padding: 6px 18px;">确定</el-button>
        <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import toph from "@/components/top";
import echarts from "echarts";
import { frequencyExport, getHistoricalVehicleData, menu, getVehiclesListViN, getFrequencyData, getVehiclesList } from "@/api/pack"

export default {
  components: {
    toph,
  },
  data () {
    return {
      filtersName: '',
      typeOutput: '',
      series: [],
      sittingHeadR: [],
      sittingHeadL: [],
      cellVoltage: false,
      cellVoltage1: false,
      seriesData: [],
      tempObject: '',
      // 对比数据1
      dataComparison1:
        [
          {
            value: '最高电压',
            label: '9'
          }, {
            value: '最低电压',
            label: '10'
          }, {
            value: '平均电压',
            label: '19'
          }, {
            value: '电压差',
            label: '15'
          }],
      dataComparison2: [
        {
          value: '最高电压',
          label: '9'
        }, {
          value: '最低电压',
          label: '10'
        }, {
          value: '平均电压',
          label: '19'
        }, {
          value: '电压差',
          label: '15'
        }
      ],
      // 图片字符串
      chart1Data: '',
      chart2Data: '',
      chart3Data: '',
      displayPdf: true,
      handleSearchV: [],
      handleSearchA: [],
      changeHandlerwX: [],
      changeHandlerwY: [],
      changeHandlerwCount: [],
      changeHandlerX: [],
      changeHandlerY: [],
      changeHandlerCount: [],
      timeType1: [],
      timeType2: [],
      // -------------
      Form: {
        id: 0,
        timeType1: "",
        timeType: "",
      },
      FormVisible: false,
      FormVisible2: false,
      showRentPrise: true,
      showRentPrise2: false,
      FormVisibledc: false,
      active: 3,
      hightWd: true,
      lowWd: false,
      hightDy: true,
      lowDy: false,
      filters: {
        //车型下拉框
        carOptions: [
          {
            value: "北汽新能源EX360",
            label: "北汽新能源EX360",
          },
          {
            value: "北汽新能源EU5",
            label: "北汽新能源EU5",
          },
          {
            value: "北汽新能源EX5",
            label: "北汽新能源EX5",
          },
          {
            value: "北汽新能源EC3",
            label: "北汽新能源EC3",
          },
        ],
        dataTyOptions: [
          {
            value: "1",
            label: "总电压",
          },
          {
            value: "2",
            label: "总电流",
          },
          {
            value: "3",
            label: "SOC",
          },
          {
            value: "4",
            label: "绝缘电阻",
          },
          {
            value: "5",
            label: "车速",
          },
          {
            value: "6",
            label: "行驶里程",
          },
          {
            value: "7",
            label: "充电状态",
          },
          {
            value: "8",
            label: "行驶状态",
          },

          {
            value: "9",
            label: "最高单体电压",
          },
          {
            value: "10",
            label: "最低单体电压",
          },
          {
            value: "11",
            label: "最高探针温度",
          },
          {
            value: "12",
            label: "最低探针温度",
          },
          {
            value: "13",
            label: "电芯电压",
          },
          {
            value: "14",
            label: "探针温度",
          },
          {
            value: "15",
            label: "压差",
          },
          {
            value: "16",
            label: "温差",
          },
          {
            value: "17",
            label: "温升速率",
          },
          {
            value: "18",
            label: "温升速率正反切",
          },
          {
            value: "19",
            label: "平均电压",
          },
          {
            value: "20",
            label: "平均温度",
          },
          {
            value: "21",
            label: "电压方差",
          },
          {
            value: "22",
            label: "温度方差",
          },
          {
            value: "23",
            label: "每帧每个电芯的熵值",
          }, {
            value: "24",
            label: "每帧每个电芯的变异系数",
          }, {
            value: "25",
            label: "相邻两帧单体电压变化量",
          }, {
            value: "26",
            label: "相邻两帧总电压变化量",
          },
        ],
        dataTyOptions1:
          [
            {
              value: "1",
              label: "总电压",
            },
            {
              value: "2",
              label: "总电流",
            },
            {
              value: "3",
              label: "SOC",
            },
            {
              value: "4",
              label: "绝缘电阻",
            },
            {
              value: "5",
              label: "车速",
            },
            {
              value: "6",
              label: "行驶里程",
            },
            {
              value: "7",
              label: "充电状态",
            },
            {
              value: "8",
              label: "行驶状态",
            },

            {
              value: "9",
              label: "最高单体电压",
            },
            {
              value: "10",
              label: "最低单体电压",
            },
            {
              value: "11",
              label: "最高探针温度",
            },
            {
              value: "12",
              label: "最低探针温度",
            },
            {
              value: "13",
              label: "电芯电压",
            },
            {
              value: "14",
              label: "探针温度",
            },
            {
              value: "15",
              label: "压差",
            },
            {
              value: "16",
              label: "温差",
            },
            {
              value: "17",
              label: "温升速率",
            },
            {
              value: "18",
              label: "温升速率正反切",
            },
            {
              value: "19",
              label: "平均电压",
            },
            {
              value: "20",
              label: "平均温度",
            },
            {
              value: "21",
              label: "电压方差",
            },
            {
              value: "22",
              label: "温度方差",
            },
            {
              value: "23",
              label: "每帧每个电芯的熵值",
            }, {
              value: "24",
              label: "每帧每个电芯的变异系数",
            }, {
              value: "25",
              label: "相邻两帧单体电压变化量",
            }, {
              value: "26",
              label: "相邻两帧总电压变化量",
            },
          ],
        carNOptions: [
          {
            value: "1",
            label: "LGJE13EA1112",
          }, {
            value: "2",
            label: "QER413EA",
          }, {
            value: "3",
            label: "DAJE1213EA",
          }
        ],
        name: "",
        carN: "",
        carnumber: "",
        column: {
          create_start_date: "",
          create_end_date: "",
          time1: "",
          time2: "",
          time3: "",
          time4: "",
        },
      },
      radio: "1",
      radio1: "1",
      radio2: "3",
      checkList1: [],
      checkList2: [],
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.filters.column.create_end_date;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        },
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.filters.column.create_start_date;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        },
      },
    };
  },
  watch: {
    filtersName: {
      handler (newVal, oldVal) {
        this.filters.carN = ''
        let params = {
          orgId: 'CLEYQP8C27',
          vehicleType: this.filtersName
        }
        // 获取所有车型vin
        getVehiclesListViN(params).then(res => {
          this.filters.carNOptions = []
          let _this = this
          res.data.data.forEach(function(e) {
            for (var key in e) {
              let data = {
                id: e.vin,
                name: e.vin
              }
              _this.filters.carNOptions.push(data)
            }
          })
        })
      }
    }
  },
  created () {
    this.init()
    this.handleSearchs()
  },
  methods: {
    change (value) {
      this.$forceUpdate();
    },
    getArrayIndex (arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) {
          return i;
        }
      }
      return -1;
    },
    init () {
      let params = {
        orgId: 'CLEYQP8C27',
        // vehicleType: '车型1'
      }
      // 获取所有车型vin
      getVehiclesListViN(params).then(res => {
        this.filters.carNOptions = []
        let _this = this
        res.data.data.forEach(function(e) {
          for (var key in e) {
            let data = {
              id: e.vin,
              name: e.vin
            }
            _this.filters.carNOptions.push(data)
          }
        })
      })
      // 获取所有车型
      getVehiclesList(params).then(res => {
        this.filters.carOptions = []
        let _this = this
        res.data.data.forEach(function(e) {
          for (var key in e) {
            let data = {
              id: e.VEHICLE_TYPE_NAME,
              name: e.VEHICLE_TYPE_NAME
            }
            _this.filters.carOptions.push(data)
          }
        })
      })
    },
    //电压弹窗
    confirmDy (data) {
      if (this.checkList1.length == 0) {
      } else {
        this.cellVoltage = true
      }
      this.FormVisible = false;
    },
    //温度数据弹窗
    confirmWd () {
      if (this.checkList1.length == 0) {
      } else {
        this.cellVoltage1 = true
      }
      this.FormVisible2 = false;
    },
    //导出确定
    confirmDc () {
      this.FormVisibledc = false
      this.handleEditCs()
    },
    // 导出新代码
    postExcelFile (params, url) {
      console.log('key==', params)
      // params是post请求需要的参数，url是请求url地址
      const form = document.createElement('form');
      form.style.display = 'none';
      form.action = url;
      // form.enctype = "multipart/form-data"
      form.method = 'post';
      document.body.appendChild(form);
      // 动态创建input并给value赋值
      /* eslint-disable-next-line */
      for (const key in params) {
        if (params[key]) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = params[key];
          form.appendChild(input);
        }
      }

      form.submit();
      form.remove();
    },
    // -----------------------end---------------
    handleEditC: function() {
      this.FormVisibledc = true
    },
    //导出
    handleEditCs: function(index, row) {
      // 导出原始代码
      let _this = this
      // let data = ['2']
      let imgData =
      {
        "yAxis1": this.timeType1,
        "yAxis2": this.timeType2,
        "endDateStr": this.filters.column.create_end_date,
        "fileName": '电池包数据可视化',
        "imgFrequencyData1": this.chart3Data,
        "imgFrequencyData2": this.chart2Data,
        "imgHistoricalData": this.chart1Data,
        "startDateStr": this.filters.column.create_start_date,
        "type": this.radio1,
        "vehicleType": this.filters.name,
        "vin": this.filters.carN,
      }
      let url = '/api/BatteryProtrati/frequencyExport'
      this.postExcelFile(imgData, url)
    },
    //电压radio
    changeHandler (value) {
      let _this = this
      _this.changeHandlerX = []
      _this.changeHandlerY = []
      _this.changeHandlerCount = []
      let params = {
        type: value
      }
      getFrequencyData(params).then(res => {
        res.data.data.forEach(function(e) {
          _this.changeHandlerX.push(e.xaxis)
          _this.changeHandlerY.push(e.yaxis)
          _this.changeHandlerCount.push(e.count)
        })
        _this.draw('')
      })
      if (this.radio == 2) {
        this.lowDy = true;
        this.hightDy = false;
      } else {
        this.lowDy = false;
        this.hightDy = true;
      }
    },
    //温度radio
    changeHandlerW (value) {
      let _this = this
      _this.changeHandlerwX = []
      _this.changeHandlerwY = []
      _this.changeHandlerwCount = []
      let params = {
        type: value
      }
      getFrequencyData(params).then(res => {
        res.data.data.forEach(function(e) {
          _this.changeHandlerwX.push(e.xaxis)
          _this.changeHandlerwY.push(e.yaxis)
          _this.changeHandlerwCount.push(e.count)
        })
        _this.draw('')
      })
      if (this.radio2 == 4) {
        this.lowWd = true;
        this.hightWd = false;
      } else {
        this.lowWd = false;
        this.hightWd = true;
      }
    },
    // 搜索初始化
    handleSearchs () {
      // this.typeOutput = '最高单体电压'
      // let params = {
      //   endDateStr: '2020-09-29T23:00:00.000Z',
      //   startDateStr: '2020-09-29T00:10:00.000Z',
      //   vin: "LGJE13EA8HM612688",
      //   yAxis1: ['9'],
      //   yAxis2: [],
      //   vehicleType: 'ER005',
      // }
      getHistoricalVehicleData(params).then(res => {
        let arr = res.data.data.maxCellVoltage.categories
        let arrs = res.data.data.maxCellVoltage.value
        this.series=[];
        for (let j = 0; j < arr.length; j++) {
          let data = []
          data.push(arr[j])
          data.push(arrs[j])
          this.series.push(data)
        }
        this.draw('')
      })
    },
    // 搜索
    handleSearch () {
      if (!this.filters.carN){
        this.$message("请选择vin")
        return
      }
      let params = {
        // endDateStr: this.filters.column.create_end_date,
        // startDateStr: this.filters.column.create_start_date,
        // vin: this.filters.carN,
        // vehicleType: this.filtersName,
        // yAxis1: [this.timeType2],
        // yAxis2: [],
        // 测试假数据
        // endDateStr: '2020-09-29T23:00:00.000Z',
        // startDateStr: '2020-09-29T00:10:00.000Z',
        // vin: "LGJE13EA8HM612688",
        // yAxis1: [this.timeType2],
        // yAxis2: [],
        // vehicleType: 'ER005',

        yAxis1: [ this.timeType2],
        // yAxis2: [3,4],
        // vehicleType: this.filters.name,
        // -----------
        // 一下为假数据
        province:'',
        vehicleType: '',
        vin: 'LGJE13EA8HM612678',
        startDateStr: '2018-05-12T16:02:10.000Z',
        endDateStr:   '2018-05-14T16:02:10.000Z',
      }
      getHistoricalVehicleData(params).then(res => {
        if (res.data.data !== null) {
          // 判断数据输出值对应的英文
          let arr = []
          let arrs = []
          console.log(this.timeType2)
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
          }
          // ----------------end-------------
          for (let j = 0; j < this.filters.dataTyOptions.length; j++) {
            if (this.filters.dataTyOptions[j].value == this.timeType2) {
              this.typeOutput = this.filters.dataTyOptions[j].label
            }
          }

          this.series=[];
          for (let j = 0; j < arr.length; j++) {
            let data = []
            data.push(arr[j])
            data.push(arrs[j])
            this.series.push(data)
          }
        } else {
          this.$message('没有找到数据');
        }
        this.draw('')
      })
    },
    resetForm () {
      console.log(1111111)

      this.$refs.filters.resetFields();
      // this.filters.timeType = "";
      this.filters.timeType1 = "";
      this.filtersName=''
      this.timeType2 = ''
      this.typeOutput=''
      console.log(2222)
      // this.filters.carN = ''
      // this.filtersName = ''
      this.filters.column.create_start_date = "";
      this.filters.column.create_end_date = "";
      console.log(2222)

      this.draw(true)


    },
    changeStatusqp () {
      this.drawBig();
      this.showRentPrise = false;
      this.showRentPrise2 = true;
    },
    changeStatustqp () {
      this.showRentPrise = true;
      this.showRentPrise2 = false;
    },
    selectModel2 (e) {
      if (e == 13) {
        this.FormVisible = true;
      } else {
        this.cellVoltage1 = false
      }
      // if (e == 13) {
      //   if (this.checkList1.length > 1232) {
      //     this.$message({
      //       message: '没有要对比的数据',
      //       type: 'warning'
      //     });
      //   } else {
      //     // this.checkList1.forEach(function(checkData) {
      //     //   var newArr = this.dataComparison1.filter(function(item) {
      //     //     return item.label.match(/checkData/)  //将数组中的某个对象去掉
      //     //     console.log('checkData==', checkData)
      //     //   })
      //     // }),
      //     this.FormVisible2 = true;

      //   }
      // }
    },
    selectModel1 (e) {
      if (e == 13) {
        this.FormVisible = true;
      } else {
        this.cellVoltage = false
      }    },

    //点击关闭dialog
    handleClose (done) {
      this.FormVisible = false;
      this.FormVisible2 = false;
      this.FormVisibledc = false;
    },
    //点击取消
    handleCancel (formName) {
      this.FormVisible = false;
      this.FormVisible2 = false;
      this.FormVisibledc = false;
    },
    draw (params) {
      let chart1 = this.$echarts.init(this.$refs.chart1);
      let option1 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: false,
          text: "最高电压/最低电压（V）",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
        },
        legend: [
          {
            icon: "",
            textStyle: {
              fontSize: "12",
              color: "#3E526F",
              lineHeight: 15,
            },
            data: ["最高电压"],
            x: "left",
            itemWidth: 16,
            itemHeight: 10,
            orient: "horizontal",
            itemGap: 10,
          },
          // {
          //   icon: "",
          //   textStyle: {
          //     fontSize: "12",
          //     color: "#3E526F",
          //     lineHeight: 15,
          //   },
          //   data: this.sittingHeadR,
          //   x: "right",
          //   itemWidth: 16,
          //   itemHeight: 10,
          //   orient: "horizontal",
          //   itemGap: 10,
          // },
        ],
        grid: {
          top: 50,
          left: "3%",
          right: "5%",
          bottom: "25",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
        },
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#A7C6E0",
              },
            },
            axisLabel: {
              color: "#3E526F",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#DDECFA",
                width: 1,
              },
            },
            min: 3.2,
          },
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#A7C6E0",
              },
            },
            axisLabel: {
              color: "#3E526F",
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#DDECFA",
                width: 1,
              },
            },
            // min: 20,
          },
        ],
        dataZoom:
          [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "6",
              start: 20,
              end: 80,
              handleSize: 20,
              handleIcon:
                "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
              //handleSize: '110%',
              handleStyle: {
                color: "transparent",
              },
              textStyle: {
                color: "transparent",
              },
              borderColor: "transparent",
              backgroundColor: "#EEEFF3",
              dataBackground: {
                lineStyle: {
                  width: 0,
                },
                areaStyle: {
                  color: "transparent",
                },
              },
              fillerColor: "#C3C6D1",
            },
            {
              type: "inside",
              show: true,
            },
          ],
        series:
          [
            {
              name: "",
              type: "line",
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 1.5// 0.1的线条是非常细的了
                  }
                }
              },
              data: this.series,
              // [
              //   ["2019/7/11  7:03:00", 3.38],
              //   ["2019/7/11  7:05:00", 3.38],
              //   ["2019/7/11  1:14:00", 12],
              //   ["2019/7/11  7:32:00", 8],
              //   ["2019/7/11  7:34:00", 9],
              //   ["2019/7/11  7:36:00", 11],
              //   ["2019/7/11  7:38:00", 12],
              //   ["2019/7/11  7:39:00", 11],
              // ],
              color: "#2763B7",
            },
          ]
      };
      chart1.setOption(option1);
      console.log(params)
      console.log(1133)

      if(params){
        chart1.clear();
        // chart4.clear();
        // chart21.clear();
        // chart3.clear();
        // chart31.clear();
      }
      console.log(params)

    },
    drawBig () {
      let chart4 = this.$echarts.init(this.$refs.chart4);
      let option4 = {
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        title: {
          show: false,
          text: "",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
          },
        },
        legend: [
          {
            icon: "",
            textStyle: {
              fontSize: "12",
              color: "#3E526F",
            },
            data: ["最高电压1"],
            x: "left",
            itemWidth: 16,
            itemHeight: 10,
          },
          {
            icon: "",
            textStyle: {
              fontSize: "12",
              color: "#3E526F",
            },
            data: ["最低温度"],
            x: "right",
            right: "20",
            itemWidth: 16,
            itemHeight: 10,
          },
        ],
        grid: {
          top: 50,
          left: "3%",
          right: "8%",
          bottom: "25",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#A7C6E0",
            },
          },
          axisLabel: {
            color: "#3E526F",
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#DDECFA",
              width: 1,
            },
          },
        },
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#A7C6E0",
              },
            },
            axisLabel: {
              color: "#3E526F",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#DDECFA",
                width: 1,
              },
            },
            min: 3.2,
          },
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#A7C6E0",
              },
            },
            axisLabel: {
              color: "#3E526F",
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#DDECFA",
                width: 1,
              },
            },
          },
        ],
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "6",
            start: 20,
            end: 80,
            handleSize: 20,
            handleIcon:
              "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
            handleStyle: {
              color: "transparent",
            },
            textStyle: {
              color: "transparent",
            },
            borderColor: "transparent",
            backgroundColor: "#EEEFF3",
            dataBackground: {
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                color: "transparent",
              },
            },
            fillerColor: "#C3C6D1",
          },
          {
            type: "inside",
            show: true,
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: this.series,
            color: "#2763B7",
          },
          // {
          //   name: "最低温度",
          //   type: "line",
          //   data: this.handleSearchA,
          //   color: "#1890FF",
          // },
        ],
      };
      chart4.setOption(option4);
      window.addEventListener("resize", function() {
        chart4.resize();
      });
      // let chart5 = this.$echarts.init(this.$refs.chart5);
      // let option5 = {
      //   title: {
      //     text: "最高电压单体号",
      //     textStyle: {
      //       fontSize: "14",
      //       color: "#3E526F",
      //       fontWeight: "600",
      //     },
      //   },
      //   color: ["#326FF8"],
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      //     },
      //   },
      //   grid: {
      //     left: "8%",
      //     right: "16%",
      //     bottom: "0",
      //     containLabel: true,
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       name: "(单体电芯号)",
      //       nameTextStyle: {
      //         color: "#3E526F",
      //         padding: [25, 0, 0, -20],
      //       },
      //       // data: [0, 20, 40, 60, 80, 100],
      //       data: this.changeHandlerX,
      //       // [
      //       //   "92",
      //       //   "93",
      //       //   "94",
      //       //   "95",
      //       //   "96",
      //       // ],
      //       axisTick: {
      //         show: false,
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "#A7C6E0",
      //         },
      //       },
      //       axisLabel: {
      //         color: "#3E526F",
      //       },
      //       splitLine: {
      //         show: true,
      //         lineStyle: {
      //           color: "#DDECFA",
      //           width: 1,
      //         },
      //       },
      //     },
      //   ],
      //   yAxis: [
      //     {
      //       //name: 'x10⁴',
      //       //type: 'value',
      //       name: "(频次)",
      //       type: "value",
      //       nameTextStyle: {
      //         color: "#3E526F",
      //         padding: [0, 25, 0, 0],
      //       },
      //       axisTick: {
      //         show: false,
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "#A7C6E0",
      //         },
      //       },
      //       axisLabel: {
      //         color: "#3E526F",
      //       },
      //       splitLine: {
      //         show: true,
      //         lineStyle: {
      //           color: "#DDECFA",
      //           width: 1,
      //         },
      //       },
      //       min: 3.2,
      //     },
      //   ],
      //   series: [
      //     {
      //       name: "",
      //       type: "line",
      //       //barWidth: '60%',
      //       data: this.changeHandlerY
      //       // [
      //       //   3.39,
      //       //   3.38,
      //       //   3.41,
      //       //   3.31,
      //       //   3.32,
      //       //   3.33,
      //       // ],
      //     },
      //   ],
      // };
      // chart5.setOption(option5);
      // window.addEventListener("resize", function() {
      //   chart5.resize();
      // });

      // let chart6 = this.$echarts.init(this.$refs.chart6);
      // let option6 = {
      //   title: {
      //     text: "最低温度探针号",
      //     textStyle: {
      //       fontSize: "14",
      //       color: "#3E526F",
      //       fontWeight: "600",
      //     },
      //   },
      //   color: ["#FC6579"],
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      //     },
      //   },
      //   grid: {
      //     left: "4%",
      //     right: "16%",
      //     bottom: "0",
      //     containLabel: true,
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       name: "(温度探针号)",
      //       nameTextStyle: {
      //         color: "#3E526F",
      //         padding: [25, 0, 0, -20],
      //       },
      //       //data: [0, 20, 40, 60, 80, 100],
      //       data: this.changeHandlerwX,
      //       // [
      //       //   "47",
      //       //   "48",
      //       // ],
      //       axisTick: {
      //         show: false,
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "#A7C6E0",
      //         },
      //       },
      //       axisLabel: {
      //         color: "#3E526F",
      //       },
      //       splitLine: {
      //         show: true,
      //         lineStyle: {
      //           color: "#DDECFA",
      //           width: 1,
      //         },
      //       },
      //     },
      //   ],
      //   yAxis: [
      //     {
      //       //name: 'x10⁵',
      //       //type: 'value',
      //       name: "(频次)",
      //       type: "value",
      //       nameTextStyle: {
      //         color: "#3E526F",
      //         padding: [0, 25, 0, 0],
      //       },
      //       axisTick: {
      //         show: false,
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "#A7C6E0",
      //         },
      //       },
      //       axisLabel: {
      //         color: "#3E526F",
      //       },
      //       splitLine: {
      //         show: true,
      //         lineStyle: {
      //           color: "#DDECFA",
      //           width: 1,
      //         },
      //       },
      //       min: 10,
      //     },
      //   ],
      //   series: [
      //     {
      //       name: "",
      //       type: "line",
      //       //barWidth: '50',
      //       data: this.changeHandlerwY
      //       // [
      //       //   12,
      //       //   14,
      //       //   11,
      //       //   15,
      //       //   16,
      //       //   15,
      //       // ],
      //     },
      //   ],
      // };
      // chart6.setOption(option6);
      // window.addEventListener("resize", function() {
      //   chart6.resize();
      // });
    },
    // draw () {
    //   let chart1 = this.$echarts.init(this.$refs.chart1);
    //   let option1 = {
    //     tooltip: {
    //       trigger: "axis",
    //       confine: true,
    //     },
    //     title: {
    //       show: false,
    //       text: "最高电压/最低电压（V）",
    //       textStyle: {
    //         fontSize: "14",
    //         color: "#3E526F",
    //         fontWeight: "600",
    //       },
    //     },
    //     legend: [
    //       {
    //         icon: "",
    //         textStyle: {
    //           fontSize: "12",
    //           color: "#3E526F",
    //           lineHeight: 15,
    //         },
    //         data: this.sittingHeadL,
    //         x: "left",
    //         itemWidth: 16,
    //         itemHeight: 10,
    //         orient: "horizontal",
    //         itemGap: 10,
    //       },
    //       {
    //         icon: "",
    //         textStyle: {
    //           fontSize: "12",
    //           color: "#3E526F",
    //           lineHeight: 15,
    //         },
    //         data: this.sittingHeadR,
    //         x: "right",
    //         itemWidth: 16,
    //         itemHeight: 10,
    //         orient: "horizontal",
    //         itemGap: 10,
    //       },
    //     ],
    //     grid: {
    //       top: 50,
    //       left: "3%",
    //       right: "4%",
    //       bottom: "25",
    //       containLabel: true,
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {
    //           show: false,
    //         },
    //       },
    //     },
    //     xAxis: {
    //       type: "category",
    //       boundaryGap: false,
    //       axisTick: {
    //         show: false,
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: "#A7C6E0",
    //         },
    //       },
    //       axisLabel: {
    //         color: "#3E526F",
    //       },
    //       splitLine: {
    //         show: true,
    //         lineStyle: {
    //           color: "#DDECFA",
    //           width: 1,
    //         },
    //       },
    //     },
    //     yAxis: [
    //       {
    //         type: "value",
    //         // name: '最高电压/最低电压（V）',
    //         // nameTextStyle: {
    //         //     fontSize: '14',
    //         //     color: '#3E526F',
    //         //     fontWeight: '600',
    //         //     padding: [0, 0, 0, 30]
    //         // },
    //         // splitNumber: 2,
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         min: 3.2,
    //       },
    //       {
    //         type: "value",
    //         // name: '最高温度/最低温度（°C）',
    //         // nameTextStyle: {
    //         //     fontSize: '14',
    //         //     color: '#3E526F',
    //         //     fontWeight: '600',
    //         //     padding: [0, 20, 0, 0]
    //         // },
    //         // splitNumber: 2,
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: false,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         // min: 20,
    //       },
    //     ],
    //     dataZoom:
    //       [
    //         {
    //           show: true,
    //           height: 4,
    //           xAxisIndex: [0],
    //           bottom: "6",
    //           start: 20,
    //           end: 80,
    //           handleSize: 20,
    //           handleIcon:
    //             "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
    //           //handleSize: '110%',
    //           handleStyle: {
    //             color: "transparent",
    //           },
    //           textStyle: {
    //             color: "transparent",
    //           },
    //           borderColor: "transparent",
    //           backgroundColor: "#EEEFF3",
    //           dataBackground: {
    //             lineStyle: {
    //               width: 0,
    //             },
    //             areaStyle: {
    //               color: "transparent",
    //             },
    //           },
    //           fillerColor: "#C3C6D1",
    //         },
    //         {
    //           type: "inside",
    //           show: true,
    //         },
    //       ],
    //     series: this.series,
    //   };
    //   // console.log("点位", option1.series[2].data.length);
    //   chart1.setOption(option1);

    //   this.chart1Data = chart1.getDataURL({
    //     type: 'png',
    //     pixelRatio: 2,
    //     backgroundColor: '#fff'      }
    //   );
    //   // this.imgData = img
    //   window.addEventListener("resize", function() {
    //     chart1.resize();
    //   });
    //   let chart2 = this.$echarts.init(this.$refs.chart2);
    //   let option2 = {
    //     title: {
    //       text: "最高电压单体号",
    //       textStyle: {
    //         fontSize: "14",
    //         color: "#3E526F",
    //         fontWeight: "600",
    //       },
    //     },
    //     color: ["#326FF8"],
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //       },
    //     },
    //     grid: {
    //       left: "8%",
    //       right: "8%",
    //       bottom: "0",
    //       containLabel: true,
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         // data: [0, 20, 40, 60, 80, 100],
    //         data: this.changeHandlerX,

    //         name: "(单体电芯号)",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [25, 0, 0, -20],
    //         },
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         //name: 'x10⁴',
    //         name: "(频次)",
    //         type: "value",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [0, 25, 0, 0],
    //         },
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         min: 3.2,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "",
    //         type: "line",
    //         //barWidth: '60%',
    //         data: this.changeHandlerY
    //       },
    //     ],
    //   };
    //   chart2.setOption(option2);
    //   this.chart2Data = chart2.getDataURL({
    //     type: 'png',
    //     pixelRatio: 2,
    //     backgroundColor: '#fff'      }
    //   );
    //   window.addEventListener("resize", function() {
    //     chart2.resize();
    //   });

    //   //最低电压
    //   let chart21 = this.$echarts.init(this.$refs.chart21);
    //   let option21 = {
    //     title: {
    //       text: "最低电压单体号",
    //       textStyle: {
    //         fontSize: "14",
    //         color: "#3E526F",
    //         fontWeight: "600",
    //       },
    //     },
    //     color: ["#326FF8"],
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //       },
    //     },
    //     grid: {
    //       left: "8%",
    //       right: "8%",
    //       bottom: "0",
    //       containLabel: true,
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         name: "(单体电芯号)",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [25, 0, 0, -20],
    //         },
    //         // data: [0, 20, 40, 60, 80, 100],
    //         data: this.changeHandlerX,

    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         //name: 'x10⁴',
    //         //type: 'value',
    //         name: "(频次)",
    //         type: "value",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [0, 25, 0, 0],
    //         },
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         min: 3.2,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "",
    //         type: "line",
    //         // barWidth: '60%',
    //         data: this.changeHandlerY
    //       },
    //     ],
    //   };
    //   chart21.setOption(option21);
    //   window.addEventListener("resize", function() {
    //     chart21.resize();
    //   });
    //   //最高温度
    //   let chart3 = this.$echarts.init(this.$refs.chart3);
    //   let option3 = {
    //     title: {
    //       text: "最高温度探针号",
    //       textStyle: {
    //         fontSize: "14",
    //         color: "#3E526F",
    //         fontWeight: "600",
    //       },
    //     },
    //     color: ["#FC6579"],
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //       },
    //     },
    //     grid: {
    //       left: "4%",
    //       right: "8%",
    //       bottom: "0",
    //       containLabel: true,
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         name: "(温度探针号)",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [25, 0, 0, -20],
    //         },
    //         // data: [0, 20, 40, 60, 80, 100],
    //         data: this.changeHandlerwX,
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         //name: 'x10⁵',
    //         //type: 'value',
    //         name: "(频次)",
    //         type: "value",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [0, 25, 0, 0],
    //         },
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         min: 13,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "",
    //         type: "line",
    //         //barWidth: '50',
    //         data: this.changeHandlerwY
    //       },
    //     ],
    //   };
    //   chart3.setOption(option3);
    //   this.chart3Data = chart3.getDataURL({
    //     type: 'png',
    //     pixelRatio: 2,
    //     backgroundColor: '#fff'      }
    //   );
    //   window.addEventListener("resize", function() {
    //     chart3.resize();
    //   });

    //   let chart31 = this.$echarts.init(this.$refs.chart31);
    //   let option31 = {
    //     title: {
    //       text: "最低温度探针号",
    //       textStyle: {
    //         fontSize: "14",
    //         color: "#3E526F",
    //         fontWeight: "600",
    //       },
    //     },
    //     color: ["#FC6579"],
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //       },
    //     },
    //     grid: {
    //       left: "4%",
    //       right: "8%",
    //       bottom: "0",
    //       containLabel: true,
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         name: "(温度探针号)",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [25, 0, 0, -20],
    //         },
    //         //data: [0, 20, 40, 60, 80, 100],
    //         // data:['2019/7/11 1:14:00','2019/7/11 1:16:00','2019/7/11 1:18:00','2019/7/11 6:33:59','2019/7/11 6:35:00','2019/7/11 6:36:00','2019/7/11 6:38:00','2019/7/11 6:40:00','2019/7/11 6:42:00','2019/7/11 6:44:00'],
    //         data: this.changeHandlerwX,
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         // name: 'x10⁵',
    //         //type: 'value',
    //         name: "(频次)",
    //         type: "value",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [0, 25, 0, 0],
    //         },
    //         // nameTextStyle:{
    //         //     color:'#3E526F',
    //         //     padding: [0, 0, 0, 20]
    //         // },
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         min: 10,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "",
    //         type: "line",
    //         //barWidth: '50',
    //         data: this.changeHandlerwY
    //       },
    //     ],
    //   };
    //   chart31.setOption(option31);
    //   window.addEventListener("resize", function() {
    //     chart31.resize();
    //   });
    // },
    // drawBig () {
    //   let chart4 = this.$echarts.init(this.$refs.chart4);
    //   let option4 = {
    //     tooltip: {
    //       trigger: "axis",
    //       confine: true,
    //     },
    //     title: {
    //       show: false,
    //       text: "",
    //       textStyle: {
    //         fontSize: "14",
    //         color: "#3E526F",
    //         fontWeight: "600",
    //       },
    //     },
    //     legend: [
    //       {
    //         icon: "",
    //         textStyle: {
    //           fontSize: "12",
    //           color: "#3E526F",
    //         },
    //         data: ["最高电压"],
    //         x: "left",
    //         itemWidth: 16,
    //         itemHeight: 10,
    //       },
    //       {
    //         icon: "",
    //         textStyle: {
    //           fontSize: "12",
    //           color: "#3E526F",
    //         },
    //         data: ["最低温度"],
    //         x: "right",
    //         right: "20",
    //         itemWidth: 16,
    //         itemHeight: 10,
    //       },
    //     ],
    //     grid: {
    //       top: 50,
    //       left: "3%",
    //       right: "1%",
    //       bottom: "25",
    //       containLabel: true,
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {
    //           show: false,
    //         },
    //       },
    //     },
    //     xAxis: {
    //       type: "category",
    //       boundaryGap: false,
    //       axisTick: {
    //         show: false,
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: "#A7C6E0",
    //         },
    //       },
    //       axisLabel: {
    //         color: "#3E526F",
    //       },
    //       splitLine: {
    //         show: true,
    //         lineStyle: {
    //           color: "#DDECFA",
    //           width: 1,
    //         },
    //       },
    //     },
    //     yAxis: [
    //       {
    //         type: "value",
    //         // name: '最高电压/最低电压（V）',
    //         // nameTextStyle: {
    //         //     fontSize: '14',
    //         //     color: '#3E526F',
    //         //     fontWeight: '600',
    //         //     padding: [0, 0, 0, 30]
    //         // },
    //         // splitNumber: 2,
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         min: 3.2,
    //       },
    //       {
    //         type: "value",
    //         // name: '最高温度/最低温度（°C）',
    //         // nameTextStyle: {
    //         //     fontSize: '14',
    //         //     color: '#3E526F',
    //         //     fontWeight: '600',
    //         //     padding: [0, 20, 0, 0]
    //         // },
    //         // splitNumber: 2,
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: false,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         //min: 20,
    //       },
    //     ],
    //     dataZoom: [
    //       {
    //         show: true,
    //         height: 4,
    //         xAxisIndex: [0],
    //         bottom: "6",
    //         start: 20,
    //         end: 80,
    //         handleSize: 20,
    //         handleIcon:
    //           "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC",
    //         //handleSize: '110%',
    //         handleStyle: {
    //           color: "transparent",
    //         },
    //         textStyle: {
    //           color: "transparent",
    //         },
    //         borderColor: "transparent",
    //         backgroundColor: "#EEEFF3",
    //         dataBackground: {
    //           lineStyle: {
    //             width: 0,
    //           },
    //           areaStyle: {
    //             color: "transparent",
    //           },
    //         },
    //         fillerColor: "#C3C6D1",
    //       },
    //       {
    //         type: "inside",
    //         show: true,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "最高电压",
    //         type: "line",
    //         // data: [
    //         //     ['2019-09-08 07:19:25', 3.8],
    //         //     ['2019-09-08 07:26:25', 3.85],
    //         //     ['2019-09-08 07:30:40', 3.78],
    //         //     ['2019-09-08 07:50:22', 3.85],
    //         //     ['2019-09-08 07:56:30', 3.87],
    //         //     ['2019-09-08 08:06:25', 3.78],
    //         //     ['2019-09-08 08:15:45', 3.93],
    //         //     ['2019-09-08 08:19:21', 4.01],
    //         //     ['2019-09-08 08:20:25', 3.88],
    //         //     ['2019-09-08 08:39:25', 4.0],
    //         //     ['2019-09-08 09:19:25', 3.89]
    //         // ],
    //         data: this.handleSearchV,
    //         color: "#2763B7",
    //       },
    //       {
    //         name: "最低温度",
    //         type: "line",
    //         // data: [
    //         //     ['2019-09-08 07:19:25', 3.92],
    //         //     ['2019-09-08 07:26:25', 3.98],
    //         //     ['2019-09-08 07:30:40', 3.93],
    //         //     ['2019-09-08 07:50:22', 4.0],
    //         //     ['2019-09-08 07:56:30', 3.90],
    //         //     ['2019-09-08 08:06:25', 4.1],
    //         //     ['2019-09-08 08:15:45', 3.8],
    //         //     ['2019-09-08 08:19:21', 3.68],
    //         //     ['2019-09-08 08:20:25', 3.62],
    //         //     ['2019-09-08 08:39:25', 4.0],
    //         //     ['2019-09-08 09:19:25', 3.89]
    //         // ],
    //         data: this.handleSearchA,
    //         color: "#1890FF",
    //       },
    //       // {
    //       //   name: "最高温度",
    //       //   type: "line",
    //       //   data: [
    //       //     // ['2019-09-08 07:19:25', 25],
    //       //     // ['2019-09-08 07:26:25', 35],
    //       //     // ['2019-09-08 07:30:40', 38],
    //       //     // ['2019-09-08 07:50:22', 35],
    //       //     // ['2019-09-08 07:56:30', 32],
    //       //     // ['2019-09-08 08:06:25', 28],
    //       //     // ['2019-09-08 08:15:45', 23],
    //       //     // ['2019-09-08 08:19:21', 21],
    //       //     // ['2019-09-08 08:20:25',28],
    //       //     // ['2019-09-08 08:39:25', 40],
    //       //     // ['2019-09-08 09:19:25', 49]
    //       //     ["2019/7/11  1:14:00", 16],
    //       //     ["2019/7/11  1:16:00", 16],
    //       //     ["2019/7/11  1:18:00", 17],
    //       //     ["2019/7/11  6:33:59", 17],
    //       //     ["2019/7/11  6:35:00", 16],
    //       //     ["2019/7/11  6:36:00", 17],
    //       //     ["2019/7/11  6:38:00", 17],
    //       //     ["2019/7/11  6:40:00", 16],
    //       //     ["2019/7/11  6:42:00", 17],
    //       //     ["2019/7/11  6:44:00", 17],
    //       //     ["2019/7/11  6:45:00", 17],
    //       //     ["2019/7/11  6:47:00", 16],
    //       //     ["2019/7/11  6:49:00", 17],
    //       //     ["2019/7/11  6:51:00", 17],
    //       //     ["2019/7/11  6:53:59", 17],
    //       //     ["2019/7/11  6:54:00", 17],
    //       //     ["2019/7/11  6:56:00", 16],
    //       //     ["2019/7/11  6:58:00", 17],
    //       //     ["2019/7/11  7:00:00", 17],
    //       //     ["2019/7/11  7:02:00", 16],
    //       //     ["2019/7/11  7:03:00", 16],
    //       //     ["2019/7/11  7:05:00", 17],
    //       //     ["2019/7/11  7:07:00", 16],
    //       //     ["2019/7/11  7:09:00", 17],
    //       //     ["2019/7/11  7:11:59", 17],
    //       //     ["2019/7/11  7:12:00", 17],
    //       //     ["2019/7/11  7:14:00", 17],
    //       //     ["2019/7/11  7:16:00", 17],
    //       //     ["2019/7/11  7:18:00", 16],
    //       //     ["2019/7/11  7:20:00", 17],
    //       //     ["2019/7/11  7:21:00", 17],
    //       //     ["2019/7/11  7:23:00", 17],
    //       //     ["2019/7/11  7:25:00", 16],
    //       //     ["2019/7/11  7:27:00", 17],
    //       //     ["2019/7/11  7:29:00", 17],
    //       //     ["2019/7/11  7:30:00", 16],
    //       //     ["2019/7/11  7:32:00", 16],
    //       //     ["2019/7/11  7:34:00", 17],
    //       //     ["2019/7/11  7:36:00", 17],
    //       //     ["2019/7/11  7:38:00", 16],
    //       //     ["2019/7/11  7:39:00", 17],
    //       //   ],
    //       //   color: "#FC6579",
    //       //   yAxisIndex: 1,
    //       // },
    //       // {
    //       //   name: "最低温度",
    //       //   type: "line",
    //       //   data: [
    //       //     // ['2019-09-08 07:19:25', 35],
    //       //     // ['2019-09-08 07:26:25', 39],
    //       //     // ['2019-09-08 07:30:40', 33],
    //       //     // ['2019-09-08 07:50:22', 40],
    //       //     // ['2019-09-08 07:56:30', 30],
    //       //     // ['2019-09-08 08:06:25', 41],
    //       //     // ['2019-09-08 08:15:45', 38],
    //       //     // ['2019-09-08 08:19:21', 36],
    //       //     // ['2019-09-08 08:20:25', 32],
    //       //     // ['2019-09-08 08:39:25', 40],
    //       //     // ['2019-09-08 09:19:25', 39]
    //       //     ["2019/7/11  1:14:00", 15],
    //       //     ["2019/7/11  1:16:00", 15],
    //       //     ["2019/7/11  1:18:00", 15],
    //       //     ["2019/7/11  6:33:59", 15],
    //       //     ["2019/7/11  6:35:00", 16],
    //       //     ["2019/7/11  6:36:00", 16],
    //       //     ["2019/7/11  6:38:00", 12],
    //       //     ["2019/7/11  6:40:00", 15],
    //       //     ["2019/7/11  6:42:00", 15],
    //       //     ["2019/7/11  6:44:00", 15],
    //       //     ["2019/7/11  6:45:00", 16],
    //       //     ["2019/7/11  6:47:00", 15],
    //       //     ["2019/7/11  6:49:00", 15],
    //       //     ["2019/7/11  6:51:00", 15],
    //       //     ["2019/7/11  6:53:59", 16],
    //       //     ["2019/7/11  6:54:00", 16],
    //       //     ["2019/7/11  6:56:00", 15],
    //       //     ["2019/7/11  6:58:00", 15],
    //       //     ["2019/7/11  7:00:00", 15],
    //       //     ["2019/7/11  7:02:00", 15],
    //       //     ["2019/7/11  7:03:00", 15],
    //       //     ["2019/7/11  7:05:00", 15],
    //       //     ["2019/7/11  7:07:00", 16],
    //       //     ["2019/7/11  7:09:00", 16],
    //       //     ["2019/7/11  7:11:59", 15],
    //       //     ["2019/7/11  7:12:00", 15],
    //       //     ["2019/7/11  7:14:00", 15],
    //       //     ["2019/7/11  7:16:00", 15],
    //       //     ["2019/7/11  7:18:00", 15],
    //       //     ["2019/7/11  7:20:00", 15],
    //       //     ["2019/7/11  7:21:00", 15],
    //       //     ["2019/7/11  7:23:00", 15],
    //       //     ["2019/7/11  7:25:00", 15],
    //       //     ["2019/7/11  7:27:00", 15],
    //       //     ["2019/7/11  7:29:00", 15],
    //       //     ["2019/7/11  7:30:00", 15],
    //       //     ["2019/7/11  7:32:00", 15],
    //       //     ["2019/7/11  7:34:00", 16],
    //       //     ["2019/7/11  7:36:00", 15],
    //       //     ["2019/7/11  7:38:00", 15],
    //       //     ["2019/7/11  7:39:00", 16],
    //       //   ],
    //       //   color: "#CE0013",
    //       //   yAxisIndex: 1,
    //       // },
    //     ],
    //   };
    //   chart4.setOption(option4);
    //   window.addEventListener("resize", function() {
    //     chart4.resize();
    //   });
    //   let chart5 = this.$echarts.init(this.$refs.chart5);
    //   let option5 = {
    //     title: {
    //       text: "最高电压单体号",
    //       textStyle: {
    //         fontSize: "14",
    //         color: "#3E526F",
    //         fontWeight: "600",
    //       },
    //     },
    //     color: ["#326FF8"],
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //       },
    //     },
    //     grid: {
    //       left: "8%",
    //       right: "16%",
    //       bottom: "0",
    //       containLabel: true,
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         name: "(单体电芯号)",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [25, 0, 0, -20],
    //         },
    //         // data: [0, 20, 40, 60, 80, 100],
    //         data: this.changeHandlerX,
    //         // [
    //         //   "92",
    //         //   "93",
    //         //   "94",
    //         //   "95",
    //         //   "96",
    //         // ],
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         //name: 'x10⁴',
    //         //type: 'value',
    //         name: "(频次)",
    //         type: "value",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [0, 25, 0, 0],
    //         },
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         min: 3.2,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "",
    //         type: "line",
    //         //barWidth: '60%',
    //         data: this.changeHandlerY
    //         // [
    //         //   3.39,
    //         //   3.38,
    //         //   3.41,
    //         //   3.31,
    //         //   3.32,
    //         //   3.33,
    //         // ],
    //       },
    //     ],
    //   };
    //   chart5.setOption(option5);
    //   window.addEventListener("resize", function() {
    //     chart5.resize();
    //   });

    //   let chart6 = this.$echarts.init(this.$refs.chart6);
    //   let option6 = {
    //     title: {
    //       text: "最低温度探针号",
    //       textStyle: {
    //         fontSize: "14",
    //         color: "#3E526F",
    //         fontWeight: "600",
    //       },
    //     },
    //     color: ["#FC6579"],
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         // 坐标轴指示器，坐标轴触发有效
    //         type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    //       },
    //     },
    //     grid: {
    //       left: "4%",
    //       right: "16%",
    //       bottom: "0",
    //       containLabel: true,
    //     },
    //     xAxis: [
    //       {
    //         type: "category",
    //         name: "(温度探针号)",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [25, 0, 0, -20],
    //         },
    //         //data: [0, 20, 40, 60, 80, 100],
    //         data: this.changeHandlerwX,
    //         // [
    //         //   "47",
    //         //   "48",
    //         // ],
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         //name: 'x10⁵',
    //         //type: 'value',
    //         name: "(频次)",
    //         type: "value",
    //         nameTextStyle: {
    //           color: "#3E526F",
    //           padding: [0, 25, 0, 0],
    //         },
    //         axisTick: {
    //           show: false,
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "#A7C6E0",
    //           },
    //         },
    //         axisLabel: {
    //           color: "#3E526F",
    //         },
    //         splitLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "#DDECFA",
    //             width: 1,
    //           },
    //         },
    //         min: 10,
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "",
    //         type: "line",
    //         //barWidth: '50',
    //         data: this.changeHandlerwY
    //         // [
    //         //   12,
    //         //   14,
    //         //   11,
    //         //   15,
    //         //   16,
    //         //   15,
    //         // ],
    //       },
    //     ],
    //   };
    //   chart6.setOption(option6);
    //   window.addEventListener("resize", function() {
    //     chart6.resize();
    //   });
    // },
  },
  mounted () {
    // this.changeHandler(1)
    // this.changeHandlerW(3)
    // let chart1 = document.getElementById("chart1");
    let chart1 = this.$refs.chart1;
    chart1.style.width = window.outerWidth + "px";
    chart1.style.height = window.outerHeight / 4 + 70 + "px";
    // echarts.init(chart1);
    let chart2 = this.$refs.chart2;
    chart2.style.height = window.outerHeight / 4 + "px";
    // echarts.init(chart2);
    let chart3 = this.$refs.chart3;
    chart3.style.height = window.outerHeight / 4 + "px";
    // echarts.init(chart3);
    let chart21 = this.$refs.chart21;
    chart21.style.width = window.outerWidth / 2 - 70 + "px";
    chart21.style.height = window.outerHeight / 4 + "px";
    // echarts.init(chart21);
    let chart31 = this.$refs.chart31;
    chart31.style.width = window.outerWidth / 2 - 70 + "px";
    chart31.style.height = window.outerHeight / 4 + "px";
    // echarts.init(chart31);
    this.draw(true);
    let chart4 = document.getElementById("chart4");
    chart4.style.width = window.outerWidth - 150 + "px";
    chart4.style.height = window.outerHeight / 2 - 150 + "px";
    // echarts.init(chart4);
    let chart5 = document.getElementById("chart5");
    chart5.style.width = window.outerWidth / 2 - 70 + "px";
    chart5.style.height = window.outerHeight / 2 - 150 + "px";
    // echarts.init(chart5);
    let chart6 = document.getElementById("chart6");
    chart6.style.width = window.outerWidth / 2 - 70 + "px";
    chart6.style.height = window.outerHeight / 2 - 150 + "px";
    // echarts.init(chart6);
  },
};
</script>
<style lang="less" scoped>
/deep/div.v-dropdown-caller.v-dropdown-caller--full-width {
  width: 220px;
}
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
  margin: 10px auto;
  overflow: hidden;
  width: 98%;
  //min-width: 1662px;
}
.handle-box {
  margin-top: 10px;
  width: 100%;
  padding: 15px 15px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  .box {
    width: 100%;
    margin: 0 auto;
    // margin-top: 10px;
    // padding-top: 5px;
    overflow: hidden;
    span {
      display: inline-block;
      // float: left;
      text-align: right;
      margin-right: 8px;
      color: #3e526f;
    }
  }
}
.echartsCon {
  margin: 0 auto;
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
  justify-content: flex-end;
  .dcBtn {
    margin-left: 8px;
    width: 86px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(63, 83, 110, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 223, 236, 1);
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    img {
      margin-top: 8px;
      display: block;
      margin-left: 12px;
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
  }
  .showQp {
    margin-left: 8px;
    margin-bottom: 13px;
    width: 104px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    justify-items: center;
    cursor: pointer;
    img {
      margin-top: 8px;
      margin-left: 10px;
      width: 18px;
      height: 18px;
    }
    span {
      margin-right: 20px;
    }
  }
}
.eBoxs {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 12px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.editB {
  margin-top: 33px;
  height: 66px;
  padding: 17px;
  background: rgba(254, 254, 254, 1);
  box-shadow: 4px 0px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  .tips {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(62, 82, 111, 1);
  }
  .inbox {
    float: left;
    margin-top: 10px;
    width: 78%;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px 0px 0px 4px;
    border: 1px solid rgba(215, 229, 239, 1);
    text-indent: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(141, 171, 196, 1);
  }
  .edBtn {
    float: left;
    margin-top: 10px;
    width: 15%;
    height: 34px;
    background: rgba(255, 255, 255, 1);
    border-radius: 0px 4px 4px 0px;
    border: 1px solid rgba(220, 223, 230, 1);
    border-left: none;
    img {
      display: block;
      margin: 0 auto;
      margin-top: 8px;
      width: 18px;
      height: 18px;
    }
  }
}
.title {
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(63, 83, 110, 1);
}
.showQp2 {
  float: right;
  margin-right: 20px;
  width: 172px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  // margin-bottom: 10px;
  cursor: pointer;
}
/deep/.el-form-item {
  margin-bottom: 1px;
  margin-right: 20px;
}
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 32px !important;
  line-height: 32px !important;
  outline: 0;
  padding: 0 28px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  // width: 100%;
  width: 220px;
}

.searBtnTime {
  padding: 0 4px !important;
  height: 25px;
  background: rgba(245, 245, 245, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(62, 82, 111, 1);
}
.rselectDy,
.rselectWd {
  width: 300px;
  margin: 10px auto;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(62, 82, 111, 1);
}
.titBoth {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: rgba(62, 82, 111, 1);
  overflow: hidden;
}
/deep/.el-dialog__header {
  padding: 15px 15px 10px;
  background: rgba(250, 251, 252, 1);
  box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
  border-radius: 8px 8px 0px 0px;
}
/deep/.el-dialog__title {
  line-height: 24px;
  font-size: 16px !important;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(43, 64, 91, 1) !important;
}
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #8dabc4;
  line-height: 40px;
  padding: 0 12px 0 24px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/deep/.el-breadcrumb__inner.is-link {
  font-weight: 700;
  text-decoration: none;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: rgba(141, 171, 196, 1) !important;
}
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: rgba(43, 64, 91, 1);
  cursor: text;
}

.choseBtnold {
  position: absolute;
  z-index: 10;
  opacity: 0;
  right: 0;
  top: 5px;
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
  margin-top: 5px;
}
.filIn {
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  outline: 0;
  padding: 0 15px;
}
/deep/.customWidth2 {
  // width:30% !important;
  width: 480px;
}
/deep/.el-dialog__footer {
  border-top: 1px solid #eeeeee;
  padding: 10px 20px 10px;
}
/deep/.el-form-item::after,
.el-form-item::before {
  display: inline !important;
}

/deep/.el-form-item::after,
.el-form-item::before {
  display: inline !important;
}
/deep/.el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}
/deep/.el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}
/deep/.el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}
</style>
