<template>
    <div class="container"></div>
</template>

<script>
import AMap from "AMap";
import { countVehicle, } from "@/api/warning";
// const TYPE = {
//     1: require("../image/m_1.png"),
//     2: require("../image/m_2.png"),
//     3: require("../image/m_3.png"),
//     4: require("../image/m_4.png"),
//     5: require("../image/m_5.png"),
// };

const TYPE = {
    '安全': require("../image/m_1.png"),
    '高风险': require("../image/m_2.png"),
    '中风险': require("../image/m_3.png"),
    '低风险': require("../image/m_6.png"),
    // 5: require("../image/m_5.png"),
};

export default {
    props: {
        zoom: {
            type: Number,
            default: 5,
        },
        marker: {
            type: Array,
            default: () => [],
        },
        type: {
            type: Number,
            default: 1,
        },
        city: {
            type: String,
            default: '',
        },
        center: {
            type: Array,
            default: () => [108, 34]
        }
    },
    data() {
        return {
            map: null,
            isCameraMoving: false,
            statusIcons: {
                static: require('@/assets/images/static.png'),
                moving: require('@/assets/images/moving.png'),
                charge: require('@/assets/images/charging.png')
            }
        };
    },
    computed: {
        markCount() {
            return this.marker.length;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initMap();
        });
    },
    methods: {
        initMap() {
            const _this = this;
            let center = [108, 34];
            if (this.marker.length > 0 && this.type === 2) {
                center = this.marker[0].lnglat
            };

            this.map = new AMap.Map(this.$el, {
                resizeEnable: true,// 调整任意窗口的大小，自适应窗口
                zoom: this.zoom,//初始化地图时显示的地图放大等级
                center,//初始化地图时显示的中心点坐标
            });
            this.type === 1 ? this.addMapMarker() : this.addMapCarMarker();
            this.map.on('zoomstart', this.mapZoomstart); // 监听room变化
            this.map.on('zoomend', this.mapZoomend);
            this.map.on('moveend', this.mapMoveend); // 监听地图移动事件
            // this.map.setZoomAndCenter(this.zoom, this.marker[0].position);
        },
        // 全国车型标记  --正常默认时显示的蓝色点
        addMapMarker() {
            const _this = this;
            this.map.clearMap();
            console.log(this.marker)
            this.marker.forEach(data => {
                let position = [data.centx, data.centy];
                let marker = new AMap.Marker({
                    position: position,
                    content: "<div class='IMarker'></div>",
                });
                marker.setLabel({
                    offset: new AMap.Pixel(10, 40), //设置文本标注偏移量
                    content: `
                    <div class='IMarker-label'>
                    <div class="head">
                        <span class='city'>${data.name}</span>
                        <span>${data.count}辆</span>
                    </div>
                    <div class="content">
                        <div class="item">
                          <span class='city'>
                          <img src="${this.statusIcons.static}" alt="static" class="IMarker-icon">
                          静止</span>
                          <span>${data.stopnum}辆</span>
                        </div>
                        <div class="item">
                          <span class='city'>
                          <img src="${this.statusIcons.moving}" alt="static" class="IMarker-icon">
                          行驶</span>
                          <span>${data.runnum}辆</span>
                        </div>
                        <div class="item">
                          <span class='city'>
                          <img src="${this.statusIcons.charge}" alt="static" class="IMarker-icon">
                          充电</span>
                          <span>${data.chargenum}辆</span>
                        </div>
                    </div>
                    
                    </div>`, //设置文本标注内容
                    direction: "right", //设置文本标注方位
                });
                marker.on("click", function (e) {
                    let curZoom = _this.map.getZoom();
                    if (curZoom < 20) {
                        curZoom += 2
                    }
                    _this.map.setZoomAndCenter(curZoom, e.lnglat);
                });
                this.map.add(marker);
            });
        },
        // 省份车辆海量点标记   --放到最大时候地图展示的风险图标
        addMapCarMarker() {
            const _this = this;
            this.map.clearMap();
            this.marker.forEach(car => {
                let marker = new AMap.Marker({
                    icon: TYPE[car.level], // 安全等级图标设置
                    position: car.lnglat,
                });
                marker.on("click", function (e) {
                    _this.bindClick(car, e);
                });
                this.map.add(marker);
            });
        },
        hideCluster() {
            // console.log(this.cluster);
            // this.cluster.hide();
        },
        mapZoomstart(...args) {
            this.startZoom = this.map.getZoom();
            console.log('startZoom = ' + this.startZoom);
        },
        mapZoomend(...args) {
            let zoom = this.map.getZoom();
            let bounds = this.map.getBounds(); // 获取可视范围
            this.$emit("on-zoom-resized", zoom, bounds);
        },
        mapMoveend(...args) {
            let zoom = this.map.getZoom();
            let bounds = this.map.getBounds(); // 获取可视范围
            // if (zoom > 14.9) {
            // this.$emit("on-camera-max-move", zoom, bounds); // 放到最大时尺寸变化
            // return;
            // }
            this.$emit("on-camera-move", zoom, bounds);
        },
        bindClick(...args) {
            this.$emit("on-marker-click", ...args);
        },
        bindMouseover(...args) {
            this.$emit("on-marker-mouseover", ...args);
        },
        bindMouseout(...args) {
            this.$emit("on-marker-mouseout", ...args);
        },
        /**
         * inglat []
         */
        lnglat2pixel(value) {
            if (!lnglat.length) return;
            let zoom = this.map.getZoom();
            let lnglat = new AMap.LngLat(value[0], value[1]);
            let pixel = this.map.lngLatToPixel(lnglat, zoom);
            pixel.x = parseInt(pixel.x);
            pixel.y = parseInt(pixel.y);
            return pixel;
        },
    },
    watch: {
        type() {
            if (!this.map) return;
            // this.map.setZoomAndCenter(this.zoom, this.marker[0].position);
        },
        marker() {
            if (!this.map) return;
            if (this.type === 1) {
                this.addMapMarker()
            } else {
                this.addMapCarMarker()
                console.log('add map car marker 时生效', this.zoom)
                if (this.marker.length === 1) {
                    let center = this.marker[0].lnglat;
                    this.map.setZoomAndCenter(this.zoom, center);
                }
            }
        },
        city() {
            this.map.setZoomAndCenter(this.zoom, this.center);
        }
    },
    beforeDestroy() {
        this.map.destroy();
    },
};
</script>

<style lang="scss" scope>
.container {
    width: 100%;
    // height: calc(100vh - 54px);
    height: 100%;
    .amap-marker-label {
        border: none;
        background: transparent;
        padding: 0px;
    }
    .amap-layers {
        // left: -58px !important;
    }
}

.IMarker {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 4px solid #fff;
    background-color: #0068fe;
    box-shadow: 0 0 20px rgba(0, 104, 254, 1);
    &-label {
        min-width: 140px;
        font-size: 12px;
        font-weight: 500;
        // height: 28px;
        background: rgba(66, 66, 66, 0.8);
        border-radius: 6px;
        // line-height: 28px;
        color: #ffffff;
        span {
            margin-right: 36px;
            &:last-child {
                margin-right: 0;
            }
        }
        .head {
            padding: 0 10px;
            display: flex;
            justify-content: space-between;
            height: 28px;
            line-height: 28px;
            border-bottom: 1px solid #8F9399;
        }
        .content {
            .item {
                .city {
                    display: flex;
                    align-items: center;
                    img {
                        margin-right: 5px;
                    }
                }
                display: flex;
                align-items: center;
                padding: 0 10px;
                height: 28px;
                line-height: 28px;
                justify-content: space-between;
            }
        }
    }
}
</style>
