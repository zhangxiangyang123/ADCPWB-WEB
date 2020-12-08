import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";

//初始化、查询
export function getTable(params) {
  return http.post(`/api/system/ttBatteryPack/getBatteryPackPagePage`,params);
}
//增
export function saveTable(params) {
  return http.post(`/api/system/ttBatteryPack`,params);
}
//删
export function deleteTable(params) {
  return http.delete(`/api/system/ttBatteryPack/deleteByID/${params}`);
}
//改
export function editTable(params) {
  return http.put(`/api/system/ttBatteryPack`,params);
}
//查
export function seeTable(params) {
  return http.get(`/api/system/ttBatteryPack/{id}`,params);
}
