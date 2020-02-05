<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 代码管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>代码增加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="推广链接">
                    <el-input v-model="form.linkname"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <p style="color:green">CNZZ代码样例: </p> <strong style="color:green"> &#60;&#115;&#99;&#114;&#105;&#112;&#116;&#32;&#116;&#121;&#112;&#101;&#61;&#34;&#116;&#101;&#120;&#116;&#47;&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#34;&#32;&#115;&#114;&#99;&#61;&#34;&#104;&#116;&#116;&#112;&#115;&#58;&#47;&#47;&#115;&#57;&#46;&#99;&#110;&#122;&#122;&#46;&#99;&#111;&#109;&#47;&#122;&#95;&#115;&#116;&#97;&#116;&#46;&#112;&#104;&#112;&#63;&#105;&#100;&#61;&#49;&#50;&#51;&#52;&#53;&#54;&#55;&#56;&#57;&#48;&#38;&#119;&#101;&#98;&#95;&#105;&#100;&#61;&#49;&#50;&#51;&#52;&#53;&#54;&#55;&#56;&#57;&#48;&#34;&#62;&#60;&#47;&#115;&#99;&#114;&#105;&#112;&#116;&#62;</strong>
                </el-form-item>
                <el-form-item label="CNZZ代码">
                    <el-input type="textarea" v-model="form.cnzzdm"></el-input>
                </el-form-item>
<el-row>
 <el-col :span="18">
        <div class="grid-content bg-purple" style="float: left">
          <td>
                        <el-form-item label="">
                         <p style="color:green">阿里·汇川代码样例： </p><strong style="color:green"> utq('track', 'Search', '123456');</strong>
                    </el-form-item>
          </td>
          </div>
 </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple" style="float: left">
          <td>
                        <el-form-item label="UC统计方式">
                        <el-input v-model="form.utq2"></el-input>
                    </el-form-item>
          </td>
          <td>
                        <el-form-item label="UC六位编码">
                        <el-input v-model="form.utq3"></el-input>
                    </el-form-item>
          </td>
      </div></el-col>
</el-row>
                <el-form-item label="">
                    <el-switch  v-model="functioValue" active-text="屏蔽PC" active-value="1"  inactive-text="不屏蔽PC"  inactive-value="0"  @change="change">
                    </el-switch>
                </el-form-item>
                <el-form-item label="备用基础代码">
                    <el-input type="textarea" v-model="form.byjc"></el-input>
                </el-form-item>
                <el-form-item label="备用转化代码">
                    <el-input type="textarea" v-model="form.byzh"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建</el-button>
                </el-form-item>
                </el-form>
            </div>
        </div>

    </div>

    
</template>
<script>
export default {
    data() {
        return {
            form: {
                linkname:'',
                cnzzdm:'',
                cnzztj:'',
                utq2:'',
                utq3:'',
                byjc:'',
                byzh:''
                //form里面的参数
            },
            param: '', //表单要提交的参数
            functioValue: '0'
        };
    },
    mounted() {
        this.param = new FormData();

    },
    methods: {
        //覆盖默认的上传行为
        httprequest() {},
        onSubmit() {
            //表单提交的事件
            // var names = this.form.name;
            //下面append的东西就会到form表单数据的fields中；
            var linkname = this.form.linkname
            if (!linkname.match(/^\w+$/) || /^[0-9]+$/.test(linkname)) {
                alert('只能输入数字、26个英文字母或者下划线组合')
                return
            }
            if(linkname == "" || linkname == null || linkname == undefined){ // "",null,undefined
                alert('推广链接名必须填写')
                return
            }
            this.param.append('linkname', this.form.linkname);
            this.param.append('cnzzdm', this.form.cnzzdm);
            this.param.append('cnzztj', this.form.cnzztj);
            this.param.append('utq2', this.form.utq2);
            this.param.append('utq3', this.form.utq3);
            this.param.append('byjc', this.form.byjc);
            this.param.append('byzh', this.form.byzh);
            this.param.append('bPC', this.functioValue);
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            //然后通过下面的方式把内容通过axios来传到后台
            //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
            this.$http.post(this.global.serverPath+'/apiv1/dmDoAdd', this.param, config).then(function(res) {
              if (res.data.code === 1) {
                  this.$message.success('添加成功')
                } else {
                  this.$message.warning('添加失败')
                }
                location.reload();
              })
              .catch(function(error) {
                console.log(error)
                this.$message.warning('添加失败')
                location.reload();
              })
        },
        change (val) {
            this.functioValue = val
        }
    }
};
</script>
