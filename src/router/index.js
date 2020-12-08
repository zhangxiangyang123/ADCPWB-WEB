import Vue from "vue";
import Router from "vue-router";
import home from "@/views/home";
import batterys from "@/views/batteryWarning/batterys";
import pending from "@/views/batteryWarning/pending";
import portrait from "@/views/batteryPortrait/portrait";
import failure from "@/views/faultStatistics/failure";
import historical from "@/views/historicalSources/historical";
import system from "@/views/systemManagement/system";
import top from "@/components/header";
// import toph from '@/components/top'
import login from "@/views/login";
import retrievePassword from "@/views/retrievePassword";
import map from "@/views/map";
import signal from "@/views/batteryPortrait/signal";
import pack from "@/views/batteryPortrait/pack";
import core from "@/views/batteryPortrait/cellCore";
import journal from "@/views/systemManagement/journal";
import menu from "@/views/systemManagement/menu";
import EnterpriseAccountManagement from "@/views/systemManagement/EnterpriseAccountManagement";
import news from "@/views/systemManagement/news";
import newsUser from "@/views/systemManagement/newsUser";
import role from "@/views/systemManagement/role";
import user from "@/views/systemManagement/user";
import pushRecord from "@/views/systemManagement/pushRecord";
import packgl from "@/views/systemManagement/packgl";
import packpz from "@/views/systemManagement/packpz";
import packcs from "@/views/systemManagement/packcs";
import model from "@/views/systemManagement/model";
import systemFailure from "@/views/systemManagement/systemFailure";
import systemCar from "@/views/systemManagement/systemCar";
import early from "@/views/batteryWarning/early";
import {
  defaults
} from "autoprefixer";
import calculation from "@/views/batteryPortrait/calculation";

Vue.use(Router);

// export default new Router({
//   mode: 'history', // 后端支持打开
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: router
// });
const router = new Router({
  // mode: 'history',// 后端支持打开
  routes: [{
      path: "/", // 默认进入路由
      redirect: "/login" //重定向
    },
    {
      path: "/",
      name: "login",
      component: login
    },
    {
      path: "/calculation",
      name: "calculation",
      component: calculation
    },
    {
      path: "/pushRecord",
      name: "pushRecord",
      component: pushRecord
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/retrievePassword",
      name: "retrievePassword",
      component: retrievePassword
    },
    {
      path: "/batterys",
      name: "batterys",
      component: batterys
    },
    {
      path: "/pending",
      name: "pending",
      component: pending
    },
    {
      path: "/portrait",
      name: "portrait",
      component: portrait
    },
    {
      path: "/signal",
      name: "signal",
      component: signal
    },
    {
      path: "/pack",
      name: "pack",
      component: pack
    },
    {
      path: "/core",
      name: "core",
      component: core
    },
    {
      path: "/failure",
      name: "failure",
      component: failure
    },
    {
      path: "/historical",
      name: "historical",
      component: historical
    },
    {
      path: "/system",
      name: "system",
      component: system
    },
    {
      path: "/map",
      name: "map",
      component: map
    },
    {
      path: "/journal",
      name: "journal",
      component: journal
    },
    {
      path: "/menu",
      name: "menu",
      component: menu
    },
    {
      path: "/EnterpriseAccountManagement",
      name: "EnterpriseAccountManagement",
      component: EnterpriseAccountManagement
    },
    {
      path: "/news",
      name: "news",
      component: news
    },
    {
      path: "/newsUser",
      name: "newsUser",
      component: newsUser
    },
    {
      path: "/role",
      name: "role",
      component: role
    },
    {
      path: "/user",
      name: "role",
      component: user
    },
    {
      path: "/vehicle",
      name: "vehicle",
      component: () => import("@/views/vehicle/index")
    },
    {
      path: "/packgl",
      name: "packgl",
      component: packgl
    },
    {
      path: "/packpz",
      name: "packpz",
      component: packpz
    },
    {
      path: "/packcs",
      name: "packcs",
      component: packcs
    },
    {
      path: "/model",
      name: "model",
      component: model
    },
    {
      path:"/systemFailure",
      name:"systemFailure",
      component: systemFailure
    },
    {
      path: "/systemCar",
      name: "systemCar",
      component: systemCar
    },
    {
      path: "/early",
      name: "early",
      component: early
    }
  ]
});

//挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   if (to.path === '/retrievePassword') return next()
//   //获取用户信息：userInfo
//   const tokenStr = window.sessionStorage.getItem('userInfo')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router;
