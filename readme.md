## 课堂项目笔记

## 路由懒加载
即点击路由才加载路由相应的代码片段！可以实现代码的分割功能，有利于提高网页性能
```
    {
        path: "/register",
        component: () => {
            import('../views/Register.vue') // 返回Promise
        }
    }
```

## 项目页面构思
1. 先不要着急写首页，务必先把整个项目先体验一下，看看页面和页面之间的关联、相同点、差异性！
2. 根据页面和页面之间的关联、相同点、差异性！构思页面如何合理设计，布局！靠经验！

经过分析：
1. 有三个主页面（一级页面）（tabbar页面）
2. 其他页面就是二级页面，也可以称为非tabbar页面

如何实现：把上面三个主页面公共的tabbar定义在父组件中，此三个页面就是嵌套子路由

## 如何编写静态页面

基本思路： 
1. 先分析有几个部分，再把某个部分细分为几个小部分
2. 编写基本结构（html）
3. 去控制结构的基本布局，对齐方式，横着排还是竖着拍
4. 最后结构成型之后再去改样式，如字体大小，颜色内外边距
5. 对象psd设计稿是否接近还原！！！

## 电商的两个概念
SPU（Standard Product Unit）：即产品。如iphone6
SKU（Stock Keeping Unit）：商品（产品和规格（属性） 如iphone6 + 黑色、 iphone6 + 32G

## 深度选择器
```css
    .content {
        // 深度选择器（可以对组件进行样式穿透）
        ::v-deep img {
            width: 100%;
            height: 100%
        }
    }
```

## 购物车商品
存储地方：Vuex
购物车商品的格式： [{商品id，选中状态，数量，价格}，{}]

## 小结项目优化点：
- js/css压缩合并、vite自动实现，npm run build
- 图片懒加载
- 防抖节流
- 并发 promise.all
- 路由懒加载 实现 代码分割
- CDN加速
- 去除console
- base64

## 学习套路
- 写页面套路
    基本思路：
    1. 先分析有几个部分，再把某个部分细分为几个小部分
    2. 编写基本结构（html）
    3. 去控制结构的基本布局，对齐方式，横着排还是竖着排
    4. 最后结构成型之后再去改样式，如字体大小，颜色内外边距。
    5. 对象pad设计稿是否接近还原

- 写逻辑（需要累积经验）、
    - 先分析再去写！
    - 数据和数据的关联性（计算属性）
    - 数据和页面的关联性，如没有商品应该显示暂无商品提示
    - 边界条件（多判断，多种情况）！！！

- 不会的知识怎么办？
1. 查询官方文档，why（作用-意义），what how api（晦涩难懂）
2. 掘金
3. github 搜索技巧，查看源代码
4. 记录！！！防止忘记，可以快速查找！！！

- 怎么提升水平？
    - 广度（学习周边的知识，moment dayjs）
    - 深度（源码 mvvm、vue2：Object.definedProperty、vue3 proxy)
    - 看牛人博客，知乎，优秀博客、google

## github搜索技巧，很重要！！！！
1. 在vite.config.js中如果有哪些不会用的，可以直接上gitHub官网上，看别人已经配置好的
2. 配置一般写在vite.config.js中，在gitHub中查找时不能直接查vite.config.js，这样查的话是找项目目；要找配置的话要filename:vite.config.js stars:>200 （filename：文件名，stars:>200：点赞量超过200的意思，是筛选项，可加可不加）
比如：要查找vue中的v-for怎么使用，可以输入以下语法：filename:*.vue v-for

> 在gitHub上搜索信息：https://docs.github.com/cn/search-github

3. 在线web vscode查看源码： . （一个点），在github页面搜索想要的源码关键词，然后点进去，再按一个英文符号的. ，就可以在web vscode查看源码了（只能读，不能改）

## gitHub在线查看源码和构建项目
在自己的github账号中，找出自己的公有仓库（私有打不开），在原网址前添加gitpod.io/#/，即可打开web vscode 在线编辑，查看项目运行
比如：原网址：https://github.com/X1005Z/xitao2022
新网址：https://gitpod.io/#/github.com/X1005Z/xitao2022

> 只可以修改自己的，不可以修改别人的，只能看，不能改 
