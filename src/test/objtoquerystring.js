// 对象{value:'iphone','sort':'buy',order: 'desc', page: 1,pagesize:10}
// 将对象转化为查询字符串

// 方式一：利用插件qs，qs插件会自动帮中文或者其他特殊字段进行编码
let qs = require('qs');

let obj = {
    a: 'w肖战',
    b: 1005
};
var str = qs.stringify(obj);
console.log(str);

// 方式二：手动编写，需要自己手动编写
// encodeURIComponent：编码
let result = Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&');
console.log(result);