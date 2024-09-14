import { User } from 'domain-model/'
import { suiteName } from '#test/utils'
import { getUser } from './resolver'

describe(suiteName(__filename), () => {

  it('should use the domain model', async () => {

    const user = {
      id: '1',
      email: 'email@somewhere.com',
    }

    const spy = jest.spyOn(User, 'findOne').mockResolvedValue(user as any)

    await expect(getUser({} as any, { email: user.email })).resolves.toEqual(user)

    expect(spy).toHaveBeenCalledWith({ where: { email: user.email } })

  })

})
