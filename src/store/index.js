import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 创建仓库对象
const store = new Vuex.Store({
    state: {
        // [{商品id， 选中状态，数量，价格},{}]
        carData: []
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
        }
    },
    plugins: [createPersistedState()],
})

// 导出
export default store;