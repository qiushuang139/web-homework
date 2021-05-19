import md5 from 'js-md5'

export default {
    data() {
        return {
            admin: {
                adminId: "",
                password: "",
            },
            ruleForm: {
                adminId: "",
                password: "",
                repeatPassword: "",
            },
            adminAdd: false,
            rules: {
                adminId: [
                    { required: true, message: "请输入用户名" },
                    { min: 1, max: 15, message: "最长15个字符" }
                ],
                password: [
                    { required: true, message: "请输入密码" },
                    { min: 1, max: 15, message: "最长15个字符" }
                ]
            }
        };
    },
    methods: {
        //登录函数
        login() {
            console.log("登录");
            if (this.adminname === null || this.password === null) {
                return;
            }
            this.admin.password = md5(this.admin.password);
            let postData = JSON.stringify(this.admin);

            this.axios({
                    method: "post",
                    url: "http://localhost:8080/admin/login",
                    data: postData,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data == true) {
                        this.$router.push('/residentInfo')
                    } else {
                        this.$message.error("密码错误或账号不存在");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        //处理关闭窗口
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                    this.emptyUserData();
                })
                .catch((_) => {});
        },
        //注册函数
        register() {
            if (this.ruleForm.adminId == null || this.ruleForm.password == null ||
                this.ruleForm.repeatPassword == null) {
                this.$message.error("请输入");
                return;
            }
            if (this.ruleForm.repeatPassword != this.ruleForm.password) {
                this.$message.error("密码不一致，请再次确认");
                return;
            }
            this.admin = {
                adminId: this.ruleForm.adminId,
                password: md5(this.ruleForm.password),
            };
            console.log(this.admin.password);
            let postData = JSON.stringify(this.admin);
            this.axios({
                    method: "post",
                    url: "http://localhost:8080/admin/addAdmin",
                    data: postData,
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("tag");
                    if (response.data === true) {
                        this.$message({
                            message: "注册成功",
                            type: "success",
                        });
                        this.emptyUserData();
                    } else {
                        this.$message.error("注册失败");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            this.admin = {
                adminId: null,
                password: null
            };
        },
        //清空注册数据
        emptyUserData() {
            this.adminAdd = false;
            this.ruleForm = {
                adminId: null, //用户id
                password: null,
                repeatPassword: null,
            };
        },
        cancel() {
            this.emptyUserData();
        },
    },
};