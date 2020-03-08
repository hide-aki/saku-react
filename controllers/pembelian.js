/**
 * @requires import sequelieze
 */
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
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
const Jurnal = require("../models/jurnal");

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
     * @param 2 nilai awal
     */
    const total = subtotal.reduce((acc, item) => (acc += item), 0);
    const codePurchase = await createCode();
    /**
     * *Buat objek untuk insert jurnal
     */
    const insertJurnal = [
      {
        id_transaksi: codePurchase,
        no_coa: "1102",
        tanggal: new Date(),
        nominal: total
      },
      {
        id_transaksi: codePurchase,
        no_coa: "1101",
        tanggal: new Date(),
        nominal: total
      }
    ];

    /**
     * * Buat objek untuk insert ke detail purchase
     */
    const forInsertDb = req.body.purchase.map(data => ({
      id_transaksi: codePurchase,
      id_produk: data.id_produk,
      jumlah: data.qty,
      subtotal: data.qty * data.harga
    }));

    /**
     * * Buat sebuah array untuk menampung data id produk yang akan diubah stoknya
     */
    const arrayIDProduct = req.body.purchase.map(data => data.id_produk);

    /**
     * * Buat sebuah array objek untuk menampung data id produk dan qty dari cart purchase
     */
    const arrayObjekProduct = req.body.purchase.map(data => ({
      id_produk: data.id_produk,
      qty: data.qty
    }));
    const sortArrayObjekProduct = arrayObjekProduct.sort((a, b) => {
      if (a.id_produk < b.id_produk) {
        return -1;
      } else if (a.id_produk > b.id_produk) {
        return 1;
      }
      return 0;
    });
    /**
     * * Buat sebuah objek yang berisi produk (dari db) yang dibeli dan akan diubah stoknya
     */
    const dataProduct = await Produk.findAll({
      raw: true,
      where: { id_produk: { [Op.in]: arrayIDProduct } }
    });

    /**
     * * Buat sebuah array untuk menampung objek yang sudah berubah nilai stoknya
     */
    const updateDataProduct = dataProduct.map((data, index) => {
      data.stok += sortArrayObjekProduct[index].qty;
      return data;
    });

    const result = await db.transaction(async transaction => {
      const purchase = await Produk.destroy({
        where: { id_produk: arrayIDProduct },
        transaction
      });
      await Transaksi.create(
        {
          id_transaksi: codePurchase,
          tanggal: new Date(),
          total
        },
        { transaction }
      );
      await Jurnal.bulkCreate(insertJurnal, { transaction });
      await Pembelian.create(
        {
          id_transaksi: codePurchase,
          tanggal: new Date(),
          total
        },
        { transaction }
      );
      await DetailPembelian.bulkCreate(forInsertDb, { transaction });

      await Produk.bulkCreate(updateDataProduct, { transaction });
    });
    res
      .status(201)
      .json({ success: true, data: "Pembelian berhasil disimpan" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

/**
 * @description get purchase data
 * @callback GET /api/v1/pembelian
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */

exports.getPembelian = async (req, res, next) => {
  try {
    const getPembelian = await Pembelian.findAll();
    return res.status(200).json({ success: true, data: getPembelian });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server dalam masalah" });
  }
};
