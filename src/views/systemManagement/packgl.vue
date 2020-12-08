<template>
  <div class="journal">
    <toph v-bind:active="active" class="nav"></toph>
    <div class="content">
      <el-breadcrumb separator="/" style="margin-left:15px;">
        <el-breadcrumb-item :to="{ path: '/packgl' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/packgl' }">系统设置</el-breadcrumb-item>
        <el-breadcrumb-item><a>电池包参数管理</a></el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索区begin -->
      <div class="handle-box">
        <div class="box">
          <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="filters" ref="filters">
              <el-form-item prop="name" label="电池材料体系">
                <el-input v-model="filters.name" placeholder="请输入" size="mini"></el-input>
              </el-form-item>
              <el-form-item prop="suppliers" label="电池系统及单体供应商" style="margin-right:10px;">
                <el-input v-model="filters.suppliers" placeholder="请输入" size="mini"></el-input>
              </el-form-item>
              <el-form-item style="margin-right:8px;">
                <el-button type="primary" @click="searchS(filters)" size="mini" style="height:32px;">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="info" size="mini" @click="resetForm()" style="height:32px;background:rgba(255,255,255,1);border:1px solid rgba(217,222,233,1);color:rgba(0,0,0,0.65);">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </div>
      <div class="listCon">
        <!--按钮-->
        <div class="btns">
          <div class="addBtn" @click="addVisible=true"><i class="el-icon-plus"></i>新增</div>
          <div class="delBtn" @click="delAll()"><i class="el-icon-delete"></i>删除</div>
          <div class="dcBtn imtBtn" @click="handleimt()"><img src="../../assets/images/battery/import2.png" alt="" />导入</div>
          <div class="dcBtn" @click="handleEditC()"><img src="../../assets/images/battery/exict.png" alt="" />导出</div>
        </div>
        <!--表格数据及操作-->
        <el-table :data="users" style="width: 100%;" ref="multipleTable" class="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60">
          </el-table-column>
          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="name" label="电池材料体系" width="120">
          </el-table-column>
          <el-table-column prop="lower" label="电池总压(V)" width="100">
          </el-table-column>
          <el-table-column prop="capacity" label="电池系统容量(Ah)">
          </el-table-column>
          <el-table-column prop="density" label="电池系统能量密度(Wh/kg)">
          </el-table-column>
          <el-table-column prop="mass" label="电池系统及单体质量(kg)">
          </el-table-column>
          <el-table-column prop="suppliers" label="电池系统及单体供应商">
          </el-table-column>
          <el-table-column prop="batteryType" label="电池类型">
          </el-table-column>
          <el-table-column prop="seriesParallel" label="串并关系">
          </el-table-column>
          <el-table-column prop="nominalCapacity" label="标称容量">
          </el-table-column>
          <el-table-column prop="nominalVoltage" label="标称电压">
          </el-table-column>
          <el-table-column prop="size" label="尺寸">
          </el-table-column>
          <el-table-column prop="moduleModel" label="模组型号">
          </el-table-column>
          <el-table-column prop="cellModel" label="电芯型号">
          </el-table-column>
          <el-table-column prop="batteryManufacturer" label="电池厂商">
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <a @click="handleDec(scope.$index, scope.row)" class="ckbtn">查看</a>
              <span class="hrl">|</span>
              <a @click="handleEdit(scope.$index, scope.row)" class="ckbtn">编辑</a>
              <span class="hrl">|</span>
              <a class="ckbtn" @click="del(scope.$index, scope.row)">删除</a>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagingtion-box" style="display: flex; justify-content: flex-end;padding: 20px 0;">
          <el-pagination style="margin-top: 20px;  display: flex; justify-content: flex-end;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[1, 2, 5, 10]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <el-button size="small" type="primary" style="margin-left: 20px; margin-top: 20px;">确定</el-button>
        </div>
        <!-- 新增 -->
        <el-dialog title="新增" customClass="customWidth2" :visible.sync="addVisible" :close-on-click-modal="false" class="edit-form">
          <el-form :model="formData" label-width="170px" ref="formData">
            <el-form-item label="电池材料体系" prop="name">
              <el-input v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="电池总压">
              <el-input v-model="formData.lower" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="电池系统容量">
              <el-input v-model="formData.capacity" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="电池系统能量密度">
              <el-input v-model="formData.density" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="电池系统及单体质量">
              <el-input v-model="formData.mass" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="电池系统及单体供应商">
              <el-input v-model="formData.suppliers" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="电池类型">
              <el-input v-model="formData.batteryType" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="串并关系">
              <el-input v-model="formData.seriesParallel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="标称容量">
              <el-input v-model="formData.nominalCapacity" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="标称电压">
              <el-input v-model="formData.nominalVoltage" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="尺寸">
              <el-input v-model="formData.size" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="模组型号">
              <el-input v-model="formData.moduleModel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="电芯型号">
              <el-input v-model="formData.cellModel" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="电池厂商">
              <el-input v-model="formData.batteryManufacturer" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmAdd" style="height:32px;padding: 6px 18px;">确定</el-button>
            <el-button @click="addVisible=false" style="height:32px;padding: 6px 18px;">取消</el-button>
          </div>
        </el-dialog>
        <!-- 导入导出 -->
        <el-dialog customClass="customWidth2" title="导入" :visible.sync="FormVisibledr" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
          <el-form :model="formData" label-width="120px" ref="formData">
            <el-form-item label="文件名">
              <div style="width:50%; float:left; margin-right:40px;"><input type="text" id="textfield" class="filIn" style="width:100%;" /></div>
              <a class="choseBtn">
                选择<input type="file" name="file" id="fileField" class="choseBtnold" onchange="document.getElementById('textfield').value=document.getElementById('fileField').value">
              </a>
            </el-form-item>
            <el-form-item label="电芯排布">
              <div style="width:50%; float:left;"><input placeholder="" class="filIn" style="width:100%;" /></div>
            </el-form-item>
            <el-form-item label="">
              <span class="hp-info">
                <img :src="avatar" style="height:104px; width:104px">
                <p>点击上传</p>
                <input type="file" name="avatar" id="uppic" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="uppic">
              </span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button v-if="DcBtnshow" type="primary" @click.native="confirmDr('formData')" style="height:32px;padding: 6px 18px;">确定</el-button>
            <el-button @click.native="handleCancel('formData')" style="height:32px;padding: 6px 18px;">取消</el-button>
          </div>
        </el-dialog>
        <el-dialog customClass="customWidth2" title="导出" :visible.sync="FormVisibledc" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
          <el-form :model="formData" label-width="120px" ref="formData">
            <!-- <el-form-item label="保存路径">
            <div style="width:50%; float:left; margin-right:10px;"><input type="text" id="textfield" class="filIn" /></div>
            <a class="choseBtn">
             选择<input type="file" name="file" id="fileField" class="choseBtnold" onchange="document.getElementById('textfield').value=document.getElementById('fileField').value">
            </a>
          </el-form-item> -->
            <el-form-item label="保存类型">
              <el-radio v-model="radio" label="1">WORD文件</el-radio><br />
              <el-radio v-model="radio" label="2">PDF文件</el-radio>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button v-if="DcBtnshow" type="primary" @click.native="confirmDc('formData')" style="height:32px;padding: 6px 18px;">确定</el-button>
            <el-button @click.native="handleCancel('formData')" style="height:32px;padding: 6px 18px;">取消</el-button>
          </div>
        </el-dialog>
        <!-- 查看 -->
        <el-dialog title="查看" customClass="customWidth2" :visible.sync="FormVisibleck" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
          <el-form :model="formData" label-width="180px" ref="formData">
            <div class="tcCon">
              <el-form-item label="电池材料体系" prop="name">
                <el-input v-model="formData.name" auto-complete="off" style="border: 0px solid #DCDFE6;"></el-input>
              </el-form-item>
              <el-form-item label="电池总压">
                <el-input v-model="formData.lower"></el-input>
              </el-form-item>
              <el-form-item label="电池系统容量">
                <el-input v-model="formData.capacity"></el-input>
              </el-form-item>
              <el-form-item label="电池系统能量密度">
                <el-input v-model="formData.density"></el-input>
              </el-form-item>
              <el-form-item label="电池系统及单体质量">
                <el-input v-model="formData.mass"></el-input>
              </el-form-item>
              <el-form-item label="电池系统及单体供应商">
                <el-input v-model="formData.suppliers"></el-input>
              </el-form-item>
              <el-form-item label="电池类型">
                <el-input v-model="formData.batteryType"></el-input>
              </el-form-item>
              <el-form-item label="串并关系">
                <el-input v-model="formData.seriesParallel"></el-input>
              </el-form-item>
              <el-form-item label="标称容量">
                <el-input v-model="formData.nominalCapacity"></el-input>
              </el-form-item>
              <el-form-item label="标称电压">
                <el-input v-model="formData.nominalVoltage"></el-input>
              </el-form-item>
              <el-form-item label="尺寸">
                <el-input v-model="formData.size"></el-input>
              </el-form-item>
              <el-form-item label="模组型号">
                <el-input v-model="formData.moduleModel"></el-input>
              </el-form-item>
              <el-form-item label="电芯型号">
                <el-input v-model="formData.cellModel"></el-input>
              </el-form-item>
              <el-form-item label="电池厂商">
                <el-input v-model="formData.batteryManufacturer"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="confirmCk('formData')" style="height:32px;padding: 6px 18px;">确定</el-button>
          </div>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="编辑" customClass="customWidth2" :visible.sync="FormVisibleEdit" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
          <el-form :model="formData" label-width="180px" ref="formData">
            <el-form-item label="电池材料体系" prop="name">
              <el-input v-model="formData.name" auto-complete="off" style="border: 0px solid #DCDFE6;"></el-input>
            </el-form-item>
            <el-form-item label="电池总压">
              <el-input v-model="formData.lower"></el-input>
            </el-form-item>
            <el-form-item label="电池系统容量">
              <el-input v-model="formData.capacity"></el-input>
            </el-form-item>
            <el-form-item label="电池系统能量密度">
              <el-input v-model="formData.density"></el-input>
            </el-form-item>
            <el-form-item label="电池系统及单体质量">
              <el-input v-model="formData.mass"></el-input>
            </el-form-item>
            <el-form-item label="电池系统及单体供应商">
              <el-input v-model="formData.suppliers"></el-input>
            </el-form-item>
            <el-form-item label="电池类型">
              <el-input v-model="formData.batteryType"></el-input>
            </el-form-item>
            <el-form-item label="串并关系">
              <el-input v-model="formData.seriesParallel"></el-input>
            </el-form-item>
            <el-form-item label="标称容量">
              <el-input v-model="formData.nominalCapacity"></el-input>
            </el-form-item>
            <el-form-item label="标称电压">
              <el-input v-model="formData.nominalVoltage"></el-input>
            </el-form-item>
            <el-form-item label="尺寸">
              <el-input v-model="formData.size"></el-input>
            </el-form-item>
            <el-form-item label="模组型号">
              <el-input v-model="formData.moduleModel"></el-input>
            </el-form-item>
            <el-form-item label="电芯型号">
              <el-input v-model="formData.cellModel"></el-input>
            </el-form-item>
            <el-form-item label="电池厂商">
              <el-input v-model="formData.batteryManufacturer"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmEdit('formData')" style="height:32px;padding: 6px 18px;">确定</el-button>
            <el-button @click.native="handleCancel('formData')" style="height:32px;padding: 6px 18px;">取消</el-button>
          </div>
        </el-dialog>
        <!-- 删除 -->
        <el-dialog title="删除" customClass="customWidth" :visible.sync="FormVisibledel" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
          <div>确定删除选中的选项</div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleDelete('formData')" style="height:32px;padding: 6px 18px;">确定</el-button>
            <el-button @click.native="handleCancel('formData')" style="height:32px;padding: 6px 18px;">取消</el-button>
          </div>
        </el-dialog>
        <!-- 批量删除 -->
        <el-dialog title="删除" customClass="customWidth" :visible.sync="FormVisibleAlldel" :close-on-click-modal="false" class="edit-form" :before-close="handleClose">
          <div v-if="multipleSelection.length==0">请选择要删除的项</div>
          <div v-else>确定删除选中的选项</div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="deleteFileOrDirectory('formData')" style="height:32px;padding: 6px 18px;">确定</el-button>
            <el-button @click.native="handleCancel('formData')" style="height:32px;padding: 6px 18px;">取消</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import toph from "@/components/top";
import _url from "@/api/arrayRemove";
var _index;
export default {
  data() {
    return {
      active: 5,
      activeName: "0",
      users: [],
      usersList: [
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
        {
          id: 1, name: '三元电池', lower: '350', capacity: '153', density: '166', mass: '315', suppliers: '达尔电池生产商1', batteryType: 'A', seriesParallel: '串', nominalCapacity: '200MA', nominalVoltage: '40A', size: '20mm', moduleModel: '型号', cellModel: '电芯', batteryManufacturer: '三元集团',
        },
      ],
      addVisible: false,
      formData: {
        id: 0,
        name: '',
        lower: '',
        capacity: '',
        density: '',
        mass: '',
        suppliers: '',
        batteryType: '',
        seriesParallel: '',
        nominalCapacity: '',
        nominalVoltage: '',
        size: '',
        moduleModel: '',
        cellModel: '',
        batteryManufacturer: '',
      },
      filters: {
        name: '',
        suppliers: '',
      },
      // 导出导入
      titleMap: {
        daochuEquipment: "导出",
        daochuImport: "导入"
      },
      FormVisibleck: false,
      FormVisibleEdit: false,
      FormVisibledc: false,
      FormVisibledr: false,
      //FormVisibleck: false,
      FormVisibledel: false,
      FormVisibleAlldel: false,
      multipleSelection: [],
      DcBtnshow: false,
      radio: '1',
      avatar: require('../../assets/images/battery/import3.png'),
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
    resetForm() {
      this.$refs.filters.resetFields();
      this.getList()
    },
    confirmAdd() {
      let id = this.usersList[this.usersList.length - 1].id + 1;
      this.usersList.push({
        id: id, name: this.formData.name, lower: this.formData.lower, capacity: this.formData.capacity, density: this.formData.density, mass: this.formData.mass, suppliers: this.formData.suppliers,
      });
      this.getList();
      this.formData.name = ""
      this.formData.lower = ""
      this.formData.capacity = ""
      this.formData.density = ""
      this.formData.mass = ""
      this.formData.suppliers = ""
      this.addVisible = false;
    },
    //导入确定
    changeImage: function (e) {
      var file = e.target.files[0];
      this.profile = file;
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        that.avatar = this.result;
      }
    },
    confirmDr() {
      this.FormVisibledr = false;
    },
    //导出确定
    confirmDc() {
      this.FormVisibledc = false;
      window.open(_url);
      // window.open("../dongli/static/pack.doc");
      // window.open("../static/pack.doc");
    },
    //点击查看
    handleDec: function (index, row) {
      this.FormVisibleck = true;
      this.formData = Object.assign({}, row);
    },
    //点击编辑
    handleEdit: function (index, row) {
      this.FormVisibleEdit = true;
      this.formData = Object.assign({}, row);
      _index = index;
    },
    confirmEdit() {
      var editdata = _index;
      this.users[editdata].name = this.formData.name;
      this.users[editdata].lower = this.formData.lower;
      this.users[editdata].capacity = this.formData.capacity;
      this.users[editdata].density = this.formData.density;
      this.users[editdata].mass = this.formData.mass;
      this.users[editdata].suppliers = this.formData.suppliers;
      this.FormVisibleEdit = false;
    },
    //查看确定
    confirmCk() {
      this.FormVisibleck = false;
    },
    //批量删除
    delAll: function () {
      this.FormVisibleAlldel = true;
    },
    //选中多选框实现自动加入待删除行对象的数组
    handleSelectionChange(val) {
      //下面这个表示选择的多选框都会被加到存放待删除行的行对象！
      this.multipleSelection = val;
      //当用户只要选择了任意个多选框，删除选中和取消选中按钮就会出现
      if (this.multipleSelection.length === 0) {
        //如不进行判断则勾选完毕后批量删除按钮还是会在
        this.multipleSelectionFlag = false;
      }
    },
    //切换选中状态
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    deleteFileOrDirectory() {
      this.FormVisibleAlldel = false;
      if (this.multipleSelection.length == 0) {
        return false;
      }
      this.multipleSelection.forEach((item) => {
        this.users.remove(item);
      });

    },
    // 删除
    del: function (index, row) {
      this.FormVisibledel = true;
      this.Form = Object.assign({}, row);
      _index = index;
    },
    handleDelete: function (index) {
      this.users.splice(_index, 1);
      this.FormVisibledel = false;
    },
    pageList() {
      // 发请求拿到数据并暂存全部数据,方便之后操作
      this.data = this.usersList;
      this.getList();
    },
    // 处理数据
    getList() {
      // es6过滤得到满足搜索条件的展示数据list
      let list = this.usersList;
      this.users = list.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      );
      this.total = list.length;
    },
    // 当每页数量改变
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    // 搜索过滤数据
    searchS({ name, suppliers }) {
      this.page = 1
      let lists = this.data.filter(item => {
        let matchName = true;
        let matchSuppliers = true;
        if (name) {
          // 模糊搜索;
          let keys = name
            .toUpperCase() // 转大写
            .replace(' ', '') // 删掉空格
            .split(''); // 切割成 单个字
          matchName = keys.every(key => item.name.toUpperCase().includes(key));
        }
        if (suppliers) {
          // 模糊搜索;
          let keys = suppliers
            .toUpperCase() // 转大写
            .replace(' ', '') // 删掉空格
            .split(''); // 切割成 单个字
          matchSuppliers = keys.every(key => item.suppliers.toUpperCase().includes(key));
        }
        return matchName && matchSuppliers;
      });
      this.list = lists.filter((item, index) =>
        index < this.page * this.limit && index >= this.limit * (this.page - 1)
      )
      this.users = this.list
      this.total = lists.length
    },
    //导出
    handleEditC: function (index, row) {
      this.FormVisibledc = true;
      // this.Form = Object.assign({}, row);
      // _index = index;

      this.dialogStatus = "daochuEquipment"
      this.DcBtnshow = true
    },
    handleimt: function (index, row) {
      this.FormVisibledr = true;
      // this.Form = Object.assign({}, row);
      // _index = index;

      this.dialogStatus = "daochuImport"
      this.DcBtnshow = true
    },
    //点击关闭dialog
    handleClose(done) {
      this.FormVisibledc = false;
      this.FormVisibledr = false;
      this.FormVisibledel = false;
      this.FormVisibleAlldel = false;
      this.FormVisibleck = false;
      this.FormVisibleEdit = false;
    },
    //点击取消
    handleCancel(formName) {
      this.FormVisibledc = false;
      this.FormVisibledr = false;
      this.FormVisibledel = false;
      this.FormVisibleAlldel = false;
      this.FormVisibleck = false;
      this.FormVisibleEdit = false;

    },
  },
  created() {
    this.pageList()
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
    margin: 0 auto;
    margin: 10px;
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
  margin: 10px auto;
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
    cursor: pointer;
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
    //   background: #239fff;
    color: rgba(63, 83, 110, 1);
    > img {
      margin-top: 4px;
      width: 24px;
      height: 24px;
    }
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
  color: #0093ee;
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
/deep/.el-input--mini .el-input__inner {
  height: 32px;
  line-height: 32px;
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
/deep/.el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #3e526f !important;
  line-height: 40px;
  padding: 0 8px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/deep/.el-form--inline .el-form-item {
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}
/deep/.customWidth {
  width: 20% !important;
}
/deep/.customWidth2 {
  // width:30% !important;
  width: 480px;
}
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
    border: 1px solid transparent !important;
    font-size: 14px;
    color: rgba(62, 82, 111, 1);
    font-weight: 400;
  }
  /deep/.el-form-item {
    margin-bottom: 0px;
  }
  /deep/.el-form-item__label {
    font-weight: bold;
  }
}
/deep/.el-dialog__footer {
  border-top: 1px solid #eeeeee;
  padding: 10px 20px 10px;
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
