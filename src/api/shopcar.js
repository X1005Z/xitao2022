import instance from './request.js'

// 获取购物车列表内容
export function fetchCartGoods(goods_id) {
    return instance.get(`/getshopcarlist/${goods_id}`);
}