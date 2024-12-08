import { AccommodatedGuest, User } from 'domain-model'
import * as _ from 'lodash'
import * as errcode from 'err-code'
import { GqlResolvers } from '../../../schema'

export const accommodatedGuest: GqlResolvers['Query']['accommodatedGuest'] = async (obj, { userId, accommodationId }) => {

  const existingAccommodatedGuest = await AccommodatedGuest.findOne(
    {
      where: {
        userId,
        accommodationId,
      },
      include: [{
        model: User,
        required: true,
        where: {
          id: userId,
        },
      }],
    },
  )

  const user = _.get(existingAccommodatedGuest, 'User') as unknown as User

  if (!existingAccommodatedGuest) {
    console.log('accommodated guest does not exist', userId, accommodationId)
    throw errcode(new Error('accommodated guest does not exist'), 'AccommodatedGuestNotFoundError')
  }

  return {
    id: existingAccommodatedGuest.id!,
    userId: existingAccommodatedGuest.userId!,
    firstName: user.firstName!,
    lastName: user.lastName!,
    accommodationId: existingAccommodatedGuest.accommodationId!,
    checkInDate: existingAccommodatedGuest.checkIn!.toString(),
    checkOutDate: existingAccommodatedGuest.checkOut!.toString(),
  }

}
