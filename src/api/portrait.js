import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = '/api/request/'
// 热力分布图
export function searchs(params) {
  return http.get(`/api/BatteryProtrati/getBatteryUsageDate`, params)
}
// 直方图
export function histogram(params) {
  return http.get(`/api/BatteryProtrati/getChargeCurrentFrequencyHistogramList`, params)
}
// 充电方式饼状图
export function pieChart(params) {
  return http.get(`/api/BatteryProtrati/getThermalDistributionData`, params)
}
