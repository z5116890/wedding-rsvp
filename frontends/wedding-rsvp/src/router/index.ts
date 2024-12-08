import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminLogin from '../pages/AdminLogin.vue'
import AdminHome from '@/pages/AdminHome.vue'
import UnknownErrorPage from '../pages/Error/UnknownErrorPage.vue'
import ManageAdmins from '../pages/ManageAdmins.vue'
import ManageGuests from '../pages/ManageGuests.vue'
import ManageAccommodations from '../pages/ManageAccommodations.vue'
import Welcome from '@/pages/Welcome.vue'
// import {
// } from './guards'

const multiguard = require('vue-router-multiguard')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      // beforeEnter: multiguard([requireLogin, routePreload]),
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
      // beforeEnter: multiguard([requireLogin, routePreload]),
    },
    {
      path: '/error',
      name: 'UnknownErrorPage',
      component: UnknownErrorPage,
      // beforeEnter: routePreload,
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
      // beforeEnter: multiguard([requireAdminLogin, routePreload]),
    },
    {
      path: '/admin/home',
      name: 'AdminHome',
      component: AdminHome,
      // beforeEnter: multiguard([requireAdminLogin, routePreload]),
    },
    {
      path: '/admin/manage-admins',
      name: 'ManageAdmins',
      component: ManageAdmins,
    },
    {
      path: '/admin/manage-guests',
      name: 'ManageGuests',
      component: ManageGuests,
    },
    {
      path: '/admin/manage-accommodations',
      name: 'ManageAccommodations',
      component: ManageAccommodations,
    },
  ],
})

// router.afterEach(setPageMeta)

export default router
