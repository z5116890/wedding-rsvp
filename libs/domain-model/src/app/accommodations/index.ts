/* eslint-disable import/no-cycle */
import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize'

export class Accommodation extends Sequelize.Model {
  id!: number
  name!: string
  address!: string | null
  numGuests!: number
  numRooms!: number
}

Accommodation.init(
  {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      field: 'name',
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      field: 'address',
      type: Sequelize.STRING,
      allowNull: true,
    },
    numGuests: {
      field: 'num_guests',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    numRooms: {
      field: 'num_rooms',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  } as Sequelize.ModelAttributes<Accommodation>,
  {
    tableName: 'accommodations',
    sequelize,
    timestamps: false,
    underscored: true,
  },
)
