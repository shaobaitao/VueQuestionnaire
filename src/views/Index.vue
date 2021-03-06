<template>
  <div id="index_div">
    <Topbar></Topbar>
    <div id="main">
      <h1>Vue+PHP问卷系统</h1>
      <el-button type="danger" round @click="toLogin">开始使用</el-button>
    </div>
  </div>

</template>

<script>
import Topbar from "../components/Topbar";
export default {
name: "Index",
  components:{
    Topbar
  },
  methods:{
    toLogin(){
      this.axios.post('http://vue.shaobaitao.cn/api/login_check.php')
          .then((response) => {
            if (response.data.code === 1) {
              this.$router.push({path:'/home'})
            }else {
              this.$router.push({path:'/login'})
            }
          })

    },

  }
}

</script>

<style scoped>
  #index_div{
    height: 100%;
    width: 100%;
    min-width: 1000px;
    /*background-image: url("https://s3.ax1x.com/2020/12/26/rhgO61.jpg");*/
    background-image: url("../assets/bg.jpg");

    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  #main{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

  }
  h1{
    margin-bottom: 30px;
    color: #ce5e8a;
  }
  .el-button{
    background: #ce5e8a;
    border-color: #ce5e8a;
    color:aliceblue;
    border-radius: 50px;
  }
  .el-button:hover{
    background: #F56C6C;
    border-color: #F56C6C;

  }
</style>