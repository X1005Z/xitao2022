<template>
    <div class="homeContainer">
        <!-- 搜索框 -->
        <van-sticky>
            <div class="search">
                <div class="logoWrap">
                    <img src="../assets/images/logo.png" alt="">
                </div>
                <van-search @focus="$router.push('/home/index/search')" placeholder="橘朵眼影" />
            </div>
        </van-sticky>

        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#ebe6e6">
            <van-swipe-item v-for="item in lunboData" :key="item.img">
                <img :src="item.img" alt="">
            </van-swipe-item>
        </van-swipe>

        <!-- 9宫格 -->
        <van-grid :column-num="4">
            <van-grid-item v-for="item in gridData" :key="item.src" :to="item.to">
                <div class="my-grid-item">
                    <img :src="item.src" alt="">
                    <span class="text">{{ item.text }}</span>
                </div>
            </van-grid-item>
        </van-grid>

        <!-- 商品列表 -->
        <van-divider>推荐商品</van-divider>
        <div class="goodslist">
            <Goods v-for="item in goodsList" :key="item.id" :data="item" @goodClick="clickHandle" />
        </div>

        <!-- backTop组件 -->
        <BackTop :scrollTop="200" />

        <!-- 显示子路由内容 -->
        <router-view></router-view>
    </div>

</template>

<script>
// 导入接口
// @ => /src, @api => /src/api
// import { fetchLunbo, fetchRecommendGoods } from '../api/home.js'
import { fetchLunbo, fetchRecommendGoods } from '@api/home'


// 导入组件
import Goods from '../components/Goods.vue'
import BackTop from '../components/BackTop.vue'
import menu1 from '../assets/images/1.png'
import menu2 from '../assets/images/2.png'
import menu3 from '../assets/images/3.png'
import menu4 from '../assets/images/4.png'
import menu5 from '../assets/images/5.png'
import menu6 from '../assets/images/6.png'
import menu7 from '../assets/images/7.png'
import menu8 from '../assets/images/8.png'

export default {
    name: 'Home',
    data() {
        return {
            lunboData: [],
            page: 1,
            limit: 10,
            gridData: [
                { src: menu1, text: '喜淘超市', to: "/goodslist" },
                { src: menu3, text: '喜淘生鲜', to: "/goodslist" },
                { src: menu7, text: '领红包', to: "/goodslist" },
                { src: menu5, text: '美妆好物', to: "/goodslist" },
                { src: menu2, text: '爆款', to: '/goodslist' },
                { src: menu4, text: '喜淘缴费', to: "/goodslist" },
                { src: menu6, text: '签到领豆', to: "/goodslist" },
                { src: menu8, text: '更多', to: "/goodslist" },
            ],
            goodsList: [],
        }
    },
    created() {
        // 初始化轮播图数据和推荐商品
        this._fetchLunbo();
        this._fetchRecommendGoods();
    },
    methods: {
        // 获取轮播图数据
        async _fetchLunbo() {
            let data = await fetchLunbo();
            this.lunboData = data.message;
        },

        // 获取推荐商品
        async _fetchRecommendGoods() {
            let { message } = await fetchRecommendGoods(this.page, this.limit);
            this.goodsList = message;
        },

        // 点击推荐商品跳转
        clickHandle({ data }) {
            // 跳转到商品详情页
            this.$router.push(`/goodsDetail/${data.id}`);
        }
    },
    components: {
        BackTop,
        Goods
    }
}
</script>

<style lang="scss" scoped>
.homeContainer {
    position: relative;
    padding-bottom: 50px;
    font-size: 14px;
    color: #666;

    .search {
        display: flex;

        .logoWrap {
            width: 50px;
            height: 54px;
            background: #fff;
            padding: 0px 3px;

            img {
                width: 100%;
                height: 100%;
                transform: scale(.8);
            }
        }

        .van-search {
            flex: 1
        }
    }

    .my-swipe {
        .van-swipe-item {
            height: 200px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .van-grid {
        .my-grid-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                width: 50%;
            }

            .text {
                margin-top: 6px;
            }
        }
    }

    .goodslist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background: rgba(234, 231, 231, 0.368627451);
    }
}
</style> 