import * as Sequelize from 'sequelize'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type FunctionTypeKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]

/**
 * A type to ensure developers don't miss any properties
 */
export type ModelAttributes<T extends Sequelize.Model> = {
  [attr in keyof Required<Omit<T, keyof Sequelize.Model | FunctionTypeKeys<T>>>]: Sequelize.ModelAttributeColumnOptions
}

export type FactoryAttributes<T extends Sequelize.Model> = Partial<{
  [attr in keyof Required<Omit<T, keyof Sequelize.Model | FunctionTypeKeys<T>>>]: any
}>
