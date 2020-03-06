/**
 * @requires import sequelieze
 */
const sequelize = require("sequelize");

/**
 * @requires import model
 */
const Produk = require("../models/produk");
const Pembelian = require("../models/pembelian");
const DetailPembelian = require("../models/detailPembelian");

/**
 * @description get product code and name
 * @callback GET /api/v1/produkBeli
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.getListProduk = async (req, res, next) => {
  try {
    const getProduk = await Produk.findAll({
      attributes: ["id_produk", "nama", "harga_beli"]
    });
    res.status(200).json({ success: true, data: getProduk });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

/**
 * @description create transaksi kode pembelian
 * @callback None
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
const createCode = async () => {
  try {
    const getCodepurchase = await Pembelian.findAll({
      raw: true,
      attributes: ["id_transaksi"],
      limit: 1,
      order: [["id_transaksi", "DESC"]]
    });
    let createCode = "";
    const result = getCodepurchase;
    if (result.length >= 1) {
      const code = result[0].id_transaksi;
      const sliceString = code.substr(3, 6);
      const toFloat = parseFloat(sliceString) + 1;
      const toString = toFloat.toString();
      if (toString.length === 1) {
        createCode = `TRP00000${toFloat}`;
      } else if (toString.length === 2) {
        createCode = `TRP0000${toFloat}`;
      } else if (toString.length === 3) {
        createCode = `TRP000${toFloat}`;
      } else if (toString.length === 4) {
        createCode = `TRP00${toFloat}`;
      } else if (toString.length === 5) {
        createCode = `TRP0${toFloat}`;
      } else if (toString.length === 6) {
        createCode = `TRP${toFloat}`;
      }
    } else {
      createCode = "TRP000001";
    }
    return createCode;
  } catch (e) {
    res.status(501).json({ success: false, error: "Error database" });
  }
};

/**
 * @description add transaksi pembelian
 * @callback POST /api/v1/pembelian
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.addPembelian = async (req, res, next) => {
  try {
    const result = await sequelize.transaction(async t => {
      const purchase = await Pembelian.create(
        {
          id_transaksi: "asas",
          tanggal: "2019-12-01",
          total: 12000
        },
        { transaction: t }
      );

      return purchase;
    });
  } catch (error) {}
};
