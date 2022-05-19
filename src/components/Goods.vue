<template>
    <div class="item" @click="clickHandle">
        <div class="imgWrap flex_c_c">
            <img v-lazy="data.img_url" alt="">
        </div>

        <div class="title ellipsis_line_1">{{ data.title }}</div>
        <slot name="footer">
            <div class="footer">
                <span class="price">&yen; {{ data.sell_price }}</span>
                <span class="buy">{{ data.buy }}购买</span>
            </div>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'Goods',
    props: ['data'],
    methods: {
        clickHandle(event) {
            // 触发父绑定的自定义事件
            this.$emit('goodClick', { event, data: this.data });
        }
    }
}
</script>

<style lang="scss" scoped>
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
        font-size: 13.520000000000001px;
        color: #333333;
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
</style>