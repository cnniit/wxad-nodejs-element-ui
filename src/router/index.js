import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                //#1
                {
                    path: '/product',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Product.vue'),
                    meta: { title: '商品列表' }
                },
                {
                    path: '/productadd',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/ProductAdd.vue'),
                    meta: { title: '增加商品' }
                },                
                {
                    path: '/productedit',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/ProductEdit.vue'),
                    meta: { title: '增加商品' }
                },
                //#2
                {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/User.vue'),
                    meta: { title: '用户列表' , permission: true}
                },
                {
                    path: '/useradd',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/UserAdd.vue'),
                    meta: { title: '用户增加' , permission: true}
                },
                //#3
                {
                    path: '/wjj',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Wjj.vue'),
                    meta: { title: '拷贝/命名', permission: true}
                },
                //#4
                {
                    path: '/jc',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Jc.vue'),
                    meta: { title: '建代码表', permission: true}
                },
                //#5
                {
                    path: '/dm',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Dm.vue'),
                    meta: { title: '代码列表' , permission: true}
                },
                {
                    path: '/dmadd',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/DmAdd.vue'),
                    meta: { title: '增加代码', permission: true }
                },
                {
                    path: '/dmedit',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/DmEdit.vue'),
                    meta: { title: '修改代码', permission: true }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
