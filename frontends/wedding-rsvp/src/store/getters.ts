import { GuestType } from '@/services/beef/types'
import { StoreState } from './types'

export const getters = {
  guests: (state: StoreState) => {
    return state.users.filter(user => user.type === GuestType.guest)
  },
  plusOnes: (state: StoreState) => {
    return state.users.filter(user => user.type === GuestType.plus_one)
  },
}
