
import { User } from './users'
import { PlusOne } from './plus-ones'
import { Accommodation } from './accommodations'
import { AccommodatedGuest } from './accommodated-guests'

User.hasMany(PlusOne, { foreignKey: 'user_id' })
PlusOne.belongsTo(User, { foreignKey: 'user_id' })

Accommodation.hasMany(AccommodatedGuest, { foreignKey: 'accommodation_id' })
AccommodatedGuest.belongsTo(Accommodation, { foreignKey: 'accommodation_id' })

AccommodatedGuest.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(AccommodatedGuest, { foreignKey: 'user_id' })
