/* eslint-disable import/no-cycle */
import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize'
import { User } from '../users'

export class PlusOne extends Sequelize.Model {
  id!: number
  userId!: number
  plusOneOf!: number

  getPlusOneOfUser!: Sequelize.BelongsToGetAssociationMixin<User>
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>

}

PlusOne.init(
  {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    plusOneOf: {
      field: 'plus_one_of',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  } as Sequelize.ModelAttributes<PlusOne>,
  {
    tableName: 'plus_ones',
    sequelize,
    timestamps: false,
    underscored: true,
  },
)
