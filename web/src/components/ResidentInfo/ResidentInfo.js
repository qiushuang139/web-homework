export default {
    data() {
        return {
            //查询条件
            queryCondition: {
                name: "",
                sex: null,
                hometown: null,
            },
            //籍贯变换表
            hometowns: [
                { label: "北京", value: 0 },
                { label: "天津", value: 1 },
                { label: "河北", value: 2 },
                { label: "山西", value: 3 },
                { label: "内蒙古", value: 4 },
                { label: "辽宁", value: 5 },
                { label: "吉林", value: 6 },
                { label: "黑龙江", value: 7 },
                { label: "上海", value: 8 },
                { label: "江苏", value: 9 },
                { label: "浙江", value: 10 },
                { label: "安徽", value: 11 },
                { label: "福建", value: 12 },
                { label: "江西", value: 13 },
                { label: "山东", value: 14 },
                { label: "河南", value: 15 },
                { label: "湖北", value: 16 },
                { label: "湖南", value: 17 },
                { label: "广东", value: 18 },
                { label: "广西", value: 19 },
                { label: "海南", value: 20 },
                { label: "重庆", value: 21 },
                { label: "四川", value: 22 },
                { label: "贵州", value: 23 },
                { label: "云南", value: 24 },
                { label: "西藏", value: 25 },
                { label: "陕西", value: 26 },
                { label: "甘肃", value: 27 },
                { label: "青海", value: 28 },
                { label: "宁夏", value: 29 },
                { label: "新疆", value: 30 },
                { label: "香港", value: 31 },
                { label: "澳门", value: 32 },
                { label: "台湾", value: 33 },
                { label: "海外", value: 34 },
            ],
            //受教育程度变换表
            educationLevels: [
                { label: "博士研究生", value: 0 },
                { label: "硕士研究生", value: 1 },
                { label: "大学本科", value: 2 },
                { label: "大学专科", value: 3 },
                { label: "高中/中专", value: 4 },
                { label: "初中", value: 5 },
                { label: "小学", value: 6 },
                { label: "学龄前儿童", value: 7 },
                { label: "文盲", value: 8 },
            ],
            //职业变换表
            professions: [
                { label: "国家机关、党群组织、企业、事业单位负责人", value: 0 },
                { label: "专业技术人员,办事人员和有关人员", value: 1 },
                { label: "商业、服务业人员", value: 2 },
                { label: "农、林、牧、渔、水利业生产人员", value: 3 },
                { label: "生产、运输设备操作人员及有关人员", value: 4 },
                { label: "军人", value: 5 },
                { label: "不便分类的其它从业人员", value: 6 },
            ],
            tableData: [], //列表中的数据
            addResidentPageShow: false, //控制添加Resident信息页面是否显示
            updateResidentPageShow: false, //控制修改Resident信息页面是否显示
            //添加用户中的信息
            residentInfoData: {
                residentId: 1,
                name: null,
                sex: null,
                age: null,
                hometown: null,
                educationLevel: null,
                profession: null,
                height: null,
                weight: null,
            },
            //当前条件下，Resident信息的总页数
            totalPage: 0,
            isQuery: false, //是否正在查询页面
            rules: {
                name: [
                    { required: true, message: "姓名不能为空", trigger: 'blur', },
                ],
                age: [
                    { required: true, message: "年龄不为空" },
                    { type: "number", message: "年龄必须为数字" },
                ],
                height: [
                    { required: true, message: "身高不为空" },
                    { type: "number", message: "身高必须为数字" },
                ],
                weight: [
                    { required: true, message: "体重不为空" },
                    { type: "number", message: "体重必须为数字" },
                ],
                sex: [
                    { required: true, message: "请选择性别", trigger: "change" }
                ],
                hometown: [
                    { required: true, message: "请选择籍贯" }
                ],
                educationLevel: [
                    { required: true, message: "请选择教育水平" }
                ],
                profession: [
                    { required: true, message: "请选择职业" }
                ]
            },
            currentPage: 1,
        };
    },
    created() {
        console.log("初始化");

        //获取Resident信息数据
        this.axios({
                method: "get",
                url: "http://localhost:8080/residents/getResidentsByPage/1",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                this.tableData = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        //获取总页数
        this.axios({
                method: "get",
                url: "http://localhost:8080/residents/getPages",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("总页数：" + response.data);
                this.totalPage = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        //根据条件查询函数
        query() {
            this.isQuery = true;
            this.getResidents(this.currentPage);
            this.getPages();
        },

        //删除Resident
        deleteResidentByIdList() {
            let deleteResidentIdList = [];
            for (var i = 0; i < this.$refs.multipleTable.selection.length; i++) {
                deleteResidentIdList.push(this.$refs.multipleTable.selection[i].residentId);
            }
            this.axios({
                method: 'delete',
                url: 'http://localhost:8080/residents/deleteResidentByIdList',
                data: JSON.stringify(deleteResidentIdList),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.data == deleteResidentIdList.length) {
                    this.$message({
                        message: "删除成功",
                        type: "success",
                    });
                } else {
                    this.$message.error("删除失败，请重试");
                }
            }).catch((error) => {
                console.log(error);
            });
            this.refresh()
        },
        //添加Resident页面中的addResidentButton
        addResident() {
            console.log(this.residentInfoData);
            let that = this;
            this.axios({
                method: "post",
                url: "http://localhost:8080/residents/addResident",
                data: JSON.stringify(that.residentInfoData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                // console.log(response.data);
                if (response.data == true) {
                    this.$message({
                        message: "添加成功",
                        type: "success",
                    });
                } else {
                    this.$message.error("添加失败，请重试");
                }
            });
        },

        //关闭添加Resident页面前的操作
        handleClose() {
            this.residentInfoData = {
                id: 1,
                name: "",
                sex: null,
                age: null,
                hometown: null,
                educationLevel: null,
                profession: null,
                height: null,
                weight: null,
            };
            this.addResidentPageShow = false;
            this.updateResidentPageShow = false;
        },
        cancelAddResident() {
            this.handleClose();
        },
        handlePageChange() {
            console.log("page change")
                //this.currentPage = this.currentPage + 1;
            this.getResidents(this.currentPage);
        },
        //重置查询条件
        resetQuery() {
            this.queryCondition = {
                name: "",
                sex: null,
                hometown: null
            };
            this.isQuery = false;
            this.currentPage = 1;
            this.refresh();
        },
        //编辑选中的Resident
        handleEdit(index, row) {
            this.axios({
                method: 'get',
                url: 'http://localhost:8080/residents/getResidentById/' + row.id,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.residentInfoData = response.data;
            }).catch((error) => {
                console.log(error);
            })
            this.updateResidentPageShow = true;
        },

        //删除选中的Resident
        handleDelete(index, row) {
            this.axios({
                method: 'delete',
                url: 'http://localhost:8080/residents/deleteResidentById/' + row.id,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.data == true) {
                    this.$message({
                        message: "删除成功",
                        type: "success",
                    });
                } else {
                    this.$message.error("删除失败，请重试");
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        //修改Resident
        updateResident() {

            this.axios({
                method: 'put',
                url: 'http://localhost:8080/residents/updateResident',
                data: JSON.stringify(this.residentInfoData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.data == true) {
                    this.$message({
                        message: "修改成功",
                        type: "success",
                    });
                    this.getResidents(this.currentPage);
                    this.getPages();
                } else {
                    this.$message.error("修改失败，请重试");
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        //刷新系统
        refresh() {
            this.getResidents(this.currentPage);
            this.getPages();
        },
        //获取用户信息
        getResidents(page) {
            //正在查询页面
            if (this.isQuery) {
                console.log("查询");
                let condition = "sex=" + (this.queryCondition.sex == null ? -1 : this.queryCondition.sex) +
                    "&&name=" + this.queryCondition.name +
                    "&&hometown=" + (this.queryCondition.hometown == null ? -1 : this.queryCondition.hometown);
                this.axios({
                        method: "get",
                        url: "http://localhost:8080/residents/getResidentsByPageWithCondition/" + page + "?" + condition,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => {
                        this.tableData = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                //获取Resident信息数据
                this.axios({
                        method: "get",
                        url: "http://localhost:8080/residents/getResidentsByPage/" + page,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => {
                        this.tableData = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        //获取页面数量
        getPages() {
            if (this.isQuery) {
                let condition = "sex=" + (this.queryCondition.sex == null ? -1 : this.queryCondition.sex) +
                    "&&name=" + this.queryCondition.name +
                    "&&hometown=" + (this.queryCondition.hometown == null ? -1 : this.queryCondition.hometown);
                this.axios({
                    method: 'get',
                    url: 'http://localhost:8080/residents/getPagesWithCondition?' + condition,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    this.totalPage = response.data;
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                this.axios({
                        method: "get",
                        url: "http://localhost:8080/residents/getPages",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => {
                        console.log("总页数：" + response.data);
                        this.totalPage = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        sexMapping(row, column) {
            return row.sex === true ? "女" : "男";
        },
        hometownMapping(row, column) {
            return this.hometowns[row.hometown].label;
        },
        educationLevelMapping(row, column) {
            return this.educationLevels[row.educationLevel].label;
        },
        professionMapping(row, column) {
            return this.professions[row.profession].label;
        },


    },
};