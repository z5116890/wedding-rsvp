import { Sequelize, Options } from 'sequelize'
import 'dotenv/config'
import { sequelize, setSequelize } from './sequelize'

if (!sequelize) {

  console.log('process.env', process.env)
  const config = {
    MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
    MYSQL_PORT: Number(process.env.MYSQL_PORT) || 3306,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  }

  console.log('config', config)

  const username = config['MYSQL_USER']
  const password = config['MYSQL_PASSWORD']
  const database = config['MYSQL_DATABASE']

  const dbconfig: Options = {
    host: config['MYSQL_HOST'],
    port: config['MYSQL_PORT'],
    dialect: 'mysql',
    replication: (() => {
      const dbConfig = {
        database: config['MYSQL_DATABASE'],
        port: config['MYSQL_PORT'],
        host: config['MYSQL_HOST'],
        username: config['MYSQL_USER'],
        password: config['MYSQL_PASSWORD'],
      }
      const readers = [dbConfig.host]

      return {
        read: readers.map((replica: any) => ({ ...dbConfig, host: replica })),
        write: dbConfig,
      }
    })(),
    logging: console.log, // eslint-disable-line
  }

  setSequelize(new Sequelize(database!, username!, password, dbconfig))
}
