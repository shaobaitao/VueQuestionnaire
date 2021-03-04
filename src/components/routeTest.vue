<template>
  <div>
  <p>{{id}}</p>
  <input type="button" value="走" @click="getAxios(id)">
  </div>
</template>

<script>
export default {
name: "routeTest",
  props: ['id'],
  methods:{
    getAxios(id){
      this.axios.post('api/getAnalysis.php', {
        id: id
      })
          .then((response) => {

            this.analysis = response.data
            // console.log(response.data)
          })
    }

  }

}
</script>

<style scoped>

</style>