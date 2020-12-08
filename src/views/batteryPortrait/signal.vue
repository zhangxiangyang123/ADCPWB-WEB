<template>
    <div class="wrap">
        <toph v-bind:active="active"></toph>
        <div class="main" v-show="showRentPrise">
            <el-breadcrumb separator="/" style="margin-left:15px;">
                <el-breadcrumb-item :to="{ path: '/portrait' }">电池画像</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <a>预警信息可视化</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 搜索工具栏 -->
            <div class="handle-box">
                <div class="box">
                    <el-col :span="24" class="toolbar">
                        <el-form :inline="true" :model="filters" ref="filters">
                            <el-form-item prop="name">
                                <span>车型</span>
                                <el-select v-model="filters.name" placeholder="请选择" clearable size="mini" style="width:200px;" @change="change($event)">
                                    <el-option v-for="item in filters.carOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="carN">
                                <span>车辆VIN</span>
                                <el-input v-model="filters.carN" placeholder="车辆VIN" style="width:195px;" size="mini"></el-input>
                            </el-form-item>
                            <el-form-item prop="fxDj">
                                <span>预警风险等级</span>
                                <el-select v-model="filters.fxDj" placeholder="请选择" clearable size="mini" style="width:93px;" @change="change($event)">
                                    <el-option v-for="item in filters.fengxianOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="yjState">
                                <span>预警状态</span>
                                <el-select v-model="filters.yjState" placeholder="请选择" clearable size="mini" style="width:158px;" @change="change($event)">
                                    <el-option v-for="item in filters.yjztOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="yjtype" style="margin-right:8px;">
                                <span>预警类型</span>
                                <el-select v-model="filters.yjtype" placeholder="请选择" clearable size="mini" style="width:220px;" @change="change($event)">
                                    <el-option v-for="item in filters.yjlxOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item style="margin-right:4px;">
                                <el-button type="primary" @click="handleSearch" size="mini" style="height:32px;">搜索</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="info" size="mini" @click="resetForm" style="height:32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);">重置</el-button>
                            </el-form-item>

                            <!-- <el-form-item style="float:right;">
                            <el-button type="info" size="mini" @click="resetForm" style="height:32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);">重置</el-button>
                            </el-form-item>
                            <el-form-item style="float:right;margin-right:10px;">
                            <el-button type="primary"  @click="handleSearch" size="mini" style="height:32px;">搜索</el-button>
              </el-form-item>-->
                        </el-form>
                    </el-col>
                </div>
            </div>
            <!-- 搜索工具栏 -->
            <!-- 图表区域 -->
            <div class="echartsCon">
                <!-- 按钮区域 -->
                <div class="btns">
                    <div class="showQp" @click="changeStatusqp">
                        <img src="../../assets/images/icon_qp.png" alt />
                        <span>全屏展示</span>
                    </div>
                    <div class="dcBtn" @click="handleEditC()">
                        <img src="../../assets/images/battery/exict.png" alt />导出
                    </div>
                </div>
                <!-- 按钮区域 -->
                <div class="eBoxs">
                    <el-col :span="10">
                        <div style="height: 100%;" ref="chart7"></div>
                        <!-- <div style="height: 100%;" ref="chart8"></div> -->
                    </el-col>
                    <el-col :span="10">
                        <div style="height: 100%;" ref="chart9"></div>
                    </el-col>
                    <el-col :span="4" style="margin-right:6px;">
                        <div class="editB">
                            <div class="tips">当前数据对应失效模式：</div>
                            <!-- <input class="inbox" type="text" value="均衡功能异常" />
              <div class="edBtn"><img src="../../assets/images/icon_edit.png" alt="" /></div>-->
                            <!-- 自定义模板旧↓ -->
                            <!-- <select class="select-box" v-model="selectValue">
                <option v-for="(item, index) in options" :key="index" :value="item.value">{{item.text}}</option>
              </select>-->
                            <!-- <input type="text" class="input-box" ref="inputBox" :value="inputValue" placeholder="请输入或选择数据" @input="changeValue()">                            -->
                            <!-- 自定义模板-zxy -->
                            <el-autocomplete popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch" placeholder="请输入或选择数据" @select="handleSelect">
                                <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.value }}</div>
                                </template>
                            </el-autocomplete>
                            <!-- <div class="edBtn"><img src="../../assets/images/icon_edit.png" alt="" /></div> -->
                        </div>
                    </el-col>
                </div>
                <div class="title">单体电压离散异常</div>
            </div>

            <!-- 图表区域 -->
        </div>
        <div class="main" v-show="showRentPrise2">
            <!-- 图表区域 -->
            <div class="echartsCon">
                <div class="eBoxs" style="margin-top:70px">
                    <div>
                        <div style="height: 100%;" id="chart11" ref="chart11"></div>
                        <!-- <div style="height: 100%;" id="chart12" ref="chart12"></div> -->
                    </div>
                    <div>
                        <div style="height: 100%;" id="chart13" ref="chart13"></div>
                    </div>
                </div>
                <div class="title">单体电压离散异常</div>
                <div class="showQp2" @click="changeStatustqp">
                    <span>单击或ESC退出全屏模式</span>
                </div>
                <div style="clear:both;"></div>
            </div>

            <!-- 图表区域 -->
        </div>
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
                    <el-radio v-model="radio" label="1">WORD文件</el-radio>
                    <br />
                    <el-radio v-model="radio" label="2">PDF文件</el-radio>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="confirmDc('Form')" style="height:32px;padding: 6px 18px;">确定</el-button>
                <el-button @click.native="handleCancel('Form')" style="height:32px;padding: 6px 18px;">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import toph from "@/components/top";
import echarts from "echarts";
export default {
    components: {
        toph,
    },
    data() {
        return {
            restaurants: [],
            state: "",

            // selectValue: '',
            // options: [{
            //     value: '均衡功能异常',
            //     text: "均衡功能异常"
            // }, {
            //     value: '电芯电压异常',
            //     text: "电芯电压异常"
            // }],

            showRentPrise: true,
            showRentPrise2: false,
            FormVisibledc: false,
            active: 3,
            Form: {},
            radio: "1",
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

                fengxianOptions: [
                    {
                        value: "1",
                        label: "1",
                    },
                    {
                        value: "2",
                        label: "2",
                    },
                    {
                        value: "3",
                        label: "3",
                    },
                    {
                        value: "4",
                        label: "4",
                    },
                ],
                yjztOptions: [
                    {
                        value: "已推送",
                        label: "已推送",
                    },
                    {
                        value: "正在处理",
                        label: "正在处理",
                    },
                    {
                        value: "已审核",
                        label: "已审核",
                    },
                    {
                        value: "已处理",
                        label: "已处理",
                    },
                ],
                yjlxOptions: [
                    {
                        value: "温度异常",
                        label: "温度异常",
                    },
                    {
                        value: "车辆离群",
                        label: "车辆离群",
                    },
                    {
                        value: "电压异常",
                        label: "电压异常",
                    },
                    {
                        value: "绝缘异常",
                        label: "绝缘异常",
                    },
                    {
                        value: "SOC异常",
                        label: "SOC异常",
                    },
                ],
                name: "",
                carN: "",
                carnumber: "",
            },
        };
    },
    computed: {
        // 获取select框中所选文本值
        // inputValue: function () {
        //     const self = this;
        //     var value;
        //     //遍历找到对应文本值
        //     this.options.forEach(function (item, index) {
        //         if (item.value === self.selectValue) {
        //             value = item.text;
        //         }
        //     });
        //     return value;
        // }
    },
    methods: {
        //自定义模板
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [{ "value": "电芯电压异常" }, { "value": "均衡功能异常" }];
        },
        handleSelect(item) {
            console.log(item);
        },
        handleIconClick(ev) {
            console.log(ev);
        },


        //    changeValue: function () {
        //         const self = this;
        //         var text = this.$refs.inputBox.value;

        //         //遍历修改对应文本值
        //         this.options.forEach(function (item, index) {
        //             if (item.value === self.selectValue) {
        //                 item.text = text;
        //             }
        //         });

        //     },
        change(value) {
            this.$forceUpdate();
        },
        //导出确定
        confirmDc() {
            this.FormVisibledc = false;
            window.open(_url);
            //   window.open("../powerTest/static/huaxiang.doc");
            // window.open("../dongli/static/huaxiang.doc");
            // window.open("../static/huaxiang.doc");
        },

        //点击关闭dialog
        handleClose(done) {
            this.FormVisibledc = false;
        },
        //点击取消
        handleCancel(formName) {
            this.FormVisibledc = false;
        },
        //导出
        handleEditC: function (index, row) {
            this.FormVisibledc = true;
            this.Form = Object.assign({}, row);
        },
        handleSearch() { },
        resetForm() {
            this.$refs.filters.resetFields();
        },
        changeStatusqp() {
            this.showRentPrise = false;
            this.showRentPrise2 = true;
        },
        changeStatustqp() {
            this.showRentPrise = true;
            this.showRentPrise2 = false;
        },
        draw() {
            let chart7 = this.$echarts.init(this.$refs.chart7);
            let option7 = {
                // tooltip: {
                //     trigger: 'axis',
                //     confine:true
                // },
                // title: {
                //     show: true,
                //     text: '2018年8月28日',
                //     bottom:'0',
                //     left:'right',
                //     textStyle: {
                //         fontSize: '14',
                //         color: '#3E526F',
                //         fontWeight: '600'
                //     }
                // },
                // legend: {
                //     show: false,
                //     data: [],
                //     left: 0,
                //     top: 30
                // },
                // grid: {
                //     top: 20,
                //     left: '50',
                //     right: '4%',
                //     bottom: '60',
                //     containLabel: true
                // },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {
                //             show: false
                //         }
                //     }
                // },
                // xAxis: {
                //     type: 'category',
                //     boundaryGap: false,
                //     axisTick:{
                //         show:false,
                //     },
                //     axisLine: {
                //         lineStyle: {
                //             color: '#A7C6E0',
                //         }
                //     },
                //     axisLabel: {
                //         color: '#3E526F'
                //     },
                //      splitLine: {
                //         show:true,
                //         lineStyle: {
                //         color: '#DDECFA',
                //         width: 1
                //         },
                //     },
                // },
                // yAxis: {
                //     type: 'value',
                //     name: '电池包单体电压N',
                //     nameLocation:'center',
                //     nameGap: 50,
                //     nameTextStyle: {
                //         fontSize: '14',
                //         color: '#3E526F',
                //         fontWeight: '600'
                //     },
                //     splitNumber: 2,
                //     axisTick:{
                //         show:false,
                //     },
                //      axisLine: {
                //         lineStyle: {
                //             color: '#A7C6E0',
                //         }
                //     },
                //     axisLabel: {
                //         color: '#3E526F'
                //     },
                //     splitLine: {
                //         show:true,
                //         lineStyle: {
                //         color: '#DDECFA',
                //         width: 1
                //         },
                //     },
                //     min: 3.6
                // },
                // dataZoom: [{
                //     show: true,
                //     height: 4,
                //     xAxisIndex: [0],
                //     bottom: '30',
                //     start: 20,
                //     end: 80,
                //     handleSize: 20,
                //     handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
                //     //handleSize: '110%',
                //     handleStyle: {
                //         color: "transparent",
                //     },
                //     textStyle: {
                //         color: "transparent"
                //     },
                //     borderColor: 'transparent',
                //     backgroundColor: '#EEEFF3',
                //     dataBackground: {
                //         lineStyle: {
                //             width: 0
                //         },
                //         areaStyle: {
                //             color: 'transparent'
                //         }
                //     },
                //     fillerColor: '#C3C6D1',
                // }, {
                //     type: "inside",
                //     show: true,
                // }],
                // series: [
                //     {
                //         name: '',
                //         type: 'line',
                //         data: [
                //             ['11:00', 3.6],
                //             ['11:30', 3.65],
                //             ['12:00', 3.71],
                //             ['12:30', 3.75],
                //             ['13:00', 3.79],
                //             ['13:30', 3.82],
                //             ['14:00', 3.86],
                //             ['14:30', 3.90],
                //             ['15:00', 4.05],
                //             ['15:30', 4.10],
                //             ['16:00', 4.14],
                //             ['16:30', 4.16],
                //             ['17:00', 4.18],
                //             ['17:30', 4.19],
                //             ['18:00', 4.15]
                //         ],
                //         color: '#5CD9A7'
                //     },
                //     {
                //         name: '',
                //         type: 'line',
                //         data: [
                //             ['11:00', 3.62],
                //             ['11:30', 3.66],
                //             ['12:00', 3.72],
                //             ['12:30', 3.78],
                //             ['13:00', 3.76],
                //             ['13:30', 3.79],
                //             ['14:00', 3.82],
                //             ['14:30', 3.85],
                //             ['15:00', 3.90],
                //             ['15:30', 3.92],
                //             ['16:00', 3.96],
                //             ['16:30', 3.98],
                //             ['17:00', 4.05],
                //             ['17:30', 4.07],
                //             ['18:00', 4.15],
                //         ],
                //         color: '#F9D05A'
                //     },
                //     {
                //         name: '',
                //         type: 'line',
                //         data: [
                //             ['11:00', 3.64],
                //             ['11:30', 3.68],
                //             ['12:00', 3.74],
                //             ['12:30', 3.8],
                //             ['13:00', 3.78],
                //             ['13:30', 3.81],
                //             ['14:00', 3.84],
                //             ['14:30', 3.87],
                //             ['15:00', 3.92],
                //             ['15:30', 3.95],
                //             ['16:00', 3.99],
                //             ['16:30', 4],
                //             ['17:00', 4.25],
                //             ['17:30', 4.27],
                //             ['18:00', 4.35],
                //         ],
                //         color: '#5D7092'
                //     },
                //     {
                //         name: '',
                //         type: 'line',
                //         data: [
                //             ['11:00', 3.74],
                //             ['11:30', 3.78],
                //             ['12:00', 3.74],
                //             ['12:30', 3.73],
                //             ['13:00', 3.78],
                //             ['13:30', 3.71],
                //             ['14:00', 3.74],
                //             ['14:30', 3.87],
                //             ['15:00', 3.82],
                //             ['15:30', 3.75],
                //             ['16:00', 3.89],
                //             ['16:30', 4.3],
                //             ['17:00', 4.25],
                //             ['17:30', 4.17],
                //             ['18:00', 4.25],
                //         ],
                //         color: '#1890FF'
                //     },
                //     {
                //         name: '',
                //         type: 'line',
                //         data: [
                //             ['11:00', 3.84],
                //             ['11:30', 3.68],
                //             ['12:00', 3.92],
                //             ['12:30', 3.83],
                //             ['13:00', 3.88],
                //             ['13:30', 3.81],
                //             ['14:00', 3.84],
                //             ['14:30', 3.97],
                //             ['15:00', 3.92],
                //             ['15:30', 3.85],
                //             ['16:00', 3.99],
                //             ['16:30', 4.35],
                //             ['17:00', 4.35],
                //             ['17:30', 4.27],
                //             ['18:00', 4.35],
                //         ],
                //         color: '#E8684A'
                //     }
                // ]
                animation: false,
                title: {
                    show: true,
                    text: "2019年6月10日",
                    bottom: "0",
                    left: "right",
                    textStyle: {
                        fontSize: "14",
                        color: "#3E526F",
                        fontWeight: "600",
                    },
                },
                tooltip: {
                    trigger: "axis",
                    transitionDuration: 0,
                    confine: true,
                    bordeRadius: 4,
                    borderWidth: 1,
                    borderColor: "#333",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    textStyle: {
                        fontSize: 12,
                        color: "#333",
                    },
                },
                axisPointer: {
                    type: "shadow",
                    link: {
                        xAxisIndex: "all",
                    },
                },
                xAxis: [
                    {
                        type: "category",
                        //data: ['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'],
                        data: [
                            "2019/6/10 20:32:14",
                            "2019/6/10 20:32:30",
                            "2019/6/10 20:32:49",
                            "2019/6/10 20:32:54",
                            "2019/6/10 20:33:17",
                            "2019/6/10 20:33:27",
                            "2019/6/10 20:33:41",
                            "2019/6/10 20:34:06",
                            "2019/6/10 20:34:10",
                            "2019/6/10 20:34:15",
                            "2019/6/10 20:34:25",
                            "2019/6/10 20:34:30",
                        ],
                        boundaryGap: false,
                        gridIndex: 1,
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
                    {
                        type: "category",
                        data: [
                            "2019/6/10 20:32:14",
                            "2019/6/10 20:32:30",
                            "2019/6/10 20:32:49",
                            "2019/6/10 20:32:54",
                            "2019/6/10 20:33:17",
                            "2019/6/10 20:33:27",
                            "2019/6/10 20:33:41",
                            "2019/6/10 20:34:06",
                            "2019/6/10 20:34:10",
                            "2019/6/10 20:34:15",
                            "2019/6/10 20:34:25",
                            "2019/6/10 20:34:30",
                        ],
                        //data: ['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'],
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
                ],
                yAxis: [
                    {
                        gridIndex: 1,
                        type: "value",
                        name: "压差/mV",
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
                        // min: 3.6
                    },
                    {
                        //scale: true,
                        type: "value",
                        name: "电池包单体电压/v",
                        nameLocation: "center",
                        nameGap: 50,
                        nameTextStyle: {
                            fontSize: "14",
                            color: "#3E526F",
                            fontWeight: "600",
                        },
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
                        min: 3.6,
                    },
                ],
                dataZoom: [
                    {
                        show: true,
                        height: 4,
                        xAxisIndex: [0, 1],
                        top: "48%",
                        start: 20,
                        end: 90,
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
                        // zoomOnMouseWheel:true,
                        // moveOnMouseMove:true,
                    },
                    {
                        type: "inside",
                        show: true,
                        // zoomOnMouseWheel:true,
                        // moveOnMouseMove:true,
                    },
                ],
                grid: [
                    {
                        top: 20,
                        left: "50",
                        right: "4%",
                        height: "40%",
                        bottom: 30,
                        containLabel: true,
                    },
                    {
                        top: "55%",
                        left: "50",
                        right: "4%",
                        height: "40%",
                        bottom: 30,
                        containLabel: true,
                    },
                ],
                // series: [{
                //             name: '',
                //             type: 'line',
                //                 xAxisIndex: 1,
                //                 yAxisIndex: 1,
                //             data: [
                //                 3.6,
                //                 3.65,
                //                 3.71,
                //                 3.75,
                //                 3.79,
                //                 3.82,
                //                 3.86,
                //                 3.90,
                //                 4.05,
                //                 4.10,
                //                 4.14,
                //                 4.16,
                //                 4.18,
                //                 4.19,
                //                 4.15
                //             ],
                //             color: '#5CD9A7'
                //         },
                //         {
                //             name: '',
                //             type: 'line',
                //                 xAxisIndex: 1,
                //                 yAxisIndex: 1,
                //             data: [
                //                 3.62,
                //                 3.66,
                //                 3.72,
                //                 3.78,
                //                 3.76,
                //                 3.79,
                //                 3.82,
                //                 3.85,
                //                 3.90,
                //                 3.92,
                //                 3.96,
                //                 3.98,
                //                 4.05,
                //                 4.07,
                //                 4.15,
                //             ],
                //             color: '#F9D05A'
                //         },
                //         {
                //             name: '',
                //             type: 'line',
                //                 xAxisIndex: 1,
                //                 yAxisIndex: 1,
                //             data: [
                //                 3.64,
                //                 3.68,
                //                 3.74,
                //                 3.8,
                //                 3.78,
                //                 3.81,
                //                 3.84,
                //                 3.87,
                //                 3.92,
                //                 3.95,
                //                 3.99,
                //                 4,
                //                 4.25,
                //                 4.27,
                //                 4.35,
                //             ],
                //             color: '#5D7092'
                //         },
                //         {
                //             name: '',
                //             type: 'line',
                //                 xAxisIndex: 1,
                //                 yAxisIndex: 1,
                //             data: [
                //                 3.74,
                //                 3.78,
                //                 3.74,
                //                 3.73,
                //                 3.78,
                //                 3.71,
                //                 3.74,
                //                 3.87,
                //                 3.82,
                //                 3.75,
                //                 3.89,
                //                 4.3,
                //                 4.25,
                //                 4.17,
                //                 4.25,
                //             ],
                //             color: '#1890FF'
                //         },
                //         {
                //             name: '',
                //             type: 'line',
                //             xAxisIndex: 1,
                //             yAxisIndex: 1,
                //             data: [
                //                 3.84,
                //                 3.68,
                //                 3.92,
                //                 3.83,
                //                 3.88,
                //                 3.81,
                //                 3.84,
                //                 3.97,
                //                 3.92,
                //                 3.85,
                //                 3.99,
                //                 4.35,
                //                 4.35,
                //                 4.27,
                //                 4.35,
                //             ],
                //             color: '#E8684A'
                //         },
                //         {
                //         symbolSize: 8,
                //         data: [
                //                 8.04,
                //                 6.95,
                //                 8.81,
                //                 8.33,
                //                 9.96,
                //                 7.24,
                //                 4.26,
                //                 10.84,
                //                 4.82,
                //                 5.68
                //         ],
                //         type: 'scatter',
                //         color: '#1890FF'
                //     }
                // ]
                series: [
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196167,
                            3.63199996948242,
                            3.63100004196167,
                            3.63199996948242,
                            3.63299989700317,
                            3.63199996948242,
                            3.63299989700317,
                            3.6340000629425,
                            3.63299989700317,
                            3.6340000629425,
                            3.63299989700317,
                            3.6340000629425,
                            // 4.16,
                            // 4.18,
                            // 4.19,
                            // 4.15
                        ],
                        color: "#5CD9A7",
                    },
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196167,
                            3.63199996948242,
                            3.63100004196167,
                            3.63199996948242,
                            3.63299989700317,
                            3.63199996948242,
                            3.63299989700317,
                            3.63299989700317,
                            3.6340000629425,
                            3.63299989700317,
                            3.6340000629425,
                            3.6340000629425,
                            // 3.98,
                            // 4.05,
                            // 4.07,
                            // 4.15,
                        ],
                        color: "#F9D05A",
                    },
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196166,
                            3.63100004196167,
                            3.63100004196167,
                            3.63100004196167,
                            3.63199996948242,
                            3.63100004196167,
                            3.63199996948242,
                            3.63299989700317,
                            3.6340000629425,
                            3.63499999046325,
                            3.635999917984,
                            3.6340000629425,
                            // 4,
                            // 4.25,
                            // 4.27,
                            // 4.35,
                        ],
                        color: "#5D7092",
                    },
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196166,
                            3.63199996948242,
                            3.63199996948242,
                            3.63299989700317,
                            3.63199996948242,
                            3.63299989700317,
                            3.63199996948242,
                            3.63299989700317,
                            3.63299989700317,
                            3.63299989700317,
                            3.63299989700317,
                            3.6340000629425,
                            // 4.3,
                            // 4.25,
                            // 4.17,
                            // 4.25,
                        ],
                        color: "#1890FF",
                    },
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196167,
                            3.63000011444091,
                            3.63100004196167,
                            3.63100004196167,
                            3.63199996948242,
                            3.63100004196167,
                            3.63199996948242,
                            3.63199996948242,
                            3.63199996948242,
                            3.63299989700317,
                            3.63299989700317,
                            3.63299989700317,
                            // 4.35,
                            // 4.35,
                            // 4.27,
                            // 4.35,
                        ],
                        color: "#E8684A",
                    },
                    {
                        symbolSize: 8,
                        data: [
                            3.99994850159002,
                            4.9998760223402,
                            6.9999694824201,
                            10.9999179840101,
                            14.0001773834202,
                            9.99999046325995,
                            9.99999046324973,
                            9.00006294250977,
                            9.99999046324973,
                            8.99982452392001,
                            10.0002288818395,
                            5.99980354308993,
                        ],
                        type: "scatter",
                        color: "#1890FF",
                    },
                ],
            };
            chart7.setOption(option7);

            // let chart8 = this.$echarts.init(this.$refs.chart8)
            // let option8 = {
            //     title: {
            //         show: true,
            //         text: '2018年8月28日',
            //         bottom:'0',
            //         left:'right',
            //         textStyle: {
            //             fontSize: '14',
            //             color: '#3E526F',
            //             fontWeight: '600'
            //         }
            //     },
            //     xAxis: {
            //         type: 'category',
            //         boundaryGap: false,
            //         axisTick:{
            //             show:false,
            //         },
            //          axisLine: {
            //             lineStyle: {
            //                 color: '#A7C6E0',
            //             }
            //         },
            //         axisLabel: {
            //             color: '#3E526F'
            //         },
            //         splitLine: {
            //             show:true,
            //             lineStyle: {
            //             color: '#DDECFA',
            //             width: 1
            //             },
            //         },
            //     },
            //     yAxis: {
            //         type: 'value',
            //         name: '压差/mV',
            //         nameLocation:'center',
            //         nameGap: 50,
            //         nameTextStyle: {
            //             fontSize: '14',
            //             color: '#3E526F',
            //             fontWeight: '600'
            //         },
            //         splitNumber: 4,
            //         axisTick:{
            //             show:false,
            //         },
            //          axisLine: {
            //             lineStyle: {
            //                 color: '#A7C6E0',
            //             }
            //         },
            //         axisLabel: {
            //             color: '#3E526F'
            //         },
            //          splitLine: {
            //             show:true,
            //             lineStyle: {
            //             color: '#DDECFA',
            //             width: 1
            //             },
            //         },
            //     },
            //     grid: {
            //         top: 20,
            //         left: '50',
            //         right: '4%',
            //         bottom: '30',
            //         containLabel: true
            //     },
            //     // dataZoom: [{
            //     //     show: true,
            //     //     height: 4,
            //     //     xAxisIndex: [0],
            //     //     bottom: '10',
            //     //     start: 20,
            //     //     end: 80,
            //     //     handleSize: 20,
            //     //     handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
            //     //     //handleSize: '110%',
            //     //     handleStyle: {
            //     //         color: "transparent",
            //     //     },
            //     //     textStyle: {
            //     //         color: "transparent"
            //     //     },
            //     //     borderColor: 'transparent',
            //     //     backgroundColor: '#EEEFF3',
            //     //     dataBackground: {
            //     //         lineStyle: {
            //     //             width: 0
            //     //         },
            //     //         areaStyle: {
            //     //             color: 'transparent'
            //     //         }
            //     //     },
            //     //     fillerColor: '#C3C6D1',
            //     // }, {
            //     //     type: "inside",
            //     //     show: true,
            //     // }],
            //     series: [{
            //         symbolSize: 8,
            //         data: [
            //             ['11:00', 8.04],
            //             ['11:30', 6.95],
            //             ['12:00', 8.81],
            //             ['12:30', 8.33],
            //             ['13:00', 9.96],
            //             ['13:30', 7.24],
            //             ['14:00', 4.26],
            //             ['14:30', 10.84],
            //             ['15:00', 4.82],
            //             ['15:30', 5.68]
            //         ],
            //         type: 'scatter',
            //         color: '#1890FF'
            //     }]
            // };
            // chart8.setOption(option8)

            let chart9 = this.$echarts.init(this.$refs.chart9);
            var sourceData = [
                {
                    name: "1",
                    sales: 0.00031759,
                    services: 0.00132514,
                },
                {
                    name: "2",
                    sales: 0.000147879,
                    services: 0.00054809,
                },
                {
                    name: "3",
                    sales: 0.000087,
                    services: 0.000514068,
                },
                {
                    name: "4",
                    sales: 0.000706984,
                    services: 0.001053469,
                },
                {
                    name: "5",
                    sales: 0.000306236,
                    services: 0.000894301,
                },
                {
                    name: "6",
                    sales: 0.000129668,
                    services: 0.000916912,
                },
                {
                    name: "7",
                    sales: 0.000493172,
                    services: 0.000406437,
                },
                {
                    name: "8",
                    sales: 0.000180241,
                    services: 0.000664678,
                },
                {
                    name: "9",
                    sales: 0.000149582,
                    services: 0.000670406,
                },
                {
                    name: "10",
                    sales: 0.000849981,
                    services: 0.000982753,
                },
                {
                    name: "11",
                    sales: 0.000594044,
                    services: 0.000701939,
                },
                {
                    name: "12",
                    sales: 0.000027,
                    services: 0.000676956,
                },
                {
                    name: "13",
                    sales: 0.00031419,
                    services: 0.000619551,
                },
                {
                    name: "14",
                    sales: 0.000343205,
                    services: 0.000536949,
                },
                {
                    name: "15",
                    sales: 0.000239096,
                    services: 0.000488583,
                },
                {
                    name: "16",
                    sales: 0.000229169,
                    services: 0.000414436,
                },
                {
                    name: "17",
                    sales: 0.000190993,
                    services: 0.000384618,
                },
                {
                    name: "18",
                    sales: 0.000326476,
                    services: 0.000800742,
                },
                {
                    name: "19",
                    sales: 0.000374583,
                    services: 0.001069319,
                },
                {
                    name: "20",
                    sales: 0.000471942,
                    services: 0.000583643,
                },
            ];

            var seriesData = sourceData.map(function (item, index, array) {
                return {
                    name: item["name"],
                    value: [item["sales"], item["services"]],
                };
            });

            var computeServicesAvgLine = function () {
                let sum = 0;
                sourceData.forEach(function (item) {
                    sum += item["services"];
                });
                return sum / sourceData.length;
            };

            var computeSalesAvgLine = function () {
                let sum = 0;
                sourceData.forEach(function (item) {
                    sum += item["sales"];
                });
                return sum / sourceData.length;
            };
            var avg = {
                servicesAvgLine: computeServicesAvgLine(),
                salesAvgLine: computeSalesAvgLine(),
            };
            let option9 = {
                //     tooltip: {
                //     trigger: 'axis',
                //     transitionDuration: 0,
                //     confine: true,
                //     bordeRadius: 4,
                //     borderWidth: 1,
                //     borderColor: '#333',
                //     backgroundColor: 'rgba(255,255,255,0.9)',
                //     textStyle: {
                //         fontSize: 12,
                //         color: '#333'
                //     },

                // },
                tooltip: {
                    trigger: "item",
                    // axisPointer: {
                    //     show: true,
                    //     type: 'cross',
                    //     lineStyle: {
                    //         type: 'dashed',
                    //         width: 1
                    //     },
                    // },
                    formatter: function (obj) {
                        if (obj.componentType == "series") {
                            return (
                                '<div style="font-size: 18px;">' +
                                "单体编号：" +
                                obj.name +
                                "</div>"
                            );
                            // '<span>' +
                            // '均值' +
                            // '</span>' +
                            // ' : ' + obj.data.value[0] +
                            // '<br/>' +
                            // '<span>' +
                            // '方差' +
                            // '</span>' +
                            // ' : ' + obj.data.value[1]
                        }
                    },
                },
                xAxis: {
                    type: "",
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: "#A7C6E0",
                        },
                    },
                    axisLabel: {
                        color: "#3E526F",
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#A7C6E0",
                        },
                    },
                },
                yAxis: {
                    type: "value",
                    name: "",
                    nameLocation: "center",
                    nameGap: 30,
                    nameTextStyle: {
                        fontSize: "14",
                        color: "#3E526F",
                        fontWeight: "600",
                    },
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
                        lineStyle: {
                            color: "#A7C6E0",
                        },
                    },
                },
                grid: {
                    top: 20,
                    left: "20",
                    right: "55",
                    bottom: "0",
                    containLabel: true,
                },
                visualMap: {
                    min: 0,
                    max: 0.00132514,
                    color: ["#FCDE66", "#1890FF"],
                    top: "center",
                    itemWidth: 8,
                    itemHeight: "420",
                    align: "right",
                    text: [180, 0],
                    right: "13",
                    textStyle: {
                        fontSize: 10,
                        color: "#3E526F",
                    },
                },
                // series: [
                //     {
                //         symbolSize: 8,
                //         data: [
                //             [20.0, 28.04],
                //             [38.0, 16.95],
                //             [143.0, 157.58],
                //             [90.0, 48.81],
                //             [110.0, 68.33],
                //             [104.0, 89.96],
                //             [68.0, 27.24],
                //             [49.0, 34.26],
                //             [120.0, 10.84],
                //             [78.0, 64.82],
                //             [55.0, 45.68]
                //         ],
                //         type: 'scatter',
                //         // color: '#1890FF'
                //     },
                //     {
                //         symbolSize: 8,
                //         data: [
                //            [65.0, 38.04],
                //             [49.0, 56.25],
                //             [18.0, 177.58],
                //             [110.0, 98.41],
                //             [95.0, 68.63],
                //             [21.0, 109.96],
                //             [59.0, 78.24],
                //             [72.0, 64.26],
                //             [115.0, 110.84],
                //             [88.0, 64.82],
                //             [94.0, 85.68]
                //         ],
                //         type: 'scatter',
                //         // color: '#FACC14'
                //     },
                // ]
                series: [
                    {
                        symbolSize: 8,
                        data: seriesData,
                        // data: [
                        //     [0.00031759, 0.00132514],
                        //     [0.000147879, 0.00054809],
                        //     [0.000087, 0.000514068],
                        //     [0.000706984, 0.001053469],
                        //     [0.000306236, 0.000894301],
                        //     [0.000129668, 0.000916912],
                        //     [0.000493172, 0.000406437],
                        //     [0.000180241, 0.000664678],
                        //     [0.000149582, 0.000670406],
                        //     [0.000849981, 0.000982753],
                        //     [0.000594044, 0.000701939],
                        //     [0.000027, 0.000676956],
                        //     [0.00031419, 0.000619551],
                        //     [0.000343205, 0.000536949],
                        //     [0.000239096, 0.000488583],
                        //     [0.000229169, 0.000414436],
                        //     [0.000190993, 0.000384618],
                        //     [0.000326476, 0.000800742],
                        //     [0.000374583, 0.001069319],
                        //     [0.000471942, 0.000583643]
                        // ],
                        type: "scatter",
                        // color: '#1890FF'
                    },
                ],
            };
            chart9.setOption(option9);
        },
        drawBig() {
            let chart11 = this.$echarts.init(this.$refs.chart11);
            let option11 = {
                animation: false,
                title: {
                    show: true,
                    text: "2016年6月10日",
                    bottom: "0",
                    left: "right",
                    textStyle: {
                        fontSize: "14",
                        color: "#3E526F",
                        fontWeight: "600",
                    },
                },
                tooltip: {
                    trigger: "axis",
                    transitionDuration: 0,
                    confine: true,
                    bordeRadius: 4,
                    borderWidth: 1,
                    borderColor: "#333",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    textStyle: {
                        fontSize: 12,
                        color: "#333",
                    },
                },
                axisPointer: {
                    type: "shadow",
                    link: {
                        xAxisIndex: "all",
                    },
                },
                xAxis: [
                    {
                        type: "category",
                        data: [
                            "2019/6/10 20:32:14",
                            "2019/6/10 20:32:30",
                            "2019/6/10 20:32:49",
                            "2019/6/10 20:32:54",
                            "2019/6/10 20:33:17",
                            "2019/6/10 20:33:27",
                            "2019/6/10 20:33:41",
                            "2019/6/10 20:34:06",
                            "2019/6/10 20:34:10",
                            "2019/6/10 20:34:15",
                            "2019/6/10 20:34:25",
                            "2019/6/10 20:34:30",
                        ],
                        // data: ['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'],
                        boundaryGap: false,
                        gridIndex: 1,
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
                    {
                        type: "category",
                        data: [
                            "2019/6/10 20:32:14",
                            "2019/6/10 20:32:30",
                            "2019/6/10 20:32:49",
                            "2019/6/10 20:32:54",
                            "2019/6/10 20:33:17",
                            "2019/6/10 20:33:27",
                            "2019/6/10 20:33:41",
                            "2019/6/10 20:34:06",
                            "2019/6/10 20:34:10",
                            "2019/6/10 20:34:15",
                            "2019/6/10 20:34:25",
                            "2019/6/10 20:34:30",
                        ],
                        //data: ['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'],
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
                ],
                yAxis: [
                    {
                        gridIndex: 1,
                        type: "value",
                        name: "压差/mV",
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
                        // min: 3.6
                    },
                    {
                        //scale: true,
                        type: "value",
                        name: "电池包单体电压/v",
                        nameLocation: "center",
                        nameGap: 50,
                        nameTextStyle: {
                            fontSize: "14",
                            color: "#3E526F",
                            fontWeight: "600",
                        },
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
                        min: 3.6,
                    },
                ],
                dataZoom: [
                    {
                        show: true,
                        height: 4,
                        xAxisIndex: [0, 1],
                        top: "48%",
                        start: 20,
                        end: 90,
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
                grid: [
                    {
                        top: 20,
                        left: "50",
                        right: "4%",
                        height: "40%",
                        bottom: 30,
                        containLabel: true,
                    },
                    {
                        top: "55%",
                        left: "50",
                        right: "4%",
                        height: "40%",
                        bottom: 30,
                        containLabel: true,
                    },
                ],
                // series: [{
                //             name: '',
                //             type: 'line',
                //                 xAxisIndex: 1,
                //                 yAxisIndex: 1,
                //             data: [
                //                 3.6,
                //                 3.65,
                //                 3.71,
                //                 3.75,
                //                 3.79,
                //                 3.82,
                //                 3.86,
                //                 3.90,
                //                 4.05,
                //                 4.10,
                //                 4.14,
                //                 4.16,
                //                 4.18,
                //                 4.19,
                //                 4.15
                //             ],
                //             color: '#5CD9A7'
                //         },
                //         {
                //             name: '',
                //             type: 'line',
                //                 xAxisIndex: 1,
                //                 yAxisIndex: 1,
                //             data: [
                //                 3.62,
                //                 3.66,
                //                 3.72,
                //                 3.78,
                //                 3.76,
                //                 3.79,
                //                 3.82,
                //                 3.85,
                //                 3.90,
                //                 3.92,
                //                 3.96,
                //                 3.98,
                //                 4.05,
                //                 4.07,
                //                 4.15,
                //             ],
                //             color: '#F9D05A'
                //         },
                //         {
                //             name: '',
                //             type: 'line',
                //                 xAxisIndex: 1,
                //                 yAxisIndex: 1,
                //             data: [
                //                 3.64,
                //                 3.68,
                //                 3.74,
                //                 3.8,
                //                 3.78,
                //                 3.81,
                //                 3.84,
                //                 3.87,
                //                 3.92,
                //                 3.95,
                //                 3.99,
                //                 4,
                //                 4.25,
                //                 4.27,
                //                 4.35,
                //             ],
                //             color: '#5D7092'
                //         },
                //         {
                //             name: '',
                //             type: 'line',
                //                 xAxisIndex: 1,
                //                 yAxisIndex: 1,
                //             data: [
                //                 3.74,
                //                 3.78,
                //                 3.74,
                //                 3.73,
                //                 3.78,
                //                 3.71,
                //                 3.74,
                //                 3.87,
                //                 3.82,
                //                 3.75,
                //                 3.89,
                //                 4.3,
                //                 4.25,
                //                 4.17,
                //                 4.25,
                //             ],
                //             color: '#1890FF'
                //         },
                //         {
                //             name: '',
                //             type: 'line',
                //             xAxisIndex: 1,
                //             yAxisIndex: 1,
                //             data: [
                //                 3.84,
                //                 3.68,
                //                 3.92,
                //                 3.83,
                //                 3.88,
                //                 3.81,
                //                 3.84,
                //                 3.97,
                //                 3.92,
                //                 3.85,
                //                 3.99,
                //                 4.35,
                //                 4.35,
                //                 4.27,
                //                 4.35,
                //             ],
                //             color: '#E8684A'
                //         },
                //         {
                //         symbolSize: 8,
                //         data: [
                //                 8.04,
                //                 6.95,
                //                 8.81,
                //                 8.33,
                //                 9.96,
                //                 7.24,
                //                 4.26,
                //                 10.84,
                //                 4.82,
                //                 5.68
                //         ],
                //         type: 'scatter',
                //         color: '#1890FF'
                //     }
                // ]
                series: [
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196167,
                            3.63199996948242,
                            3.63100004196167,
                            3.63199996948242,
                            3.63299989700317,
                            3.63199996948242,
                            3.63299989700317,
                            3.6340000629425,
                            3.63299989700317,
                            3.6340000629425,
                            3.63299989700317,
                            3.6340000629425,
                            // 4.16,
                            // 4.18,
                            // 4.19,
                            // 4.15
                        ],
                        color: "#5CD9A7",
                    },
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196167,
                            3.63199996948242,
                            3.63100004196167,
                            3.63199996948242,
                            3.63299989700317,
                            3.63199996948242,
                            3.63299989700317,
                            3.63299989700317,
                            3.6340000629425,
                            3.63299989700317,
                            3.6340000629425,
                            3.6340000629425,
                            // 3.98,
                            // 4.05,
                            // 4.07,
                            // 4.15,
                        ],
                        color: "#F9D05A",
                    },
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196166,
                            3.63100004196167,
                            3.63100004196167,
                            3.63100004196167,
                            3.63199996948242,
                            3.63100004196167,
                            3.63199996948242,
                            3.63299989700317,
                            3.6340000629425,
                            3.63499999046325,
                            3.635999917984,
                            // 4,
                            // 4.25,
                            // 4.27,
                            // 4.35,
                        ],
                        color: "#5D7092",
                    },
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196166,
                            3.63199996948242,
                            3.63199996948242,
                            3.63299989700317,
                            3.63199996948242,
                            3.63299989700317,
                            3.63199996948242,
                            3.63299989700317,
                            3.63299989700317,
                            3.63299989700317,
                            3.63299989700317,
                            3.6340000629425,
                            // 4.3,
                            // 4.25,
                            // 4.17,
                            // 4.25,
                        ],
                        color: "#1890FF",
                    },
                    {
                        name: "",
                        type: "line",
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: [
                            3.63100004196167,
                            3.63000011444091,
                            3.63100004196167,
                            3.63100004196167,
                            3.63199996948242,
                            3.63100004196167,
                            3.63199996948242,
                            3.63199996948242,
                            3.63199996948242,
                            3.63299989700317,
                            3.63299989700317,
                            3.63299989700317,
                            // 4.35,
                            // 4.35,
                            // 4.27,
                            // 4.35,
                        ],
                        color: "#E8684A",
                    },
                    {
                        symbolSize: 8,
                        data: [
                            3.99994850159002,
                            4.9998760223402,
                            6.9999694824201,
                            10.9999179840101,
                            14.0001773834202,
                            9.99999046325995,
                            9.99999046324973,
                            9.00006294250977,
                            9.99999046324973,
                            8.99982452392001,
                            10.0002288818395,
                            5.99980354308993,
                        ],
                        type: "scatter",
                        color: "#1890FF",
                    },
                ],
            };
            chart11.setOption(option11);

            // let chart12 = this.$echarts.init(this.$refs.chart12)
            // let option12 = {
            //     title: {
            //         show: true,
            //         text: '2018年8月28日',
            //         bottom:'0',
            //         left:'right',
            //         textStyle: {
            //             fontSize: '14',
            //             color: '#3E526F',
            //             fontWeight: '600'
            //         }
            //     },
            //     xAxis: {
            //         type: 'category',
            //         boundaryGap: false,
            //         axisTick:{
            //             show:false,
            //         },
            //          axisLine: {
            //             lineStyle: {
            //                 color: '#A7C6E0',
            //             }
            //         },
            //         axisLabel: {
            //             color: '#3E526F'
            //         },
            //          splitLine: {
            //             show:true,
            //             lineStyle: {
            //             color: '#DDECFA',
            //             width: 1
            //             },
            //         },
            //     },
            //     yAxis: {
            //         type: 'value',
            //         name: '压差/mV',
            //         nameLocation:'center',
            //         nameGap: 50,
            //         nameTextStyle: {
            //             fontSize: '14',
            //             color: '#3E526F',
            //             fontWeight: '600'
            //         },
            //         splitNumber: 4,
            //         axisTick:{
            //             show:false,
            //         },
            //          axisLine: {
            //             lineStyle: {
            //                 color: '#A7C6E0',
            //             }
            //         },
            //         axisLabel: {
            //             color: '#3E526F'
            //         },
            //          splitLine: {
            //             show:true,
            //             lineStyle: {
            //             color: '#DDECFA',
            //             width: 1
            //             },
            //         },
            //     },
            //     grid: {
            //         top: 20,
            //         left: '50',
            //         right: '4%',
            //         bottom: '30',
            //         containLabel: true
            //     },
            //     // dataZoom: [{
            //     //     show: true,
            //     //     height: 4,
            //     //     xAxisIndex: [0],
            //     //     bottom: '10',
            //     //     start: 20,
            //     //     end: 80,
            //     //     handleSize: 20,
            //     //     handleIcon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADiklEQVRIS6VWXUhTYRh+5lxb5ea8aO3CMe3CRRESno0F0Q91E4TQVVERXmRduCMFGaTihZhBBolHL9IuJCrqKpCgm6IfgmQ7EhFF8yId82KtC6f245yb8ZzOt45z/ZgHPvadc749z/s87/u93zHhz5dJf81fMfhoyTDEfVEkAWB8aQQtAVASDoc3+3y+PRaLpZILM5nMVDQafREIBD4ByOmDpCvICgmMkZonJiZ2ejyeTrPZfJBEBSHmstns43g83lFdXf0aQLaIMk22uAQ4gUpnZ2dDdrv9Cud/sXFxbm7uksPh6AewaFCjKTISaHYAsKRSqVB5eflVAbyYzWH0fRLvYynt0TavE8FtLpSaf4mamZm56HQ6SZIx2JYnIJGZ0aqqKtXV1T0VkUc+fEbLjTAmE1+WCalyl6HnbAD+rZvycYyNje2XJEnVlWiWCQWaLQCs8/PzD6xW6wH+i+DHLz9DZpF5XHlZSktwt21fniSdTj+x2WxHAKSFXcJ3Rm9RFMUbCoXe0SracvDCoxWRF9JQyeNrh4Rduf7+/u2yLMd0q7KCwMLoo9HosZqamkGCvHybwMnu53/J78/Xt1v3YvcOtzYfHx8/4/P57ukqMiTQEgtgfTweP19ZWdnBhYMPP6D7zpt/Img9UYszh7dqa6empjo9Hs91AN+pQiR3HYANk5OT57xeb/tqCdpO1KJRJ4jFYl1VVVW9AL4BWBAEVhJEIpFjkiQpa7FIVVXZ7/fTIhKklxHIsrylr6/v1VqS3NzcvEtRlI+FBJpFABzT09O3nE7n7v8p01Qq9bKiouIUgFmjRfkkA7ArihJoamq6bzKZWLraXviXjba0tJQdGBg4KstyGMCcMcm0SStTABupIhKJnJYkqWU1rUJV1R6/339Tj/6rsUxFHkhCm8qoZHR0tCEQCJwTSn5Xr4w8HA73BoPBYT1y9hQmmD1J22i88q1CJ6GSsq6urtrGxsYml8vlL9auk8lkZGhoaKC9vZ0bhsCMXKseY6sgQb7Z6Vat14moyFZfX7+5oaGhzu12u7g4kUgkh4eHx0ZGRnjgzOugBObmEuDLmp1QIRLOqrLpg7nhPZuh6M/sfuz9CzogSTh4X7RdCxWidRCMOSEwfzmKERCMQwD/8cAxkgjLtDNCPys4FznjaUULOAgq5oUfA8tONFEoKw59HZj2GAloEwFXdegXVuOaP1t+ALPaeDyy5+ghAAAAAElFTkSuQmCC',
            //     //     //handleSize: '110%',
            //     //     handleStyle: {
            //     //         color: "transparent",
            //     //     },
            //     //     textStyle: {
            //     //         color: "transparent"
            //     //     },
            //     //     borderColor: 'transparent',
            //     //     backgroundColor: '#EEEFF3',
            //     //     dataBackground: {
            //     //         lineStyle: {
            //     //             width: 0
            //     //         },
            //     //         areaStyle: {
            //     //             color: 'transparent'
            //     //         }
            //     //     },
            //     //     fillerColor: '#C3C6D1',
            //     // }, {
            //     //     type: "inside",
            //     //     show: true,
            //     // }],
            //     series: [{
            //         symbolSize: 8,
            //         data: [
            //             ['11:00', 8.04],
            //             ['11:30', 6.95],
            //             ['12:00', 8.81],
            //             ['12:30', 8.33],
            //             ['13:00', 9.96],
            //             ['13:30', 7.24],
            //             ['14:00', 4.26],
            //             ['14:30', 10.84],
            //             ['15:00', 4.82],
            //             ['15:30', 5.68]
            //         ],
            //         type: 'scatter',
            //         color: '#1890FF'
            //     }]
            // };
            // chart12.setOption(option12)
        },
        drawBig2() {
            let chart13 = this.$echarts.init(this.$refs.chart13);
            var sourceData = [
                {
                    name: "1",
                    sales: 0.00031759,
                    services: 0.00132514,
                },
                {
                    name: "2",
                    sales: 0.000147879,
                    services: 0.00054809,
                },
                {
                    name: "3",
                    sales: 0.000087,
                    services: 0.000514068,
                },
                {
                    name: "4",
                    sales: 0.000706984,
                    services: 0.001053469,
                },
                {
                    name: "5",
                    sales: 0.000306236,
                    services: 0.000894301,
                },
                {
                    name: "6",
                    sales: 0.000129668,
                    services: 0.000916912,
                },
                {
                    name: "7",
                    sales: 0.000493172,
                    services: 0.000406437,
                },
                {
                    name: "8",
                    sales: 0.000180241,
                    services: 0.000664678,
                },
                {
                    name: "9",
                    sales: 0.000149582,
                    services: 0.000670406,
                },
                {
                    name: "10",
                    sales: 0.000849981,
                    services: 0.000982753,
                },
                {
                    name: "11",
                    sales: 0.000594044,
                    services: 0.000701939,
                },
                {
                    name: "12",
                    sales: 0.000027,
                    services: 0.000676956,
                },
                {
                    name: "13",
                    sales: 0.00031419,
                    services: 0.000619551,
                },
                {
                    name: "14",
                    sales: 0.000343205,
                    services: 0.000536949,
                },
                {
                    name: "15",
                    sales: 0.000239096,
                    services: 0.000488583,
                },
                {
                    name: "16",
                    sales: 0.000229169,
                    services: 0.000414436,
                },
                {
                    name: "17",
                    sales: 0.000190993,
                    services: 0.000384618,
                },
                {
                    name: "18",
                    sales: 0.000326476,
                    services: 0.000800742,
                },
                {
                    name: "19",
                    sales: 0.000374583,
                    services: 0.001069319,
                },
                {
                    name: "20",
                    sales: 0.000471942,
                    services: 0.000583643,
                },
            ];

            var seriesData = sourceData.map(function (item, index, array) {
                return {
                    name: item["name"],
                    value: [item["sales"], item["services"]],
                };
            });

            var computeServicesAvgLine = function () {
                let sum = 0;
                sourceData.forEach(function (item) {
                    sum += item["services"];
                });
                return sum / sourceData.length;
            };

            var computeSalesAvgLine = function () {
                let sum = 0;
                sourceData.forEach(function (item) {
                    sum += item["sales"];
                });
                return sum / sourceData.length;
            };
            var avg = {
                servicesAvgLine: computeServicesAvgLine(),
                salesAvgLine: computeSalesAvgLine(),
            };
            let option13 = {
                tooltip: {
                    trigger: "item",
                    // axisPointer: {
                    //     show: true,
                    //     type: 'cross',
                    //     lineStyle: {
                    //         type: 'dashed',
                    //         width: 1
                    //     },
                    // },
                    formatter: function (obj) {
                        if (obj.componentType == "series") {
                            return (
                                '<div style="font-size: 18px;">' +
                                "单体编号：" +
                                obj.name +
                                "</div>"
                            );
                            // '<span>' +
                            // '均值' +
                            // '</span>' +
                            // ' : ' + obj.data.value[0] +
                            // '<br/>' +
                            // '<span>' +
                            // '方差' +
                            // '</span>' +
                            // ' : ' + obj.data.value[1]
                        }
                    },
                },
                xAxis: {
                    type: "",
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: "#A7C6E0",
                        },
                    },
                    axisLabel: {
                        color: "#3E526F",
                    },
                    splitLine: {
                        lineStyle: {
                            color: "#A7C6E0",
                        },
                    },
                },
                yAxis: {
                    type: "value",
                    name: "",
                    nameLocation: "center",
                    nameGap: 30,
                    nameTextStyle: {
                        fontSize: "14",
                        color: "#3E526F",
                        fontWeight: "600",
                    },
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
                        lineStyle: {
                            color: "#A7C6E0",
                        },
                    },
                },
                grid: {
                    top: 20,
                    left: "20",
                    right: "55",
                    bottom: "0",
                    containLabel: true,
                },
                visualMap: {
                    min: 0,
                    max: 0.00132514,
                    color: ["#FCDE66", "#1890FF"],
                    top: "center",
                    itemWidth: 8,
                    itemHeight: "420",
                    align: "right",
                    text: [180, 0],
                    right: "13",
                    textStyle: {
                        fontSize: 10,
                        color: "#3E526F",
                    },
                },

                series: [
                    {
                        symbolSize: 8,
                        data: seriesData,

                        type: "scatter",
                        // color: '#1890FF'
                    },
                ],
            };
            chart13.setOption(option13);
        },
    },
    mounted() {
        let chart7 = this.$refs.chart7;
        chart7.style.height = window.outerHeight / 2 + 120 + "px";
        echarts.init(chart7);
        //  let chart8 = this.$refs.chart8;
        // chart8.style.height = window.outerHeight/4+78+ 'px';
        // echarts.init(chart8);
        let chart9 = this.$refs.chart9;
        chart9.style.height = window.outerHeight / 2 + 90 + "px";
        echarts.init(chart9);
        this.draw();
        let chart11 = document.getElementById("chart11");
        chart11.style.width = window.outerWidth / 2 - 20 + "px";
        chart11.style.height = window.outerHeight / 2 + 70 + "px";
        echarts.init(chart11);
        // let chart12 = document.getElementById('chart12');
        // chart12.style.width = window.outerWidth/2-20 + 'px';
        // chart12.style.height = window.outerHeight/4+105+ 'px';
        // echarts.init(chart12);
        let chart13 = document.getElementById("chart13");
        chart13.style.width = window.outerWidth / 2 - 20 + "px";
        chart13.style.height = window.outerHeight / 2 + 40 + "px";
        echarts.init(chart13);
        this.drawBig();
        this.drawBig2();
        this.restaurants = this.loadAll();
        // ESC退出
        let self = this;
        this.$nextTick(function () {
            document.addEventListener("keyup", function (e) {
                if (e.keyCode == 27) {
                    self.changeStatustqp();
                }
            });
        });
    },
};
</script>
<style lang="less" scoped>
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
    margin: 10px;
    overflow: hidden;
}
.handle-box {
    margin-top: 10px;
    width: 100%;
    padding: 15px 0;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    .box {
        width: 98%;
        margin: 0 auto;
        // margin-top: 10px;
        // padding-top: 5px;
        overflow: hidden;
        span {
            display: inline-block;
            // float: left;
            margin-right: 8px;
            text-align: left;
            color: #3e526f;
        }
    }
}
.echartsCon {
    margin: 10px auto;
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
    justify-content: space-between;
    .dcBtn {
        cursor: pointer;
        margin-left: 8px;
        width: 86px;
        height: 30px;
        line-height: 30px;
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
            margin-left: 15px;
            margin-right: 3px;
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
    // margin: 0 auto;
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
    box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.06);
    border-radius: 2px;
    .tips {
        margin-left: 10px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(62, 82, 111, 1);
        margin-bottom: 10px;
    }
    .inbox {
        float: left;
        margin-top: 10px;
        width: 78%;
        height: 28px;
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
        height: 30px;
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
    width: 100%;
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
    // margin-bottom: 20px;
    cursor: pointer;
}
/deep/.el-form-item {
    margin-bottom: 5px;
    margin-right: 20px;
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
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
}
/deep/.customWidth {
    width: 20% !important;
}
/deep/.customWidth2 {
    // width:30% !important;
    width: 480px;
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
.select-box {
    float: left;
    margin-top: 10px;
    width: 98%;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(215, 229, 239, 1);
    text-indent: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(141, 171, 196, 1);
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url(../../assets/images/icon_edit.png) no-repeat center right;
    background-size: 10%;
}
.my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .addr {
            font-size: 12px;
            color: #b4b4b4;
        }

        .highlighted .addr {
            color: #ddd;
        }
    }
}
// .input-box {
//     position: absolute;
//     margin-top: 10px;
//     margin-left: -14.1%;
//     width:12.3%;
//     height:28px;
//     background:rgba(255,255,255,1);
//     border-radius:4px 0px 0px 4px;
//     border:1px solid rgba(215,229,239,1);
//     text-indent: 10px;
//     font-size:14px;
//     font-family:PingFangSC-Regular,PingFang SC;
//     font-weight:400;
//     color:rgba(141,171,196,1);

// }
@media screen and (max-width: 1366px) {
    .input-box {
        margin-left: -13.1%;
        width: 11.3%;
    }
}
/deep/.el-dialog__footer {
    border-top: 1px solid #eeeeee;
    padding: 10px 20px 10px;
}
select::-ms-expand {
    display: none;
}
</style>