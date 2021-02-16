import Vue from 'vue';
import VueRouter from 'vue-router';
import Orders from './../components/Orders';
import Products from './../components/Products';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/orders',
    name: 'Orders',
    components: { default: Orders },
  },
  {
    path: '/products',
    name: 'Products',
    components: { default: Products },
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history',
});

export default router;
