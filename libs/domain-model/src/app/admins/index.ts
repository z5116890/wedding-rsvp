/* eslint-disable import/no-cycle */
import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize'

export class Admin extends Sequelize.Model {
  id!: number
  username!: string
  password!: string
  firstName!: string | null
  lastName!: string | null
}

Admin.init(
  {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      field: 'username',
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      field: 'password',
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      field: 'first_name',
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastName: {
      field: 'last_name',
      type: Sequelize.STRING,
      allowNull: true,
    },
  } as Sequelize.ModelAttributes<Admin>,
  {
    tableName: 'admins',
    sequelize,
    timestamps: false,
    underscored: true,
  },
)
