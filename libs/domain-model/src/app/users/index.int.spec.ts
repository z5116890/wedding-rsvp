import { UniqueConstraintError } from 'sequelize'
import { clearTables, shutdownDb } from '../../test/utils'
import { User } from '.'
import { factory } from '../factory'

describe('user', () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  describe('constraints', () => {

    it('code must be uniq', async () => {

      await factory.create<User>('User', { code: '1234' })

      await expect(factory.create<User>('User', { code: '1234' })).rejects.toThrow(UniqueConstraintError)

    })

  })

})
