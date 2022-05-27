import { now } from 'moment';
import {nanoid} from 'nanoid'

// 生成唯一的订单号
export function getOrderId() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const randomId = nanoid();
    return `${year}${month}${day}${hours}${minutes}${randomId}`;
}

// 节流函数
export function throttle(fn,delay) {
    // 记录上一次函数触发的时间
    var lastTime = 0; // 闭包变量，用来记录保存上一个的执行时间
    return function() {
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        var context = this;
        var args = [...arguments];
        if(nowTime - lastTime > delay) {
            // 修正this指向问题
            fn.apply(context,arguments);
            // 更新上一次的时间
            lastTime = nowTime;
        }
    }
} 