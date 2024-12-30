import { useMutation, useQuery } from '@vue/apollo-composable'
import { GraphQL } from '@/services/beef'

export const actions = {

  getAccommodations: ({ commit }) => {

    return new Promise((resolve, reject) => {

      const { onResult, onError } = useQuery(GraphQL.ListAccommodationsDocument)

      onResult(({ data, loading, errors }) => {

        const { accommodations: fetchedAccommodations } = data || {}

        console.log('fetchedAccommodations', fetchedAccommodations)

        if (loading) {
          commit('setLoadingAccommodations', true)
        } else if (!loading && fetchedAccommodations) {
          commit('setAccommodations', fetchedAccommodations)
          commit('setLoadingAccommodations', false)
          resolve(fetchedAccommodations)
        } else if (!loading && errors?.length) {
          commit('setLoadingAccommodations', false)
          reject(errors)
        }

      })

      onError((error) => {
        reject(error)
      })

    })

  },
  addAccommodation: ({ commit, dispatch }, attrs: { name: string, address: string, numGuests: number, numRooms: number }) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.AddAccommodationDocument)

      mutate({
        attrs
      })

      onDone(async () => {
        dispatch('getAccommodations')
          .then((accommodations) => {
            resolve(accommodations)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },
  updateAccommodation: ({ commit, dispatch }, attrs: { id: number, name: string, address: string, numGuests: number, numRooms: number }) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.UpdateAccommodationDocument)

      mutate({
        id: attrs.id,
        attrs: {
          name: attrs.name,
          address: attrs.address,
          numGuests: attrs.numGuests,
          numRooms: attrs.numRooms
        }
      })

      onDone(async () => {
        dispatch('getAccommodations')
          .then((accommodations) => {
            resolve(accommodations)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  deleteAccommodation: ({ commit, dispatch }, id: number) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.DeleteAccommodationDocument)

      mutate({
        id
      })

      onDone(async () => {
        dispatch('getAccommodations')
          .then((accommodations) => {
            resolve(accommodations)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  getAccommodatedGuests: ({ commit, dispatch }, accommodationId: number) => {

    return new Promise((resolve, reject) => {

      const { onResult, onError } = useQuery(GraphQL.ListAccommodatedGuestsDocument, {
        accommodationId
      })

      onResult(async ({ data, loading, errors }) => {

        const { accommodatedGuests: fetchedAccommodatedGuests } = data || {}

        console.log('fetchedAccommodatedGuests', fetchedAccommodatedGuests)

        if (loading) {
          commit('setLoadingAccommodatedGuests', true)
        } else if (!loading && fetchedAccommodatedGuests) {
          commit('setAccommodatedGuests', fetchedAccommodatedGuests)
          commit('setLoadingAccommodatedGuests', false)
          await dispatch('getAccommodations')
          resolve(fetchedAccommodatedGuests)
        } else if (!loading && errors?.length) {
          commit('setLoadingAccommodatedGuests', false)
          reject(errors)
        }

      })

      onError((error) => {
        reject(error)
      })

    })

  },

  addAccommodatedGuest: ({ commit, dispatch }, attrs: { accommodationId: number, checkInDate: string, checkOutDate: string, userId: number }) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.AddAccommodatedGuestDocument)

      mutate({
        attrs
      })

      onDone(async () => {
        dispatch('getAccommodatedGuests', attrs.accommodationId)
          .then((accommodatedGuests) => {
            resolve(accommodatedGuests)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  updateAccommodatedGuest: ({ commit, dispatch }, attrs: { accommodationId: number, checkInDate: string, checkOutDate: string, userId: number }) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.UpdateAccommodatedGuestDocument)

      mutate({
        attrs: {
          accommodationId: attrs.accommodationId,
          checkInDate: attrs.checkInDate,
          checkOutDate: attrs.checkOutDate,
          userId: attrs.userId
        }
      })

      onDone(async () => {
        dispatch('getAccommodatedGuests', attrs.accommodationId)
          .then((accommodatedGuests) => {
            resolve(accommodatedGuests)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  deleteAccommodatedGuest: ({ commit, dispatch }, attrs: { accommodationId: number, userId: number }) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.DeleteAccommodatedGuestDocument)

      mutate({
        accommodationId: attrs.accommodationId,
        userId: attrs.userId
      })

      onDone(async () => {
        dispatch('getAccommodatedGuests', attrs.accommodationId)
          .then((accommodatedGuests) => {
            resolve(accommodatedGuests)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  getUsers: ({ commit }, args: { filter: { firstName?: string, lastName?: string }, pagination: { page: number, pageSize: number } }) => {

    const { filter, pagination } = args

    return new Promise((resolve, reject) => {

      const { onResult, onError } = useQuery(GraphQL.ListUsersDocument, {
        filter,
        pagination
      })

      onResult(({ data, loading, errors }) => {

        const { users: usersResponse } = data || {}

        const fetchedUsers = usersResponse?.items

        console.log('fetchedUsers', fetchedUsers)

        if (loading) {
          commit('setLoadingUsers', true)
        } else if (!loading && fetchedUsers) {
          commit('setUsers', fetchedUsers)
          commit('setLoadingUsers', false)
          resolve(fetchedUsers)
        } else if (!loading && errors?.length) {
          commit('setLoadingUsers', false)
          reject(errors)
        }

      })

      onError((error) => {
        reject(error)
      })

    })

  },

  addUser: ({ commit, dispatch }, attrs: {
    type: string,
    firstName: string,
    lastName: string,
    code: string,
    numPlusOnes: number,
    dietaryRestrictions: string,
    plusOneOf?: number,
    welcomeMessage: string,
  }) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.AddUserDocument)

      mutate({
        attrs
      })

      onDone(async () => {
        dispatch('getUsers', { filter: {}, pagination: { page: 1, pageSize: 10 } })
          .then((users) => {
            resolve(users)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  updateUser: ({ commit, dispatch }, attrs: {
    id: number,
    firstName: string,
    lastName: string,
    code: string,
    rsvpReception: boolean,
    rsvpTeaCeremony: boolean,
    numPlusOnes: number,
    dietaryRestrictions: string,
    welcomeMessage: string,
  }) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.UpdateUserDocument)

      mutate({
        id: attrs.id,
        attrs: {
          firstName: attrs.firstName,
          lastName: attrs.lastName,
          code: attrs.code,
          rsvpReception: attrs.rsvpReception,
          rsvpTeaCeremony: attrs.rsvpTeaCeremony,
          numPlusOnes: attrs.numPlusOnes,
          dietaryRestrictions: attrs.dietaryRestrictions,
          welcomeMessage: attrs.welcomeMessage,
        }
      })

      onDone(async () => {
        dispatch('getUsers', { filter: {}, pagination: { page: 1, pageSize: 10 } })
          .then((users) => {
            resolve(users)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  deleteUser: ({ commit, dispatch }, id: number) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.DeleteUserDocument)

      mutate({
        id
      })

      onDone(async () => {
        dispatch('getUsers', { filter: {}, pagination: { page: 1, pageSize: 10 } })
          .then((users) => {
            resolve(users)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  getAdmins: ({ commit }) => {

    return new Promise((resolve, reject) => {

      const { onResult, onError } = useQuery(GraphQL.GetAdminsDocument)

      onResult(({ data, loading, errors }) => {

        const { admins: fetchedAdmins } = data || {}

        console.log('fetchedAdmins', fetchedAdmins)

        if (loading) {
          commit('setLoadingAdmins', true)
        } else if (!loading && fetchedAdmins) {
          commit('setAdmins', fetchedAdmins)
          commit('setLoadingAdmins', false)
          resolve(fetchedAdmins)
        } else if (!loading && errors?.length) {
          commit('setLoadingAdmins', false)
          reject(errors)
        }

      })

      onError((error) => {
        reject(error)
      })

    })

  },

  addAdmin: ({ commit, dispatch }, attrs: {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
  }) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.AddAdminUserDocument)

      mutate({
        attrs
      })

      onDone(async () => {
        dispatch('getAdmins').then((admins) => {
          resolve(admins)
        })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },

  deleteAdmin: ({ commit, dispatch }, id: number) => {

    return new Promise((resolve, reject) => {

      const { onDone, onError, mutate } = useMutation(GraphQL.DeleteAdminUserDocument)

      mutate({
        id
      })

      onDone(async () => {
        dispatch('getAdmins')
          .then((admins) => {
            resolve(admins)
          })
          .catch((error) => {
            reject(error)
          })
      })

      onError((error) => {
        reject(error)
      })

    })

  },
  getLoggedInUser: ({ commit }, args: { lastName: string, code: string }) => {

    return new Promise((resolve, reject) => {

      const { onResult, onError } = useQuery(GraphQL.UserDocument, {
        lastName: args.lastName,
        code: args.code
      })

      onResult(({ data, loading, errors }) => {

        const { user, userPlusOnes } = data || {}
        console.log('user', user)
        console.log('userPlusOnes', userPlusOnes)
        const loggedInUser = {
          ...user,
          plusOnes: userPlusOnes
        }

        console.log('loggedInUser', loggedInUser)

        if (loading) {
          commit('setLoadingLoggedInUser', true)
        } else if (!loading && loggedInUser) {
          commit('setLoggedInUser', loggedInUser)
          commit('setLoadingLoggedInUser', false)
          resolve(loggedInUser)
        } else if (!loading && errors?.length) {
          commit('setLoadingLoggedInUser', false)
          reject(errors)
        }

      })

      onError((error) => {
        reject(error)
      })

    })

  },
  getLoggedInAdmin: ({ commit }, args: { username: string, password: string }) => {

    return new Promise((resolve, reject) => {

      const { onResult, onError } = useQuery(GraphQL.AdminLoginDocument, {
        username: args.username,
        password: args.password,
      })

      onResult(({ data, loading, errors }) => {

        const { adminLogin: admin } = data || {}

        console.log('admin', admin)

        if (loading) {
          commit('setLoadingLoggedInAdmin', true)
        } else if (!loading && admin) {
          commit('setLoggedInAdmin', admin)
          commit('setLoadingLoggedInAdmin', false)
          resolve(admin)
        } else if (!loading && errors?.length) {
          commit('setLoadingLoggedInAdmin', false)
          reject(errors)
        }

      })

      onError((error) => {
        reject(error)
      })

    })

  },
  logoutAdmin: ({ commit }) => {

    commit('setLoggedInAdmin', null)

  },

}
