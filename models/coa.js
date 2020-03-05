/**
 * @requires import sequilize
 */
const Sequelize = require("sequelize");

/**
 * @implements import database
 */
const { connection } = require("../config/database");

/**
 * @module buat schema coa model
 */
const Coa = connection.define(
  "coa",
  {
    no_coa: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    nama: { type: Sequelize.STRING }
  },
  {
    freezeTableName: true
  }
);

module.exports = Coa;
