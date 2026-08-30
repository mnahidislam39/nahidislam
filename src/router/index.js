import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProjectDetails from '../views/ProjectDetails.vue';

const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home
   },
   {
      path: '/project/:id',
      name: 'ProjectDetails',
      component: () => import('../views/ProjectDetails.vue')
   }
];

const router = createRouter({
   // এখানে import.meta.env.BASE_URL যোগ করতে হবে
   history: createWebHistory(import.meta.env.BASE_URL),
   routes,
   scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth',
    };
  } else if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 };
  }
}
});

export default router;

