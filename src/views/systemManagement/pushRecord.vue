<template>
  <div class="news">
    <toph v-bind:active="active"
          class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/"
                     style="margin-top:12px;">
        <el-breadcrumb-item :to="{ path: '/journal' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>历史推送记录</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="listCon">
        <div class="tabs">
          <table>
            <thead>
              <tr>
                <th>车型</th>
                <th>VIN码</th>
                <th>预警类型</th>
                <th>信息推送时间</th>
                <th>推送人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr, trIdx) in data"
                  :key="trIdx"
                  ref="mytr">
                <td v-for="(td, tdIdx) in tr"
                    :key="tdIdx"
                    ref="name"
                    class="beyondHidings"
                    v-if="tdIdx!=='id'">
                  <span class="beyondHiding">{{td}}</span></td>
                <td class="operate"
                    v-if="tr !=undefined">
                  <div class="cell">
                    <a @click="handleDec(trIdx)"
                       class="ckbtn">查看</a>
                    <!-- <a @click="handleEdit(trIdx)"
                       class="ckbtn">编辑</a> -->
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

    <!-- 编辑新增 -->
    <el-dialog title="查看"
               :visible.sync="addVisible"
               :close-on-click-modal="false"
               class="edit-form">
      <el-form :model="formData"
               label-width="120px"
               ref="formData">
        <div class="tcCon">
          <ul>
            <!-- <li><span>用户姓名</span><span v-for="(tr, trIdx) in formData.name"
                    :key="trIdx">{{tr}}</span>
                    </li> -->
            <li>
              <span>推送时间</span>
              <span style="padding-top: 3px;">
                <span>{{formData.pushTime}}</span>
              </span></li>
            <li>
              <span>推送人</span>
              <span style="padding-top: 3px;">
                <span>{{formData.value}}</span>
                <span class="marginLeft">{{formData.telephone}}</span>

                <!-- <span v-if="formData.value==3">高风险</span> -->
              </span></li>
            <li>
              <span>推送内容</span>
              <span class='contentA'>
                {{content}}
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
import { handleDelApis, pushHistory, editApi, addApi, deleteList } from "@/api/newsUser"
import { Header } from 'element-ui';
const cityOptions = ['张三张三', '李四', '李无', '王二', '王小二', '李四1', '李四2', '李四3', '李四4', '李四5', '李四6', '李四7']
export default {
  data () {
    return {
      content: [],
      seeList: [],
      checkAll: false,
      sizes: [10, 20, 30],
      total: 0,
      index: '',
      pageNo: '1',
      // pageSize: '2',
      currentPage1: 1,
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
      // -------------------------------
      // 无用数据
      // activeName: "0",
      // checkAll: false,
      // checkedCities: ['上海', '北京'],
      // cities: cityOptions,
      // isIndeterminate: true,

      // -----------


      active: 5,
      formData: {
        carType: "",
        carNumber: "",
        carVIN: "",
        name: "",
        value: "",
        pushTime: ''
      },
      count: '',
      pageSize: 5,
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
  created () {
    this.init(this.pageNo, this.currentPage1)
  },
  methods: {
    // handleCheckAllChange (val) {
    //   this.checkedCities = val ? cityOptions : [];
    //   this.isIndeterminate = false;
    // },
    // handleCheckedCitiesChange (value) {
    //   let checkedCount = value.length;
    //   this.checkAll = checkedCount === this.cities.length;
    //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    // },
    // -----------------
    init (pageNo, currentPage1) {
      console.log('pageNo, pageSize===', pageNo, currentPage1)
      const params = {
        createEnt: "CLEYQP8C27",
        pageNo: pageNo,
        pageSize: currentPage1,
      }
      handleDelApis(params).then(res => {
        const resData = res.data.data.list
        this.total = res.data.data.count
        this.count = res.data.data.count
        this.seeList = res.data.data.list

        console.log('his.count = res==', this.seeList)
        var datas = []
        resData.forEach(function(e) {
          // let riskRanks = ''
          // if (e.riskRanks == '1') {
          //   riskRanks = '中风险'
          // } else if (e.riskRanks == '2') {
          //   riskRanks = '高风险'
          // } else {
          //   riskRanks = '低风险'
          // }
          const a = {
            // riskRanks: e.riskPanks,
            vehicleType: e.vehicleType,
            vin: e.vin,
            warningType: e.warningType,
            pushTime: e.pushTime,
            pushUser: e.userName,
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
        // this.$http.delete('/api/system/pushHistory/delete?type=0&id='+ this.data[index].id).then(res=>{})

        this.$http.delete('/api/system/pushHistory/delete/' + this.data[index].id + '?type=' + 0).then(res => {
          this.init(this.pageNo, this.currentPage1)
        })
        this.$message({
          type: 'info',
          message: '删除成功'
        });
      })
      .catch(action => {
        console.log('2');
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '删除已取消'
            : '删除成功'
        })
      });
    },

    // 删除
    handleDels (val) {
      // 删除方法已经返回的数据
      //       var arr = ['a','b','c','d'];
      // arr.splice(1,1);、
    },
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
        this.addData.userName = ''
        // this.addData.user = ''
        // this.disableds = false
      } else {
        this.index = index + 1
        // this.checkedCities = []
        this.popUp = '编辑'
        console.log('this.addData.telephone=', this.data)
        this.addData.telephone = this.data[index].telephone
        this.addData.userName = this.data[index].userName

      }
      console.log('this.addData.telephone=', this.addData.telephone)
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
      console.log('取消后==', this.data[0])
    },
    // cut (idex) {
    //   this.state = 0;
    // },
    add (idex) {
      this.userPopUps = true
    },
    // 查看
    handleDec (index) {
      // let params = this.data[index].id

      let data = this.seeList[index].essagepushUserList[0]
      console.log('data==', data)
      this.formData.pushTime = data.createTime
      this.formData.value = data.userName
      this.formData.telephone = data.telephone
      this.content = this.seeList[index].content
      console.log('this.formData.pushTime==', data.createTime)

      // pushHistory(params).then(res=>{
      // this.formData.pushTime=res.pushTime
      // })
      // this.$http.get('/api/system/pushHistory/'+params).then(res=>{})
      // this.formData.name = data.userName;
      // this.formData.value = data.telephone;
      this.addVisible = true;
    },

    // 编辑函数
    Edit () {
      let params = {
        entName: "CLEYQP8C27",
        modifyUser: "abc",
        telephone: this.addData.telephone,
        userName: this.addData.userName,
        id: this.index
      }
      var $this = this
      this.$http.put('/api/system/messagepushUser', params
        // headers: {
        //   'Content-Type': 'application/json;charset=UTF-8'
        // },
      ).then(res => {
        res.data
        // $this.FormVisibledc = false

      }
        // this.successMessage(编辑)
      )
      // 封装格式
      // editApi(params).then(res = {

      // })
    },
    Adds () {
      console.log('this.count==', this.count)
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
      let params = {
        createEnt: "CLEYQP8C27",
        createUser: "创建用户",
        entId: "CLEYQP8C27",
        pushUser: "2,2,1", //用户id列表
        riskRanks: 0,// 风险等级
      }
      addApi(params).then(res => { })
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
.contentA {
  padding-top: 3px;
  width: 350px;
  display: -webkit-inline-box;
}
.marginLeft {
  margin-left: 100px;
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