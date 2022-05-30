import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from "../views/Home.vue"
import Shopcar from "../views/Shopcar.vue"
import User from "../views/User.vue"
import Index from "../views/Index.vue"
import Search from '../views/Search.vue'
import SearchResult from '../views/SearchResult.vue'
import Goodslist from "../views/Goodslist.vue"
import Order from "../views/Order.vue"
import OrderDetail from '../views/OrderDetail.vue'
import Address from '../views/Address.vue'
import AddAddress from '../views/AddAddress.vue'
import EditAddress from '../views/EditAddress.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import NProgress from 'Nprogress'  // esm

// 创建路由对象
const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home/index' },
        {
            path: '/home',
            component: Index,
            children: [
                {
                    path: '/home/index',
                    component: Home,
                    meta: {
                        name: 'Home',
                        isMainPage: true,
                        isShowNavBar: false,
                    },

                    // 子路由匹配的内容要展示在父组件中的router-view中
                    children: [
                        {
                            path: 'search',
                            component: Search,
                            // name: 'Search',
                            meta: {
                                isMainPage: true,
                                isShowNavBar: false,
                            }
                        }
                    ]
                },
                {
                    path: 'shopcar',
                    component: Shopcar,
                    meta: {
                        title: '购物车',
                        name: 'Shopcar',
                        isMainPage: true,
                        requireAuth: true, // 此路由需要权限
                        isShowNavBar: true,
                    }
                },
                {
                    path: 'user',
                    component: User,
                    meta: {
                        name: 'User',
                        isMainPage: true,
                        requireAuth: true, // 此路由需要权限
                        isShowNavBar: false,
                    }
                }
            ]
        },
        {
            path: '/goodslist',
            component: Goodslist,
            meta: {
                title: '商品列表',
                isShowNavBar: true,
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                title: '我的订单',
                isShowNavBar: true,
            }
        },
        {
            path: '/goodsdetail/:id',
            component: GoodsDetail,
            meta: {
                title: '商品详情',
                requireAuth: true, // 此路由需要权限
                isShowNavBar: true,
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: '登录',
                isShowNavBar: true,
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                title: '注册',
                isShowNavBar: true,
            }
        },
        {
            path: '/address',
            component: Address,
            meta: {
                title: '地址管理',
                requireAuth: true,
                isShowNavBar: true,
            }
        },
        {
            path: '/addaddress',
            component: AddAddress,
            meta: {
                title: '添加地址',
                requireAuth: true,
                isShowNavBar: true,
            }
        },
        {
            path: '/editaddress/:addressInfo',
            component: EditAddress,
            meta: {
                title: '编辑地址',
                requireAuth: true,
                isShowNavBar: true,
            }
        },
        {
            path: '/orderDetail/:order_id',
            component: OrderDetail,
            meta: {
                title: '订单详情',
                requireAuth: true,
                isShowNavBar: true,
            }
        },
        {
            path: '/search-result/:keyword',
            component: SearchResult,
            meta: {
                title: '搜索结果',
                isShowNavBar: false
            }
        }
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
    if (to.meta.requireAuth) {
        // 需要权限，判断token
        let token = store.state.token;
        if (token) {
            next();
        } else {
            // 获取之前的上一次的访问页面，登录成功，便再回到之前的页面，体验更好点
            next({
                path: '/login?redirect=' + to.fullPath
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