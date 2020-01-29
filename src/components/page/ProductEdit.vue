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
            <el-row>
                <el-col :span="14" :offset="2">
                    <div id="upload">
                        

                        <!--elementui的form组件-->
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="商品名称" label-width="80px">
                                <el-input v-model="form.title" style="width:360px;"></el-input>
                            </el-form-item>
                            <label class="el-form-item__label" style="width: 80px;">上传图片</label>
                            <!--elementui的上传图片的upload组件-->
                            <el-upload
                                class="upload-demo"
                                :before-upload="beforeupload"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                style="margin-left:80px;"
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">
                                    将文件拖到此处，或
                                    <em>点击上传</em>
                                </div>
                                <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                            </el-upload>
                            <el-form-item label="商品价格">
                                <el-input v-model="form.price"></el-input>
                            </el-form-item>
                            <el-form-item label="商品邮费">
                                <el-input v-model="form.fee"></el-input>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <el-input type="textarea" v-model="form.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">立即修改</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>

                <!--展示选中图片的区域-->
                <el-col :span="4">
                    <div style="width:100%;overflow: hidden;margin-left:150px;">
                        <img :src="src" alt style="width:100%;" />
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id:'',
            form: {
                //form里面的参数
            },
            param: '', //表单要提交的参数
            src: 'https://afp.alicdn.com/afp-creative/creative/u124884735/14945f2171400c10764ab8f3468470e4.jpg' //展示图片的地址
        };
    },
    created(){
        this.id = this.$route.query.id;
    },
    mounted() {
        this.param = new FormData();
              this.$http.post('http://ent.npmjs.top/apiv1/productedit', {id:this.id}).then(function(res) {
                this.form=res.data
                this.src='http://ent.npmjs.top/'+res.data.pic
              }).catch((e) => {})
    },
    methods: {
        beforeRemove(file, fileList) {
            //return this.$confirm(`确定移除 ${ file.name }？`);
        },
        //阻止upload的自己上传，进行再操作
        beforeupload(file) {
            console.log(file);
            //创建临时的路径来展示图片
            var windowURL = window.URL || window.webkitURL;

            this.src = windowURL.createObjectURL(file);
            //重新写一个表单上传的方法

            this.param.append('pic', file, file.name);
            return false;
        },
        //覆盖默认的上传行为
        httprequest() {},
        onSubmit() {
            //表单提交的事件
            // var names = this.form.name;
            //下面append的东西就会到form表单数据的fields中；
            this.param.append('_id', this.id);
            this.param.append('title', this.form.title);
            this.param.append('price', this.form.price);
            this.param.append('fee', this.form.fee);
            this.param.append('description', this.form.description);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            //然后通过下面的方式把内容通过axios来传到后台
            //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
            this.$http.post('http://ent.npmjs.top/apiv1/productDoEdit', this.param, config).then(function(res) {

              if (res.data === '1') {
                  this.$message.success('修改成功')
                  this.form = {}
                  this.src=''
                } else {
                  this.$message.warning('修改失败')
                }
              })
              .catch(function(error) {
                console.log(error)
              })
        }
    }
};
</script>