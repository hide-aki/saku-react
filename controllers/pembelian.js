/**
 * @requires import sequelieze
 */
const Sequelize = require("sequelize");
/**
 * *inisiasi db untuk menggunakan transaction sequelize
 */
const db = new Sequelize("express-api", "root", "", {
  dialect: "mysql"
});

/**
 * @requires import model
 */
const Produk = require("../models/produk");
const Pembelian = require("../models/pembelian");
const DetailPembelian = require("../models/detailPembelian");
const Transaksi = require("../models/transaksi");

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
    const subtotal = req.body.purchase.map(
      purchase => purchase.qty * purchase.harga
    );
    /**
     * @method reduce
     * @param 1 callback (accumulator, curren value)
     * @param 2 nilai awai
     */
    const total = subtotal.reduce((acc, item) => (acc += item), 0);
    const codePurchase = await createCode();

    const forInsertDb = req.body.purchase.map(data => ({
      id_transaksi: codePurchase,
      id_produk: data.id_produk,
      jumlah: data.qty,
      subtotal: data.qty * data.harga
    }));

    const result = await db.transaction(async transaction => {
      const purchase = await Transaksi.create(
        {
          id_transaksi: codePurchase,
          tanggal: new Date(),
          total
        },
        { transaction }
      );
      await Pembelian.create(
        {
          id_transaksi: codePurchase,
          tanggal: new Date(),
          total
        },
        { transaction }
      );
      await DetailPembelian.bulkCreate(forInsertDb, { transaction });
      res
        .status(201)
        .json({ success: true, data: "Pembelian berhasil disimpan" });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
