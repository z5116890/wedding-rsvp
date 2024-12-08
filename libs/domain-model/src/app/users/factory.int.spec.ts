import { suiteName, clearTables, shutdownDb } from '../../test/utils'
import { User } from '.'
import { factory } from '../factory'

describe(suiteName(__filename), () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  it('saves correctly', async () => {

    const saved = await factory.create<User>('User', { code: '1234' })
    expect(saved).not.toBeUndefined()

    expect(saved.code).toEqual('1234')

  })

})
