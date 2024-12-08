import type { FactoryGirl } from 'factory-girl'
import { Accommodation } from '../index'

export default (factory: FactoryGirl) => {
  factory.define('Accommodation', Accommodation, {
    name: factory.chance('word'),
    address: factory.chance('address'),
    numGuests: factory.chance('integer', { min: 1, max: 10 }),
    numRooms: factory.chance('integer', { min: 1, max: 10 }),
  })
}
