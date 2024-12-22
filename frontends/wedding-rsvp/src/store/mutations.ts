import { Accommodation, User, Admin, AccommodatedGuest } from '@/services/beef/types'
import { StoreState } from './types'

export const mutations = {

  setUsers: (state: StoreState, users: User[]) => {
    state.users = users
  },
  setAccommodations: (state: StoreState, accommodation: Accommodation[]) => {
    state.accommodations = accommodation
  },
  setAdmins: (state: StoreState, admins: Admin[]) => {
    state.admins = admins
  },
  setAccommodatedGuests: (state: StoreState, accommodatedGuests: AccommodatedGuest[]) => {
    state.accommodatedGuests = accommodatedGuests
  },
  setLoadingAccommodations: (state: StoreState, loading: boolean) => {
    state.loadingAccommodations = loading
  },
  setLoadingUsers: (state: StoreState, loading: boolean) => {
    state.loadingUsers = loading
  },
  setLoadingAdmins: (state: StoreState, loading: boolean) => {
    state.loadingAdmins = loading
  },
  setLoadingAccommodatedGuests: (state: StoreState, loading: boolean) => {
    state.loadingAccommodatedGuests = loading
  },
  setLoggedInUser: (state: StoreState, loggedInUser: User & { plusOnes: User[] } | null) => {
    state.loggedInUser = loggedInUser
  },
  setLoadingLoggedInUser: (state: StoreState, loading: boolean) => {
    state.loadingLoggedInUser = loading
  },
  setLoggedInAdmin: (state: StoreState, loggedInAdmin: Admin | null) => {
    state.loggedInAdmin = loggedInAdmin
  },
  setLoadingLoggedInAdmin: (state: StoreState, loading: boolean) => {
    state.loadingLoggedInAdmin = loading
  },
}
