import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import fNode from '../components/NodeInput.vue';
import NodeCheck from '../components/NodeCheck.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:id',
      component: fNode,
    },
    {
      path: '/:id/check',
      component: NodeCheck,
    }
  ]
})

export default router
