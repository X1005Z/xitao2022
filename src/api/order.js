import instance from './request.js'

// 提交订单
export function fetchCommitOrder(orderData) {
    return instance.post('/commitorder', orderData);
}

// 获取用户订单
export function fetchUserOrder(user_id) {
    return instance.post(`/userorder/${user_id}`);
}

// 获取用户订单请求
export function fetchOrderDetail(order_id) {
    return instance.post(`/getorder/${order_id}`);
}

// 模拟用户支付订单成功
export function fetchPayOrder(order_id) {
    return instance.post(`/payorder/${order_id}`);
}

// 物流信息
export function fetchWuliu() {
    return instance.get('/kuaidi100/');
}