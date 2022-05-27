<template>
    <div class="search-result">
        <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="$router.back()">
        </van-search>

        <van-dropdown-menu v-if="goodsList.length > 0">
            <van-dropdown-item @change="change" v-model="sort" :options="options1"></van-dropdown-item>
        </van-dropdown-menu>

        <div class="goodslist">
            <Goods v-for="item in goodsList" :key="item.id" :data="item" @goodClick="goodClick"></Goods>
        </div>

        <van-empty v-if="goodsList.length === 0" description="暂无搜索结果"></van-empty>
    </div>
</template>

<script>
import { fetchSearchGoods } from '../api/home.js'
import Goods from '../components/Goods.vue'

export default {
    data() {
        return {
            keyword: this.$route.params.keyword,
            sort: 'buy', // 默认buy是排序的字段
            order: 'desc', // 默认降序
            options1: [
                { text: '销量', value: 'buy' },
                { text: '好评', value: 'likes' },
                { text: '价格', value: 'sell_price' },
            ],
            page: 1,
            pagesize: 10,
            goodsList: [],
        }
    },
    created() {
        this._fetchSearchGoods(),
            console.log('created', this.$route);
    },
    activated() {
        // 缓存被激活（可见）
        this.keyword = this.$route.params.keyword;
        this._fetchSearchGoods();
    },
    methods: {
        // 获取查询商品
        async _fetchSearchGoods() {
            let data = {
                value: this.keyword,
                sort: this.sort, // 默认buy是排序的字段
                order: this.order,
                page: this.page,
                pagesize: this.pagesize,
            }
            let goodsList = await fetchSearchGoods(data);
            this.goodsList = goodsList;
        },
        onSearch() {
            this._fetchSearchGoods();
        },
        change(value) {
            // 获取到搜索的字段
            this.sort = value; // 更改排序的字段
            this._fetchSearchGoods();
        },
        goodClick({ data: { id } }) {
            console.log(id);
            this.$router.push(`/goodsdetail/${id}`);
        }
    },
    components: {
        Goods
    }
}
</script>

<style lang="scss" scoped>
.search-result {
    height: 100vh;

    .goodslist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background: #f0eded;
        padding-top: 10px;
    }
}
</style>