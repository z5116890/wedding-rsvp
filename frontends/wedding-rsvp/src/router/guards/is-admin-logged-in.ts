import { NavigationGuard } from 'vue-router'
import { useStore } from 'vuex'


export const isAdminLoggedIn: NavigationGuard = (to, from, next) => {

  const store = useStore()
  if (store.state.loggedInAdmin) {
    next()
  } else {
    next({ name: 'AdminLogin' })
  }

}