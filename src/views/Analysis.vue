<template>
  <div class="main">
    <el-card class="box-card" v-for="(item,index) in analysis" :key="index">
      <div slot="header" class="clearfix">
        <span>第{{ parseInt(index) + 1 }}题:{{ item.qTitle }}</span>
        <span style="color: #F56C6C; font-size: 14px">{{ returnType(item.type) }}</span>

      </div>
      <el-table
          :data="item.options"
          stripe
          :summary-method="getSummaries"
          show-summary="show-summary"
          :default-sort="{prop: 'count', order: 'descending'}"
          fit="fit"
          style="width: 100%">
        <el-table-column
            prop="option"
            label="选项">
        </el-table-column>
        <el-table-column
            prop="count"
            label="计数">
        </el-table-column>
        <el-table-column
            :formatter="percentFormatter"
            label="比例">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

// import {getAnalysis} from "@/request/api";

export default {

  name: "Analysis",
  data() {
    return {
      analysis: [],
    }
  },
  methods: {
    getAnalysis() {
      console.log(this.$route.params.id)
      // getAnalysis({
      //   id: this.$route.params.id
      // })
      this.axios.post('api/getAnalysis.php', {
        id: this.$route.params.id
      })
          .then((response) => {
            this.analysis = response.data
            // console.log(response.data)

          })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    returnType(type) {
      switch (type) {
        case 'radio':
          return "【单选题】";
        case 'checkbox':
          return "【多选题】";
        case 'text':
          return "【填空题】";
      }
    },
    getSummaries(param) {
      const {columns} = param;
      // console.log(data)
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 2) {
          sums[index] = '';
          return;
        }
        if (index === 1) {
          sums[index] = this.analysis[0].submits;
        } else {
          sums[index] = '总计';
        }
      });
      // console.log(sums)
      return sums;
    },
    percentFormatter(row) {
      return row.percent + '%'
    }
  },

  mounted() {
    this.getAnalysis()
  }
}
</script>

<style scoped>

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.box-card {
  width: 700px;
  margin: 20px;
}

@media screen and (max-width: 1000px) {
  .box-card {
    width: 100%;
  }
}

</style>