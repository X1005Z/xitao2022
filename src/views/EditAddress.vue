<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-delete :address-info="addressInfo" show-set-default
            @change-area="changeArea" @change-default="changeDefault" @delete="deleteAddress" @save="save"
            :area-columns-placeholder="['请选择', '请选择', '请选择']" />
    </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { fetchDelUserAddress, fetchEditUserAddress } from '../api/user.js'

export default {
    data() {
        return {
            areaList,
            isDefault: '', // 记录当前是否是默认地址
            areaCode: '', // 记录当前地址省市区编码 '****-****-***'
            fromAddressInfo: JSON.parse(this.$route.params.addressInfo), // 原地址
        }
    },

    created() {
        // 取出原默认地址和编码设置默认值
        this.areaCode = this.fromAddressInfo.areaCode
        this.isDefault = this.fromAddressInfo.isDefault
    },

    computed: {
        addressInfo() {
            // 整理默认地址，改成对应的数据格式
            let address = JSON.parse(this.$route.params.addressInfo);
            address.isDefault = address.isDefault == 1 ? true : false;
            // 取出最后的区的编码
            address.areaCode = address.areaCode.split('-')[2];
            return address
        },
    },

    methods: {
        // 删除
        async deleteAddress(item) {
            // 地址id
            let { id } = item;
            let { status, message } = await fetchDelUserAddress(id);
            this.$toast(message);
            if (status === 0) {
                this.$router.back();
            }
        },
        // 更新地址
        async save(addressInfo) {
            // 1.获取接口参数
            let isDefault = this.isDefault ? 1 : 0;
            let areaCode = this.areaCode;
            let country = addressInfo.county;
            let data = {
                ...addressInfo,
                isDefault,
                areaCode,
                country,
            }
            console.log(data);

            // 2.发异步请求
            let { status, message } = await fetchEditUserAddress(addressInfo.id, data);
            this.$toast(message);
            if (status === 0) {
                this.$router.back();
            }
        },
        // 切换省市区
        changeArea(data) {
            this.areaCode = data.map(item => item.code).join('-');
        },
        // 切换默认地址
        changeDefault(bool) {
            this.isDefault = bool;
        }
    }
}
</script>

<style lang="scss" scoped>
</style>