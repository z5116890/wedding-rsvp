import { Admin } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const deleteAdmin: GqlResolvers['Mutation']['deleteAdmin'] = async (obj, { id }) => {

  const existingAdmin = await Admin.findOne({
    where: {
      id,
    },
  })

  if (!existingAdmin) {
    console.log('admin does not exists')
    return false
  }

  await existingAdmin.destroy()

  console.log('deleted admin', id)

  return true

}
