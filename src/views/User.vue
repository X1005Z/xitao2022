<template>
    <div class="user-container">
        <div class="userBg">
            <div class="userInfo">
                <div class="avatarImg">
                    <van-image @click="updateAvatar" width="80px" height="80px" round :src="avatar" />
                    <input v-show="false" type="file" @change="_updateAvatar" ref="inputFile" />
                </div>
                <!-- <div class="button">
                    <van-button size="mini">更换头像</van-button>
                </div> -->
                <div class="username">
                    登录名： {{ $store.state.userInfo.username }}
                </div>
                <!-- icon图标 -->
                <van-icon class="setting" name="setting-o" size="30" />
            </div>
        </div>
        <div class="flex_c_c">
            <div class="info">
                <van-cell-group>
                    <van-cell title="我的订单" value="全部订单" @click="$router.push('/order')" is-link />
                    <van-cell title="收货地址" @click="$router.push('/address')" is-link />
                    <van-cell title="设置" is-link />
                    <van-cell title="关于喜淘" value="v1.0.5" is-link />
                    <van-button type="danger" block @click="logout">退出登录</van-button>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchUploadAvatar } from '../api/user.js'

export default {
    computed: {
        // 获取图片路径
        avatar: function () {
            return 'https://api.w0824.com/' + this.$store.state.userInfo.avatar
        }
    },
    methods: {
        // 退出
        logout() {
            const _this = this;
            // 清除用户购物车和用户信息
            _this.$dialog.confirm({
                message: '确认退出登录吗'
            }).then(() => {
                // on confirm
                // 清除登录的数据
                _this.$store.commit('clearUserInfo');
                // 跳转回登录页面  
                _this.$router.push('/login')
            }).catch(() => {
                // on cancel
            })
        },
        // 更换头像
        updateAvatar() {
            this.$refs.inputFile.click();
        },
        async _updateAvatar() {
            // 1.获取图像二进制数据
            let file = this.$refs.inputFile.files[0];
            if (!file) {
                return;
            }
            let user_id = this.$store.state.userInfo.id;
            let formData = new FormData();
            formData.set('user_id', user_id);
            formData.set('file', file);
            // 2. 调用API更新头像
            let { message, src, status } = await fetchUploadAvatar(formData);
            this.$toast(message);
            if (status === 0) {
                // 更改vuex中用户src路径
                this.$store.commit('updateUserAvatar', src);
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.user-container {
    height: 100vh;
    background-color: rgb(241, 241, 241);
    .userBg {
        height: 200px;
        background-color: rgb(197, 145, 96);
    }
    .userInfo {
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #eee;
        margin: 0 10px;
        font-size: 14px;

        .avatarImg {
            margin-top: 30px;

            .button {
                color: rgb(241, 226, 205);
                text-align: center;
                margin-top: 4px;
            }
        }

        .van-icon {
            bottom: 35px;
            right: -20px;
        }
    }

    .info {
        width: 90vw;
        padding: 10px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background: #fff;
        margin-top: -40px;
    }
}
</style>