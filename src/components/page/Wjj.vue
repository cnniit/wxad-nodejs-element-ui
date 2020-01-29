<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 推广页管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>推广页生成</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="单个" name="first">
                <el-form ref="form" :model="form" label-width="180px">
                    <el-form-item label="源文件夹路径">
                        <el-select v-model="form.srcpath" placeholder="请选择" ref="srcpath">
                        <el-option label="测试推广页" value="/home/dist/testdir"></el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item label="新文件夹路径">
                        <el-input v-model="form.destdir" ref="destdir"></el-input>
                    </el-form-item>
                        <el-form-item label="新文件夹名">
                        <el-input v-model="form.newfilename" ref="newfilename"></el-input>
                    </el-form-item>             
                    <el-form-item>
                        <el-button type="primary" @click="bt_submit_onclick">重命名</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="多个" name="second">
                <el-form ref="form" :model="form" label-width="180px">
                    <el-form-item label="源文件夹路径">
                        <el-select v-model="form.srcpath3" placeholder="请选择" ref="srcpath3">
                        <el-option label="测试推广页" value="/home/dist/testdir"></el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item label="新文件夹路径">
                        <el-input v-model="form.destdir" ></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" @click="addrow">新增一个</el-button>
                    </el-form-item>     
                    <el-form-item label="新文件夹名">
                        <table>
                            <tr>
                                <td ><input class="el-input__inner" type="text"  name="links[]" autocomplete="off"  style="width:400px" ref="td"></td>
                                <td><input type="hidden" name="links" ref="links"></td>
                            </tr>
                        </table>
                    </el-form-item>        
                    <el-form-item>
                        <el-button type="primary"   @click="deleterow">删除一个</el-button>
                        <el-button @click="bt2_submit_onclick">全部重命名</el-button>
                    </el-form-item>
                </el-form>

            </el-tab-pane>
            <el-tab-pane label="索引方式" name="third">
                <el-form  ref="form" :model="form" label-width="180px">
                    <el-form-item label="源文件夹路径">
                        <el-select v-model="form.srcpath4" placeholder="请选择" ref="srcpath4">
                        <el-option label="测试推广页" value="/home/dist/testdir"></el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item label="新文件夹路径">
                        <el-input v-model="form.destdir" ref="destdir"></el-input>
                    </el-form-item>
<el-row>
      <el-col :span="18">
        <div class="grid-content bg-purple" style="float: left">
          <td>
                        <el-form-item label="文件夹序号从">
                        <el-input v-model="form.fromindex" ref="fromindex"></el-input>
                    </el-form-item>
          </td>
          <td>
                        <el-form-item label="文件夹序号到">
                        <el-input v-model="form.toindex" ref="toindex"></el-input>
                    </el-form-item>
          </td>
      </div></el-col>
</el-row>
                    <el-form-item>
                        <el-button type="primary" @click="bt3_submit_onclick">全部重命名</el-button>
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
        activeName: 'second',
        form: {
          srcpath: '',
          destdir: '',
          newfilename: '',

          srcpath3:'',
          links:[],

        },
        msg2:''
      };
    },
    methods: {

        onSubmit(){

        },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      bt_submit_onclick(){
          var obj2 = this.$refs.srcpath.value;
          var obj = this.$refs.newfilename.value;
        if(obj== "undefined" || obj == null || obj == ""||obj2== "undefined" || obj2 == null || obj2 == ""){
            return false;
        }else{
            var formData={
                srcpath:obj2,
                destdir:this.$refs.destdir.value,
                newfilename:obj
            }
            // document.getElementsByTagName('form')[0].submit();
            this.$http.post('http://ent.npmjs.top/apiv1/singlern', formData).then(res => {
                if (res.data !== '') {
                  this.$message.success(`重命名${res.data}成功`)
                } else {
                  this.$message.warning('重命名失败')
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

     bt2_submit_onclick(){
         
        var links = document.getElementsByName('links[]');
        var obj3 = this.$refs.srcpath3.value;
        var tmpvals=[];
        for(var i=0;i<links.length;i++)
        {
            var obj = links[i].value;
            if(obj== "undefined" || obj == null || obj == ""){
                continue;
            }
            tmpvals.push(obj)
            
        }
        
        if(obj3== "undefined" || obj3 == null || obj3 == ""){
            alert('Please fill in all the blanks！')
                return false;
        }
        this.$refs.links.value = JSON.stringify(tmpvals)
            var formData={
                srcpath:obj3,
                destdir:this.$refs.destdir.value,
                links:tmpvals
            }
        // document.getElementsByTagName('form')[1].submit();
            this.$http.post('http://ent.npmjs.top/apiv1/multirn', formData).then(res => {
                if (res.data.length > 0) {
                    res.data.forEach((k,i) => {
                        this.msg2+=k.link+' '
                    });
                    this.$message.success(`重命名${this.msg2}成功`)
                    this.msg2=''
                } else {
                  this.$message.warning('重命名失败')
                }
          }).catch(function(error) {
                console.log(error)
              })
    },
     bt3_submit_onclick(){
        var obj2 = this.$refs.srcpath4.value;
        var fromindex =  this.$refs.fromindex.value;
        var toindex =  this.$refs.toindex.value;
        if(fromindex>toindex){
            return false;
        }
        if(obj2== "undefined" || obj2 == null || obj2 == ""
        ||fromindex== "undefined" || fromindex == null || fromindex == ""||toindex== "undefined" || toindex == null || toindex == ""){
            return false;
        }else{
            var formData={
                srcpath:obj2,
                destdir:this.$refs.destdir.value,
                fromindex,
                toindex
            }
            // document.getElementsByTagName('form')[2].submit();
            this.$http.post('http://ent.npmjs.top/apiv1/indexrn', formData).then(res => {
                if (res.data.code == 1) {
                    this.$message.success(`重命名${res.data.tpl}成功`)
                } else {
                  this.$message.warning(`重命名${res.data.tpl}失败`)
                }
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