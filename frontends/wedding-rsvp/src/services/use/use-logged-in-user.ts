import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GraphQL } from '@/services/beef'

export const useLoggedInUser = () => {

  const loggedInUser = ref(null)
  const loadingLoggedInUser = ref<boolean>(false)
  const loggedInUserLoaded = ref<boolean | null>(null)

  const loadLoggedInUser = (args: {
    code: string
  }) => {

    return new Promise((resolve, reject) => {

      if (loggedInUserLoaded.value !== null) {
        resolve(loggedInUser.value)
        return
      }

      const { onResult, onError } = useQuery(GraphQL.UserDocument, args)

      onResult(({ data, loading, errors }) => {
        const { user: fetchedUser } = data || {}

        if (loading) {
          loadingLoggedInUser.value = true
        } else if (!loading && fetchedUser) {
          loggedInUser.value = fetchedUser
          loadingLoggedInUser.value = false
          loggedInUserLoaded.value = true
          resolve(fetchedUser)
        } else if (!loading && errors?.length) {
          loggedInUserLoaded.value = false
          reject(errors)
        }
      })

      onError((error) => {
        loggedInUserLoaded.value = false
        reject(error)
      })
    })
  }

  return {
    loggedInUser,
    loadingLoggedInUser,
    loadLoggedInUser,
  }
}
