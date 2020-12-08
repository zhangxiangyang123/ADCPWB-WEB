import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 *  @param 'getList.json
 */
let resquest = "/api/request/";

// 菜单列表
export function getData1(param) {
  return http.get(
    `/api/CellDataVisualizationController/getVoltageTemperatureRealTimeData`, //正式接口
    // `/api/CellDataVisualizationController/getData1`, //临时接口
    param
  );
}
