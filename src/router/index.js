import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import param from '../views/param.vue';
import pageAbsente from '../views/pageabsente.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/page1',
    name: 'Page1',
    component: () => import( '../views/page1.vue')
  },
  {
    path: '/param/:chaine',
    name: 'Param',
    component: param
  },
  {
  path: "/:catchAll(.*)",
  component: pageAbsente,
},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
