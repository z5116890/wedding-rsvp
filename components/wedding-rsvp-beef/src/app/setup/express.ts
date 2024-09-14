import * as _ from 'lodash'
import express from 'express'
import expressHealthcheck from 'express-healthcheck'
import * as bodyParser from 'body-parser'

interface SetupExpressOutputs {
  express: express.Express
}

export const setupExpress = async (
  graphqlHandler: express.Handler,
): Promise<SetupExpressOutputs> => {

  const app = express()

  app.set('trust proxy', true)
  app.set('x-powered-by', false)
  app.set('etag', false)

  let healthcheck = expressHealthcheck()

  app.use('/healthcheck', healthcheck)

  app.use('/', bodyParser.json({ limit: '100kb' }))

  const router = express.Router()

  const graphqlUrlPath = '/graphql'


  router.use(graphqlUrlPath, graphqlHandler)

  app.use(router)

  return { express: app }
}

export const wrapRouterFunctions = (router: express.Router, prependedHandlers: express.RequestHandler[]) => {

  const methods: Array<keyof express.Router> = ['all', 'get', 'post', 'put', 'delete', 'patch', 'options', 'head']

  _.each(methods, (method) => {
    const original = router[method]
    // @ts-ignore
    router[method] = (path: any, ...handlers: any) => { // eslint-disable-line no-param-reassign
      (original as any).call(router, path, ..._.concat(prependedHandlers, handlers))
      return router
    }
  })

}
