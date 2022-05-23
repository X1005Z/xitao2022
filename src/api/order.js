import instance from './request.js'

// 提交订单
export function fetchCommitOrder(orderData) {
    return instance.post('/commitorder', orderData)
}