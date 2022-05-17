<template>
    <div>
        <!-- 三个tabbar路由的父组件，即用来匹配三个子路由 -->
        <router-view></router-view>

        <van-tabbar v-model="active" active-color="red">
            <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
            <van-tabbar-item icon="search" badge="30" to="/home/shopcar">购物车</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/home/user">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        }
    },
    watch: {
        '$route': {
            handler: function(newRoute, oldRoute) {
                let {name} = newRoute.meta;
                const nameMap = {
                    'Home': 0,
                    'Shopcar': 1,
                    'User': 2,
                }
                let active = nameMap[name];
                // 设置默认激活
                this.active = active;
            },

            // 立即执行（刷新也会执行）
            immediate: true
        }
    }
}
</script>

<style>

</style>