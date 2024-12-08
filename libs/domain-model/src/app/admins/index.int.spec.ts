import { UniqueConstraintError } from 'sequelize'
import { clearTables, shutdownDb } from '../../test/utils'
import { Admin } from '.'
import { factory } from '../factory'

describe('admin', () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  describe('constraints', () => {

    it('should not allow another admin with same username', async () => {

      const admin1 = await factory.create<Admin>('Admin', { username: 'a', password: 'b' })
      await expect(factory.create<Admin>('Admin', { username: 'a', password: 'c' })).rejects.toThrow(UniqueConstraintError)

    })

  })

})
