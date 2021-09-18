import Vue from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import Home from './views/Home.vue'
import store from './store'

Vue.use(VueRouter)

// tambahkan ini untuk melakukan pengecekan pada setiap routing
router.beforeEach((to, from, next) => {
  // jika routing ada meta auth-nya maka
  if (to.matched.some(record => record.meta.auth)) {
    // jika user adalah guest
    if(Store.getters['auth/guest']){
      // tampilkan pesan bahwa harus login dulu
      Store.dispatch('alert/set', {
        status: true,
        text: 'Login first',
        color: 'error',
      })

      // tampilkan form login
      store.dispatch('setPrevUrl', to.path)
      store.dispatch('dialog/setComponent', 'login')
      store.dispatch('dialog/setStatus', true)
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

// const routes = [
// export default new VueRouter({
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [

        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/about',
          name: 'About',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import(/* WebpackChunkName: "categories" */'./views/Categories.vue')
      },
        {
          path: '/books',
          name: 'books',
          component: () => import(/* WebpackChunkName: "books" */'./views/Books.vue')
      },
        {
          path: '/category/:slug',
          name: 'category',
          component: () => import(/* WebpackChunkName: "category" */'./views/Category.vue')
      },
      {
        path: '/book/:slug',
        name: 'book',
        component: () => import(/* WebpackChunkName: "book" */'./views/Book.vue')
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import( /* webpackChunkName: "checkout" */'./views/Checkout.vue'),
        meta: { auth: true } // private, hanya user yg boleh login yang dapat mengaksesnya
      }
    ]
})
// ]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router
