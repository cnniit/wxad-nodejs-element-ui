<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 商品管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>商品增加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="推广链接">
                    <el-input v-model="form.linkname" disabled="edit"></el-input>
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
                <el-form-item >
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
                    <el-button type="primary" @click="onSubmit">修改</el-button>
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
            edit: true,
            id:'',
            form: {
                //form里面的参数
            },
            param: '', //表单要提交的参数
            functioValue: '0'
        };
    },
    created(){
        this.id = this.$route.query.id;

    },
    mounted() {

        this.param = new FormData();
              this.$http.post('http://ent.npmjs.top/apiv1/dmedit', {id:this.id}).then(function(res) {
                    this.form = res.body
                    this.functioValue = res.data.bPC
              }).catch((e) => {})
    },
    methods: {
        //覆盖默认的上传行为
        httprequest() {},
        onSubmit() {
            //表单提交的事件
            // var names = this.form.name;
            //下面append的东西就会到form表单数据的fields中；
            this.param.append('id', this.id);
            this.param.append('linkname', this.form.linkname);
            this.param.append('cnzzdm', this.form.cnzzdm);
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
            this.$http.post('http://ent.npmjs.top/apiv1/dmDoEdit', this.param, config).then(function(res) {

              if (res.data === '1') {
                  this.$message.success('修改成功')
                  location.reload();
                } else {
                  this.$message.warning('修改失败')
                  location.reload();
                }
              })
              .catch(function(error) {
                console.log(error)
              })
        },
        change (val) {
            this.functioValue = val
        }
    }
};
</script>
