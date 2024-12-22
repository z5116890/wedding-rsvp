import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AdminLogin from '../pages/AdminLogin.vue'
import AdminHome from '@/pages/AdminHome.vue'
import UnknownErrorPage from '../pages/Error/UnknownErrorPage.vue'
import ManageAdmins from '../pages/ManageAdmins.vue'
import ManageGuests from '../pages/ManageGuests.vue'
import ManageAccommodations from '../pages/ManageAccommodations.vue'
import Welcome from '@/pages/Welcome.vue'
import AdminLogout from '@/pages/AdminLogout.vue'
import { isAdminLoggedIn } from './guards/is-admin-logged-in'

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
      path: '/admin/manage-admins',
      name: 'ManageAdmins',
      component: ManageAdmins,
      beforeEnter: isAdminLoggedIn,
    },
    {
      path: '/admin/manage-guests',
      name: 'ManageGuests',
      component: ManageGuests,
      beforeEnter: isAdminLoggedIn,
    },
    {
      path: '/admin/manage-accommodations',
      name: 'ManageAccommodations',
      component: ManageAccommodations,
      beforeEnter: isAdminLoggedIn,
    },
    {
      path: '/admin/logout',
      name: 'AdminLogout',
      component: AdminLogout,
    },
  ],
})

// router.afterEach(setPageMeta)

export default router
