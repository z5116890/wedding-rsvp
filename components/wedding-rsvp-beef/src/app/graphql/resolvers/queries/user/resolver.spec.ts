import { User } from 'domain-model'
import { suiteName } from '../../../../../../test/utils'
import { user } from './resolver'

describe(suiteName(__filename), () => {

  it('should use the domain model', async () => {

    const newUser = {
      id: '1',
      code: '1234',
    }

    const spy = jest.spyOn(User, 'findOne').mockResolvedValue(user as any)

    await expect(user({} as any, { code: newUser.code }, null, {} as any)).resolves.toEqual(user)

    expect(spy).toHaveBeenCalledWith({ where: { code: newUser.code } })

  })

})
