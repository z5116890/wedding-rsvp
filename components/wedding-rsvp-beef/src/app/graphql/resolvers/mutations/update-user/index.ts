import { User } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const updateUser: GqlResolvers['Mutation']['updateUser'] = async (obj, { attrs, id }) => {

  const existingUser = await User.findOne({
    where: {
      id,
    },
  })

  if (!existingUser) {
    console.log('user does not exists:', attrs)
    return false
  }

  await existingUser.update({
    code: attrs.code,
    firstName: attrs.firstName,
    lastName: attrs.lastName,
    rsvpReception: attrs.rsvpReception,
    rsvpTeaCeremony: attrs.rsvpTeaCeremony,
    numPlusOnes: attrs.numPlusOnes,
    dietaryRestrictions: attrs.dietaryRestrictions,
    welcomeMessage: attrs.welcomeMessage,
  })

  console.log('updated user:', attrs)

  return true

}
