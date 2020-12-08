import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";
// 历史分页查询---充电记录
export function getChargeRecordPage(params) {
  return http.get(`/api/TracingHistrory/getChargeRecordPage`, params);
}
// 历史分页查询---充电详情
export function getChargeRecordVOByID(params) {
  return http.post(`/api/TracingHistrory/getChargeRecordVOByID`, params);
}
// 历史分页查询---故障警记录
export function getFailurePage(params) {
  return http.get(`/api/TracingHistrory/getFailurePage`, params);
}
// 历史分页查询---故障记录详情
export function getFailureVOByID(params) {
  return http.post(`/api/TracingHistrory/getFailureVOByID`, params);
}
// 历史分页查询---预警记录详情
export function getDetailById(params) {
  return http.get(`/api/battery/getDetailById?id=${params}`);
}
// 历史分页查询---预警记录
export function getWarningInfoEOPage(params) {
  return http.get(`/api/TracingHistrory/getWarningInfoEOPage`, params);
}
// 历史分页查询---维修记录
export function getMaintainEOPage(params) {
  return http.get(`/api/TracingHistrory/getMaintainEOPage`, params);
}
// 历史分页查询---行驶记录

export function getDrivingRecordPage(params) {
  return http.get(`/api/TracingHistrory/getDrivingRecordPage`, params);
}
// ------------一下代码完成删除-------------
//推送企业初始化
export function handleDelApi(params) {
  return http.get(
    `/api/system/messagepushUser/getMessagepushUserEOPage`,
    params
  );
}

// 删除
// export function deleteList(params) {
//   return http.delete(`api/system/messagepushEnterprise`, params)
// }
// 新增
export function addApi(params) {
  return http.post(`/api/system/messagepushUser`, params);
}
// 编辑
export function editApi(params) {
  return http.put(`/api/system/messagepushUser`, params);
}
//历史记录企业初始化
export function handleDelApis(params) {
  return http.get(`/api/system/pushHistory/getPushHistoryEOPage`, params);
}
//历史记录详情
export function pushHistory(params) {
  return http.get(`/api/system/pushHistory/` + params);
}

// delete 请求
export function deleteList(params) {
  return http.delete(`${resquest}/api/system/messagepushEnterprise`, params);
}
// get请求
export function getList(params) {
  return http.get(`${resquest}/getList.json`, params);
}
