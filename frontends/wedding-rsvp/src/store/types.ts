import { AccommodatedGuest, Accommodation, Admin, User, PlusOne } from "@/services/beef/types"

export interface StoreState {
  accommodations: Accommodation[]
  users: User[]
  admins: Admin[]
  accommodatedGuests: AccommodatedGuest[]
  loadingAccommodations: boolean
  loadingUsers: boolean
  loadingAdmins: boolean
  loadingAccommodatedGuests: boolean
  loggedInUser: User & { plusOnes: User[] } | null
  loadingLoggedInUser: boolean
}
