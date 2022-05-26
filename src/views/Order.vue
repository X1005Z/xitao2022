<template>
    <div>
        <van-tabs v-model="active" @change="changeTab">
            <van-tab v-for="item in tabs" :key="item.text" :title="item.text">
                <van-card v-for="item in filterOrderGoods" :key="item.order_id"
                    @click="$router.push('/orderdetail/' + item.order_id)" :num="item.number" :price="item.total_price"
                    :title="item.goods[0].title" :thumb="item.goods[0].thumb_path">
                    <template #tags>
                        <div>
                            {{ item.pay_way }} <br />
                            下单时间： {{ item.add_time | timeFormat('YYYY-MM-DD HH:mm') }}
                        </div>
                    </template>
                    <template #footer>
                        <!-- status 0-未付款 1-已付款 2-已完成 默认0 -->
                        <van-button v-if="item.status === 0" size="mini" type="danger">立即付款</van-button>
                        <!-- is_out 0-未发货 1-已发货 默认0 -->
                        <van-button v-if="item.is_out === 1 && item.status == 1 && item.is_take == 0" size="mini" type="primary">物流信息</van-button>
                        <van-button v-if="item.is_out === 1" size="mini" type="primary" v-clipboard:copy="item.order_id"
                            v-clipboard:success="copy">复制订单号</van-button>
                        <template v-if="item.status === 2">
                            <van-button size="mini" type="info">已完成</van-button>
                            <van-button size="mini" type="warning">去评价</van-button>
                        </template>
                        <van-button v-if="item.status === 0" size="mini" @click.stop="callPhone" type="danger">客服
                        </van-button>
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
                { status: '2', text: "已完成" },
            ],
            allOrderGoods: [],
        }
    }, 
    created() {
        this._fetchUserOrder();
    },
    computed: {
        // 通过不同的订单状态status返回不同的订单
        filterOrderGoods() {
            // console.log(this.allOrderGoods);
            if (this.status === 'all') {
                return this.allOrderGoods;
            }

            // 筛选出对应的状态的订单
            return this.allOrderGoods.filter((item) => item.status == this.status)
        }
    },
    methods: {
        // 切换选修卡事件
        changeTab(index, text) {
            let statusMap = {
                '全部': 'all',
                '未付款': 0,
                '已付款': 1,
                '已完成': 2,
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
            console.log(allOrderGoods);
        },
        copy() {
            // 阻止事件冒泡（传播）
            event.stopPropagation();
            this.$toast('复制成功');
        },
        // 客服电话
        callPhone() {
            window.location.href = 'tel: 13433873149';
        }
    }
}
</script>

<style lang="scss" scoped>
</style>