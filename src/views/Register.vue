<template>
    <div>
         <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[{required: true, message: '请填写用户名'}]" />
            
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{required:true, message: '请填写密码'}]" />

            <van-field v-model="repassword" type="password" name="repassword" label="确认密码" placeholder="确认密码" :rules="[{required:true, message: '请填写密码'}]" />
            
            <div style="margin:16px">
                <van-button round block type="info" native-type="submit">注册</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import {fetchRegister} from '../api/user.js'

export default {
    data() {
        return {
            username: '',
            password: '',
            repassword: ''
        }
    },
    methods: {
        async onSubmit(obj) {
            const {username, password, repassword} = obj;
            // 判断两次密码是否一致
            if(this.password !== this.repassword) {
                this.$toast('两次密码不一致');
                return;
            }
            
            // 调用注册接口
            let {status, message} = await fetchRegister(username, password, repassword);
            this.$toast(message);
            if(status === 0) {
                this.$router.push('/login');
            }
        }
    }
}
</script>

<style>

</style>