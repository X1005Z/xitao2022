<template>
    <div class="search-container">
        <van-popup v-model="isShow" :close-on-click-overlay="false" position="top" :style="{ height: '50% ' }">
            <van-search @search="onSearch" @cancel="$router.back()" v-model="value" show-action placeholder="请输入搜索关键词"></van-search>

            <div class="searchWrap">
                <div class="card">
                    <div class="header" v-if="historyData.length > 0">
                        <h3>搜索历史</h3>
                        <i class="iconfont icon-trash" @click="clearHistory"></i>
                    </div>
                    <div class="footer">
                        <span v-for="(item,index) in historyData" :key="index" @click="$router.push('/search-result/' + item)">{{item}}</span>
                    </div>
                </div>

                <van-divider />
                <div class="card">
                    <div class="header">
                        <h3>热门搜索</h3>
                        <!-- 方式一 -->
                        <!-- <i @click="isEyeOpen = !isEyeOpen" :class="['iconfont', isEyeOpen ? 'icon-yanjing' : 'icon-guanbi-yanjing']"></i> -->

                        <!-- 方式二（推荐） -->
                        <i :class="['iconfont', className]" @click="isEyeOpen = !isEyeOpen"></i>
                    </div>

                    <div class="footer" v-if="isEyeOpen">
                        <span v-for="(item,index) in hotsData" :key="index" @click="
                        $router.push('/search-result/' + item)">{{item}}</span>
                    </div>
                    <div v-else class="text-center">已隐藏热门搜索</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
// 因为原来可能有本地存储的历史数据，要求取出来赋值给data
// 如果有localStorage.getItem('historyData')就取本身，没有就取空数组[]，这样才会是一个数组，但是没数据
// 如果存的数据是数组，就是[],如果存的数据是对象，就是{},一定要加引号
// getItem：获取数据
let historyData = JSON.parse(localStorage.getItem('historyData') || '[]');
// console.log(JSON.parse(localStorage.getItem('historyData')  || '[]')); // 没有数据返回null

export default {
    data() {
        return {
            historyData,
            hotsData: ['华为p30', '足球', '充电器'],
            value: '',
            isShow: true,
            isEyeOpen: true,
        }
    },
    computed: {
        className() {
            return this.isEyeOpen ? 'icon-yanjing' : 'icon-guanbi-yanjing'
        }
    },
    methods: {
        // 搜索
        onSearch() {
            // 1. 获取输入的值，并存入到本地存储
            // 要先判断搜索的词之前有没有判断过，要先用include（去重）判断historyData里面有没有这个value值，有的话就直接return退出就行，没有就继续执行push
            if(this.historyData.includes(this.value)) {
                return;
            }
            this.historyData.push(this.value);
            // 存入本地存储，setItem存储数据，里面只能存放字符串，所以要把historyData转化为字符串
            localStorage.setItem('historyData', JSON.stringify(this.historyData));

            // 2.并跳入到搜索结果页面
            this.$router.push(`/search-result/${this.value}`);
        },

        // 清除历史记录
        clearHistory() {
            // 清空本地数据
            this.historyData = []; 
            // 清除本地存储数据，用removeItem
            localStorage.removeItem('historyData');
        }
    }
}
</script>

<style lang="scss" scoped>
.search-container {
    .searchWrap {
        .card {
            padding: 6px;

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 4px;
            }

            .footer {
                display: flex;
                flex-wrap: wrap;

                span {
                    height: 30px;
                    line-height: 30px;
                    background: #f3f5f6;
                    font-size: 14px;
                    margin-right: 6px;
                    padding: 2px 4px;
                    text-align: center;
                    border-radius: 6px;
                    margin: 4px;

                }
            }
        }
    }
}
</style>