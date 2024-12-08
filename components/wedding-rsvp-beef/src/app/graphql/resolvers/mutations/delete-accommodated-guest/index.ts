import { AccommodatedGuest, Accommodation } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const deleteAccommodatedGuest: GqlResolvers['Mutation']['deleteAccommodatedGuest'] = async (obj, { userId, accommodationId }) => {

  const existingAccommodation = await Accommodation.findOne({
    where: {
      id: accommodationId,
    },
  })

  if (!existingAccommodation) {
    console.log('accommodation does not exist', userId, accommodationId)
    return false
  }

  const existingAccommodatedGuest = await AccommodatedGuest.findOne({
    where: {
      userId,
      accommodationId,
    },
  })

  if (!existingAccommodatedGuest) {
    console.log('accommodated guest does not exists', userId, accommodationId)
    return false
  }

  await existingAccommodatedGuest.destroy()

  if (existingAccommodation.numGuests > 0) {
    await existingAccommodation.update({
      numGuests: existingAccommodation.numGuests - 1,
    })
  }

  console.log('deleted accommodated guest', userId, accommodationId)

  return true

}
