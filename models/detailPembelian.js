/**
 * @requires import sequilize
 */
const Sequelize = require("sequelize");

/**
 * @requires import database
 */
const { connection } = require("../config/database");

/**
 * @module create schema detail pembelian
 */
const detailPembelian = connection.define(
  "detail_pembelian",
  {
    id_transaksi: { type: Sequelize.STRING },
    id_produk: { type: Sequelize.STRING },
    jumlah: { type: Sequelize.INTEGER },
    subtotal: { type: Sequelize.INTEGER }
  },
  {
    freezeTableName: true
  }
);

module.exports = detailPembelian;
