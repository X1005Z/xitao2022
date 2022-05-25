<template>
    <div class="cartContainer">
        <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="$router.back()" />

        <!-- 有收货地址 -->
        <div v-if="carData.length" class="addressWrap">
            <div v-if="hasAddress" class="address">
                <van-icon name="location-o" />
                <div class="info">
                    <div>{{ address.name }}    {{ address.tel }}   邮编: {{ address.postalCode }}</div>
                    <div>{{ address.province }} {{ address.city }} {{ address.country }} {{ address.addressDetail }}
                    </div>
                </div>
            </div>
            <!-- 无设置收货地址 -->
            <van-button v-else block type="info" @click="$router.push('/addaddress')" plain>添加地址</van-button>
        </div>

        <!-- 商品列表 -->
        <div class="cartlist">
            <div class="item" v-for="(item, index) in  carData" :key="item.id">
                <van-checkbox class="icon" @click="checkBoxChange(item.id, $store.getters.getGoodsStatusById[item.id])"
                    v-model="$store.getters.getGoodsStatusById[item.id]" icon-size='20px' checked-color='#ee0a24' />
                <!-- 图片 -->
                <div class="imgWrap">
                    <img :src="item.thumb_path" alt="">
                </div>
                <!-- 价格、内容、删除按钮 -->
                <div class="info">
                    <div class="title">{{ item.title }}</div>
                    <div class="area">
                        <div class="price">&yen; {{ item.sell_price }}</div>
                        <van-stepper @change="numberChange($event, item.id)"
                            v-model="$store.getters.getGoodsNumberById[item.id]" theme="round" button-size="22"
                            disable-input />
                    </div>
                    <van-button type="danger" @click="delCartGoods(item.id, index)">删除</van-button>
                </div>
            </div>
        </div>

        <!-- 没有购物车商品时展示 -->
        <div class="emptyCar" v-if="carData.length === 0">
            <van-empty class="custom-image" :image="emptyCar" description="购物车空空如也！快去下个单吧">
                <van-button @click="$router.replace('/home/index')" type="danger" class="bottom-button">去首页</van-button>
            </van-empty>
        </div>

        <!-- 订单支付 -->
        <van-submit-bar :disabled="isDisabled" :price="$store.getters.getTotalPrice" button-text="提交订单">
            <template #tip>仅支持微信支付</template>
            <template #default>共选中 {{ $store.getters.getCarSelectedTotalNumber }} 件</template>
        </van-submit-bar>
    </div>
</template>

<script>
// 引入图片
import emptyCar from '../assets/images/car.png'
import { fetchCartGoods } from '../api/shopcar.js'
import { fetchUserAddress } from '../api/user'

export default {
    data() {
        return {
            emptyCar,
            carData: [],
            ids: this.$store.getters.getCarGoodsIds,
            address: {}, // 收获地址
            hasAddress: false, // 记录是否有地址
        }
    },
    computed: {
        isDisabled() {
            console.log(this.$store.state.carData);
            // // 1. 只要含有一个或以上选中 则 返回 false(可用)
            // // 2. 或 只有全部都为false 则 返回 true(禁用用)， 否则返回false(可用)
            // let isDisabled = this.$store.state.carData.every(item => {
            //     if (!item.selected) {
            //         return true;
            //     }
            //     return false;

            // })
            // return isDisabled;
            if (this.hasAddress === false || this.carData.length === 0) {
                // 不可用
                return true;
            }
            return false;
        }
    },
    async created() {
        this._fetchCartGoods();
        // 获取用户地址
        let user_id = this.$store.state.userInfo.id;
        let result = await fetchUserAddress(user_id);

        // 考虑地址多种情况 0个 1个 多个
        if (result.length === 0) {
            this.hasAddress = false;
            this.$dialog({
                message: '请完善收货地址'
            })
            return;
        } else {
            this.hasAddress = true;
        }

        if (result.length === 1) {
            this.address = result[0];
            return;
        }

        // 多个地址取出默认地址作为收货地址（可能无默认地址）
        let defaultAddress = result.find(item => item.isDisabled == 1);
        if (defaultAddress) {
            // 有默认地址
            this.address = defaultAddress;
        } else {
            // 没有默认地址
            this.address = result[0];
        }
    },

    methods: {
        // 购物车没有商品则不请求
        async _fetchCartGoods() {
            if (!this.ids) {
                return;
            }
            let { message } = await fetchCartGoods(this.ids);
            this.carData = message;
        },

        // 删除商品
        delCartGoods(id, index) {
            // 删除当前data中的商品
            this.carData.splice(index, 1);
            // 删除vuex
            this.$store.commit('delCartGoods', id);
            console.log(id, index);
        },

        // 切换选中不选中
        checkBoxChange(id, selected) {
            // console.log(id, selected);
            this.$store.commit("setGoodsSelected", { id, selected });
        },
        numberChange(number, id) {
            this.$store.commit("setGoodsNumber", { number, id });
        }
    }
}
</script>

<style lang="scss" scoped>
.cartContainer {
    height: 100vh;
    background-color: rgba(234, 231, 231, 0.368627451);
    box-sizing: border-box;

    .addressWrap {
        .address {
            display: flex;
            align-items: center;
            padding: 4px 10px;
            background-color: #fff;
            border-radius: 6px;
            margin: 6px 0;

            .van-icon {
                margin-right: 20px;
                color: red;
                font-size: 20px;
            }
        }
    }

    .cartlist {
        // height: 610px;
        padding-bottom: 140px;
        // margin-bottom: 140px;

        .item {
            display: flex;
            align-items: center;
            padding: 4px;
            height: 128px;
            background-color: white;
            border-radius: 12px;
            margin: 6px 0;

            .icon {
                width: 30px;
                height: 30px;
            }

            .imgWrap {
                width: 80px;
                height: 80px;
                margin-right: 10px;
                border-radius: 10px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .info {
                display: flex;
                flex-direction: column;
                // justify-content: space-between;
                width: 240px;
                height: 120px;

                .title {
                    width: 67vw;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    color: rgb(78, 78, 78);
                    margin-top: 6px;
                }

                .area {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 24px;

                    .price {
                        width: 50px;
                        height: 20px;
                        color: #ff424a;
                    }
                }

                .van-button {
                    margin-top: 28px;
                    margin-left: 180px;
                    width: 60px;
                    height: 30px;
                }
            }
        }
    }

    .emptyCar {
        height: 524px;
        line-height: 100px;
        background-color: rgb(245, 245, 245);
    }

    .van-submit-bar {
        margin-bottom: 50px;
    }
}
</style>