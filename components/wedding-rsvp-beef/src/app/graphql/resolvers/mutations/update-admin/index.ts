import { Admin } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const updateAdmin: GqlResolvers['Mutation']['updateAdmin'] = async (obj, { attrs, id }) => {

  const existingAdmin = await Admin.findOne({
    where: {
      id,
    },
  })

  if (!existingAdmin) {
    console.log('admin does not exists')
    return false
  }

  await existingAdmin.update({
    username: attrs.username,
    password: attrs.password,
    firstName: attrs.firstName,
    lastName: attrs.lastName,
  })

  console.log('updated admin')

  return true

}
