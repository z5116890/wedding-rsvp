import { PlusOne } from 'domain-model'
import * as errcode from 'err-code'
import { GqlResolvers } from '../../../schema'

export const plusOne: GqlResolvers['Query']['plusOne'] = async (obj, { userId }) => {

  const existingPlusOne = await PlusOne.findOne(
    {
      where: { id: userId },
    },
  )

  if (!existingPlusOne) {
    console.log('plusOne does not exist', userId)
    throw errcode(new Error('plusOne does not exist'), 'PlusOneNotFoundError')
  }

  return existingPlusOne

}
