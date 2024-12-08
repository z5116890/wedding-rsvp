import { Admin } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const admins: GqlResolvers['Query']['admins'] = async () => {

  const existingAdmins = await Admin.findAll()

  return existingAdmins.map((existingAdmin: Admin) => ({
    id: existingAdmin.id!,
    username: existingAdmin.username!,
    firstName: existingAdmin.firstName!,
    lastName: existingAdmin.lastName!,
  }))

}
