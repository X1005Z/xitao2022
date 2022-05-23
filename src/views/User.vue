<template>
    <div class="user-container">
        <div class="userBg">
            <div class="userInfo">
                <div class="avatarImg">
                    <van-image width="80px" height="80px" round
                        src="http://api.w0824.com/uploads/3f65db2cd99fbdecb06bb23bcee517a6.jpg"></van-image>
                    <!-- <input type="file" ref="avatar" /> -->
                    <div class="button">
                        <van-button size="mini">更换头像</van-button>
                    </div>
                </div>
                <div class="username">
                    登录名： 肖洛倾
                </div>
                <!-- icon图标 -->
                <van-icon class="setting" name="setting-o" size="30" />
            </div>
        </div>
        <div class="flex_c_c">
            <div class="info">
                <van-cell-group>
                    <van-cell title="我的订单" value="全部订单" is-link />
                    <van-cell title="收货地址" is-link />
                    <van-cell title="设置" is-link />
                    <van-cell title="关于喜淘" value="v1.0.5" is-link />
                    <van-button type="danger" block>退出登录</van-button>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {

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