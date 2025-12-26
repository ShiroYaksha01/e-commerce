import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductView from '../views/ProductView.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    {
      path: '/categories/:category',
      name: 'Category',
      component: CategoryView,
      props: true
    },
    {
      path: '/product/:productId',
      name: 'product',
      component: ProductView,
      props: true
    }
  ],
})

export default router