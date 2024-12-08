import { Accommodation } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const addAccommodation: GqlResolvers['Mutation']['addAccommodation'] = async (obj, { attrs }) => {

  const existingAccommodation = await Accommodation.findOne({
    where: {
      name: attrs.name,
    },
  })

  if (existingAccommodation) {
    console.log('accommodation already exists:', attrs)
    return false
  }

  await Accommodation.create({
    name: attrs.name,
    address: attrs.address,
    numGuests: attrs.numGuests,
    numRooms: attrs.numRooms,
  })

  console.log('created accommodation', attrs)

  return true

}
