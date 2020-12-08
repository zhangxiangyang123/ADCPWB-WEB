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
  return http.post(`/api/system/ttFaultDiagnosisParamManagement/getFaultDiagnosisParamManagementPage`,params);
}
//增
export function saveTable(params) {
  return http.post(`/api/system/ttFaultDiagnosisParamManagement`,params);
}
//删
export function deleteTable(params) {
  return http.delete(`/api/system/ttFaultDiagnosisParamManagement/${params}`);
}
//改
export function editTable(params) {
  return http.put(`/api/system/ttFaultDiagnosisParamManagement`,params);
}
//表单车型列表
export function getVehiclesTypeList(params){
  return http.get(`/api/system/ttVehicleType/getVehiclesTypeList?orgId=CLEYQP8C27`)
}
//获取搜索车型列表
export function getVechicleTypePage(params){
  return http.post(`/api/system/ttVehicleType/getVechicleTypePage`,params)
}
