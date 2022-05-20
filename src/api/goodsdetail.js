import instance from './request.js'

// 获取商品详情的轮播图
export function fetchGoodsImages(goods_id) {
    return instance.get(`/getthumbimages/${goods_id}`);
}

// 获取商品详情的内容
export function fetchGoodsInfo(goods_id) {
    return instance.get(`/getgoodsinfo/${goods_id}`);
}