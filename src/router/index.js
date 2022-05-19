import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from "../views/Home.vue"
import Shopcar from "../views/Shopcar.vue"
import User from "../views/User.vue"
import Index from "../views/Index.vue"
import Goodslist from "../views/Goodslist.vue"
import Order from "../views/Order.vue"
import GoodsDetail from '../views/GoodsDetail.vue'

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
                    name: 'Shopcar',
                    isMainPage: true,
                }
            },
            {
                path: 'user',
                component: User,
                meta: {
                    name: 'User',
                    isMainPage: true
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
                title: '我的订单'
            }
        },
        {
            path: '/goodsdetail/:id',
            component: GoodsDetail,
            meta: {
                title: '商品详情'
            }
        },
    ]
})

NProgress.configure({
    showSpinner: false
})

router.beforeEach((to,from,next) => {
    // 开启网页加载进度条
    NProgress.start();
    next();
})

router.afterEach((to,from) => {
    // 关闭网页加载进度条
    NProgress.done();
})


// 导出
export default router;