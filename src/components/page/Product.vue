<template  scope="scope">
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 商品管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input  placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitInfo">查询</el-button>
                </el-form-item>
                </el-form>
            </div>
        </div>

<div class="container">
          <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="_id"
      label="编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="pic"
      label="图标"
      width="120"
      >
      <template   slot-scope="scope">            
                    <img :src="scope.row.pic"  min-width="70" height="70" />
                 </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="fee"
      label="邮费"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="toProductEdit(scope)"
          type="text"
          size="small">
          修改
        </el-button>
        <el-button
          @click.native.prevent="deleteFun(scope)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
    </div>

    
</template>
<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
        mounted(){
            this.submitInfo();
        },
    methods: {
      editRow(index, rows) {
        rows.splice(index, 1);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      toProductEdit(scope){
        
        this.$router.push({path:'/productedit',query:{id: scope.row._id}})
      },


deleteFun(scope) {
      if (!scope.row._id) {
        this.tableData.splice(scope.$index, 1)
      } else {
        console.log(scope.row._id)
        this.$confirm('确认是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$http.post(this.global.serverPath+'/apiv1/productdelete', {id: scope.row._id}).then(res => {
              console.log(res.data)
                if (res.data === '1') {
                  this.$message.success('删除成功')
                  this.tableData=[];
                  this.submitInfo();
                } else {
                  this.$message.warning('删除失败')
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
},

      submitInfo: function () {
          var api=this.global.serverPath+'/apiv1/product';
          this.$http.get(api).then((response)=>{
            for(var i=0;i<response.body.length;i++){
              response.body[i].pic=this.global.serverPath+'/'+response.body[i].pic
              this.tableData.push(response.body[i]);
            }
          },function(err){
            console.log(err)
          })
        }

    },
  }
</script>