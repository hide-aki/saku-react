/**
 * @requires import sequilize
 */
const Sequelize = require("sequelize");

/**
 * @requires import database
 */
const { connection } = require("../config/database");

/**
 * @module create schema pembelian
 */
const Pembelian = connection.define(
  "pembelian",
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

module.exports = Pembelian;
