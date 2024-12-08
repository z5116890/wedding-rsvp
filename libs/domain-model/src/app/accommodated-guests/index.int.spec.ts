import { UniqueConstraintError } from 'sequelize'
import { clearTables, shutdownDb } from '../../test/utils'
import { AccommodatedGuest } from '.'
import { User } from '../users'
import { Accommodation } from '../accommodations'
import { factory } from '../factory'

describe('accommodated-guest', () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  describe('constraints', () => {

    it('should link to user and accommodation', async () => {

      const user = await factory.create<User>('User')
      const accommodation = await factory.create<Accommodation>('Accommodation')

      const accommodatedGuest = await factory.create<AccommodatedGuest>('AccommodatedGuest', { userId: user.id, accommodationId: accommodation.id })

      const found = await AccommodatedGuest.findByPk(accommodatedGuest.id)
      expect(found).not.toBeUndefined()
      expect(found!.userId).toEqual(user.id)
      expect(found!.accommodationId).toEqual(accommodation.id)

    })

  })

})
