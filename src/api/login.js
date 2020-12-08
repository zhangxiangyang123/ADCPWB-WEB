import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json 
 */
let resquest = "/api/request/"

//登录
export function login(param) {
  return http.post(`/api/login`, param)
}
//登录验证码
export function verifyCode(param) {
  return http.get(`/api/verifyCode`, param)
}
//风险等级
export function findByNewestOne() {
  return http.get(`/api/risk/findByNewestOne`, )
}
//今日新增
export function countTodayGrow() {
  return http.get(`/api/TodayInfo/TodayInfo/countTodayGrow`, )
}
//通知
export function faultNotification() {
  return http.get(`/api/Warning/Today/faultNotification`, )
}
//电池包异常识别
export function showGraphType() {
  return http.get(`/api/BatterypackException/BatterypackException/showGraphType`, )
}
//车辆管理
export function ProvinceWarningIndex() {
  return http.get(`/api/ProvinceWarningIndex/ProvinceWarningIndex/provinceWarningIndex`, )
}
export function vehicleCounts() {
  return http.get(`/api/ProvinceWarningIndex/ProvinceWarningIndex/vehicleCounts`, )
}
//故障类型统计
export function getFailureStatistics() {
  return http.get(`/api/risk/getFailureStatistics`, )
}
//预警类型统计
export function getWarningStatistics() {
  return http.get(`/api/risk/getWarningStatistics`, )
}
