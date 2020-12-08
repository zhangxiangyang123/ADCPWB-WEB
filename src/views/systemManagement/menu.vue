<template>
    <div class="news">
        <toph v-bind:active="active" class="nav"></toph>
        <div class="content">
            <el-breadcrumb separator="/" style="margin-top:16px;">
                <el-breadcrumb-item :to="{ path: '/journal' }">系统管理</el-breadcrumb-item>
                <el-breadcrumb-item><a>菜单管理</a></el-breadcrumb-item>
            </el-breadcrumb>
            <div class="search-box">
                <span style="font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #303133;
    line-height: 40px;">菜单管理</span>
                <div>
                    <el-form :inline="true" :model="formData" class="form-box">
                        <!-- ------------------------------- -->

                        <el-form-item>
                            <el-button @click="handleAdd('新增')" size="small" type="primary"><i class="el-icon-plus"></i>新增</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleAdd('编辑')" size="small" style="background-color:#fff;color: #239FFF;" type="primary">编辑</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="handleAdd('删除')" size="small" style="background-color:#fff;border-color: #F56C6C;color: #F56C6C;" type="primary">删除</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="listCon">
                <div class="tabs">

                    <!-- 表格 -->
                    <el-table ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" :data="$store.state.routerData" style="width: 100%;margin-bottom: 20px;border: 1px solid #ffff;" row-key="id" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column prop="label" label="菜单名称">
                        </el-table-column>
                        <el-table-column prop="remarks" label="描述">
                        </el-table-column>
                        <el-table-column prop="router" label="路径">
                        </el-table-column>
                        <el-table-column prop="sort" label="排序">
                        </el-table-column>
                        <!-- <el-table-column prop="sort"
                             label="操作"
                             width="70">
              <el-button @click="handleAdd('删除')"
                         size="small"
                         type="primary"><i class="el-icon-plus"></i>删除</el-button>
            </el-table-column> -->
                    </el-table>
                    <!-- ------------------------------- -->
                    <!-- 翻页 -->
                    <div class="pagingtion-box" style="display: flex; justify-content: flex-end;padding: 20px 0 0;">
                        <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="sizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                        <el-button size="small" type="primary" style="margin-left: 20px;" @click="handleCurrentChange1">确定</el-button>
                    </div>
                    <!-- -------------------------- -->
                </div>
            </div>
        </div>
        <!-- 新增 -->
        <el-dialog :title="popUp" :before-close="handleCancel" :close-on-click-modal="false" :visible.sync="FormVisibledc">
            <el-form :model="Form" label-width="120px" ref="Form">
                <div class="edit">
                    <div class="edit_cont">
                        <ul>
                            <li>
                                <!-- 父级菜单 -->
                                <el-form-item label="父级菜单">
                                    <tree-select :options="options" style="line-height: 29px;" placeholder="请选择父级菜单" v-model="addData.addParentMenu" />
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item class="el-formItem" label="名称">
                                    <el-input v-model="addData.menuName" placeholder="请输入菜单名称" size="small"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item class="el-formItem" label="描述">
                                    <el-input v-model="addData.menuDescribe" placeholder="请输入菜单描述" size="small"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="文件路径">
                                    <el-input v-model="addData.filePath" placeholder="请输入菜单文件路径" size="small"></el-input>
                                </el-form-item>
                            </li>
                            <li>
                                <el-form-item label="菜单排序">
                                    <el-input v-model="addData.menuSort" placeholder="请输入菜单排序数组" size="small"></el-input>
                                </el-form-item>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmAdds(popUp)">确定</el-button>
                <el-button @click="handleCancel()">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import toph from "@/components/top";
// import { handleDelApi, allUser, editApi, addApi, deleteList } from "@/api/news"
import { menu } from "@/api/top.js"
import { addMenu, setMenu, delMenu, saveRoleMenu } from "@/api/menu.js"
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Header } from 'element-ui';
import { mapState, mapMutations } from 'vuex'
var cityOptions = []
export default {
    data() {
        return {
            value: [],
            menus: [],
            // 父级菜单值
            options: [
                {
                    id: '0',
                    label: '顶级菜单',
                },
            ],
            // 选中值
            selectedValue: [],
            // 弹框title
            popUp: '',
            // 显示新增弹框
            FormVisibledc: false,
            // 临时表单数据
            tableData: [],
            // 新增数据
            addData: {
                addParentMenu: [],
                menuName: '',
                menuDescribe: '',
                filePath: '',
                menuSort: '',
            },
            // 翻页
            sizes: [10, 20, 30],
            // 总共数据
            total: 12,
            // --------------------------
            // alertInformation: false,
            checkAll: false,
            index: '',
            pageNo: '1',
            currentPage1: 10,
            checkAll: false,
            checkedCities: [],
            cities: cityOptions,
            isIndeterminate: true,
            userPopUps: false,
            disableds: false,
            // initData: [],
            data: [],
            // addData: {
            //   entName: '企业名称1',
            //   riskPanks: '',
            //   user: '用户1,用户2'
            // },
            valueEntName: '',
            // addDatas: this.addData.entName,

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
        toph,
        TreeSelect,
        ...mapState(['router'])
    },
    watch: {

    },
    created() {
        this.optionsData()
        this.init()
    },
    methods: {
        optionsData() {
            // let dataList = this.$store.state.routerData
            // let dataAB = [
            //   {
            //     id: '0',
            //     label: '顶级菜单',
            //     children: dataList,
            //   },
            // ]
            // this.options = dataAB
            if (this.$store.state.routerData.length !== 0) {
                this.options[0].children = []
                this.options[0].children = this.$store.state.routerData
                this.total = this.$store.state.routerData.length
            }
            console.log('this.$store.state.routerData==', this.$store.state.routerData)
            // this.options[0].children = []
            // this.options[0].children = this.$store.state.routerData
            // this.total = this.$store.state.routerData.length
        },
        ...mapMutations(['router']),
        handleChange(val) {
        },
        // 表格初始化
        init() {
            this.tableData = []
            // let params = sessionStorage.getItem('userInfo')
            menu().then(res => {
                let _this = this
                res.data.data.forEach(function (e) {
                    if (e.parentId === '0') {
                        let data = {
                            parentId: e.parentId,
                            id: e.id,
                            label: e.name,
                            remarks: e.remarks,
                            router: e.href,
                            sort: e.sort,
                            // children: []
                        }
                        res.data.data.forEach(function (e) {
                            if (e.parentId == data.id) {
                                let dataItem =
                                {
                                    parentId: e.parentId,
                                    label: e.name,
                                    id: e.id,
                                    remarks: e.remarks,
                                    router: e.href,
                                    sort: e.sort,
                                    // children: []
                                }
                                res.data.data.forEach(function (e) {
                                    if (e.parentId == dataItem.id) {
                                        let dataItems =
                                        {
                                            parentId: e.parentId,
                                            label: e.name,
                                            id: e.id,
                                            remarks: e.remarks,
                                            router: e.href,
                                            sort: e.sort,
                                            // children: []
                                        }
                                        dataItem.children = []
                                        dataItem.children.push(dataItems)
                                    }
                                })
                                data.children = []
                                data.children.push(dataItem)
                            }
                        })
                        _this.tableData.push(data)
                        _this.total = _this.tableData.length
                    }
                })
            })
            this.router(this.tableData)
        },
        // initS () {
        //   this.tableData = []
        //   let params = sessionStorage.getItem('userInfo')
        //   menu(params).then(res => {
        //     let _this = this
        //     res.data.data.forEach(function(e) {
        //       if (e.parentId === '0') {
        //         let data = {
        //           id: e.id,
        //           label: e.name,
        //           remarks: e.remarks,
        //           router: e.href,
        //           sort: e.sort,
        //         }
        //         res.data.data.forEach(function(e) {
        //           if (e.parentId == data.id) {
        //             let dataItem =
        //             {
        //               label: e.name,
        //               id: e.id,
        //               remarks: e.remarks,
        //               router: e.href,
        //               sort: e.sort,
        //               // children: []
        //             }
        //             res.data.data.forEach(function(e) {
        //               if (e.parentId == dataItem.id) {
        //                 let dataItems =
        //                 {
        //                   label: e.name,
        //                   id: e.id,
        //                   remarks: e.remarks,
        //                   router: e.href,
        //                   sort: e.sort,
        //                   // children: []
        //                 }
        //                 dataItem.children.push(dataItems)
        //               }
        //             })
        //             data.children = []
        //             data.children.push(dataItem)
        //           }
        //         })
        //         _this.tableData.push(data)
        //         _this.total = _this.tableData.length
        //       }
        //     })
        //   })
        //   this.router(this.tableData)
        // },
        // 获取选中的元素
        handleSelectionChange(val) {
            this.selectedValue = val
        },
        //  增加确定
        confirmAdds(popUp) {
            if (this.popUp == '新增') {
                if (this.addData.addParentMenu == []) {
                    this.$message({
                        message: '请选择父级菜单',
                        type: 'warning'
                    });
                } else {
                    if (this.addData.menuName == '') {
                        this.$message({
                            message: '请选择名称',
                            type: 'warning'
                        });
                    } else {
                        let params = {
                            href: this.addData.filePath,//路径
                            sort: this.addData.menuSort,//序列
                            remarks: this.addData.menuDescribe,//描述
                            name: this.addData.menuName,//名称
                            parentId: this.addData.addParentMenu,
                        }
                        addMenu(params).then(res => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.init()
                            this.handleCancel()
                            // const roles = sessionStorage.getItem('rolesId')
                            // const name = sessionStorage.getItem('rolesName')
                            // const userId = sessionStorage.getItem('userId')
                            // const resData = userId.res.data.data.id
                            // let params = {
                            //   "menusstr": [
                            //     resData.id
                            //   ],
                            //   "rid": roles,
                            //   "rname": name
                            // }
                            // saveRoleMenu(params).then(res => {
                            // })
                        })
                    }
                }
            } else {
                let params = {
                    href: this.addData.filePath,//路径
                    sort: this.addData.menuSort,//序列
                    remarks: this.addData.menuDescribe,//描述
                    name: this.addData.menuName,//名称
                    parentId: this.addData.addParentMenu,
                    id: this.selectedValue[0].id,
                }
                this.$http.put('/api/sys/menu', params).then(res => {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.FormVisibledc = false;
                    // this.handleCancel()
                    this.init()
                })
            }
        },

        // 取消
        handleCancel() {
            this.FormVisibledc = false;
            this.addData = {
                addParentMenu: [],
                menuName: '',
                menuDescribe: '',
                filePath: '',
                menuSort: '',
            }
        },
        // 新增
        handleAdd: function (popUp) {
            if (popUp == '编辑') {
                console.log('selectedValue==', this.selectedValue)
                if (this.selectedValue.length == 1) {
                    console.log('this.selectedValue===', this.selectedValue)
                    // 父级菜单
                    this.addData.addParentMenu = this.selectedValue[0].parentId
                    // // 名称
                    this.addData.menuName = this.selectedValue[0].label
                    // // // 描述
                    this.addData.menuDescribe = this.selectedValue[0].remarks
                    // //  文件路径
                    this.addData.filePath = this.selectedValue[0].router
                    // 排序
                    this.addData.menuSort = this.selectedValue[0].sort
                    this.popUp = popUp
                    this.FormVisibledc = true
                } else {
                    this.$message({
                        message: '请选择一条编辑的选项',
                        type: 'warning'
                    });
                }
            } else if (popUp == '新增') {
                this.popUp = popUp
                this.FormVisibledc = true
            } else {
                // 删除选项
                let _this = this
                this.selectedValue.forEach(function (e) {
                    delMenu(e.id).then(res => {
                        _this.init()
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    })
                })

                // let params = this.selectedValue[0].id
                // delMenu(params).then(res => {
                //   this.$message({
                //     message: '删除成功',
                //     type: 'success'
                //   });
                //   this.init()
                // })
            }
        },


        // --------------以下为废弃代码----------

        // --------------------------------
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        handleReset() {
            this.formData.carVIN = '',
                this.value = ''
        },
        handleSizeChange1(val) {
            this.currentPage1 = val
            // this.init(this.pageNo, this.currentPage1)
        },
        handleCurrentChange1(val) {
            this.pageNo = val
            // this.init(this.pageNo, this.currentPage1)
        },


        // 点击关闭新增推送用户
        userPopUp(done) {
            this.userPopUps = false;
        },
        //点击取消
        add(idex) {
            this.userPopUps = true
        },
        // 查看
        handleDec(index) {
            let data = this.data[index]
            this.formData.name = data.pushUser;
            this.formData.value = data.riskRanks;
            this.addVisible = true;
        },
        Adds() {
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
        confirmEdit() {
            this.Edit()
        },

    },
    successMessage(message) {
        this.$message({
            message: message + '成功',
            type: 'success'
        });
    },
};
</script>
<style lang="less" scoped>
// /deep/.el-table th  {
//       background-color: rgba(250,  250,  250,  1) !important;
// }
/deep/.el-table th {
    background-color: #fafafa;
}
// /deep/.el-table--border td,
// .el-table--border th,
// .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
//   border-right: cyan;
// }
// // /deep/.el-table--border td,
// // .el-table--border th,
// // .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
// //   border-right: cyan;
// // }
// /deep/.el-table--border,
// .el-table--group {
//   border-right: cyan;
// }
// /deep/.el-table--border td,
// .el-table--border th,
// .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
//   border-right: cyan;
// }
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
        .search-box {
            padding: 1.5px 28px;
            padding-left: 28px;
            background: #fff;
            // border-radius: 4px;
            border-bottom: 1px solid #ebeef5;
            margin: 16px 0 0px 0;
            display: flex;
            justify-content: space-between;
            form {
                > div {
                    margin: 0;
                    &:nth-child(2) {
                    }
                }
            }
        }
        .listCon {
            padding: 0 15px;
            background: rgba(255, 255, 255, 1);
            padding-bottom: 15px;
            margin-bottom: 10px;
            padding-top: 10px;
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
            padding: 15px 20px;
            > span {
                font-size: 16px;
                font-weight: 500;
                color: rgba(43, 64, 91, 1);
            }
        }
        .el-dialog__body {
            padding: 15px 12px 14px 14px;
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
                        // padding: 10px;
                        // background: rgba(250, 251, 252, 1);
                        // margin-top: 15px;
                        > li {
                            list-style: none;
                            display: flex;
                            align-items: center;
                            font-size: 14px;
                            color: rgba(141, 171, 196, 1);
                            .el-form-item {
                                // width: 296px;
                                display: flex;
                                margin-bottom: 00px;
                                label {
                                    width: auto !important;
                                }
                                .el-form-item__content {
                                    margin-left: 0px !important;
                                    // width: 526px;
                                    width: 75%;
                                    position: absolute;
                                    right: 30px;
                                    input {
                                        // width: 526px;
                                        height: 34px;
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
