import * as _ from 'lodash'
import * as Chance from 'chance'
import * as path from 'path'
import { QueryTypes } from 'sequelize'
import { sequelize } from 'domain-model'

export const chance = new Chance()

export const suiteName = (file: string) => path.relative(`${__dirname}/../..`, file).split(path.sep).join('#')

export const clearTables = () => {

  return Promise.resolve()
    .then(() => {
      return sequelize.transaction((t: any) => {

        return sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { transaction: t })
          .then(() => {
            return Promise.all(_.map(sequelize.models, (m: any) => {
              return sequelize.query(`TRUNCATE TABLE ${m.tableName}`, { type: QueryTypes.RAW, transaction: t })
            }))
          })
          .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { transaction: t }))
      })
    })

}

export const shutdownDb = () => {
  return Promise.resolve().then(() => { return sequelize.close() })
}
