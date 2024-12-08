/* eslint-disable import/no-cycle */
import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize'

export class AccommodatedGuest extends Sequelize.Model {
  id!: number
  userId!: number
  accommodationId!: number
  checkIn!: Date
  checkOut!: Date
}

AccommodatedGuest.init(
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
    accommodationId: {
      field: 'accommodation_id',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    checkIn: {
      field: 'check_in',
      type: Sequelize.DATE,
      allowNull: false,
    },
    checkOut: {
      field: 'check_out',
      type: Sequelize.DATE,
      allowNull: false,
    },
  } as Sequelize.ModelAttributes<AccommodatedGuest>,
  {
    tableName: 'accommodated_guests',
    sequelize,
    timestamps: false,
    underscored: true,
  },
)
