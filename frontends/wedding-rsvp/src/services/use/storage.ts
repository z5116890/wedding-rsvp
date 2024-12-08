import Cookies from 'js-cookie'
import { AdminUserData } from '../../types'

const KEY = 'user-data'

export const setAdminUserData = (adminUserData: AdminUserData) => {
  localStorage.setItem(KEY, JSON.stringify(adminUserData))
}

export const getUserData = (): AdminUserData | null => {
  const adminUserData = localStorage.getItem(KEY)
  try {
    return adminUserData ? JSON.parse(adminUserData) as AdminUserData : null
  } catch {
    return null
  }
}

export const clearUserData = () => {
  localStorage.removeItem(KEY)
}
