<template>
    <div>
        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
        <van-empty v-if="list.length === 0" description="赶紧添加地址吧！买买买" />
    </div>
</template>

<script>
import { fetchUserAddress } from "../api/user.js"

export default {
    data() {
        return {
            chosenAddressId: 0, // 地址id
            list: [],
        };
    },

    created() {
        // 获取用户地址
        this._fetchUserAddress();
    },

    methods: {
        onAdd() {
            this.$router.push('/addaddress');
        },
        onEdit(item, index) {
            console.log(item, index);
            // this.$toast('编辑地址:' + index);
            // 把当前点击地址信息当做路由参数传递到地址编辑页面，用于回显
            this.$router.push('/editaddress/' + JSON.stringify(item));
        },
        // 获取用户地址
        async _fetchUserAddress() {
            let user_id = this.$store.state.userInfo.id;
            let result = await fetchUserAddress(user_id);
            console.log(result)
            // 判断地址： 0个   1个    多个？
            if (result.length === 0) {
                return;
            }
            if (result.length === 1) {
                this.chosenAddressId = result[0].id;
            }

            result = result.map(item => {
                if (item.isDefault == 1) {
                    this.chosenAddressId = item.id;
                }
                let { province, city, country, addressDetail } = item;
                item.address = `${province}${city}${country}${addressDetail}`;
                return item;
            })
            this.list = result;
        }
    },
};
</script>

<style lang="scss" scoped>
</style>