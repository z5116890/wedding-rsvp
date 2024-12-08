import { Admin } from 'domain-model'
import * as errcode from 'err-code'
import { GqlResolvers } from '../../../schema'

export const adminLogin: GqlResolvers['Query']['adminLogin'] = async (obj, { username, password }) => {

  const existingAdmin = await Admin.findOne(
    {
      where: { username, password },
    },
  )

  if (!existingAdmin) {
    throw errcode(new Error('login failed'), 'AdminLoginFailedError')
  }

  return {
    id: existingAdmin.id!,
    username: existingAdmin.username!,
    firstName: existingAdmin.firstName!,
    lastName: existingAdmin.lastName!,
  }

}
