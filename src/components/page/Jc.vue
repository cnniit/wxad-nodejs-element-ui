<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 基础管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>建表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单个" name="first">
                <el-form ref="form" :model="form" label-width="180px">
                    <el-form-item label="表名">
                        <el-input v-model="form.table_name" ref="table_name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="bt_submit_onclick">生成</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="多个" name="second">
                <el-form  ref="form" :model="form" label-width="180px">
                    <el-form-item label="前缀">
                        <el-input v-model="form.prefix_name" ref="prefix_name"></el-input>
                    </el-form-item>
<el-row>
      <el-col :span="18">
        <div class="grid-content bg-purple" style="float: left">
          <td>
                        <el-form-item label="序号从">
                        <el-input v-model="form.fromindex" ref="fromindex"></el-input>
                    </el-form-item>
          </td>
          <td>
                        <el-form-item label="序号到">
                        <el-input v-model="form.toindex" ref="toindex"></el-input>
                    </el-form-item>
          </td>
      </div></el-col>
</el-row>
                    <el-form-item>
                        <el-button type="primary" @click="bt3_submit_onclick">生成</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        </div>
    </div>

    
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        form: {
          srcpath: '',
          destdir: '',
          newfilename: '',

          srcpath3:'',
          links:[],

        },
        msg2:'',
        msg3:''
      };
    },
    methods: {

        onSubmit(){

        },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      bt_submit_onclick(){
          var obj = this.$refs.table_name.value;
           if (!obj.match(/^\w+$/) || /^[0-9]+$/.test(obj)) {
                alert('只能输入数字、26个英文字母或者下划线')
                return
           }
        if(obj== "undefined" || obj == null || obj == ""){
            return false;
        }else{
            var formData={
                table_name:obj,
            }
            // document.getElementsByTagName('form')[0].submit();
            this.$http.post(this.global.serverPath+'/apiv1/singlecr', formData).then(res => {
                if (res.data.code) {
                  this.$message.success(`生成${res.data.tpl}成功`)
                } else {
                  this.$message.warning('生成失败')
                }
          }).catch(function(error) {
                console.log(error)
              })

        }
    },
     addrow(){
        var obj = this.$refs.td;
        var tr=obj.parentNode.parentNode;//obj.parentNode.parentNode是<tr>
        var table=tr.parentNode; //tr.parentNode是<table>
        var y=table.rows.length;
        var oldRow=tr;
        
        if(oldRow){
            var newRow=oldRow.cloneNode(true); //拷贝一行项到另外一行
            newRow.setAttribute("id","y-1");
            }
            table.appendChild(newRow);	//把克隆的一行添加到table
    },

    deleterow()
    {
        var obj = this.$refs.td;
        var tr=obj.parentNode.parentNode;//obj.parentNode.parentNode是<tr>
        var table=tr.parentNode; //tr.parentNode是<table>
        var long=table.rows.length;
        //获取table中tr的个数，我的想保留6行，当大于6时可以删除，小于6时不能删除
            if(long>1){
        //判断一下table中tr的个数
            var oTab = table.lastChild.remove();
        //删除table中的最后一个tr
            }else{
                alert("不能再删除了！")
            }


    },

     bt3_submit_onclick(){
        var obj2 = this.$refs.prefix_name.value;
        var fromindex =  this.$refs.fromindex.value;
        var toindex =  this.$refs.toindex.value;
        if (!obj2.match(/^\w+$/) || /^[0-9]+$/.test(obj2)) {
                alert('只能输入数字、26个英文字母或者下划线组合')
                return
        }
        if (!fromindex.match(/^[0-9]*$/) || !toindex.match(/^[0-9]*$/)) {
                alert('只能输入数字')
                return
        }
        if(fromindex>toindex){
            return false;
        }
        if(obj2== "undefined" || obj2 == null || obj2 == ""
        ||fromindex== "undefined" || fromindex == null || fromindex == ""||toindex== "undefined" || toindex == null || toindex == ""){
            return false;
        }else{
            var formData={
                prefix_name:obj2,
                fromindex,
                toindex
            }
            // document.getElementsByTagName('form')[2].submit();
            this.$http.post(this.global.serverPath+'/apiv1/multicr', formData).then(res => {
                res.data.forEach((k,i) => {
                        if(res.data[i].code == 1){
                             this.msg2+=`重命名`+res.data[i].tpl+'成功<br>'
                            this.$message({
                            dangerouslyUseHTMLString: true,
                            message: this.msg2,
                            type: 'success'
                    });
                        }else{
                             this.msg3+=`重命名`+res.data[i].tpl+'失败<br>'
                            this.$message({
                            dangerouslyUseHTMLString: true,
                            message: this.msg3,
                            type: 'warning'
                    });
                        }
                    });
                    this.msg3=''
                    this.msg2=''
          }).catch(function(error) {
                console.log(error)
              })
        }
    },
     bt4_submit_onclick(){
        location.href="testmaxdir.php";
        
    }
    }
  };
</script>