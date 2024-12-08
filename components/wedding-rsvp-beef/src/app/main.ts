import { Express } from 'express'
import * as mysql from 'mysql2'
import { setupMainApp } from './server'
import 'dotenv/config'

const listen = (app: Express, name: string, port: number) => {
  app.listen(port, () => {
    console.log(`Express ${name} server running at http://0.0.0.0:${port}/`)
    console.log(process.env)
  })
}

const db = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword',
  database: 'wedding',
})

setupMainApp()
  .then((mainApp) => {
    listen(mainApp, 'main', 3000)
  })
  .catch((err: any) => {
    console.log(err) // eslint-disable-line
    process.exit(1)
  })
