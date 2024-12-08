import { createStore } from 'vuex'
import { StoreState } from './types'

import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

const state: StoreState = {
  users: [],
  accommodations: [],
  accommodatedGuests: [],
  admins: [],
  loadingAccommodations: false,
  loadingUsers: false,
  loadingAdmins: false,
  loadingAccommodatedGuests: false,
  loadingLoggedInUser: false,
  loggedInUser: null,
}

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
})
