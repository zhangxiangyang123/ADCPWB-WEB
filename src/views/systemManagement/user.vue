<template>
  <div class="journal">
    <toph v-bind:active="active"
          class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/"
                     style="margin-top:12px;">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <!-- <el-breadcrumb-item :to="{ path: '/user' }">账户管理</el-breadcrumb-item> -->
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>用户管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索区begin -->
      <div class="handle-box">
        <div class="box">
          <el-col :span="24"
                  class="toolbar">
            <el-form :inline="true"
                     :model="filters"
                     ref="filters">
              <el-form-item prop="name"
                            label="姓名">
                <el-input v-model="filters.name"
                          placeholder="请输入"
                          size="mini"></el-input>
              </el-form-item>
              <el-form-item prop="role"
                            label="角色">
                <el-input v-model="filters.role"
                          placeholder="请选择"
                          size="mini"></el-input>
              </el-form-item>
              <el-form-item prop="state"
                            label="用户状态">
                <el-select v-model="filters.state"
                           placeholder="请选择"
                           clearable
                           size="mini">
                  <el-option v-for="item in filters.stateOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-right:8px;">
                <el-button type="primary"
                           @click="searchS(filters)"
                           size="mini">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="info"
                           class="rese"
                           size="mini"
                           @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </div>
      <div class="listCon">
        <!--按钮-->
        <div class="btns">
          <!-- @click="addVisible=true;dialogFormType='新增'" -->
          <div class="addBtn"
               @click="add()"><i class="el-icon-plus"></i>新增</div>
          <div class="delBtn"
               @click="FormVisibledel=true"><i class="el-icon-delete"></i>删除</div>
        </div>
        <!--表格数据及操作-->
        <el-table :data="users"
                  style="width: 100%;"
                  ref="multipleTable"
                  class="multipleTable"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="60">
          </el-table-column>
          <el-table-column type="index"
                           label="序号"
                           width="50">
          </el-table-column>
          <el-table-column prop="companyName"
                           label="企业名称"
                           width="120">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="120">
          </el-table-column>
          <el-table-column prop="role"
                           label="角色"
                           width="100">
          </el-table-column>
          <el-table-column prop="userId"
                           label="用户名"
                           min-width="50">

          </el-table-column>
          <el-table-column prop="telNumber"
                           label="联系方式"
                           min-width="100">
          </el-table-column>
          <el-table-column prop="lastLoginTime"
                           label="最后登录时间"
                           min-width="110">
          </el-table-column>
          <el-table-column prop="userState"
                           label="用户状态"
                           min-width="50">
            <template slot-scope="scope">{{ scope.row.userState?'启用':'禁用' }}</template>
          </el-table-column>
          <el-table-column label="操作"
                           width="240">
            <template slot-scope="scope">
              <a @click="handleDec(scope.$index, scope.row)"
                 class="ckbtn">查看</a>
              <span class="hrl">|</span>
              <a @click="handleEdit(scope.$index, scope.row)"
                 class="ckbtn">编辑</a>
              <span class="hrl">|</span>
              <template v-if="!scope.row.userState">
                <a @click="toggleState(scope.$index)"
                   class="ckbtn">启用</a>
                <span class="hrl">|</span>
                <a class="ckbtn forbidBtn disabled">禁用</a>
              </template>
              <template v-else>
                <a class="ckbtn disabled">启用</a>
                <span class="hrl">|</span>
                <a @click="toggleState(scope.$index)"
                   class="ckbtn forbidBtn">禁用</a>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagingtion-box"
             style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
          <el-pagination style="margin-top: 20px;  display: flex; justify-content: flex-end;"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="page"
                         :page-sizes="[5, 10, 15, 20]"
                         :page-size="limit"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
          <el-button size="small"
                     type="primary"
                     style="margin-left: 20px; margin-top: 20px;">确定</el-button>
        </div>
        <!-- 编辑 -->
        <el-dialog customClass="customWidth2"
                   :title="dialogFormType"
                   :visible.sync="addVisible"
                   :close-on-click-modal="false"
                   class="edit-form">
          <el-form :model="formData"
                   label-width="120px"
                   ref="formData">
            <div class="tcCon">
              <el-form-item label="姓名"
                            prop="name">
                <span v-if="dialogFormType=='查看'">{{formData.name}}</span>
                <el-input v-else
                          v-model="formData.name"
                          placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="角色">
                <span v-if="dialogFormType=='查看'">{{formData.role}}</span>
                <el-select v-else
                           v-model="formDataRole"
                           placeholder="请选择"
                           style="width:100%"
                           @change="change($event)">
                  <el-option v-for="(item,index) in roles"
                             :key="index"
                             :label="item.name"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户名">
                <span v-if="dialogFormType=='查看'">{{formData.userId}}</span>
                <el-input v-else
                          v-model="formData.userId"
                          placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="密码"
                            v-if="dialogFormType!='查看'">
                <el-input v-model="formData.pwd"
                          placeholder="请输入"
                          :disabled="dialogFormType=='detail'"
                          show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码"
                            v-if="dialogFormType!='查看'">
                <el-input v-model="formData.confirmPwd"
                          placeholder="请输入"
                          :disabled="dialogFormType=='detail'"
                          show-password></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <span v-if="dialogFormType=='查看'">{{formData.telNumber}}</span>
                <el-input v-else
                          v-model="formData.telNumber"
                          placeholder="请输入"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       v-if="dialogFormType!='查看'"
                       @click="confirm"
                       style="height:32px;padding: 6px 18px;">确定</el-button>
            <el-button @click="addVisible=false"
                       style="height:32px;padding: 6px 18px;">取消</el-button>
          </div>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog title="删除"
                   customClass="customWidth2"
                   :visible.sync="FormVisibledel"
                   :close-on-click-modal="false"
                   class="edit-form"
                   :before-close="handleClose">
          <div v-if="multipleSelection.length==0">请选择要删除的项</div>
          <div v-else>确定删除选中的选项</div>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="deleteFileOrDirectory('formData')"
                       style="height:32px;padding: 6px 18px;">确定</el-button>
            <el-button @click.native="FormVisibledel=false"
                       style="height:32px;padding: 6px 18px;">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import "@/api/arrayRemove";
import { dleUser, user, addUser, editUser } from "@/api/user.js"

var _index;
export default {
  data () {
    return {
      formDataRole: '',
      active: 5,
      activeName: "0",
      filters: {
        name: '',
        role: '',
        state: '',
        stateOptions: [{
          value: 'disabled',
          label: '禁用'
        }, {
          value: 'abled',
          label: '启用'
        }]
      },
      users: [],
      usersList: [],
      data: [],
      addVisible: false,
      FormVisibledel: false,
      multipleSelection: [],
      formData: {
        id: 0,
        name: '',
        role: '',
        roleName: '',
        userId: '',
        pwd: '',
        confirmPwd: '',
        telNumber: ''
      },
      dialogFormType: '',
      roles: [
        { name: '管理员', value: '管理员' },
        { name: '普通用户', value: '普通用户' }
      ],
      //分页
      limit: 5,
      total: null,
      page: 1
    };
  },
  components: {
    toph
  },
  methods: {
    init () {
      // 获取用户列表
      let params = {
        pageNo: '1',
        pageSize: '10'
      }
      user(params).then(res => {
        let arr = res.data.data.list
        for (let j = 0; j < arr.length; j++) {
          let roleData = ''
          let orgs = ''
          if (arr[j].orgs[0] == undefined) {
          } else {
            orgs = arr[j].orgs[0].name
          }
          arr[j].roles.forEach(function(e) {
            roleData += e.name + ','
          })
          roleData = roleData.substr(0, roleData.length - 1);
          let data = {
            id: arr[j].usid,
            companyName: orgs,
            name: arr[j].usname
            , role: roleData
            , userId: arr[j].account
            , telNumber: arr[j].cellPhoneNumber
            , lastLoginTime: arr[j].updateTime
            , userState: arr[j].userState,
            usid: arr[j].usid
          }
          this.users.push(data)
          this.usersList.push(data)


        }
        console.log('this.usersList==', this.usersList)
      })
      // ---------------------end-------------------
    },
    resetForm () {
      this.$refs.filters.resetFields();
      this.getList();
    },
    confirm () {
      // const userAuthentication = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,20}$/
      const userAuthentication = /^[A-Za-z0-9]{0,20}$/
      const passw = /^.{8,20}$/
      const phoneRegex = /^((\+86|\+86-)|(86|86-)|(0086|0086-))?(1\d{10})$/
      if (this.formData.name.length == 0) {
        this.$alert('姓名不能为空', '', {
          confirmButtonText: '确定',
        })
      }
      else if (this.formData.name.length > 10) {
        this.$alert('姓名不能超过10个字符', '', {
          confirmButtonText: '确定',
        })
      }
      else if (this.formData.userId.length == 0) {
        this.$alert('用户名不能为空', '', {
          confirmButtonText: '确定',
        })
      }
      // else if (!userAuthentication.test(this.formData.userId)) {
      //   this.$alert('用户名格式错误', '', {
      //     confirmButtonText: '确定',
      //   })
      // }
      // else if (!passw.test(this.formData.pwd)) {
      //   this.$alert('密码格式错误', '', {
      //     confirmButtonText: '确定',
      //   })
      // }
      // else if (!passw.test(this.formData.confirmPwd)) {
      //   this.$alert('确认密码格式错误', '', {
      //     confirmButtonText: '确定',
      //   })
      // }
      else if (this.formData.pwd != this.formData.confirmPwd) {
        this.$alert('两次密码录入不一致', '', {
          confirmButtonText: '确定',
        })
      }
      else if (!phoneRegex.test(this.formData.telNumber)) {
        this.$alert('手机号码格式错误', '', {
          confirmButtonText: '确定',
        })
      }
      else {
        if (this.dialogFormType == '新增') {
          let rolesName = [{
            name: this.formDataRole
          }]
          let params = {
            usid: sessionStorage.getItem('userInfo'),
            password: this.formData.pwd,//密码
            usname: this.formData.name,//姓名
            roles: rolesName,//角色
            account: this.formData.userId,//用户名
            cellPhoneNumber: this.formData.telNumber,//电话
            updateTime: '2019/6/6 14:20',
            userState: true
          }
          console.log('123', params)
          addUser(params).then(res => {
            let id = this.usersList[this.usersList.length - 1].id + 1;
            this.usersList.push({
              id: id,
              name: this.formData.name,
              role: this.formData.roleName,
              userId: this.formData.userId,
              telNumber: this.formData.telNumber,
              lastLoginTime: '2019/6/6 14:20',
              userState: true
            });
            this.formDataRole = ''
          })
          this.getList();
          this.addVisible = false;
        } else {
          var editdata = _index;
          let rolesName = [{
            name: this.formDataRole
          }]
          let params = {
            usid: this.users[editdata].usid,
            password: this.formData.pwd,//密码
            account: this.formData.userId,//用户名
            cellPhoneNumber: this.formData.telNumber,//电话
            usname: this.formData.name, // 姓名
            roles: rolesName // 角色名
          }
          this.$http.put('/api/sys/user', params).then(res => {
          })
        }
      }
    },

    //选中多选框实现自动加入待删除行对象的数组
    handleSelectionChange (val) {
      //下面这个表示选择的多选框都会被加到存放待删除行的行对象！
      this.multipleSelection = val;
      //当用户只要选择了任意个多选框，删除选中和取消选中按钮就会出现
      if (this.multipleSelection.length === 0) {
        //如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = false;
      }
    },
    change (value) {
      let roleName = this.roles.map(function(d, i) {
        if (d.value == value) {
          return d.name;
        }
      })
      this.formData.roleName = roleName;
    },
    // 切换启用禁用
    toggleState (index) {
      this.users[index].userState = !this.users[index].userState;
    },
    // 搜索过滤数据
    searchS ({ name, role, state }) {
      // this.users = []
      // this.init()
      this.page = 1
      let lists = this.usersList.filter(item => {
        let matchName = true;
        let matchRole = true;
        let matchState = true;
        if (name) {
          // 模糊搜索;
          let keys = name
            .toUpperCase() // 转大写
            .replace(' ', '') // 删掉空格
            .split(''); // 切割成 单个字
          matchName = keys.every(key => item.name.toUpperCase().includes(key));
        }
        if (role) {
          let keys = role
            .toUpperCase() // 转大写
            .replace(' ', '') // 删掉空格
            .split(''); // 切割成 单个字
          matchRole = keys.every(key => item.role.toUpperCase().includes(key));
          // matchRole = item.role == role;
        }
        if (state) {
          let _state = '';
          if (item.userState) {
            _state = 'abled';
          } else {
            _state = 'disabled';
          }
          matchState = _state == state;
        }
        return matchName && matchRole && matchState;
      });
      // lists = this.users
      console.log('lists===', lists)

      this.list = lists.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.users = this.list
      this.total = lists.length
    },
    pageList () {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = this.users;
      this.getList();
    },
    // 处理数据
    getList () {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.usersList;
      this.users = list.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      );
      this.total = list.length;
    },
    // 当每页数量改变
    handleSizeChange (val) {
      this.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getList();
    },
    //点击关闭dialog
    handleClose (done) {
      this.FormVisibledel = false;
    },
    handleDelete: function(index) {
      this.users.splice(index, 1);
      this.FormVisibledel = false;
    },
    // 全部删除
    deleteFileOrDirectory () {
      this.FormVisibledel = false;
      if (this.multipleSelection.length == 0) {
        return false;
      }
      console.log('this.multipleSelection==', this.multipleSelection)
      this.multipleSelection.forEach(item => {
        this.users.remove(item);
        this.$http.delete('/api/sys/user/' + item.usid).then(res => {
        })
      });
    },
    //点击查看
    handleDec: function(index, row) {
      this.addVisible = true;
      this.formData = Object.assign({}, row);
      this.dialogFormType = '查看';
    },
    //点击编辑
    handleEdit: function(index, row) {
      this.addVisible = true;
      this.formData = Object.assign({}, row);
      this.formDataRole = row.role
      _index = index;
      this.dialogFormType = '编辑';
      console.log('==', row)
    },
    add () {
      this.addVisible = true;
      this.dialogFormType = '新增';
      this.formData.name = "";
      this.formDataRole = "";
      this.formData.roleName = "";
      this.formData.userId = "";
      this.formData.pwd = "";
      this.formData.confirmPwd = "";
      this.formData.telNumber = "";

    }
  },
  created () {
    this.init();
    this.getList();
    this.pageList();
  },
  mounted () {

  },
};
</script>
<style lang="less" scoped>
.journal {
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
  }
}
.handle-box {
  width: 100%;
  height: 62px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  .box {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    padding: 10px 15px 0;
    overflow: hidden;
    span {
      display: block;
      float: left;
      width: 70px;
      text-align: right;
      margin-right: 8px;
      color: #3f536e;
    }
    /deep/.el-input__inner {
      height: 32px;
    }
    .rese {
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
    }
    .el-button {
      height: 32px;
    }
  }
}
/deep/.el-table__header {
  width: 100% !important;
}
/deep/.el-table__body {
  width: 100% !important;
}
.listCon {
  margin: 20px auto;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.btns {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 12px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  .delBtn,
  .addBtn {
    margin-left: 8px;
    width: 76px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(63, 83, 110, 1);
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(206, 223, 236, 1);
    border-radius: 4px;
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    img {
      margin-top: 8px;
      display: block;
      margin-left: 12px;
      margin-right: 6px;
      width: 16px;
      height: 16px;
    }
    i {
      line-height: inherit;
      margin: 0 7px 0 10px;
    }
  }
  .addBtn {
    color: #fff;
    background: #409eff;
  }
}
.multipleTable {
  /deep/td,
  /deep/th {
    text-align: center;
  }
  /deep/th,
  /deep/tr:nth-child(odd) {
    background: #fafafa;
  }
}
/deep/.el-dialog__header {
  padding: 10px 20px 10px;
  background: rgba(250, 251, 252, 1);
  box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
  border-radius: 8px 8px 0px 0px;
}
/deep/.el-dialog__headerbtn {
  position: absolute;
  top: 15px;
  right: 20px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 16px;
}
/deep/.el-form-item {
  margin-bottom: 10px;
}
.ckbtn {
  color: #409eff;
  padding: 0 5px;
  cursor: pointer;
  &.disabled {
    color: #c4d9e9;
  }
}
.forbidBtn {
  color: #f2637b;
  &.disabled {
    color: #c4d9e9;
  }
}
.hrl {
  color: #ddd;
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
/deep/.el-dialog__footer {
  border-top: 1px solid rgba(238, 238, 238, 1);
}
// 查看
/deep/.customWidth2 {
  // width: 30% !important;
  width: 480px;
  .el-dialog__body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
    .el-form-item__label {
      text-align: left;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #3e526f !important;
      line-height: 40px;
      padding: 0 8px 0 0;
      box-sizing: border-box;
    }
    .el-select {
      width: 100%;
    }
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
  //   导入导出 css
  .choseBtnold {
    position: absolute;
    z-index: 10;
    opacity: 0;
    right: 0;
    top: 5px;
    width: 65px;
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
    margin-top: 5px;
  }
  .filIn {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
  }
  .hp-info {
    display: block;
    width: 104px;
    height: 104px;
    overflow: hidden;
    margin-left: 10%;
    // margin: 0 auto;
  }
  input[name="avatar"] {
    width: 104px;
    height: 104px;
    position: relative;
    z-index: 999;
    opacity: 0;
    cursor: pointer;
  }
  /deep/.el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #2b405b;
  }
  /deep/.el-form-item__label {
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #3e526f !important;
    line-height: 40px;
    padding: 0 8px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .tcCon {
    width: 100%;
    overflow: hidden;
    /deep/.el-input__inner {
      //border: 1px solid transparent !important;
      font-size: 14px;
      color: rgba(62, 82, 111, 1);
      font-weight: 400;
    }
    /deep/.el-form-item {
      margin-bottom: 0px;
    }
    /deep/.el-form-item__label {
      font-weight: bold;
      width: 65px !important;
    }
    /deep/.el-form-item__content {
      margin-left: 85px !important;
    }
  }
}
/deep/.el-dialog__footer {
  border-top: 1px solid #eeeeee;
  padding: 10px 20px 10px;
}
</style>