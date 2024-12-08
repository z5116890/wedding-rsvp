import { PlusOne, User } from 'domain-model'
import * as errcode from 'err-code'
import { GqlResolvers } from '../../../schema'

export const userPlusOnes: GqlResolvers['Query']['userPlusOnes'] = async (obj, { code, lastName }) => {

  const existingUser = await User.findOne({
    where: { code, lastName },
  })

  if (!existingUser) {
    console.log('user does not exist', code, lastName)
    throw errcode(new Error('user does not exist'), 'UserNotFoundError')
  }

  const existingUserPlusOnes = await PlusOne.findAll({
    where: {
      plusOneOf: existingUser.id,
    },
  })

  console.log('existingUserPlusOnes', existingUserPlusOnes)

  const userPlusOnesRecords = await User.findAll({
    where: {
      id: existingUserPlusOnes.map(plusOne => plusOne.userId),
    },
  })

  console.log('userPlusOnesRecords', userPlusOnesRecords)

  return userPlusOnesRecords.map(user => ({
    id: user.id!,
    code: user.code,
    rsvp: user.rsvp,
    type: user.type!,
    firstName: user.firstName!,
    lastName: user.lastName!,
    numPlusOnes: user.numPlusOnes,
    dietaryRestrictions: user.dietaryRestrictions,
    welcomeMessage: user.welcomeMessage,
  }))

}
