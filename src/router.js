import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'

Vue.use(VueRouter)

// const routes = [
export default new VueRouter({
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
