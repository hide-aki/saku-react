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
    id_transaksi: {
      type: Sequelize.STRING,
      references: {
        model: "pembelian",
        key: "id_transaksi"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    id_produk: {
      type: Sequelize.STRING,
      references: {
        model: "produk",
        key: "id_produk"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    jumlah: { type: Sequelize.INTEGER },
    subtotal: { type: Sequelize.INTEGER }
  },
  {
    freezeTableName: true
  }
);

module.exports = detailPembelian;
