import { markRaw } from 'vue'
import * as GraphQL from './types'

Object.entries(GraphQL).forEach(([key, value]) => {
  if (Object.prototype.hasOwnProperty.call(GraphQL, key) && key.endsWith('Document')) {
    markRaw(value)
  }
})

// put all generated type into a namespace called GraphQL
export { GraphQL }
