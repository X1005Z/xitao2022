<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="goodslist">
                    <!-- :data="item" 是父通信子，@goodClick="foo"是子通信父 -->
                    <Goods v-for="item in lists" :key="item.id" :data="item" @goodClick="foo">
                        <template #footer>
                            <div class="footerArea">
                                <div class="price">
                                    <span class="sell_price">&yen; 2195</span>
                                    <span class="market_price">&yen; 2499</span>
                                </div>
                                <div class="info">
                                    <span class="hot">热卖中</span>
                                    <span class="remain">剩余100件</span>
                                </div>
                            </div>
                        </template>
                    </Goods>
                </div>
            </van-list>
        </van-pull-refresh>
        <!-- backTop组件 -->
        <BackTop :scrollTop="300" />
    </div>
</template>

<script>
// 导入api接口
import { fetchGoodsList } from '../api/goodslist.js'
import Goods from "../components/Goods.vue"
import BackTop from '../components/BackTop.vue'

export default {
    data() {
        return {
            page: 0,
            pagesize: 10,
            lists: [],
            loading: false, // 是否正在加载中...
            finished: false, // 是否已经加载完毕
            refreshing: false, // 是否正在刷新中
        };
    },
    methods: {
        // 上拉加载
        onLoad() {
            console.log('onLoad'); // 默认会执行一次
            this.page++;
            this._fetchGoodsList();
        },
        // 下拉刷新 -> onload
        onRefresh() {
            console.log('onRefresh');
            this.page = 0;
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将loading设置为true，表示处于加载状态
            this.loading = true;
            this.onLoad();
        },

        // 获取商品列表
        async _fetchGoodsList() {
            if(this.refreshing) {
                this.lists = [];
                this.refreshing = false;
            }
            const result = await fetchGoodsList(this.page, this.pagesize);
            this.loading = false; // 已经正在加载完毕了
            this.lists = [...this.lists, ...result.message];
            if(result.message.length === 0) {
                this.finished = true; // 已经把所有接口数据都加载完毕，再往上拉不会发送请求
            }
        },
        foo({data}) {
            // 跳转到商品详情页
            this.$router.push(`/goodsDetail/${data.id}`);
        }
    },
    components: {
        Goods,
        BackTop
    }
}
</script>

<style lang="scss" scoped>
    .goodslist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: rgba(234,231,231,0.368627451);

        .footerArea {
            .price {
                display: flex;
                justify-content: space-between;

                .sell_price {
                    color: #ff4142;
                    font-size: 16px;
                    font-weight: 700;
                }

                .market_price {
                    font-size: 12px;
                    color: #999;
                    text-decoration: line-through;
                }
            }

            .info {
                display: flex;
                justify-content: space-between;
                margin-top: 8px;
                color: #787272;
                font-size: 14px;
            }
        }
    }

</style>