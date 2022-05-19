<template>
    <div class="homeContainer">
        <!-- 搜索框 -->
        <van-sticky>
            <div class="search">
                <div class="logoWrap">
                    <img src="../assets/images/logo.png" alt="">
                </div>
                <van-search placeholder="橘朵眼影" />
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
            <van-grid-item v-for="item in gridData" :key="item.src">
                <div class="my-grid-item">
                    <img :src="item.src" alt="">
                    <span class="text">{{ item.text }}</span>
                </div>
            </van-grid-item>
        </van-grid>

        <!-- 商品列表 -->
        <van-divider>推荐商品</van-divider>

        <div class="goodslist">
            <div class="item" v-for="item in goodsList" :key="item.id">
                <div class="imgWrap flex_c_c">
                    <img v-lazy="item.img_url" alt="">
                </div>
                <div class="title ellipsis_line_1">{{ item.title }}</div>
                <div class="footer">
                    <span class="price">&yen; {{ item.sell_price }}</span>
                    <span class="buy">{{ item.buy }} 购买</span>
                </div>
            </div>
        </div>

        <!-- backTop组件 -->
        <BackTop :scrollTop="300" />
    </div>

</template>

<script>
// 导入接口
import { fetchLunbo, fetchRecommendGoods } from '../api/home.js'

// 导入组件
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
            limit: 12,
            gridData: [
                { src: menu1, text: '喜淘超市' },
                { src: menu3, text: '喜淘生鲜' },
                { src: menu7, text: '领红包' },
                { src: menu5, text: '领津贴' },
                { src: menu2, text: '小新闻' },
                { src: menu4, text: '喜淘缴费' },
                { src: menu6, text: '签到领豆' },
                { src: menu8, text: '更多' },
            ],
            goodsList: [],
        }
    },
    created() {
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
        }
    },
    components: {
        BackTop,
    }
}
</script>

<style lang="scss" scoped>
.homeContainer {
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
            justify-content: content;
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

        .item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            width: 49%;
            background-color: #fff;
            padding: 6px;
            border-radius: 4px;
            margin-bottom: 6px;

            .imgWrap {
                height: 124px;
                overflow: hidden;
                width: 100%;

                img {
                    height: 100%;
                }
            }

            .title {
                padding: 10px 0;
                color: #000;
            }

            .footer {
                display: flex;
                justify-content: space-between;

                .price {
                    color: #ff4142;
                    font-size: 16px;
                    font-weight: 700;
                }

                .buy {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
}
</style> 