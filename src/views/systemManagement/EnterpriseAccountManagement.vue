<template>
  <div class="news">
    <toph v-bind:active="active"
          class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/"
                     style="margin-top:12px;">
        <el-breadcrumb-item :to="{ path: '/journal' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>企业账户管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="search-box">
        <el-form :inline="true"
                 :model="formData"
                 class="form-box">
          <el-form-item label="企业名称">
            <el-select v-model="value"
                       filterable
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
            <!-- <el-input v-model="formData.carVIN"
                      placeholder="请输入"
                      maxlength='10'
                      size="small"></el-input> -->
          </el-form-item>
          <el-form-item label="用户名称">
            <el-select v-model="userNameListValue"
                       filterable
                       placeholder="请选择">
              <el-option v-for="item in userNameList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.label">
              </el-option>
            </el-select>
            <!-- <el-select v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item>
            <el-button @click="handleEdit('新增')"
                       size="small"
                       type="primary"><i class="el-icon-plus"></i>新增</el-button>
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
                <th>企业管理员</th>
                <th>管理员电话</th>
                <th>企业名称</th>
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
                    v-if="tdIdx!=='id'"
                    class="beyondHidings">
                  <span class="beyondHiding">{{td}}</span></td>
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
    <!-- <el-dialog title="用户列表"
               :visible.sync="userPopUps"
               :close-on-click-modal="false"
               class="edit-form">
      <el-checkbox :indeterminate="isIndeterminate"
                   v-model="checkAll"
                   @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities"
                         @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities"
                     :label="city"
                     :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <hr class="marginTop">
      <div class="paddingLeft">
        <span v-for="city in checkedCities"
              class="userList"
              :label="city"
              :key="city">{{city}}</span>
      </div>
      <el-button class="save"
                 @click="userPopUp"
                 type="primary">保存</el-button>
    </el-dialog> -->

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
                <!-- <ValidationProvider rules="secret"
                                    v-slot="{ errors }"> -->
                <el-form-item class="el-formItem"
                              label="企业名称">
                  <el-input v-model="valueEntName"
                            placeholder="请输入"
                            size="small"></el-input>
                  <!-- <span>{{ errors[0] }}</span> -->

                  <!-- <el-select v-model="addData.userName"
                             filterable
                             placeholder="请选择">
                    <el-option v-for="item in userNameList"
                               :key="item.value"
                               :label="item.label"
                               :value="item.label">
                    </el-option>
                  </el-select> -->
                </el-form-item>
                <!-- </ValidationProvider> -->
                <p class="alertInformation"
                   v-if="alertInformation">企业名称不能超过30字符</p>
                <p class="alertInformation"
                   v-if="alertInformations">企业名称不能为空</p>
                <!-- <el-form-item label="用户姓名">
                  <el-select v-model="addData.riskPanks"
                             placeholder="请选择">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item> -->
              </li>
              <!-- <li>
                <span class="pushTitle">推送用户</span>
                <ul class="paddingF">
                  <li class="userList"
                      v-for="city in checkedCities"
                      :label="city"
                      :key="city">{{city}}</li>

                  <li>
                    <span><img @click="add(1)"
                           class='img'
                           src="../../assets/images/add.png"
                           alt=""></span>
                  </li>
                </ul>

              </li> -->
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
            <li><span>用户姓名</span><span v-for="(tr, trIdx) in formData.name"
                    :key="trIdx">{{tr}}</span></li>
            <li>
              <span>电话号码</span>
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
import { handleDelApi, editApi, addApi, deleteList } from "@/api/newsUser"
import { Header } from 'element-ui';
const cityOptions = ['张三张三', '李四', '李无', '王二', '王小二', '李四1', '李四2', '李四3', '李四4', '李四5', '李四6', '李四7']
export default {
  data () {
    return {
      valueEntName: '',
      alertInformation: false,
      alertInformations: false,

      checkAll: false,
      sizes: [10, 20, 30],
      total: 0,
      index: '',
      pageNo: 1,
      // pageSize: '2',
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
        telephone: '',
        userName: ''
      },
      options: [],
      value: '',

      userNameList: [],
      userNameListValue: '',
      active: 5,
      formData: {
        carType: "",
        carNumber: "",
        carVIN: "",
        name: "",
        value: "",
      },
      count: '',
      pageSize: 5,
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
  watch: {
    valueEntName: {
      handler (newVal, oldVal) {
        // console.log('1==', newVal.length)
        // console.log('newVal, oldVal===', newVal, oldVal)
        if (newVal.length == 0) {
          this.alertInformations = true
        } else {
          this.alertInformations = false
        }
        if (newVal.length > 30) {
          this.alertInformation = true
        } else {
          this.alertInformation = false
        }
      }
    }
  },
  components: {
    toph
  },
  created () {
    this.init(this.pageNo, this.currentPage1)
  },
  methods: {
    // -----------------
    init (pageNo, currentPage1) {
      const params = {
        createEnt: "CLEYQP8C27",
        pageNo: pageNo,
        pageSize: currentPage1,
      }
      handleDelApi(params).then(res => {
        const resData = res.data.data.list
        this.total = res.data.data.count
        this.count = res.data.data.count
        var datas = []
        resData.forEach(function(e) {
          const a = {
            userName: e.userName,
            telephone: e.telephone,
            entName: e.entName,
            id: e.id
          }
          datas.push(a)
        });
        this.data = datas
      })
      handleDelApi({
        createEnt: "CLEYQP8C27",
        pageNo: '',
        pageSize: '',
      }).then(res => {
        const resData = res.data.data.list
        var entNameList = []
        var userNameList = []

        resData.forEach(function(e, index) {
          const entName = {
            value: index + 1,
            label: e.entName
          }
          const userName = {
            value: index + 1,
            label: e.userName
          }
          entNameList.push(entName)
          userNameList.push(userName)

        });
        this.options = entNameList
        this.userNameList = userNameList


      })
    },
    handleDel (index) {      this.$confirm('确定删除选定的选项', '删除', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(() => {
        this.$http.delete('/api/system/messagepushUser/' + this.data[index].id).then(res => {
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
    // 删除
    handleSearch () {
      const params = {
        createEnt: "CLEYQP8C27",
        entName: this.value,
        userName: this.userNameListValue,
        pageNo: this.pageNo,
        pageSize: this.currentPage1,
      }
      handleDelApi(params).then(res => {
        const resData = res.data.data.list
        this.total = res.data.data.count
        var datas = []
        resData.forEach(function(e) {
          const a = {
            userName: e.userName,
            telephone: e.telephone,
            entName: e.entName,
          }
          datas.push(a)
        });
        this.data = datas
      })
    },
    handleReset () {
      this.userNameListValue = '',
        this.value = ''
    },
    handleSizeChange1 (val) {
      this.currentPage1 = val
      this.init(this.pageNo, this.currentPage1)
    },
    handleCurrentChange1 (val) {
      this.init(val, this.currentPage1)
    },
    //点击编辑
    handleEdit: function(index) {
      if (index == "新增") {
        this.addData.telephone = ''
        this.valueEntName = ''
        // this.addData.user = ''
        // this.disableds = false
      } else {
        this.index = index + 1
        // this.checkedCities = []
        this.popUp = '编辑'
        this.addData.telephone = this.data[index].telephone
        this.valueEntName = this.data[index].entName
        console.log('this.data==', this.data)
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
    // cut (idex) {
    //   this.state = 0;
    // },
    add (idex) {
      this.userPopUps = true
    },
    // 查看
    handleDec (index) {
      let data = this.data[index]
      this.formData.name = data.userName;
      this.formData.value = data.telephone;
      this.addVisible = true;
    },
    // 编辑函数
    Edit () {
      if (this.alertInformation) {
      } else {
        let id = this.data[this.index - 1].id
        let params = {
          entName: "CLEYQP8C27",
          entId: "CLEYQP8C27",
          modifyUser: "abc",
          telephone: this.addData.telephone,
          userName: this.valueEntName,
          id: id
        }
        var $this = this
        this.$http.put('/api/system/messagepushUser', params
          // headers: {
          //   'Content-Type': 'application/json;charset=UTF-8'
          // },
        ).then(res => {
          $this.FormVisibledc = false,
            this.init(this.pageNo, this.currentPage1)
        })
        // 封装格式
        // editApi(params).then(res = {
        // })
      }    },
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
    confirmAdds () {
      if (this.alertInformation) {
      } else {
        let params = {
          createEnt: "CLEYQP8C27",
          entId: "CLEYQP8C27",
          createUser: "创建用户",
          modifyUser: "abc",
          // pushUser: "2,2,1", //用户id列表
          // riskRanks: 0,// 风险等级
          // entName: "CLEYQP8C27",
          telephone: this.addData.telephone,
          userName: this.valueEntName,
        }
        addApi(params).then(res => {        this.FormVisibledc = false,
          this.init(this.pageNo, this.currentPage1)        })
      }    }
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
.alertInformation {
  color: red;
  margin: 0 0;
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
// .beyondHiding {
//   width: 200px;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: inherit;
//   display: inline-block;
//   line-height: 3;
// }
// .beyondHidings {
//   text-overflow: ellipsis;
// }
// .beyondHiding :hover {
//   white-space: inherit;
// }

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
    .search-box {
      padding: 10px;
      padding-left: 28px;
      background: #fff;
      border-radius: 4px;
      margin: 16px 0 10px 0;
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
                width: 296px;
                display: flex;
                margin-bottom: 00px;
                label {
                  width: auto !important;
                }
                .el-form-item__content {
                  margin-left: 0px !important;
                  input {
                    width: 200px;
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