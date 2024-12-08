import { suiteName, clearTables, shutdownDb } from '../../test/utils'
import { Accommodation } from '.'
import { factory } from '../factory'

describe(suiteName(__filename), () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  it('saves correctly', async () => {

    const saved = await factory.create<Accommodation>('Accommodation', { name: 'a' })
    expect(saved).not.toBeUndefined()

    expect(saved.name).toEqual('a')

  })

})
