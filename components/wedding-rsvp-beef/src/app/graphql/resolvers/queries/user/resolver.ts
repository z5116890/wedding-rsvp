import * as errcode from 'err-code'
import { AccommodatedGuest, Accommodation, User } from 'domain-model'
import { GqlResolvers } from '../../../schema'

export const user: GqlResolvers['Query']['user'] = async (obj, { code, lastName }) => {

  const existingUser = await User.findOne({
    where: {
      code,
      lastName,
    },
  })

  if (!existingUser) {
    throw errcode(new Error(`user with code=${code} and lastName=${lastName} not found`), 'UserNotFoundError')
  }

  const accommodatedGuest = await AccommodatedGuest.findOne({
    where: {
      userId: existingUser.id,
    },
  })

  const accommodation = accommodatedGuest ? await Accommodation.findOne({
    where: {
      id: accommodatedGuest.accommodationId,
    },
  }) : null

  return {
    id: existingUser.id!,
    code: existingUser.code,
    rsvp: existingUser.rsvp,
    type: existingUser.type!,
    firstName: existingUser.firstName!,
    lastName: existingUser.lastName!,
    numPlusOnes: existingUser.numPlusOnes,
    dietaryRestrictions: existingUser.dietaryRestrictions,
    welcomeMessage: existingUser.welcomeMessage,
    stayingAt: accommodation && accommodatedGuest ? {
      name: accommodation.name!,
      address: accommodation.address!,
      checkInDate: accommodatedGuest!.checkIn!.toString(),
      checkOutDate: accommodatedGuest!.checkOut!.toString(),
    } : null,
  }

}
