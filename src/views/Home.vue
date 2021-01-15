<template>
  <div class="home_div">
    <Topbar></Topbar>
    <div class="form_div">
      <div class="top_div">
        <h2>问卷列表</h2>
        <el-button type="primary" icon="el-icon-plus" @click="dialogShow=true">创建问卷</el-button>
      </div>
      <div class="form_item" v-for="(item,index) in formData" :key="index">
        <div class="item-top">
          <div class="pull_left">
            <p class="pull_left" @click="jumpToForm(item.exam_id)">{{ item.exam_name }}</p>
          </div>
          <div class="pull_right">
            <p class="pull_right item_id">问卷id:{{ item.exam_id }}</p>
            <p class="pull_right item_state">未发布</p>
            <p class="pull_right item_sheet">答卷:0</p>
            <p class="pull_right item_date">创建时间:{{ item.exam_starttime }}</p>
          </div>
        </div>
        <div class="item-bottom">
          <div class="process-box pull-left">
            <el-link type="primary" icon="el-icon-view" @click="jumpToForm(item.exam_id)">查看问卷</el-link>
            <el-link type="primary" icon="el-icon-edit" @click="designForm(item.exam_id)">问卷设计</el-link>
            <el-link type="primary" icon="el-icon-s-promotion" @click="sendForm(item.exam_id)">发送问卷</el-link>
            <el-link type="primary" icon="el-icon-s-data" @click="analysisForm(item.exam_id)">成绩&数据</el-link>
          </div>
          <div class="operation-box pull-right">
            <el-button type="primary" icon="el-icon-video-play" @click="publish">发布</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteWj(item.exam_id)">删除</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="添加问卷" :visible.sync="dialogShow" class="dialog">
      <el-form ref="form" :model="addWjContent" label-width="160px">
        <el-form-item label="问卷标题" style="width: 100%;" required>
          <el-input v-model="addWjContent.title" placeholder="请输入问卷标题"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" style="width: 100%;">
          <el-date-picker
              v-model="addWjContent.startDate"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" style="width: 100%;">
          <el-date-picker
              v-model="addWjContent.endDate"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="问卷描述" style="width: 100%;">
          <el-input v-model="addWjContent.desc" type="textarea" placeholder="请输入问卷描述" rows="5"></el-input>
        </el-form-item>
      </el-form>
      <div style="width: 100%;text-align: right">
        <el-button style="margin-left: 10px;" @click="dialogShow=false">取消</el-button>
        <el-button type="primary" style="margin-left: 10px;" @click="addWj">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
        title="发送问卷"
        :visible.sync="sendFormSign"
        width="30%"
    >

      <el-input v-model="sendURL" ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button v-clipboard:copy="sendURL"  v-clipboard:success="clipboardSuccessHandler">复制</el-button>
        <el-button type="primary" @click="sendFormSign = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Topbar from "../components/Topbar";

export default {
  name: "Home.vue",
  components: {
    Topbar
  },
  data() {
    return {
      sendURL: '',
      isLogin: false,
      formData: [],
      dialogShow: false,
      sendFormSign: false,
      addWjContent: {
        id: 0,
        title: '',
        flag: 0,
        desc: '感谢参加本次问卷调查！',
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      },
    }
  },
  methods: {
    LoginCheck() {
      this.axios.post('api/login_check.php')
          .then((response) => {
            if (response.data.code === 1) {
              this.isLogin = true
              this.getFormData()
            }
          })
    },
    publish(){
      this.$message({
        message:"目前开发版所有问卷默认为发布状态",
        type:"warning"
      })
    },
    getFormData() {
      this.axios.post('api/getFormData.php',
          {},
          {
            withCredentials: true
          }
      )
          .then((response) => {
            this.formData = response.data
          });
    },
    jumpToForm(id) {
      const {href} = this.$router.resolve({
        path: '/questionnaire/' + id,
        // params: { id: 0 }
      });
      window.open(href, '_blank');
      // this.$router.push('/questionnaire/' + id)
    },
    designForm(id) {
      const {href} = this.$router.resolve({
        path: '/design/' + id,
        // params: { id: 0 }
      });
      window.open(href, '_blank');
      // this.$router.push('/questionnaire/' + id)
    },
    analysisForm(id) {
      const {href} = this.$router.resolve({
        path: '/analysis/' + id,
        // params: { id: 0 }
      });
      window.open(href, '_blank');
      // this.$router.push('/questionnaire/' + id)
    },
    addWj() {
      if (this.addWjContent.title === '') {
        this.$message({
          type: 'error',
          message: '标题不能为空!'
        });
        return
      }
      //moment组件可以解决axios发送date数据时时区会自动转到UTC+0的问题
      const moment = require('moment')
      this.addWjContent.startDate = moment(this.addWjContent.startDate).format('YYYY-MM-DD HH:mm:ss')
      this.addWjContent.endDate = moment(this.addWjContent.endDate).format('YYYY-MM-DD HH:mm:ss')
      this.axios.post('api/createForm.php',
          {
            form: this.addWjContent
          })
          .then((response) => {
            if (response.data.code === 200) {
              this.$message({
                message: "问卷创建成功！",
                type: 'success'
              });
            }
            this.getFormData()
          })
      this.dialogShow = false
    },
    deleteWj(wjId) {
      this.$confirm('确认删除问卷？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post('api/deleteForm.php',
            {
              id: wjId
            })
            .then((response) => {
              if (response.data.code === 200) {
                this.$message({
                  message: "问卷删除成功！",
                  type: 'success'
                });
              }
              this.getFormData()
            })
      })

    },
    sendForm(wjId) {
      this.sendURL = window.location.origin + "/#/questionnaire/" + wjId;
      this.sendFormSign=true
      // console.log(window.location.origin + "/#/questionnaire/" + wjId)
    },
    clipboardSuccessHandler (){
      this.$message.success("已复制");
    },
  },
  mounted() {
    this.getFormData()
  }


}
</script>

<style scoped>
.home_div {
  background-color: rgba(247, 247, 247, 1);
  height: 100%;
  width: 100%;

}

.form_div {
  padding-top: 60px;
  width: 100%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.form_item {
  width: 70%;
  height: 100px;

  margin: 20px;
  background-color: #ffffff;
  border: 1px solid #E6E6E6;
  box-shadow: 0 0 4px 0 #F0F0F0;
}

.item-top {
  height: 40px;
  padding: 0 30px;

}

.pull_left {
  height: 100%;
  display: flex;
  align-items: center;
  float: left;

}

.pull_left p {
  color: #262626;
  font-size: 22px;
}

.pull_right {
  height: 100%;
  width: 400px;
  display: flex;
  align-items: center;
  float: right;
  justify-content: center;


}

.pull_right p {
  color: #262626;
  font-size: 14px;
}

.item-bottom {
  height: 60px;
  padding: 0 30px;
  border-top: solid 1px #f5f5f5;;
}

.process-box {
  float: left;
  height: 100%;
  width: 50%;
  min-width: 330px;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.operation-box {
  float: right;
  height: 100%;
  width: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.top_div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: 20px;
}
</style>