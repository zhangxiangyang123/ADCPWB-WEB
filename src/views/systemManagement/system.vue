<template>
  <div class="system">
    <toph v-bind:active="active"
          class="nav"></toph>
    <div class="main">
      <el-breadcrumb separator="/"
                     style="margin-top:12px;">
        <el-breadcrumb-item :to="{ path: '/system' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>数据导出</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="search-box">
        <el-form :inline="true"
                 :model="formData"
                 class="form-box">
          <el-form-item label="车辆VIN">
            <v-selectpage :data="filters.carNOptions"
                          v-model="formData.carVIN"
                          sort="name"
                          placeholder='请选择一个车型'>
            </v-selectpage>
            <!-- <el-input v-model="formData.carVIN"
                      placeholder="请输入"
                      size="mini"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="timeData"
                            type="daterange"
                            range-separator="至"
                            value-format="yyyy-MM-dd"
                            @change="dateChangebirthday"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="handleSearch"
                       size="mini">搜索</el-button>
            <el-button @click="handleReset"
                       size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="listCon">
        <div class="btns">
<!--          <div class="dcBtn imtBtn"-->
<!--               @click="handleimt()"><img src="../../assets/images/battery/import1.png"-->
<!--                 alt="" />导入</div>-->
          <div class="dcBtn"
               @click="handleEditC()"><img src="../../assets/images/battery/exict.png"
                 alt="" />导出</div>
        </div>
        <div class="tabs">
          <table>
            <thead>
              <tr>
                <th style="width:100px;">车辆VIN</th>
                <th>
                  <p>总电压</p>
                  <p>（v）</p>
                </th>
                <th>
                  <p>总电流</p>
                  <p>（A）</p>
                </th>
                <th>SOC（%）</th>
                <th>
                  <p>绝缘电阻</p>
                  <p>（kΩ）</p>
                </th>
                <th>
                  <p>车速</p>
                  <p>（km/h）</p>
                </th>
                <th>
                  <p>行驶里程</p>
                  <p>
                    （km）</p>
                </th>
                <th>
                  <p>最高单体</p>
                  <p>
                    电压（V）</p>
                </th>
                <th>
                  <p>最低单体</p>
                  <p>
                    电压（V）</p>
                </th>
                <th>
                  <p>最高探针</p>
                  <p> 温度（℃）</p>
                </th>
                <!-- <th>
                  <p>最低探针</p>
                  <p> 温度（℃）</p>
                </th> -->
                <th>
                  <p>最高电压</p>
                  <p> 单体编号</p>
                </th>
                <th>
                  <p>最低电压</p>
                  <p> 单体编号</p>
                </th>
                <th>
                  <p>最高温度</p>
                  <p> 探针编号</p>
                </th>
                <th>
                  <p>最低温度</p>
                  <p> 探针编号</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr, trIdx) in tableData.tbody"
                  :key="trIdx">
                <td v-for="(td,tdIdx) in tr"
                    :key="tdIdx">{{td}}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagingtion-box"
               style="display: flex; justify-content: flex-end;padding: 20px 0 13px 0;">
            <el-pagination @size-change="handleSizeChange1"
                           @current-change="handleCurrentChange1"
                           :current-page="currentPage1"
                           :page-sizes="[5, 10, 20, 30]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
            <el-button size="small"
                       type="primary"
                       style="margin-left: 20px;"
                       @click="handleCurrentChange1">确定</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- daochu -->
    <el-dialog customClass="customWidth2"
               :title="titleMap[dialogStatus]"
               :visible.sync="FormVisibledc"
               :close-on-click-modal="false"
               class="edit-form"
               :before-close="handleClose">
      <el-form :model="Form"
               label-width="120px"
               ref="Form">
        <!-- 导出 -->
        <el-form-item label="保存路径"
                      v-if="dialogStatus == 'daochuImport'">
          <div style=" float:left; margin-right:10px;">
            <el-input type="text"
                      v-model="Form.filename"
                      id="textfield"></el-input>
          </div>
          <div class="choseBtn">选择
            <input type="file"
                   name="file"
                   id="fileField"
                   class="choseBtnold"
                   onchange="document.getElementById('textfield').value=document.getElementById('fileField').value">
            <!--  onchange="document.getElementById('textfield').value=document.getElementById('fileField').value" -->
          </div>
        </el-form-item>

        <el-form-item label="保存类型"
                      v-if="dialogStatus == 'daochuEquipment'"
                      class="Equipment">
          <el-radio v-model=" radio"
                    label="1">WORD文件</el-radio><br />
          <el-radio v-model="radio"
                    label="2">PDF文件</el-radio>
        </el-form-item>
      </el-form>
      <!-- <div class="line" v-if="dialogStatus == 'daochuEquipment'"></div> -->
      <div slot="footer"
           class="dialog-footer">
        <el-button v-if="DcBtnshow"
                   style="height:32px;padding: 6px 18px;"
                   type="primary"
                   @click.native="confirmEdit('Form')">确定</el-button>
        <el-button v-else
                   type="primary"
                   style="height:32px;padding: 6px 18px;"
                   @click.native="handleCancel('Form')">确定</el-button>
        <!--  -->
        <el-button @click.native="handleCancel('Form')"
                   style="height:32px;padding: 6px 18px;">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import toph from "@/components/top";
import _url from "@/api/arrayRemove";
import { SelectPage } from 'v-selectpage'
import { getVehiclesListViN } from "@/api/pack"
import { getPage } from "@/api/system"



export default {
  data () {
    return {
      // 新增数据（C）
      timeData: '',
      // --------end--------------
      filters: {
        carNOptions: [
          {
            value: "1",
            label: "LGJE13EA1112",
          }]
      },
      active: 5,
      activeName: "0",
      formData: {
        carNumber: "",
        carVIN: ""
      },
      total: 0,
      currentPage1: 1,
      pageSize: 5,
      type: 0,
      tableData: {
        tbody: [
          // ["WBAZV4109BL817920", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
          // ["WBAZV4109BL817921", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
          // ["WBAZV4109BL817922", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
          // ["WBAZV4109BL817923", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
          // ["WBAZV4109BL817924", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
        ]
      },
      FormVisibledc: false,
      dialogStatus: "",
      Form: {
        id: 0,
        name: '',
        carN: '',
        carnumber: '',
        types: '',
        fxDj: '',
        yjtype: '',
        sxms: '',
        yjState: '',
      },
      radio: '1',
      // 导出导入
      titleMap: {
        daochuEquipment: "导出",
        daochuImport: "导入"
      },
      DcBtnshow: "",
    };
  },
  components: {
    toph,
    SelectPage
  },
  created () {
    this.init()
    this.listData()
  },
  methods: {
    // 测试区域

    // -----------end---------------
    //------------------- 新增代码（C)--------------
    // 时间格式转化
    dateChangebirthday (val) {
      this.value1 = val;
    },
    // 列表初始化
    listData (vin = '', pageNo = 1, pageSize = 100, endDateStr = '2020-09-29 21:54:46', startDateStr = '2020-09-29 01:54:46') {
      let param = {
        //  createEnt: sessionStorage.getItem('userInfo')//正式
        createEnt: "GHVRTMA9H2",//测试
        pageNo: pageNo,
        pageSize: pageSize,
        endDateStr: endDateStr,
        startDateStr: startDateStr,
        vin: vin
      }
      let _this = this
      getPage(param).then(res => {
        let arr = res.data.data
        this.total = res.data.data.count
        let tbody = []
        arr.list.forEach(function(e) {
          // let data = [e.vin, e.totalVoltage, e.totalCurrent, e.soc, e.resistance, e.speed, e.odo, e.maxCellVoltage, e.minCellVoltage, e.maxProbeTemperature, e.maxCellVoltageNum, e.minCellVoltageNum, maxProbeTemperatureNum, e.minProbeTemperatureNum]
          // tbody.push(data)
          let data = [e.vin, e.totalVoltage, e.totalCurrent, e.soc, e.resistance, e.speed, e.odo, e.maxCellVoltage, e.minCellVoltage, e.maxProbeTemperature, e.maxCellVoltageNum, e.minCellVoltageNum, e.maxProbeTemperatureNum, e.minProbeTemperatureNum]
          tbody.push(data)
        })
        _this.tableData.tbody = tbody
      }).catch(e => {
        this.$message.error('导出列表异常');
      });
    },
    // 搜索
    handleSearch () {
      this.listData(this.formData.carVIN, this.pageNo, this.pageSize, this.timeData[0], this.timeData[1])
    },
    init () {
      let params = {
        //  orgId: sessionStorage.getItem('userInfo')//正式
        orgId: 'CLEYQP8C27',//测试
        // vehicleType: '车型1'
      }
      // 获取所有车型vin
      getVehiclesListViN(params).then(res => {
        this.filters.carNOptions = []
        let _this = this
        res.data.data.forEach(function(e) {
          for (var key in e) {
            let data = {
              id: e.vin,
              name: e.vin
            }
            _this.filters.carNOptions.push(data)
          }
        })
      })
    },
    // 重置
    handleReset () {
      this.formData.carVIN = ''
      this.listData()
    },
    // 页数
    handleCurrentChange1 (val) {
      this.listData('', val)
    },
    // 条数
    handleSizeChange1 (val) {
      this.listData('', 1, val)
    },

    // ---------end-------------------------------------------------
    confirmEdit (e) {

      this.FormVisibledc = false;
      window.open(_url);
      setTimeout(function() {
      }, 100)
    },

    // handleReset () {
    //   this.formData.carVIN = ''
    //   // this.formData = {
    //   //   carType: "",
    //   //   carNumber: "",
    //   //   carVIN: ""
    //   // };
    //   this.tableData.tbody = [
    //     ["WBAZV4109BL817920", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //     ["WBAZV4109BL817921", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //     ["WBAZV4109BL817922", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //     ["WBAZV4109BL817923", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //     ["WBAZV4109BL817924", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //   ]
    // },
    // handleCurrentChange1 (val) {
    //   if (val == 1) {
    //     this.tableData.tbody = [
    //       ["WBAZV4109BL817920", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817921", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817922", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817923", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817924", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //     ];
    //   } else if (val == 2) {
    //     this.tableData.tbody = [
    //       ["WBAZV4109BL817920", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //     ];
    //   }
    // },
    // handleSizeChange1 (val) {
    //   if (val == 5) {
    //     this.tableData.tbody = [
    //       ["WBAZV4109BL817920", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817921", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817922", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817923", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817924", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //     ];
    //   } else {
    //     this.tableData.tbody = [
    //       ["WBAZV4109BL817920", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817921", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817922", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817923", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817924", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //       ["WBAZV4109BL817924", 360.1, 13.2, 45, 50000, 53, 794, 3.756, 3.649, 30, "150", "150", "150", "150"],
    //     ];
    //   }
    // },
    //导出
    handleEditC: function(index, row) {
      //  document.getElementById('textfield').value=" ";
      this.FormVisibledc = true;
      this.dialogStatus = "daochuEquipment"
      this.DcBtnshow = true
    },
    //导入
    handleimt: function(index, row) {
      this.FormVisibledc = true;
      // this.Form = Object.assign({}, row);
      // _index = index;

      this.dialogStatus = "daochuImport"
      this.DcBtnshow = false;
    },
    //点击关闭dialog
    handleClose (done) {
      this.FormVisibledc = false;
      setTimeout(function() {
        // document.getElementById('textfield').value = ""
      }, 100)
    },
    //点击取消
    handleCancel (formName) {
      this.FormVisibledc = false;
      setTimeout(function() {
        // document.getElementById('textfield').value = ""
      }, 100)
    },
  },


};
</script>
<style lang="less" scoped>
// --------------控件样式--------------
/deep/div.v-selectpage div.sp-input-container div.sp-base {
  height: 32px;
}
/deep/div.v-selectpage div.sp-input-container span.sp-placeholder {
  color: #c0c4cc;
}
/deep/div.v-dropdown-caller.v-dropdown-caller--full-width {
  display: inherit;
  width: 193px;
}
/deep/.el-select__tags {
  flex-wrap: inherit;
  overflow: hidden;
}
// ------------end------------------
/deep/.el-range-editor .el-range-input {
  position: relative;
  top: -1px;
}
.system {
  background: #f4f7fc;
  /deep/.header {
    .content {
      .nav {
        > ul {
          .is-active {
            .el-submenu__title {
              color: #fff !important;
            }
          }
        }
      }
    }
  }
  .main {
    width: 98%;
    margin: 0 auto;
    overflow: hidden;
    height: 100vh;
    /deep/.el-breadcrumb__inner.is-link {
      font-weight: 700;
      text-decoration: none;
      -webkit-transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      color: rgba(141, 171, 196, 1) !important;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
    .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      font-weight: 400;
      color: rgba(43, 64, 91, 1);
      cursor: text;
    }
    .search-box {
      padding: 10px;
      padding-left: 28px;
      background: #fff;
      border-radius: 4px;
      margin: 16px 0 10px 0;
      form {
        > div {
          margin: 0;
          margin-right: 10px;
        }
      }
    }
    .listCon {
      margin: 20px auto;
      padding: 10px 15px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      .btns {
        width: 100%;
        margin: 0 auto;
        margin-bottom: 12px;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        .shBtn {
          width: 104px;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          background: rgba(35, 159, 255, 1);
          border-radius: 4px;
          display: flex;
          justify-content: flex-start;
          img {
            margin-top: 8px;
            display: block;
            margin-left: 12px;
            margin-right: 6px;
            width: 16px;
            height: 16px;
          }
        }
        .dcBtn {
          margin-left: 8px;
          width: 86px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(63, 83, 110, 1);
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(206, 223, 236, 1);
          border-radius: 4px;
          display: flex;
          justify-content: flex-start;
          img {
            margin-top: 8px;
            display: block;
            margin-left: 12px;
            margin-right: 6px;
            width: 16px;
            height: 16px;
          }
        }
        .imtBtn {
          background: #239fff;
          color: #fff;
          > img {
            margin-top: 4px;
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    .tabs {
      table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        thead {
          tr {
            background: rgba(250, 250, 250, 1);
            th {
              box-sizing: border-box;
              font-size: 14px;
              //font-family:PingFangSC-Medium,PingFang SC;
              // font-weight:500;
              color: rgba(119, 145, 167, 1);
              border-bottom: 1px solid rgba(229, 238, 245, 1);
              > p:first-child {
                margin-bottom: 0;
              }
              > p:nth-child(2) {
                margin-top: 3px;
              }
            }
          }
        }
        tbody {
          tr {
            background-color: #fff;
            td {
              box-sizing: border-box;
              font-size: 14px;
              //font-family:PingFangSC-Medium,PingFang SC;
              font-weight: 500;
              color: rgba(119, 145, 167, 1);
              padding: 10px;
              border-bottom: 1px solid rgba(229, 238, 245, 1);
              text-align: center;
              &:first-child {
                width: 90px;
                word-break: break-all;
              }
            }
          }
          tr:hover {
            background-color: #f5f7fa;
            > td {
              transition: background-color 0.25s ease;
              background-color: #f5f7fa;
            }
            > td:first-child {
              border-left: 2px solid transparent;
              //  border-left: 2px solid #0093EE !important;
            }
          }
        }
      }
    }
  }
  .pagingtion-box {
    position: relative;
  }
  /deep/.pagingtion-box .el-pagination__total {
    position: absolute;
    left: 0;
  }
  /deep/.pagingtion-box .el-pagination__sizes {
    position: absolute;
    left: 67px;
  }
  /deep/.pagingtion-box .el-pagination__total {
    font-size: 14px;
    color: #606266;
  }
  /deep/.pagingtion-box .el-input__inner {
    font-size: 14px;
    color: #606266;
  }
  /deep/.pagingtion-box .el-pager .number {
    font-size: 14px;
    color: #303133;
  }
  /deep/.pagingtion-box .el-pager .active {
    color: #409eff;
  }

  //  导出css 复制过来的
  .el-form-item {
    margin-bottom: 0px;
  }
  /deep/.el-form-item__content {
    line-height: 32px;
    position: relative;
    font-size: 14px;
  }
  /deep/.el-form-item__label {
    text-align: left;
    vertical-align: bottom;
    float: left;
    font-size: 14px;
    color: #606266;
    height: 30px;
    line-height: 30px !important;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 70px !important;
  }
  /deep/.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }

  /deep/.el-dialog__header {
    padding: 20px 20px 10px;
    background: rgba(250, 251, 252, 1);
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
    border-radius: 8px 8px 0px 0px;
  }
  .tcCon {
    width: 100%;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    /deep/.el-input__inner {
      border: 1px solid transparent !important;
      font-size: 14px;
      color: rgba(62, 82, 111, 1);
      font-weight: 400;
    }
  }
  /deep/.el-form-item__label {
    text-align: left;
    font-size: 14px;
    color: rgba(62, 82, 111, 1);
    // font-weight: bold;
  }
  .line {
    margin: 20px auto;
    border-bottom: 1px solid rgba(229, 238, 245, 1);
  }
  /deep/.el-textarea__inner {
    font-size: 14px;
    color: rgba(62, 82, 111, 1);
    font-weight: 400;
    padding: 5px 15px 5px 10px;
  }
  /deep/.el-radio {
    color: rgba(62, 82, 111, 1);
  }
  /deep/.el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: rgba(62, 82, 111, 1);
    font-weight: bold;
  }
  .choseBtnold {
    position: absolute;
    z-index: 10;
    opacity: 0;
    right: 0;
    width: 65px;
    height: 42px;
  }
  .choseBtn {
    float: left;
    width: 65px;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    text-align: center;
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(221, 221, 221, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    cursor: pointer;
    position: relative;
  }
  /deep/.el-table {
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    font-size: 14px;
    color: #3f536e;
  }
  /deep/.el-table thead {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #7791a7;
    font-weight: 500;
  }
  /deep/.el-table td,
  .el-table th {
    padding: 12px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: center;
  }
  /deep/.el-table__body tr > td:first-child {
    border-left: 2px solid transparent;
  }
  /deep/.el-table--enable-row-hover .el-table__body tr:hover > td:first-child {
    border-left: 2px solid #0093ee;
  }
  /deep/.el-table th > .cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    text-align: center;
    width: 100%;
  }
  .pagingtion-box {
    position: relative;
  }
  /deep/.pagingtion-box .el-pagination__total {
    position: absolute;
    left: 0;
  }
  /deep/.pagingtion-box .el-pagination__sizes {
    position: absolute;
    left: 67px;
  }
  /deep/.pagingtion-box .el-pagination__total {
    font-size: 14px;
    color: #606266;
  }
  /deep/.pagingtion-box .el-input__inner {
    font-size: 14px;
    color: #606266;
  }
  /deep/.pagingtion-box .el-pager .number {
    font-size: 14px;
    color: #303133;
  }
  /deep/.pagingtion-box .el-pager .active {
    color: #409eff;
  }
  /deep/.header.nav .content .el-menu--horizontal > .el-menu-item.is-active {
    color: #fff !important;
  }
  /deep/.el-message-box__header {
    position: relative;
    padding: 15px 15px 10px;
    height: 29px;
    background: rgba(250, 251, 252, 1);
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
  }
  /deep/.el-form--inline .el-form-item {
    display: inline-block;
    margin-right: 28px;
    vertical-align: top;
  }
  /deep/.el-dialog__footer {
    border-top: 1px solid rgba(238, 238, 238, 1);
    padding: 10px 20px 10px;
    text-align: right;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  /deep/.el-checkbox__input {
    cursor: pointer;
    outline: 0;
    line-height: 0;
    vertical-align: middle;
  }
}
/deep/.customWidth2 {
  width: 480px;
  .el-form-item__content {
    margin-left: 70px !important;
    #textfield {
      width: 285px;
    }
  }
  .Equipment {
    .el-form-item__content {
      position: relative;
      top: -2px;
    }
  }
}
/deep/.el-form-item::after,
.el-form-item::before {
  display: inline !important;
}

/deep/.el-form-item::after,
.el-form-item::before {
  display: inline !important;
}
/deep/.el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}
/deep/.el-form-item__content::after,
.el-form-item__content::before {
  display: inline !important;
}
</style>
