/**
 * @requires import sequelize
 */
const Sequelize = require("sequelize");

/**
 * @implements import database yang sudah diinisiasi
 */
const { connection } = require("../config/database");

/**
 * @module buat schema produk model
 */
const Produk = connection.define(
  "produk",
  {
    id_produk: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    nama: { type: Sequelize.STRING },
    harga_jual: { type: Sequelize.INTEGER },
    harga_beli: { type: Sequelize.INTEGER },
    stok: { type: Sequelize.INTEGER },
    deskripsi: { type: Sequelize.STRING }
  },
  {
    freezeTableName: true
  }
);

module.exports = Produk;
