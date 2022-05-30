<template>
    <div>
        <button @click="handleClick">button  获取用户</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        async handleClick() {
            let {data} = await axios.get('/myapi/users');    
            console.log(data);
        }
    }
}
</script>

<style>

</style>