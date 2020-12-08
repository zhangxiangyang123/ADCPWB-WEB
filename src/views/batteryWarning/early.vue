<template>
  <!-- 此页面待定 -->
  <div class="wrap">
    <toph v-bind:active="active"></toph>
    <div class="main">
      <el-breadcrumb separator="/" style="margin-left:21px;height: 46px;line-height: 46px;" v-show="showtit2">
        <el-breadcrumb-item>电池预警</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/portrait' }" style="color: #2B405B;">预警信息统计</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin-left:0;background: #fff;margin-bottom: 10px;">
        <div class="batteryAlertTitle">
          <span>预警信息统计</span>
          <span @click="addBox" style="margin-left:0;"><img src="../../assets/images/early/形状.png">添加对比组</span>
        </div>
        <div class="m_con">
          <div class="tableBox" v-show="showRentPrise2">
            <div v-for="(item,index) in chartArr" :key="item" @func="getContent(index)">
              <failuretable ref="Failuretable" v-if="flag" :num="item"></failuretable>
            </div>
          </div>
        </div>
      </div>
      <div class="qpBox" v-show="showRentBar">
        <div class="bcon" style="margin:0 auto; margin-top:117px;">
          <div class="echarts" style="width:100%; margin:0 auto;">
            <div id="chart5" ref="chart5" style="width:100%; height:100%;"></div>
          </div>
        </div>
        <div class="showQp2" @click="changeStatustqp" style="margin-top:15px;">
          <span>单击或ESC退出全屏模式</span>
        </div>
      </div>
      <div class="qpBox" v-show="showRentPrise">
        <div class="bcon" style="margin:0 auto; margin-top:117px;">
          <div class="echarts" style="width:100%; margin:0 auto;">
            <div id="chart3" ref="chart3" style="width:100%; height:100%;"></div>
          </div>
        </div>
        <div class="showQp2" @click="changeStatustqp" style="margin-top:15px;">
          <span>单击或ESC退出全屏模式</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import failuretable from "@/components/failureTable";
import echarts from "echarts";
// import EventBus from "@/api/bus";
import {EventBus} from "@/api/bus.js";

export default {
  components: {
    toph,
    failuretable,
  },
  data() {
    return {
      showRentPrise: false,
      showRentBar: false,
      showRentPrise2: true,
      showtit2: true,
      active: 4,
      flag: true,
      chartArr: [1, 2],
      data: [],
      searchAxis: []
    };
  },
  methods: {
    getContent(index) {
      this.chartArr.splice(index, 1);
    },
    // zxy--请求接口示例,没用可删除，就是示范
    // getList() {
    //   getList().then(res =>{
    //       console.log("res", res);
    //   })
    // },
    addBox() {
      // if (this.chartArr.length < 5) {
      this.chartArr.push(this.chartArr.length + 1);
      this.flag = false;
      this.$nextTick(() => {
        this.flag = true;
      });
      EventBus.$emit("tabIndex", this.chartArr);
      // this.$refs.Failuretable.test()
      // }
    },
    changeStatusqp(searchCriteria, searchAxis) {
      this.showRentPrise = true;
      this.showRentPrise2 = false;
      this.showtit2 = false;
      this.data = searchCriteria
      this.searchAxis = searchAxis
      this.drawBig();
      this.pieChart()
    },
    changeStatusqps(searchCriteria, searchAxis) {
      this.showRentBar = true;
      this.showRentPrise2 = false;
      this.showtit2 = false;
      this.data = searchCriteria
      this.searchAxis = searchAxis
      this.drawBig();
      this.pieChart()
    },
    changeStatustqp(data) {
      this.showRentBar = false;
      this.showRentPrise = false;
      this.showRentPrise2 = true;
      this.showtit2 = true;
      this.data = data
      this.drawBig();
      this.pieChart()
    },
    // 饼状图
    pieChart() {
      let chart1 = this.$echarts.init(this.$refs.chart5);
      let option1 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: this.data
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
            // data: this.searchCriteria
            data: this.data
          }
        ]
      };
      chart1.setOption(option1);


    },
    // 柱状图
    drawBig() {
      let chart3 = this.$echarts.init(this.$refs.chart3);
      let option3 = {
        title: {
          show: false,
          text: "",
          textStyle: {
            fontSize: "14",
            color: "#3E526F",
            fontWeight: "600",
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
            data: this.searchAxis,
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
            barWidth: "50",
            data: this.data
          },
        ],
      };
      chart3.setOption(option3);
      window.addEventListener("resize", function () {
        chart3.resize();
      });
    },
  },
  mounted() {
    let chart3 = document.getElementById("chart3");
    chart3.style.width = window.outerWidth - 80 + "px";
    chart3.style.height = window.outerHeight / 2 + 98 + "px";
    echarts.init(chart3);

    let chart2 = document.getElementById("chart5");
    chart2.style.width = window.outerWidth - 80 + "px";
    chart2.style.height = window.outerHeight / 2 + 98 + "px";
    echarts.init(chart2);
    this.drawBig();
    this.pieChart()

  },
};
</script>
<style lang="less" scoped>
.batteryAlertTitle {
  height: 43px;
  background: #ffffff;
  line-height: 43px;
  padding: 0 14px;
  border-bottom: 1px solid #ebeef5;
}

.batteryAlertTitle span:nth-child(1) {
  width: 81px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #303133;
  // line-height: 20px;
}

.batteryAlertTitle span:nth-child(2) {
  font-size: 14px;
  cursor: pointer;
  font-family: PingFangSC-Regular, PingFang SC;
  float: right;
  width: 118px;
  height: 32px;
  line-height: 32px;
  background: #1890ff;
  border-radius: 4px;
  color: #ffffff;
  font-weight: 400;
  text-align: center;
  margin: 5.5px auto;
}

.batteryAlertTitle img {
  position: relative;
  cursor: pointer;
  top: 3px;
  margin-right: 6px;
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

.tableBox {
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  overflow: auto;
  //  display: flex;
  // justify-content: center;
  // align-items: center;
  // justify-items: center;
  // overflow-x: scroll;
  //overflow-x: hidden;
  // overflow-y: hidden;
}

.tableBox div {
  margin-left: 10px;
}

.tableBox div:first-child {
  margin-left: 0px;
}

.m_con {
  width: 98%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  // overflow: hidden;

  // background: #ffffff;
  // box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.1);
  // border-radius: 4px;
  // border: 1px solid #ebeef5;
}

.box {
  width: 100%;
  margin: 0 auto;
  // margin-top: 20px;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  justify-items: center;

  span {
    display: inline-block;
    // display: block;
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
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: rgba(247, 247, 247, 1);
  box-shadow: 0px -1px 0px 0px rgba(222, 233, 240, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3f536e;
  text-align: center;
  border-radius: 4px 4px 0 0;
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
  height: 100%;
}

/deep/ .el-breadcrumb__inner.is-link {
  font-weight: 400;
  text-decoration: none;
  -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #2b405b !important;
}

/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  font-weight: 400;
  color: rgba(43, 64, 91, 1);
  cursor: text;
}

/deep/ .el-form-item {
  margin-right: 20px;
}
</style>
