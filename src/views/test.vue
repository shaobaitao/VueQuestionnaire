<template>

  <el-row class="main">
    <el-col :span="4" class="col">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">

        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">饼状图</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">柱形图</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">圆环图</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20" class="col">
      <v-chart :options="option" autoresize="autoresize"/>
    </el-col>
  </el-row>

</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
export default {
  components: {
    'v-chart': ECharts
  },
  name: "Analysis",
  data() {
    return {
      option: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    test() {

    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.test()
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  /*min-width: 1000px;*/
}
.col{
  height: 100%;

}
.echarts {
  width: 100%;
  height: 100%;
}
/*.echarts {*/
/*  width: 500px;*/
/*  height: 500px;*/
/*}*/
</style>