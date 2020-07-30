import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/css/common.css';
import 'amfe-flexible'
import Https from './js/https'
import Storage from './js/storage'
import Api from './js/api'
import CommonFn from './js/commonFn'


// import Vant from 'vant';
import 'vant/lib/index.css';
import { Swipe, SwipeItem, Lazyload, Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload, {
    lazyComponent: true
});


Vue.prototype.$https = Https;
Vue.prototype.$storage = Storage;
Vue.prototype.$api = Api;
Vue.prototype.$commonFn = CommonFn;

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
