var jwt = require('jsonwebtoken')

var data = {
    id: '1',
    username: '肖战',
}

var primaryKey = '#$%$%fgzfddsffsd342422';

// 生成token（登录态），对数据进行加密签名，一个小时内有效
var token = jwt.sign(data, primaryKey, {
    expiresIn: `1h`
});

console.log(token);

// 检验token是否有效
try {
    let result = jwt.verify(token + 'dfsfasgfsdgdhg', primaryKey);
    console.log(result);
} catch(err) {
    // 说明token失效了，1.过期了 2.篡改了
    console.log('token失效');
}