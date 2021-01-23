<template>
    <div class="main">
        <div class="content">

            <div class="top">
                <h2 style="margin-top: 40px">{{ title }}</h2>
                <p style="margin-top: 20px">{{ desc }}</p>
            </div>
            <el-card class="box-card" v-for="(item,ques_index) in details " :key="ques_index">
                <div slot="header" class="clearfix">
                    <span>{{ ques_index + 1 + ":" + item.title }}</span>
                </div>
                <!--单选题展示-->
                <div class="text item" v-for="(option,index) in item.options " :key="index">
                    <el-radio v-if="item.type==='radio'" :label="option.id" style="margin: 5px;"
                              v-model="item.radioValue">
                        {{ option.title }}
                    </el-radio>
                </div>
                <!--多选题展示-->
                <el-checkbox-group v-if="item.type==='checkbox'" v-model="item.checkBoxValue">
                    <div class="text item" v-for="(option,index) in item.options" :key="index">
                        <el-checkbox :label="option.id" style="margin: 5px;">{{ option.title }}</el-checkbox>
                    </div>
                </el-checkbox-group>
                <!--填空题展示-->
                <el-input
                    v-if="item.type==='text'"
                    type="textarea"
                    :rows="item.row"
                    v-model="item.textValue"
                    resize="none">
                </el-input>
            </el-card>
            <el-button type="primary" style="margin: 35px;width: 100px" @click="submitForm">提交</el-button>
            <br>
            <el-link type="primary">vue.shaobaotao.cn</el-link>
            <!--      <el-link type="primary" style="margin: 15px;" href="vue.shaobaotao.cn">vue.shaobaotao.cn</el-link>-->
        </div>
    </div>
</template>

<script>
export default {
    name: "questionnaire",
    data() {
        return {
            title: "",
            desc: "",
            details: [],
            startTime: 0,
            useTime: ''
        }

    },
    methods: {
        getQuestions() {
            this.axios.post('api/getQuestions.php', {
                id: this.$route.params.id
            })
                .then((response) => {
                    this.title = response.data.title
                    this.desc = response.data.desc
                    this.details = response.data.details

                })
        },
        checkForm() {
            if (this.details.length === 0) {
                this.$message({
                    msg: "问卷未填完整！",
                    type: "warning"
                })
                return false
            }
            for (let i = 0; i < this.details.length; i++) {
                if (
                    this.details[i].radioValue === -1 &&
                    this.details[i].textValue === '' &&
                    this.details[i].checkBoxValue.length === 0
                ) {
                    this.$message({
                        message: "问卷未填完整！",
                        type: "warning"
                    })
                    return false
                }
            }
            return true
        },
        submitForm() {
            this.useTime = new Date().getTime() - this.startTime

            if (this.checkForm()) {
                this.axios.post('api/addAnswer.php', {
                    id: this.$route.params.id,
                    details: this.details,
                    useTime: this.useTime
                })
                    .then((response) => {
                        if (response.data.code === 200) {
                            this.$router.push('/thanks')
                        } else {
                            this.$message({
                                message: response.data.msg,
                                type: "warning"
                            })
                        }
                    })
            }

            console.log(this.details, this.title, this.desc)
        },
        countTime() {
            this.startTime = new Date().getTime();
        }
    },
    mounted() {
        this.getQuestions()
        this.countTime()
    },
    components: {},
}
</script>

<style scoped>

.main {
    width: 800px;
    margin: 0 auto;
}

.main .content {
    width: 100%;
    max-width: 800px;
    display: inline-block;
    text-align: center;
}

.main .box-card {
    text-align: left;
    width: 100%;
    margin: 10px 0 10px 0;
}

.top {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>