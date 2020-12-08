<template>
  <div class="journal">
    <toph :active="active" class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/" style="margin-left:15px;">
        <el-breadcrumb-item :to="{ path: '/packgl' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/packpz' }">电池包管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>电池包参数管理 </a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="content-header">
        <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item label="电池包编码">
            <el-input v-model="filter.packCode" placeholder="请输入" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="供应商名称">
            <el-input v-model="filter.supplier" placeholder="请输入" size="mini">
            </el-input>
          </el-form-item>
          <el-form-item label="电池类型">
            <el-input v-model="filter.batteryType" placeholder="请输入" size="mini">
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
            <el-table-column label="序号" width="50px" type="index" fixed :index="i=>(filter.page - 1)*filter.pageSize+i+1">
            </el-table-column>
            <el-table-column prop="packCode" label="电池包编码" width="110">
            </el-table-column>
            <el-table-column prop="batteryType" label="电池类型" width="110">
            </el-table-column>
            <el-table-column prop="voltage" label="电池总电压(V)" width="110">
            </el-table-column>
            <el-table-column prop="capacity" label="电池系统容量(Ah)" width="150">
            </el-table-column>
            <el-table-column prop="density" label="电池系统能量密度(Wh/kg)" width="190">
            </el-table-column>
            <el-table-column prop="quality" label="电池系统及单体质量(kg)" width="180">
            </el-table-column>
            <el-table-column prop="supplier" label="电池系统及单体供应商" width="160">
            </el-table-column>
            <el-table-column prop="packRelation" label="整包串并关系" width="120">
            </el-table-column>
            <el-table-column prop="moduleRelation" label="模组串并关系" width="120">
            </el-table-column>
            <el-table-column prop="moduleModel" label="模组型号" width="">
            </el-table-column>
            <el-table-column prop="cellModel" label="电芯型号" width="">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
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
      <el-dialog :title="dialogTitle" customClass="customWidth2" :visible.sync="addVisible" :close-on-click-modal="false" class="edit-form">
        <el-form class="elForm" :model="formData" label-width="187px" ref="formData" size="small" :rules="rules">
          <el-form-item label="电池包编码" prop="packCode">
            <el-input v-model="formData.packCode" placeholder="请输入" :disabled='disabled' ></el-input>
          </el-form-item>
          <el-form-item label="电池类型" prop="batteryType">
            <el-input v-model="formData.batteryType" placeholder="请输入" :disabled='disabled'></el-input>
          </el-form-item>
          <el-form-item label="电池总电压(V)" prop="name" >
            <el-input v-model="formData.voltage" placeholder="请输入" :disabled='disabled'></el-input>
          </el-form-item>
          <el-form-item label="电池系统容量(Ah)">
            <el-input v-model="formData.capacity" placeholder="请输入" :disabled='disabled'></el-input>
          </el-form-item>
          <el-form-item label="电池系统能量密度(Wh/kg)">
            <el-input v-model="formData.density" placeholder="请输入" :disabled='disabled'></el-input>
          </el-form-item>
          <el-form-item label="电池系统及单体质量(kg)">
            <el-input v-model="formData.quality" placeholder="请输入" :disabled='disabled'></el-input>
          </el-form-item>
          <el-form-item label="电池系统及单体供应商" prop="supplier">
            <el-input v-model="formData.supplier" placeholder="请输入" :disabled='disabled'></el-input>
          </el-form-item>
            <el-form-item label="整包串并关系">
              <el-input v-model="formData.packRelation" placeholder="请输入" :disabled='disabled'></el-input>
            </el-form-item>
            <el-form-item label="模组串并关系">
              <el-input v-model="formData.moduleRelation" placeholder="请输入" :disabled='disabled'></el-input>
            </el-form-item>
            <el-form-item label="模组型号">
              <el-input v-model="formData.moduleModel" placeholder="请输入" :disabled='disabled'></el-input>
            </el-form-item>
            <el-form-item label="电芯型号">
              <el-input v-model="formData.cellModel" placeholder="请输入" :disabled='disabled'></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmAdd" style="height:32px;padding: 6px 18px;" v-if="!disabled">确定</el-button>
          <el-button @click="addVisible=false" style="height:32px;padding: 6px 18px;">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import toph from "../../components/top"
import {deepClone} from "../../assets/js/common"
import {getTable, saveTable, deleteTable, editTable, seeTable} from "../../api/packcs";

const defaultFilter = {
  // packCode:'',
  // batteryType:'',
  // voltage:'',
  // capacity:'',
  // density:'',
  // quality:'',
  // supplier:'',
  // supplierName:'',
  // packRelation:'',
  // moduleRelation:'',
  // moduleModel:'',
  // cellModel:'',
  createEntID: "CLEYQP8C27",
  page: 1,
  pageSize: 20,
}
const defaultFormData = {
  packCode:'',
  batteryType:'',
  voltage:'',
  capacity:'',
  density:'',
  quality:'',
  supplier:'',
  supplierName:'',
  packRelation:'',
  moduleRelation:'',
  moduleModel:'',
  cellModel:'',
  createEntID:'CLEYQP8C27',
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
      modifyUser:'22',
      filter: deepClone(defaultFilter),
      tableData: [],
      formData: deepClone(defaultFormData),
      addVisible: false,
      dialogTitle: '',
      disabled:false,
      modelList: [
        '单体压差过大模型', '温升速率过大模型 ', '温度过高模型', '温度梯度化模型', '绝缘电阻值低模型 ',
        '电芯自放电大模型', '充电压差扩大模型', '单体电压离散度高模型', '单体内阻或者容量异常模型', '连接阻抗大模型',
        '单体电压波动性差异大模型', '绝缘电阻突降模型', 'BMS采样异常', '模组电压离群', '电池包欠压模型'
      ],
      thresholdParamList: [
        '电压差', ' 升速率', '温度', '温度差', '绝缘电阻', '自放电速率', '充电压差', '单体内阻', '单体电压波动', 'BMS'
      ],
      ruleForm: {
        packCode:'',
        batteryType:'',
        supplier:'',
      },
      rules:{
        packCode:[{ required:true,message:'请输入电池包编码',trigger:'blur' }],
        batteryType:[{required: true,message:'请输入电池类型',trigger:'blur'}],
        supplier:[{required:true,message:'请输入电池系统及单体供应商',trigger:'blur'}]
      }
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
      this.$http.post('/api/system/ttBatteryPack/getBatteryPackPagePage',this.filter).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.count;
      })
    },
    //搜索
    handleSearch() {
      this.getTableData(this.filter,this.formData.packCode,this.formData.supplier,this.formData.batteryType);
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
    handleEdit(row){
      this.formData = deepClone(row);
      this.addVisible = true;
      this.dialogTitle = '编辑'
      this.disabled = false;
    },
    //弹出框表单确定
    confirmAdd() {
      if (this.dialogTitle === '新增') {
        this.$http.post('/api/system/ttBatteryPack',this.formData).then(res => {
          if (res.data.ok) {
            this.addVisible = false;
            this.getTableData();
            this.$message({
              type: 'success',
              message: '新增成功'
            })
          }
        })
      }else if(this.dialogTitle === '查看'){
        this.addVisible = false;
      }else if(this.dialogTitle === '编辑'){
        this.formData.modifyUser = this.modifyUser
        this.$http.put('/api/system/ttBatteryPack',this.formData).then(res=>{
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
    handleDelete(id){
      this.$confirm('确定删除选中的选项', '删除', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTable(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getTableData();
        })
      })
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
/deep/ .elForm .el-form-item{
    margin-bottom: 15px;
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

</style>

