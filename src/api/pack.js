import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";
// 图片导出
export function frequencyExport(params) {
  return http.post(`/api/BatteryProtrati/frequencyExport`, params);
}
//双Y轴数据对比图表
export function getHistoricalVehicleData(params) {
  return http.get(`/api/BatteryProtrati/getHistoricalVehicleData`, params);
}
//最高单体号 最高温度探针号
export function getFrequencyData(params) {
  return http.get(`/api/BatteryProtrati/getFrequencyData`, params);
}

// 删除
// export function deleteList(params) {
//   return http.delete(`api/system/messagepushEnterprise`, params)
// }
//获取车型
export function getVehiclesList(params) {
  return http.get(`/api/system/ttVehicleType/getVehiclesList`, params);
}

export function getVehiclesListViN(params) {
  return http.get(`/api/system/ttVehicles/getVehiclesList`, params);
}
export function menu(params) {
  return http.get(`/sys/menu`, params);
}

// 编辑
