import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
// 分页查询
let resquest = "/api/request/";
export function user(params) {
  return http.get(`/api/sys/user`, params);
}
// 新增
export function addUser(params) {
  return http.post(`/api/sys/user`, params);
}
// 修改
export function editUser(params) {
  return http.put(`/api/sys/user`, params);
}
// 删除

export function dleUser(params) {
  return http.DELETE(`/api/sys/user/` + params);
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
