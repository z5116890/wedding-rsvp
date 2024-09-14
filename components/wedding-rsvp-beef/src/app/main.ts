import { Express } from 'express'
import { setupMainApp } from './server'

const listen = (app: Express, name: string, port: number) => {
  app.listen(port, () => {
    console.log(`Express ${name} server running at http://0.0.0.0:${port}/`)
  })
}

setupMainApp()
  .then((mainApp) => {
    listen(mainApp, 'main', 3000)
  })
  .catch((err: any) => {
    console.log(err) // eslint-disable-line
    process.exit(1)
  })
