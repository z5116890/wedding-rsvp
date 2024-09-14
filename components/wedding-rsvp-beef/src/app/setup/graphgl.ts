import * as _ from 'lodash'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { loadFilesSync } from '@graphql-tools/load-files'
import { ExecutionResult, ValidationRule } from 'graphql'
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

  const onOperation = (_req: any, args: OperationArgs<any>, result: ExecutionResult) => {

    const { errors = [] } = result
    const { contextValue, operationName } = args
    const { traceToken, requestId, ipAddress, user } = contextValue

    if (!errors.length) {
      console.log(
        { traceToken, requestId, operationName, ipAddress, email: user?.email },
        'graphql server operation was successful',
      )
    }

    errors.forEach((err: any) => {

      if (!err?.extensions?.traceToken) {
        // eslint-disable-next-line no-param-reassign
        err.extensions.traceToken = traceToken
      }

      if (!err?.extensions?.requestId) {
        // eslint-disable-next-line no-param-reassign
        err.extensions.requestId = requestId
      }

      console.log(
        { err, traceToken, requestId, operationName, ipAddress, email: user?.email },
        'graphql server operation with unexpected error',
      )
    })

  }


  const graphqlHandler = createHandler({
    schema,
    onOperation,
    validationRules: async (_req: any, args: OperationArgs<any>, specifiedRules: readonly ValidationRule[]) => {

      const validationRules: ValidationRule[] = []

      return [...specifiedRules, ...validationRules]

    },
  })

  return { graphqlHandler }

}