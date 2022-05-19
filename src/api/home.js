import instance from './request.js'

export function fetchLunbo() {
    return instance.get('/api/getlunbo');
}

export function fetchRecommendGoods(page = 1, limit = 10) {
    return instance.get(`/api/recommend?page=${page}&limit=${limit}`);
}