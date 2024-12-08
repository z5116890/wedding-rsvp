// import { GraphQLFormattedError } from 'graphql'
// // eslint-disable-next-line import/no-cycle
// import router from '../router'

// const handleUnknownError = (error) => {
//   handleError({
//     error,
//     errorType: 'UnknownError',
//     errorDetail: error.message,
//   })
// }

// const handleNotFoundPage = () => {
//   router.push({ name: 'UnknownErrorPage' })
// }

// const handleNetworkError = (networkError) => {
//   let errorDetail = `unknown network error occurred - ${networkError.message}`

//   if (networkError.bodyText) {
//     errorDetail = `${networkError.statusCode}: ${networkError.bodyText}`
//   }

//   if (networkError.result) {
//     errorDetail = networkError.result.errors
//       .map((error) => {
//         return error.message
//       })
//       .join('. ')
//   }

//   handleError({
//     error: networkError,
//     errorType: 'NetworkError',
//     errorDetail,
//   })
// }

// const handleGraphQLError = (graphQLError: GraphQLFormattedError) => {
//   const { extensions } = graphQLError

//   if (extensions.code === 'FORBIDDEN') {
//     return router.push({ name: 'AuthorisationErrorPage' })
//   }

//   handleError({
//     error: graphQLError,
//     errorType: extensions.code,
//     errorDetail: graphQLError.message,
//   })
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const handleError = (err) => {
//   router.push({ name: 'UnknownErrorPage' })
// }

// export {
//   handleGraphQLError,
//   handleUnknownError,
//   handleNetworkError,
//   handleNotFoundPage,
// }
