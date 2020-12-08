import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";

// 角色列表
export function role(param) {
  return http.get(`/api/sys/role`, param);
}
// 新增角色
export function Arole(param) {
  return http.post(`/api/sys/role`, param);
}
// 修改角色
export function Erole(param) {
  return http.post(`/api/sys/role`, param);
}
