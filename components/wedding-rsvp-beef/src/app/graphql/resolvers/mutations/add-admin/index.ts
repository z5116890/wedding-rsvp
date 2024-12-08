import { Admin } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const addAdmin: GqlResolvers['Mutation']['addAdmin'] = async (obj, { attrs }) => {

  const existingAdmin = await Admin.findOne({
    where: {
      username: attrs.username,
    },
  })

  if (existingAdmin) {
    console.log(`admin with username=${attrs.username} already exists`)
    return false
  }

  await Admin.create({
    username: attrs.username,
    password: attrs.password,
    firstName: attrs.firstName,
    lastName: attrs.lastName,
  })

  console.log(`admin=${attrs.username} added`, attrs)

  return true

}
