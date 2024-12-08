import type { FactoryGirl } from 'factory-girl'
import { User } from '../index'

export default (factory: FactoryGirl) => {
  factory.define('User', User, {
    type: 'guest',
    firstName: factory.chance('first'),
    lastName: factory.chance('last'),
    code: factory.chance('string', { length: 4 }),
    rsvp: factory.chance('bool'),
    numPlusOnes: factory.chance('integer', { min: 0, max: 10 }),
    dietaryRestrictions: factory.chance('pickone', ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'kosher', 'halal', 'other']),
  })
}
