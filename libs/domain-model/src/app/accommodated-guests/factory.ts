import type { FactoryGirl } from 'factory-girl'
import { AccommodatedGuest } from '../index'

export default (factory: FactoryGirl) => {
  factory.define('AccommodatedGuest', AccommodatedGuest, {
    userId: factory.assoc('User', 'id'),
    accommodationId: factory.assoc('Accommodation', 'id'),
    checkIn: new Date(),
    checkOut: new Date(),
  })
}
