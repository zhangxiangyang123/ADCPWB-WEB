<template>
  <div v-if="appear">
    <div>
      <div class="m_con">
        <div class="box">
          <div class="handle-box">
            <div class="controlGroup">
              <span>对比组{{ num }}</span>
              <img @click="del" src="../assets/images/early/形状(2).png" alt="">
            </div>
            <div class="sxBox" style="margin-top:12px;" ref="c">
              <el-col class="toolbar" style="padding-bottom: 0px;">
                <el-form :inline="true" :model="data" ref="filters" :rules="rules">
                  <el-row>
                    <el-col :span="7" style="margin-bottom: 10px;">
                      <el-form-item label="车型" prop="model" ref="f1">
                        <el-select v-model="data.model" filterable placeholder="请选择车型" size="mini"
                                   @change="singleValues(data.model)">
                          <el-option v-for="item in carOptions" :key="item.VEHICLE_TYPE_NAME"
                                     :label="item.VEHICLE_TYPE_NAME" :value="item.VEHICLE_TYPE_NAME"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 省份多选下拉框框 -->
                    <el-col :span="7">
                      <el-form-item label="省份" prop="province" ref="f5">
                        <el-select v-model="data.province" multiple placeholder="请选择" size="mini"
                                   style="text-overflow:ellipsis;width:95%;">
                          <el-option v-for="item in province" :key="item" :value="item">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 车辆VIN -->
                    <el-col :span="10">
                      <el-form-item label="车辆VIN" ref="f3">
                        <el-select v-model="data.vin" filterable placeholder="请选择车辆VIN" size="mini">
                          <el-option v-for="item in carVinList" :key="item.vin" :label="item.vin"
                                     :value="item.vin"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <!-- 横轴下拉框 -->
                    <el-col :span="7" style="margin-bottom: 10px;">
                      <el-form-item label="横轴" prop="xAxis" ref="f3">
                        <el-select v-model="data.xAxis" placeholder="请选择" clearable style="width:95%;" size="mini">
                          <el-option v-for="item in filters.TransverseAxis" :key="item" :label="item"
                                     :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <!-- 预警类型下拉框 -->
                    <!-- prop="descs" -->
                    <el-col :span="11">
                      <el-form-item prop="warningType" label="预警类型" ref="f4">
                        <el-select v-model="data.warningType" style="width:95%;" placeholder="请选择" multiple size="mini">
                          <el-option v-for="item in warning_ype" :key="item" :label="item"
                                     :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div>
                    <div style="margin-right:0;">
                      <el-row>
                        <el-col :span="17">
                          <el-row>
                            <el-col :span="12">
                              <el-form-item label="时间">
                                <el-date-picker v-model="data.startDateStr" style="width:85%;" size="mini" type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="—" label-width="25px" prop="endDateStr" style="margin-left:-45px;">
                                <el-date-picker v-model="data.endDateStr" style="width:85%;" size="mini" type="date"
                                                placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :span="7">
                          <span style="line-height: 42px;">
                            <span>
                              <el-button style="height: 32px;line-height: 0;" @click="search('filters')">搜索</el-button>
                              <el-button type="primary" style="margin-right: 0px;height: 32px;line-height: 1px;"
                                         @click="reset">重置</el-button>
                            </span>
                          </span>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-form>
              </el-col>

              <div style="clear:both;"></div>
              <div id="chart111" ref="chart111" style="width:740px; height:542px;text-align: center;"
                   v-show="isDisplay">
                <img src="../assets/images/noDataGraph.png" width="30%" height="30%" style="margin-top: 25%;"/>
              </div>
              <el-tabs v-show="!isDisplay" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="柱状图" name="first">
                  <div class="boxLine">
                    <div class="titbg">
                      <div class="showQp" @click="changeStatusqp">
                        <img src="../assets/images/icon_qp.png" alt/>
                        <span>全屏展示</span>
                      </div>
                      <span>故障统计</span>
                    </div>
                    <div style="width:100%; height:100%;">
                      <div id="chart1" ref="chart1" style="width:100%; height:100%;
                                  border: 1px solid #EBEEF5;"></div>
                    </div>
                    <div class="fTips">
                      <div class="gzTip">故障类型</div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="饼状图" name="second">
                  <div class="boxLine">
                    <div class="titbg">
                      <div class="showQp" @click="changeStatusqps">
                        <img src="../assets/images/icon_qp.png" alt/>
                        <span>全屏展示</span>
                      </div>
                      <span>故障统计</span>
                    </div>
                    <div style="width:100%; height:100%;">
                      <div id="chart2" ref="chart2" style="width:100%;border: 1px solid #EBEEF5; height:100%;"></div>
                    </div>
                    <div class="fTips">
                      <div class="gzTip">故障类型</div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
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
import {
  getWarningInforInit,
  getWarningInforStatistics,
  getVehicleFailureStatistics,
  getCarOption,
  getVINList
} from "@/api/failureTable";
import {SelectPage} from 'v-selectpage'
// component
export default {
  components: {
    toph,
    SelectPage
  },
  props: {
    num: ''
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (new Date(value).getTime() - new Date(this.data.startDateStr).getTime() < 7 * 24 * 3600 * 1000) {
        callback(new Error("最短时间不能小于一周"))
      } else {
        callback()
      }
    };
    return {
      warning_ype: [],
      value2: '',
      pickerOptions: {
        onPick: ({maxDate, minDate}) => {
          this.value = minDate.getTime();
          if (maxDate) {
            this.value = ''
          }
        }, disabledDate: (time) => {
          if (this.value !== '' && this.value !== null) {
            let one = ''
            if (this.data.xAxis == '时间-周') {
              one = 7 * 24 * 3600 * 1000;
            } else if (this.data.xAxis == '时间-月') {
              one = 30 * 24 * 3600 * 1000;
            } else if (this.data.xAxis == '时间-年') {
              one = 365 * 24 * 3600 * 1000;
            }
            const maxTime = this.value + one;
            return time.getTime() < maxTime
          }
        }
      },
      rules: {
        province: [
          {required: false, message: '请选择省份', trigger: 'change'}
        ],
        model: [
          {required: false, message: '请选择车型', trigger: 'change'}
        ],
        xAxis: [
          {required: true, message: '选择横轴', trigger: 'change'}
        ],
        warningType: [
          {required: false, message: '选择预警类型', trigger: 'change'}
        ],
        endDateStr: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
      },
      // 分页控件
      appear: true,
      singleValue: '1',
      // ---------
      data: {
        endDateStr: '',
        model: '',
        province: [],
        startDateStr: '',
        vin: '',
        warningType: [],
        xAxis: ''
      },
      isDisplay: true,
      searchCriteria: [],
      searchxAxis: [],
      activeName: 'first',
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.data.endDateStr;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        },
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.data.startDateStr;
          if (beginDateVal) {
            return time.getTime() - 592131231 < beginDateVal;
          }
        },
      },
      province: [],
      createStartDate: "",
      value: '',
      warningTypeName: [],
      active: 4,
      filters: {
        TransverseAxis: ['预警', '省份', '时间-周', '时间-月', '时间-季', '时间-年'],
        carOptions: [],
        barWidth: this.barWidth,
        carList: []
      },
      carOptions: [],//车辆数据
      carVinList: [],//vin数据
    };
  },
  watch: {
    xAxis: {
      handler(newName, oldName) {
        // console.log('resd')
      },
      // immediate: true,  //刷新加载 立马触发一次handler
      deep: true  // 可以深度检测到 person 对象的属性值的变化
    }

  },
  created() {
    this.path()
  },
  methods: {
    handleTimestamp() {
    },
    del() {
      this.appear = false;
    },
    path() {
    },
    singleValues(data) {
      getVINList(data).then(res => {
        // this.carVinList = res.data.data.map(item => {
        //   return {id: item.vin, name: item.vin}
        // })
        this.carVinList = res.data.data
      })
    },
    // 初始化
    init() {
      getCarOption().then(res => {
        // this.carOptions = res.data.data.map(item => {
        //   return {id: item.VEHICLE_TYPE_NAME, name: item.VEHICLE_TYPE_NAME}
        // })
        this.carOptions = res.data.data
      })
      getWarningInforInit().then(response => (
        this.province = response.data.data[0],
          // console.log('readsad===', response.data.data),
          // this.filters.warning_ype = response.data.data[1],
          // console.log('this.filters.warning_ype==', this.filters.warning_ype),
          response.data.data[3].forEach((e, index) => {
            let data = {
              id: e,
              name: e
            }
            this.filters.carList.push(data)
          }),
          response.data.data[2].forEach((e, index) => {
            let data = {
              id: e,
              name: e
            }
            this.filters.carOptions.push(data)
          })
      ))
        .catch(function (error) { // 请求失败处理
          // console.log('===', error);
        })

    },

    // 预警类型判断
    warningState(reviewStatus) {
      return reviewStatus == "温度梯度化" ? "1" : reviewStatus == "单体压差过大" ? "2" : reviewStatus == "单体电压离散度高" ? "3" : ""
    },
    search(formName) {
      let xAxi = ''
      if (this.data.xAxis == "预警") {
        xAxi = 1
      } else if (this.data.xAxis == "时间-周") {
        xAxi = 3
      } else if (this.data.xAxis == "省份") {
        xAxi = 2
      } else if (this.data.xAxis == "时间-月") {
        xAxi = 4
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //暂时只支持预警类型
          if (xAxi !== 1) {
            this.$message("暂无数据")
            return
          }
          if (this.$route.path == '/failure') {
            let warningType = []
            let _this = this
            // console.log('this.data.warningType==', this.data.warningType)
            this.data.warningType.forEach(function (e, inidex) {
              let warningTypeIndex = _this.warningState(e)
              warningType.push(warningTypeIndex)
            })
            let params = {
              // type: xAxi,//横轴,
              // endDateStr: this.data.endDateStr, // 结束时间
              // vehicleType: this.data.model,//车型
              // startDateStr: this.data.startDateStr,//开始时间
              // vin: this.data.vin,//车辆vin
              // faultType: this.data.warningType,//预警类型
              // province: this.data.province,//省份

              // 一下为测试数据
              type: 0,//横轴,
              endDateStr: '', // 结束时间
              vehicleType: '',//车型
              startDateStr: '',//开始时间
              vin: '',//车辆vin
              faultType: ['0'],//预警类型
              province: ['MEGMW98MVJ', '山东'],//省份
              // ----------end--------------
            }
            getVehicleFailureStatistics(params).then(res => {

              this.fordata(res.data.data)
            })
          } else if (this.$route.path == '/early') {
            let warningType = []
            let _this = this
            // console.log('this.data.warningType==', this.data.warningType)
            this.data.warningType.forEach(function (e, inidex) {
              let warningTypeIndex = _this.warningState(e)
              warningType.push(warningTypeIndex)
            })
            // // 电池画像
            // let params = {
            //   endDateStr: this.data.endDateStr,
            //   model: this.data.model,
            //   province: this.data.province,
            //   startDateStr: this.data.startDateStr,
            //   vin: this.data.vin,
            //   warningType: this.data.warningType,
            //   xAxis: xAxi
            // }
            let params = {
              endDateStr: "",
              model: "",
              province: ['0'],
              startDateStr: "",
              vin: "",
              warningType: ['0'],
              xAxis: 1
            }
            getWarningInforStatistics(params).then(res => {
              this.fordata(res.data.data)
            })
          }
        } else {
          return false;
        }
      });
    },
    fordata(data) {
      if (JSON.stringify(data) == "{}" || !data) {
        this.$message('无数据')
        return
      } else {
        this.isDisplay = false;
        this.searchCriteria = [];
        this.searchxAxis = []
        //暂时只支持预警
        if (this.data.xAxis == "预警") {
          if (this.data.warningType.length === 0) {
            for (let key in data) {
              this.searchCriteria.push({value: data[key], name: key})
              this.searchxAxis.push(key)
            }
          } else {
            for (let key in data) {
              this.data.warningType.forEach(item => {
                if (item === key) {
                  this.searchCriteria.push({value: data[key], name: key})
                  this.searchxAxis.push(key)
                }
              })
            }
          }
        } else {
          for (let key in data) {
            this.searchCriteria.push({value: data[key], name: key})
            this.searchxAxis.push(key)
          }
        }
        this.pieChart();
        this.drawGz();
      }
    },
    // 重置
    reset() {
      this.isDisplay = true;
      this.data = {
        endDateStr: '',
        model: '',
        province: [],
        startDateStr: '',
        vin: '',
        warningType: [],
        xAxis: ''
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    changeStatusqps() {
      this.$parent.changeStatusqps(this.searchCriteria, this.searchxAxis);
    },
    changeStatusqp() {
      this.$parent.changeStatusqp(this.searchCriteria, this.searchxAxis);
    },
    test(chartArr) {
      let chart1 = this.$refs.chart1;
      let chart2 = this.$refs.chart2;
      var pix = window.outerWidth / chartArr.length;
      // chart1.style.width = window.outerWidth / chartArr.length - 65 + "px";
      // chart2.style.width = window.outerWidth / chartArr.length - 65 + "px";
      // chart1.resize();
      setTimeout(() => {
        this.drawGz();
      }, 1000);
    },
    // 饼状图
    pieChart() {
      let chart1 = this.$echarts.init(this.$refs.chart2);
      let option1 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: this.searchCriteria
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.searchCriteria
          }
        ]
      };
      chart1.setOption(option1);
    },
    // 柱状图
    drawGz() {
      let chart1 = this.$echarts.init(this.$refs.chart1);
      let option1 = {
        title: {
          show: false,
          text: "故障统计",
          textStyle: {
            fontSize: "14",
            color: "#3F536E",
            fontWeight: "bold",

          },
        },
        color: ["#326FF8"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "8%",
          right: "4%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.searchxAxis,
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
              rotate: 30,
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
        yAxis: [
          {
            name: "故障次数（次）",
            type: "value",
            nameLocation: "center",
            nameGap: 30,
            nameTextStyle: {
              fontSize: "14",
              color: "#3E526F",
              fontWeight: "600",
            },
            splitNumber: 6,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#C4D9E9",
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
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: this.barWidth,
            data: this.searchCriteria,
          },
        ],
      };
      chart1.setOption(option1);
      // debugger;
      // this.$refs.sxBox.addEventListener("resize", function() {
      //    // debugger;
      //     chart1.resize();
      // });
    },
  },
  mounted() {
    this.init()
    if (this.$route.path == '/failure') {
      this.warning_ype = ['电池高温报警' ,'车载储能装置类型过压报警', '单体电池过压报警', '车载储能装置类型过充', '车载储能装置类型欠压报警', '单体电池欠压报警', 'SOC过高报警', 'SOC低报警', '温度差异报警', '电池单体一致性差报警', 'SOC跳变报警', '可充电储能系统不匹配报警', '绝缘报警'];
    } else {
      this.warning_ype =['单体压差过大' ,'温升速率过大', '温度过高', '温度梯度化', '绝缘电阻值低', '电芯自放电大', '充电压差扩大',
        '单体电压离散度高', '单体内阻或者容量异常', '连接阻抗大', '单体电压波动性差异大', '绝缘电阻突降', 'BMS采样异常',
        '模组电压离群', '电池包欠压']
    }
    EventBus.$on("tabIndex", (val) => {
      this.test(val);
    });
    let chart1 = this.$refs.chart1;
    let chart2 = this.$refs.chart2;
    let chart111 = this.$refs.chart111;

    chart111.style.width =
      window.outerWidth / this.$parent.chartArr.length - 65 + "px";
    chart111.style.height = window.outerHeight / 2 + 30 + 151 + "px";
    chart1.style.width =
      window.outerWidth / this.$parent.chartArr.length - 65 + "px";
    chart1.style.height = window.outerHeight / 2 + 30 + "px";
    echarts.init(chart1);
    chart2.style.width =
      window.outerWidth / this.$parent.chartArr.length - 65 + "px";
    chart2.style.height = window.outerHeight / 2 + 30 + "px";
    echarts.init(chart2);
    window.onresize = () => {
      //   myChart.resize();
    };
    // this.$refs.f1.$el.style.display = 'block';
    // this.$refs.f2.$el.style.display = 'block';
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-form-item__error {
  padding-top: 0px;
}

/deep/ .el-range-editor--mini .el-range-separator {
  line-height: 23px;
}

/deep/ .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
  display: none;
}

/deep/ .el-form--inline .el-form-item__label {
  display: revert;
}

/deep/ .el-tabs__header {
  margin: 15px 0 15px;
}

/deep/ .el-tabs__nav {
  margin-left: 20px;
}

/deep/ .el-tabs__nav-scroll {
  background: #ebeef5;
}

.controlGroup > img {
  float: right;
  margin-top: 9px;
}

.controlGroup {
  height: 33px;
  border-bottom: 1px solid #ebeef5;
  padding: 0 15px;
  line-height: 33px;
}

/deep/ div.v-selectpage div.sp-input-container div.sp-base {
  height: 32px;
}

/deep/ div.v-selectpage div.sp-input-container span.sp-placeholder {
  color: #c0c4cc;
}

/deep/ div.v-dropdown-caller.v-dropdown-caller--full-width {
  display: inherit;
  width: 193px;
}

/deep/ .el-select__tags {
  flex-wrap: inherit;
  overflow: hidden;
}

.wrap {
  box-sizing: border-box;
  min-width: 100%;
  min-height: 100%;
  background: rgba(244, 247, 252, 1);
}

.main {
  width: 99%;
  margin: 0 auto;
  overflow: hidden;
}

.m_con {
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
  margin-top: 10px;
  margin-bottom: 16px;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  justify-items: center;

  span {
    display: inline-block;
    // float: left;
    margin-right: 8px;
    text-align: right;
    color: #3e526f;
  }

  .handle-box {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    // height: 860px;
    /deep/ .el-input--mini .el-input__inner {
      height: 32px;
      line-height: 32px;
    }

    .sxBox {
      // margin: 15px auto;
      // width: 96%;
      margin: 10px;
      margin-bottom: 0;
    }

    .lBox {
      margin: 0 auto;
      display: block;
      width: 1px;
      border-right: 1px solid rgba(231, 239, 245, 1);
      margin: 0 2%;
    }
  }

  // @media screen and (max-width : 1366px) {
  //     .handle-box{
  //         width: 100%;
  //         background:rgba(255,255,255,1);
  //         border-radius:4px;
  //         height: 660px;
  //         }
  // }
}

.boxLine {
  // margin-bottom: 36px;
  border-radius: 4px;
  // border: 1px solid rgba(217, 222, 233, 1);
}

.titbg {
  width: 100%;
  height: 44px;
  line-height: 44px;
  // background: rgba(247, 247, 247, 1);
  box-shadow: 0px -1px 0px 0px rgba(222, 233, 240, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3f536e;
  text-align: left;
  border-radius: 4px 4px 0 0;
}

.fTips {
  width: 90%;
  // margin: 0 auto;
  overflow: hidden;
}

.showQp {
  float: right;
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
    color: #ffffff;
  }
}

.gzTip {
  float: left;
  line-height: 37px;
  width: 56px;
  font-size: 14px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #a8c6df;
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
  margin: 10px auto;
  width: 99.5%;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(217, 222, 233, 1);
  overflow: hidden;

  .bcon {
    width: 98%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
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
  margin: 0 auto;
  width: 60%;
  height: 460px;
}

/deep/ .el-form-item::after,
.el-form-item::before {
  display: inline !important;
}

/deep/ .el-range-editor--mini.el-input__inner {
  height: 32px;
}

/deep/ .el-form--inline .el-form-item__content {
  vertical-align: middle;
  width: 71%;
}

/deep/ .el-form-item {
  margin-bottom: 0;
  width: 100%;
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

_:-ms-lang(x),
/deep/ .el-form--inline .el-form-item {
  display: block;
}
</style>
