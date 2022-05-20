<template>
    <div class="goodsDetail-container">
        <!-- 商品详情轮播图 -->
        <div class="card" @click="previewImage">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item, index) in thume" :key="index">
                    <img :src="item.src" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 商品价格和标题 -->
        <div class="card">
            <div class="price">
                <span class="sell_price">&yen; {{ goodsInfo.sell_price }}</span>
                <span class="market_price">&yen; {{ goodsInfo.market_price }}</span>
            </div>
            <div class="title">
                {{ goodsInfo.title }}
            </div>
        </div>
        <!-- 商品介绍 -->
        <div class="card">
            <van-divider>商品介绍</van-divider>
            <div class="content" v-html="goodsInfo.content"></div>
        </div>

        <!-- 商品价格说明 -->
        <div class="card" style="margin-bottom: 50px">
            <div class="Pricetext">价格说明</div>
            <div class="priceTexts">
                <p>划线价格</p>
                <div>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，<b>并非原价</b>，仅供参考</div>
            </div>
            <div class="priceTexts">
                <p>未划线价格</p>
                <div>商品的<b>实时标价</b>，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准</div>
            </div>
            <p class="priceTexts">
                商家详情页（含主图）以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠获得和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。
            </p>
        </div>

        <!-- 商品导航 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <!-- <van-goods-action-icon icon="star" text="收藏" color="#ff5000" /> -->
            <van-goods-action-button type="warning" text="加入购物车" @click="addCar(true)" />
            <van-goods-action-button type="danger" text="立即购买" @click="buy(false)" />
        </van-goods-action>

        <!-- 商品sku -->
        <van-sku v-model="showSku" :sku="sku" :goods="goods" :goods-id="goodsInfo.id" :hide-stock="sku.hide_stock"
            :show-add-cart-btn="isShowAddCartBtn" :reset-stepper-on-hide="true"
            @add-cart="addCart" @buy-clicked="buyClicked"
            >
            <template #sku-messages>
                <div class="card">
                    <van-divider>文字</van-divider>
                    <div>商品货号： {{ goodsInfo.goods_no }}</div>
                    <div>库存： {{ goodsInfo.stock_quantity }}</div>
                    <div>上架时间： {{ goodsInfo.add_time | dateFormat('YYYY-MM-DD') }}</div>
                </div>
            </template>

        </van-sku>

        <!-- backTop组件 -->
        <BackTop :scrollTop="300" />
    </div>
</template>

<script>
import { fetchGoodsImages, fetchGoodsInfo } from '../api/goodsdetail.js'
import { ImagePreview } from 'vant';
import BackTop from '../components/BackTop.vue'

export default {
    props: ['id'],
    data() {
        return {
            thume: [],
            goodsInfo: {},
            showSku: false,
            // 是否显示加入购物车按钮
            isShowAddCartBtn: false,
            sku: {
                tree: [], //一定要加
                price: '0.00', // 默认价格（单位元）
                stock_num: 0, // 商品总库存
                hide_stock: false, // 是否隐藏剩余库存
            },
            goods: {
                picture: ''
            }
        }
    },
    created() {
        // 初始化轮播图数据和商品介绍
        this._fetchGoodsImages()
        this._fetchGoodsInfo()
    },
    methods: {
        // 商品轮播图
        async _fetchGoodsImages() {
            // console.log(this.$route.params.id);
            let { message } = await fetchGoodsImages(this.$route.params.id);
            // console.log(message);
            this.thume = message;
            // 给sku缩略图赋值
            this.goods.picture = this.thume[0].src;

        },
        
        // 商品价格和标题
        async _fetchGoodsInfo() {
            // console.log(this.$route.params.id);
            let { message } = await fetchGoodsInfo(this.$route.params.id);
            // console.log(message);
            this.goodsInfo = message;

            // 把富文本中得到图片，宽度替换成空，才不会撑开页面
            let reg = /\width=['"]\w+['"]\s+/gi;
            // console.log(reg);
            message.content = message.content.replace(reg, '');

            // 给sku赋值
            console.log(this.goodsInfo);
            this.sku.price = this.goodsInfo.sell_price;
            this.sku.stock_num = this.goodsInfo.stock_quantity;
        },

        // 点击放大轮播图
        previewImage() {
            // 图片预览
            let imgs = this.thume.map(item => item.src);
            ImagePreview({
                images: imgs,
                // 起始位置
                startPosition: 1
            })
        },

        // 点击购物车弹出sku
        addCar(bool) {
            this.showSku = true;
            this.isShowAddCartBtn = bool;
        
        },

        // 点击立即购买弹出sku
        buy(bool) {
            this.showSku = true;
            this.isShowAddCartBtn = bool;
        },

        // sku加入商品到购物车,依然停留在当前页面
        addCart(skuData) {
            // 将商品添加到购物车（vuex)
            // console.log('addCart:',skuData);
            // 构造购物车商品
            let {goodsId,selectedNum} = skuData;
            let price = this.goodsInfo.sell_price;
            let item = {id: goodsId, number: selectedNum, price: price, selected: true};
            // 提交一个mutations
            this.$store.commit('addGoodsToCar', item);
            // 点击加入购物车之后关闭当前购物车页面
            this.showSku = false;
            // 提示加入购物车成功
            // 轻提示 
            this.$toast('加入购物车成功');
            // 重提示
            // this.$dialog.alert({
            //     message: '加入购物车成功'
            // })
        },

        // sku立即购买，跳转到购物车页面
        buyClicked(skuData) {
            console.log('buyClicked:',skuData) 
        }
          
    },
    components: {
        BackTop,
    }
}
</script>

<style lang="scss" scoped>
.goodsDetail-container {
    background: rgb(247, 246, 246);
    margin-bottom: 10px;


    .card {
        border-radius: 10px;
        margin-bottom: 10px;
        background: #fff;
        padding: 8px;

        .my-swipe .van-swipe-item {
            height: 200px;
            color: #fff;
            font-size: 20px;
            text-align: center;

            img {
                height: 100%;
            }
        }

        .price {
            margin-bottom: 10px;

            .sell_price {
                color: #ff4142;
                font-size: 20px;
                font-weight: 700;
                margin-right: 10px;
            }

            .market_price {
                font-size: 14px;
                color: #999;
                text-decoration: line-through;
            }
        }

        .title {
            color: #787272;
        }

        .van-divider {
            margin-bottom: 10px;
            color: rgb(38, 38, 38);
            font-weight: 700;
            font-size: 20px;
        }

        .content {
            color: #666;

            ::v-deep img {
                width: 100%;
                height: 100%;
            }
        }

        .Pricetext {
            color: rgb(121, 121, 121);
            margin-bottom: 10px;
        }

        .priceTexts {
            font-size: 14px;
            color: rgb(154, 154, 154);

            p {
                color: rgb(100, 100, 98);
                font-weight: 400;
            }
        }
    }
}
</style>