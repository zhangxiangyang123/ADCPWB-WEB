<template>
  <div class="wrap">
    <toph v-bind:active="active"></toph>
    <div class="main">
      <el-breadcrumb separator="/"
                     style="margin-left:12px;">
        <el-breadcrumb-item :to="{ path: '/portrait' }">电池画像</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>电芯数据可视化</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div style='background: #FFFFFF;' v-if="showRentPrise">
        <!-- 搜索工具栏 -->
        <div class="handle-box">
          <div class="box">
            <el-col :span="24" class="toolbar">
              <div class="titles">电芯数据可视化</div>
              <el-form style="padding: 0 14px;height: 52px;line-height: 52px;" :inline="true" :model="filters" ref="filters">
                <el-form-item prop="name">
                  <span>车型</span>
                  <v-selectpage :data="filters.carOptions" v-model="filters.name" sort="name" placeholder='请选择一个车型' @values="singleValues">
                  </v-selectpage>
                </el-form-item>
                <el-form-item prop="carN">
                  <span style="margin-left: 13px;">车辆VIN</span>
                  <v-selectpage :data="filters.carList" v-model="filters.carN" sort="name" placeholder='请选择一个车辆VIN' @values="singleValues">
                  </v-selectpage>
                </el-form-item>
                <el-form-item style="float: right;line-height: 48px;">
                  <el-button type="primary" @click="handleSearch" size="mini" style="height:32px;">搜索
                  </el-button>
                  <el-button type="info" size="mini" @click="resetForm" style="margin-left: 0px;height: 32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);">重置
                  </el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </div>
        </div>
        <div class="tabTitle" >
          <span :class="{'tab': true, 'tab1': tab1}" @click="changeTab(1)">电压</span>
          <span :class="{'tab': true, 'tab1': tab2}" @click="changeTab(2)">温度</span>
          <span class="but1" @click="changeStatusqp">
            <img src="../../assets/images/icon_qp.png" alt/>
            <span>全屏</span>
          </span>
        </div>
        <div class="tabContent" v-if="showTab">
          <div class="tabContent1">
            <div class="tabContent_title" v-if="show">
              <span></span>
              <span>最高单体电压</span>
              <span></span>
              <span>最低单体电压</span>
            </div>
            <div v-if="!show"><img src="../../assets/images/noDataGraph.png" alt="" class="img1">
            <div class="tabContent_1" v-if="show">
              <div v-for="item in cellCoreList" :key="item+'a'">
                <p v-if="dataAB[item]" class="titleColor">{{item}}</p>
                <p v-if="dataAB[item]">
                  <span v-for="(i, key) in dataAB[item]" :key="key+'c'" class="span">{{i}}</span>
                </p>
                <span v-if="!dataAB[item]" class="span1">
                  <img src="../../assets/images/aaa.png" alt="">暂无数据
                </span>
              </div>
            </div>
            </div>
          </div>
          <div class="tabContent2">
            <div style="" id="chart1" ref="chart1"></div>
            <div id="chart2" ref="chart2"></div>
          </div>
        </div>
        <div class="tabContent" v-if="!showTab">
          <div class="tabContent1">
            <div class="tabContent_title">
              <span></span>
              <span>最高温度</span>
              <span></span>
              <span>最低温度</span>
            </div>
            <div class="tabContent_1" v-if="show">
              <div v-for="item in cellCoreList" :key="item+'a'">
                <p v-if="probeTemperature[item]" class="titleColor">{{item}}</p>
                <p v-if="probeTemperature[item]">
                  <span v-for="(i, key) in probeTemperature[item]" :key="key+'c'" class="span">{{i}}</span>
                </p>
                <span v-if="!probeTemperature[item]" class="span1">
                  <img src="../../assets/images/aaa.png" alt="">暂无数据
                </span>
              </div>
            </div>
          </div>
          <div class="tabContent2">
            <div style="" id="chart3" ref="chart3"></div>
            <div id="chart4" ref="chart4"></div>
          </div>
        </div>
      </div>
      <!-- 电压全屏 -->
      <div class="main" v-if="showRentPrise2">
        <!-- 图表区域 -->
        <div class="echartsCon">
          <div class="tabContent">
            <div class="tabContent1" >
              <div class="tabContent_title">
                <span></span>
                <span>最高单体电压</span>
                <span></span>
                <span>最低单体电压</span>
              </div>
              <div class="tabContent_1">
                <div v-for="item in cellCoreList" :key="item+'a'">
                  <p v-if="dataAB[item]" class="titleColor">{{item}}</p>
                  <p v-if="dataAB[item]">
                    <span v-for="(i, key) in dataAB[item]" :key="key+'c'" class="span">{{i}}</span>
                  </p>
                  <span v-if="!dataAB[item]" class="span1">
                  <img src="../../assets/images/aaa.png" alt="">暂无数据
                </span>
                </div>
              </div>
            </div>
            <div class="tabContent2">
              <div style="" id="chart5" ref="chart5"></div>
              <div id="chart6" ref="chart6"></div>
            </div>
          </div>
          <div class="showQp2" @click="changeStatustqp">
            <span>单击或ESC退出全屏模式</span>
          </div>
          <div style="clear:both;"></div>
        </div>
        <!-- 图表区域 -->
      </div>
      <!-- 温度全屏 -->
      <div class="main" v-if="showRentPrise3">
        <!-- 图表区域 -->
        <div class="echartsCon">
          <div class="tabContent">
            <div class="tabContent1">
              <div class="tabContent_title">
                <span></span>
                <span>最高温度</span>
                <span></span>
                <span>最低温度</span>
              </div>
              <div class="tabContent_1">
                <div v-for="item in cellCoreList" :key="item+'a'">
                  <p v-if="probeTemperature[item]" class="titleColor">{{item}}</p>
                  <p v-if="probeTemperature[item]">
                    <span v-for="(i, key) in probeTemperature[item]" :key="key+'c'" class="span">{{i}}</span>
                  </p>
                  <span v-if="!probeTemperature[item]" class="span1">
                  <img src="../../assets/images/aaa.png" alt="">暂无数据
                </span>
                </div>
              </div>
            </div>
            <div class="tabContent2">
              <div style="" id="chart7" ref="chart7"></div>
              <div id="chart8" ref="chart8"></div>
            </div>
          </div>
          <div class="showQp2" @click="changeStatustqp2">
            <span>单击或ESC退出全屏模式</span>
          </div>
          <div style="clear:both;"></div>
        </div>
        <!-- 图表区域 -->
      </div>
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import echarts from "echarts";
import {SelectPage} from 'v-selectpage'
import {getData1} from "@/api/cellCore";
import {getVehiclesList, getVehiclesListViN} from "@/api/pack"
export default {
  components: {
    toph, SelectPage
  },
  data() {
    return {
      show:false,
      showTab: true,
      tab1: true,
      tab2: false,
      cellCoreList: [1, 6, 7, 12, 13, 18, 19, 24, 2, 5, 8, 11, 14, 17, 20, 23, 3, 4, 9, 10, 15, 16, 21, 22],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      probeTemperature: [],
      showRentPrise: true,
      showRentPrise2: false,
      showRentPrise3: false,
      active: 3,
      dataAB: [],
      n: 1,
      filters: {
        carList: [],// 车辆vin
        carOptions: [],//车型下拉框
        name: "",
        carN: "",
      },
    };
  },
  created() {
    // this.init()
    this.getVehiclesList()
  },
  methods: {
    // 获取所有车型
    getVehiclesList() {
      let params = {
        orgId: 'CLEYQP8C27',
        // vehicleType: '车型1'
      }
      getVehiclesList(params).then(res => {
        this.filters.carOptions = []
        let _this = this
        res.data.data.forEach(function (e) {
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
    changeTab(data) {
      if (data === 1) {
        this.tab1 = true
        this.tab2 = false
        this.showTab = true
        this.draw1()
      } else if(data === 2) {
        this.tab2 = true
        this.tab1 = false
        this.showTab = false
        this.draw2()
      }
    },
    singleValues() {
    },
    init(data1, data2) {
      // if(data2 !== 'LGJE13EA8HM612688') {
      //   this.$message("暂无数据")
      //   return
      // }
      data1 = ''
      // data2 = 'LGJE13EA8HM612688'
      data2 = this.filters.carN
      let param = {
        type: '0',//类型
        vehicleType: data1,//
        vin: data2//
      }
      let params = {
        type: '1',//类型
        vehicleType: data1,//
        vin: data2//
      }
      getData1(param).then(res => {
        if (res.data.ok) {
          if (JSON.stringify(res.data.data) === '{}') {
            this.$message('暂无数据')
          } else {
            this.data1 = res.data.data.averageModuleCellVoltages;
            this.data2 = res.data.data.differenceModuleCellVoltages;
            // 电芯数据
            this.dataAB = res.data.data.cellVoltage;
            this.draw1()
          }
        }


      })
      getData1(params).then(res => {
        if (res.data.ok) {
          this.data3 = res.data.data.averageModuleProbeTemperature;
          this.data4 = res.data.data.differenceModuleProbeTemperature;
          this.probeTemperature = res.data.data.probeTemperature;
          this.draw2()
        }
      })
    },
    handleSearch() {
      if (!this.filters.carN) {
        this.$message("请选择vin")
        return
      }
      this.show = true;
      this.init(this.filters.name, this.filters.carN)
    },
    resetForm() {
      this.show = false;
      this.filters.name = '';
      this.filters.carOptions = '';
      this.$refs.filters.resetFields();
    },
    changeStatusqp() {
      this.showRentPrise = false;
      this.showRentPrise2 = false;
      this.showRentPrise3 = false;
      if (this.showTab) {
        this.showRentPrise2 = true;
        this.drawBig()
      } else {
        this.showRentPrise3 = true;
        this.drawBig1()
      }
    },
    changeStatustqp() {
      this.showRentPrise = true;
      this.showRentPrise2 = false;
      this.draw1()
    },
    changeStatustqp2() {
      this.showRentPrise = true;
      this.showRentPrise3 = false;
      this.draw2()
    },
    draw1() {
      this.$nextTick(function(){
        let chart1 = this.$echarts.init(document.getElementById('chart1'));
        let option1 = {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          title: {
            show: true,
            text: "模组号",
            textStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            left: "center",
            bottom: 0,
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30,
          },
          grid: {
            top: 20,
            left: "50",
            right: "4%",
            bottom: "40",
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
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
            ],
          },
          yAxis: {
            type: "value",
            name: "总电压/V",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            splitNumber: 4,
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
            // min: 15,
          },
          dataZoom: [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "28",
              start: 0,
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
          series: [
            {
              name: "",
              type: "line",
              data: this.data1,
              color: "#F2637B",
            },
          ],
        };
        chart1.clear()
        chart1.setOption(option1);
        let chart2 = this.$echarts.init(this.$refs.chart2);
        let option2 = {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          title: {
            show: true,
            text: "模组号",
            textStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            x: "center",
            bottom: 0,
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30,
          },
          grid: {
            top: 20,
            left: "50",
            right: "4%",
            bottom: "40",
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
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
            ],
          },
          yAxis: {
            type: "value",
            name: "压差/mv",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            // splitNumber: 2,
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
            // min: 1.56
          },
          dataZoom: [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "28",
              start: 0,
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
          series: [
            {
              name: "",
              type: "line",
              data: this.data2,
              color: "#326FF8",
            },
          ],
        };
        chart2.clear()
        chart2.setOption(option2);
      })
    },
    //温度
    draw2() {
      //温度
      this.$nextTick(function(){
        let chart3 = this.$echarts.init(this.$refs.chart3);
        let option3 = {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          title: {
            show: true,
            text: "模组号",
            textStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            left: "center",
            bottom: 0,
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30,
          },
          grid: {
            top: 20,
            left: "50",
            right: "4%",
            bottom: "40",
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
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
            ],
          },
          yAxis: {
            type: "value",
            name: "平均温度/°C",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            splitNumber: 2,
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
          dataZoom: [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "28",
              start: 0,
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
          series: [
            {
              name: "",
              type: "line",
              data: this.data3,
              color: "#F2637B",
            },
          ],
        };
        chart3.clear()
        chart3.setOption(option3);
        let chart4 = this.$echarts.init(this.$refs.chart4);
        let option4 = {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          title: {
            show: true,
            text: "模组号",
            textStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            x: "center",
            bottom: 0,
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30,
          },
          grid: {
            top: 20,
            left: "50",
            right: "4%",
            bottom: "40",
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
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
            ],
          },
          yAxis: {
            type: "value",
            name: "温度差/°C",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            splitNumber: 2,
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
            // min: 1.56
          },
          dataZoom: [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "28",
              start: 0,
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
          series: [
            {
              name: "",
              type: "line",
              data: this.data4,
              color: "#326FF8",
            },
          ],
        };
        chart4.clear()
        chart4.setOption(option4);
      })
    },
    drawBig() {
      this.$nextTick(function(){
        let chart5 = this.$echarts.init(this.$refs.chart5);
        let option5 = {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          title: {
            show: true,
            text: "模组号",
            textStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            left: "center",
            bottom: 0,
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30,
          },
          grid: {
            top: 20,
            left: "50",
            right: "4%",
            bottom: "40",
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
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
            ],
          },
          yAxis: {
            type: "value",
            name: "总电压/v",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            // splitNumber: 2,
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
          dataZoom: [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "28",
              start: 0,
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
          series: [
            {
              name: "",
              type: "line",
              data: this.data1,
              color: "#F2637B",
            },
          ],
        };
        chart5.clear()
        chart5.setOption(option5);
        let chart6 = this.$echarts.init(this.$refs.chart6);
        let option6 = {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          title: {
            show: true,
            text: "模组号",
            textStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            x: "center",
            bottom: 0,
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30,
          },
          grid: {
            top: 20,
            left: "50",
            right: "4%",
            bottom: "40",
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
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
            ],
          },
          yAxis: {
            type: "value",
            name: "压差/mv",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            // splitNumber: 2,
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
            // min: 1.56
          },
          dataZoom: [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "28",
              start: 0,
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
          series: [
            {
              name: "",
              type: "line",
              data: this.data2,
              color: "#326FF8",
            },
          ],
        };
        chart6.clear()
        chart6.setOption(option6);
      })
    },
    drawBig1() {
      this.$nextTick(function(){
        //温度
        let chart7 = this.$echarts.init(this.$refs.chart7);
        let option7 = {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          title: {
            show: true,
            text: "模组号",
            textStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            left: "center",
            bottom: 0,
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30,
          },
          grid: {
            top: 20,
            left: "50",
            right: "4%",
            bottom: "40",
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
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
            ],
          },
          yAxis: {
            type: "value",
            name: "平均温度/℃",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            splitNumber: 2,
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
          dataZoom: [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "28",
              start: 0,
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
          series: [
            {
              name: "",
              type: "line",
              data: this.data3,
              color: "#F2637B",
            },
          ],
        };
        chart7.clear()
        chart7.setOption(option7);
        let chart8 = this.$echarts.init(this.$refs.chart8);
        let option8 = {
          tooltip: {
            trigger: "axis",
            confine: true,
          },
          title: {
            show: true,
            text: "模组号",
            textStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            x: "center",
            bottom: 0,
          },
          legend: {
            show: false,
            data: [],
            left: 0,
            top: 30,
          },
          grid: {
            top: 20,
            left: "50",
            right: "4%",
            bottom: "40",
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
            data: [
              "0",
              "2",
              "4",
              "6",
              "8",
              "10",
              "12",
              "14",
              "16",
              "18",
              "20",
              "22",
              "24",
            ],
          },
          yAxis: {
            type: "value",
            name: "温度差/℃",
            nameLocation: "center",
            nameGap: 50,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            splitNumber: 2,
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
            // min: 1.56
          },
          dataZoom: [
            {
              show: true,
              height: 4,
              xAxisIndex: [0],
              bottom: "28",
              start: 0,
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
          series: [
            {
              name: "",
              type: "line",
              data: this.data4,
              color: "#326FF8",
            },
          ],
        };
        chart8.clear()
        chart8.setOption(option8);
      })
    },
  },
  mounted() {},
  computed: {},
  watch: {
    "filters.name": {
      deep: true,
      handler: function (newV, oldV) {
        console.log('深度监听')
        let params = {
          orgId: 'CLEYQP8C27',
          vehicleType: this.filters.name
        }
        // 获取所有车型vin
        getVehiclesListViN(params).then(res => {
          this.filters.carList = []
          let _this = this
          res.data.data.forEach(function (e) {
            for (var key in e) {
              let data = {
                id: e.vin,
                name: e.vin
              }
              _this.filters.carList.push(data)
            }
          })
        })
      }
    }
  }
};
</script>
<style lang="less" scoped>
// 媒体查询
@media screen and (max-width: 1400px) {
  /deep/ div.v-dropdown-caller.v-dropdown-caller--full-width {
    display: inherit;
    width: 200px;
  }

  .tite {
    margin-top: 2px;
    position: absolute;
    top: 0;
    right: 16px;
  }

  .tite span {
    width: 74px;
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2b405b;
    line-height: 17px;
    margin-left: 10px;
  }

  .tite span:nth-child(1) div {
    width: 8px;
    height: 8px;
    background: #ff0b07;
    display: inline-block;
    border-radius: 10px;
    margin-right: 6px;
  }

  .tite span:nth-child(2) div {
    width: 8px;
    height: 8px;
    background: #44c96b;
    display: inline-block;
    border-radius: 10px;
    margin-right: 6px;
  }

  /deep/ .dataW {
    width: 12px;
    height: 68px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #c0c4cc;
    line-height: 17px;
    margin: 0 auto;
  }

  /deep/ .el-tabs__content {
    width: 1301px;
    overflow: inherit;
    padding-bottom: 10px;
  }

  /deep/ .btns .showQp {
    position: absolute;
    top: -46px;
    right: 10px;
  }

  // 左部分模组
  .eBoxsss {
    width: 466px;
    height: 494px;
    background: #ffffff;
    border: 1px solid #ebeef5;
  }

  .sdsd {
    height: 85px;
    width: 33.63px;
    display: flex;
  }

  /deep/ .el-col-9 {
    width: 466px;
    height: auto;
    background: #ffffff;
    border: 1px solid #ebeef5;
    display: flex;
    align-items: center;
  }

  // 右上折线图
  /deep/ .el-col-15 {
    width: fit-content;
  }

}

@media screen and (max-width: 1920px) and (min-width: 1920px) {
  /deep/ div.v-dropdown-caller.v-dropdown-caller--full-width {
    display: inherit;
    width: 250px;
  }
}

// ------------end-----------
.sdsd img {
  position: absolute;
}

/deep/ .el-tabs__header {
  margin: 0 0 10px;
}

/deep/ .el-tabs__nav-wrap {
  background: #ebeef5;
}

/deep/ .el-tabs__item .is-active {
  height: 44px;
}

/deep/ .el-tabs__nav {
  margin: 0 28px;
}

.supplementaryList:nth-of-type(1) {
  list-style-type: none;
  padding: 0;
  display: inline-block;
  border: 1px solid #555dd1;
  padding: 5px 5px;
  margin: 5px 5px;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2b405b;
  line-height: 13px;
  margin-left: 0px;
}

.supplementaryList {
  height: 85px;
  list-style-type: none;
  padding: 0;
  display: inline-block;
  border: 1px solid #555dd1;
  padding: 5px 5px;
  margin: 5px 5px;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2b405b;
  line-height: 13px;
  height: 85px;
  width: 33.63px;
}
.titles {
  height: 43px;
  line-height: 43px;
  // padding-left: 14px;
  border-bottom: 1px solid #ebeef5;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #303133;
  padding: 0 14px;
}

/deep/ div.v-selectpage div.sp-input-container div.sp-base {
  height: 32px;
}

/deep/ div.v-selectpage div.sp-input-container span.sp-placeholder {
  color: #c0c4cc;
}

/deep/ .el-select__tags {
  flex-wrap: inherit;
  overflow: hidden;
}

ul {
  text-align: initial;
  list-style-type: none;
  padding: 0;
  display: inline-block;
  border: 1px solid #555dd1;
  padding: 5px 5px;
  margin: 5px 5px;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2b405b;
  line-height: 13px;
}

ul > li:first-child {
  color: #fb8529;
}

ul > li {
  padding: 2px 0px;
  text-align: initial;
}

.ulDataLi {
  margin: 9px;
}

.list {
  position: absolute;
  top: 30px;
}

.ulData {
  // left: -29px;
  display: flex;
  color: black;
  font-size: 2px;
  line-height: 1;
  width: 30px;
  margin-bottom: 26px;
}

/deep/ .el-col-9 {
  position: relative;
}

/deep/ .header {
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
  margin: 10px;
  overflow: hidden;
}

.handle-box {
  margin: 10px auto;
  width: 98%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;

  .box {
    width: 100%;
    margin: 0 auto;
    // margin-top: 10px;
    padding-top: 5px;
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
  width: 145px;
  overflow: hidden;
  -ms-flex-pack: start;

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
    width: 104px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: rgba(0, 0, 0, 0.14);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
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
  // margin-right: 20px;
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

/deep/ .el-form-item {
  margin-bottom: 0px;
  margin-right: 0px;
}

/deep/ .el-input__inner {
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
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
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

.tabs-box {
  width: 100%;
  margin-top: 10px;
  background: #fff;
  border-radius: 4px;
}

/deep/ .el-breadcrumb {
  height: 26px;
  line-height: 26px;
}

/deep/ .tabs-box .el-tabs__nav-wrap::after {
  display: none;
}

/deep/ .tabs-box .el-tabs__active-bar {
  display: none;
}

/deep/ .tabs-box .el-tabs__item {
  color: #7791a7;
}

/deep/ .tabs-box .is-active {
  background: #fff;
  color: #239fff;
}

/deep/ .tabs-box .el-tabs__header {
  background: #f7f7f7;
  margin-bottom: 0;
}

/deep/ .tabs-box .el-tabs__content {
  padding: 10px;
}

/deep/ .tabs-box .el-tabs__item.is-top {
  width: 97px;
  text-align: center;
}

/deep/ .tabs-box .el-tabs__item.is-top:last-child {
  padding-right: 20px;
}

/deep/ .el-breadcrumb__inner.is-link {
  font-weight: 700;
  text-decoration: none;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: rgba(141, 171, 196, 1) !important;
}

/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: rgba(43, 64, 91, 1);
  cursor: text;
}

.timeBox {
  /deep/ .el-input__inner {
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
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px 0 28px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}

@media screen and (max-width: 1366px) and (max-height: 768px) {
  .martr {
    margin-left: 20px;
  }
}

.tabTitle {
  position: relative;
  width: 98%;
  margin: 0 auto;
  height: 54px;
  background: #EBEEF5;
  line-height: 54px;

  span {
    font-size: 14px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #3F536E;
  }

  .tab {
    display: inline-block;
    width: 28px;
    text-align: center;
    margin-left: 30px;
    cursor: pointer;
  }

  .tab1 {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1890FF;
    padding-bottom: 0;
    height: 51px;
    border-bottom: 2px solid #1890FF;
  }

  .tab2 {

  }

  .but1 {
    position: absolute;
    display: inline-block;
    right: 14px;
    top: 11px;
    width: 70px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    background: #A8C6DF;
    border-radius: 4px;
    cursor: pointer;

    img {
      display: inline-block;
      margin: 8px 0 0 10px;
    }

    span {
      display: inline-block;
      position: relative;
      top: -5px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
}

.tabContent {
  margin: 10px auto;
  padding-bottom: 10px;
  position: relative;
  width: 98%;

  .tabContent1 {
    position: relative;
    width: 34.1142vw;
    height: 494px;
    background: #FFFFFF;
    border: 1px solid #EBEEF5;
    padding: 10px;
    float: left;

    .tabContent_title {
      position: absolute;
      right: 30px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2B405B;

      span:nth-of-type(1) {
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #FF0B07;
        border-radius: 50%;
      }

      span:nth-of-type(3) {
        display: inline-block;
        margin-left: 20px;
        width: 8px;
        height: 8px;
        background: #44C96B;
        border-radius: 50%;
      }
    }

    .tabContent_1 {
      margin-top: 30px;
      font-size: 0;

      div {
        width: 47px;
        float: left;
        font-size: 12px;
        height: 143px;
        background: #FFFFFF;
        border-radius: 1px;
        border: 2px solid #A7C6E0;
        margin: 0 6px 10px 0;
      }
      p {
        margin: 0 5px;
        font-size: 11px;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #2B405B;
      }
      p:nth-of-type(1) {
        line-height: 15px;
      }
      img {
        display: inline-block;
        margin: 20px 15px;
      }
      .span{
        display: block;
      }
      .span1 {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #C0C4CC;
        writing-mode: vertical-rl;
      }
      .titleColor {
        color: #FB8529;
      }
    }
  }

  .tabContent2 {
    margin-left: calc(34.1142vw + 30px);
    position: relative;
  }

  .tabContent2 > div:nth-of-type(1) {
    height: 231px;
    background: #FFFFFF;
    border: 1px solid #EBEEF5;
    padding: 10px;
  }

  .tabContent2 > div:nth-of-type(2) {
    margin-top: 10px;
    height: 231px;
    background: #FFFFFF;
    border: 1px solid #EBEEF5;
    padding: 10px;
  }
}
.img1{
  width: 148px;
  height: 100px;
  background: #FFFFFF;
  margin:0 auto;
  margin-left: 160px;
  margin-top: 172px;
  //border: 1px solid #EBEEF5;
}
</style>
