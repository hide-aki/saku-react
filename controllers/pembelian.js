/**
 * @requires import model product
 */
const Produk = require("../models/produk");

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
