/**
 * @requires model schema
 */
const Produk = require("../models/produk");

/**
 * @description make unicue product code
 * @callback none
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
const createCode = async () => {
  try {
    const getCodeproduct = await Produk.findAll({
      raw: true,
      attributes: ["id_produk"],
      limit: 1,
      order: [["id_produk", "DESC"]]
    });
    let createCode = "";
    const result = getCodeproduct;
    if (result.length >= 1) {
      const code = result[0].id_produk;
      const sliceString = code.substr(3, 6);
      const toFloat = parseFloat(sliceString) + 1;
      const toString = toFloat.toString();
      if (toString.length === 1) {
        createCode = `PRD00000${toFloat}`;
      } else if (toString.length === 2) {
        createCode = `PRD0000${toFloat}`;
      } else if (toString.length === 3) {
        createCode = `PRD000${toFloat}`;
      } else if (toString.length === 4) {
        createCode = `PRD00${toFloat}`;
      } else if (toString.length === 5) {
        createCode = `PRD0${toFloat}`;
      } else if (toString.length === 6) {
        createCode = `PRD${toFloat}`;
      }
    } else {
      createCode = "PRD000001";
    }
    return createCode;
  } catch (e) {
    res.status(501).json({ success: false, error: "Error database" });
  }
};

/**
 * @description Get all produk
 * @callback GET /api/v1/produk
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.getProduk = async (req, res, next) => {
  try {
    const getProduk = await Produk.findAll();
    return res.status(200).json({
      success: true,
      data: getProduk
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server dalam masalah"
    });
  }
};

/**
 * @description Add produk
 * @callback POST /api/v1/produk
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.addProduk = async (req, res, next) => {
  try {
    const productCode = await createCode();
    const { nama, harga, stok, deskripsi } = req.body;
    const newProduk = new Produk({
      id_produk: productCode,
      nama,
      harga,
      stok,
      deskripsi
    });
    await newProduk.save();
    return res.status(201).json({
      success: true,
      data: `Produk ${nama} berhasil disimpan`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server dalam masalah"
    });
  }
};

/**
 * @description Update produk
 * @callback PUT /api/v1/produk
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.updateProduk = async (req, res, next) => {
  try {
    const { nama, harga, stok, deskripsi } = req.body;
    const id = req.params.id;
    await Produk.update(
      {
        nama,
        harga,
        stok,
        deskripsi
      },
      {
        where: {
          id_produk: id
        }
      }
    );
    return res.status(202).json({
      success: true,
      data: `Produk ${id} berhasil diubah`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server dalam masalah"
    });
  }
};

/**
 * @description Delete produk
 * @callback Delete /api/v1/produk
 * @param req menangkap values dari form (berupa json)
 * @param res return dari server ke client
 * @param next middleware express
 */
exports.deleteProduk = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Produk.destroy({ where: { id_produk: id } });
    return res.status(202).json({
      success: true,
      data: "Produk berhasil dihapus"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server dalam masalah"
    });
  }
};
