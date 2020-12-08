import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routerData: [],
    total: "1233"
  },
  mutations: {
    router(state, data) {
      console.log(state, data);
      state.routerData = data;
      console.log("store==", data);
      state.total = data.length;
    }
  },
  actions: {}
});

// ------------------
{
  /* <el-menu v-for="(item,index ) in $store.state.routerData"
:key="index"
:default-active="activeIndex"
class="el-menu-demo"
mode="horizontal"
@select="handleSelect">
<el-menu-item v-if="item.children.length<1"
       :index="item.router">一级菜单{{item.label}}</el-menu-item>
<el-menu-item v-else
       index="1">二级菜单{{item.children.label}}</el-menu-item>

</el-menu> */
}
// -----------end------------
