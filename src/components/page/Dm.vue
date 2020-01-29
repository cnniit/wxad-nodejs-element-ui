<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 代码管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>代码列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<div class="container">
          <el-table
    :data="tableData"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="linkname"
      label="链接"
      width="120">
    </el-table-column>
    <el-table-column
      prop="cnzzdm"
      label="CNZZ"
      width="120">
    </el-table-column>
    <el-table-column
      prop="utq2"
      label="utq2"
      width="120">
    </el-table-column>
    <el-table-column
      prop="utq3"
      label="utq3"
      width="300">
    </el-table-column>
    <el-table-column
      prop="byjc"
      label="byjc"
      width="120">
    </el-table-column>
        <el-table-column
      prop="byzh"
      label="byzh"
      width="120">
    </el-table-column>
        <el-table-column
      prop="bPC"
      label="屏蔽"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="toDmEdit(scope)"
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
      toDmEdit(scope){
        
        this.$router.push({path:'/dmedit',query:{id: scope.row.id}})
      },


deleteFun(scope) {
      if (!scope.row.id) {
        this.tableData.splice(scope.$index, 1)
         console.log(scope.row.id)
      } else {
        console.log(scope.row.id)
        this.$confirm('确认是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$http.post('http://ent.npmjs.top/apiv1/dmdelete', {id: scope.row.id}).then(res => {
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
          var api='http://ent.npmjs.top/apiv1/dm';
          this.$http.get(api).then((response)=>{
            for(var i=0;i<response.body.length;i++){
              this.tableData.push(response.body[i]);
            }
          },function(err){
            console.log(err)
          })
        }

    },
  }
</script>