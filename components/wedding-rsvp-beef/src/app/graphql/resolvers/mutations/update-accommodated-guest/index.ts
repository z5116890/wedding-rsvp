import { AccommodatedGuest } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const updateAccommodatedGuest: GqlResolvers['Mutation']['updateAccommodatedGuest'] = async (obj, { attrs }) => {

  const existingAccommodatedGuest = await AccommodatedGuest.findOne({
    where: {
      userId: attrs.userId,
      accommodationId: attrs.accommodationId,
    },
  })

  if (!existingAccommodatedGuest) {
    console.log('accommodated guest does not exist', attrs)
    return false
  }

  await existingAccommodatedGuest.update({
    checkIn: attrs.checkInDate,
    checkOut: attrs.checkOutDate,
  })

  console.log('updated accommodated guest', attrs)

  return true

}
