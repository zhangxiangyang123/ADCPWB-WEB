<template>
    <div class="reset">
        <div class="child">
            <div class="login_form">
                <h4>密码修改</h4>
                <div>
                    <el-form label-width="120px" ref="forgetpwdform" :model="forgetpwdform" :rules="rules" class="content">
                        <el-row :gutter="20">
                            <el-col :span="16">
                                <el-form-item prop="phone" label="手机号：">
                                    <el-input v-model="forgetpwdform.phone" placeholder="请输入手机号" maxlength="11"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-button @click="sendcodeMsg" :disabled="disabled">{{sendcode}}</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col>
                                <el-form-item prop="code" label="验证码：">
                                    <el-input v-model="forgetpwdform.code" placeholder="请输入验证码"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item prop="newpassword" label="新密码：">
                            <el-input type="password" onkeyup="value=value.replace(/[\W]/g,'') " placeholder="请输入8-10位数字字母组合" v-model="forgetpwdform.newpassword"></el-input>
                        </el-form-item>
                        <el-form-item prop="repeatpassword" label="确认密码：">
                            <el-input type="password" onkeyup="value=value.replace(/[\W]/g,'') " placeholder="请再次输入密码" v-model="forgetpwdform.repeatpassword"></el-input>
                        </el-form-item>
                        <div class="bottom">
                            <el-button type="default" @click="handleClose">取消</el-button>
                            <el-button type="primary" @click="handleSubmit">确认</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qs from "qs"
//base64解密
import { Base64 } from "js-base64";
export default {
    name: "forgetpwd",
    props: ["centerDialogVisibleSecond"],
    data() {
        const mm = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,10}$/
        var validator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!mm.test(this.forgetpwdform.newpassword)) {
                callback(new Error('密码格式错误,请输入8-10位数字字母组合'))
            }
            else {
                if (this.forgetpwdform.newpassword !== '') {
                    this.$refs.forgetpwdform.validateField('repeatpassword');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.forgetpwdform.newpassword) {
                callback(new Error('两次输入密码不一致!'));
            }
            else {
                callback();
            }
        };
        return {
            validator: "",
            validatePass2: "",
            getCode: "",
            sendcode: "获取验证码",
            disabled: false,
            forgetpwdform: {
                phone: "",
                code: "",
                newpassword: "",
                repeatpassword: ""
            },
            rules: {
                phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
                code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
                newpassword: [{ required: true, validator: validator, trigger: 'blur' }],
                repeatpassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
            }
        };
    },
    created() {
        this.resetForm()
    },
    methods: {
        //获取验证码
        sendcodeMsg() {
            const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
            if (this.forgetpwdform.phone == '') {
                this.$message({
                    message: '手机号不能为空',
                    center: true
                })
                return
            }
            if (!reg.test(this.forgetpwdform.phone)) {
                this.$message({
                    message: '手机号格式错误',
                    center: true
                })
                return
            } else {
                console.log(this.forgetpwdform.phone);
                this.$message({
                    message: '发送成功',
                    type: 'success',
                    center: true
                });
                this.time = 60;
                this.disabled = true;
                this.timer();
                this.$http.post("/api/smsVerifyCode", qs.stringify({ phone: this.forgetpwdform.phone })).then((res) => {
                    this.getCode = res;
                    // console.log('555555', res);
                })
            }
            // let _this = this;
            // if (_this.judgePhone()) {
            // var num = 60;
            // var timer = setInterval(function () {
            //     num--;
            //     _this.disabled = true;
            //     _this.sendcode = num + "秒后重新获取";
            //     if (num === 0) {
            //         _this.sendcode = "获取验证码";
            //         _this.disabled = false;
            //         clearInterval(timer);
            //     }
            // }, 1000);
            // _this.$http
            //     .post(
            //         "你的接口",
            //         qs.stringify({ phoneNumber: _this.forgetpwdform.phone })
            //     )
            //     .then(res => {
            //         _this.getCode = res;
            //     });
            // }
        },
        //60S倒计时
        timer() {
            let that = this;
            var num = 60;
            var timer = setInterval(function () {
                num--;
                that.disabled = true;
                that.sendcode = num + "秒后重新获取";
                if (num === 0) {
                    that.sendcode = "获取验证码";
                    that.disabled = false;
                    clearInterval(timer);
                }
            }, 1000);

        },
        //取消
        handleClose() {
            this.$router.push({
                path: "/login"
            });
        },
        //表单提交
        handleSubmit() {
            let _this = this;
            _this.$refs["forgetpwdform"].validate(async valid => {
                if (valid) {
                    const { data: res } = await this.$http.post('/api/checkVerifyCode',
                        qs.stringify({
                            phone: this.forgetpwdform.phone,
                            verifyCode: this.forgetpwdform.code,
                            password: Base64.encode(this.forgetpwdform.newpassword),//新密码加密
                        }),
                    )
                    console.log('res', res);
                    if (_this.forgetpwdform.code != _this.getCode) {
                        this.$message({
                            type: "error",
                            message: "修改密码失败",
                            duration: 1000
                        });
                        return false;
                    }
                    return this.$message({
                        type: "success",
                        message: "密码已修改",
                        duration: 1000
                    });
                    this.$router.push({
                        path: "/login"
                    });
                } else {
                    return;
                }
            });
        },
        resetForm: function (formName) {
            if (this.$refs[formName] !== undefined) { this.$refs[formName].resetFields(); }
        },
    },
    watch: {
        centerDialogVisibleSecond(newValue, oldValue) {
            this.centerDialogVisibleSecond = newValue;
        }
    }
};
</script>

<style scoped lang="less">
.reset {
    min-width: 100%;
    height: 100%;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    background: url(../assets/images/logon/logo_bg.png) no-repeat;
    margin: 0 auto;
}

.login_form {
    width: 500px;
    background-color: #fff;
    text-align: center;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #444343;
    border-radius: 6px;
    padding: 10px 30px 10px 0;
    h4 {
        margin-top: 10px;
        text-align: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(68, 67, 67, 1);
    }
}
.bottom {
    margin: 0 auto;
}
</style>
