import { Sequelize } from 'sequelize'

// @ts-ignore assign null to object
export let sequelize: Sequelize = null // eslint-disable-line import/no-mutable-exports

export const setSequelize = (seq: Sequelize) => {
  sequelize = seq
}
