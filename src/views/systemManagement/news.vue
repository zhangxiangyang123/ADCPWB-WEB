<template>
  <div class="news">
    <toph v-bind:active="active"
          class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/"
                     style="margin-top:12px;">
        <el-breadcrumb-item :to="{ path: '/journal' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>用户消息推送</a></el-breadcrumb-item>
      </el-breadcrumb>

      <div class="search-box">
        <div class="messagePush">
          <span>用户消息推送</span>
          <el-button @click="handleEdit('新增')"
                     size="small"
                     class="el-icon-pluss"
                     type="primary"><i class="el-icon-plus"></i>新增</el-button>
        </div>
        <el-form :inline="true"
                 :model="formData"
                 class="form-box">
          <!-- ------------------------------- -->
          <!-- 模糊搜索 -->
          <el-form-item label="企业名称">
            <el-input v-model="formData.carVIN"
                      placeholder="请输入"
                      maxlength='10'
                      size="small"></el-input>
          </el-form-item>
          <!-- ------------------------------- -->
          <el-form-item label="风险等级">
            <el-select v-model="value"
                       placeholder="请选择">
              <el-option v-for="(item,inidex) in options"
                         :key="inidex"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>

            <el-button type="primary"
                       @click="handleSearch"
                       size="small">搜索</el-button>
            <el-button @click="handleReset"
                       size="small">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="listCon">
        <div class="tabs">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>企业名称</th>
                <th>等级</th>
                <th>推送客户</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr, trIdx) in data"
                  :key="trIdx"
                  ref="mytr">
                <td v-if="tr !=undefined"> {{trIdx+1}} </td>
                <td v-for="(td, tdIdx) in tr"
                    :key="tdIdx"
                    ref="name"
                    class="beyondHidings"
                    v-if="tdIdx!=='id'&&tdIdx!=='userName'">
                  <span class="beyondHiding">
                    {{td}}</span></td>
                <td class="operate"
                    v-if="tr !=undefined">
                  <div class="cell">
                    <a @click="handleDec(trIdx)"
                       class="ckbtn">查看</a>
                    <span class="hrl">|</span>
                    <a @click="handleEdit(trIdx)"
                       class="ckbtn">编辑</a>
                    <span class="hrl">|</span>
                    <a @click="handleDel(trIdx)"
                       style="color: #F56C6C"
                       class="ckbtn">删除</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagingtion-box"
               style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
            <el-pagination @size-change="handleSizeChange1"
                           @current-change="handleCurrentChange1"
                           :current-page="currentPage1"
                           :page-sizes="sizes"
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
    <!-- 弹框 -->
    <!-- 添加推送用户 -->
    <el-dialog title="用户列表"
               :visible.sync="userPopUps"
               :close-on-click-modal="false"
               class="edit-form">
      <el-checkbox :indeterminate="isIndeterminate"
                   v-model="checkAll"
                   @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities"
                         @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(city,index) in cities"
                     :label="city"
                     :key="index"
                     :value="city.value">{{city.pushUser}}</el-checkbox>
      </el-checkbox-group>
      <hr class="marginTop">
      <div class="paddingLeft">
        <span v-for="(city,index) in checkedCities"
              class="userList"
              :label="city"
              :key="index">{{city.pushUser}}</span>
      </div>
      <el-button class="save"
                 @click="userPopUp"
                 type="primary">保存</el-button>
    </el-dialog>

    <!-- 编辑新增 -->
    <el-dialog :title="popUp"
               :visible.sync="FormVisibledc"
               :close-on-click-modal="false"
               class="edit-form"
               :before-close="handleClose">
      <el-form :model="Form"
               label-width="120px"
               ref="Form">
        <div class="edit">
          <div class="edit_cont">
            <ul>
              <li>
                <el-form-item class="el-formItem"
                              label="企业名称">
                  <el-select v-model="valueEntName"
                             placeholder="请选择">
                    <el-option v-for="(item,index) in enterpriseList"
                               :key="index"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <el-input v-model="valueEntName"
                            placeholder="请输入"
                            :disabled="disableds"
                            size="small"></el-input> -->
                </el-form-item>
                <p class="alertInformation"
                   v-show="alertInformation">企业名不能超过20字符</p>
              </li>
              <li>
                <el-form-item label="预警风险等级">
                  <el-select v-model="addData.riskPanks"
                             placeholder="请选择">
                    <el-option v-for="(item,index) in options"
                               :key="index"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </li>
              <li>
                <span class="pushTitle">推送用户</span>
                <ul class="paddingF">
                  <li class="userList"
                      v-for="(city,index) in checkedCities"
                      :label="city"
                      :key="index">{{city.pushUser}}</li>
                  <li>
                    <span><img @click="add(1)"
                           class='img'
                           src="../../assets/images/add.png"
                           alt=""></span>
                  </li>
                </ul>

              </li>
            </ul>
          </div>
        </div>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   v-show="popUp=='新增'"
                   @click="confirmAdds()">确定</el-button>
        <el-button type="primary"
                   v-show="popUp=='编辑'"
                   @click="confirmEdit()">确定</el-button>
        <!-- v-if="DcBtnshow" -->
        <el-button @click.native="handleCancel('Form')">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看"
               :visible.sync="addVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="formData"
               label-width="120px"
               ref="formData">
        <div class="tcCon">
          <ul>
            <li><span>推送用户</span><span v-for="(tr, trIdx) in formData.name"
                    :key="trIdx">{{tr}}</span></li>
            <li>
              <span>预警风险等级</span>
              <span style="padding-top: 3px;">
                <span>{{formData.value}}</span>
                <!-- <span v-if="formData.value==3">高风险</span> -->
              </span></li>
          </ul>
        </div>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="addVisible=false">确定</el-button>
        <!-- <el-button @click="addVisible=false">取消</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import toph from "@/components/top";
import { handleDelApi, getOrgList, allUser, editApi, addApi, deleteList } from "@/api/news"
import { Header } from 'element-ui';
var cityOptions = []
export default {
  data () {
    return {
      alertInformation: false,
      checkAll: false,
      sizes: [10, 20, 30],
      total: 0,
      index: '',
      pageNo: '1',
      currentPage1: 10,
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      userPopUps: false,
      // 新加数据
      popUp: '新增',
      disableds: false,
      // initData: [],
      data: [],
      addData: {
        entName: '企业名称1',
        riskPanks: '',
        user: '用户1,用户2'
      },
      valueEntName: '',
      // addDatas: this.addData.entName,
      options: [
        {
          value: '0',
          label: '低风险'
        }, {
          value: '1',
          label: '中风险'
        }, {
          value: '2',
          label: '高风险'
        }
      ],
      enterpriseList: [
        // {
        //   value: '0',
        //   label: '中汽'
        // }
      ],

      // -------------------------------
      // 无用数据
      // activeName: "0",
      // checkAll: false,
      // checkedCities: ['上海', '北京'],
      // cities: cityOptions,
      // isIndeterminate: true,
      // -----------
      value: '',
      active: 5,
      formData: {
        carType: "",
        carNumber: "",
        carVIN: "",
        name: "",
        value: "",
      },
      count: '',

      // pageSize: 5,
      // type: 0,

      FormVisibledc: false,
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
      edit: "",
      editData: {
        name: "",
        phone: "",
        vx: "",
        beizhu: ""
      },
      addVisible: false
    };
  },
  components: {
    toph
  },
  watch: {
    valueEntName: {
      handler (newVal, oldVal) {
        if (newVal.length > 20) {
          this.alertInformation = true
        } else {
          this.alertInformation = false
        }
      }
    }
  },
  created () {
    this.init(this.pageNo, this.currentPage1)
    this.getOrgListInit()
  },
  methods: {
    // 企业初始化
    getOrgListInit () {
      this.enterpriseList = []
      let params = {}
      getOrgList(params).then(res => {
        for (let j = 0; j < res.data.data.length; j++) {
          for (var key in res.data.data[j]) {
            let data = {
              value: key,
              label: res.data.data[j][key]
            }
            this.enterpriseList.push(data)
          }
          // let data = {
          //   value: res.data.data[j],
          //   label: res.data.data[j]
          // }
        }

      })
    },

    // ------end--------
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    // -----------------
    init (pageNo, currentPage1) {
      const params = {
        createEnt: "CLEYQP8C27",
        pageNo: pageNo,
        pageSize: currentPage1,
      }
      const paramss = {
        createEnt: "CLEYQP8C27",
      }
      handleDelApi(params).then(res => {
        const resData = res.data.data.list
        this.total = res.data.data.count
        this.count = res.data.data.count
        var datas = []
        var idData = []
        resData.forEach(function(e) {
          let riskRanks = ''
          if (e.riskRanks == '1') {
            riskRanks = '中风险'
          } else if (e.riskRanks == '2') {
            riskRanks = '高风险'
          } else {
            riskRanks = '低风险'
          }
          const a = {
            entName: e.entName,
            // riskRanks: e.riskPanks,
            riskRanks: riskRanks,
            pushUser: e.userName,
            userName: e.pushUser,
            id: e.id
          }

          datas.push(a)
        });
        this.data = datas


      })
      allUser(paramss).then(res => {
        res.data.data.forEach(function(e) {
          const a = {
            id: e.id,
            pushUser: e.userName
          }
          cityOptions.push(a)

        })
      })
    },
    // 删除
    handleDel (index) {
      this.$confirm('确定删除选定的选项', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$http.delete('/api/system/messagepushEnterprise/' + this.data[index].id).then(res => {
            this.init(this.pageNo, this.currentPage1)
          })
          this.$message({
            type: 'info',
            message: '删除成功'
          });
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '删除已取消'
              : '删除成功'
          })
        });
    },

    handleSearch () {
      const params = {
        createEnt: "CLEYQP8C27",
        entName: this.formData.carVIN,
        pageNo: '',
        pageSize: '',
        riskRanks: this.value,
      }
      handleDelApi(params).then(res => {
        const resData = res.data.data.list
        this.total = res.data.data.count
        var datas = []
        resData.forEach(function(e) {
          let riskRanks = ''
          if (e.riskRanks == '1') {
            riskRanks = '中风险'
          } else if (e.riskRanks == '2') {
            riskRanks = '高风险'
          } else {
            riskRanks = '低风险'
          }
          const a = {
            entName: e.entName,
            // riskRanks: e.riskPanks,
            riskRanks: riskRanks,
            pushUser: e.userName,
            id: e.id
          }
          datas.push(a)
        });
        this.data = datas
      })
    },
    handleReset () {
      this.formData.carVIN = '',
        this.value = ''
    },
    handleSizeChange1 (val) {
      this.currentPage1 = val
      this.init(this.pageNo, this.currentPage1)
    },
    handleCurrentChange1 (val) {
      this.pageNo = val
      this.init(this.pageNo, this.currentPage1)

    },
    //点击编辑
    handleEdit: function(index) {
      // index = 0
      if (index == "新增") {
        this.checkedCities = []
        this.valueEntName = ''
        this.addData.riskPanks = ''
        this.addData.user = ''
        this.disableds = false
      } else {
        this.index = index + 1
        this.checkedCities = []
        this.popUp = '编辑'
        this.valueEntName = this.data[index].entName
        this.addData.riskPanks = this.data[index].riskRanks
        if (this.data[index].pushUser) {
          this.checkedCities.push({
            pushUser: this.data[index].pushUser,
            id: this.data[index].userName
          })
        }
        this.disableds = true
      }
      this.FormVisibledc = true;
    },
    //点击关闭dialog
    handleClose (done) {
      this.FormVisibledc = false;
    },
    // 点击关闭新增推送用户
    userPopUp (done) {
      this.userPopUps = false;
    },
    //点击取消
    handleCancel (formName) {
      this.FormVisibledc = false;
      // this.addData.user = this.data[0].user
    },
    add (idex) {
      this.userPopUps = true
    },
    // 查看
    handleDec (index) {
      let data = this.data[index]
      this.formData.name = data.pushUser;
      this.formData.value = data.riskRanks;
      this.addVisible = true;
    },

    // 编辑函数
    Edit () {
      let riskPanks = this.addData.riskPanks
      let pushUser = ''
      let id = this.data[this.index - 1].id
      let data = this.checkedCities
      if (riskPanks == '低风险') {
        riskPanks = '0'
      } else if (riskPanks == '中风险') {
        riskPanks = '1'
      }
      else if (riskPanks == '高风险') {
        riskPanks = '2'
      } else {

      }

      for (let j = 0; j < data.length; j++) {
        pushUser += data[j].id += ','
      }
      pushUser = pushUser.substr(0, pushUser.length - 1);
      let params =
      {
        modifyUser: 'CLEYQP8C27',  //用id
        riskRanks: riskPanks,// 风险等级
        pushUser: pushUser, //用户id列表
        entId: this.valueEntName,//企业名称
        id: id,
      }
      this.$http.put('/api/system/messagepushEnterprise', params
      ).then(res =>
        this.FormVisibledc = false,
        this.init(this.pageNo, this.currentPage1)
        // this.handleSearch()
      )
      // 封装格式
      // editApi(params).then(res = {

      // })
    },
    Adds () {
      let params = {
        // entId: "CLEYQP8C27",
        // pushUser: "abc",
        modifyUser: "a",
        riskRanks: 0,
        id: this.count
      }
      addApi(params).then(res => { })
    },
    // 编辑确认
    confirmEdit () {
      this.Edit()
    },
    // 新增
    confirmAdds () {
      let data = this.checkedCities
      let pushUser = ''
      data.forEach(function(e) {        pushUser += e.id += ','
      })
      pushUser = pushUser.substr(0, pushUser.length - 1);
      let params = {
        // createEnt: sessionStorage.getItem('userInfo'),
        createEnt: 'CLEYQP8C27',  //用id
        createUser: ' 创建用户',  //用id

        riskRanks: this.addData.riskPanks,// 风险等级
        pushUser: pushUser, //用户id列表
        entId: this.valueEntName,//企业名称
      }
      addApi(params).then(res => {      this.FormVisibledc = false, this.init(this.pageNo, this.currentPage1)
      })
    }
  },
  successMessage (message) {
    this.$message({
      message: message + '成功',
      type: 'success'
    });
  },
};
</script>
<style lang="less" scoped>
/deep/.el-input__inner {
  height: 32px;
  width: 193px;
}
.el-icon-pluss {
  float: right;
  margin-top: 6px;
  margin-right: 14px;
}
.messagePush {
  height: 43px;
  line-height: 43px;
  border-bottom: 1px solid #ebeef5;
  padding-left: 20px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #303133;
}
.alertInformation {
  color: red;
  margin: 0;
}
/deep/.el-formItem .el-form-item__label {
  margin-right: 28px;
}
/deep/.el-checkbox-group .el-checkbox {
  width: 85px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 5px 12px;
  margin: 5px 21px;
}
.paddingLeft {
  padding-left: 18px;
}
.save {
  margin: 45px 0 0 530px;
}
.add > span > img {
  height: 28px;
  width: 40px;
}
.pushTitle {
  color: #606266;
  text-align: inherit;
  margin-right: 16px;
  width: 83px;
  line-height: 2;
  height: 40px;
}
.paddingF {
  padding-left: 0px;
  list-style: none;
  margin: 0 -4px 10px -6px;
  list-style: none;
  width: 400px;
}
.marginTop {
  margin-top: 25px;
  color: #dcdfe6;
}
.img {
  width: 35px;
}
.userList {
  font-size: 14px;
  color: #606266;
  line-height: 30px;
  border: 1px #dcdfe6 solid;
  padding: 0 8px;
  border-radius: 6px;
  display: inline-flex;
  margin: 3px 3px;
  width: 56px;
}
.beyondHiding {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: inherit;
  display: inline-block;
  line-height: 3;
}
.beyondHidings {
  text-overflow: ellipsis;
}
.beyondHidings :hover {
  white-space: inherit;
}

.news {
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
  > .content {
    width: 98%;
    margin: 0 auto;
    overflow: hidden;
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
    .form-box {
      height: 56px;
      line-height: 56px;
      margin-left: 14px;
    }
    .search-box {
      // padding: 10px;
      // padding-left: 28px;
      background: #fff;
      border-radius: 4px;
      margin: 16px 0 0px 0;
      form {
        > div {
          margin: 0;
          &:nth-child(2) {
            margin-left: 10px;
          }
        }
      }
    }
    .listCon {
      padding: 0 15px;
      background: rgba(255, 255, 255, 1);
      padding-bottom: 15px;
      margin-bottom: 10px;
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
                padding: 14px;
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
                height: 44px;
                border-bottom: 1px solid rgba(229, 238, 245, 1);
                text-align: center;
                &:first-child {
                  width: 90px;
                  word-break: break-all;
                }
              }
              .operate {
                .ckbtn {
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: rgba(0, 147, 238, 1);
                  cursor: pointer;
                }
                .hrl {
                  margin: 0 10px;
                  width: 1px;
                  height: 14px;
                  color: rgba(233, 233, 233, 1);
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
  }

  .pagingtion-box {
    position: relative;
    background: #fff;
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

  //   编辑页面

  /deep/.el-dialog {
    width: 640px;
    /deep/.el-dialog__header {
      background: rgba(250, 251, 252, 1);
      box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
      > span {
        font-size: 16px;
        font-weight: 500;
        color: rgba(43, 64, 91, 1);
      }
    }
    .el-dialog__body {
      padding: 25px 12px 24px 14px;
      .edit {
        .title {
          font-size: 14px;
          color: rgba(62, 82, 111, 1);
          display: flex;
          align-items: center;
          padding-left: 14px;
          > img {
            width: 18px;
            height: 16px;
          }
        }
        .edit_cont {
          > ul {
            padding: 0;
            padding: 10px;
            background: rgba(250, 251, 252, 1);
            margin-top: 15px;
            > li {
              list-style: none;
              display: flex;
              align-items: center;
              font-size: 14px;
              color: rgba(141, 171, 196, 1);
              .el-form-item {
                width: 360;
                display: flex;
                margin-bottom: 00px;
                label {
                  width: auto !important;
                }
                .el-form-item__content {
                  margin-left: 0px !important;
                  input {
                    width: 250px;
                    height: 32px;
                  }
                }
              }
              .add {
                cursor: pointer;
              }
              .beizhu {
                label {
                  width: 68px !important;
                  text-align: left;
                }
              }
            }
          }
        }
      }
    }
  }
}
// 查看
.tcCon {
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      margin-bottom: 13px;
      > span:first-child {
        display: inline-block;
        min-width: 84px;
        margin-right: 30px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(62, 82, 111, 1);
      }
    }
  }
}
/deep/.el-dialog__footer {
  border-top: 1px solid rgba(238, 238, 238, 1);
  padding: 10px 20px 10px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
