<template>
  <div class='a' v-if="appear">
    <div>
      <div class="m_con">
        <div class="delgroup" @click="del">
          <img src="../assets/images/close.png" width="15" height="15"/>
        </div>
        <div class="box">
          <div class="handle-box">
            <div class="cs">对比组{{ num }}</div>
            <div class="sxBox">
              <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="filters" ref="filters">
                  <el-form-item>
                    <span>使用单位</span>
                    <el-select v-model="filters.operate" placeholder="请选择" clearable size="mini" style="width:193px; height:30px;">
                      <el-option v-for="item in filters.operateOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <span style="margin-left:0px;">车型</span>
                    <el-input v-model="filters.name" placeholder="请输入车型" style="width:193px; height:30px;" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <span style="margin-left:0px;">省份</span>
                    <el-input v-model="filters.region" placeholder="地域" style="width:193px; height:30px;" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <span>车辆VIN</span>
                    <el-input v-model="filters.carN" placeholder="车辆VIN" style="width:193px; height:30px;" size="mini"></el-input>
                  </el-form-item>
                  <!-- <br /> -->
                  <el-form-item style="margin-right:5px;" class="timeBox">
                    <span>时间段</span>
                    <el-date-picker v-model="filters.column.create_start_date" type="month" :picker-options="pickerBeginDateBefore" format="yyyy-MM" placeholder style="width:173px;"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="—" label-width="25px" class="timeBox">
                    <el-date-picker v-model="filters.column.create_end_date" type="month" format="yyyy-MM" :picker-options="pickerBeginDateAfter" placeholder style="width:173px;"></el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <div class="btn" style="text-align: right">
                      <el-button type="primary" size="mini" @click="search">搜索</el-button>
                      <el-button type="primary" size="mini" @click="reset">重置</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </el-col>
              <div style="width:100%;height: 10px;border-top:1px solid #EBEEF5 ;margin-top: 145px"></div>
              <div>
                <div class="title1">电池使用特性分布图
                  <div class="showQp" style="float: right" @click="changeStatusqp">
                    <img src="../assets/images/icon_qp.png" alt/>
                    <span>全屏</span>
                  </div>
                </div>
                <div class="boxLine" style="margin-top:10px;">
                  <div class="titbg">
                    <div style="clear:both;">
                      <select name="" class="xAxis" v-model="xAxis">
                        <option v-for=" (item,index) in selectx" :key="index" :label="item.label" :value="item.value"></option>
                      </select>
                      <select name="" class="yAxis" v-model="yAxis">
                        <option v-for=" (item,index) in selecty" :key="index" :label="item.label" :value="item.value"></option>
                      </select>
                    </div>
                  </div>
                  <div id="dlBoxP" ref="dlBoxP" style="width:100%; height:100%;"></div>
                </div>
                <div class="title2">充电方式</div>
                <div class="boxLine" style="margin-top:10px;">
                  <div class="titbg">
                    <select v-model="graphicSwitching" :disabled="disableds" class="graphicSwitching">
                      <option value="" v-for="(item,index) in chargingMode" :key="index" :value="item.value" :label="item.label"></option>
                    </select>
                  </div>
                  <div id="cdBoxP" ref="cdBoxP" style="width:100%; height:100%;"></div>
                  <!-- 饼图 -->
<!--                    <span style="font-size: 12px;color: #606266;font-weight: 398;">最大</span>-->
<!--                    <el-input-number  v-model="maxNumber" controls-position="right"size="mini" @change="handleChange1" :min="-100" :max="100"style="margin-left: 10px;margin-bottom: 10px;width: 86px"></el-input-number>-->
<!--                    <span>-</span>-->
<!--                    <el-input-number  v-model="minNumber" controls-position="right" size="mini" @change="handleChange2" :min="-100" :max="100"style="width: 86px"></el-input-number>-->

                  <div style="    margin-left: 438px;margin-top: -1px;">
<!--                    <span style="font-size: 12px;color: #606266;font-weight: 398;">最小</span>-->
                  </div>
                  <el-row>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple"></div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import echarts from "echarts";
import {EventBus} from "@/api/bus.js";
import {searchs, histogram, pieChart} from "@/api/portrait.js";
// import "echarts";
export default {
  components: {
    toph,
  },
  props: {
    num: ''
  },
  data() {
    return {
      isDisplay: false,
      disableds: false,
      myChart: '',
      myChartBox: '',
      myChartBoxP: '',
      maxNumber:'',
      minNumber:'',
      value1:0,
      value2:0,
      drawPieData: {
        categories: [],
        values: []
      },
      barChart: {
        categories: [],
        values: []
      },
      graphicSwitching: '1',
      chargingMode: [
        {
          value: '1',
          label: '使用频次'
        },
        {
          value: '2',
          label: '充电倍率'
        }
      ],
      selecty: [
        {
          value: '1',
          label: '(电流/A)'
        },
        {
          value: '2',
          label: '最高温度'
        },
        {
          value: '3',
          label: '最低温度'
        }, {
          value: '4',
          label: '最高电压'
        }, {
          value: '5',
          label: '最低电压'
        }, {
          value: '6',
          label: '压差'
        }, {
          value: '7',
          label: '绝缘电阻'
        }
        , {
          value: '8',
          label: '平均电压'
        }
      ],
      selectx: [
        {
          value: '1',
          label: '(电流/A)'
        },
        {
          value: '2',
          label: '最高温度'
        },
        {
          value: '3',
          label: '最低温度'
        }, {
          value: '4',
          label: '最高电压'
        }, {
          value: '5',
          label: '最低电压'
        }, {
          value: '6',
          label: '压差'
        }, {
          value: '7',
          label: '绝缘电阻'
        }
        , {
          value: '8',
          label: '平均电压'
        }
      ],
      xAxis: "1",
      yAxis: '2',

      // xAxis: "maxCellVoltage",
      hours: [],
      days: [],
      data: [],
      echartsParam: "",
      // showRentPrise:false,
      // showRentPrise2: true,
      appear: true,
      showtit2: true,
      active: 3,
      filters: {
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
        //地域
        regionOptions: [
          {
            value: "1",
            label: "天津",
          },
          {
            value: "2",
            label: "北京",
          },
          {
            value: "3",
            label: "上海",
          },
        ],
        //是否运营车辆
        operateOptions: [
          {
            value: "1",
            label: "私家车",
          },
          {
            value: "2",
            label: "运营车",
          },
        ],
        name: "",
        carN: "",
        region: "",
        operate: "",
        column: {
          create_start_date: "",
          create_end_date: "",
        },
      },
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
  methods: {
    //x轴范围
    handleChange1(value) {
      this.value1=value
      console.log(this.value1);
      this.drawBar()

    },
    handleChange2(value) {
      this.value2=value
      console.log(value);
      this.drawBar()
    },

    //搜索
    search() {
      if (!this.filters.carN) {
        this.$message("请选择vin")
        return
      }
      let params = {
        // xAxis: this.xAxis,
        // yAxis: this.yAxis,
        // unit: this.filters.operate,
        // vehicleType: this.filters.name,
        // province: this.filters.region,
        // vin: this.filters.carN,
        // startDateStr: this.filters.column.create_start_date,
        // endDateStr: this.filters.column.create_end_date,
        // 测试数据
        xAxis: '1',
        yAxis: "2",
        unit: "私家车",
        vehicleType: "EU001",
        province: "天津",
        vin: "LGJE13EA",
        startDateStr: '',
        endDateStr: '',
      }
      let histograms = {
        // xAxis: this.xAxis,
        // yAxis: this.yAxis,
        // unit: this.filters.operate,
        // vehicleType: this.filters.name,
        // province: this.filters.region,
        // vin: this.filters.carN,
        // startDateStr: this.filters.column.create_start_date,
        // endDateStr: this.filters.column.create_end_date,
        // 测试数据
        // vin: "TRE010",
        // chargeType: '1',
        startDateStr: "2020-02-28T16:02:10.000Z",
        endDateStr: "2020-09-29T16:10:00.000Z",
      }
      let pieCharts = {
        // xAxis: this.xAxis,
        // yAxis: this.yAxis,
        // unit: this.filters.operate,
        // vehicleType: this.filters.name,
        // province: this.filters.region,
        // vin: this.filters.carN,
        // startDateStr: this.filters.column.create_start_date,
        // endDateStr: this.filters.column.create_end_date,
        // 测试数据
        unit: "私家车",
        vehicleType: "EU001",
        province: "天津",
        vin: "vin1",
        startDateStr: this.filters.column.create_start_date,
        endDateStr: this.filters.column.create_end_date,
      }
      let _this = this
      searchs(params).then(res => {
        this.hours = []
        this.days = []
        this.data = []
        let data = res.data.data
        // console.log(456)
        // console.log(res.data.data)
        data.forEach(function (e) {
          _this.hours.push('(' + e.xaxis + ')')
          _this.days.push('(' + e.yaxis + ')')
          _this.data.push(['(' + e.xaxis + ')', '(' + e.yaxis + ')', e.count])

        })
        this.drawDl()
        this.isDisplay = true
      })
      histogram(histograms).then(res => {
        console.log(1)
        console.log(res.data)
        console.log(1)
        this.barChart.categories = res.data.data.categories
        this.barChart.values = res.data.data.values
      })
      pieChart(pieCharts).then(res => {
        if (res.data.data.categories == '') {
          this.disableds = true
          this.drawBar()
        } else {
          this.drawPieData.categories = res.data.data.categories
          this.drawPieData.values = res.data.data.values
          this.drawPie()
          this.disableds = false
        }
      })
    },
    //重置
    reset() {
      if (this.myChartBox) {
        this.myChartBox.clear()
      }
      if (this.myChartBoxP) {
        this.myChartBoxP.clear()
      }
      if (this.myChart) {
        this.myChart.clear()
      }
      this.filters.operate = '',
      this.filters.name = '',
      this.filters.region = '',
      this.filters.carN = '',
      this.filters.column.create_start_date = '',
      this.filters.column.create_end_date = ''
    },
    //柱状图
    drawBar() {
      this.echartsParam = "bar";
      this.$echarts.init(this.$refs.cdBoxP).dispose(); //echarts实例销毁
      this.myChartBoxP = this.$echarts.init(this.$refs.cdBoxP);
      this.myChartBoxP.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "8%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.barChart.categories,
            // max:this.value1,
            // min:this.value2,
            // max:520,
            // min:1,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        dataZoom: [
          {
            show: true,
            height: 4,
            xAxisIndex: [0],
            bottom: "6",
            start: 1,
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
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: this.barChart.values,
          },
        ],
      });
    },
    //饼图
    drawPie() {
      this.echartsParam = "pie";
      this.$echarts.init(this.$refs.cdBoxP).dispose(); //echarts实例销毁
      this.myChart = this.$echarts.init(this.$refs.cdBoxP);
      this.myChart.setOption({
        color: ["rgba(100, 210, 132, 1)", "rgba(24, 144, 255, 0.85)"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        grid: {
          y: 25,
          left: "8%",
          right: "28%",
        },
        legend: {
          orient: "vertical",
          right: "15%",
          top: "50%",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: "rgba(140,140,140,1)",
            fontSize: 14,
          },
          icon: "circle",
          data: this.drawPieData.categories,
          // formatter:  function(name){
          //     var total = 0;
          //     var target;
          //     for (var i = 0, l = data.length; i < l; i++) {
          //     total += data[i].value;
          //     if (data[i].name == name) {
          //         target = data[i].value;
          //         }
          //     }
          //     return name + ' ' + ((target/total)*100).toFixed(2) + '%';
          // }
        },
        series: [
          {
            name: "充电方式",
            type: "pie",
            radius: ["45%", "80%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: "inner",
                // formatter: '{d}%',
                formatter: function (data) {
                  return data.percent.toFixed(0) + "%";
                },

                textStyle: {
                  color: "#fff",
                  fontWeight: "400",
                  fontSize: 12,
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "400",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.drawPieData.values,
          },
        ],
      });
    },
    del() {
      this.appear = false;
      // debugger;
      // this.$emit('func','')
    },
    //全屏
    changeStatusqp() {
      let changeStatusqpData = [this.hours, this.days, this.data]

      this.$parent.changeStatusqp(changeStatusqpData, this.drawPieData, this.barChart);
      this.$emit("getParam", this.echartsParam);
    },
    drawDl() {
      //let myChart = this.$echarts.init(document.getElementById("dlBoxP"));
      this.myChartBox = this.$echarts.init(this.$refs.dlBoxP);
      var hours = this.hours;
      var days = this.days
      var data = this.data
      data = data.map(function (item) {
        return [item[1], item[0], item[2] || "-"];
      });

      this.myChartBox.setOption(
        {
          tooltip: {
            position: "top",
          },
          animation: false,
          grid: {
            y: "15%",
            left: "16%",
            right: "12%",
          },
          xAxis: {
            type: "category",
            name: "",
            nameTextStyle: {
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: 12,
              padding: [-30, 0, 0, -30],
            },
            // boundaryGap : false,
            data: this.hours,
            position: "top",
            axisLabel: {
              show: true,
              interval: 0,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitArea: {
              show: true,
            },
          },
          yAxis: {
            type: "category",
            name: "",
            nameTextStyle: {
              color: "rgba(0, 0, 0, 0.6)",
              fontSize: 12,
              padding: [35, 55, 0, 0],
            },
            data: this.days,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitArea: {
              show: true,
            },
          },
          visualMap: {
            type: "piecewise",
            // splitNumber: 2,
            pieces: [
              {
                gt: 0,
                lte: 1000,
                color: "rgba(207, 237, 255, 1)",
              }, // 不指定 min，表示 min 为无限大（-Infinity）。
              {
                gt: 1000,
                lte: 2000,
                color: "rgba(116, 195, 255, 1)",
              },
              {
                gt: 2000,
                lte: 3000,
                color: "rgba(55, 157, 251, 1)",
              },
              {
                gt: 3000,
                lte: 4000,
                color: "rgba(12, 112, 217, 1)",
              },
              {
                gt: 4000,
                lte: 5000,
                color: "rgba(0, 80, 179, 1)",
              },
            ],

            dimension: 2,
            //min: 0,
            // max: 100,
            //itemWidth: '20',
            //itemHeight: '20',
            align: "left",
            show: true,
            //calculable: true,
            orient: "horizontal", //'vertical'  horizontal
            left: "center", //center
            bottom: "10",
          },
          series: [
            {
              name: "",
              type: "heatmap",
              data: this.data,
              label: {
                normal: {
                  show: true,
                  color: "#fff",
                },
              },
              itemStyle: {
                borderWidth: 1,
                borderColor: "rgba(255,255,255,1)",
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        });
    },
  },
  mounted() {
    EventBus.$on("tabIndex1", (val) => {
      // _this.handleTabChange(val);
      this.test(val);
    });
    let dlBoxP = this.$refs.dlBoxP;
    dlBoxP.style.width = window.outerWidth / 2 - 55 + "px";
    dlBoxP.style.height = window.outerHeight / 4 + 90 + "px";
    echarts.init(dlBoxP);
    let cdBoxP = this.$refs.cdBoxP;
    cdBoxP.style.width = window.outerWidth / 2 - 55 + "px";
    cdBoxP.style.height = window.outerHeight / 4 - 30 + "px";
    echarts.init(cdBoxP);
    // this.drawDl();
    // this.drawPie();
  },
  watch: {
    graphicSwitching: {
      handler(newVal, oldVal) {
        if (newVal == 1) {
          this.drawPie()
        } else {
          this.drawBar()
        }
      }
    },
    yAxis: {
      handler(newVal, oldVal) {
        this.search()
      }
    },
    xAxis: {
      handler(newVal, oldVal) {
        this.search()

      }
    }

  }
};
</script>
<style lang="less" scoped>
/deep/ .tableBox .a:first-child {
  margin-left: 13px;
}


.title1 {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3F536E;
  line-height: 16px;
  margin: 0 0 16px 0;
}

.title2 {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3F536E;
  line-height: 16px;
  margin: 16px 0;
}

.cs {
  border-bottom: 1px solid #ebeef5;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #303133;
  padding-left: 15px;
}

.graphicSwitching {
  z-index: 100;
  color: #606266;
  position: absolute;
  top: 10px;
  left: 10px;
  border: 1px solid #D7E5EF;
  border-radius: 4px;
}

.graphicSwitching:focus {
  border: 0;
}

.yAxis {
  position: absolute;
  top: 10px;
  left: 10px;
  border: 1px solid #D7E5EF;
  z-index: 100;
  color: #606266;
  border-radius: 4px;
}

.xAxis {
  z-index: 100;
  color: #606266;
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid #D7E5EF;
  border-radius: 4px;
}

.btn {
  float: right;
}

// .boxLine {
//   text-align: center;
// }
// .btns {
//   width: 200px;
//   display: inline-block;
// }
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

.m_con {
  position: relative;
  width: 100%;
  // margin: 20px auto;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.box {
  background: #ffffff;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  width: 100%;
  margin: 0 auto;
  // margin-top: 20px;
  margin-bottom: 16px;
  background: #ffffff;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  // -----------end---------
  width: 100%;
  margin: 0 auto;
  // margin-top: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  justify-items: center;
  margin-top: 10px;

  span {
    display: inline-block;
    // float: left;
    margin-right: 8px;
    text-align: left;
    color: #3e526f;
  }

  .handle-box {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;

    /deep/ .el-input--mini .el-input__inner {
      height: 32px;
      line-height: 32px;
    }

    .sxBox {
      width: 96%;
      margin: 0 auto;
      padding: 7px 15px 15px 15px;
    }

    .lBox {
      margin: 0 auto;
      display: block;
      width: 1px;
      border-right: 1px solid rgba(231, 239, 245, 1);
      margin: 0 2%;
    }
  }
}

.boxLine {
  border-radius: 4px;
  border: 1px solid rgba(217, 222, 233, 1);
}

.titbg {
  position: relative;
  width: 100%;
  height: 44px;
  line-height: 44px;
  //background: rgba(247, 247, 247, 1);
  //box-shadow: 0px -1px 0px 0px rgba(222, 233, 240, 1);
  //font-size: 14px;
  //font-family: PingFangSC-Medium, PingFang SC;
  //font-weight: 500;
  //color: #3f536e;
  //text-align: center;
  //border-radius: 4px 4px 0 0;
}

.showQp {
  margin-left: 8px;
  margin-bottom: 13px;
  text-align: center;
  background: #A8C6DF;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 70px;
  height: 24px;
  line-height: 24px;
  display: flex;
  justify-content: center;
  justify-items: center;
  cursor: pointer;

  img {
    margin-top: 5px;
    margin-left: 10px;
    width: 14px;
    height: 14px;
  }

  span {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
}

.addDbBtn {
  width: 12px;
  height: 93px;
  padding: 20px 10px;
  background: rgba(24, 144, 255, 1);
  border-radius: 0 4px 4px 0;
  margin-top: 20%;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}

.qpBox {
  // margin: 10px auto;
  // width: 99.5%;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 222, 233, 1);
  overflow: hidden;

  .bcon {
    width: 98%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
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
  margin-bottom: 10px;
  cursor: pointer;
}

.echarts {
  width: 100%;
  height: 460px;
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
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
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

/deep/ .el-form-item {
  margin-bottom: 8px;
  margin-right: 20px;
}

.delgroup {
  position: absolute;
  top: 15px;
  right: 10px;
  font-size: 20px;
  color: rgba(24, 144, 255, 1);
  z-index: 10;
  cursor: pointer;
}

/deep/ .el-form-item::after,
.el-form-item::before {
  display: inline !important;
}

/deep/ .el-form-item::after,
.el-form-item::before {
  display: inline !important;
}

/deep/ .el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}

/deep/ .el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}
</style>
