import { PlusOne, User } from 'domain-model'
import { Op } from 'sequelize'
import * as _ from 'lodash'
import { GqlListUsersFilter, GqlResolvers } from '../../../schema'

export const users: GqlResolvers['Query']['users'] = async (obj, args) => {

  const { filter } = args
  const { pagination } = args

  const offset = (pagination.page - 1) * pagination.pageSize

  const where: any = {}

  if (filter) {
    await setConditions(filter, where)
  }

  const query: any = {
    limit: pagination.pageSize,
    offset,
    where,
    order: ['id'],
  }

  const result = await User.findAndCountAll(query)

  const mappedUsers = await Promise.all(result.rows.map(async (existingUser: User) => {

    let plusOne: PlusOne | null = null

    if (existingUser.type === 'plus_one') {
      plusOne = await PlusOne.findOne({
        where: {
          userId: existingUser.id,
        },
      })
    }
    return {
      id: existingUser.id!,
      type: existingUser.type,
      firstName: existingUser.firstName!,
      lastName: existingUser.lastName!,
      code: existingUser.code,
      rsvp: existingUser.rsvp,
      numPlusOnes: existingUser.numPlusOnes,
      dietaryRestrictions: existingUser.dietaryRestrictions,
      welcomeMessage: existingUser.welcomeMessage,
      plusOneOf: plusOne ? plusOne.plusOneOf : null,
    }

  }))

  return {
    // @ts-ignore ignore until this is fixed https://github.com/sequelize/sequelize/pull/13736
    pages: Math.ceil(result.count / pagination.pageSize),
    // @ts-ignore ignore until this is fixed https://github.com/sequelize/sequelize/pull/13736
    totalItems: result.count as number,
    items: mappedUsers,
  }

}

const setConditions = async (filter: GqlListUsersFilter, where: any) => {

  if (filter.firstName) {
    const name = filter.firstName.trim()
    // eslint-disable-next-line no-param-reassign
    where.firstName = {
      [Op.like]: `%${name}%`,
    }
  }

  if (filter.lastName) {
    const name = filter.lastName.trim()
    // eslint-disable-next-line no-param-reassign
    where.lastName = {
      [Op.like]: `%${name}%`,
    }
  }

}
