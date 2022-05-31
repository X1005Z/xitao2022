<template>
    <div class="orderDetailContainer">
        <div class="status">
            <div class="text">{{ statusText }}</div>
            <img src="../assets/images/car2.png" alt="" width="80px">
        </div>
        <div class="addressWrap">
            <div class="address">
                <div class="location flex_c_c">
                    <van-icon name="location-o"></van-icon>
                </div>

                <!-- Vue2必须保证有一级属性的存在，才可以访问二级属性 -->
                <div v-if="orderInfo.address_info" class="info">
                    <div>
                        {{ orderInfo.address_info.name }}
                        {{ orderInfo.address_info.tel }} <br>
                        {{ orderInfo.address_info.province }}
                        {{ orderInfo.address_info.city }}
                        {{ orderInfo.address_info.country }}
                        {{ orderInfo.address_info.addressDetail }}
                    </div>
                </div>
                <!-- 分割线 -->
                <van-divider />
            </div>
        </div>

        <van-card v-for="item in goods" :key="item.id" :price="item.sell_price" :title="item.title"
            :thumb="item.thumb_path">
        </van-card>

        <!-- 订单一些基本信息 -->
        <div class="orderInfo">
            <div class="item">
                <span>下单时间</span>
                <span>{{ orderInfo.add_time | timeFormat('YYYY-MM-DD HH:mm') }}</span>
            </div>
            <div class="item">
                <span>商品总价</span>
                <span>&yen; {{ orderInfo.total_price }}</span>
            </div>
            <div class="item">
                <span>实付款</span>
                <span>&yen; {{ orderInfo.actual_price }}</span>
            </div>
            <div class="item">
                <span>付款方式</span>
                <span>{{ orderInfo.pay_way }}</span>
            </div>
            <div class="item">
                <span>运费险</span>
                <span>&yen; 0.00</span>
            </div>
            <div class="item">
                <span>订单号</span>
                <span>{{ orderInfo.order_id }}</span>
            </div>
        </div>

        <!-- 订单的一些操作按钮 -->
        <div class="btns">
            <van-button size="mini" v-if="orderInfo.status === 0" @click="pay" type="danger">立即付款</van-button>
            <van-button size="mini" v-if="orderInfo.is_out === 1" @click="showWuliu">查看物流</van-button>
            <van-button size="mini" v-if="orderInfo.is_out === 0 && orderInfo.status === 1" type="danger">提醒发货
            </van-button>
            <template v-if="orderInfo.status === 2">
                <van-button size="mini" type="info">已完成</van-button>
                <!-- <van-button size="mini" type="info">去评价</van-button> -->
            </template>
        </div>

        <!-- 物流信息 -->
        <van-popup v-model="isShow" position="bottom" :style="{ height: '60%' }">
            <!-- 目标收获地址  -->
            <div class="addressWrap">
                <div class="address">
                    <div class="location flex_c_c">
                        <van-icon name="location-o"></van-icon>
                    </div>
                    <div class="info" v-if="orderInfo.address_info">
                        <div>{{ orderInfo.address_info.name }} {{ orderInfo.address_info.tel }}</div>
                        <div>
                            {{ orderInfo.address_info.province }}{{ orderInfo.address_info.city }}{{
                                    orderInfo.address_info.addressDetail
                            }}
                        </div>
                    </div>
                    <!-- 分割线 -->
                    <van-divider />
                </div>
            </div>
            <van-steps direction="vertical" :active="0">
                <van-step v-for="item in wuliuData" :key="item.time">
                    <h3>{{ item.location }}</h3>
                    <p>{{ item.time }}</p>
                </van-step>
            </van-steps>
        </van-popup>
    </div>
</template>

<script>
import { fetchOrderDetail, fetchPayOrder, fetchWuliu } from '../api/order.js'
import { fetchCarGoods } from '../api/user.js'

export default {
    data() {
        return {
            // 接收订单id，query是接收查询字符串，是？后面的就是查询字符串；在/后面叫路由参数，用params
            order_id: this.$route.params.order_id,
            orderInfo: {},
            goods: [],
            isShow: false,
            wuliuData: [],
        }
    },
    computed: {
        // 订单状态提示
        statusText() {
            // status 0-未付款 1-已付款 2-已完成 默认0
            // is_out 0-未发货 1-已发货 默认0
            // is_take 0-未收货 1-已收货 默认0
            let { is_take, is_out, status } = this.orderInfo;
            // 已发货但未收到货
            if (is_out === 1 && is_take === 0) {
                return '你的宝贝正在运输中'
            }

            // 已经发货并且收到货
            if (status === 2) {
                return '订单已完成'
            }
        }
    },
    created() {
        this._fetchOrderDetail();
    },
    methods: {
        // 获取订单详情
        async _fetchOrderDetail() {
            let orderInfo = await fetchOrderDetail(this.order_id);
            this.orderInfo = orderInfo;

            // 继续获取订单关联的商品
            this._fetchCarGoods();
        },
        async _fetchCarGoods() {
            let { message } = await fetchCarGoods(this.orderInfo.goods_ids);
            this.goods = message;
        },
        pay() {
            // 付款接口
            this.$dialog.confirm({
                title: '付款',
                message: '确认支付吗',
            }).then(async () => {
                // 调用付款接口时，在真实业务中，强烈建议用try/catch去捕获异常
                try {
                    await fetchPayOrder(this.orderInfo.order_id);
                    // 支付成功提示
                    this.$toast.success({
                        message: '支付成功',
                        icon: 'wechat-pay'
                    });

                    // 修改订单、发货、收货状态
                    this.orderInfo.status = 2;
                    this.orderInfo.is_take = 1;
                    this.orderInfo.is_out = 1;
                } catch (err) {
                    // 支付异常
                }
            }).catch(() => {
                this.$toast("已取消支付");
            });
        },

        // 查看物流
        async showWuliu() {
            // 判断之前是否已经有物流信息
            if (this.wuliuData.length !== 0) {
                // 有物流信息
                this.isShow = true;
                return;
            }

            // 1.获取物流接口
            let wuliuData = await fetchWuliu();
            this.wuliuData = wuliuData;

            // 2.显示弹窗
            this.isShow = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.orderDetailContainer {

    .van-card {
        .van-card__thumb {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .status {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 120px;
        background-color: #fe5102;
        color: #f4d9be;
    }

    .addressWrap {
        .address {
            display: flex;
            align-items: center;
            padding: 10px 10px;
            background-color: #fff;
            border-radius: 6px;
            margin: 6px 0;

            .location {
                width: 30px;
                height: 30px;
                background: #f34a09;
                border-radius: 50%;
                padding-left: 20px;
                margin-right: 20px;
            }

            .van-icon {
                margin-right: 20px;
                color: #fff;
                font-size: 20px;
            }
        }
    }

    .orderInfo {
        padding: 2px 10px;

        .item {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #787373;
            margin: 5px 0;

            .copy {
                color: orangered;
            }
        }
    }

    .btns {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100vw;
        height: 60px;
        padding: 0 10px;
        box-shadow: 0 0 10px #ccc;
    }
}
</style>