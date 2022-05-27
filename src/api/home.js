import instance from './request.js'

export function fetchLunbo() {
    return instance.get('/getlunbo');
}

export function fetchRecommendGoods(page = 1, limit = 10) {
    return instance.get(`/recommend?page=${page}&limit=${limit}`);
}

// 模糊查询商品
export function fetchSearchGoods(data) {
    // 对象{value:'iphone','sort':'buy',order: 'desc', page: 1,pagesize:10}
    // 将对象转化成查询字符串
    let queryString = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    return instance.get(`/search?${queryString}`);
}
