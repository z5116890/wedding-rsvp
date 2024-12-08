import { Admin } from 'domain-model'
import * as errcode from 'err-code'
import { GqlResolvers } from '../../../schema'

export const admin: GqlResolvers['Query']['admin'] = async (obj, { username }) => {

  const existingAdmin = await Admin.findOne(
    {
      where: { username },
    },
  )

  if (!existingAdmin) {
    throw errcode(new Error(`admin with username=${username} not found`), 'AdminNotFoundError')
  }

  return {
    id: existingAdmin.id!,
    username: existingAdmin.username!,
    firstName: existingAdmin.firstName!,
    lastName: existingAdmin.lastName!,
  }

}
