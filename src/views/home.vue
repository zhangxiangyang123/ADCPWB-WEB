<template>
    <div class="wrap">
        <top v-bind:active="active"></top>
        <div class="main">
            <div class="wrap_con2" style="display:flex">
                <div class="leftB" style="flex:1">
                    <div class="mess_box">
                        <span class="today_title">通知</span>
                        <span class="messList" id="scroll">
                            <ul class="con1" ref="con1" @mouseenter="mEnter" @mouseleave="mLeave">
                                <li :style="activation(item)" style="cursor:pointer" v-for="item in marqueeList" :key="item.id" @click="goPage(item.id)">
                                    {{ item }}
                                </li>
                            </ul>
                        </span>
                    </div>
                    <div class="ycsbBox" style="margin-top:8px;position: relative;">
                        <div class="today_title">电池包异常识别</div>
                        <span class="text" style="margin-top:27px;margin-right:40px">{{vehicleType}}</span>
                        <span class="text" style="margin-right:7px;margin-top:27px;">{{province}}</span>
                        <span class="text" style="margin-right:10px;margin-top:27px;">{{time}}</span>
                        <div id="dcbycTable"></div>
                        <div class="boxtip">
                            <span> <img src="../assets/images/icon_jia.png" alt /> </span>离群车辆
                        </div>
                    </div>
                    <div class="fxdjBox_" style="margin-top:8px;">
                        <span class="today_title">风险等级</span>
                        <div id="ljTable" @click="gogo()"></div>
                    </div>

                </div>
                <div class="middleB" style="flex:1">
                    <div class="today_box">
                        <span class="today_title">今日新增</span>
                        <div class="today_num" style="display:flex">
                            <div class="marr" style="flex:1">
                                <img src="../assets/images/ico_gz.png" alt />
                                <span class="numTj" style="margin-right:110px">
                                    <span class="numstyle">{{ gSum }}</span>
                                    <div class="msT">故障</div>
                                </span>
                                <img src="../assets/images/ico_yj.png" alt />
                                <span class="numTj">
                                    <span class="numstyle">{{ ySum }}</span>
                                    <div class="msT">预警</div>
                                </span>
                            </div>
                        </div>
                        <div class="today_num" style="display:flex">
                            <div class="marr" style="flex:1">
                                <img src="../assets/images/icon_dsh.png" alt />
                                <span class="numTj">
                                    <span class="numstyle" style="margin-right:55px">{{ dSum }}</span>
                                    <div class="msT">待审核预警信息</div>
                                </span>
                                <img src="../assets/images/icon_wx.png" alt />
                                <span class="numTj">
                                    <span class="numstyle">{{ wSum }}</span>
                                    <div class="msT">维修</div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="clglBox">
                        <div class="today_title">车辆管理</div>
                        <div id="myChartmain" class="bg"></div>
                    </div>
                </div>
                <div class="leftB" style="flex:1">
                    <div class="fxdjBox" style="text-align: center;">
                        <div class="today_title">故障类型统计</div>
                        <span class="text" style="margin-top:27px;margin-right:40px">{{gzVehicleType}}</span>
                        <span class="text" style="margin-right:10px;margin-top:27px;">{{gzProvince}}</span>
                        <span class="text" style="margin-right:10px;margin-top:27px;">{{gzTime}}</span>
                        <div id="fxdjTable" @click="gzTableChange"></div>
                        <span class="">{{chex}}</span>
                        <span class="">{{city}}</span>
                        <span class="">{{riqi}}</span>
                    </div>
                    <div class="fxdjBox" style="margin-top:7px">
                        <div class="today_title">预警类型统计</div>
                        <span class="text" style="margin-top:27px;margin-right:40px">{{yjVehicleType}}</span>
                        <span class="text" style="margin-right:10px;margin-top:27px;">{{yjProvince}}</span>
                        <span class="text" style="margin-right:135px;margin-top:27px;">{{yjTime}}</span>
                        <div id="yjTable" @click="yjTableChange"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <el-dialog title="警报" customClass="customWidth" :visible.sync="FormVisibledel" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
            <div style="width:100%; display:flex;justify-items: center;justify-content: center;">
                <img src="../assets/images/hg.png" alt />
                <span style="margin-top:4px;">高风险v151212020-09-18 18:12:34</span>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import top from "@/components/header";
import echarts from "echarts";
import china from "echarts/map/json/china.json";
import { findByNewestOne, countTodayGrow, faultNotification, showGraphType, ProvinceWarningIndex, vehicleCounts, getFailureStatistics, getWarningStatistics } from "@/api/login"
export default {
    components: {
        top
    },
    data() {
        return {
            //故障类型统计
            gzVehicleType: '-',
            gzProvince: '-',
            gzTime: '-',
            failureData: [],
            failure: [],
            hitchData: [],
            //预警类型统计
            yjVehicleType: '-',
            yjProvince: '-',
            yjTime: '-',
            warningData: [],
            warning: [],
            roseData: [],
            //车辆管理
            vehicleCount: '-',//车辆总数
            OrgCount: '-',//实时在线
            provinceData: [],//车辆管理
            risk: [], //加号显示
            box: [], //盒子显示
            //电池包异常
            province: '-',//省份
            vehicleType: '-', //车型
            time: '-', //时间段
            interval: null,
            pingData: [],
            //故障统计
            chex: "",
            city: "",
            riqi: "",
            //今日新增部分
            cSum: "-",
            gSum: "-",
            ySum: "-",
            dSum: "-",
            wSum: "-",
            animate: false, //通知栏
            active: 1,
            FormVisibledel: true,
            marqueeList: []
        };
    },
    computed: {
        //通知栏颜色
        activation() {
            return (icontent) => {
                // 使用JavaScript闭包，进行传值操作
                if (icontent.includes("高")) {
                    return { color: "#F94949" };
                } else if (icontent.includes("低")) {
                    return { color: "#F1FE87" };
                } else if (icontent.includes("中")) {
                    return { color: "#FEB187" };
                }
            };
        },
    },
    created() {
        // 通知动画
        this.timer1 = setInterval(this.scroll, 1000);
    },
    methods: {
        //故障类型统计
        FailureStatistics() {
            getFailureStatistics().then((res) => {
                const data = res.data.data;
                console.log('故障', data);
                this.hitchData = data
                data.forEach(item => {
                    this.failure.push(item.name)
                    this.failureData.push(item.value)
                })
                // this.drawBarPie()//饼
                this.drawBar()//柱
            })
        },
        //预警类型统计
        WarningStatistics() {
            getWarningStatistics().then((res) => {
                const data = res.data.data;
                this.roseData = data
                data.forEach(item => {
                    this.warning.push(item.name)
                    this.warningData.push(item.value)
                })
                // this.drawBarYj()//柱--你位置特殊。。。
                this.drawBarYjPie()//饼
            })
        },
        //车辆管理
        getVehicleCou() {
            vehicleCounts().then((res) => {
                const data = res.data.data;
                console.log('车辆在线', data);
                this.vehicleCount = data.vehicleCount //车辆总数
                this.OrgCount = data.OrgCount//实时在线
            })
            this.chainMap()
        },
        getProvinceWarningIndex() {
            ProvinceWarningIndex().then((res => {
                const data = res.data.data
                console.log('车辆详情数', data);
                data.forEach(item => {
                    this.provinceData.push({
                        name: item.province,
                        value: [
                            { name: "高风险预警", value: item.highriskNum },
                            { name: "中风险预警", value: item.medriskNum },
                            { name: "低风险预警", value: item.lowriskNum },
                            { name: "安全", value: item.safetyNum }
                        ]
                    })
                })
                // console.log('provinceData', this.provinceData);
                this.chainMap()
            }))
        },
        //电池包异常识别
        getShowGraphType() {
            showGraphType().then((res) => {
                const data = res.data.data
                console.log('data', data);
                this.province = data.province //省份
                this.vehicleType = data.vehicleType //车型
                this.time = data.dt //时间段        
                const arr = []
                const result = []
                const exceptionMaps = res.data.data.exceptionMaps
                exceptionMaps.forEach((item, index) => {
                    // console.log('item', item);
                    if (item.exceptionMap.vehivles) {
                        // console.log(1111, item.exceptionMap.vehivles); //"80" "v1121"
                        // arr.push(Object.values(item.exceptionMap.vehivles))
                        this.risk.push('2000') //目前是+号显示位置
                    }
                    // arr.forEach(item => {
                    //     var arrJoinString = item.join();
                    //     console.log(444, arrJoinString)
                    //     result.push(arrJoinString)
                    //     console.log(5555, item);
                    // })
                    // console.log(3333333333333, result);
                    delete item.exceptionMap.vehivles
                    this.box.push(Object.values(item.exceptionMap))
                })
                // console.log('arr', arr);
                // console.log('box', this.box);
                this.drawBoxplot()
            }).catch(res => { });
        },
        //通知
        getFaultNotification() {
            faultNotification().then((res) => {
                this.marqueeList = res.data.data
            }).catch(res => { });
        },
        // 今日新增
        getCountTodayGrow() {
            countTodayGrow().then((res) => {
                const data = res.data.data;
                this.gSum = data.failure;
                this.ySum = data.grow;
                this.dSum = data.dealGrow;
                this.wSum = data.maintain;
            }).catch(res => { });
        },
        //风险等级
        covertType(type) {
            if (type === "lowrisk_num") {
                return "低风险";
            } else if (type === "medrisk_num") {
                return "中风险";
            } else if (type === "highrisk_num") {
                return "高风险";
            }
        },
        getFindByNewestOne() {
            findByNewestOne().then((res) => {
                const arr = res.data.data;
                arr.forEach(item => {
                    this.pingData.push({
                        name: this.covertType(item.name),
                        value: item.value
                    })
                })
                this.drawPie()
            })
        },
        //点击故障统计图内任意位置,跳转到故障统计模块
        gzTableChange() {
            this.$router.push({ name: 'failure' })
        },
        //点击预警统计图内任意位置,跳转到预警统计模块
        yjTableChange() {
            this.$router.push({ name: 'early' })
        },
        //通知栏跳转至风险电池管理页面
        goPage() {
            this.$router.push({ name: 'batterys' })
        },
        scroll() {
            let con1 = this.$refs.con1;
            // con1.style.marginTop = '-30px';
            this.animate = !this.animate;
            var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
            setTimeout(function () {
                that.marqueeList.push(that.marqueeList[0]);
                that.marqueeList.shift();
                // con1.style.marginTop = '0px';
                that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
            }, 1000);
        },
        //鼠标悬停暂停滚动
        mEnter() {
            clearInterval(this.timer1);
        },
        // 鼠标离开继续滚动
        mLeave() {
            this.timer1 = setInterval(this.scroll, 1000);
        },
        //点击关闭dialog
        handleClose(done) {
            this.FormVisibledel = false;
        },
        // 故障类型统计饼
        drawBarPie() {
            let myChart = this.$echarts.init(document.getElementById("fxdjTable"));
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                grid: {
                    bottom: '20%'
                },
                series: [
                    {
                        name: '故障统计',
                        type: 'pie',
                        radius: ["20%", "50%"],
                        labelLine: {
                            normal: {
                                length: 10,     //折线
                                length2: 15    //文字下面的线
                            },
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff',  // 改变标示文字的颜色
                                },
                            }
                        },
                        color: ['#FEB187', '#347EE7', '#2FC6F1', '#2FE1F1', '#87FEAE', '#87FED3', '#D0FE87', '#F1FE87', '#FEEC87'],
                        data: this.hitchData
                    }
                ]
            })
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        //故障类型统计柱
        drawBar() {
            let that = this
            let myChart = this.$echarts.init(document.getElementById("fxdjTable"));
            myChart.setOption({
                title: { text: "" }, //主标题文本。
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                grid: {
                    // y: 25,
                    left: "20%",
                    containLable: true,
                    bottom: "50%"
                },
                yAxis: {
                    name: "(辆)",
                    nameTextStyle: {
                        color: "#ffffff",
                        fontSize: 12,
                        // padding: [25, 0, 0, 0]
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)",
                            type: "dashed"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#fff"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)"
                        }
                    }
                },
                xAxis: {
                    axisLine: {  //坐标轴轴线相关设置
                        // show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)",
                        }
                    },
                    axisLabel: {   //坐标轴刻度标签的相关设置
                        // interval: 0,
                        // rotate: 30,
                        formatter: function (val) {  //文字纵向展示
                            return val.split("").join("\n");
                        },
                        color: "#fff",
                        textStyle: {
                            fontSize: 10      //更改坐标轴文字大小
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    // data: ["1", "2", "3", "4", "5", "6"]
                    data: that.failure
                },
                series: [
                    {
                        name: "故障统计",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    {
                                        offset: 0,
                                        color: "#08FEF5"
                                    },
                                    {
                                        offset: 1,
                                        color: "#08FEF5"
                                    }
                                ], false),
                                barBorderRadius: 0,
                                borderWidth: 0.5,
                                borderColor: "rgba(0,0,0,1)",
                                label: {
                                    show: false,
                                    position: "top"
                                    // formatter: function(p) {
                                    //   return p.value > 0 ? p.value : "";
                                    // }
                                }
                            }
                        },
                        emphass: {
                            itemStyle: {
                                color: '#333fff'
                            }
                        },
                        type: "bar",
                        barGap: 8,
                        barWidth: 10,
                        data: that.failureData
                    }
                ]
            });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        // 预警类型统计柱
        drawBarYj() {
            let that = this
            let myChart = this.$echarts.init(document.getElementById("yjTable"));
            myChart.setOption({
                title: { text: "" }, //主标题文本。
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                grid: {
                    // y: 25,
                    left: "20%",
                    containLable: true,
                    bottom: "50%"
                },
                yAxis: {
                    name: "(辆)",
                    nameTextStyle: {
                        color: "#ffffff",
                        fontSize: 12,
                        // padding: [25, 0, 0, 0]
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)",
                            type: "dashed"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: "#fff"
                    },
                    axisLine: {
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)"
                        }
                    }
                },
                xAxis: {
                    axisLine: {  //坐标轴轴线相关设置
                        // show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)",
                        }
                    },
                    axisLabel: {   //坐标轴刻度标签的相关设置
                        // interval: 0,
                        // rotate: 30,
                        formatter: function (val) {  //文字纵向展示
                            return val.split("").join("\n");
                        },
                        color: "#fff",
                        textStyle: {
                            fontSize: 10      //更改坐标轴文字大小
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    // data: ["1", "2", "3", "4", "5", "6"]
                    data: that.warning
                },
                series: [
                    {
                        name: "预警类型统计",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    {
                                        offset: 0,
                                        color: "#08FEF5"
                                    },
                                    {
                                        offset: 1,
                                        color: "#08FEF5"
                                    }
                                ], false),
                                barBorderRadius: 0,
                                borderWidth: 0.5,
                                borderColor: "rgba(0,0,0,1)",
                                label: {
                                    show: false,
                                    position: "top"
                                    // formatter: function(p) {
                                    //   return p.value > 0 ? p.value : "";
                                    // }
                                }
                            }
                        },
                        emphass: {
                            itemStyle: {
                                color: '#333fff'
                            }
                        },
                        type: "bar",
                        barGap: 8,
                        barWidth: 10,
                        data: that.warningData
                    }
                ]
            });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        //预警类型统计饼
        drawBarYjPie() {
            let myChart = this.$echarts.init(document.getElementById("yjTable"));
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                grid: {
                    bottom: '20%'
                },
                series: [
                    {
                        name: '预警类型统计',
                        type: 'pie',
                        radius: ["20%", "50%"],
                        labelLine: {
                            normal: {
                                length: 10,     //折线
                                length2: 15    //文字下面的线
                            },
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff',  // 改变标示文字的颜色
                                },
                            }
                        },
                        color: ['#FEB187', '#347EE7', '#2FC6F1', '#2FE1F1', '#87FEAE', '#87FED3', '#D0FE87', '#F1FE87', '#FEEC87'],
                        data: this.roseData
                    }
                ]
            })
        },
        // 风险等级
        drawPie() {
            let that = this
            let myChart = this.$echarts.init(document.getElementById("ljTable"));
            // var data=[
            //       { value: 35, name: '高风险' },
            //       { value: 45, name: '中风险' },
            //       { value: 55, name: '低风险' },
            //   ];
            myChart.setOption({
                color: ["#FEB187", "#F94949", "#F1FE87"],
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                grid: {
                    y: 25,
                    left: "8%",
                    right: "28%"
                },
                legend: {
                    orient: "vertical",
                    left: "60%",
                    top: "center",
                    itemWidth: 12,
                    itemHeight: 6,
                    itemGap: 20,
                    textStyle: {
                        color: "#fff",
                        fontSize: 14
                    },
                    // icon: "circle",//圆形图标
                    data: ["高风险", "中风险", "低风险"]
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
                        name: "风险等级",
                        type: "pie",
                        radius: ["30%", "60%"],
                        center: ["35%", "45%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: false,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: JSON.parse(JSON.stringify(that.pingData))
                        //  [
                        //     { value: 35, name: "高风险" },
                        //     { value: 45, name: "中风险" },
                        //     { value: 55, name: "低风险" }
                        // ]
                    }
                ]
            });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        // 电池包异常识别
        drawBoxplot() {
            let myChart = this.$echarts.init(document.getElementById("dcbycTable"));
            myChart.setOption({
                title: {
                    show: false,
                    text: "离群车辆",
                    x: "center",
                    bottom: 10,
                    textStyle: {
                        color: "#ffffff",
                        fontSize: 16,
                        fontWeight: "normal"
                    }
                },
                legend: {
                    show: false,
                    bottom: "5%",
                    data: [
                        {
                            name: "离群车辆",
                            icon: "circle"
                        }
                    ],
                    textStyle: {
                        color: "#ffffff",
                        fontSize: 16,
                        fontWeight: "normal"
                    }
                },
                tooltip: {
                    trigger: "item",
                    axisPointer: {
                        type: "shadow"
                    },
                    confine: true,

                },
                grid: {
                    y: 25,
                    left: "8%",
                    right: "10%",
                    top: "20 %"
                },
                xAxis: {
                    type: "category",
                    data: ["1", "2", "3", "4", "5", "6", "7", "8"],
                    nameTextStyle: {
                        color: "#ffffff",
                        fontSize: 14
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#2BE3F5"
                        }
                    },
                    axisLabel: {
                        color: "#fff"
                    },
                    splitLine: {
                        show: false
                    }
                },

                yAxis: {
                    type: "value",
                    nameTextStyle: {
                        color: "#3259B8",
                        fontSize: 14
                    },
                    axisLabel: {
                        show: false,
                        color: "#fff"
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#2BE3F5"
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#2BE3F5"
                        }
                    }
                },
                series: [
                    {
                        name: "离群车辆",
                        type: "boxplot",
                        boxWidth: 15,
                        data: this.box,
                        itemStyle: {
                            normal: {
                                borderColor: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "#2BE3F5" // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "#2BE3F5" // 100% 处的颜色
                                        }
                                    ],
                                    globalCoord: false // 缺省为 false
                                },
                                borderWidth: 2,
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "rgba(43, 227, 245, 0.7)" // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(43, 227, 245, 0.7)" // 100% 处的颜色
                                        }
                                    ],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        tooltip: {
                            //盒子显示内容
                            formatter: function (param) {
                                return [
                                    '上四分位: ' + param.data[3], //上四分位
                                    '中位: ' + param.data[2],//待定
                                    '下四分位: ' + param.data[1],//下四分位
                                    '最大值: ' + param.data[4],//最大值
                                    '最小值: ' + param.data[5],//最小值
                                ].join('<br/>');
                            }
                        }
                    },
                    {
                        name: "离群车辆",
                        type: "scatter",
                        symbol:
                            "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAK0lEQVQYlWP8kFrLgAT+Q9mMMDEmZFlsgKACFiRjsVlFnAlwB9HAkQwMDABhFAXlxanpQwAAAABJRU5ErkJggg==",
                        data:
                            this.risk,
                        // [
                        //     '0',
                        //     '1',
                        //     '2',
                        //     '3',
                        //     '4',
                        //     '5'
                        // ],
                        //              "vin": 'v111',
                        // "outliers": '80'
                        tooltip: {
                            //加号显示内容
                            show: false,
                            triggerOn: 'click',
                            enterable: true, // 鼠标可移入tooltip中
                            // formatter: function (e) {
                            //     // return e.data.displayname;
                            //     console.log(1111);
                            //     // this.hhhh()
                            //     return `<span onclick="myClick">这是显示的文本</span>`
                            // },
                            formatter: function (params) {
                                // console.log('params', params);
                                var html = '';
                                html += params.data;
                                return html;
                            },
                            //     formatter: function (param) {
                            //         console.log('param', param);
                            //         return [
                            //             "outliers:" + param.data.substr(0, 1),
                            //             "vin: " + 'v' + param.data,
                            //         ].join("<br/>");
                            //     }
                        }

                    },
                    // tooltip: {
                    //     show: true,
                    //     formatter: function(e) {
                    //         // return e.data.displayname;
                    //         return 'hello';
                    //     },
                    //     // position: [500, 10],
                    //     triggerOn: 'click'
                    // },

                ]
            }
            );
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        },
        // 车辆管理
        chainMap() {
            let that = this
            /* eslint-disable */
            let myChart = this.$echarts.init(document.getElementById("myChartmain"));
            this.$echarts.registerMap("china", china);
            var mapName = "china";
            var data = [
                { name: "北京", value: 199 },
                { name: "天津", value: 420 },
                { name: "河北", value: 1020 },
                { name: "山西", value: 810 },
                { name: "内蒙古", value: 470 },
                { name: "辽宁", value: 670 },
                { name: "吉林", value: 820 },
                { name: "黑龙江", value: 500 },
                { name: "上海", value: 240 },
                { name: "江苏", value: 920 },
                { name: "浙江", value: 1140 },
                { name: "安徽", value: 1090 },
                { name: "福建", value: 1160 },
                { name: "江西", value: 910 },
                { name: "山东", value: 1190 },
                { name: "河南", value: 1370 },
                { name: "湖北", value: 1160 },
                { name: "湖南", value: 1140 },
                { name: "重庆", value: 910 },
                { name: "四川", value: 1250 },
                { name: "贵州", value: 620 },
                { name: "云南", value: 830 },
                { name: "西藏", value: 1000 },
                { name: "陕西", value: 8000 },
                { name: "甘肃", value: 5600 },
                { name: "青海", value: 10000 },
                { name: "宁夏", value: 18000 },
                { name: "新疆", value: 1800 },
                { name: "广东", value: 12300 },
                { name: "广西", value: 5900 },
                { name: "海南", value: 4655 },
                { name: "台湾", value: 4546 },
                { name: "香港", value: 7562 },
                { name: "澳门", value: 2538 },
            ];
            // function mapTooltipClick(name) {
            //     alert(name)
            // };
            var geoCoordMap = {};
            var toolTipData = that.provinceData

            // console.log('Tooltipdata', toolTipData);
            toolTipData.sort((a, b) => {
                let order = ['上海', '甘肃', '贵州', '海南', '安徽', '江苏', '浙江', '新疆', '青海', '西藏', '宁夏'
                    , '内蒙古', '广东', '福建', '广西', '河南', '湖北', '湖南', '江西', '北京', '吉林', '辽宁', '黑龙江'
                    , '天津', '山东', '山西', '河北', '陕西', '四川', '重庆', '云南', '香港', '澳门', '台湾'];
                return order.indexOf(a.name) - order.indexOf(b.name);
            });
            // console.log('排序', toolTipData);
            /*获取地图数据*/
            myChart.showLoading();
            var mapFeatures = echarts.getMap(mapName).geoJson.features;
            myChart.hideLoading();
            mapFeatures.forEach(function (v) {
                // 地区名称
                var name = v.properties.name;
                // 地区经纬度
                geoCoordMap[name] = v.properties.cp;
            });

            //   console.log(data);
            //   console.log(toolTipData);

            //var max = 480;
            //var min = 9; // todo
            // var maxSize4Pin = 100,
            //   minSize4Pin = 20;

            // var convertData = function(data) {
            //   var res = [];
            //   for (var i = 0; i < data.length; i++) {
            //     var geoCoord = geoCoordMap[data[i].name];
            //     if (geoCoord) {
            //       res.push({
            //         name: data[i].name,
            //         value: geoCoord.concat(data[i].value)
            //       });
            //     }
            //   }
            //   return res;
            // };

            let option = {
                title: {
                    top: "6%",
                    text: "车辆总数：" + this.vehicleCount + "辆，实时在线：" + this.OrgCount + "辆",
                    left: "center",
                    textStyle: {
                        fontSize: "13",
                        fontWeight: "400",
                        color: "rgba(103,225,255,1)"
                    }
                },
                tooltip: {
                    padding: 0,
                    enterable: true,
                    transitionDuration: 1,
                    formatter: function (params) {
                        // console.log('params.dataIndex', params.dataIndex, params.data.name);
                        // console.log('params', params);
                        var tipHtml = "";
                        tipHtml =
                            '<div style="width:150px;height:110px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,0,0,0.3);border-radius:6px;">' +
                            '<div style="width:150px;border-bottom:1px solid rgba(255,255,255,0.2);">' +
                            '<i style="display:inline-block;width:6px;height:6px;border-radius:40px;">' +
                            "</i>" +
                            '<span style="color:#fff;font-size:12px;">' +
                            params.name +
                            "&nbsp;&nbsp;&nbsp;&nbsp;" +
                            "预警数量统计" +
                            "</span>" +
                            "</div>" +
                            '<div style="padding:0 20px">' +
                            '<p style="color:#fff;font-size:12px;line-height:1px">' +
                            '<i style="display:inline-block;width:6px;height:6px;background:#F94949;margin:0 5px;border-radius: 50%;">' +
                            "</i>" +
                            "高风险预警" +
                            '<span style="color:#11ee7d;font-size:12px;">' +
                            toolTipData[params.dataIndex].value[0].value +
                            "</span>" +
                            "条" +
                            "</p>" +
                            '<p style="color:#fff;font-size:12px;line-height:1px">' +
                            '<i style="display:inline-block;font-size:12px;width:6px;height:6px;background:#FEB187;margin:0 5px;border-radius: 50%;">' +
                            "</i>" +
                            "中风险预警" +
                            '<span style="color:#f48225;font-size:12px;">' +
                            toolTipData[params.dataIndex].value[1].value +
                            "</span>" +
                            "条" +
                            "</p>" +
                            '<p style="color:#fff;font-size:12px;line-height:1px">' +
                            '<i style="display:inline-block;font-size:12px;width:6px;height:6px;background:#F1FE87;margin:0 5px;border-radius: 50%;">' +
                            "</i>" +
                            "低风险预警" +
                            '<span style="color:#f4e925;font-size:12px;">' +
                            toolTipData[params.dataIndex].value[2].value +
                            "</span>" +
                            "条" +
                            "</p>" +
                            "</p>" +
                            '<p style="color:#fff;font-size:12px;line-height:1px">' +
                            '<i style="display:inline-block;width:6px;height:6px;background:#2FC6F1;margin:0 5px;border-radius: 50%;">' +
                            "</i>" +
                            "安全" +
                            '<span style="color:#f4e925;font-size:12px;">' +
                            toolTipData[params.dataIndex].value[3].value +
                            "</span>" +
                            "条" +
                            "</p>" +
                            "</div>" +
                            "</div>";
                        // setTimeout(function() {
                        //   tooltipCharts(params.name);
                        // }, 10);
                        return tipHtml;
                    } //数据格式化
                },
                visualMap: {
                    left: '30',
                    bottom: '20',
                    show: true,
                    x: 'left',
                    inverse: true,//是否反转 visualMap 组件
                    // y: 'center',
                    // orient: "horizontal", //'vertical'  horizontal
                    // left: "center", //center
                    itemWidth: 12, //图形的宽度，即长条的宽度。
                    itemHeight: 6, //图形的高度，即长条的高度。
                    textStyle: {
                        color: "#FFFFFF"
                    },
                    type: "piecewise", //分段型。
                    splitNumber: 5,
                    //inverse: true,
                    pieces: [
                        {
                            value: 0,
                            label: "0",
                            color: "#ffffff"
                        },
                        {
                            gt: 1,
                            lt: 9,
                            label: "1-9",
                            color: "#B3DFE7"
                        },
                        {
                            gte: 10,
                            lt: 99,
                            label: "10-99",
                            color: "#92C3E1"
                        },
                        {
                            gte: 100,
                            lte: 499,
                            label: "100-499",
                            color: "#5095D6"
                        },
                        {
                            gt: 500,
                            lte: 999,
                            label: "500-999",
                            color: "#3986D5"
                        },
                        {
                            gt: 1000,
                            lte: 10000,
                            label: "1000-10000",
                            color: "#0058C9"
                        },
                        {
                            gt: 10000,
                            label: ">10000",
                            color: "#004CAD"
                        }
                    ]
                },
                series: [
                    {
                        name: "车辆数",
                        type: "map",
                        mapType: "china",
                        roam: false,
                        //aspectScale: 1, //长宽比
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: true,
                                color: "#000E15",
                                areaColor: "#FFFFFF" //鼠标选择区域颜色
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: "#0058C9",
                                borderColor: "rgba(0,0,0,0.2)"
                            },
                            emphasis: {
                                areaColor: "#FEB187" //省份显示颜色
                            }
                        },
                        data:
                            // this.provinceData,
                            [
                                { name: "上海", value: 102.76 },
                                { name: "甘肃", value: 14.29 },
                                { name: "贵州", value: 362 },
                                { name: "海南", value: 3.4 },
                                { name: "安徽", value: 92.96 },
                                { name: "江苏", value: 239.27 },
                                { name: "浙江", value: 214.79 },
                                { name: "新疆", value: 678 },
                                { name: "青海", value: 431 },
                                { name: "西藏", value: 2270 },
                                { name: "宁夏", value: 4.88 },
                                { name: "内蒙古", value: 438 },
                                { name: "广东", value: 264 },
                                { name: "福建", value: 62.54 },
                                { name: "广西", value: 236 },
                                { name: "河南", value: 202.06 },
                                { name: "湖北", value: 10 },
                                { name: "湖南", value: 11.19 },
                                { name: "江西", value: 37.55 },
                                { name: "北京", value: 57.34 },
                                { name: "吉林", value: 989 },
                                { name: "辽宁", value: 642 },
                                { name: "黑龙江", value: 200001 },
                                { name: "天津", value: 48.61 },
                                { name: "山东", value: 326.43 },
                                { name: "山西", value: 47.75 },
                                { name: "河北", value: 114.15 },
                                { name: "陕西", value: 55.26 },
                                { name: "四川", value: 4 },
                                { name: "重庆", value: 16.1 },
                                { name: "云南", value: 2164 },
                                { name: '台湾', value: 3 },
                                { name: '香港', value: 5 },
                                { name: '澳门', value: 5 }
                            ]
                    }
                ]
            };
            myChart.setOption(option);
            // var count = 0;
            //   var timeTicket = null;
            //   var dataLength = option.series[0].data.length;
            //   timeTicket && clearInterval(timeTicket);
            //   timeTicket = setInterval(function() {
            //       myChart.dispatchAction({
            //           type: 'downplay',
            //           seriesIndex: 0,
            //       });
            //       myChart.dispatchAction({
            //           type: 'highlight',
            //           seriesIndex: 0,
            //           dataIndex: (count) % dataLength
            //       });
            //       myChart.dispatchAction({
            //           type: 'showTip',
            //           seriesIndex: 0,
            //           dataIndex: (count) % dataLength
            //       });
            //       count++;
            //   }, 1000);
            //   myChart.on('mouseover', function(params) {
            //       console.log(params)
            //       clearInterval(timeTicket);
            //       myChart.dispatchAction({
            //           type: 'downplay',
            //           seriesIndex: 0
            //       });
            //       myChart.dispatchAction({
            //           type: 'highlight',
            //           seriesIndex: 0,
            //           dataIndex: params.dataIndex
            //       });
            //       myChart.dispatchAction({
            //           type: 'showTip',
            //           seriesIndex: 0,
            //           dataIndex: params.dataIndex,
            //       });
            //   });
            //   myChart.on('mouseout', function(params) {
            //       timeTicket && clearInterval(timeTicket);
            //       timeTicket = setInterval(function() {
            //           myChart.dispatchAction({
            //               type: 'downplay',
            //               seriesIndex: 0,
            //           });
            //           myChart.dispatchAction({
            //               type: 'highlight',
            //               seriesIndex: 0,
            //               dataIndex: (count) % dataLength
            //           });
            //           myChart.dispatchAction({
            //               type: 'showTip',
            //               seriesIndex: 0,
            //               dataIndex: (count) % dataLength
            //           });
            //           count++;
            //       }, 1000);
            //   });
            // var index = 0; //播放所在下标
            // var showTip = setInterval(function() {
            //   myChart.dispatchAction({
            //     type: "showTip",
            //     seriesIndex: 0,
            //     dataIndex: index
            //   });
            //   index++;
            //   if (index >= option.series[0].data.length) {
            //     index = 0;
            //   }
            // }, 2000);
            // myChart.on("mouseover", function(params) {
            //   clearInterval(showTip);
            //   myChart.dispatchAction({
            //     type: "showTip",
            //     seriesIndex: 0,
            //     dataIndex: params.dataIndex
            //   });
            // });
            // myChart.on("mouseout", function(params) {
            //   showTip && clearInterval(showTip);
            //   showTip = setInterval(function() {
            //     myChart.dispatchAction({
            //       type: "showTip",
            //       seriesIndex: 0,
            //       dataIndex: index
            //     });
            //     index++;
            //     if (index >= option.series[0].data.length) {
            //       index = 0;
            //     }
            //   }, 2000);
            // });
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }

    },
    mounted() {
        var that = this
        this.getFindByNewestOne();//风险等级
        this.getCountTodayGrow()// 今日新增
        this.getFaultNotification()//通知
        this.getShowGraphType()//电池包异常识别
        this.getProvinceWarningIndex()//车辆管理
        this.getVehicleCou()//车辆管理
        this.FailureStatistics()//故障类型统计
        this.WarningStatistics()//预警类型统计
        // that.interval = setInterval(function () {
        //     var myDate = new Date()
        //     console.log(myDate.toLocaleString(), '每秒刷新')
        //     that.getFaultNotification()
        //     that.getCountTodayGrow()
        // }, 1000)
        // window.addEventListener("resize", function() {
        //  myChart.resize();
        // });
    },
    // destroyed: function () {
    //     clearInterval(this.interval)
    // },

};
</script>

<style lang="less" scoped>
@import "../assets/fonts/fonts.css";
* {
    margin: 0;
    padding: 0;
}
.anim {
    transition: all 0.5s;
}
#con1 li {
    list-style: none;
    line-height: 37px;
    height: 37px;
}
//通知动画 /*文字无缝滚动*/
// .anim {
//   position: relative;
//   animation: myMove 8s linear infinite;
//   animation-fill-mode: forwards;
// }
// .anim:hover {
//   animation-play-state: paused; //鼠标悬停暂停动画
// }
// @keyframes myMove {
//   0% {
//     transform: translateY(0);
//   }
//   100% {
//     transform: translateY(-200px);
//   }
// }
html {
    margin: 0;
    padding: 0;
    overflow: -moz-hidden-unscrollable;
    height: 100%;
}

body::-webkit-scrollbar {
    display: none;
}
body {
    margin: 0;
    padding: 0;
    -ms-overflow-style: none;
    height: 100%;
    overflow: auto;
}
.wrap {
    box-sizing: border-box;
    // min-width: 100%;
    min-height: 100%;
    background: url(../assets/images/bg_2.png) no-repeat;
    background-size: 100% 100%;
}
.today_title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    // background-size: 100% 100%;
}
.main {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
}
.mess_box {
    overflow: hidden;
    width: 100%;
    background-image: url(../assets/images/tz.png);
    background-size: 100% 100%;
    height: 200px;
    text-align: center;
    // display: flex;
    // justify-content: flex-start;
    // justify-items: center;
    img {
        display: block;
        margin-top: 30px;
        margin-left: 20px;
    }
}
.messList {
    transition: all ease 0.5s;
    text-align: left;
}
.messList ul {
    margin: 0;
    padding: 0;
}
.messList ul li {
    margin-top: 16px;
    margin-left: 31px;
    list-style: none;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
}
.clglBox {
    width: 100%;
    background-image: url(../assets/images/clgl_.png);
    background-size: 100% 100%;
    text-align: center;
    margin-left: 10px;
    margin-top: 10px;
    #myChartmain {
        width: 100%;
        height: 470px;
    }
}
.numstyle {
    height: 16px;
    line-height: 16px;
    font-size: 24px;
    font-family: Digiface;
    font-weight: 400;
    color: #08fef5;
    margin-left: -20px;
}
.msT {
    font-family: PingFang SC;
    height: 12px;
    line-height: 12px;
    color: #ffffff;
    font-weight: 400;
    font-size: 12px;
}

.today_box {
    width: 100%;
    background-image: url(../assets/images/tz.png);
    background-size: 100% 100%;
    height: 200px;
    text-align: center;
    margin: 0 10px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .today_title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;
        // background-size: 100% 100%;
    }
    .today_num {
        // margin: 0 auto;
        // margin-left: 54px;
        // width: 80%;
        // margin-right: 34px;
        // display: flex;
        // justify-content: flex-start;
        // align-items: center;
        margin: 10px 60px 10px 70px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(113, 183, 238, 0.7);
        img {
            width: 38px;
            height: 38px;
            display: block;
            float: left;
            margin: 15px 0;
            margin-right: 12px;
        }
        .numTj {
            float: left;
            margin-top: 18px;
            margin-right: 50px;
            // display: block;
            // height: 62px;
        }
    }
}
.right_box {
    width: 33.3%;
}
.wrap_con2 {
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-items: center;
    justify-content: space-between;
    overflow: hidden;
}

.ycsbBox {
    text-align: center;
    width: 100%;
    background-image: url(../assets/images/dcyc_.png);
    background-size: 100% 100%;
    #dcbycTable {
        width: 100%;
        height: 255px;
    }
    .text {
        border: 1px solid #448aca;
        float: right;
        color: #fff;
        font-size: 12px;
        padding: 0px 5px;
    }
    .boxtip {
        position: absolute;
        margin-top: -30px;
        left: 50%;
        margin-left: -30px;
        text-align: center;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        span {
            margin-right: 5px;
        }
    }
}
.fxdjBox_ {
    text-align: center;
    width: 100%;
    background-image: url(../assets/images/tz.png);
    background-size: 100% 100%;
    #ljTable {
        width: 100%;
        height: 188px;
    }
}
.leftB {
    width: 33%;
    .fxdjBox {
        text-align: center;
        width: 100%;
        background-image: url(../assets/images/gzlx.png);
        background-size: 100% 100%;
        height: 345px;
        // background-repeat: no-repeat;
        // display: flex;
        // justify-items: center;
        // justify-content: center;
        overflow: hidden;
        #fxdjTable {
            width: 100%;
            height: 330px;
            top: 20px;
        }
        #yjTable {
            width: 100%;
            height: 340px;
        }
        .text {
            border: 1px solid #448aca;
            float: right;
            color: #fff;
            font-size: 12px;
            padding: 0px 5px;
        }
    }
}
.middleB {
    margin-right: 20px;
    .title {
        margin: 20px auto;
        width: 302px;
        background-image: url(../assets/images/title_bg.png);
        background-size: 100% 100%;
        height: 51px;
        line-height: 33px;
        text-align: center;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
    }
}
/deep/.el-dialog__wrapper {
    position: fixed;
    top: 20%;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
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
/deep/.el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: #fea958;
}
/deep/.customWidth {
    width: 305px !important;
}
</style>
