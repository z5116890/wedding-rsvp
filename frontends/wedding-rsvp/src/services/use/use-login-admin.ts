import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GraphQL } from '@/services/beef'
import * as storage from './storage'
import router from '@/router'

export const useLoginAdmin = () => {

  const adminUser = ref(null)
  const loadingAdminUser = ref<boolean>(false)
  const adminUserLoaded = ref<boolean | null>(null)

  const adminLogin = (args: { username: string, password: string }) => {

    return new Promise((resolve, reject) => {

      if (adminUserLoaded.value !== null) {
        router.push('/admin/home')
        resolve(adminUser.value)
        return
      }

      const { onResult, onError } = useQuery(GraphQL.AdminLoginDocument, args)

      onResult(({ data, loading, errors }) => {
        const { adminLogin: fetchedAdminUser } = data || {}

        if (loading) {
          loadingAdminUser.value = true
        } else if (!loading && fetchedAdminUser) {

          adminUser.value = fetchedAdminUser
          loadingAdminUser.value = false
          adminUserLoaded.value = true

          storage.setAdminUserData({
            username: fetchedAdminUser.username,
            firstName: fetchedAdminUser.firstName,
            lastName: fetchedAdminUser.lastName
          })
          router.push('/admin/home')
          resolve(fetchedAdminUser)

        } else if (!loading && errors?.length) {
          adminUserLoaded.value = false
          resolve(null)
        }

      })

      onError((error) => {
        console.log('error', error)
        adminUserLoaded.value = false
        loadingAdminUser.value = false
        resolve(null)
      })
    })
  }

  return {
    adminUser,
    loadingAdminUser,
    adminLogin,
    adminUserLoaded,
  }

}
