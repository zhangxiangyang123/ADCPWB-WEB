
<template>
    <div class="header">
        <div class="content">
            <div class="logo">
                动力电池预警平台
            </div>
            <span class="left">
                <ul>
                    <li style="width:80px; border-left: none;" :class="{active:active == 1}">
                        <router-link :to="{path: '/home'}">首页</router-link>
                    </li>
                    <li :class="{active:active == 2}">
                        <router-link :to="{path: '/batterys'}">电池预警</router-link>
                    </li>
                    <li :class="{active:active == 3}">
                        <router-link :to="{path: '/portrait'}">电池画像</router-link>
                    </li>
                    <li :class="{active:active == 4}">
                        <router-link :to="{path: '/failure'}">故障系统</router-link>
                    </li>
                </ul>
            </span>
            <span class="right">
                <ul>
                    <li :class="{active:active == 5}">
                        <router-link :to="{path: '/historical'}">历史溯源</router-link>
                    </li>
                    <li :class="{active:active == 6}">
                        <router-link :to="{path: '/historical'}">计算</router-link>
                    </li>
                    <li :class="{active:active == 7}">
                        <router-link :to="{path: '/historical'}">导出报告</router-link>
                    </li>
                    <li :class="{active:active == 8}">
                        <router-link :to="{path: '/system'}">系统管理</router-link>
                    </li>
                </ul>
                <div class="divs">
                    <span class="imgs" title="退出">
                        <img src="../assets/images/edit.png" width="14" height="14" alt />
                    </span>
                    <span class="quit" @click="quit" style="cursor:pointer">退出</span>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {

        }
    },
    methods: {
        quit() {
            var _this = this;
            this.$confirm('确认退出吗?', '温馨提示', {
                //type: 'warning'
            }).then(() => {
                window.sessionStorage.clear();
                _this.$router.push('/login');
            }).catch(() => {

            });
            // window.sessionStorage.clear(); //退出清除token
            // this.$router.push({ path: "/login" });
        },

    },
}
</script>

<style lang='less' scoped>
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
.header {
    width: 100%;
    height: 57px;
    font-family: SourceHanSansCN, 微软雅黑;
    font-weight: 400;
    .content {
        margin: auto;
        display: inline-block;
        width: 100%;
        min-width: 1200px;
        height: 74px;
        margin: 0 auto;
        position: relative;
        .logo {
            text-align: center;
            margin: 0 auto;
            font-size: 22px;
            font-family: PingFang SC;
            color: #2fe1f1;
            margin-top: 30px;
            font-weight: 600;
        }
        .left {
            float: left;
            margin-top: -30px;
            margin-left: 98px;
        }
        .right {
            float: right;
            margin-top: -30px;
            margin-right: 98px;
            position: relative;
        }
        .divs {
            position: absolute;
            right: -93px;
            top: -18px;
            // float: right;
            // margin-right: -40px;
            // margin-top: -20px;
        }
        .divs .imgs {
            display: inline-block;
            vertical-align: middle;
        }
        .divs .quit {
            display: inline-block;
        }
        .quit {
            color: #6d9fe9;
            font-size: 12px;
            font-family: PingFang SC;
            font-weight: 400;
        }
        ul {
            float: left;
            left: 50%;
            height: 57px;
            display: block;
            li {
                float: left;
                list-style: none;
                width: 100px;
                margin-top: 10px;
                text-align: center;
                // border-left: 1px solid rgba(148,216,237,1);
                background: url(../assets/images/icon_fig.png) no-repeat right
                    center;
                a {
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    color: #2fe1f1 !important;
                    text-decoration: none;
                    display: block;
                }
            }
            li:last-child {
                background: none;
            }
            .active {
                background: transparent;
                a {
                    font-size: 12px;
                    font-family: PingFang SC;
                    // font-weight: bold;
                    color: #66ffff !important;
                }
                hr {
                    visibility: visible !important;
                }
            }
        }
    }
}
</style>