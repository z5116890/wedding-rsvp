import { Accommodation } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const deleteAccommodation: GqlResolvers['Mutation']['deleteAccommodation'] = async (obj, { id }) => {

  const existingAccommodation = await Accommodation.findOne({
    where: {
      id,
    },
  })

  if (!existingAccommodation) {
    console.log('accommodation does not exists')
    return false
  }

  await existingAccommodation.destroy()

  console.log('deleted accommodation', id)

  return true

}
