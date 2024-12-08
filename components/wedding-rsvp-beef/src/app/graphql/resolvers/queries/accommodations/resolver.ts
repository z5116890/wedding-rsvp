import { Accommodation } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const accommodations: GqlResolvers['Query']['accommodations'] = async () => {

  const existingAccommodations = await Accommodation.findAll()

  return existingAccommodations.map(accommodation => ({
    id: accommodation.id!,
    name: accommodation.name!,
    address: accommodation.address!,
    numGuests: accommodation.numGuests!,
    numRooms: accommodation.numRooms!,
  }))

}
