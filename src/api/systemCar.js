import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";

//删
export function deleteTable(params) {
  return http.delete(`/api/system/ttVehicleType/${params}`);
}
//获取模型名称id
export function getModelID(params){
  return http.get(`/api/battery/param/page`,params);
}

