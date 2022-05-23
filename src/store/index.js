import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 创建仓库对象
const store = new Vuex.Store({
    state: {
        // [{商品id， 选中状态，数量，价格},{}]
        carData: [],
    },
    mutations: {
        addGoodsToCar(state, goods) {
            // console.log('addGoodsToCar',goods);
            // 加入购物车之前，判断是否有同id商品，
            // 有的话就累加数量，没有则加入push操作
            const index = state.carData.findIndex(item => item.id === goods.id);
            if(index !== -1) {
                // 有的话就累加数量
                state.carData[index].number += goods.number;
            } else {
                // 没有则加入,push操作
                state.carData.push(goods);
            }
        },

        // 清空购物车数据
        clearcarData(state) {
            state.carData = [];
        },

        // 删除购物车商品
        delCartGoods(state, id) {
            state.carData = state.carData.filter(item => item.id !== id);
        },

        // 设置购物车商品选中状态
        setGoodsSelected(state, {
            id, selected
        }) {
            let index = state.carData.findIndex(item => item.id === id)
            state.carData[index].selected = selected
        },

        // 设置购物车商品购买数量
        setGoodsNumber(state, {
            id, number
        }) {
            let index = state.carData.findIndex(item => item.id === id)
            state.carData[index].number = number
        },
    },

    getters: {
        // 获取购物车商品的总数量
        getCarTotalNumber(state) {
            let totalNumber = 0;
            state.carData.forEach(item => totalNumber += item.number)
            return totalNumber;
        },

        // 获取以逗号分割的商品id 如 88,89
        getCarGoodsIds(state) {
            return state.carData.map(item => item.id).join(',')
        },

        // 获取选中的购物车商品id
        getCarSelectedGoodsIds(state) {
            let ids = [];
            state.carData.forEach(item => {
                item.selected && ids.push(item.id)
            })
            return ids.join(',')
        },

        // 返回一个键值对 {id:number,98：10,88:3}
        getGoodsNumberById(state) {
            let idNumMap = {};
            state.carData.forEach(item => {
                idNumMap[item.id] = item.number
            })
            return idNumMap;
        },
        
        getGoodsStatusById(state) {
            let idSelectedMap = {};
            state.carData.forEach(item => {
                idSelectedMap[item.id] = item.selected
            })
            return idSelectedMap;
        },
        
        // 获取选中商品数量
        getCarSelectedTotalNumber(state) {
            let totalNumber = 0;
            state.carData.forEach(item => item.selected && (totalNumber += item.number))
            return totalNumber;
        },

        // 获取选中商品数量的总价格
        getTotalPrice(state) {
            let totalPrice = 0.00;
            state.carData.forEach(({
                price,
                number,
                selected
            }) => selected && (totalPrice += number * price))
            return totalPrice * 100;
        }
    },
    plugins: [createPersistedState()],
})

// 导出
export default store;