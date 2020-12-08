<template>
  <div class="journal">
    <toph :active="active" class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/" style="margin-left:15px;">
        <el-breadcrumb-item :to="{ path: '/journal' }">系统管理</el-breadcrumb-item>
<!--        <el-breadcrumb-item :to="{ path: '/packpz' }">电池包管理</el-breadcrumb-item>-->
        <el-breadcrumb-item><a>电池包配置管理 </a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="content-header">
        <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item label="电池包">
            <el-input v-model="filter.packCode" placeholder="请输入" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="filter.supplier" placeholder="请输入" size="mini">
            </el-input>
          </el-form-item>
          <el-form-item label="车辆VIN">
            <el-input v-model="filter.vin" placeholder="请输入" size="mini">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch" size="mini">搜索</el-button>
            <el-button type="primary" @click="handleReset" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-tabel">
        <div style="margin-bottom: 10px">
          <el-button type="primary" @click="handleAdd" size="mini">新增</el-button>
        </div>
        <div>
          <el-table :data="tableData" stripe style="width: 100%" class="multipleTable">
            <el-table-column label="序号" width="" type="index" :index="i=>(filter.page - 1)*filter.pageSize+i+1">
            </el-table-column>
            <el-table-column prop="packCode" label="电池包" width="">
            </el-table-column>
            <el-table-column prop="vin" label="车辆VIN" width="">
            </el-table-column>
            <el-table-column prop="supplier" label="企业名称" width="">
            </el-table-column>
            <el-table-column prop="moduleModel" label="模组" width="">
            </el-table-column>
            <el-table-column label="操作" width="240">
              <template slot-scope="{row}">
                <el-button @click="handleView(row)" class="ckbtn" size="mini" type="text">查看</el-button>
                <el-button @click="handleEdit(row)" class="ckbtn" size="mini" type="text">编辑</el-button>
                <el-button class="ckbtn" @click="handleDelete(row.id)" size="mini" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagingtion-box">
            <el-pagination style=" display: flex; justify-content: flex-end;" @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page="filter.page" :page-sizes="[1, 2, 5, 10]"
                           :page-size="filter.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <el-button size="mini" type="primary" style="margin-left: 20px">确定</el-button>
          </div>
        </div>
      </div>
      <el-dialog :title="dialogTitle" customClass="customWidth2" :visible.sync="addVisible"
                 :close-on-click-modal="false" class="edit-form" width="630px">
        <div style="margin:-30px 0 10px -20px" class="formTitle">电池包基础信息</div>
        <el-form :model="formData" label-width="70px" ref="formData" :inline="true" label-position="left">
          <el-form-item label="电池包" prop="name">
            <el-input v-model="formData.packCode" placeholder="请输入" :disabled='disabled' size="mini"></el-input>
          </el-form-item>
          <el-form-item label="车辆VIN">
            <el-input v-model="formData.vin" placeholder="请输入" :disabled='disabled' size="mini"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="formData.supplier" placeholder="请输入" :disabled='disabled' size="mini"></el-input>
          </el-form-item>
        </el-form>
        <div style=" margin: 0 0 15px -20px" class="formTitle">电池包配置信息</div>
        <div class="fromDiv" style="margin-bottom: 10px">
          <span>模组号</span>
          <span>单体编号</span>
          <span>探针编号</span>
        </div>
        <div class="fromDiv" v-for="(item,index) in formData.moduleList" :key="index">
          <span>
            <el-input v-model="item.moduleNumber" :disabled='disabled' size="mini"></el-input>
          </span>
          <span>
            <el-input v-model="item.cellVoltage" :disabled='disabled' size="mini"></el-input>
          </span>
          <span>
            <el-input v-model="item.pointerVoltage" :disabled='disabled' size="mini"></el-input>
          </span>
          <span @click="deleteForm(index)" v-if="!disabled">-</span>
        </div>
        <span class="addJia" @click="addForm" v-if="!disabled">+</span>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmAdd" style="height:32px;padding: 6px 18px;" v-if="!disabled">确定
          </el-button>
          <el-button @click="addVisible=false" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import toph from "../../components/top"
import {deepClone} from "../../assets/js/common"
// import {getTable, saveTable, deleteTable, editTable, seeTable} from "../../api/model";
import {getTable, saveTable, deleteTable, editTable, seeTable} from "../../api/packcs";

const defaultFilter = {
  page: 1,
  pageSize: 20,
  createEntID: 'CLEYQP8C27',
}
const defaultFormData = {
  packCode: '',
  vin: '',
  supplier: '',
  createEntID: "CLEYQP8C27",
  batteryType: "电池类型",
  moduleList: [{moduleNumber: '', cellVoltage: '', pointerVoltage: ''}],
  createUser: "str111ing1111",
  modifyUser: '222'
}
export default {
  components: {
    toph,
  },
  data() {
    return {
      active: 5,
      total: 0,
      modifyUser: '222',
      filter: deepClone(defaultFilter),
      moduleList: [{moduleNumber: '', cellVoltage: '', pointerVoltage: ''}],
      tableData: [],
      formData: deepClone(defaultFormData),
      addVisible: false,
      dialogTitle: '',
      disabled: false,
    }
  },
  created() {
    this.getTableData();
  },
  mounted() {
  },
  methods: {
    //获取列表接口
    getTableData() {
      this.$http.post('/api/system/ttBatteryPack/getBatteryPackPagePage', this.filter).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.count;
      })
    },
    //搜索
    handleSearch() {
      this.getTableData(this.formData);
    },
    //重置
    handleReset() {
      this.filter = deepClone(defaultFilter);
      this.getTableData();

    },
    //新增
    handleAdd() {
      this.formData = deepClone(defaultFormData);
      this.addVisible = true;
      this.dialogTitle = '新增';
      this.disabled = false;
    },
    //查看
    handleView(row) {
      this.formData = row;
      this.addVisible = true;
      this.dialogTitle = '查看';
      this.disabled = true;
    },
    //编辑
    handleEdit(row) {
      this.formData = deepClone(row);
      this.addVisible = true;
      this.dialogTitle = '编辑'
      this.disabled = false;
    },
    //弹出框表单确定
    confirmAdd() {
      if (this.dialogTitle === '新增') {
        this.$http.post('/api/system/ttBatteryPack', this.formData).then(res => {
          if (res.data.ok) {
            this.addVisible = false;
            this.getTableData();
            this.$message({
              type: 'success',
              message: '新增成功'
            })
          }
        })
      } else if (this.dialogTitle === '查看') {
        this.addVisible = false;
      } else if (this.dialogTitle === '编辑') {
        this.formData.modifyUser = this.modifyUser
        this.$http.put('/api/system/ttBatteryPack', this.formData).then(res => {
          if (res.data.ok) {
            this.addVisible = false;
            this.getTableData();
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
          }
        })
      }
    },
    handleDelete(id) {
      this.$confirm('确定删除选中的选项', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTable(id).then(res => {
          if (res.data.ok) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getTableData();
          }
        })
      })
    },
    deleteForm(index) {
      this.formData.moduleList.splice(index, 1)
    },
    addForm() {
      this.formData.moduleList.push({moduleNumber: '', cellVoltage: '', pointerVoltage: ''})
    },
    handleSizeChange(value) {
      this.filter.pageSize = value;
      this.getTableData();
    },
    handleCurrentChange(value) {
      this.filter.page = value;
      this.getTableData();
    },
    currentPage() {

    }
  }
}
</script>

<style lang="less" scoped>
.journal {
  background: #f4f7fc;

  /deep/ .header {
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
    margin: 0 auto;
    margin: 10px;
    overflow: hidden;

    /deep/ .el-breadcrumb__inner.is-link {
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

.content-header {
  width: calc(100vw - 20px);
  height: 62px;
  margin: 10px auto;
  background: #FFFFFF;
  line-height: 62px;
  padding-left: 43px;
}

.content-tabel {
  width: calc(100vw - 20px);
  padding: 10px 15px;
  box-sizing: border-box;
  background: #FFFFFF;

  .multipleTable {
    /deep/ td,
    /deep/ th {
      text-align: center;
    }

    /deep/ th,
    /deep/ tr:nth-child(odd) {
      background: #fafafa;
    }
  }

  //.ckbtn{
  //  color: #000;
  //}
}

.pagingtion-box {
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

/deep/ .pagingtion-box .el-pagination__total {
  position: absolute;
  left: 0;
}

/deep/ .pagingtion-box .el-pagination__sizes {
  position: absolute;
  left: 67px;
}

/deep/ .pagingtion-box .el-pagination__total {
  font-size: 14px;
  color: #606266;
}

/deep/ .pagingtion-box .el-input__inner {
  font-size: 14px;
  color: #606266;
}

/deep/ .pagingtion-box .el-pager .number {
  font-size: 14px;
  color: #303133;
}

/deep/ .pagingtion-box .el-pager .active {
  color: #409eff;
}

/deep/ .customWidth2 {
  width: 480px;
}

/deep/ .el-dialog__header {
  padding: 10px 20px 10px;
  background: rgba(250, 251, 252, 1);
  box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
  border-radius: 8px 8px 0px 0px;
}

/deep/ .el-dialog__headerbtn {
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

/deep/ .el-form-item {
  margin-bottom: 10px;
}

.fromDiv {
  span {
    display: inline-block;
    width: 225px;
    text-align: center;
  }

  span:nth-of-type(1) {
    width: 90px;
  }

  span:nth-of-type(4) {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}

.addJia {
  display: inline-block;
  width: 90px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}

.formTitle {
  background: #F5F8FC;
  padding-left: 6px;
  box-sizing: border-box;
  width: 630px;
  font-size: 16px;
}
</style>

