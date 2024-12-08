import { suiteName, clearTables, shutdownDb } from '../../test/utils'
import { PlusOne } from '.'
import { factory } from '../factory'
import { User } from '../users'

describe(suiteName(__filename), () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  it('saves correctly', async () => {

    const plusOneOfUser = await factory.create<User>('User')
    const user = await factory.create<User>('User')
    const plusOne = await factory.create<PlusOne>('PlusOne', { userId: user.id, plusOneOf: plusOneOfUser.id })
    expect(plusOne).not.toBeUndefined()


  })

})
