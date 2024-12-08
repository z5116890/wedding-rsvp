import { UniqueConstraintError } from 'sequelize'
import { clearTables, shutdownDb } from '../../test/utils'
import { PlusOne } from '.'
import { User } from '../users'
import { factory } from '../factory'

describe('plus-ones', () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  describe('constraints', () => {

    it('should link to plus one of user', async () => {

      const plusOneOfUser = await factory.create<User>('User')
      const user = await factory.create<User>('User')

      const plusOne = await factory.create<PlusOne>('PlusOne', { userId: user.id, plusOneOf: plusOneOfUser.id })

      const found = await PlusOne.findByPk(plusOne.id)
      expect(found).not.toBeUndefined()
      expect(found!.userId).toEqual(user.id)
      expect(found!.plusOneOf).toEqual(plusOneOfUser.id)

    })

  })

})
