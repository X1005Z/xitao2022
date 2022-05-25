<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @change-area="changeArea" @save="onSave" />
    </div>
</template>

<script>
import {areaList} from '@vant/area-data'
import { fetchAddAddress } from '../api/user.js'

export default {
    data() {
        return {
            areaList,
            areaCode: '', // 省-市-区
        }
    },
    methods: {
        async onSave(addressInfo) {
            console.log(addressInfo);
            // 1.准备接口参数
            let user_id = this.$store.state.userInfo.id;
            addressInfo.isDeafault = addressInfo.isDeafault ? 1 : 0;
            addressInfo.country = addressInfo.county;

            let data = {
                ...addressInfo,
                areaCode: this.areaCode,
            }

            // 2. 调用接口
            let {status, message} = await fetchAddAddress(user_id, data);
            this.$toast(message);
            if(status === 0) {
                // 返回到地址管理
                this.$router.back('/address');
            }
        },
        changeArea(area) {
            this.areaCode = area.map(item => item.code).join('-');
        },
        onDelete() {
            this.$toast('delete');
        }
    }
}
</script>

<style lang="scss" scoped>
</style> 