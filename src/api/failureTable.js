import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";

//初始化
export function getWarningInforInit() {
  return http.get(`/api/Warning/WarningInfo/getWarningInforInit`);
}
//预警信息
export function getWarningInforStatistics(param) {
  return http.get(`/api/Warning/WarningInfo/getWarningInforStatistics`, param);
}

// delete 请求
export function deleteList(params) {
  return http.delete(`${resquest}/deleteList.json`, params);
}
// get请求
export function getList(params) {
  return http.get(`${resquest}/getList.json`, params);
}
// 故障统计
export function getVehicleFailureStatistics(param) {
  return http.get(
    `/api/VehicleFailureStatistics/getVehicleFailureStatistics`,
    param
  );
}
//获取vin
export function getVINList(param) {
  return http.get(
    `/api/system/ttVehicles/getVehiclesList?orgId=CLEYQP8C27&vehicleType=${param}`
  );
}


// 车辆列表
export function getCarOption(param) {
  return http.get(
    `/api/system/ttVehicleType/getVehiclesList?orgId=CLEYQP8C27`
  );
}
