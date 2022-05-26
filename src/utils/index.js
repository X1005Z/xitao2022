import Vue from 'vue'
import moment from 'moment'

// 定义一个时间转换器
Vue.filter('dateFormat',(date,format='YYYY-MM-DD HH:mm:ss') => {
    return moment(date).format(format);
})

// 将时间戳转为标准的日期格式
Vue.filter('timeFormat',(time, format='YYYY-MM-DD HH:mm:ss') => {
    return moment.unix(time).format(format);
})