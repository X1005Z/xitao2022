<template>
    <div class="app">
        <!-- navbar -->
        <van-nav-bar :title="title" v-show="isShowNavbar" @click-left="$router.back()" left-arrow>
        </van-nav-bar>

        <!-- 匹配根路由 -->
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            isShowNavbar: false,
            title: '喜淘',
            netStatus: window.navigator.onLine,
        }
    },
    watch: {
        '$route': {
            handler: function (newRoute, oldRoute) {
                // console.log(app-watch);
                // 是主页则隐藏navbar，否则显示
                let { isMainPage, title, isShowNavBar } = newRoute.meta;
                this.title = title;
                this.isShowNavbar = isShowNavBar
            },
            // 立即执行（刷新也会执行）
            immediate: true,
        },

        // 监听网络变化
        netStatus: {
            handler: function (newStatus, oldStatus) {
                console.log('watch:', newStatus);
                if(newStatus === true) {
                    this.$dialog.alert({message: '网络连接成功'});
                } else {
                    this.$dialog.alert({message: '网络异常，请检查网络'});
                }
            },
            // 立即执行（刷新也会执行）
            // immediate: true,
        }
    },
    mounted() {
        // 监听网络状态的改变
        window.addEventListener('online', this.updataNetStatus);
        window.addEventListener('offline', this.updataNetStatus);
    },
    methods: {
        updataNetStatus(e) {
            const {type} = e;
            this.netStatus = type === 'online' ? true : false;
        }
    },
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

