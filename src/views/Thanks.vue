<template>
  <div class="main">
    <el-button class="checkBtn" type="success" icon="el-icon-check" circle></el-button>
    <h3>感谢参与问卷!</h3>
  </div>
</template>

<script>
export default {
name: "Thanks"
}
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .checkBtn{
    height: 100px;
    width: 100px;
    font-size: 50px;
    margin: 30px;
  }
</style>