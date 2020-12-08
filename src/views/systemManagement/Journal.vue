<template>
  <div class="journal">
    <toph v-bind:active="active"
          class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/"
                     style="margin-top:12px;">
        <el-breadcrumb-item :to="{ path: '/journal' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>日志管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="search-box">
        <el-form :inline="true"
                 :model="formData"
                 class="form-box">
          <el-form-item label="日志类型">
            <el-select v-model="formData.carType"
                       placeholder="请选择"
                       size="mini">
              <el-option label="车辆管理"
                         value="车辆管理"></el-option>
              <el-option label="电池包管理"
                         value="电池包管理"></el-option>
              <el-option label="参数模型管理"
                         value="参数模型管理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户">
            <el-input v-model="formData.carVIN"
                      placeholder="请输入"
                      size="mini"></el-input>
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
        <div class="tabs">
          <table>
            <thead>
              <tr>
                <th>序号</th>
                <th>
                  日志类型
                </th>
                <th>
                  日志类型
                </th>
                <th>用户 </th>
                <th>
                  设置时间
                </th>
                <th>
                  操作结果
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr, trIdx) in tableData.tbody"
                  :key="trIdx">
                <!-- <td v-if="tr !=''">{{trIdx+1}} </td> -->
                <td v-for="(td,tdIdx) in tr"
                    :key="tdIdx">{{td}}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagingtion-box"
               style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
            <el-pagination @size-change="handleSizeChange1"
                           @current-change="handleCurrentChange1"
                           :current-page="currentPage1"
                           :page-sizes="[ 5,10, 20, 30]"
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
  </div>
</template>
<script>
import toph from "@/components/top";
import { log } from "@/api/Journal"
export default {
  data () {
    return {
      // -----------新增数据(C)----------
      pageNo: 1,
      pageSize: 5,
      // --------------end-------------
      active: 5,
      activeName: "0",
      formData: {
        carType: "",
        carNumber: "",
        carVIN: ""
      },
      total: 0,
      currentPage1: 1,

      type: 0,
      tableData: {
        tbody: [
          // ["1", "车辆管理", "添加", "admin", "2019/6/5 10:06", "成功"],
          // ["2", "电池包管理", "添加", "admin1", "2019/6/5 10:06", "成功"],
          // ["3", "车辆管理", "添加", "admin2", "2019/6/5 10:06", "成功"],
          // ["4", "车辆管理", "添加", "admin3", "2019/6/5 10:06", "成功"],
          // ["5", "车辆管理", "添加", "admin4", "2019/6/5 10:06", "成功"]
        ],
        type: 0
      }
    };
  },
  components: {
    toph
  },
  created () {
    this.init(this.pageNo, this.pageSize)
  },
  methods: {
    //  -------------------- 新增代码（C)--------------------
    // 列表初始化(C)
    init (pageNo = 1, pageSize = 10, account = '', endTime = '') {
      // init () {
      let param = {
        pageNo: pageNo,
        pageSize: pageSize,
        account: account,
        endTime: endTime
      }
      let _this = this
      log(param).then(res => {
        let arr = res.data.data
        let tbody = []
        this.total = arr.count
        arr.list.forEach(function(e, index) {
          let data = [index + 1, e.className, "添加", e.account, e.startTime, "成功"]
          tbody.push(data)
        })
        _this.tableData.tbody = tbody
      }).catch(e => {
        this.$message.error('日志管理异常');
      });
    },
    // 搜索
    handleSearch () {
      var car = this.formData.carType
      var search = this.formData.carVIN;
      this.init(this.pageNo, this.pageSize, car, search)
    },
    // 重置
    handleReset () {
      this.formData.carVIN = ''
      this.formData.carType = ''
      this.init(this.pageNo, this.pageSize)
    },
    // 页数
    handleCurrentChange1 (val) {
      this.init(val, this.pageSize)
    },
    // 条数
    handleSizeChange1 (val) {
      this.init(1, val)
    },
    // --------------end----------------
    pageList () {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = this.usersList;
      this.getList();
    },
    // 处理数据
    // getList() {
    //   // es6过滤得到满足搜索条件的展示数据list
    //   let list = this.usersList;
    //   this.users = list.filter(
    //     (item, index) =>
    //       index < this.page * this.limit &&
    //       index >= this.limit * (this.page - 1)
    //   );
    //   this.total = list.length;
    // },
    // handleSearch () {
    //   var car = this.formData.carType
    //   var search = this.formData.carVIN;
    //   let lists = null;
    //   //   var _this = this;
    //   //   this.tableData.tbody = this.tableData.tbody.map((val, idx) => {
    //   //     if (search == val[3]) {
    //   //       return _this.tableData.tbody[idx];
    //   //     }
    //   //   })
    //   let list = this.tableData.tbody;
    //   lists = list.filter(item => {
    //     let matchType = true;
    //     let matchName = true;

    //     if (car) {
    //       matchType = item[1] == car
    //     }
    //     if (search) {
    //       // 模糊搜索;
    //       let keys = search
    //         .toUpperCase()
    //         .replace(" ", "")
    //         .split("");
    //       matchName = keys.every(key => item[3].toUpperCase().includes(key));
    //     }
    //     return matchType && matchName;
    //   })
    //   this.tableData.tbody = lists
    //   this.total = lists.length
    // },
    // handleReset () {
    //   this.formData = {
    //     carType: "",
    //     carNumber: "",
    //     carVIN: ""
    //   };
    //   this.tableData.tbody = [
    //     ["1", "车辆管理", "添加", "admin", "2019/6/5 10:06", "成功"],
    //     ["2", "电池包管理", "添加", "admin1", "2019/6/5 10:06", "成功"],
    //     ["3", "车辆管理", "添加", "admin2", "2019/6/5 10:06", "成功"],
    //     ["4", "车辆管理", "添加", "admin3", "2019/6/5 10:06", "成功"],
    //     ["5", "车辆管理", "添加", "admin4", "2019/6/5 10:06", "成功"]
    //   ]
    // },

    // handleSizeChange1 (val) {
    //   if (val == 5) {
    //     this.tableData.tbody = [
    //       ["1", "车辆管理", "添加", "admin", "2019/6/5 10:06", "成功"],
    //       ["2", "电池包管理", "添加", "admin1", "2019/6/5 10:06", "成功"],
    //       ["3", "车辆管理", "添加", "admin2", "2019/6/5 10:06", "成功"],
    //       ["4", "车辆管理", "添加", "admin3", "2019/6/5 10:06", "成功"],
    //       ["5", "车辆管理", "添加", "admin4", "2019/6/5 10:06", "成功"]
    //     ];
    //   } else {
    //     this.tableData.tbody = [
    //       ["1", "车辆管理", "添加", "admin", "2019/6/5 10:06", "成功"],
    //       ["2", "电池包管理", "添加", "admin1", "2019/6/5 10:06", "成功"],
    //       ["3", "车辆管理", "添加", "admin2", "2019/6/5 10:06", "成功"],
    //       ["4", "车辆管理", "添加", "admin3", "2019/6/5 10:06", "成功"],
    //       ["5", "车辆管理", "添加", "admin4", "2019/6/5 10:06", "成功"],
    //       ["6", "车辆管理", "添加", "admin5", "2019/6/5 10:06", "成功"]
    //     ];
    //   }
    // },
    // handleCurrentChange1 (val) {
    //   if (val == 1) {
    //     this.tableData.tbody = [
    //       ["1", "车辆管理", "添加", "admin", "2019/6/5 10:06", "成功"],
    //       ["2", "电池包管理", "添加", "admin1", "2019/6/5 10:06", "成功"],
    //       ["3", "车辆管理", "添加", "admin2", "2019/6/5 10:06", "成功"],
    //       ["4", "车辆管理", "添加", "admin3", "2019/6/5 10:06", "成功"],
    //       ["5", "车辆管理", "添加", "admin4", "2019/6/5 10:06", "成功"]
    //     ];
    //   } else if (val == 2) {
    //     this.tableData.tbody = [
    //       ["6", "车辆管理", "添加", "admin5", "2019/6/5 10:06", "成功"]
    //     ];
    //   }
    // }
  }
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
}
</style>