
<template>
  <div class="header">
    <div class="content">
      <div class="logo"
           style="width:30%;">
        <span class="logoSpan1">LOGO</span>
        <span class="logoSpan2">动力电池安全预警平台</span>

        <span class="logoSpan3">|</span>
      </div>

      <div class="nav">
        <el-menu :default-active="this.$route.path"
                 router
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect">

          <!-- 正式代码   上线解开 -->
          <!-- <el-menu-item v-for="(item,index ) in menus"
                        :key="index"
                        :index="item.router"
                        :class="{active:active == index+1}"
                        v-show="item.item != ''">{{item.name}}</el-menu-item>

          <el-submenu v-for="(item,index ) in menus"
                      :key="index"
                      :index="item.router"
                      :class="{active:active == index+1}"
                      v-show="item.item == ''">

            <template slot="title">{{item.name}}</template>
            <el-menu-item v-for="(items,indexs ) in item.item"
                          :key="indexs"
                          :index="items.router">{{items.name}}</el-menu-item>
          </el-submenu> -->
          <!-- ------------------------------------------------- -->
          <!-- 临时代码 上线删除 -->
          <el-menu-item index="/">首页</el-menu-item>

          <el-submenu index="/batterys"
                      :class="{active:active == 2}">
            <template slot="title">电池预警</template>
            <el-menu-item index="/vehicle">车辆管理</el-menu-item>
            <el-menu-item index="/batterys">风险电池管理</el-menu-item>
            <el-menu-item index="/pending">风险待办管理</el-menu-item>
            <el-menu-item index="/early">预警信息统计</el-menu-item>
          </el-submenu>
          <el-submenu index="/portrait"
                      :class="{active:active == 3}">
            <template slot="title">电池画像</template>
            <el-menu-item index="/portrait">电池使用特性</el-menu-item>
            <!-- <el-menu-item index="/signal">预警信息可视化</el-menu-item> -->
            <el-menu-item index="/pack">电池包数据可视化</el-menu-item>
            <el-menu-item index="/core">电芯数据可视化</el-menu-item>
          </el-submenu>
          <el-menu-item index="/failure" :class="{active:active == 4}">故障统计</el-menu-item>
          <el-menu-item index="/historical" :class="{active:active == 5}">历史溯源</el-menu-item>
          <el-menu-item index="/calculation" :class="{active:active == 10}">计算</el-menu-item>
          <el-submenu index :class="{active:active == 6}">
            <template slot="title">系统管理</template>
            <el-menu-item index="/system">数据导出</el-menu-item>
            <el-menu-item index="/journal">日志管理</el-menu-item>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-submenu index="/news" :class="{active:active == 9}">
              <template slot="title">消息推送</template>
              <el-menu-item index="/newsUser">企业消息推送</el-menu-item>
              <el-menu-item index="/news">用户消息推送</el-menu-item>
              <el-menu-item index="/pushRecord">历史推送记录</el-menu-item>
            </el-submenu>
            <el-submenu index="/role" :class="{active:active == 7}">
              <template slot="title">账户管理</template>
              <el-menu-item index="/EnterpriseAccountManagement">企业账户管理</el-menu-item>
              <el-menu-item index="/user">用户管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
            </el-submenu>
            <el-submenu index="/packgl" :class="{active:active == 8}">
              <template slot="title">系统设置</template>
              <el-menu-item index="/systemCar">车型管理</el-menu-item>
<!--              <el-menu-item index="/systemVehicleType">车型管理</el-menu-item>-->
<!--              <el-menu-item index="/packgl">电池包管理</el-menu-item>-->
<!--              <el-menu-item index="/packpz">电池包配置管理</el-menu-item>-->
<!--              <el-menu-item index="/packcs">电池包参数管理</el-menu-item>-->
<!--              <el-menu-item index="/model">参数模型管理</el-menu-item>-->
            </el-submenu>
            <el-submenu index="/packpz" :class="{active:active == 11}">
              <template slot="title">电池包管理</template>
              <el-menu-item index="/packpz">电池包配置管理</el-menu-item>
              <el-menu-item index="/packcs">电池包参数管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/model" :class="{active:active == 12}">预警参数模型管理</el-menu-item>
            <el-menu-item index="/systemFailure" :class="{active:active == 13}">故障诊断参数管理</el-menu-item>

          </el-submenu>
        </el-menu>
      </div>
      <div style="width:20%;">
        <div class="logo_img"
             @click="quit"
             style="cursor:pointer"
             title="退出">
          <img src="../assets/images/battery/quit.png"
               width="24"
               height="24"
               alt />
        </div>
        <!-- <div class="logo_img">
          <img src="../assets/images/battery/news_icon_01.png" width="20" height="20" alt="" />
        </div>-->
        <div class="logo_img">
          <img src="../assets/images/battery/toux.png"
               width="28"
               height="28"
               alt />
        </div>
      </div>
      <!-- <ul>
        <li style="width:80px; border-left: none;" :class="{active:active == 1}">
          <router-link :to="{path: '/home'}">首页</router-link>
          <hr>
        </li>
        <li :class="{active:active == 2}">
          <router-link :to="{path: '/battery'}">电池预警</router-link>

        </li>
        <li :class="{active:active == 3}">
          <router-link :to="{path: '/portrait'}">电池画像</router-link>

        </li>
        <li :class="{active:active == 4}">
          <router-link :to="{path: '/failure'}">故障统计</router-link>

        </li>
        <li :class="{active:active == 5}">
          <router-link :to="{path: '/historical'}">历史溯源</router-link>

        </li>
        <li :class="{active:active == 6}">
          <router-link :to="{path: '/system'}">系统管理</router-link>

        </li>
         <div class="logo_img">
        <img src="../assets/images/battery/quit.png" alt="" />
      </div>
      <div class="logo_img">
        <img src="../assets/images/battery/news_icon_01.png" alt="" />
      </div>
      <div class="logo_img">
        <img src="../assets/images/battery/toux.png" alt="" />
      </div>
      </ul>-->

    </div>
  </div>
</template>

<script>
import { menu } from "@/api/top.js"

export default {
  props: {
    active: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      a: false,
      router: ["/batterys", 'vehicle'],
      activeIndex: "",
      activeIndex2: "",
      menus: [],
      // 临时数据
      //   menu:
      //   [
      //      {
      //     name: '电池预警',
      //     router: '/batterys',
      //     id: '',
      //     items: [
      //       {
      //         name: '车辆管理',
      //         router: '/vehicle',
      //       },
      //       {
      //         name: '风险电池管理',
      //         router: '/batterys',
      //       },
      //       {
      //         name: '预警信息统计',
      //         router: '/early',
      //       }
      //         ]
      //       },
      //     {
      //     name: '电池画像',
      //     router: '/portrait',
      //     id: '',
      //     items: [
      //       {
      //         name: '电池使用特性',
      //         router: '/portrait',
      //       },
      //       {
      //         name: '预警信息可视化',
      //         router: '/signal',
      //       },
      //       {
      //         name: '电池包数据可视化',
      //         router: '/pack',
      //       },
      //       {
      //         name: '电芯数据可视化',
      //         router: '/core',
      //       },

      //       ]
      //   },
      //   {
      //     name: '系统管理',
      //     router: '',
      //     id: '',
      //     items: [
      //       {
      //         name: '数据导入与导出',
      //         router: '/system',
      //       },
      //       {
      //         name: '日志管理',
      //         router: '/journal',
      //       },
      //     ]
      //    },
      // ]
    };
  },
  created () {
    this.init()
  },
  methods: {
    // 接口获取菜单
    init () {
      let params = sessionStorage.getItem('userInfo')
      menu(params).then(res => {
        let _this = this
        res.data.data.forEach(function(e) {
          if (e.parentId === '0') {
            let data = {
              name: e.name,
              id: e.id,
              router: e.href,
            }
            res.data.data.forEach(function(e) {
              if (e.parentId == data.id) {
                let dataItem =
                  [{
                    name: e.name,
                    id: e.id
                  }]
                data.item = dataItem
              }
            })
            _this.menus.push(data)

          }
        })
      })
    },
    quit () {
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
    handleSelect (key, keyPath) {

      console.log('Select===', key, 'Select===', keyPath);
    },
  },
};
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
.logoSpan1 {
  width: 47px;
  height: 21px;
  font-size: 18px;
  font-family: Roboto-Bold, Roboto;
  font-weight: bold;
  color: #ffffff;
  line-height: 21px;
}
.logoSpan2 {
  width: 160px;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 22px;
}
.logoSpan3 {
  padding-left: 38px;
}
.header {
  width: 100%;
  height: 54px;
  background: rgba(39, 99, 183, 1);
  font-family: SourceHanSansCN, 微软雅黑;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  ul {
    min-width: 145px !important;
  }
  .content {
    width: 100%;
    // min-width: 1200px;
    height: 54px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    .logo {
      // float: left;
      margin-left: 28px;
      font-size: 16px;
      line-height: 54px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      // span {
      //   // padding-left: 38px;
      //   // color: rgba(255, 255, 255, 0.24);
      // }
    }
    .logo_img {
      float: right;
      margin-top: 12px;
      margin-right: 28px;
      display: flex;
      justify-content: center;
      justify-items: center;
      img {
        width: 100%;
        background-size: 100% 100%;
        display: block;
      }
    }
    .nav {
      width: 100%;
      height: 54px;
      li:hover {
        background-color: transparent !important;
      }
      li a {
        text-decoration: none !important;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 500;
        color: rgba(255, 225, 255, 0.6) !important;
      }
    }
    /deep/.el-menu.el-menu--horizontal {
      border-bottom: solid 0px #e6e6e6;
    }
    /deep/.el-menu--horizontal {
      border-right: none;
    }
    /deep/ .el-menu {
      border-right: solid 0px #e6e6e6;
      list-style: none;
      position: relative;
      margin: 0;
      padding-left: 0;
      height: 54px;
      line-height: 54px;
      background-color: rgba(39, 99, 183, 1);
    }
    /deep/ .el-menu--horizontal > .el-menu-item {
      float: left;
      height: 54px;
      line-height: 54px;
      margin: 0;
      border-bottom: 0px solid transparent;
      color: rgba(255, 225, 255, 0.6) !important;
    }
    /deep/.el-menu-item {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 500;
      color: rgba(255, 225, 255, 0.6) !important;
      padding: 0 20px;
      cursor: pointer;
      -webkit-transition: none;
      transition: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      text-align: center;
    }
    /deep/li:hover.el-submenu .el-submenu__title {
      background-color: transparent !important;
      color: rgba(39, 99, 183, 1);
      text-align: center;
    }
    /deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 500;
      color: rgba(255, 225, 255, 0.6) !important;
      height: 54px;
      line-height: 54px;
      border-bottom: 0px solid transparent;
      text-align: center;
    }
    /deep/.el-menu-item,
    .el-submenu__title {
      height: 54px;
      line-height: 54px;
      position: relative;
      -webkit-box-sizing: border-box;
      white-space: nowrap;
      list-style: none;
      color: rgba(173, 225, 249, 0.6) !important;
      text-align: center;
    }
    /deep/.el-icon-arrow-down:before {
      content: "";
    }
    /deep/.el-menu-item.is-active {
      border-bottom: 0px solid #409eff;
      color: rgba(255, 255, 255, 1) !important;
      background: transparent !important;
    }
    /deep/.el-menu--horizontal .el-menu.is-active .el-submenu__title {
      border-bottom: 0px solid #409eff;
      background: #ecf5fd;
      color: rgba(255, 255, 255, 1) !important;
    }
    /deep/.el-menu--horizontal .el-menu .el-menu-item,
    .el-menu--horizontal .el-menu {
      position: relative;
      width: 145px;
      // background-color: #fff;
      float: none;
      height: 36px;
      line-height: 36px;
      text-align: center !important;
      padding: 0;
      color: #3f536e !important;
      text-align: center;
    }
  }
}
/deep/.el-menu--horizontal .el-menu .el-menu-item {
  position: relative;
  // background-color: #fff;
  width: 145px;
  float: none;
  height: 36px;
  line-height: 36px;
  text-align: center;
  padding: 0 0;
  color: #3f536e !important;
}
/deep/.el-menu-item {
  font-size: 14px;
  color: #3f536e !important;
  padding: 0 0;
  text-align: center;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  // background-color: #fff;
  width: 145px;
  float: none;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  color: #3f536e;
  text-align: center;
  &:hover {
    background: #ecf5fd;
    color: #2763b7;
  }
}
/deep/.is-active {
  color: rgba(39, 99, 183, 1);
}
/deep/ul.el-menu .el-menu--popup .el-menu--popup-bottom-start {
  width: 145px;
  min-width: 145px !important;
}

/deep/.el-menu--popup {
  position: relative;
  min-width: 145px !important;
  margin-left: 0;
}
/deep/.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 145px;
}
/deep/.el-menu--popup-bottom-start .el-menu {
  position: relative;
}
/deep/.el-menu--popup-bottom-start .el-menu:before {
  content: "";
  position: absolute;
  top: 0px;
  left: 40px;
  border-bottom: 10px solid #ffffff;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.el-menu--horizontal .el-menu .el-submenu {
  text-align: center;
}
.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  color: #3f536e;
  &:hover {
    background: #ecf5fd;
    color: #2763b7 !important;
  }
}
/deep/.el-menu--horizontal .el-menu .el-submenu.is-active > .el-submenu__title {
  background-color: #fff;
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
</style>
