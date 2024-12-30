import { createWebHistory, createRouter } from 'vue-router'
import AdminLogin from '../pages/AdminLogin.vue'
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
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/error',
      name: 'UnknownErrorPage',
      component: UnknownErrorPage,
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
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

export default router
