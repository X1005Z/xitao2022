<template>
    <div>
        <van-tabs v-model="active" @change="changeTab">
            <van-tab v-for="item in tabs" :key="item.text" :title="item.text" >
                <van-card v-for="item in filterOrderGoods" :key="item.order_id" :num="item.number"
                    :price="item.total_price" :title="item.goods[0].title" :thumb="item.goods[0].thumb_path">
                    <template #tags>
                        <van-tag plain type="danger">标签</van-tag>
                        <van-tag plain type="danger">标签</van-tag>
                    </template>
                    <template #footer>
                        <van-button size="mini">按钮</van-button>
                        <van-button size="mini">按钮</van-button>
                    </template>
                </van-card>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { fetchUserOrder } from "../api/order.js"
import { fetchCarGoods } from "../api/user.js"
export default {
    data() {
        return {
            active: 0,
            status: 'all',
            tabs: [
                // 定义状态和响应文本
                { status: 'all', text: "全部" },
                { status: '0', text: "未付款" },
                { status: '1', text: "已付款" },
                { status: '2', text: "完成" },
            ],
            allOrderGoods: [],
        }
    },
    computed: {
        // 通过不同的订单状态status返回不同的订单
        filterOrderGoods() {
            console.log(this.allOrderGoods);
            if (this.status === 'all') {
                return this.allOrderGoods;
            }

            // 筛选出对应的状态的订单
            return this.allOrderGoods.filter((item) => item.status == this.status)
        }
    },
    created() {
        this._fetchUserOrder();
    },
    methods: {
        // 切换选修卡事件
        changeTab(index, text) {
            let statusMap = {
                '全部': 'all',
                '未付款': 0,
                '已付款': 1,
                '完成': 2,
            }
            let status = statusMap[text];
            this.status = status;
        },
        // 获取用户的订单
        async _fetchUserOrder() {
            let user_id = this.$store.state.userInfo.id;
            let allOrder = await fetchUserOrder(user_id);
            // 在接着获取订单关联的商品
            let promiseArr = [];
            allOrder.forEach(async (order) => {
                // 不要在循环里面写await ,这样是属于串行，耗性能
                promiseArr.push(fetchCarGoods(order.goods_ids))
            })
            // 并且获取订单商品,提高请求效率
            let allGoods = await Promise.all(promiseArr)

            const allOrderGoods = allOrder.map((order, index) => {
                // 额外添加goods,关联当前订单所有商品
                order.goods = allGoods[index].message;
                return order;
            })
            this.allOrderGoods = allOrderGoods
            console.log(allOrderGoods)

        }
    }
}
</script>

<style lang="scss" scoped>
</style>