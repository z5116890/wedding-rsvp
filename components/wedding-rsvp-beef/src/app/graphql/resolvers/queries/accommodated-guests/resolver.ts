import { AccommodatedGuest, Accommodation, User } from 'domain-model'
import * as errcode from 'err-code'
import * as _ from 'lodash'
import { GqlResolvers } from '../../../schema'

export const accommodatedGuests: GqlResolvers['Query']['accommodatedGuests'] = async (obj, { accommodationId }) => {

  const existingAccommodation = await Accommodation.findOne({
    where: { id: accommodationId },
  })

  if (!existingAccommodation) {
    throw errcode(new Error('accommodation does not exist'), 'AccommodationNotFoundError')
  }

  const existingAccommodatedGuests = await AccommodatedGuest.findAll({
    where: {
      accommodationId: existingAccommodation.id,
    },
    include: [{
      model: User,
      required: true,
    }],
  })

  return existingAccommodatedGuests.map((existingAccommodatedGuest: AccommodatedGuest) => {

    const user = _.get(existingAccommodatedGuest, 'User') as unknown as User

    return {
      id: existingAccommodatedGuest.id!,
      userId: existingAccommodatedGuest.userId!,
      firstName: user.firstName!,
      lastName: user.lastName!,
      accommodationId: existingAccommodatedGuest.accommodationId!,
      checkInDate: existingAccommodatedGuest.checkIn!.toString(),
      checkOutDate: existingAccommodatedGuest.checkOut!.toString(),
    }

  })

}
