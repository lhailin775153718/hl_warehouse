import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/common.css';
import 'amfe-flexible'
import Https from './js/https'
import Storage from './js/storage'
import Api from './js/api'
import CommonFn from './js/commonFn'
import qs from 'qs'
import './util/rem'

// import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload, Tab, Tabs, Toast } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Lazyload, {
    lazyComponent: true
});
Vue.use(Toast);


Vue.prototype.$https = Https;
Vue.prototype.$qs = qs;
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