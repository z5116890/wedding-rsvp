import * as errcode from 'err-code'
import { Accommodation } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const accommodation: GqlResolvers['Query']['accommodation'] = async (obj, { id }) => {

  const existingAccommodation = await Accommodation.findOne({
    where: {
      id,
    },
  })

  if (!existingAccommodation) {
    throw errcode(new Error(`accommodation with id=${id} not found`), 'AccommodationNotFoundError')
  }

  return {
    id: existingAccommodation.id!,
    name: existingAccommodation.name!,
    address: existingAccommodation.address!,
    numGuests: existingAccommodation.numGuests,
    numRooms: existingAccommodation.numRooms,
  }

}
