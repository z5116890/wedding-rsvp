import { PlusOne, User } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const deleteUser: GqlResolvers['Mutation']['deleteUser'] = async (obj, { id }) => {

  const existingPlusOne = await PlusOne.findOne({
    where: {
      userId: id,
    },
  })

  const existingUser = await User.findOne({
    where: {
      id,
    },
  })

  if (!existingUser) {
    console.log('user does not exists')
    return false
  }

  if (existingPlusOne) {
    await existingPlusOne.destroy()
  }
  await existingUser.destroy()

  console.log('deleted user', id)

  return true

}
