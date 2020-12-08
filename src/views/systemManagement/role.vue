<template>
  <div class="journal">
    <toph v-bind:active="active"
          class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/"
                     style="margin-top:12px;">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>角色管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索区begin -->
      <div class="handle-box">
        <div class="box">
          <el-col :span="24"
                  class="toolbar">
            <el-form :inline="true"
                     :model="filters"
                     ref="filters">
              <el-form-item prop="carN"
                            label="姓名">
                <el-input v-model="filters.carN"
                          placeholder="请输入"
                          size="mini"></el-input>
              </el-form-item>
              <el-form-item prop="name"
                            label="用户状态">
                <el-select v-model="filters.name"
                           placeholder="请选择"
                           clearable
                           size="mini">
                  <el-option v-for="item in filters.carOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="margin-right:8px;">
                <el-button type="primary"
                           @click="searchData(filters)"
                           size="mini">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button class="rese"
                           type="info"
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
          <div class="addBtn"
               @click="handleEdit(0)"><i class="el-icon-plus"></i>新增</div>
          <!-- <div class="delBtn"  @click="del()"><i class="el-icon-delete"></i>删除</div> -->
        </div>
        <!--表格数据及操作-->
        <el-table :data="users"
                  style="width: 100%;"
                  ref="multipleTable"
                  class="multipleTable">
          <el-table-column type="index"
                           label="序号"
                           width="100">
          </el-table-column>
          <el-table-column prop="rname"
                           label="角色"
                           width="230">
          </el-table-column>
          <el-table-column prop="rdsesc"
                           label="创建时间"
                           min-width="250">
          </el-table-column>
          <el-table-column prop="userState"
                           label="用户状态"
                           min-width="100">
            <template slot-scope="scope">{{ scope.row.userState?'禁用':'启用' }}</template>
          </el-table-column>
          <el-table-column label="操作"
                           width="240">
            <template slot-scope="scope">
              <a @click="handleDec(scope.$index, scope.row)"
                 class="ckbtn">查看</a>
              <span class="hrl">|</span>
              <a @click="handleEdit(1,scope.$index, scope.row)"
                 class="ckbtn">编辑</a>
              <span class="hrl">|</span>
              <template v-if="scope.row.userState">
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
                         :page-sizes="[1, 2, 5, 10]"
                         :page-size="limit"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
          <el-button size="small"
                     type="primary"
                     style="margin-left: 20px; margin-top: 20px;">确定</el-button>
        </div>
        <el-dialog :title="edit"
                   customClass="customWidth2"
                   :visible.sync="addVisible"
                   :close-on-click-modal="false"
                   class="edit-form">
          <el-form :model="formData"
                   label-width="120px"
                   ref="formData">
            <div class="tcCon">
              <el-form-item label="角色">
                <el-input v-model="valueEntName"
                          placeholder="请输入"
                          style="width: 463px;"></el-input>
                <div class="errorPrompt">
                  <p class="alertInformation"
                     v-show="alertInformation">请输入10个字符以内的角色名</p>
                </div>
                <!-- <el-select v-model="formData.role" placeholder="请选择" clearable style="width:100%" @change="change($event)"> 
                  <el-option v-for="item in roles"   :key="item.value"  :label="item.name"  :value="item.value" ></el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="权限配置">
                <table class="roleConfigTable">
                  <thead>
                    <tr>
                      <th>模块</th>
                      <th>内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <el-checkbox v-model="roleCheckList.module1">系统管理</el-checkbox>
                      </td>
                      <td>
                        <el-checkbox-group v-model="roleCheckList.content1">
                          <el-checkbox label="车型管理"></el-checkbox>
                          <el-checkbox label="电池包管理"></el-checkbox>
                          <el-checkbox label="参数模型管理"></el-checkbox>
                        </el-checkbox-group>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <el-checkbox v-model="roleCheckList.module2">系统管理</el-checkbox>
                      </td>
                      <td>
                        <el-checkbox-group v-model="roleCheckList.content2">
                          <el-checkbox label="车型管理"></el-checkbox>
                          <el-checkbox label="电池包管理"></el-checkbox>
                          <el-checkbox label="参数模型管理"></el-checkbox>
                        </el-checkbox-group>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       :disabled="alertInformation"
                       @click="confirmAdd(edit)">确定</el-button>
            <el-button @click="addVisible=false">取消</el-button>
          </div>
        </el-dialog>

        <el-dialog title="查看"
                   customClass="customWidth"
                   :visible.sync="addVisible1"
                   :close-on-click-modal="false"
                   class="edit-form">
          <el-form :model="formData"
                   label-width="120px"
                   ref="formData">
            <div class="tcCon">
              <ul>
                <li><span>角色</span><span>{{formData.role}}</span></li>
                <li><span>创建时间</span><span>{{formData.createTime}}</span></li>
                <li><span>用户状态</span><span>{{ formData.userState?'禁用':'启用' }}</span></li>
              </ul>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="addVisible1=false">确定</el-button>
            <el-button @click="addVisible1=false">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import "@/api/arrayRemove";
import { role, Arole, Erole } from "@/api/role.js"
var _index;
export default {
  data () {
    return {      valueEntName: '',
      alertInformation: false,
      active: 5,
      activeName: "0",
      filters: {
        carN: "",
        carOptions: [
          {
            value: "启用",
            label: "启用"
          },
          {
            value: "禁用",
            label: "禁用"
          }
        ],
      },
      users: [],
      usersList: [
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '用户', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: false, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: false, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // },
        // {
        //   id: 1, role: '管理员', createTime: '2019/6/6 14:20', userState: true, module1: '', module2: '', content1: [], content2: []
        // }
      ],
      addVisible: false,
      addVisible1: false,
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
      roles: [
        { name: '管理员', value: 'admin' },
        { name: '普通用户', value: 'user' }
      ],
      roleCheckList: {
        module1: '',
        module2: '',
        content1: [],
        content2: []
      },
      //分页
      limit: 5,
      total: null,
      page: 1,
      edit: ""
    };
  },
  watch: {
    valueEntName: {
      handler (newVal, oldVal) {
        // console.log('1==', newVal.length)
        // console.log('newVal, oldVal===', newVal, oldVal)
        if (newVal.length > 10) {
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
  methods: {
    // 列表初始化
    init () {
      let params = {
        userId: sessionStorage.getItem('userInfo'),
      }
      role(params).then(res => {
        console.log('res==', res.data.data)
        this.users = res.data.data
        this.usersList = res.data.data
        console.log('this.users==', this.users)
      })
    },
    resetForm () {
      this.$refs.filters.resetFields();
      this.getList();
    },
    confirmAdd (edit) {
      if (edit == "新增") {
        this.usersList.push({
          id: "1",
          role: this.formData.role,
          createTime: "2019/6/6 14:20",
          userState: true,
          module1: "",
          module2: "",
          content1: [],
          content2: []
        })
        // 新增接口
        let params = {
          usid: sessionStorage.getItem('userInfo'),
          rname: this.valueEntName,//角色名
          menus: this.roleCheckList.module1//权限
        }
        Arole(params).then(res = {
        })
        // ------end----------
        this.addVisible = false;
        this.getList();
      } else {
        this.addVisible = false;
        this.usersList[_index].role = this.formData.role
        this.roleCheckList.module1 = this.users[_index].module1;
        this.roleCheckList.module2 = this.users[_index].module2;
        this.roleCheckList.content1 = this.users[_index].content1;
        this.roleCheckList.content2 = this.users[_index].content2;
        // 修改接口
        let params = {
          rid: this.usersList[_index].rid,
          rname: this.valueEntName,//角色名
          menus: this.roleCheckList.module1//权限
        }
        Erole(params).then(res = {

        })

      }
    },
    selsChange: function(val) {  //点击选中
      console.log(val);
      this.selected = val;
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
    pageList () {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = this.usersList;
      this.getList();
    },
    searchData ({ carN, name }) {

      this.page = 1
      let lists = this.data.filter(item => {
        let matchCarN = true;
        let matchName = true;
        if (carN) {
          // 模糊搜索;
          let keys = carN
            .toUpperCase() // 转大写
            .replace(' ', '') // 删掉空格
            .split(''); // 切割成 单个字

          matchCarN = keys.every(key => item.role.toUpperCase().includes(key));
        }
        if (name) {
          var state = item.userState == true ? "禁用" : "启用"
          matchName = state == name;
        }
        return matchCarN && matchName;
      });
      this.list = lists.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.users = this.list
      this.total = lists.length

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
      //console.log(`每页 ${val} 条`);
      this.limit = val;
      this.getList();
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    // 查看
    handleDec (index, row) {
      this.addVisible1 = true;
      this.formData = Object.assign({}, row);
    },
    // 编辑
    handleEdit (num, index, row) {
      _index = index;
      if (num == 0) {
        this.addVisible = true;
        this.edit = "新增";
        this.formData.role = ""
      } else {
        this.edit = "编辑";
        this.addVisible = true;
        this.formData = Object.assign({}, row);
      }
    },
  },
  created () {
    this.pageList();
    this.init()
  }
};
</script>
<style lang="less" scoped>
.errorPrompt {
  height: 40px;
}
.alertInformation {
  color: red;
  margin: 0;
}
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
/deep/.el-table thead {
  width: 100% !important;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #7791a7;
  font-weight: 500;
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
  padding: 20px 20px 10px;
  background: rgba(250, 251, 252, 1);
  box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
  border-radius: 8px 8px 0px 0px;
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
  border-top: 1px solid #eeeeee;
}
.roleConfigTable {
  border-collapse: collapse;
  thead {
    background: #fafafa;
  }
  tr {
    border-top: 1px solid #e5eef5;
    &:first-child {
      border-top: 0;
    }
    th:first-child,
    td:first-child {
      border-right: 1px solid #f0f5f9;
    }
    td {
      padding: 0 10px;
    }
  }
}
//   查看
/deep/.customWidth {
  width: 30% !important;
  .tcCon {
    width: 312px;
    ul {
      width: 312px;
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        margin-bottom: 13px;
        > span:first-child {
          margin-right: 30px;
          font-size: 14px;
          font-weight: bold;
          color: rgba(62, 82, 111, 1);
          width: 60px;
          display: inline-block;
        }
      }
    }
  }
}

// 查看
/deep/.customWidth2 {
  width: 654px !important;
}
</style>