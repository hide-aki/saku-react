/**
 * @requires import sequelize
 */
const Sequelize = require('sequelize');

/**
 * @requires import database yang sudah diinisiasi
 */
const { connection } = require('../config/database');

/**
 * @module buat schema model user
 */
const UsersSchema = connection.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
  },
  {
    freezeTableName: true //*biar gak nambahin 's'
  }
);

module.exports = UsersSchema;
