<template>
    <div class="app">
        <!-- navbar -->
        <van-nav-bar :title="title" left-text="返回" right-text="按钮" v-show="isShowNavbar" @click-left="$router.back()"
            left-arrow>
        </van-nav-bar>


        <!-- 匹配根路由 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            isShowNavbar: false,
            title: '喜淘'
        }
    },
    watch: {
        '$route': {
            handler: function (newRoute, oldRoute) {
                // console.log(app-watch);
                // 是主页则隐藏navbar，否则显示
                let { isMainPage, title } = newRoute.meta;
                this.title = title;
                if (isMainPage) {
                    this.isShowNavbar = false;
                } else {
                    this.isShowNavbar = true;
                }
            },
            // 立即执行（刷新也会执行）
            immediate: true,
        }
    }
}
</script>
<style lang="scss">
@import './assets/css/common.scss';

html {
    scroll-behavior: smooth;
}

.app {
    min-width: 320px;
    max-width: 750px;
    margin: 0 auto;
}

* {
    box-sizing: border-box;
}
</style>

