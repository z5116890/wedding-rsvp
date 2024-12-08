import { InMemoryCache } from '@apollo/client/cache'
import * as _ from 'lodash'
import { ApolloClient, from, HttpLink } from '@apollo/client/core'
import fetch from 'cross-fetch'


const httpLink = new HttpLink({
  uri: `${window.location.protocol}//${window.location.host}/api/graphql`,
  fetch,
})

export const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache({
    dataIdFromObject: (object) => {
      const uniqueId = object.id || object._id
      if (uniqueId) {
        return `${object.__typename}:${uniqueId}`
      }
      return null
    }
  }),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'none',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'none',
    },
    mutate: {
      errorPolicy: 'none',
    },
  },
})
