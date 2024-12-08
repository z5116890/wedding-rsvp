import { UniqueConstraintError } from 'sequelize'
import { clearTables, shutdownDb } from '../../test/utils'
import { Accommodation } from '.'
import { factory } from '../factory'

describe('accommodation', () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  describe('constraints', () => {

    it('name must be uniq', async () => {

      const name = 'name'
      const saved = await factory.create<Accommodation>('Accommodation', { name })
      expect(saved).not.toBeUndefined()

      await expect(factory.create<Accommodation>('Accommodation', { name })).rejects.toThrow(UniqueConstraintError)


    })

  })

})
