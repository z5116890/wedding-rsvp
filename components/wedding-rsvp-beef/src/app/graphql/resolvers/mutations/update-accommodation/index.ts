import { Accommodation } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const updateAccommodation: GqlResolvers['Mutation']['updateAccommodation'] = async (obj, { id, attrs }) => {

  const existingAccommodation = await Accommodation.findOne({
    where: {
      id,
    },
  })

  if (!existingAccommodation) {
    console.log('accommodation does not exist', attrs)
    return false
  }

  await existingAccommodation.update({
    name: attrs.name,
    address: attrs.address,
    numGuests: attrs.numGuests,
    numRooms: attrs.numRooms,
  })

  console.log('accommodation updated:', attrs)

  return true

}
