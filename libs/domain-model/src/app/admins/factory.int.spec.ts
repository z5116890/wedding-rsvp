import { suiteName, clearTables, shutdownDb } from '../../test/utils'
import { Admin } from '.'
import { factory } from '../factory'

describe(suiteName(__filename), () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  it('saves correctly', async () => {

    const saved = await factory.create<Admin>('Admin', { username: 'a', password: 'b' })
    expect(saved).not.toBeUndefined()

    expect(saved.username).toEqual('a')

  })

})
