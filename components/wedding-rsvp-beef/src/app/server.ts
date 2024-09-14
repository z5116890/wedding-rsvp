import { Express } from 'express'
import * as path from 'path'
import { setupExpress } from './setup/express'
import { setupGraphql } from './setup/graphgl'
import { resolvers } from './graphql/resolvers'
import { SetupMainAppOptions, SetupMainAppOutputs } from './types'

export const setup = async (options: SetupMainAppOptions): Promise<SetupMainAppOutputs> => {

  const { graphqlHandler } = await setupGraphql(options)

  return setupExpress(graphqlHandler)
    .then(({ express }) => {

      return {
        express,
        graphqlHandler,
      }
    })

}

export const setupMainApp = (): Promise<Express> => {

  return setup({
    system: 'wedding-rsvp',
    component: 'wedding-rsvp-beef',
    graphql: {
      schemaPath: path.join(__dirname, 'graphql', 'schema'),
      resolvers,
    },
  })
    .then(({ express }) => express)

}
