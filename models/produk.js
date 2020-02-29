/**
 * @requires import sequelize
 */
const Sequelize = require('sequelize');

/**
 * @implements import database yang sudah diinisiasi
 */
const { connection } = require('../config/database');

/**
 * @module buat schema produk model
 */
const Produk = connection.define(
  'produk',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: { type: Sequelize.STRING },
    harga: { type: Sequelize.INTEGER },
    stok: { type: Sequelize.INTEGER },
    deskripsi: { type: Sequelize.STRING }
  },
  {
    freezeTableName: true
  }
);

module.exports = Produk;
