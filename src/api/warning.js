import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/"

//地图聚合显示车辆数量
export function countVehicle(params) {
  return http.get(`/api/Map/Vehicle/countVehicle`, params)
}
//聚合放到最大显示车辆、定位实时跟踪、图标状态控制
export function getVehicleInfo(params) {
  return http.get(`/api/Map/Vehicle/getVehicleInfo`, params)
}
//点击具体车辆图标，显示详情弹出窗口数据
export function getVehicleRealTimeInfo(params) {
  return http.get(`/api/Map/Vehicle/getVehicleRealTimeInfo`, params)
}
//vin查询  --传vin，目前至少输入6位，后期后台继续完善
export function queryByVin(params) {
  return http.get(`/api/Map/Vehicle/queryByVin`, params)
}
//车牌号查询 --传车牌号
export function queryByPlateNo(params) {
  return http.get(`/api/Map/Vehicle/queryByPlateNo`, params)
}
//车型查询 --传车型
export function queryByType(params) {
  return http.get(`/api/Map/Vehicle/queryByType`, params)
}
// 预警统计数据查询
export function getRiskInfo(params) {
  return http.get('/api/Map/Vehicle/getRiskInfo', params)
}
