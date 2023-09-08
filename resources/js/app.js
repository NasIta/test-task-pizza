import './bootstrap';

import router from './routes'

import SpaPaginationLinks from './components/common/PaginationLinks.vue';
import SpaMenu from './components/common/Menu';
import store from './store';

Vue.component('spa-pagination-links', SpaPaginationLinks)
Vue.component('spa-menu', SpaMenu)

const app = new Vue({
    router,
}).$mount('#app')
