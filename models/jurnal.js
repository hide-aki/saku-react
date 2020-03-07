/**
 * @requires import sequilize
 */
const Sequelize = require("sequelize");

/**
 * @requires import database
 */
const { connection } = require("../config/database");

/**
 * @module create schema jurnal
 */
const Jurnal = connection.define(
  "jurnal",
  {
    id_transaksi: { type: Sequelize.STRING },
    no_coa: { type: Sequelize.STRING },
    tanggal: { type: Sequelize.DATEONLY },
    nominal: { type: Sequelize.INTEGER }
  },
  {
    freezeTableName: true
  }
);

module.exports = Jurnal;
