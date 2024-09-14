import { Express, Handler } from 'express'

export interface SetupMainAppOutputs {
  express: Express
  graphqlHandler: Handler
}

export interface SetupMainAppOptions {
  system: string
  component: string
  graphql: {
    schemaPath: string
    resolvers: any[]
  }
}
