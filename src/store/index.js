import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 创建仓库对象
const store = new Vuex.Store({
    state: {
        // [{商品id， 选中状态，数量，价格},{}]
        carData: [],
        token: '',
        userInfo: {},
    },
    mutations: {
        // 设置token
        setToken(state, token) {
            state.token = token;
        },

        // 设置用户信息
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },

        // 清空购物车数据
        clearUserInfo(state) {
            state.token = '',
            state.userInfo = '',
            state.carData = []
        },

        // 更新用户头像
        updateUserAvatar(state, src) {
            state.userInfo.avatar = src;
        },

        // 添加商品到购物车
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

        // 删除购物车商品
        delCartGoods(state, id) {
            state.carData = state.carData.filter(item => item.id !== id);
        },

        // 更新购物车商品选中状态
        setGoodsSelected(state, {
            id, selected
        }) {
            let index = state.carData.findIndex(item => item.id === id)
            state.carData[index].selected = selected
        },

        // 更新购物车商品购买数量
        setGoodsNumber(state, {
            id, number
        }) {
            let index = state.carData.findIndex(item => item.id === id)
            state.carData[index].number = number
        },

        // 清空购物车商品
        clearCar(state) {
            state.carData = [];
        },

        // // 删除订单商品
        // delOrder(state, id) {
        //     state.allOrderGoods = state.allOrderGoods.filter(item => item.id !== id);
        // },
    },

    getters: {
        // 获取以逗号分割的商品id 如 88,89
        getCarGoodsIds(state) {
            return state.carData.map(item => item.id).join(',')
        },

        // 获取选中的购物车商品id
        getCarSelectedGoodsId(state) {
            // let ids = [];
            // state.carData.forEach(item => {
            //     item.selected && ids.push(item.id)
            // })
            // return ids.join(',');
            // 等价于
            // 链式操作，state.carData.filter(item => item.selected)这里返回一个数组，每个数组里面都有id和状态state，用filter过滤一下，只需要id，再拼接一个字符串join
            return state.carData.filter(item => item.selected).map(item => item.id).join(',');
        },

        // 构造一个对象： {id:数量} 返回一个键值对 {id:number,98：10,88:3} 
        getGoodsNumberById(state) {
            let idNumMap = {};
            state.carData.forEach(item => {
                idNumMap[item.id] = item.number
            })
            return idNumMap;
        },
        
        //  构造一个对象： {id:选中状态}
        getGoodsStatusById(state) {
            let idSelectedMap = {};
            state.carData.forEach(item => {
                idSelectedMap[item.id] = item.selected;
            })
            return idSelectedMap;
        },
        
        // 获取购物车商品的总数量
        getCarTotalNumber(state) {
            let totalNumber = 0;
            state.carData.forEach(item => totalNumber += item.number);
            return totalNumber;
        },

        // 获取选中商品数量
        getCarSelectedTotalNumber(state) {
            let totalNumber = 0;
            state.carData.forEach(item => item.selected && (totalNumber += item.number));
            return totalNumber;
        },

        // 获取选中商品数量的总价格
        getTotalPrice(state) {
            let totalPrice = 0.00;
            state.carData.forEach(({
                price,
                number,
                selected
            }) => selected && (totalPrice += number * price));
            return totalPrice * 100;
        }
    },
    plugins: [createPersistedState()],
})

// 导出
export default store;