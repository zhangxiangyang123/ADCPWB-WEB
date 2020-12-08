import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";

//推送企业初始化
export function handleDelApi(params) {
  return http.get(
    `/api/system/messagepushEnterprise/getMessagepushEnterprisePage`,
    params
  );
}
// 企业下拉列表
export function getOrgList(params) {
  return http.get(`/api/sys/org/getOrgList`, params);
}
// 获取所有用户
export function allUser(params) {
  return http.get(
    `/api/system/messagepushUser/getAllMessagepushUserEOPage`,
    params
  );
}
// 新增
export function addApi(params) {
  return http.post(`/api/system/messagepushEnterprise`, params);
}
// 编辑
export function editApi(params) {
  return http.put(`/api/system/messagepushEnterprise`, params);
}

// delete 请求
export function deleteList(params) {
  return http.delete(`/api/system/messagepushEnterprise`, params);
}
// get请求
// export function getList(params) {
//   return http.get(`${resquest}/getList.json`, params)
// }
