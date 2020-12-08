<template>
    <div style="width: 100%; height: calc(100% - 54px);">
        <Top :active="2" />
        <div class="container">
            <Search :treeData="treeData" @on-search="onSearch" @on-change="onSearchChange" @on-tree-node-click="handleClick" @on-tab-click="handleTabClick" />
            <AMap :marker="marker" :center="center" :zoom="zoom" :city="city" :type="type" @on-marker-click="onMarkerClick" @on-marker-mouseover="onMarkerMouseover" @on-marker-mouseout="onMarkerMouseout" @on-zoom-resized="onZoomResized" @on-camera-max-move="onCameraMaxMove" @on-camera-move="onCameraMove" />
            <div v-if="showMiniMap">
                <MiniMap :show="showMiniMap" :miniMarker="miniMarker" :vin="vin" :miniZoom="miniZoom" @on-close="onClose" />
            </div>
            <Dashboard :fixed="true" :show="show" @on-box="onBox" :info="riskInfo" />
            <!-- <Dashboard :move="true" :x="x" :y="y" :show="show" /> -->
        </div>
    </div>
</template>
<script>
import Top from "@/components/top";
import Search from "./components/Search";
import AMap from "./components/AMap";
import MiniMap from "./components/MiniMap";
import Dashboard from "./components/Dashboard";

import markers from "./mock/marker";
import CarMarkers from "./mock/car";
import Points from "./mock/points";
// import { treeData } from "./mock/index.js";
import { countVehicle, getVehicleInfo, queryByVin, queryByPlateNo, queryByType, getVehicleRealTimeInfo, getRiskInfo } from "@/api/warning";

export default {
    components: {
        Top,
        Search,
        AMap,
        MiniMap,
        Dashboard,
    },
    data() {
        return {
            marker: [],
            miniMarker: [],
            vin: null,
            zoom: 5,
            miniZoom: 16,
            type: 1,
            city: '',
            riskInfo: {
                highRiskNum: 0,
                lowRiskNum: 0,
                midRiskNum: 0,
                safeNum: 0
            },
            center: [],
            refreshInterval: 1000 * 60 * 5,
            position: {
                northEast: '137.641113,53.957486', // 初始化
                southWest: '78.358887,8.018072'
            },
            showMiniMap: false,
            treeData: [],
            x: 0,
            y: 0,
            show: true,
        };
    },
    created() {
        // countVehicle().then(res => {
        //   // TODO: 类型检查、错误处理
        //   data = res.data;
        //   this.marker = res.data
        // })
        // this.handleExpand();
        this.getVehicle();
        this.getRiskInfo();
        this.setRiskInterval();
    },
    beforeDestory() {
        console.log('Destory interval')
        clearInterval(this.timer2);
        clearInterval(this.interval);
    },
    methods: {
        setRiskInterval() {
            clearInterval(this.timer2);
            const _this = this;
            this.timer2 = setInterval(() => {
                _this.getRiskInfo();
            }, this.refreshInterval)
        },
        // 获取车辆风险统计数据
        getRiskInfo() {
            getRiskInfo().then(res => {
                this.riskInfo = res.data.data;
            })
        },
        //聚合放到最大显示车辆、定位实时跟踪、图标状态控制
        getVehicleInfo() {
            let [max_lon, max_lat] = this.position.northEast.split(',');
            let [min_lon, min_lat] = this.position.southWest.split(',');
            let params = {
                min_lon,
                max_lon,
                min_lat,
                max_lat
            };
            getVehicleInfo(params).then(res => {
                const data = res.data.data;
                this.marker = this.vehicleType ? data.filter(item => item.type == this.vehicleType) : data;
            })
        },
        // 获取车辆管理全部数据
        getVehicle() {
            let [max_lon, max_lat] = this.position.northEast.split(',');
            let [min_lon, min_lat] = this.position.southWest.split(',');
            let params = {
                zoom: this.zoom,
                min_lon,
                max_lon,
                min_lat,
                max_lat
            };

            countVehicle(params).then(res => {
                const data = res.data.data;
                this.handleExpand(data);
            })
                .catch(error => {
                    console.error(error);
                })
        },
        onSearch(value, type) {
            if (type === 'type') {
                // 车型
                queryByType({ type: value }).then(res => {
                    const data = res.data.data;
                    const keys = Object.keys(data)
                    this.treeData = keys.map(name => {
                        const children = data[name];
                        let temp = [];
                        for (let c of Object.keys(children)) {
                            temp.push({
                                label: c,
                                vehicleType: name,
                                type: 2,
                                position: children[c]
                            })
                        }
                        return {
                            label: name,
                            type: 1,
                            children: temp
                        }
                    })
                })
            } else if (type === 'vin') {
                queryByVin({ vin: value }).then(res => {
                    const data = res.data.data;
                    const temp = [];
                    for (let item of data) {
                        temp.push({
                            label: item,
                            type: 2,
                        })
                    }
                    this.treeData = temp;
                })
            } else if (type === 'plateno') {
                // 车牌
                queryByPlateNo({ plateno: value }).then(res => {
                    const platenoData = res.data.data;
                    this.treeData = platenoData.map(item => {
                        return {
                            label: item.licensePlateNo,
                            vin: item.vin,
                            type: 2
                        }
                    })
                })
            }

        },
        formatTree() {
            this.treeData = treeData.filter((item) =>
                value ? item.label.includes(value) : true
            );

        },
        onSearchChange(val) {
            this.vehicleType = '';
        },
        handleTabClick(val) {
            this.treeData = [];
        },
        handleClick(type, data, node) {
            if (data.type === 1) {
                this.handleExpand();
                return;
            }
            if (type === 'type') {
                this.zoom = 7;
                this.vehicleType = data.vehicleType; // 设置查询车型
                this.city = data.label;
                this.center = data.postion;
            } else {
                const vin = type === 'vin' ? data.label : data.vin;
                const params = { vin };
                getVehicleRealTimeInfo(params).then(res => {
                    const data = res.data.data;
                    this.zoom = 13;
                    this.marker = [{
                        level: 1,
                        vin: vin,
                        lnglat: data.lnglat
                    }]
                    this.type = 2;
                })
            }

            // this.zoom = 16;
            // this.marker = CarMarkers;
            // this.type = 2;
        },
        handleExpand(data) {
            // this.zoom = 5;
            this.marker = data;
            this.type = 1;
        },
        onMarkerClick(car, e) {
            this.showMiniMap = true;
            this.miniMarker = [car];
            this.vin = car.vin;
            this.miniZoom = this.zoom;
            const _this = this;
            if (this.type === 2) {
            }
        },
        onMarkerMouseover(e) {
            if (this.type === 1) {
                const { x, y } = e.pixel;
                this.x = x;
                this.y = y;
                this.show = true;
            }
        },
        onMarkerMouseout() {
            this.show = false;
        },
        onClose() {
            this.showMiniMap = false;
        },
        //关闭左上角窗口
        onBox() {
            this.show = false;
        },
        setGetInfoInterval(callback) {
            clearInterval(this.interval);
            const _this = this;
            this.interval = setInterval(() => {
                callback();
            }, this.refreshInterval)
        },
        onZoomResized(val, bounds) {
            this.zoom = val;
            this.position.northEast = bounds.northeast.toString();
            this.position.southWest = bounds.southwest.toString();
            if (val > 9) {
                // 放到最大了，加载具体点的数据
                this.type = 2;
                // this.getVehicleInfo();
                // this.marker = CarMarkers;
                this.getVehicleInfo();
                this.setGetInfoInterval(this.getVehicleInfo)
                return;
            }
            this.type = 1;
            // 加载数据
            this.getVehicle(); // 刷新数据
            this.setGetInfoInterval(this.getVehicle)
        },
        onCameraMove(zoom, bounds) {
            this.zoom = zoom;
            this.position.northEast = bounds.northeast.toString();
            this.position.southWest = bounds.southwest.toString();
            if (this.zoom > 9) {
                // 放到最大了，加载具体点的数据
                this.type = 2;
                // this.getVehicleInfo();
                // this.marker = CarMarkers;
                this.getVehicleInfo();
                this.setGetInfoInterval(this.getVehicleInfo)

                return;
            }
            this.type = 1;
            // 加载数据
            this.getVehicle(); // 刷新数据
            this.setGetInfoInterval(this.getVehicle)

        },
        onCameraMaxMove(val, bounds) {
            this.type = 2;
            this.room = val;
            this.position.northEast = bounds.northEast.toString();
            this.position.southWest = bounds.southWest.toString();
        }
    },
};
</script>
