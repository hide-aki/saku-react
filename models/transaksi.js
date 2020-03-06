/**
 * @requires import sequilize
 */
const Sequelize = require("sequelize");

/**
 * @requires import database
 */
const { connection } = require("../config/database");

/**
 * @module create schema transaksi
 */
const Transaksi = connection.define(
  "transaksi",
  {
    id_transaksi: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    tanggal: { type: Sequelize.DATEONLY },
    total: { type: Sequelize.INTEGER }
  },
  {
    freezeTableName: true
  }
);

module.exports = Transaksi;
