<template>
    <div v-show="show" class="dashboard" :class="{ fixed: fixed, move: move }" :style="style">
        <div class="item border-bottom">{{ title }}
            <span @click="closeDiaBox" style="cursor: pointer;">X</span>
        </div>
        <div class="item item-1">
            <div>
                <i class="circle"></i>
                <span>高风险预警</span>
            </div>
            <span>{{ info.highRiskNum || 0 }}条</span>
        </div>
        <div class="item item-2">
            <div>
                <i class="circle"></i>
                <span>中风险预警</span>
            </div>
            <span>{{ info.midRiskNum || 0 }}条</span>
        </div>
        <div class="item item-3">
            <div>
                <i class="circle"></i>
                <span>低风险预警</span>
            </div>
            <span>{{ info.lowRiskNum || 0 }}条</span>
        </div>
        <div class="item border-top item-4">
            <div>
                <i class="circle"></i>
                <span>安全</span>
            </div>
            <span>{{ info.safeNum || 0 }}条</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: true,
        },
        move: {
            type: Boolean,
            default: false,
        },
        fixed: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "预警数量统计",
        },
        x: {
            type: Number,
            default: 0,
        },
        y: {
            type: Number,
            default: 0,
        },
        info: {
            type: Object
        }
    },
    computed: {
        style() {
            return this.fixed
                ? {}
                : { left: this.x - 160 + "px", top: this.y - 100 + "px" };
        },
    },
    methods: {
        closeDiaBox() {
            this.$emit('on-box'); //通知父组件改变。
        },
    }
};
</script>

<style lang="scss" scoped>
.dashboard {
    padding: 8px;
    background: rgba(66, 66, 66, 0.8);
    border-radius: 6px;
    &.move {
        position: absolute;
        transition: 0.3s all;
        z-index: 200;
    }
    &.fixed {
        position: fixed;
        top: 60px;
        right: 5px;
        z-index: 200;
    }
    .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 38px;
        box-sizing: border-box;
        font-size: 12px;
        color: rgba(255, 255, 255, 1);
        padding-left: 15px;
        padding-right: 12px;
        &:nth-child(1) {
            padding-left: 10px;
        }
        &.border {
            &-bottom {
                border-bottom: 1px solid rgba(240, 243, 246, 0.2);
            }
            &-top {
                border-top: 1px solid rgba(240, 243, 246, 0.2);
            }
        }
        > div {
            margin-right: 10px;
        }
        .circle {
            display: inline-block;
            width: 8px;
            height: 8px;
            box-sizing: border-box;
            border-width: 2px;
            border-style: solid;
            border-radius: 50%;
            margin-right: 5px;
        }
        &-1 .circle {
            border-color: #f00015;
        }
        &-2 .circle {
            border-color: #ffa958;
        }
        &-3 .circle {
            border-color: #ffe957;
        }
        &-4 .circle {
            border-color: #34d1bf;
        }
    }
}
</style>
