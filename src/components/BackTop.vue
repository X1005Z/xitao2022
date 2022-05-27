<template>
    <div class="BackTop" v-if="isShow" @click="goTop">
        <slot>
            <img src="../assets/images/backtop.png" alt="">
        </slot>
    </div>
</template>

<script>
// 节流函数优化回到顶部
import { throttle } from '../utils/tools.js'

export default {
    props: {
        scrollTop: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            // scrollTop: 500, // 超过页面顶部500px就要显示
            isShow: false,
        }
    },
    methods: {
        // 回到顶部的箭头显示与隐藏
        scrollHandle(event) {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // console.log('scrollTop:', scrollTop);
            if (scrollTop >= this.scrollTop) {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
        },
        // 回到顶部
        goTop() {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
    },
    mounted() {
        // 绑定滚动事件
        document.addEventListener('scroll', throttle(this.scrollHandle, 100));
    },
    destroyed() {
        // 解绑滚动事件
        document.removeEventListener('scroll', this.scrollHandle);
    }
}
</script>

<style lang="scss" scoped>
.BackTop {
    position: fixed;
    right: 8px;
    bottom: 120px;
    width: 38px;
    height: 38px;

    img {
        width: 100%;
    }
}
</style>