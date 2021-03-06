<template>
  <div class="main">
    <div class="content">

      <div class="top">
        <h2>{{ title }}</h2>
        <p style="margin-top: 20px">{{ desc }}</p>
      </div>
      <el-card class="box-card" v-for="(item,ques_index) in details " :key="ques_index">

        <div slot="header" class="clearfix">
          <span>{{ ques_index + 1 + ":" + item.title }}</span>
          <el-button style="float: right; padding: 3px 0; color: #F56C6C" type="text" @click="deleteQuestion(item.id)">
            删除问题
          </el-button>
        </div>

        <div class="text item" v-for="(option,index) in item.options " :key="index">
          <el-radio :label="option.id" style="margin: 5px;">{{ option.title }}</el-radio>
        </div>

      </el-card>
      <el-button icon="el-icon-circle-plus" style="margin-top: 10px;" @click="addQuestion">添加题目</el-button>
      <!--            <el-button type="primary" style="margin: 5px;" >提交</el-button>-->
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogShow" :close-on-click-modal="false" class="dialog">
      <el-form ref="form" :model="willAddQuestion" label-width="80px">
        <el-form-item label="题目类型" style="width: 100%;">
          <el-select v-model="willAddQuestion.type" placeholder="请选择题目类型">
            <el-option
                v-for="item in allType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="题目标题" style="width: 100%;">
          <el-input v-model="willAddQuestion.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <template v-if="willAddQuestion.type==='radio'||willAddQuestion.type==='checkbox'">
          <el-form-item :label="'选项'+(index+1)" v-for="(item,index) in willAddQuestion.options" :key="index">
            <el-row>
              <el-col :span="16">
                <el-input v-model="item.title" placeholder="请输入选项名" style="width: 90%;"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="danger" plain class="">删除选项</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-button type="primary" plain class="addOptionButton" @click="addOption">新增选项</el-button>
        </template>
        <template v-if="willAddQuestion.type==='text'">
          <el-form-item label="填空">
            <el-input type="textarea"
                      :rows="willAddQuestion.row" style="width: 80%" resize="none"></el-input>
          </el-form-item>
          <el-form-item label="行数">
            <el-input-number v-model="willAddQuestion.row" :min="1" :max="10" label="描述文字"></el-input-number>
          </el-form-item>

        </template>
      </el-form>
      <br>
      <div style="width: 100%;text-align: right">
        <el-button style="margin-left: 10px;" @click="dialogShow=false">取消</el-button>
        <el-button type="primary" style="margin-left: 10px;" @click="checkAddQuestion">完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/request/api";

export default {
  name: "questionnaire",
  data() {
    return {
      title: "",
      desc: "",
      dialogShow: false,
      dialogTitle: '',
      willAddQuestion: {
        id: 0,
        type: '',
        title: '',
        options: [],
        row: 1,
        must: false,//是否必填
      },
      details: [],
      allType: [
        {
          value: 'radio',
          label: '单选题',
        },
        {
          value: 'checkbox',
          label: '多选题',
        },
        {
          value: 'text',
          label: '填空题',
        },
        // {
        //     value:'text',
        //     label:'单行文本题（开发中）',
        // },
        // {
        //     value:'text',
        //     label:'多行文本题（开发中）',
        // },
        // {
        //     value:'text',
        //     label:'录音（开发中）',
        // },
        // {
        //     value:'text',
        //     label:'定位（开发中）',
        // },
      ],
    }

  },
  methods: {
    getQuestions() {
      api.getQuestions({
        id: this.$route.params.id
      })
        .then((response) => {
          this.title = response.data.title
          this.desc = response.data.desc
          this.details = response.data.details
        })
    },
    addQuestion() {
      this.dialogTitle = '添加题目';
      this.willAddQuestion = {
        id: this.$route.params.id,
        type: '',
        title: '',
        options: [],
        row: 1,
        must: false,//是否必填
      };
      this.dialogShow = true;
    },
    deleteQuestion(id) {
      this.$confirm('确认删除问题？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteQuestion({
          id: id
        })
          .then((response) => {
            if (response.data.code !== 200) {
              this.$message({
                message: response.data.msg,
                type: 'error'
              });
            } else {
              this.$message({
                message: "删除成功！",
                type: 'success'
              });
              this.getQuestions()
            }
          })
      })
    },
    addOption() {
      this.willAddQuestion.options.push({
        title: '',
        id: this.details.length,
      });
    },
    checkAddQuestion() {
      api.checkAddQuestion({
        form: this.willAddQuestion
      })
        .then((response) => {
          console.log(response)
          if (response.data.code !== 200) {
            this.$message({
              message: response.data.msg,
              type: 'error'
            });
          } else {
            this.$message({
              message: "添加成功！",
              type: 'success'
            });
          }
          this.getQuestions()
        })
      this.dialogShow = false;
    }
  },
  mounted() {
    this.getQuestions()
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
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.addOptionButton {
  display: inline-block;
  margin-left: 80px;
}
</style>