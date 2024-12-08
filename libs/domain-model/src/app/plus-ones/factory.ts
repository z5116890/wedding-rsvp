import type { FactoryGirl } from 'factory-girl'
import { PlusOne } from '../index'

export default (factory: FactoryGirl) => {
  factory.define('PlusOne', PlusOne, {
    userId: factory.assoc('User', 'id'),
    plusOneOf: factory.assoc('User', 'id'),
  })
}
