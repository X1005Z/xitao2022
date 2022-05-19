import Vue from 'vue';
import 'vant/lib/index.css';

import {
    Button, Tabbar, TabbarItem, NavBar, Search, Swipe, SwipeItem, Toast, Sticky, Grid, GridItem, Divider, Lazyload
} from 'vant';

Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Toast);
Vue.use(Sticky);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Divider);
Vue.use(Lazyload);
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
    lazyComponent: true,
});

