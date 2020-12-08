import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/"

//列表
export function getRiskBatteryList(params) {
  return http.get(`/api/battery/getRiskBatteryList`, params)
}
//删除、一键删除
export function DeleteList(params) {
  return http.delete(`/api/battery/${params}`)
}
//获取推送的企业人员
export function getEnterpriseUser(params) {
  return http.get(`/api/battery/getEnterpriseUser/${params}`)
}
//一键审核
export function auditing(data) {
  return http.get(`/api/battery/${data}`)
}
//推送
export function seedList(params) {
  return http.get(`/api/battery/pushToEnterpriseUser/${params}`)
}
//搜索下拉框数据字典 
export function getList(params) {
  return http.get(`/api/sys/dictype/list`, params)
}
//模糊查询
export function getSearchList(params) {
  return http.get(`/api/battery/getSearchList`, params)
}
//附件上传
export function fileUpload(params) {
  return http.post(`/api/battery/fileUpload`, params, )
}
//附件下载
export function download(params) {
  return http.get(`api/battery/download`, params, )
}
//附件删除
export function delfile(id, params) {
  return http.delete(`/api/battery/delfile/${id}`, params)
}
//查看
export function getDetailById(params) {
  return http.get(`/api/battery/getDetailById`, params)
}
//编辑 审核
export function edit(params) {
  return http.put(`/api/battery/edit`, params)
}
