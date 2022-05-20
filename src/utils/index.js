import Vue from 'vue'
import moment from 'moment'

// 定义一个时间转换器
Vue.filter('dateFormat',(date,format='YYYY-MM-DD HH:mm:ss') => {
    return moment(date).format(format);
})