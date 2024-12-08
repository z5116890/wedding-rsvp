import { Accommodation, User, AccommodatedGuest } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const addAccommodatedGuest: GqlResolvers['Mutation']['addAccommodatedGuest'] = async (obj, { attrs }) => {

  const existingAccommodation = await Accommodation.findOne({
    where: {
      id: attrs.accommodationId,
    },
  })

  if (!existingAccommodation) {
    console.log('accommodation does not exist', attrs)
    return false
  }

  const existingUser = await User.findOne({
    where: {
      id: attrs.userId,
    },
  })

  if (!existingUser) {
    console.log('user does not exist', attrs)
    return false
  }

  const existingAccommodatedGuest = await AccommodatedGuest.findOne({
    where: {
      userId: attrs.userId,
      accommodationId: attrs.accommodationId,
    },
  })

  if (existingAccommodatedGuest) {
    console.log('guest already exists', attrs)
    return false
  }

  if (existingAccommodation.numGuests >= existingAccommodation.numRooms) {
    console.log('accommodation is full', attrs)
    return false
  }

  await AccommodatedGuest.create({
    accommodationId: attrs.accommodationId,
    userId: attrs.userId,
    checkIn: attrs.checkInDate,
    checkOut: attrs.checkOutDate,
  })

  await existingAccommodation.update({
    numGuests: existingAccommodation.numGuests + 1,
  })

  console.log(`guest with code=${existingUser.code} is now staying at ${existingAccommodation.name}`, attrs)

  return true

}
