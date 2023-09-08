import VueRouter from 'vue-router';

import Catalog from '../views/Catalog.vue';
import Order from '../views/Order.vue';

Vue.use(VueRouter)

const Basic = {
  template: `
    <transition name="fade-in" mode="out-in">
        <router-view></router-view>
    </transition>
  `
}

const Moderate = {
  template: `
    <transition name="fade-in" mode="out-in">
        <router-view></router-view>
    </transition>
  `
}

const Advanced = {
  template: `
    <transition name="fade-in" mode="out-in">
        <router-view></router-view>
    </transition>
  `
}

const routes = [
    { path: '', component: Catalog, name : 'catalog', meta : { title: 'Catalog', visible: true } },
    { path: '/order', component: Order, name : 'order', meta : { title: 'Order', visible: true } },

]

export default new VueRouter({
    mode: 'history',
    base:__dirname,
    routes
})
