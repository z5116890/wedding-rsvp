/* eslint-disable import/no-cycle */
import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize'
export enum UserType {
  GUEST = 'guest',
  PLUS_ONE = 'plus_one',
}

export class User extends Sequelize.Model {
  id!: number
  type!: string
  firstName!: string | null
  lastName!: string | null
  code!: string
  rsvpReception!: boolean | null
  rsvpTeaCeremony!: boolean | null
  numPlusOnes!: number
  dietaryRestrictions!: string | null
  welcomeMessage!: string | null
}

User.init(
  {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      field: 'type',
      type: Sequelize.ENUM,
      values: [UserType.GUEST, UserType.PLUS_ONE],
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
    code: {
      field: 'code',
      type: Sequelize.STRING,
      allowNull: false,
    },
    rsvpReception: {
      field: 'rsvp_reception',
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    rsvpTeaCeremony: {
      field: 'rsvp_tea_ceremony',
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    numPlusOnes: {
      field: 'num_plus_ones',
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dietaryRestrictions: {
      field: 'dietary_restrictions',
      type: Sequelize.STRING,
      allowNull: true,
    },
    welcomeMessage: {
      field: 'welcome_message',
      type: Sequelize.STRING,
      allowNull: true,
    },
  } as Sequelize.ModelAttributes<User>,
  {
    tableName: 'users',
    sequelize,
    timestamps: false,
    underscored: true,
  },
)
