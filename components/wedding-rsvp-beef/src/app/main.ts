import { Express } from 'express'
import * as mysql from 'mysql2'
import { setupMainApp } from './server'

import 'dotenv/config'

// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs')

const listen = (app: Express, name: string, port: number) => {
  app.listen(port, () => {
    console.log(`Express ${name} server running at http://0.0.0.0:${port}/`)
    console.log(process.env)
  })
}

const dbUser = fs.readFileSync('/run/secrets/wedding_rsvp_db_user', 'utf-8').trim()
const dbPassword = fs.readFileSync('/run/secrets/wedding_rsvp_db_password', 'utf-8').trim()

const config = {
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3306,
  MYSQL_USER: dbUser,
  MYSQL_PASSWORD: dbPassword,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
}

console.log('beef config', config)

const db = mysql.createConnection({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
})

setupMainApp()
  .then((mainApp) => {
    listen(mainApp, 'main', 3000)
  })
  .catch((err: any) => {
    console.log(err) // eslint-disable-line
    process.exit(1)
  })
