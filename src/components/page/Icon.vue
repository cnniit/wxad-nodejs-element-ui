<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 商品管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

        <div>返回的值：{{ list. _id}}</div>
        <div>返回的值：{{ list. title}}</div>
        <div>返回的值：{{ list.price }}</div>
        <div>返回的值：{{ list.fee }}</div>
        <div v-html=' list. description'/></div>
        <div>返回的值：{{ list.pic }}</div>

    </div>

    
</template>
<script>
  export default {
        data() {
          return {
            list:[]
          }
        },
        mounted(){
            this.submitInfo();
        },
    methods: {
      submitInfo: function () {
          console.log('ll')
          var api='http://ent.npmjs.top/apiv1/';
          this.$http.get(api).then((response)=>{
            console.log(response.body);
            this.list = response.body[0];
          },function(err){
            console.log(err)
          })
        }

    },
  }
</script>