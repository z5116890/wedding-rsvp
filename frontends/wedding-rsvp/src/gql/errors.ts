// /* eslint-disable max-classes-per-file */
// import * as _ from 'lodash'
// import { GraphQLError } from 'graphql'
// import { ErrorResponse } from '@apollo/client/link/error'

// const createBadUserInputErrors = (errorResponse: ErrorResponse) => {
//   const badUserInputErrors: BadUserInputErrors = new BadUserInputErrors()

//   badUserInputErrors.errors = _.map(
//     errorResponse.graphQLErrors,
//     (graphQLError: GraphQLError) => {
//       return new BadUserInputError(
//         graphQLError.message,
//         (graphQLError.extensions as any).exception,
//       )
//     },
//   )

//   return badUserInputErrors
// }

// class BadUserInputErrors extends Error {
//   errors: BadUserInputError[]

//   constructor(errors?: BadUserInputError[]) {
//     super()
//     Object.setPrototypeOf(this, BadUserInputErrors.prototype)
//     this.errors = errors
//   }
// }

// class BadUserInputError extends Error {
//   exception: any

//   constructor(message: string, exception: any) {
//     super(message)
//     Object.setPrototypeOf(this, BadUserInputError.prototype)
//     this.exception = exception
//   }
// }

// export { createBadUserInputErrors, BadUserInputErrors, BadUserInputError }
