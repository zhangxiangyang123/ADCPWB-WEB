<template>
  <div class="journal">
    <toph :active="active" class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/" style="margin-left:15px;">
        <el-breadcrumb-item :to="{ path: '/journal' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item><a>故障诊断参数管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="content-header">
        <el-form :inline="true" :model="filter" class="demo-form-inline">
          <el-form-item label="企业名称">
            <el-input v-model="filter.createEntName" placeholder="请输入" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="车型">
<!--            <el-input v-model="filter.vehicleType" placeholder="请输入" size="mini"></el-input>-->
            <el-autocomplete
              class="inline-input"
              v-model="filter.vehicleType"
              :fetch-suggestions="querySearch"
              placeholder="请输入"
              :trigger-on-focus="false"
              @select="handleSelect"
              size="mini"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="故障诊断类型">
            <el-select v-model="filter.faultDiagnosisType" placeholder="请选择" clearable style="width:100%" size="mini">
              <el-option v-for="item in modelList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
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
            <el-table-column prop="createEntName" label="企业名称" width="220">
            </el-table-column>
            <el-table-column prop="vehicleType" label="车型" width="">
            </el-table-column>
            <el-table-column prop="batteryMaterialSystem" label="电池材料体系" width="">
            </el-table-column>
            <el-table-column prop="faultDiagnosisType" label="故障诊断类型" width="">
            </el-table-column>
            <el-table-column prop="thresholdParameter" label="阙值参数" width="">
            </el-table-column>
            <el-table-column prop="threshold" label="阙值" width="">
            </el-table-column>
            <el-table-column prop="modifyTime" label="修改时间" width="">
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
                 :close-on-click-modal="false" class="edit-form">
        <el-form :model="formData" label-width="100px" ref="formData">
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="formData.createEntName" placeholder="请输入" :disabled='disabled'></el-input>
          </el-form-item>
          <el-form-item label="车型" prop="vehicleType">
<!--            <el-input v-model="formData.vehicleType" @change="singleValues(formData.vehicleType)" placeholder="请输入" :disabled='disabled'></el-input>-->
            <el-select v-model="formData.vehicleType" placeholder="请选择车型" clearable style="width:100%" :disabled='disabled'
                       @change="changeValues(formData.vehicleType)">
              <el-option v-for="item in carOptions" :key="item.key"
                         :label="item.VEHICLE_TYPE" :value="item.VEHICLE_TYPE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电池材料体系" prop="batteryMaterialSystem">
            <el-input v-model="formData.batteryMaterialSystem" placeholder="请输入" :disabled='disabled'></el-input>
          </el-form-item>
          <el-form-item label="故障诊断类型" prop="faultDiagnosisType">
            <el-select v-model="formData.faultDiagnosisType" placeholder="请选择" clearable style="width:100%" :disabled='disabled'>
              <el-option v-for="item in modelList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阈值参数" prop="thresholdParameter">
            <el-select v-model="formData.thresholdParameter" placeholder="请选择" clearable style="width:100%" :disabled='disabled'>
              <el-option v-for="item in thresholdParamList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阈值参数值" prop="threshold">
            <el-input v-model="formData.threshold" placeholder="请输入" :disabled='disabled'></el-input>
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
import {getTable, saveTable, deleteTable, editTable, seeTable,getVehiclesTypeList,getVechicleTypePage} from "../../api/systemFailure";
// import {getVehiclesTypeList} from "../../api/systemFailure";

const defaultFilter = {
  page: 1,
  pageSize: 10,
  createEntID: "CLEYQP8C27",
  // vehicleType:'',
  // batteryMaterialSystem:'',
  // faultDiagnosisType:'',
  // thresholdParameter:'',
  // threshold:'',
  // createEntName:'',
  // modelType:'',
  // createUser: "123",
}
const defaultFormData = {
  createEntID: "CLEYQP8C27",
  vehicleType:'',
  batteryMaterialSystem:'',
  faultDiagnosisType:'',
  thresholdParameter:'',
  threshold:'',
  createEntName:'',
  modelType:'',
  vehicleTypeID:'',
}
export default {
  components: {
    toph,
  },
  data() {
    return {
      active: 5,
      total: 0,
      filter: deepClone(defaultFilter),
      tableData: [],
      carOptions:[],
      vehicleTypeList:[],
      formData: deepClone(defaultFormData),
      addVisible: false,
      dialogTitle: '',
      disabled:false,
      modelList: [
        '单体电池过压报警' ,'单体电池欠压报警' ,'车载储能装置类型过压报警' ,'车载储能装置类型欠压报警' ,
        '电池高温报警' ,'电池单体一致性差报警' ,'绝缘报警' ,'温度差异报警'
      ],
      thresholdParamList: [
        '单体电压','总电压','温度','压差','绝缘电阻','温差'
      ],


    }
  },
  created() {
    this.filter.modelType = this.$route.params.data;
    this.getTableData();
    this.singleValues();

    let obj = {
      createEntID: "CLEYQP8C27",
      page: 1,
      pageSize: 100,
    }
    getVechicleTypePage(obj).then(res=>{
      console.log(res.data.data.list)
      let data = res.data.data.list
      for(var i in data){
        this.vehicleTypeList.push(data[i].vehicleType);
      }
      console.log('vehicleTypeList',this.vehicleTypeList)
    })
  },
  mounted() {
  },
  methods: {
    //获取搜索车型列表
    querySearch(queryString,cb){
      let vehicleTypeList = this.vehicleTypeList
      let results = queryString ? vehicleTypeList.filter(this.createFilter(queryString)) : vehicleTypeList;
      cb(results);

    },
    createFilter(queryString) {
      return (vehicle) => {
        return (vehicle.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    //获取列表接口
    getTableData() {
      this.$http.post('/api/system/ttFaultDiagnosisParamManagement/getFaultDiagnosisParamManagementPage',this.filter).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.count;
      })
    },
    //搜索
    handleSearch() {
      this.getTableData();
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
      // const ids = this.formData.id
      if (this.dialogTitle === '新增') {
        saveTable(this.formData).then(res => {
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
        this.$http.put('/api/system/ttFaultDiagnosisParamManagement',this.formData).then(res=>{
          if (res.data.ok) {
            console.log(111,res.data.data.ok)
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

    },
    singleValues(){
      getVehiclesTypeList().then(res=>{
        this.carOptions = res.data.data;
        console.log('car',this.carOptions)
      })
    },
    changeValues(val){
      for(const i in this.carOptions){
        if(this.carOptions[i].VEHICLE_TYPE === val ){
          this.formData.vehicleTypeID = this.carOptions[i].key
        }
      }
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

</style>
