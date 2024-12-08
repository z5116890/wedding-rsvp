import type { FactoryGirl } from 'factory-girl'
import { Admin } from '../index'

export default (factory: FactoryGirl) => {
  factory.define('Admin', Admin, {
    username: factory.chance('email'),
    password: factory.chance('word'),
    firstName: factory.chance('first'),
    lastName: factory.chance('last'),
  })
}
