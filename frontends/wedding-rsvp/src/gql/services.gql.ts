import { useQuery } from '@vue/apollo-composable'
import { Ref } from 'vue'
import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core'
import { GraphQL } from '@/services/beef'

export const useGetAccommodationsQuery = () => {

  const { loading, onError, result, onResult, refetch } = useQuery(GraphQL.ListAccommodationsDocument)

  onResult((changed) => {

  })

  return { loading, onError, result, refetch }

}