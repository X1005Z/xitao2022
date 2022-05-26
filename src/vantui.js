import Vue from 'vue';
import 'vant/lib/index.css';

import {
    Button, Tabbar, TabbarItem, NavBar, Search, Swipe, SwipeItem, Toast, Sticky, Grid, GridItem, Divider, Lazyload, List, PullRefresh, GoodsAction, GoodsActionIcon, GoodsActionButton, Sku,
    Empty, SubmitBar, Card, Stepper, Checkbox, Image as VanImage, Icon, Cell, CellGroup, Form, Field, AddressList, AddressEdit, Area, Tab, Tabs, Tag, Popup, Step, Steps, 
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
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);
Vue.use(Empty);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(Stepper);
Vue.use(Checkbox);
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Area);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(Popup);
Vue.use(Step);
Vue.use(Steps);

