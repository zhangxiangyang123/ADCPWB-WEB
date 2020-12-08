import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";

// 新增
export function addMenu(param) {
  return http.post(`/api/sys/menu`, param);
}
//编辑
export function setMenu(param) {
  return http.put(`/api/sys/menu`, param);
}
//删除
export function delMenu(params) {
  return http.delete(`/api/sys/menu/` + params);
}

//配置角色菜单
export function saveRoleMenu(param) {
  return http.post(`/api/sys/role/saveRoleMenu`, param);
}
