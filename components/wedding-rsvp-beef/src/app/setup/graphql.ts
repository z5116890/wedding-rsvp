import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { ValidationRule } from 'graphql'
import { OperationArgs } from 'graphql-http'
import { createHandler } from 'graphql-http/lib/use/express'
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive'

import { SetupMainAppOptions } from '../types'

const createSchema = (options: SetupMainAppOptions) => {

  const { graphql: { resolvers, schemaPath } } = options

  let schema = makeExecutableSchema({
    typeDefs: [
      constraintDirectiveTypeDefs,
      mergeTypeDefs(loadFilesSync(schemaPath, { extensions: ['graphql'] })) as any,
    ],
    resolvers: mergeResolvers(resolvers),
  })

  schema = constraintDirective()(schema)

  return schema

}

export const setupGraphql = async (options: SetupMainAppOptions) => {

  const schema = createSchema(options)

  const graphqlHandler = createHandler({
    schema,
    validationRules: async (_req: any, args: OperationArgs<any>, specifiedRules: readonly ValidationRule[]) => {

      const validationRules: ValidationRule[] = []

      return [...specifiedRules, ...validationRules]

    },
  })

  return { graphqlHandler }

}
