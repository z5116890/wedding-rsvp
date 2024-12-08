import { suiteName, clearTables, shutdownDb } from '../../test/utils'
import { AccommodatedGuest } from '.'
import { User } from '../users'
import { Accommodation } from '../accommodations'
import { factory } from '../factory'

describe(suiteName(__filename), () => {

  afterAll(shutdownDb)
  beforeEach(clearTables)

  it('saves correctly', async () => {

    const user = await factory.create<User>('User')
    const accommodation = await factory.create<Accommodation>('Accommodation')
    const saved = await factory.create<AccommodatedGuest>('AccommodatedGuest', { userId: user.id, accommodationId: accommodation.id })
    expect(saved).not.toBeUndefined()

    expect(saved.userId).toEqual(user.id)
    expect(saved.accommodationId).toEqual(accommodation.id)
  })

})
