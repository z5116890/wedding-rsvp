import './sequelize-initialization'

import fg from 'factory-girl' // eslint-disable-line
import type { FactoryGirl } from 'factory-girl'

import users from './users/factory'
import plusOnes from './plus-ones/factory'
import accommodations from './accommodations/factory'
import accommodatedGuests from './accommodated-guests/factory'
import admins from './admins/factory'

const factory: FactoryGirl = new fg.FactoryGirl()

users(factory)
plusOnes(factory)
accommodations(factory)
accommodatedGuests(factory)
admins(factory)

export default factory

export {
  factory,
}
