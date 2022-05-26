import instance from './request.js'

// 提交订单
export function fetchCommitOrder(orderData) {
    return instance.post('/commitorder', orderData);
}

// 获取用户订单
export function fetchUserOrder(user_id) {
    return instance.post(`/userorder/${user_id}`);
}