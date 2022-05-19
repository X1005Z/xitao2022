<template>
    <div>
        <h3>商品详情-{{ id }}</h3>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                id: this.$route.params.id
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>