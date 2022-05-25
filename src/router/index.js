import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from "../views/Home.vue"
import Shopcar from "../views/Shopcar.vue"
import User from "../views/User.vue"
import Index from "../views/Index.vue"
import Goodslist from "../views/Goodslist.vue"
import Order from "../views/Order.vue"
import Address from '../views/Address.vue'
import AddAddress from '../views/AddAddress.vue'
import EditAddress from '../views/EditAddress.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import Login from '../views/Login.vue'

import NProgress from 'Nprogress'  // esm

// 创建路由对象
const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home/index' },
        {
            path: '/home',
            component: Index,
            children: [{
                path: 'index',
                component: Home,
                meta: {
                    name: 'Home',
                    isMainPage: true
                }
            },
            {
                path: 'shopcar',
                component: Shopcar,
                meta: {
                    // title: '购物车',
                    name: 'Shopcar',
                    isMainPage: true,
                    requireAuth: true, // 此路由需要权限
                }
            },
            {
                path: 'user',
                component: User,
                meta: {
                    name: 'User',
                    isMainPage: true,
                    requireAuth: true, // 此路由需要权限
                }
            }
        ]
        },
        {
            path: '/goodslist',
            component: Goodslist,
            meta: {
                title: '商品列表',
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                title: '我的订单',
            }
        },
        {
            path: '/goodsdetail/:id',
            component: GoodsDetail,
            meta: {
                title: '商品详情'
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            path: '/address',
            component: Address,
            meta: {
                title: '地址管理',
                requireAuth: true,
            }
        },
        {
            path: '/addaddress',
            component: AddAddress,
            meta: {
                title: '添加地址',
                requireAuth: true,
            }
        },
        {
            path: '/editaddress/:addressInfo',
            component: EditAddress,
            meta: {
                title: '编辑地址',
                requireAuth: true,
            }
        },
    ]
})

import store from '../store/index.js'

NProgress.configure({
    showSpinner: false
})

router.beforeEach((to, from, next) => {
    // console.log(to.path); // 获取路由定义路径
    console.log(to.fullPath); // 获取完整得到路由（含参数）

    // 开启网页加载进度条
    NProgress.start();

    // 判断所访问的路由是否需要权限
    console.log('requireAuth:', to.path, ':', to.meta.requireAuth);
    if(to.meta.requireAuth) {
        // 需要权限，判断token
        let token = store.state.token;
        if(token) {
            next();
        } else {
            // 获取之前的上一次的访问页面，登录成功，便再回到之前的页面，体验更好点
            next({
                path:'/login?redirect=' + to.fullPath
            })
        }
    } else {
        // 不需要权限
        next();
    }
})

router.afterEach((to, from) => {
    // 关闭网页加载进度条
    NProgress.done();
})


// 导出
export default router;