import { PlusOne, User, sequelize } from 'domain-model'
import { Transaction } from 'sequelize'
import { GqlGuestType, GqlResolvers } from '../../../schema'

export const addUser: GqlResolvers['Mutation']['addUser'] = async (obj, { attrs }) => {

  const existingUserWithCode = await User.findOne({
    where: {
      code: attrs.code,
    },
  })

  if (existingUserWithCode) {
    throw new Error(`user with code=${attrs.code} already exists`)
  }

  const existingUser = await User.findOne({
    where: {
      firstName: attrs.firstName,
      lastName: attrs.lastName,
    },
  })

  if (existingUser) {
    throw new Error(`user with name=${attrs.firstName} ${attrs.lastName} already exists`)
  }

  await sequelize.transaction(async (transaction: Transaction) => {

    const user = await User.create({
      type: attrs.type,
      firstName: attrs.firstName,
      lastName: attrs.lastName,
      code: attrs.code,
      numPlusOnes: attrs.numPlusOnes,
      dietaryRestrictions: attrs.dietaryRestrictions,
      welcomeMessage: attrs.welcomeMessage,
      rsvp: attrs.type === GqlGuestType.plus_one ? true : null,
    }, { transaction })

    if (attrs.type === GqlGuestType.plus_one && attrs.plusOneOf) {
      await PlusOne.create({
        userId: user.id,
        plusOneOf: attrs.plusOneOf,
      }, { transaction })
    }

  })

  console.log(`user with code=${attrs.code} added`, attrs)

  return true

}
