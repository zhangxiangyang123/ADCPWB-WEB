<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style lang="scss">
#app {
    height: 100%;
    width: 100%;
}
html,
body {
    padding: 0;
    margin: 0;
}
@media screen and (min-width: 1920px) {
    html,
    body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        min-width: 1260px;
        background: rgba(244, 247, 252, 1);
        overflow: hidden !important;
    }
}
@media screen and (min-width: 1366px) {
    html,
    body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        min-width: 1260px;
        background: rgba(244, 247, 252, 1);
        overflow-y: auto !important;
        overflow-x: hidden;
    }
}
@media screen and (max-width: 1366px) and (max-height: 768px) {
    html,
    body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        min-width: 1260px;
        background: rgba(244, 247, 252, 1);
        overflow-y: auto !important;
        overflow-x: hidden;
    }
}
@media screen and (max-width: 1366px) and (max-height: 1024px) {
    html,
    body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        min-width: 1260px;
        background: rgba(244, 247, 252, 1);
        overflow-y: auto !important;
        overflow-x: hidden;
    }
}
.el-menu--popup {
    position: relative;
    min-width: 145px !important;
}
.el-menu--popup {
    position: relative;
}
.el-menu--popup:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 40px;
    border-bottom: 10px solid #ffffff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
}
.el-submenu .el-menu--popup:before {
    display: none;
}
.el-menu--horizontal .el-menu .el-submenu__title {
    background-color: transparent;
    float: none;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    color: #3f536e !important;
}
.el-submenu__title:focus,
.el-submenu__title:hover {
    background-color: transparent !important;
}
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
    color: #3f536e;
    &:hover {
        background: #ecf5fd;
        color: #2763b7 !important;
    }
}
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
    background-color: transparent;
    float: none;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    color: #3f536e !important;
    &:hover {
        background: #ecf5fd;
        color: #2763b7 !important;
    }
}
.el-menu--horizontal .el-menu .el-menu-item {
    background-color: transparent;
}
.el-menu--horizontal .el-menu .el-submenu__title {
    background-color: transparent;
    width: 145px;
    float: none;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    color: #3f536e;
    text-align: center;
    &:hover {
        background: #ecf5fd;
        color: #2763b7 !important;
    }
}
.is-active {
    color: rgba(39, 99, 183, 1) !important;
}
</style>