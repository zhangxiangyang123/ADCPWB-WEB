<template>
    <div class="pop" v-if="show">
        <div class="mini-map">
            <div class="mini-map-head">
                <!-- <span>整车编号：LB9KB4EC9EENJL749</span> -->
                <div class="close" @click="handleClick">
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <div class="speed">车速：10.12KM/H</div>
            <!-- 线路图例信息 -->
            <div class="route">
                <button class="route-toggle-btn" @click="routeToggle =! routeToggle">
                    <i class="el-icon-map-location"></i>
                    <span>线路图例信息</span>
                    <i class="el-icon-caret-top"></i>
                </button>
                <div class="route-content" :class="{open: routeToggle}">
                    <div class>
                        <img src="../image/m_2.png" />
                        <span>高风险</span>
                    </div>
                    <div class>
                        <img src="../image/m_3.png" />
                        <span>中风险</span>
                    </div>
                    <div class>
                        <img src="../image/m_6.png" />
                        <span>低风险</span>
                    </div>
                    <div class>
                        <img src="../image/m_1.png" />
                        <span>安全</span>
                    </div>
                    <div class>
                        <span>
                            箭头代表
                            <br />车辆行驶方向
                        </span>
                    </div>
                </div>
            </div>
            <button @click="cardToggle = !cardToggle" class="card-toggle-btn" />
            <!-- 车辆列表 -->
            <div class="card" :class="{ open: cardToggle }">
                <ul class="card-head-list">
                    <li class="list-item">车辆列表</li>
                </ul>
                <div class="card-main">
                    <div class="top">
                        <i class="el-icon-location-information" />
                        <span>[已定位] [行驶]</span>
                    </div>
                    <div class="intro">
                        <div class="collapse-item">
                            <div class="collapse-item__label">VIN码：</div>
                            <div class="collapse-item__value">{{ vin }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">车牌：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.licensePlateNo }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">使用单位：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.vehicleClass }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">生产厂家：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.company }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">营运类型：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.operationType }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">电池包型号：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.batteryType }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">车型：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.vehicleType }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">生产时间：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.deliveryTime }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">里程：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.odo }}</div>
                        </div>
                        <div class="collapse-item">
                            <div class="collapse-item__label">经纬度：</div>
                            <div class="collapse-item__value">{{ vehicleInfo.lnglat }}</div>
                        </div>
                    </div>
                    <div class="link" href="javaScript;" @click="jump">
                        查看安全监控分析
                        <i class="el-icon-arrow-right" />
                    </div>
                    <div class="link" href="javaScript;" @click="jump2">
                        查看历史维修记录
                        <i class="el-icon-arrow-right" />
                    </div>
                </div>
                <!-- <div class="card-footer">
                    <span>查询结果：</span>
                    <span>共：1辆</span>
                    <span>在线：1辆</span>
                </div> -->
            </div>
            <!-- collapse -->
            <div class="collapse" :class="{ open: collapseToggle }">
                <button class="collapse-toggle-btn" @click="collapseToggle = !collapseToggle">
                    <i class="el-icon-caret-left" />
                </button>
                <div class="collapse-wrap">
                    <el-scrollbar>
                        <el-collapse v-model="activeName">
                            <el-collapse-item name="0">
                                <template slot="title">
                                    <i class="el-collapse-icon el-icon-caret-right" />
                                    <span>车辆属性</span>
                                </template>
                                <div class="collapse-item">
                                    <div class="collapse-item__label">售后联系人：</div>
                                    <div class="collapse-item__value">{{ vehicleInfo.service }}</div>
                                </div>
                                <div class="collapse-item">
                                    <div class="collapse-item__label">定位时间：</div>
                                    <div class="collapse-item__value">{{ vehicleInfo.msgtime }}</div>
                                </div>
                            </el-collapse-item>

                            <el-collapse-item name="1">
                                <template slot="title">
                                    <i class="el-collapse-icon el-icon-caret-right" />
                                    <span>BMS</span>
                                </template>
                                <div class="collapse-item">
                                    <div class="collapse-item__label">总电压：</div>
                                    <div class="collapse-item__value">{{ vehicleInfo.totalVoltage }} V</div>
                                </div>
                                <div class="collapse-item">
                                    <div class="collapse-item__label">总电流：</div>
                                    <div class="collapse-item__value">{{ vehicleInfo.totalCurrent }} A</div>
                                </div>
                                <div class="collapse-item">
                                    <div class="collapse-item__label">单体最高电压：</div>
                                    <div class="collapse-item__value">{{ vehicleInfo.maxCellVoltage }} V</div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-scrollbar>
                </div>
            </div>
            <div style="height: 100%;">
                <AMap :marker="miniMarker" :zoom="zoom" :type="2" />
            </div>
        </div>
    </div>
</template>

<script>
import AMap from "./AMap";
import { getVehicleRealTimeInfo } from "@/api/warning";
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        zoom: {
            type: Number,
            default: 16,
        },
        vin: {
            type: String,
            default: ''
        },
        miniMarker: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        AMap,
    },
    mounted() {
        const _this = this;
        this.interval = setInterval(() => {
            _this.getVehicleRealTimeInfo();
        }, this.refreshInterval)
    },
    data() {
        return {
            marker: [],
            vehicleInfo: {},
            cardToggle: true,
            collapseToggle: true,
            routeToggle: false,
            activeName: ["0", "1"],
            refreshInterval: 1000 * 60 * 5, // 刷新数据时间
        };
    },
    methods: {
        handleClick() {
            this.$emit("on-close");
        },
        jump() {
            this.$router.push("./batterys");
        },
        jump2() {
            this.$router.push("./historical");
        },
        getVehicleRealTimeInfo() {
            const params = {
                vin: this.vin
            }
            getVehicleRealTimeInfo(params).then(res => {
                let data = res.data.data;
                data.lnglat = `${data.lnglat[0].toFixed(6)}, ${data.lnglat[1].toFixed(6)}`;
                this.vehicleInfo = data;
            })
        }
    },
    watch: {
        vin: {
            handler: function (newVal, oldVal) {
                console.log('new Val = ', newVal);
                console.log('old val = ', oldVal);
                this.getVehicleRealTimeInfo();
            },
            immediate: true, // 不立即加载
        }
    },
    beforeDestroy() {
        console.log('销毁小地图');
        clearInterval(this.interval);
    },
};
</script>

<style lang="scss" scoped>
.pop {
    width: 455px;
    height: 450px;
    box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.16);
    position: fixed;
    right: 0;
    bottom: 0;
}
.card {
    min-width: 248px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.16);
    border-radius: 3px;
    border: 1px solid rgba(209, 216, 229, 1);
    position: absolute;
    left: -249px;
    top: 0;
    bottom: 0;
    transform: translateX(100%);
    transition: 0.3s transform;
    &.open {
        transform: translateX(0);
    }
    &-toggle-btn {
        width: 14px;
        height: 54px;
        background: #fff;
        box-shadow: 4px 0px 4px 0px rgba(0, 0, 0, 0.09);
        border-radius: 0px 5px 5px 0px;
        border: 1px solid #d9dee9;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 230px;
        z-index: 200;
        cursor: pointer;
        &::before {
            content: "";
            border: 4px solid transparent;
            border-left-color: #239fff;
            position: absolute;
            left: 0;
            top: 50%;
            -webkit-transform: translate(4px, -50%);
            transform: translate(4px, -50%);
        }
    }
    &-main {
        .top {
            padding: 20px 0 11px 18px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(44, 64, 90, 1);
            line-height: 22px;
            i {
                color: #e84042;
            }
        }
        .intro {
            margin: 0 17px 0 24px;
            padding: 9px 4px 11px 14px;
            background: rgba(250, 251, 252, 1);
        }
    }
    .link {
        display: block;
        height: 22px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(35, 159, 255, 1);
        cursor: pointer;
        line-height: 22px;
        text-align: right;
        text-decoration: none;
        margin-top: 10px;
        padding-right: 15px;
        i {
            margin-left: 4px;
        }
    }
    &-head-list {
        height: 42px;
        line-height: 42px;
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
        list-style: none;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(209, 216, 229, 1);
        .list-item {
            color: rgba(44, 64, 90, 1);
            font-size: 16px;
            background: #ffffff;
            display: inline-block;
            height: 100%;
            height: 42px;
            padding: 0 14px;
            box-sizing: border-box;
            border: 1px solid rgba(209, 216, 229, 1);
            border-radius: 3px 0px 3px 3px;
            border-bottom-color: #fff;
            border-top-width: 0;
            border-left-width: 0;
            position: relative;
            z-index: 1;
        }
    }
    &-footer {
        width: 100%;
        height: 28px;
        line-height: 28px;
        background: rgba(247, 247, 247, 1);
        border-radius: 0px 0px 0px 3px;
        border-top: 1px solid rgba(209, 216, 229, 1);
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        padding-left: 16px;
        position: absolute;
        bottom: 0;
        span:nth-child(2) {
            margin-right: 10px;
        }
    }
}
.mini-map {
    width: 100%;
    height: 450px;
    border: 1px solid #d9dee9;
    &-head {
        width: 100%;
        color: #2c405a;
        font-size: 12px;
        height: 42px;
        line-height: 42px;
        padding-left: 20px;
        background: #f2f4f7;
        border-bottom: 1px solid #d9dee9;
        box-sizing: border-box;
        position: relative;
        z-index: 200;
        .close {
            cursor: pointer;
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            i {
                font-weight: bold;
                font-size: 14px;
            }
        }
    }
    .speed {
        height: 34px;
        line-height: 34px;
        line-height: 34px;
        background: rgba(255, 255, 255, 1);
        padding: 0 12px;
        box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(44, 64, 90, 1);
        position: absolute;
        left: 5px;
        top: 44px;
        z-index: 200;
    }
}
.route {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 300;
    .el-icon-caret-top {
        margin-left: 10px;
    }
    &-toggle-btn {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(44, 64, 90, 1);
        border-radius: 0px 4px 0px 0px;
        padding: 0 10px;
        border: 1px solid rgba(209, 216, 229, 1);
        box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.16);
        background: #ffffff;
        cursor: pointer;
        position: relative;
        z-index: 10;
    }
    &-content {
        background: #ffffff;
        border: 1px solid #d1d8e5;
        border-bottom-width: 0;
        box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 28px;
        transform: translateY(100%);
        transition: transform 0.3s;
        &.open {
            transform: translateY(0);
        }
        > div {
            display: flex;
            align-items: center;
            height: 50px;
            padding: 0 20px;
            position: relative;
            &:last-child {
                &::after {
                    content: "";
                    height: 1px;
                    border-top: 1px solid #d1d8e5;
                    position: absolute;
                    top: 0;
                    left: 20px;
                    right: 20px;
                }
            }
        }
        span {
            flex: 1;
            text-align: center;
            color: rgba(44, 64, 90, 1);
            font-size: 12px;
            line-height: 1.5;
        }
        img {
            width: 40px;
            height: 40px;
        }
    }
}
.collapse {
    width: 230px;
    background-color: #f2f4f7;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 42px;
    bottom: 0;
    z-index: 200;
    transform: translateX(100%);
    transition: 0.3s transform;
    &.open {
        transform: translateX(0);
    }
    &-wrap {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        z-index: 2;
    }
    &-toggle-btn {
        width: 30px;
        height: 28px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.16);
        border-radius: 4px 4px 0px 0px;
        border: 1px solid rgba(209, 216, 229, 1);
        cursor: pointer;
        position: absolute;
        bottom: 0;
        left: -30px;
        z-index: 1;
        i {
            color: rgba(63, 83, 110, 1);
        }
    }
    &-item {
        display: flex;
        line-height: 24px;
        font-size: 12px;
        &__label {
            color: #6e7e92;
        }
        &__value {
            color: #3f536e;
        }
    }
    .el-collapse-icon {
        transition: transform 0.3s;
        color: #0093ee;
        margin-right: 10px;
    }

    >>> {
        .el-scrollbar {
            width: 100%;
            height: 100%;
        }
        .el-scrollbar__wrap {
            overflow-y: auto;
            overflow-x: hidden;
        }
        .el-collapse-item__header {
            height: 42px;
            line-height: 42px;
            padding-left: 10px;
            font-size: 12px;
            font-weight: 500;
            color: rgba(63, 83, 110, 1);
            &.is-active {
                .el-collapse-icon {
                    transform: rotate(90deg);
                }
            }
        }
        .el-collapse-item__arrow {
            display: none;
        }
        .el-collapse-item__wrap {
            background-color: #f2f4f7;
            padding-left: 20px;
            padding-right: 8px;
            border-bottom-width: 0;
            .el-collapse-item__content {
                box-sizing: border-box;
                padding: 10px 0;
            }
        }
    }
}
>>> .is-active {
    color: #3f536e !important;
}
>>> .el-collapse {
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #d1d8e5;
}
</style>
